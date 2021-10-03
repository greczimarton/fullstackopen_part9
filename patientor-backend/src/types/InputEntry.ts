export type InputEntry =
    | InputHealthCheckEntry
    | InputOccupationalHealthCareEntry
    | InputHospitalEntry;

interface InputEntryBase {
    date: unknown;
    specialist: unknown;
    description: unknown;
    diagnosisCodes?: unknown;
}

export interface InputHealthCheckEntry extends InputEntryBase {
    type: "HealthCheck";
    healthCheckRating: unknown;
}

export interface InputOccupationalHealthCareEntry extends InputEntryBase {
    type: "OccupationalHealthcare";
    employerName: unknown;
    sickLeaveStartDate: unknown;
    sickLeaveEndDate: unknown;
}

export interface InputHospitalEntry extends InputEntryBase {
    type: "Hospital";
    dischargeDate: unknown;
    dischargeCriteria: unknown;
}
