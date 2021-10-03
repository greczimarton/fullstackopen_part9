import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({
    entry,
}) => {
    const diagnosis = useStateValue()[0].diagnosis;

    const healthIcon = (hcr: HealthCheckRating) => {
        switch (hcr) {
            case HealthCheckRating.Healthy:
                return <Icon name="heart" color="green" />;
            case HealthCheckRating.LowRisk:
                return <Icon name="heart" color="yellow" />;
            case HealthCheckRating.HighRish:
                return <Icon name="heart" color="red" />;
            case HealthCheckRating.CriticalRisk:
                return <Icon name="heart" color="black" />;
            default:
                return null;
        }
    };
    return (
        <Segment>
            <h3>
                {entry.date} <Icon name="user md" />
            </h3>
            <i color=" #FF5733 ">{entry.description}</i>
            <br />
            {healthIcon(entry.healthCheckRating)}
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

export default HealthCheckEntryComponent;
