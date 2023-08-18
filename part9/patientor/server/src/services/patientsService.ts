
import { v4 as uuidv4 } from 'uuid';
import { PatientsData, NonSensitivePatientsData, NewPatientsData } from '../types';
import patientsData from '../../data/patients';


const patients: PatientsData[] = patientsData;

const getPatients = (): PatientsData[] => {
    console.log(patientsData[1]);
    return patientsData;
};

const getNonSensitivePatientsData = (): NonSensitivePatientsData[] => {
    return patients.map(({ id,
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

// const findById = (id: string): PatientsData | undefined => {
//     const patient = patients.find(p => p.id === id);
//     return patient;
//   };

const addPatient = ( patient: NewPatientsData ): PatientsData => {
    const newPatientsData = {
      id: uuidv4(),
      ...patient
    };
  
    patients.push(newPatientsData);
    return newPatientsData;
  };

export default {
    getPatients,
    getNonSensitivePatientsData, 
    // findById,
    addPatient

};