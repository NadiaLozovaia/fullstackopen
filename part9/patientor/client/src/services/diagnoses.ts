import axios from "axios";
import { DiagnosesData } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
  const { data } = await axios.get<DiagnosesData[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );

//   return data;
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllDiagnoses
};

