
import { v4 as uuidv4 } from 'uuid';
import { PatientsData, NonSensitivePatientsData, NewPatientsData, NewEntryData, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import patientsData from '../../data/patients-full';


const patients: PatientsData[] = patientsData;

const getPatients = (): PatientsData[] => {
    console.log(patientsData[1]);
    return patientsData;
};

const getNonSensitivePatientsData = (): NonSensitivePatientsData[] => {
    return patients.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
};

const findById = (id: string): PatientsData | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (patient: NewPatientsData): PatientsData => {
    const newPatientsData = {
        id: uuidv4(),
        entries: [],
        ...patient
    };

    patients.push(newPatientsData);
    return newPatientsData;
};

//   api/patients/:id/entries

interface Props {
    entry: NewEntryData,
    id: string
}

const addEntry = ({ entry, id }: Props): Entry => {

    const patient = patients.find(p => p.id === id)
    if (!patient) { throw Error('no patient with this ID') }

    switch (entry.type) {
        case 'HealthCheck':
            const newEntryDataHealthCheck: HealthCheckEntry = {
                id: uuidv4(),
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                type: entry.type,
                healthCheckRating: entry.healthCheckRating
            };
            patient.entries.push(newEntryDataHealthCheck)
            return newEntryDataHealthCheck
        case 'Hospital':

            const newEntryDataHospital: HospitalEntry = {
                id: uuidv4(),
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
            patient.entries.push(newEntryDataHospital)
            return newEntryDataHospital

        case 'OccupationalHealthcare':
            const newEntryDataOccupational: OccupationalHealthcareEntry = {
                id: uuidv4(),
                description: entry.description,
                date: entry.date,
                specialist: entry.specialist,
                diagnosisCodes: entry.diagnosisCodes,
                type: entry.type,
                employerName: entry.employerName,
                sickLeave: {
                    startDate: entry.sickLeave?.startDate,
                    endDate: entry.sickLeave?.endDate,
                },
            };
            patient.entries.push(newEntryDataOccupational)
            return newEntryDataOccupational

        // default:
        //     break;
    }

};


export default {
    getPatients,
    getNonSensitivePatientsData,
    findById,
    addPatient,
    addEntry
};