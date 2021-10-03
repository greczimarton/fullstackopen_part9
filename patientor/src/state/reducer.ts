import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "SET_DIAGNOSIS_LIST";
          payload: Diagnosis[];
      }
    | {
          type: "ADD_ENTRY_TO_PATIENT";
          payload: {
              newEntry: Entry;
              patientId: string;
          };
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnosis: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({
                            ...memo,
                            [diagnosis.code]: diagnosis,
                        }),
                        {}
                    ),
                    ...state.diagnosis,
                },
            };
        case "ADD_ENTRY_TO_PATIENT":
            const patient = state.patients[action.payload.patientId];
            patient.entries.push(action.payload.newEntry);

            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.patientId]: patient,
                },
            };
        default:
            return state;
    }
};

export const setPatientListAction = (patientListFromApi: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patientListFromApi,
    };
};

export const addPatientAction = (patientToAdd: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patientToAdd,
    };
};

export const setDiagnosesListAction = (
    diagnosisListFromApi: Diagnosis[]
): Action => {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: diagnosisListFromApi,
    };
};

export const addEntryToPatientAction = (
    newEntry: Entry,
    patientId: string
): Action => {
    return {
        type: "ADD_ENTRY_TO_PATIENT",
        payload: {
            newEntry,
            patientId,
        },
    };
};
