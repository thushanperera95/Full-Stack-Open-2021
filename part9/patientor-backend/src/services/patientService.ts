import patients from '../../data/patients';
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid() ,
    ...newPatient,
  };

  patients.push(patient);
  return patient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Unable to find person with id ${id}`);
  }

  const entry: Entry = {
    id: uuid(),
    ...newEntry
  };

  patient.entries.push(entry);
  return entry;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry
};