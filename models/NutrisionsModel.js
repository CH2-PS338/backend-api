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
        type: DataTypes.INTEGER,
    },
    carbs: {
        type: DataTypes.INTEGER,
    },
    proteins: {
        type: DataTypes.INTEGER,
    },
    fats: {
        type: DataTypes.INTEGER,
    },
    minerals: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});

export default Nutrisions;