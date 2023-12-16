import express from 'express';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Migrate from './config/Migrate.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

try {
    db.authenticate();
    console.log('Database connected');

    // make migrations
    // Migrate();

}
catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.listen(5000, () => {
    console.log('Server on port', 5000);
}
);