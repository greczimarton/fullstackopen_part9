import patientsData from "../../data/patients";

import { v4 as uuid } from "uuid";
import {
    Entry,
    EntryWithoutId,
    NewPatient,
    NonSensitivePatientData,
    Patient,
} from "../types";

const patients: Patient[] = patientsData;

const getAllPatients = (): Patient[] => {
    return patients;
};

const getPatientById = (Id: string): Patient => {
    const patientWithId = patients.find((t) => t.id === Id);
    if (patientWithId) {
        return patientWithId;
    } else {
        throw new Error(`Patient with the following Id was not found: ${Id}`);
    }
};

const getAllNonSensitivePatientsData = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };

    patientsData.push(newPatient);
    return newPatient;
};

const addEntryToPatient = (entry: EntryWithoutId, patientId: string): Entry => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toISOString().split("T")[0];

    const newEntry: Entry = {
        id: uuid(),
        ...entry,
    };

    const patientWithId = patientsData.find((t) => t.id === patientId);
    if (!patientWithId) {
        throw new Error(
            `Patient with the following Id was not found: ${patientId}`
        );
    }
    patientWithId.entries.push(newEntry);

    return newEntry;
};

export default {
    getAllPatients,
    getAllNonSensitivePatientsData,
    addPatient,
    getPatientById,
    addEntryToPatient,
};
