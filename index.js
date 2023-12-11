import express from 'express';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';
// import Users from './models/UserModels.js';
// import Nutrisions from './models/NutrisionsModel.js';
// import Meals from './models/MealsModel.js';
// import FactHealths from './models/FactHealthsModel.js';

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//start server
app.listen(5000, () => {
    console.log('Server on port', 5000);
}
);

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(router);

//test db
try {
    db.authenticate();
    console.log('Database connected');

    // line below is for create table
    // await Users.sync();
    // await Nutrisions.sync();
    // await Meals.sync();
    // await FactHealths.sync();
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}