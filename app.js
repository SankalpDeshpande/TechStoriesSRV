import express from 'express';
import authRouter from './rotues/auth.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})



app.use('/api/auth', authRouter);


export default app;


