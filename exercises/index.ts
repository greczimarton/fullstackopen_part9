import express from "express";
import { calcuateBmi, parseArgumentsBmi } from "./bmiCalculator";
import {
    calculateExercises,
    parseArgumentsExercises,
} from "./exerciseCalculator";
const app = express();
app.use(express.json());
const PORT = 3003;

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    try {
        const { heightInCM, weightInKG } = parseArgumentsBmi(
            [String(req.query.height), String(req.query.weight)],
            2,
            [0, 1]
        );
        res.json({
            weight: weightInKG,
            height: heightInCM,
            bmi: calcuateBmi(heightInCM, weightInKG),
        });
    } catch {
        res.json({
            error: "malformatted parameters",
        });
    }
});

app.post("/exercises", (req, res) => {
    try {
        const { exerciseHourArray, target } = parseArgumentsExercises(
            [],
            req.body.target,
            req.body.daily_exercises
        );
        console.log(exerciseHourArray);
        console.log(target);

        res.json(calculateExercises(exerciseHourArray, target));
    } catch (e) {
        res.status(400).json({
            error: (e as Error).message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
