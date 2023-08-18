"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default;
const getPatients = () => {
    console.log(patients_1.default[1]);
    return patients_1.default;
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
// const findById = (id: string): PatientsData | undefined => {
//     const patient = patients.find(p => p.id === id);
//     return patient;
//   };
const addPatient = (patient) => {
    const newPatientsData = Object.assign({ id: (0, uuid_1.v4)() }, patient);
    patients.push(newPatientsData);
    return newPatientsData;
};
exports.default = {
    getPatients,
    getNonSensitivePatientsData,
    // findById,
    addPatient
};
