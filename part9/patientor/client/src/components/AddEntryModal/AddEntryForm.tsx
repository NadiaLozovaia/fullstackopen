import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Input } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';



import { NewEntryData, HealthCheckRating, DiagnosesData } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: NewEntryData) => void;
    diagnoses: DiagnosesData[]
}

interface DiagnosesOption {
    value: DiagnosesData
    label: DiagnosesData['code'];
}

interface HelthRaitingOption {
    value: HealthCheckRating
    label: string;
}

interface TypeOption {
    value: 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'
    label: string;
}

const helthRaitingOptions: HelthRaitingOption[] = Object.values(HealthCheckRating).filter(k => typeof k === 'string').map(v => {
    const indexOfS = Object.values(HealthCheckRating).indexOf(v as unknown as HealthCheckRating);
    // console.log( HealthCheckRating[indexOfS])
    return { value: indexOfS, label: HealthCheckRating[indexOfS] }
}
);

const typeOptions: TypeOption[] = [{ value: 'Hospital', label: 'Hospital' },
{ value: 'OccupationalHealthcare', label: 'Occupational Healthcare Entry' },
{ value: 'HealthCheck', label: 'HealthCheck Entry' }]

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {

    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState({ value: 'Hospital', label: 'Hospital Entry' });
    // const [diagnosisCode, setDiagnosisCode] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HelthRaitingOption>(helthRaitingOptions[0]);
    const [discharge, setDischarge] = useState<{ date: string, criteria: string }>({ date: '', criteria: '' });
    const [employerName, setEmployerName] = useState('');
    const [sickLeave, setSickLeave] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });

    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const diagnosesOptions: DiagnosesOption[] = diagnoses.map(d => ({ value: d, label: d.code }))


    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        console.log(value)
        setDiagnosisCodes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );

    }

    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            const indexOfS = Object.values(HealthCheckRating).indexOf(value as unknown as HealthCheckRating);
            const healthCheckRating = { value: indexOfS, label: HealthCheckRating[indexOfS] }
            console.log(healthCheckRating)
            if (healthCheckRating) {
                setHealthCheckRating(healthCheckRating);
            }
        }
    };


    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;

            const type = typeOptions.find(t => t.value.toString() === value);
            if (type) {
                setType(type);
            }
        }
    };



    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        // const diagnosisArray: Array<DiagnosesData['code']> = diagnosisCode.split(',');
        const diagnosisArray: Array<DiagnosesData['code']> = diagnosisCodes;

        switch (type.value) {
            case 'HealthCheck':
                const indexOfS = Object.values(HealthCheckRating).indexOf(healthCheckRating.value as unknown as HealthCheckRating);
                onSubmit({

                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisArray,
                    type: type.value,
                    healthCheckRating: indexOfS

                });
                break;
            case 'Hospital':

                onSubmit({
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisArray,
                    type: type.value,
                    discharge: {
                        date: discharge.date,
                        criteria: discharge.criteria,
                    },

                });

                break;
            case 'OccupationalHealthcare':

                onSubmit({
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisArray,
                    type: type.value,
                    employerName: employerName,
                    sickLeave: {
                        startDate: sickLeave?.startDate,
                        endDate: sickLeave?.endDate,
                    },

                });

                break;
        };
    }
    const onTypeField = () => {
        console.log(type)
        switch (type.value) {
            case 'Hospital':

                return (
                    <div>
                        <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
                        {/* <TextField
                            required
                            label="discharge date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={discharge.date}
                            onChange={({ target }) => setDischarge({ date: target.value, criteria: discharge.criteria })}
                        /> */}
                        <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
                        <Input

                            required
                            type="date"
                            fullWidth
                            value={discharge.date}
                            onChange={({ target }) => setDischarge({ date: target.value, criteria: discharge.criteria })} />
                        <TextField
                            required
                            label="discharge criteria"
                            fullWidth
                            value={discharge.criteria}
                            onChange={({ target }) => setDischarge({ date: discharge.date, criteria: target.value })}
                        />

                    </div>
                );

            case 'HealthCheck':
                return (
                    <div>
                        <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>

                        <Select
                            // label="healthCheckRating"
                            fullWidth
                            value={healthCheckRating.label}
                            onChange={onHealthCheckRatingChange}
                        >
                            {helthRaitingOptions.map(option => {

                                return (
                                    <MenuItem
                                        key={option.value}
                                        value={option.label}
                                    >
                                        {option.label
                                        }</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                )
            case 'OccupationalHealthcare':

                return (
                    <div>
                        <TextField
                            required
                            label="employer name"
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                        />
                        <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
                        <InputLabel style={{ marginTop: 20 }}>Start date</InputLabel>
                        {/* <TextField
                            label="start date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={sickLeave.startDate}
                            onChange={({ target }) => setSickLeave({ startDate: target.value, endDate: sickLeave.endDate })}

                        /> */}
                        <Input
                            required
                            type="date"
                            fullWidth
                            value={sickLeave.startDate}
                            onChange={({ target }) => setSickLeave({ startDate: target.value, endDate: sickLeave.endDate })} />
                        <InputLabel style={{ marginTop: 20 }}>End date</InputLabel>
                        <Input
                            required
                            type="date"
                            fullWidth
                            value={sickLeave.endDate}
                            onChange={({ target }) => setSickLeave({ startDate: sickLeave.startDate, endDate: target.value })} />
                        {/* <TextField
                            label="end date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={sickLeave.endDate}
                            onChange={({ target }) => setSickLeave({ startDate: sickLeave.startDate, endDate: target.value })}

                        /> */}


                    </div>

                )
        }
    };

    const blocWithTyps = onTypeField()

    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField
                    required
                    label="description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    required
                    label="specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                {/* <TextField
                    required

                    label="Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                /> */}
                <InputLabel style={{ marginTop: 20 }}>Date </InputLabel>
                <Input
                    required
                    type="date"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)} />
                {/* <TextField
                    label="diagnosisCodes"
                    fullWidth
                    value={diagnosisCode}
                    onChange={({ target }) => setDiagnosisCode(target.value)}
                /> */}



                <InputLabel style={{ marginTop: 20 }}>DiagnosisCodes</InputLabel>
                <Select

                    fullWidth
                    multiple
                    value={diagnosisCodes}
                    onChange={handleChange}
                    input={<OutlinedInput label="Code" />}

                >
                    {diagnosesOptions.map(d => (
                        <MenuItem
                            key={d.label}
                            value={d.label}
                        >
                            {d.label}
                        </MenuItem>
                    ))}
                </Select>






                <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
                <Select
                    // label="Type"
                    fullWidth
                    value={type.value}
                    onChange={onTypeChange}

                >
                    {typeOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >
                            {option.label
                            }</MenuItem>
                    )}
                </Select>

                {blocWithTyps}
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div >
    );
};

export default AddEntryForm;