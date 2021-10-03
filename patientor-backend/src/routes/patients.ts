/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
    res.send(patientService.getAllPatients());
});

patientsRouter.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send((e as Error).message);
    }
});

patientsRouter.get("/:id", (req, res) => {
    try {
        const patientWithId = patientService.getPatientById(req.params.id);
        res.json(patientWithId);
    } catch (e) {
        res.status(404).send((e as Error).message);
    }
});

patientsRouter.post("/:id/entries", (req, res) => {
    try {
        const patientId = req.params.id;
        const newEntry = toNewEntry(req.body);

        const addedEntry = patientService.addEntryToPatient(
            newEntry,
            patientId
        );
        res.json(addedEntry);
    } catch (e) {
        console.error("ez kell neked", (e as Error).message);
        res.status(400).send((e as Error).message);
    }
});

export default patientsRouter;
