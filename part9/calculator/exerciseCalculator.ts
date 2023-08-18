
export interface reqValues {
    daily_exercises: number[];
    target: number;
}

const exerciseCalculator = (args: reqValues) => {


    const periodLength: number = args.daily_exercises.length;
    const trainingDays: number = args.daily_exercises.filter(dailyExercises => dailyExercises !== 0).length;
    console.log(args.daily_exercises);
    const success: boolean = trainingDays === periodLength ? true : false;
    const target: number = args.target;
    const ratingDescription: string = trainingDays === periodLength ? "good" : "bad";
    let sum: number = 0;
    sum = args.daily_exercises.map(x => sum += x)[args.daily_exercises.length-1];
    console.log(sum);
    const average: number = sum / periodLength;

    const result: object = { periodLength, trainingDays, target, success, ratingDescription, average };
    return result;
};


export { exerciseCalculator };
