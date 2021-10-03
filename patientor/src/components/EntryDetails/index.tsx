import React from "react";
import { Entry, EntryType } from "../../types";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthCareEntryComponent from "./OccupationalHealthCareEntryComponent";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalEntryComponent entry={entry} />;
        case EntryType.OccupationalHealthCare:
            return <OccupationalHealthCareEntryComponent entry={entry} />;
        case EntryType.HealthCheck:
            return <HealthCheckEntryComponent entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
