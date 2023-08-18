"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
// const isDate = (dateOfBirth: string): boolean => {
//     return Boolean(Date.parse(dateOfBirth));
// };
// const parseDate = (dateOfBirth: unknown): string => {
//     if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
//         throw new Error('Incorrect date: ' + dateOfBirth);
//     }
//     return dateOfBirth;
// };
const parseDate = (dateOfBirth) => {
    if (!isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing name');
    }
    return occupation;
};
const toNewPatientData = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: a field missing');
};
exports.default = toNewPatientData;
