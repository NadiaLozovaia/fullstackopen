import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <form onSubmit={(event) => { event.preventDefault() }}>
      <div>
        filter shown with: <input
          value={filterValue}
          onChange={handleFilterChange} />
      </div>
    </form>
  )
}

const Countries = ({ chosenCountry, showCountry }) => {
  if (chosenCountry.length === 0) {
    return 'No countries to show'
  }
  if (chosenCountry.length > 10) {
    return 'Too many matches, specify another filter '
  }
  if (chosenCountry.length === 1) {
    console.log(chosenCountry, '1')
    return null
  }
  return (
    <ul>
      {chosenCountry.map(country =>
        <div key={country.name.common}>
          <li>{country.name.common}
            <button onClick={() => showCountry([country])}>show</button>
          </li>
        </div>
      )}
    </ul>
  )
}

const Weather = ({weather}) => {
  if (Object.keys(weather).length === 0){return null}
  let temp = (weather.main.temp - 273.15).toFixed(1)
  console.log(weather.weather[0].icon)
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  console.log(weather.main)
  return(
    <div>
      <h3>Weather in {weather.name} </h3>
      <p>temerature {temp} Celcius</p>
      <img src = {icon}></img>
      <p>wind {weather.wind.speed} m/s </p>
    </div>
  ) 
}

const CountryOne = ({ chosenCountry }) => { 
  if (chosenCountry.length > 1) {
    return null
  }
  if (chosenCountry.length === 1) {
    console.log(chosenCountry, 'here')

    const languages = Object.values(chosenCountry[0].languages)
    const urlFlag = Object.values(chosenCountry[0].flags)[0]

    console.log(urlFlag)
    return (
      <div>
        <h2> {chosenCountry[0].name.common} </h2>
        <p> capital {chosenCountry[0].capital} </p>
        <p> area {chosenCountry[0].area} </p>

        <b>languages: </b>{languages.map(lang =>
          <div key={lang}>
            <li>{lang}
            </li>
          </div>)}

        <img src={urlFlag}>

        </img>

      </div>

    )
  }

}


const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [chosenCountry, setChosenCountry] = useState([])
  const [weather, setWeather] = useState({})
 
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, []

  )

  useEffect( () =>{
    console.log(chosenCountry, 'chosenCountry')
    if (chosenCountry.length !== 1) {setWeather({})}
    if (chosenCountry.length === 1){

    const lat = chosenCountry[0].capitalInfo.latlng[0]
    const lon = chosenCountry[0].capitalInfo.latlng[1]
    const api_key = process.env.REACT_APP_API_KEY
    // const api_key = '8c11faba33002e03f6de43e8a9dbbe87'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    console.log(url)
    // const weatherResponse = {    coord: {    lon: 24.93,    lat: 60.17    },    weather: [    {    id: 801,    main: "Clouds",    description: "few clouds",    icon: "02d"    }    ],    base: "stations",    main: {    temp: 283.18,    feels_like: 282.38,    temp_min: 277.97,    temp_max: 286.95,    pressure: 997,    humidity: 82    },    visibility: 10000,    wind: {    speed: 3.58,    deg: 188,    gust: 4.02    },    clouds: {    all: 20    },    dt: 1682322281,    sys: {    type: 2,    id: 2011913,    country: "FI",    sunrise: 1682303876,    sunset: 1682359123    },    timezone: 10800,    id: 658225,    name: "Helsinki",    cod: 200    }
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })

      // setWeather(weatherResponse)
    

    }
  },[chosenCountry])


  const handleFilterChange = (event) => {
    setValue(event.target.value)
    setChosenCountry(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const showCountry = (country) => 
  {
    setChosenCountry(country)
  }
  
  return (
    <div>
        <Filter filterValue={value} handleFilterChange={handleFilterChange} />
        <Countries chosenCountry={chosenCountry} showCountry={showCountry} />
        <CountryOne chosenCountry={chosenCountry}/>
        <Weather weather={weather}/>
      </div>
   



  )
}

export default App