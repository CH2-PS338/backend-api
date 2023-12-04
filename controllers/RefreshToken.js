import Users from "../models/UserModels.js";
import jwt from "jsonwebtoken";


export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                error: true,
                message: 'Access denied, token missing!'
            });
        }
        const user = await Users.findAll({ where: { refreshToken: refreshToken } });
        if (!user) {
            return res.status(403).json({
                error: true,
                message: 'User not authenticated!'
            });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: 'User not authenticated!'
                });
            }
            const userId = user[0].userId;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '24h'
            });
            res.json({
                error: false,
                accessToken
            });
        });

    } catch (error) {
        console.log(error);
    }
};