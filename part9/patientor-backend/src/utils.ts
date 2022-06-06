import assertNever from "assert-never";
import { Diagnose, Discharge, EntryFields, Fields, Gender, HealthCheckRating, NewEntry, NewPatient, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSsn = (ssn: unknown): string | undefined => {
  if (!ssn) {
    return undefined;
  }

  if (!isString(ssn)) {
    throw new Error("Incorrect ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newPatient;
};

const parseType = (type: unknown): 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' => {
  if (!type || !isString(type) || (type !== 'Hospital' && type !== 'OccupationalHealthcare' && type !== 'HealthCheck')) {
    console.log(type);
    throw new Error("Incorrect or missing type");
  }

  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  }
  
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosis codes");
  }

  diagnosisCodes.forEach((item) => {
    if (!isString(item)) {
      throw new Error("Incorrect or missing diagnosis codes");
    }
  });

  return diagnosisCodes as Array<Diagnose['code']>;
};

const isInstanceOfDischarge = (object: unknown): object is Discharge => {
  return Object.prototype.hasOwnProperty.call(object, "date") &&
  Object.prototype.hasOwnProperty.call(object, "criteria");
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isInstanceOfDischarge(discharge) || !isString(discharge.date) || !isString(discharge.date)) {
    throw new Error("Incorrect or missing discharge");
  }

  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

const isInstanceOfSickLeave = (object: unknown): object is SickLeave => {
  return Object.prototype.hasOwnProperty.call(object, "startDate") &&
  Object.prototype.hasOwnProperty.call(object, "endDate");
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }

  if (!isInstanceOfSickLeave(sickLeave) || !isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
    throw new Error("Incorrect or missing sickLeave");
  }

  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating | undefined => {
  if (!healthCheckRating) {
    return undefined;
  }

  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating: " + healthCheckRating);
  }

  return healthCheckRating;
};

const toNewEntry = ({description, date, specialist, diagnosisCodes, discharge, employerName, sickLeave, healthCheckRating, type}: EntryFields): NewEntry => {
  const parsedType = parseType(type);

  switch(parsedType) {
    case "HealthCheck":
      const newHealthCheckEntry: NewEntry = {
        type: parsedType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      }; 

      return newHealthCheckEntry;

    case "Hospital":
      const newHospitalEntry: NewEntry = {
        type: parsedType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge)
      };

      return newHospitalEntry;

    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: NewEntry = {
        type: parsedType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
      };

      return newOccupationalHealthcareEntry;

    default:
      assertNever(parsedType);
  }
};

export default {
  toNewPatient,
  toNewEntry
};