import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/index.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { handleError } from './utils/error.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

app.use(handleError);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint does not exist' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);});