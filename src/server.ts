import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import verifyToken from './middlewares/verifyToken';
import authRouter from './routes/auth';

dotenv.config();

const app: Application = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(verifyToken);
app.use('/auth', authRouter);

mongoose.connect(
  process.env.DB_DEV ?? '',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to DB'),
);
app.listen(PORT, () => console.log('Running on port 4000'));
