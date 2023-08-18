
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientData from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    console.log('Fetching all patients!');

    res.send(patientsService.getNonSensitivePatientsData());
});

patientsRouter.post('/', (req, res) => {
    try {
      const newPatientData = toNewPatientData(req.body);
      const addedPatient = patientsService.addPatient(newPatientData);
      res.json(addedPatient);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  });

export default patientsRouter;