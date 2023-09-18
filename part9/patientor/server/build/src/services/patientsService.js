"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_full_1 = __importDefault(require("../../data/patients-full"));
const patients = patients_full_1.default;
const getPatients = () => {
    console.log(patients_full_1.default[1]);
    return patients_full_1.default;
};
const getNonSensitivePatientsData = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findById = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newPatientsData = Object.assign({ id: (0, uuid_1.v4)(), entries: [] }, patient);
    patients.push(newPatientsData);
    return newPatientsData;
};
const addEntry = ({ entry, id }) => {
    var _a, _b;
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw Error('no patient with this ID');
    }
    switch (entry.type) {
        case 'HealthCheck':
            const newEntryDataHealthCheck = {
                id: (0, uuid_1.v4)(),
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                type: entry.type,
                healthCheckRating: entry.healthCheckRating
            };
            patient.entries.push(newEntryDataHealthCheck);
            return newEntryDataHealthCheck;
        case 'Hospital':
            const newEntryDataHospital = {
                id: (0, uuid_1.v4)(),
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                type: entry.type,
                discharge: {
                    date: entry.discharge.date,
                    criteria: entry.discharge.criteria,
                },
            };
            patient.entries.push(newEntryDataHospital);
            return newEntryDataHospital;
        case 'OccupationalHealthcare':
            const newEntryDataOccupational = {
                id: (0, uuid_1.v4)(),
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                type: entry.type,
                employerName: entry.employerName,
                sickLeave: {
                    startDate: (_a = entry.sickLeave) === null || _a === void 0 ? void 0 : _a.startDate,
                    endDate: (_b = entry.sickLeave) === null || _b === void 0 ? void 0 : _b.endDate,
                },
            };
            patient.entries.push(newEntryDataOccupational);
            return newEntryDataOccupational;
        // default:
        //     break;
    }
};
exports.default = {
    getPatients,
    getNonSensitivePatientsData,
    findById,
    addPatient,
    addEntry
};
