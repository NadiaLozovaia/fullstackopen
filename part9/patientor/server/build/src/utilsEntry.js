"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseDate = (date) => {
    if (!isString(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
// const parseType = (type: unknown): string => {
//     if (!isString(type) || !['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type)) {
//         throw new Error('Incorrect or missing gender');
//     }
//     return type;
// };
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
const isHealthCheckRating = (str) => {
    return typeof str === 'number' || str instanceof Number;
    ;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!isHealthCheckRating(healthCheckRating) || [0, 1, 2, 3].includes(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating');
    }
    return healthCheckRating;
};
const parseCriteria = (criteria) => {
    if (!isString(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};
// sickLeave?: {
//     startDate?: string,
//     endDate?: string,
// }
const parseEmployerName = (employerName) => {
    if (!isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};
const isObject = (obj) => {
    return typeof obj === 'object' || obj instanceof Object;
    ;
};
const parseDischarge = (discharge) => {
    if (!isObject(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    if ('date' in discharge && 'criteria' in discharge) {
        const newDischarge = {
            date: parseDate(discharge.date),
            criteria: parseCriteria(discharge.criteria)
        };
        return newDischarge;
    }
    throw new Error('Incorrect data: a field missing');
};
// sickLeave?: {
//     startDate?: string,
//     endDate?: string,
// }
const parseSickLeave = (sickLeave) => {
    if (!isObject(sickLeave)) {
        throw new Error('Incorrect sickLeave');
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        const newSickLeave = {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)
        };
        return newSickLeave;
    }
    if ('startDate' in sickLeave) {
        const newSickLeave = {
            startDate: parseDate(sickLeave.startDate),
        };
        return newSickLeave;
    }
    throw new Error('Incorrect data: a field missing');
};
// Omit<HospitalEntry, 'id'>|Omit<OccupationalHealthcareEntry, 'id'>|Omit<HealthCheckEntry, 'id'>
const toNewEntryData = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object &&
        'description' in object &&
        'date' in object &&
        'specialist' in object) {
        switch (object.type) {
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    const newEntryDataHealthCheck = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object),
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return newEntryDataHealthCheck;
                }
                ;
                throw new Error('Incorrect or missing healthCheckRating');
            case 'Hospital':
                if ('discharge' in object) {
                    const newEntryDataHospital = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object),
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    return newEntryDataHospital;
                }
                ;
                throw new Error('Incorrect or missing discharge');
            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    if ('sickLeave' in object) {
                        const newEntryDataOccupational = {
                            description: parseDescription(object.description),
                            date: parseDate(object.date),
                            specialist: parseSpecialist(object.specialist),
                            diagnosisCodes: parseDiagnosisCodes(object),
                            type: object.type,
                            employerName: parseEmployerName(object.employerName),
                            sickLeave: parseSickLeave(object.sickLeave)
                        };
                        return newEntryDataOccupational;
                    }
                    else {
                        const newEntryDataOccupational = {
                            description: parseDescription(object.description),
                            date: parseDate(object.date),
                            specialist: parseSpecialist(object.specialist),
                            diagnosisCodes: parseDiagnosisCodes(object),
                            type: object.type,
                            employerName: parseEmployerName(object.employerName),
                            // sickLeave: parseSickLeave(object.sickLeave)
                        };
                        return newEntryDataOccupational;
                    }
                }
                ;
                throw new Error('Incorrect or missing employerName');
        }
        throw new Error('Incorrect data: a type missing');
    }
    throw new Error('Incorrect data: a type, description, date or specialist missing');
};
exports.default = toNewEntryData;
