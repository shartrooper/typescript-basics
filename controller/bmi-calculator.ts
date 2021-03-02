/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bmiCalculatorRouter = require("express").Router();
import { calculateBmi } from "../bmiCalculator";

export const bmiCalculator = bmiCalculatorRouter.get("/",
    (req: { query: { height: number; weight: number; }; result: { height?: number; weight?: number; bmi?: string; error?: string; }; }, res: { json: (arg0: unknown) => unknown; }) => {
        const { height, weight } = req.query;
        let bmi;
        if (!isNaN(height) && !isNaN(weight)) {
            bmi = calculateBmi(weight, height);
            req.result = {
                height,
                weight,
                bmi
            };
        }
        else {
            req.result = {
                error: "malformatted parameters"
            };
        }
        res.json(req.result);
    }
);