import express from 'express';
import { bmiCalculator } from './controller/bmi-calculator';
import { exerciseCalculator} from './controller/exercise-calculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.use('/bmi', bmiCalculator);

app.use('/exercise',exerciseCalculator);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});