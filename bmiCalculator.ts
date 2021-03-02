interface BMIvalues {
  kg: number;
  h: number;
}

const parseBMIArguments = (args: Array<string>): BMIvalues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      kg: Number(args[2]),
      h: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type BMIassessment = string;

export const calculateBmi = (kg: number, h: number): BMIassessment => {
  if (!isNaN(kg) && !isNaN(h)) {
    const bmi = kg / h ^ 2;
    if (bmi >= 18.5 || bmi <= 25) {
      return "Normal (healthy weight)";
    }
    return "unhealthy weight";
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


const asMain = () => {
  try {
    const { kg, h } = parseBMIArguments(process.argv);
    console.log(calculateBmi(kg, h));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }
};

if (typeof require !== 'undefined' && require.main === module) {
  asMain();
}