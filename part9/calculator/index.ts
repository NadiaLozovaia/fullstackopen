// import express from 'express'; 

import express from 'express';

import { bmiCalculator, parseArguments } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import { reqValues } from './exerciseCalculator';
// const qs = require('qs')
const app = express();

app.set('query parser', "extended");
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

// http://localhost:3002/bmi?height=180&weight=72

app.get('/bmi', (req, res) => {

    try {
        const { height, weight } = parseArguments(req.query);
        const result: object = bmiCalculator(height, weight);
        res.send(result);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.send(errorMessage);
    }

});


// http://localhost:3002/exercises

// const req: object = {
//     "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
//     "target": 2.5
// }
// const res: object = {
//     "periodLength": 7,
//     "trainingDays": 4,
//     "success": false,
//     "rating": 1,
//     "ratingDescription": "bad",
//     "target": 2.5,
//     "average": 1.2142857142857142
// }

app.post('/exercises', (req, res) => {


    const properData: reqValues = {
        daily_exercises: [],
        target: 0
    };
    if (!req.body) {
        return res.status(400).send({ error: 'no body' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (Object.keys(req.body).length !== 2) {
        return res.status(400).send({ error: 'parameters missing or more than 2' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.target) {
        return res.status(400).send({ error: 'target parameters missing' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.daily_exercises) {
        return res.status(400).send({ error: 'daily_exercises parameters missing' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!Array.isArray(req.body.daily_exercises)) {
        return res.status(400).send({ error: 'daily_exercises malformatted parameters' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!Number.isFinite(req.body.target)) {
        return res.status(400).send({ error: 'target malformatted parameters' });
    }

    const validator = (args: object): reqValues => {

        if (Object.keys(args)[0] === 'daily_exercises' && Object.keys(args)[1] === 'target') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            properData.daily_exercises.push(...Object.values(args)[0]);
            properData.target = Number(Object.values(args)[1]);
        }
        if (Object.keys(args)[1] === 'daily_exercises' && Object.keys(args)[0] === 'target') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            properData.daily_exercises.push(...Object.values(args)[1]);
            properData.target = Number(Object.values(args)[0]);
        }

        return properData;
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const data: reqValues = validator(req.body);
    console.log(data);
    return res.send(exerciseCalculator(data));


});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

