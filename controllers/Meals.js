import Meals from '../models/MealsModel.js';
import Users from '../models/UserModels.js';

export const getMealsById = async (req, res) => {
    const { id: userId } = req.params;
    try {
        // Check if userId is undefined or null
        if (!userId) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'userId parameter is missing in the request.',
            });
        }

        const userMeals = await Meals.findAll({
            where: {
                userId: userId,
            },
            attributes: ['mealId', 'meals_name', 'calories'],
        });

        return res.json({
            error: false,
            message: `Meals for userId ${userId}`,
            data: userMeals,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};



export const addMeal = async (req, res) => {
    const { id: userId } = req.params;
    const { meals_name, calories } = req.body;

    try {
        const dataMealsCreate = await Meals.create({
            userId: userId,
            meals_name: meals_name,
            calories: calories,
        });
        res.json({
            error: false,
            message: 'Meal added successfully by' + userId,
            data: dataMealsCreate,
        });
    } catch (error) {
        console.error(error);
    }
};


export const deleteMealsById = async (req, res) => {
    const { id: userId } = req.params;
    const { mealId } = req.body;

    try {
        const mealToDelete = await Meals.findOne({
            where: {
                userId: userId,
                mealId: mealId,
            },
            attributes: ['mealId', 'meals_name', 'calories'],
        });

        if (!mealToDelete) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Meal not found',
            });
        }

        const dataMealsDelete = await Meals.destroy({
            where: {
                userId: userId,
                mealId: mealId,
            },
        });

        res.json({
            message: 'Meal deleted successfully',
            data: {
                meal: dataMealsDelete,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
};
