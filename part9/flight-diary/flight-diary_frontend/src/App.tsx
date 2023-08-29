import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

// import { apiBaseUrl } from "./constants";
import { DiaryEntry } from "./types";

import flightsService from "./services/flights";
import FlightsListPage from "./components/FlightsListPage/FlightsListPage";

const App = () => {
  const [flights, setFlights] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    // void axios.get<void>(`${apiBaseUrl}/ping`);
    void axios.get<void>(`http://localhost:3000/ping`);

    const fetchPatientList = async () => {
      const flights = await flightsService.getAll();
      setFlights(flights);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Flight Diary
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<FlightsListPage flights={flights} setFlights={setFlights} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
