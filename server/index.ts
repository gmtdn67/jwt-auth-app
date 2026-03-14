import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index';
import errorMiddleware from './middlewares/error-middleware';

const PORT = process.env.PORT || 5000;
const app: Express = express();

// Подключение middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = [
      process.env.CLIENT_URL,
      'https://jwt-auth-app-client.netlify.app/'
  ]}
})
);
app.use('/api', router);
app.use(errorMiddleware);

/* const start = async (): Promise<void> => {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not defined in environment variables');
    }
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
};

start(); */

if (!process.env.DB_URL) {
  console.error('DB_URL is not defined in environment variables');
} else {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log(`MongoDB connected ${PORT}`))
    .catch((err) => console.error('MongoDB connection error:', err));
}

export default app;
