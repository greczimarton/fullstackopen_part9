import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
    TextField,
    SelectField,
    EntryTypeOption,
    NumberField,
    DiagnosisSelection,
} from "./FormField";
import { EntryWithoutId, EntryType, HealthCheckRating } from "../../types";
import { useStateValue } from "../../state/state";

interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
}

const entryOptions: EntryTypeOption[] = [
    { value: EntryType.HealthCheck, label: "Health Check" },
    {
        value: EntryType.OccupationalHealthCare,
        label: "Occupational Health Care",
    },
    { value: EntryType.Hospital, label: "Hospital" },
];

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const validateMethod = (values: EntryWithoutId) => {
    const requiredError = "Field is required";
    const errors: { [field: string]: string } = {};
    console.log(values);
    switch (values.type) {
        case EntryType.HealthCheck:
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (!values.diagnosisCodes) {
                errors.diagnosisCodes = requiredError;
            }
            console.log("errors", errors);

            return errors;
        case EntryType.Hospital:
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (!values.diagnosisCodes) {
                errors.diagnosisCodes = requiredError;
            }

            /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
            if (
                (values as any).dischargeCriteria &&
                (values as any).dischargeDate
            ) {
                values.discharge = {
                    criteria: (values as any).dischargeCriteria,
                    date: (values as any).dischargeDate,
                };
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */

            if (!values.discharge) {
                errors.discharge = requiredError;
            }
            console.log("errors", errors);

            return errors;
        case EntryType.OccupationalHealthCare:
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (!values.diagnosisCodes) {
                errors.diagnosisCodes = requiredError;
            }
            if (!values.employerName) {
                errors.employerName = requiredError;
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
            if (
                (values as any).sickLeaveStartDate &&
                (values as any).sickLeaveEndDate
            ) {
                values.sickLeave = {
                    startDate: (values as any).sickLeaveStartDate,
                    endDate: (values as any).sickLeaveEndDate,
                };
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
            console.log(values);

            if (!values.sickLeave?.startDate) {
                errors.sickLeaveStartDate = requiredError;
            }
            if (!values.sickLeave?.endDate) {
                errors.sickLeaveEndDate = requiredError;
            }
            console.log("errors", errors);

            return errors;
        default:
            return assertNever(values);
    }
};

const extraFields = (values: EntryWithoutId, today: Date) => {
    switch (values.type) {
        case EntryType.HealthCheck:
            return (
                <Field
                    label="Health Check Rating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={0}
                    max={3}
                />
            );
        case EntryType.Hospital:
            return (
                <div>
                    <Field
                        label="Discharge Date"
                        placeholder="Discharge Date"
                        name="dischargeDate"
                        component={TextField}
                    />
                    <Field
                        label="Discharge Criteria"
                        placeholder="Discharge Criteria"
                        name="dischargeCriteria"
                        component={TextField}
                    />
                </div>
            );
        case EntryType.OccupationalHealthCare:
            return (
                <div>
                    <Grid>
                        <Grid.Column floated="left" width={5}>
                            <Field
                                label="Sick leave Start-Date"
                                placeholder={today.toISOString().split("T")[0]}
                                name="sickLeaveStartDate"
                                component={TextField}
                            />
                        </Grid.Column>
                        <Grid.Column floated="right" width={5}>
                            <Field
                                label="Sick leave End-Date"
                                placeholder={today.toISOString().split("T")[0]}
                                name="sickLeaveEndDate"
                                component={TextField}
                            />
                        </Grid.Column>
                    </Grid>
                    <Field
                        label="Employer Name"
                        placeholder="Employer Name"
                        name="employerName"
                        component={TextField}
                    />
                </div>
            );
        default:
            return assertNever(values);
    }
};

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const diagnosis = useStateValue()[0].diagnosis;

    return (
        <Formik
            initialValues={{
                type: EntryType.HealthCheck,
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: HealthCheckRating.Healthy,
            }}
            onSubmit={onSubmit}
            validate={(values) => validateMethod(values)}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">
                        <SelectField
                            label="Type"
                            name="type"
                            options={entryOptions}
                        />
                        <Field
                            label="Date"
                            placeholder={today.toISOString().split("T")[0]}
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        {extraFields(values, today)}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    color="red"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddPatientForm;
