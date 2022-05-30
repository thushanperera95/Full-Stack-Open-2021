namespace BmiCalculator {
  type Category =
    | "Underweight"
    | "Normal (healthy weight)"
    | "Overweight"
    | "Obese";

  const categoriseBmi = (bmi: number): Category => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal (healthy weight)";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  const calculateBmi = (heightM: number, massKg: number): Category => {
    const bmi = massKg / (heightM * heightM);
    const category = categoriseBmi(bmi);
    return category;
  };

  interface CalculateBmiArgs {
    heightM: number;
    massKg: number;
  }

  const validateInputs = (heightCm: number, massKg: number): void => {
    if (heightCm === 0) {
      throw new Error("Height cannot be zero");
    }

    if (massKg === 0) {
      throw new Error("Weight cannot be zero");
    }
  };

  const parseArguments = (args: Array<string>): CalculateBmiArgs => {
    if (args.length !== 4) {
      throw new Error("Incorrect arguments");
    }

    const heightCm = Number(args[2]);
    const massKg = Number(args[3]);

    validateInputs(heightCm, massKg);

    if (!isNaN(heightCm) && !isNaN(massKg)) {
      return {
        heightM: heightCm / 100,
        massKg,
      };
    } else {
      throw new Error("Provided values were not numbers");
    }
  };

  try {
    const { heightM, massKg } = parseArguments(process.argv);
    console.log(calculateBmi(heightM, massKg)); // e.g. 180, 74
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
  }
}
