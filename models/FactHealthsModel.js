import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

const { DataTypes } = Sequelize;

const FactHealths = db.define('fact_healths', {
    factId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fact: {
        type: DataTypes.TEXT,
    },
    source: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});

export default FactHealths;