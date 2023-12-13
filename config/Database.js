import { Sequelize } from "sequelize";


const db = new Sequelize('capstone', 'root', '@Sarung123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00',
})

export default db;