// Write a function that calculates the average time of daily exercise hourse and compares it to the target amount of daily hours.
/* returns an object that includes the following values:
    The number of days
    The number of training days
    The original target value
    The calculated average time
    Boolean value describing if the target was reached
    A rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own
    A text value explaining the rating
*/
// Daily exercise hours are given to the function as an array that contains the num of exercise hourse for each day in the training period.
// E.g. A week with 3 hours of training on monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursdayand so on
// Represented by the following array: [3,0,2,4.5,0,3,1]
// For the result object you should create an interface.
/* If you call the function with parameters [3,0,2,4.5,0,3,1] and 2 it could return
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.928577....
}
*/
// Don't forget create an npm script npm run calculateExercises for calling the function with hard coded values

interface WorkoutValues {
    target: number,
    hoursByDay: Array<number>
}

const parseExerciseArguments = (args: Array<string>): WorkoutValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const values = args.slice(2);

    for (const argument of values) {
        if (isNaN(Number(argument))) {
            throw new Error('Provided values were not numbers!');
        }
    }

    const hoursByDay = values.slice(1).map(num => Number(num));

    return {
        target: Number(values[0]),
        hoursByDay
    };
};

interface workoutResults {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

export const calculatePerfomance = (targetRating: number, exercisedHoursByDay: Array<number>): workoutResults => {
    const periodLength = exercisedHoursByDay.length;
    const trainingDays = exercisedHoursByDay.filter(day => day > 0).length;
    const average = exercisedHoursByDay.reduce((a, b) => a + b) / exercisedHoursByDay.length;
    const rating = Math.round(average);
    const getDescription = (r: number) => {
        const evalueRating = r < targetRating ? 'bad' : r == targetRating ? 'same' : 'good';
        switch (evalueRating) {
            case 'bad':
                return 'Try harder';
            case 'same':
                return 'not too bad but could be better';
            case 'good':
                return 'You surpassed the target rating, congrats!';
            default:
                return 'No rating';
        }
    };
    return {
        periodLength,
        trainingDays,
        target: targetRating,
        average,
        success: average >= targetRating,
        rating,
        ratingDescription: getDescription(rating)
    };
};

const asMain = () => {
    try {
        const { target, hoursByDay } = parseExerciseArguments(process.argv);
        console.log(calculatePerfomance(target, hoursByDay));
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log('Error, something bad happened, message: ', e.message);
    }
};

if (typeof require !== 'undefined' && require.main === module) {
    asMain();
}