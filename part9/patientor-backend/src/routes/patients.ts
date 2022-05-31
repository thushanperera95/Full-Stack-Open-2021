import express from "express";
import patientService from "../services/patientService";
import { Fields } from "../types";
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
  const fields: Fields = req.body as Fields;

  const newPatient = toNewPatient(fields);
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

export default router;