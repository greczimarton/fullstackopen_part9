import {
    Diagnosis,
    Discharge,
    EntryWithoutId,
    HealthCheckRating,
    InputEntry,
    SickLeave,
} from "../types";
import {
    assertNever,
    isDate,
    isString,
    isStringArray,
    parseDate,
} from "./BaseHelper";

export const toNewEntry = (newObject: InputEntry): EntryWithoutId => {
    switch (newObject.type) {
        case "HealthCheck":
            const newHealthCheckEntry: EntryWithoutId = {
                type: newObject.type,
                date: parseDate(newObject.date),
                specialist: parseSpecialist(newObject.specialist),
                description: parseDescription(newObject.description),
                diagnosisCodes: newObject?.diagnosisCodes
                    ? parseDiagnosesCodes(newObject?.diagnosisCodes)
                    : undefined,
                healthCheckRating: parseHealthCheckRating(
                    newObject.healthCheckRating
                ),
            };
            return newHealthCheckEntry;
        case "Hospital":
            const newHospitalEntry: EntryWithoutId = {
                type: newObject.type,
                date: parseDate(newObject.date),
                specialist: parseSpecialist(newObject.specialist),
                description: parseDescription(newObject.description),
                diagnosisCodes: newObject?.diagnosisCodes
                    ? parseDiagnosesCodes(newObject?.diagnosisCodes)
                    : undefined,
                discharge: parseDischarge(
                    newObject.dischargeDate,
                    newObject.dischargeCriteria
                ),
            };
            return newHospitalEntry;
        case "OccupationalHealthcare":
            const newOccupationalHealthcareEntry: EntryWithoutId = {
                type: newObject.type,
                date: parseDate(newObject.date),
                specialist: parseSpecialist(newObject.specialist),
                description: parseDescription(newObject.description),
                diagnosisCodes: newObject?.diagnosisCodes
                    ? parseDiagnosesCodes(newObject?.diagnosisCodes)
                    : undefined,
                employerName: parseEmployerName(newObject.employerName),
                sickLeave: parseSickLeave(
                    newObject?.sickLeaveStartDate,
                    newObject?.sickLeaveEndDate
                ),
            };
            return newOccupationalHealthcareEntry;
        default:
            return assertNever(newObject);
    }
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist: " + specialist);
    }

    return specialist;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description: " + description);
    }

    return description;
};

const parseDiagnosesCodes = (
    diagnosesCodes: unknown
): Array<Diagnosis["code"]> => {
    if (!isStringArray(diagnosesCodes)) {
        throw new Error("Incorrect diagnosesCodes: " + diagnosesCodes);
    }

    return diagnosesCodes;
};

const parseHealthCheckRating = (
    healthCheckRating: unknown
): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error(
            "Incorrect or missing healthCheckRating: " + healthCheckRating
        );
    }

    return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseDischarge = (
    dischargeDate: unknown,
    dischargeCriteria: unknown
): Discharge => {
    if (!dischargeDate || !isString(dischargeDate) || !isDate(dischargeDate)) {
        throw new Error(
            "Incorrect or missing Discharge Date: " + dischargeDate
        );
    }

    if (!dischargeCriteria || !isString(dischargeCriteria)) {
        throw new Error(
            "Incorrect or missing Discharge Date: " + dischargeDate
        );
    }

    const newDischarge: Discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria,
    };

    return newDischarge;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employerName:" + employerName);
    }

    return employerName;
};

const parseSickLeave = (
    sickLeaveStartDate: unknown,
    sickLeaveEndDate: unknown
): SickLeave => {
    if (
        !sickLeaveStartDate ||
        !isString(sickLeaveStartDate) ||
        !isDate(sickLeaveStartDate)
    ) {
        throw new Error(
            "Incorrect or missing Sick Leave Start Date: " + sickLeaveStartDate
        );
    }

    if (!sickLeaveEndDate || !isString(sickLeaveEndDate)) {
        throw new Error(
            "Incorrect or missing Sick Leave End Date: " + sickLeaveEndDate
        );
    }

    const newSickLeave: SickLeave = {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
    };

    return newSickLeave;
};
