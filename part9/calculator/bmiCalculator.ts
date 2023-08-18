import { ParsedQs } from "qs";

export interface BMIValues {
    height: number;
    weight: number;
}
// export interface reqValues {
//     height: string;
//     weight: string;
// }
const parseArguments = (args: ParsedQs): BMIValues => {
    if (Object.keys(args).length < 2) throw new Error('Not enough arguments');
    if (Object.keys(args).length > 2) throw new Error('Too many arguments');
    if (!args.height || !args.weight) throw new Error('No arguments');
    if (!isNaN(Number(args.height)) && !isNaN(Number(args.weight))) {
        return {
            // height: Number(Object.values(args)[0]),
            // weight: Number(Object.values(args)[1])
            height: Number(args.height),
            weight: Number(args.weight)

        };
    } else {
        throw new Error('Provided values were not numbers!');

    }

};

// Category	BMI (kg/m2)[c]	BMI Prime[c]
// Underweight (Severe thinness)	< 16.0	< 0.64
// Underweight (Moderate thinness)	16.0 – 16.9	0.64 – 0.67
// Underweight (Mild thinness)	17.0 – 18.4	0.68 – 0.73
// Normal range	18.5 – 24.9	0.74 – 0.99
// Overweight (Pre-obese)	25.0 – 29.9	1.00 – 1.19
// Obese (Class I)	30.0 – 34.9	1.20 – 1.39
// Obese (Class II)	35.0 – 39.9	1.40 – 1.59
// Obese (Class III)	≥ 40.0	≥ 1.60




const bmiCalculator = (height: number, weight: number) => {
    const result: number = weight / (height * height) * 10000;
    let printText: string = '';
    if (result < 16) { (printText = `BMI with ${height} and ${weight} is Severe thinness`); }
    if (result > 16 && result < 17) { printText = `BMI with ${height} and ${weight} is Moderate thinness`; }
    if (result > 17 && result < 18.5) { printText = `BMI with ${height} and ${weight} is Mild thinness`; }
    if (result > 18.5 && result < 25) { printText = `BMI with ${height} and ${weight} is Normal`; }
    if (result > 25 && result < 30) { printText = `BMI with ${height} and ${weight} is Overweight`; }
    if (result > 30 && result < 35) { printText = `BMI with ${height} and ${weight} is Obese`; }

    console.log(printText, result);
    return ({ weight, height, bmi: printText }

    );
};

// try {
//     const { height, weight } = parseArguments(object);
//     bmiCalculator(height, weight);
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

export { bmiCalculator, parseArguments };