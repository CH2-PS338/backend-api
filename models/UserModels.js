import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

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
    age: {
        type: DataTypes.INTEGER,
    },
    gender: {
        type: DataTypes.STRING(1),
        validate: {
            isIn: {
                args: [['P', 'L']],
                msg: "Gender must be 'P' or 'L'",
            },
        }
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
    calories: {
        type: DataTypes.FLOAT,
    },
    carbs: {
        type: DataTypes.FLOAT,
    },
    proteins: {
        type: DataTypes.FLOAT,
    },
    fats: {
        type: DataTypes.FLOAT,
    },
    minerals: {
        type: DataTypes.FLOAT,
    },
    refreshToken: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});

export default Users;
