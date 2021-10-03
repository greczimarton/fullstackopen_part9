import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

const getAllDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getAllDiagnoses,
};
