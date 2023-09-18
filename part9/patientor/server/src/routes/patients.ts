
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientData from '../utils';
import toNewEntryData from '../utilsEntry';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    console.log('Fetching all patients!');

    res.send(patientsService.getPatients());
});

patientsRouter.get('/:id', (req, res) => {
  console.log('Fetching one patient!');
  const patient = patientsService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }

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



patientsRouter.post('/:id/entries', (req, res) => {

  try {
    const id:string = String(req.params.id)
    const entry = toNewEntryData(req.body);

    const addedEntry = patientsService.addEntry({entry, id});
    res.json(addedEntry);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;