import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import animalRoutes from './routes/animalRoutes';

const app = express();
const port = process.env.PORT || 5002;

mongoose.connect('mongodb://localhost:27017/pet-expo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api', animalRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
