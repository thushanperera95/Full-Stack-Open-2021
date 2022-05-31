import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const heightCm = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(heightCm) || isNaN(weight)) {
    res.status(400).send({
      error: "malformatted parameters",
    });
  } else {
    const result = calculateBmi(heightCm, weight);
    res.send({ weight: weight, height: heightCm, bmi: result });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {target, daily_exercises} = req.body;

  if (!target || !daily_exercises) {
    res.status(400).send({
      error: 'parameters missing'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(Number(target)) || Object.values(daily_exercises).some(isNaN)) {
    res.status(400).send({
      error: 'malformatted parameters'
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(Number(target), Object.values(daily_exercises));
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
