
import { DiagnosesData } from '../types';
import diagnosesData from '../../data/diagnoses';

const getDiagnoses = ():DiagnosesData[] => {
    console.log(diagnosesData[1]);
  return diagnosesData;
};


export default {
    getDiagnoses,
 
};