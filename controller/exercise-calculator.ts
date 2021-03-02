import express from 'express';
import { calculatePerfomance } from '../exerciseCalculator';
const exerciseCalculatorRouter = express.Router();


export const exerciseCalculator = exerciseCalculatorRouter.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400);
        res.send({ error: 'missing parameter daily_exercises or target' });
    }
    else {
        for (const day of daily_exercises) {
            if (isNaN(Number(day))) {
                res.status(400);
                res.send({ error: 'incorrect parameters' });
            }
        }
    }

    res.json(calculatePerfomance(target, daily_exercises));
});
