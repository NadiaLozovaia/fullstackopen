import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from "../../types";
import AddFlightModal from "../AddFlightModal";

// import HealthRatingBar from "../HealthRatingBar";

import flightsService from "../../services/flights";

interface Props {
    flights: DiaryEntry[]
    setFlights: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const FlightsListPage = ({ flights, setFlights }: Props) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewFlight = async (values: NewDiaryEntry) => {
        try {
            const flight = await flightsService.create(values);
            setFlights(flights.concat(flight));
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
            <Box>
                <Typography align="center" variant="h6">
                    Flights list
                </Typography>
            </Box>
            <Table style={{ marginBottom: "1em" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Visibility</TableCell>
                        <TableCell>Weather</TableCell>
                        <TableCell>Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(flights).map((flight: DiaryEntry) => (
                        <TableRow key={flight.id}>
                            <TableCell>{flight.date}</TableCell>
                            <TableCell>{flight.visibility}</TableCell>
                            <TableCell>{flight.weather}</TableCell>
                            <TableCell>{flight.comment}</TableCell>
                            {/* <TableCell>
                                <HealthRatingBar showText={false} rating={1} />
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddFlightModal
                modalOpen={modalOpen}
                onSubmit={submitNewFlight}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Flight
            </Button>
        </div>
    );
};

export default FlightsListPage;
