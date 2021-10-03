import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { Diagnosis, OccupationalHealthCareEntry } from "../../types";

const OccupationalHealthCareEntryComponent: React.FC<{
    entry: OccupationalHealthCareEntry;
}> = ({ entry }) => {
    const diagnosis = useStateValue()[0].diagnosis;
    return (
        <Segment>
            <h3>
                {entry.date} <Icon name="stethoscope" /> {entry.employerName}
            </h3>
            <i color="grey">{entry.description}</i>
            <br />
            {entry.sickLeave ? (
                <i>
                    Sick leave: {entry.sickLeave.startDate} -{" "}
                    {entry.sickLeave.endDate}
                </i>
            ) : (
                ""
            )}
            <ul>
                {entry.diagnosisCodes?.map((t) => {
                    const tempDiagnosis = Object.values(diagnosis).find(
                        (d: Diagnosis) => d.code === t
                    );
                    if (!tempDiagnosis) {
                        return null;
                    } else {
                        return (
                            <li>
                                {tempDiagnosis.code}: {tempDiagnosis.name}
                            </li>
                        );
                    }
                })}
            </ul>
        </Segment>
    );
};

export default OccupationalHealthCareEntryComponent;
