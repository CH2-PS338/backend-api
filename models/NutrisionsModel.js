import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Nutrisions = db.define('nutrisions', {
    nutrisionId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
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
}, {
    timestamps: true,
    freezeTableName: true,
});

export default Nutrisions;