import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // mengambil token dari header
    if (!token) {
        return res.status(401).json({
            msg: 'Access token not found'
        });
    }
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                msg: 'Invalid token'
            });
        }
        req.user = user;
        next();
    });
}
