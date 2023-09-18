import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, List, ListSubheader } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
// import axios from 'axios';
// import HealthRatingBar from "../HealthRatingBar";
import { Patient, Entry, DiagnosesData, NewEntryData } from "../../types";
import EntryPatient from "../Entry";
import patientService from "../../services/patients";
import AddEntryModal from "../AddEntryModal";

interface Props {
    patients: Patient[]
    diagnoses: DiagnosesData[]
}

const PatientPage = ({ patients, diagnoses }: Props) => {

    const id = useParams().id
    if (!id) {
        throw Error
    }

    const patient: Patient | undefined = patients.find(p => p.id === id)

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        if (patient) {
            setEntries(patient.entries)
        }
    },[patient])

    if (!patient) {
        return (

            <div className="App">
                <Box>
                    <Typography align="left" variant="h6">
                        Patient not found
                    </Typography>
                </Box>

            </div >
        );
    }

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: NewEntryData) => {
        try {
            const entry = await patientService.addEntry(values, id);
            console.log(entry)
            setEntries(entries.concat(entry));
            console.log(entries, 'entries')
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <div className="App">

            <div>
                <Box>
                    <Typography align="left" variant="h6">
                        {patient.name}
                        {patient.gender === 'male' ? <MaleIcon />
                            : patient.gender === 'female' ? <FemaleIcon />
                                : <TransgenderIcon />}

                    </Typography>
                </Box>

                <Table style={{ marginBottom: "1em" }}>

                    <TableBody>
                        <TableRow>
                            <TableCell>snn: {patient.ssn}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>occupation: {patient.occupation}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>date of birth: {patient.dateOfBirth}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>


            </div >
            <div>
                <List

                    sx={{ width: '80%' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" >
                            <Typography align="left" variant="h6">
                                Entries
                            </Typography>
                        </ListSubheader>
                    }
                >

                    {entries.map((entry: Entry) => (
                        <EntryPatient entry={entry} key={entry.id} diagnoses={diagnoses} />
                    ))}

                </List>
            </div >
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                diagnoses = {diagnoses}
                
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div >
    );
};

export default PatientPage;
