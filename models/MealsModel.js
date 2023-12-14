import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModels.js";

const { DataTypes } = Sequelize;

const Meals = db.define('meals', {
    mealId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    meals_name: {
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

//define the association
Meals.belongsTo(Users, { foreignKey: 'userId' });

export default Meals;


