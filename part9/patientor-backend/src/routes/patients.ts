import express from "express";
import patientService from "../services/patientService";
import { EntryFields, Fields } from "../types";
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const fields: Fields = req.body as Fields;

    const newPatient = utils.toNewPatient(fields);
    const addedPatient = patientService.addPatient(newPatient);
    
    res.json(addedPatient);
  } 
  catch (e) {
    if (e instanceof Error) {
    res.status(400).send(e.message);
    }

    console.log('Unexpected error', e);
  }
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.status(200).send(patient);
  } else {
    res.sendStatus(404); 
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id: string = req.params.id;
    const fields: EntryFields = req.body as EntryFields;

    const newEntry = utils.toNewEntry(fields);
    const updatedPatient = patientService.addEntry(id, newEntry);
    
    res.json(updatedPatient);
  } 
  catch (e) {
    if (e instanceof Error) {
    res.status(400).send(e.message);
    }

    console.log('Unexpected error', e);
  }
});

export default router;