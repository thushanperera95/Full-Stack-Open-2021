import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
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

export default {
  getPatients,
  addPatient
};