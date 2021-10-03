import React, { useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import HealthRatingBar from "../HealthRatingBar";
import { addPatientAction, useStateValue } from "../../state";
import { useHistory } from "react-router";

const PatientListPage = () => {
    const [{ patients }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const history = useHistory();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: PatientFormValues) => {
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients`,
                values
            );
            console.log("done");

            dispatch(addPatientAction(newPatient));
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.log("error", e.message);

            console.error(e?.message || "Unknown Error");
            setError(e?.message || "Unknown error");
        }
    };

    return (
        <div className="App">
            <Container textAlign="center">
                <h3>Patient list</h3>
            </Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                        <Table.HeaderCell>Health Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.values(patients).map((patient: Patient) => (
                        <Table.Row key={patient.id}>
                            <Table.Cell>
                                <a
                                    onClick={() =>
                                        history.push(`/patients/${patient.id}`)
                                    }
                                >
                                    {patient.name}
                                </a>
                            </Table.Cell>
                            <Table.Cell>{patient.gender}</Table.Cell>
                            <Table.Cell>{patient.occupation}</Table.Cell>
                            <Table.Cell>
                                <HealthRatingBar showText={false} rating={1} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <AddPatientModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatient}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Patient</Button>
        </div>
    );
};

export default PatientListPage;
