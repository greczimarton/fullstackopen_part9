import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, Icon } from "semantic-ui-react";
import { addEntryToPatientAction, useStateValue } from "../../state";
import { apiBaseUrl } from "../../constants";
import { Entry, EntryWithoutId, Gender, Patient } from "../../types";
import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../EntryDetails";
import axios from "axios";

const PatientPage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const [{ patients }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();

    const patient = Object.values(patients).find((t: Patient) => t.id === id);
    if (!patient) {
        return <h1>Patient with {id} not found</h1>;
    }

    const submitNewEntryToPatient = async (values: EntryWithoutId) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                values
            );
            console.log("done");

            dispatch(addEntryToPatientAction(newEntry, patient.id));
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error(e?.response.data || "Unknown Error");
            setError(e?.response.data || "Unknown error");
        }
    };

    const iconName =
        patient.gender === Gender.Male
            ? "mars"
            : patient?.gender === Gender.Female
            ? "venus"
            : "neuter";

    return (
        <div>
            <h1>
                {patient.name} <Icon name={iconName} />
            </h1>
            SSN: {patient.ssn}
            <br />
            Occupation: {patient.occupation}
            <br />
            Date of Birth: {patient.dateOfBirth}
            <h2>Entries: </h2>
            {patient.entries.map((t) => (
                <EntryDetails key={t.id} entry={t} />
            ))}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntryToPatient}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientPage;

{
    /* <p>
                        {t.date}: {t.description}
                    </p>
                    <p>
                        {t.diagnosisCodes?.map((t) => {
                            const tempDiagnosis = Object.values(diagnosis).find(
                                (d: Diagnosis) => d.code === t
                            );
                            if (!tempDiagnosis) {
                                return null;
                            } else {
                                return <EntryDetails entry={tempDiagnosis} />;
                            }
                        })}
                    </p> */
}
