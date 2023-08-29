import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NewDiaryEntry, Weather, Visibility } from "../../types";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewDiaryEntry) => void;
}

interface WeatherOption {
  value: Weather;
  label: string;
}
interface VisibilityOption {
  value: Visibility;
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
  value: v, label: v.toString()
}));
const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
  value: v, label: v.toString()
}));

const AddFlightForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Good);

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(g => g.toString() === value);
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(g => g.toString() === value);
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const addFlight = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date)
    onSubmit({
      date,
      comment,
      weather,
      visibility
    });
  };

  return (
    <div>
      <form onSubmit={addFlight}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"

            value={date}

            format="DD.MM.YYYY"

            onChange={(newValue) => {
              if (newValue === null) {
                return;
              }

              //  const rightData = new Date(newValue)
              //  console.log(  `${rightData.getFullYear()}-${rightData.getMonth()+1}-${rightData.getDate()}`)
              setDate(newValue);

            }}


          />
        </LocalizationProvider>


        <TextField
          label="Comment"
          fullWidth
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange}
        >
          {weatherOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
              }</MenuItem>
          )}
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
        <Select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange}
        >
          {visibilityOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
              }</MenuItem>
          )}
        </Select>

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
    </div>
  );
};

export default AddFlightForm;