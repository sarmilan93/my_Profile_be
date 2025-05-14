import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import userProfileRouter from './routes/userProfileRoutes.js';

config();
connectDB();

const app = express();

// Configure CORS
const corsOptions = {
    origin: 'https://myprofilebe-production.up.railway.app', // Replace with your React app's URL
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
app.use(json());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/user', userProfileRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
