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


