
export interface DiagnosesData {
    code: string,
    name: string,
    latin?: string,
}

export enum Gender {
    Femail = 'femail',
    Male = 'male',
    Other = 'other',
  }

export interface PatientsData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NonSensitivePatientsData = Omit<PatientsData, 'ssn'>;
export type NewPatientsData = Omit<PatientsData, 'id'>;