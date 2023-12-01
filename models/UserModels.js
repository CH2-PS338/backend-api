import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    profilePic: {
        type: DataTypes.TEXT,
    },
    refreshToken: {
        type: DataTypes.TEXT,
    },
}, {
    freezeTableName: true,
});


export default Users;