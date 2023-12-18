import express from 'express';
import db from './configs/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import Migrate from './configs/Migrate.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

try {
    db.authenticate();
    console.log('Database connected');

    // make migrations
    // Migrate();

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

