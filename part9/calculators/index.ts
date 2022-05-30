import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
