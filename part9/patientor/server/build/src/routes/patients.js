"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const utilsEntry_1 = __importDefault(require("../utilsEntry"));
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientsService_1.default.getPatients());
});
patientsRouter.get('/:id', (req, res) => {
    console.log('Fetching one patient!');
    const patient = patientsService_1.default.findById(String(req.params.id));
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
patientsRouter.post('/', (req, res) => {
    try {
        const newPatientData = (0, utils_1.default)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatientData);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const id = String(req.params.id);
        const entry = (0, utilsEntry_1.default)(req.body);
        const addedEntry = patientsService_1.default.addEntry({ entry, id });
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientsRouter;
