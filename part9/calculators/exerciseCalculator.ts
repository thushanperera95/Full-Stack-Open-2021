namespace ExerciseCalculator {
  type Rating = 1 | 2 | 3;

  type RatingDescription =
    | "Not too bad, but could be better"
    | "Good job, you met your target hours"
    | "Well Done, you've exceeded your target hours";

  interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: RatingDescription;
    target: number;
    average: number;
  }

  const calculateRating = (
    target: number,
    average: number
  ): [Rating, RatingDescription] => {
    const weight = average / target;

    if (weight >= 0.9 && weight < 1) {
      return [2, "Not too bad, but could be better"];
    } else if (weight < 0.9) {
      return [1, "Not too bad, but could be better"];
    } else if (weight === 1) {
      return [3, "Good job, you met your target hours"];
    } else {
      return [3, "Well Done, you've exceeded your target hours"];
    }
  };

  const calculateExercises = (target: number, hours: Array<number>): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter((h) => h > 0).length;
    const average =
      hours.reduce((partialSum, a) => partialSum + a, 0) / periodLength;
    const success = average >= target;
    const [rating, ratingDescription] = calculateRating(target, average);

    return {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average,
    };
  };

  interface CalculateExerciseArgs {
    target: number;
    hours: Array<number>;
  }

  const validateInputs = (target: number, hours: Array<number>): void => {
    if (target === 0) {
      throw new Error("Target cannot be zero");
    }

    if (hours.length === 0) {
      throw new Error("Daily exercise hours cannot be empty");
    }
  };

  const parseArguments = (args: Array<string>): CalculateExerciseArgs => {
    if (args.length < 4) {
      throw new Error("Arguments must contain <target> <hours1>...<hoursx>");
    }

    const target = Number(args[2]);
    if (isNaN(target)) {
      throw new Error("Target hours must be a number");
    }

    let hours = [];
    for (let i = 3; i < args.length; i++) {
      let dailyHours = Number(args[i]);
      if (isNaN(dailyHours)) {
        throw new Error("Daily hours must be a number");
      }

      hours.push(dailyHours);
    }

    validateInputs(target, hours);

    return {
      target,
      hours,
    };
  };

  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(target, hours)); // 2, [3, 0, 2, 4.5, 0, 3, 1]
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
  }
}
