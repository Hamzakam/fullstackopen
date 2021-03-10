import axios from "axios";
import { useEffect, useState } from "react";
const api_key = process.env.REACT_APP_API_KEY;
const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
            )
            .then((res) => {
                setWeather(res.data.current);
            });
    }, [capital]);
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>
                <b>temperature</b>:{weather.temperature}&deg;
            </p>
            <img
                src={weather.weather_icons ? weather.weather_icons[0] : null}
                onError={(e) => (e.src = "")}
                alt={"weather icon at " + capital}
            />
            <p>
                <b>wind:</b>
                {weather.wind_speed} mph direction {weather.wind_dir}
            </p>
        </div>
    );
};
export default Weather;
