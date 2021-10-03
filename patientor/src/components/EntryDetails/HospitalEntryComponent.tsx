import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { Diagnosis, HospitalEntry } from "../../types";

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({
    entry,
}) => {
    const diagnosis = useStateValue()[0].diagnosis;
    return (
        <Segment>
            <h3>
                {entry.date} <Icon name="hospital outline" />
            </h3>
            <i>
                {entry.discharge.date} : {entry.discharge.criteria}
            </i>
            <i color="grey">{entry.description}</i>
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

export default HospitalEntryComponent;
