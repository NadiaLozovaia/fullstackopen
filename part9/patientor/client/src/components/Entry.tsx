import * as React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { useState } from "react";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import HealthRatingBar from "./HealthRatingBar";


import { DiagnosesData, Entry } from '../types';


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
interface Props {
    entry: Entry
    diagnoses: DiagnosesData[]
}



const EntryPatient = ({ entry, diagnoses }: Props) => {


    const [open, setOpen] = React.useState(false);


    const handleClick = () => {
        setOpen(!open);
    };
    const resultsOfDiagnoses: DiagnosesData[] = []

    const findDescriptionByCode = (diagnosisCode: string): DiagnosesData => {

        const diagnosis = diagnoses.find(({ code }) => code === diagnosisCode)
        if (!diagnosis) {
            // throw Error('diagnosis not found')
            return {code:diagnosisCode, name: 'no name'}
            
        }
        return diagnosis

    }

    if (entry.diagnosisCodes) {
        resultsOfDiagnoses.push(...entry.diagnosisCodes.map((diagnosisCode) => findDescriptionByCode(diagnosisCode)))

    }
    
    switch (entry.type) {

        case 'Hospital':


            return (

                <List key={entry.id}>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary={entry.date} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>


                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemText
                                primary={entry.description}
                            />
                            {resultsOfDiagnoses.map((result) =>

                                <ListItemText key={result.code}
                                    secondary={
                                        <Typography variant="body2" gutterBottom>
                                            {result.code} {result.name}
                                        </Typography>
                                    }

                                />
                            )}
                            {/* <ListItemText
                                secondary={entry.diagnosisCodes}
                           
                            /> */}
                            <ListItemText
                                primary={
                                    <Typography variant="body2" gutterBottom>
                                        discharge date {entry.discharge.date}
                                    </Typography>
                                }
                            />
                            <ListItemText
                                primary={
                                    <Typography variant="body2" gutterBottom>
                                        discharge criteria {entry.discharge.criteria}
                                    </Typography>
                                }
                            />
                            <ListItemText
                                primary={
                                    <Typography variant="body2" gutterBottom>
                                        diagnose by {entry.specialist}
                                    </Typography>
                                }
                            />
                        </List>
                    </Collapse>
                </List>

            )
        case 'OccupationalHealthcare':

            return (

                <List key={entry.id} >
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <MedicalServicesIcon />
                        </ListItemIcon>
                        <ListItemText primary={entry.date}
                            secondary={entry.employerName} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemText

                                primary={entry.description}
                            />
                            {resultsOfDiagnoses.map((result) =>

                                <ListItemText key={result.code}
                                    secondary={
                                        <Typography variant="body2" gutterBottom>
                                            {result.code} {result.name}
                                        </Typography>
                                    }

                                />
                            )}
                            {/* <ListItemText
                                secondary={entry.diagnosisCodes}
                            /> */}
                            <ListItemText
                                primary={entry.sickLeave?.startDate}
                            />
                            <ListItemText
                                primary={entry.sickLeave?.endDate}

                            />
                            <ListItemText
                                primary={
                                    <Typography variant="body2" gutterBottom>
                                        diagnose by {entry.specialist}
                                    </Typography>
                                }
                            />
                        </List>
                    </Collapse>
                </List>
            )
        case 'HealthCheck':

            return (
                <List key={entry.id} >
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <ChecklistRtlIcon />
                        </ListItemIcon>
                        <ListItemText primary={entry.date} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>



                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemText
                                primary={entry.description}
                            />
                            {resultsOfDiagnoses.map((result) =>

                                <ListItemText key={result.code}
                                    secondary={
                                        <Typography variant="body2" gutterBottom>
                                            {result.code} {result.name}
                                        </Typography>
                                    }

                                />
                            )}
                            {/* <ListItemText
                                secondary={entry.diagnosisCodes}
                            /> */}
                            <ListItemText
                                primary={
                                    <Typography variant="body2" gutterBottom>
                                        diagnose by {entry.specialist}
                                    </Typography>
                                }
                            />
                            <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
                        </List>
                    </Collapse>
                </List>
            )

        default:
            return assertNever(entry);
    }









};


export default EntryPatient