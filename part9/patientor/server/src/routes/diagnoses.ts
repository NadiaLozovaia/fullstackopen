import express from 'express';
import diagnosesService from '../services/diagnosesService';


const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    console.log('Fetching all diagnoses!');

    res.send(diagnosesService.getDiagnoses());
});

// router.post('/', (_req, res) => {
//   res.send('Saving a diary!');
// });

export default diagnosesRouter;