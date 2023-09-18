// eslint-disable-next-line @typescript-eslint/no-empty-interface



export enum Gender {
    Female = 'female',
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
    entries: Entry[]
}

export type NonSensitivePatientsData = Omit<PatientsData, 'ssn' | 'entries'>;
export type NewPatientsData = Omit<PatientsData, 'id' | 'entries'>;

export interface DiagnosesData {
    code: string,
    name: string,
    latin?: string,
}
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesData['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: {
        date: string,
        criteria: string,
    },
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string;
    sickLeave?: {
        startDate?: string,
        endDate?: string,
    },
}

export type Entry =
    HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewEntryData = Omit<HospitalEntry, 'id'>|Omit<OccupationalHealthcareEntry, 'id'>|Omit<HealthCheckEntry, 'id'>;