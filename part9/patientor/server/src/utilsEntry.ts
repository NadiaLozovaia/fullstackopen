
import { DiagnosesData, HealthCheckRating, NewEntryData, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if (!isString(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
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

const parseDiagnosisCodes = (object: unknown): Array<DiagnosesData['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<DiagnosesData['code']>;
    }
    return object.diagnosisCodes as Array<DiagnosesData['code']>;
};

const isHealthCheckRating = (str: unknown): str is HealthCheckRating => {
    return typeof str === 'number' || str instanceof Number;;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating) || [0, 1, 2, 3].includes(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating');
    }
    return healthCheckRating;
};
const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};


// sickLeave?: {
//     startDate?: string,
//     endDate?: string,
// }
const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};

const isObject = (obj: unknown): obj is Object => {
    return typeof obj === 'object' || obj instanceof Object;;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
    if (!isObject(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    if ('date' in discharge && 'criteria' in discharge) {
        const newDischarge = {
            date: parseDate(discharge.date),
            criteria: parseCriteria(discharge.criteria)
        }
        return newDischarge;
    }
    throw new Error('Incorrect data: a field missing');
};
// sickLeave?: {
//     startDate?: string,
//     endDate?: string,
// }
const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate?: string | undefined } => {
    if (!isObject(sickLeave)) {
        throw new Error('Incorrect sickLeave');
    }

    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        const newSickLeave = {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)
        }
        return newSickLeave;
    }
    if ('startDate' in sickLeave) {
        const newSickLeave = {
            startDate: parseDate(sickLeave.startDate),

        }
        return newSickLeave;
    }
    throw new Error('Incorrect data: a field missing');

}
// Omit<HospitalEntry, 'id'>|Omit<OccupationalHealthcareEntry, 'id'>|Omit<HealthCheckEntry, 'id'>
const toNewEntryData = (object: unknown): NewEntryData => {
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
                    const newEntryDataHealthCheck: Omit<HealthCheckEntry, 'id'> = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object),
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return newEntryDataHealthCheck as Omit<HealthCheckEntry, 'id'>
                };
                throw new Error('Incorrect or missing healthCheckRating')

            case 'Hospital':
                if ('discharge' in object) {
                    const newEntryDataHospital: Omit<HospitalEntry, 'id'> = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object),
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    return newEntryDataHospital as Omit<HospitalEntry, 'id'>
                };
                throw new Error('Incorrect or missing discharge')

            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    if ('sickLeave' in object) {
                        const newEntryDataOccupational: Omit<OccupationalHealthcareEntry, 'id'> = {
                            description: parseDescription(object.description),
                            date: parseDate(object.date),
                            specialist: parseSpecialist(object.specialist),
                            diagnosisCodes: parseDiagnosisCodes(object),
                            type: object.type,

                            employerName: parseEmployerName(object.employerName),

                            sickLeave: parseSickLeave(object.sickLeave)
                        }
                        return newEntryDataOccupational as Omit<OccupationalHealthcareEntry, 'id'>
                    }
                    else {
                        const newEntryDataOccupational: Omit<OccupationalHealthcareEntry, 'id'> = {
                            description: parseDescription(object.description),
                            date: parseDate(object.date),
                            specialist: parseSpecialist(object.specialist),
                            diagnosisCodes: parseDiagnosisCodes(object),
                            type: object.type,

                            employerName: parseEmployerName(object.employerName),

                            // sickLeave: parseSickLeave(object.sickLeave)
                        }
                        return newEntryDataOccupational as Omit<OccupationalHealthcareEntry, 'id'>
                    }
                };
                throw new Error('Incorrect or missing employerName')
        }
        throw new Error('Incorrect data: a type missing');

    }
    throw new Error('Incorrect data: a type, description, date or specialist missing');
};

export default toNewEntryData;

