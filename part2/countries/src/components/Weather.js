import { React, useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ targetCity }) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    if (!weather.main) {
        return <></>
    }

    return (
        <div>
            <h2>Weather in {targetCity}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather