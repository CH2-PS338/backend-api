import Users from "../models/UserModels.js";
import Meals from "../models/MealsModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;


    const existingEmail = await Users.findOne({ where: { email: email } });
    if (existingEmail) {
        return res.status(400).json({
            error: true,
            message: 'Email already exist'
        });
    }

    if (password !== confirm_password) {
        return res.status(400).json({
            error: true,
            msg: 'Password do not match'
        });
    }

    if (!name || !email || !password || !confirm_password) {
        return res.status(400).json({
            error: true,
            msg: 'Please fill all the fields'
        });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
        })
        res.json({
            error: false,
            message: 'User created successfully',
            data: {
                name: name,
                email: email,
            }
        });
    } catch (error) {
        console.log("Register error " + error);
        res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}

export const Login = async (req, res) => {

    try {
        const user = await Users.findAll({ where: { email: req.body.email } });
        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) {
            return res.status(400).json({
                error: true,
                message: 'Invalid credentials'
            });
        }
        const userId = user[0].userId;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = Jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = Jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1day'
        });
        await Users.update({ refreshToken: refreshToken }, { where: { userId: userId } });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
            // secure: true //jika mau pakek https
        });
        res.json({
            error: false,
            accessToken: accessToken
        });
    } catch (error) {
        console.log("Login error :" + error)
        res.status(400).json({
            error: true,
            message: 'Email is not registered, please register first!'
        });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(204).json({
            error: true,
            message: 'User not authenticated!'
        });
    }
    try {
        const user = await Users.findAll({ where: { refreshToken: refreshToken } });
        if (!user) {
            return res.status(204).json({
                error: true,
                message: 'User not authenticated!'
            });
        }
        const userId = user[0].userId;
        await Users.update({ refreshToken: null }, {
            where: { userId: userId }
        });
        res.clearCookie('refreshToken');
        return res.status(200).json({
            error: false,
            message: 'Logout success!'
        });
    } catch (error) {
        console.log("Logout error :" + error)
        res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const existingEmail = await Users.findOne({ where: { email: email } });

    if (!existingEmail) {
        return res.status(400).json({
            error: true,
            message: 'Email not found'
        });
    }

    try {
        const password = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await Users.update({ password: hashedPassword }, { where: { email: email } });

        return res.json({
            error: false,
            message: 'Password has been reset',
            data: {
                email: email,
                password: password
            }
        });
    } catch (error) {
        console.log("Forgot password error :" + error)
        return res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }


};


export const updateProfile = async (req, res) => {
    const { name, age, gender } = req.body;
    const { id: userId } = req.params;

    const nutritionProfiles = {
        L: {
            '15-18': { calories: 2650, proteins: 75, carbs: 400, fats: 85, minerals: 2300 },
            '19-29': { calories: 2650, proteins: 65, carbs: 430, fats: 75, minerals: 2500 },
            '30-49': { calories: 2550, proteins: 65, carbs: 415, fats: 70, minerals: 2500 },
            '50-64': { calories: 2150, proteins: 65, carbs: 340, fats: 60, minerals: 2500 },
        },
        P: {
            '15-18': { calories: 2100, proteins: 65, carbs: 300, fats: 70, minerals: 2150 },
            '19-29': { calories: 2250, proteins: 60, carbs: 360, fats: 65, minerals: 2350 },
            '30-49': { calories: 2150, proteins: 60, carbs: 340, fats: 60, minerals: 2350 },
            '50-64': { calories: 1800, proteins: 60, carbs: 280, fats: 50, minerals: 2350 },
        }
    };

    const getAgeRange = (age) => {
        if (age >= 15 && age <= 18) return '15-18';
        if (age >= 19 && age <= 29) return '19-29';
        if (age >= 30 && age <= 49) return '30-49';
        if (age >= 50 && age <= 64) return '50-64';
        return null;
    };

    try {
        await Users.update({ name, age, gender }, { where: { userId } });

        const ageRange = getAgeRange(age);
        if (ageRange && nutritionProfiles[gender] && nutritionProfiles[gender][ageRange]) {
            await Users.update(nutritionProfiles[gender][ageRange], { where: { userId } });
        }

        return res.json({
            error: false,
            message: 'Profile has been updated',
            data: { name, age, gender }
        });

    } catch (error) {
        console.log("Update profile error :" + error);
        return res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }
};



export const changePassword = async (req, res) => {
    const { id: userId } = req.params;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!userId || !oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({
            error: true,
            message: 'Please fill all the fields'
        });
    }

    const existingUser = await Users.findOne({ where: { userId: userId } });

    const match = await bcrypt.compare(oldPassword, existingUser.password);

    if (!match) {
        return res.status(400).json({
            error: true,
            message: 'Invalid credentials'
        });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
            error: true,
            message: 'Password do not match'
        });
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await Users.update({ password: hashedPassword }, { where: { userId: userId } });

        return res.json({
            error: false,
            message: 'Password has been changed',
            data: {
                userId: userId,
            }
        });

    } catch (error) {
        console.log("Change password error :" + error);
        return res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }
};

export const checkDailyCalories = async (req, res) => {
    const { id: userId } = req.params;

    try {
        const getDailyCalories = await Users.findOne({
            where: { userId: userId },
        });

        const getMealsDay = await Meals.findAll({
            where: {
                userId: userId,
            },
        });

        const date = new Date();
        const today = date.getDate();

        const getMealsThisDay = getMealsDay.filter((meal) => {
            const mealDate = new Date(meal.createdAt).getDate();
            return mealDate === today;
        });

        const calculate = getMealsThisDay.reduce((acc, curr) => {
            return {
                calories: acc.calories + curr.calories,
                carbs: acc.carbs + curr.carbs,
                proteins: acc.proteins + curr.proteins,
                fats: acc.fats + curr.fats,
                minerals: acc.minerals + curr.minerals,
            };
        }, {
            calories: 0,
            carbs: 0,
            proteins: 0,
            fats: 0,
            minerals: 0,
        });

        const remainingCalories = {
            calories: getDailyCalories.calories - calculate.calories,
            carbs: getDailyCalories.carbs - calculate.carbs,
            proteins: getDailyCalories.proteins - calculate.proteins,
            fats: getDailyCalories.fats - calculate.fats,
            minerals: getDailyCalories.minerals - calculate.minerals,
        };

        return res.json({
            data: remainingCalories,
        });


    } catch (error) {
        console.log("Check daily calories error :" + error);
        return res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }
};

export const getUserById = async (req, res) => {
    const { id: userId } = req.params;

    try {
        const user = await Users.findOne({
            where: { userId: userId },
            attributes: {
                exclude: ['password', 'refreshToken']
            }
        });

        return res.json({
            error: false,
            data: user
        });

    } catch (error) {
        console.log("Get user by id error :" + error);
        return res.status(400).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}