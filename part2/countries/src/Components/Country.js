import { useState } from "react";
import Languages from "./Languages";
import Weather from "./Weather";
const Country = ({ country, singleShow }) => {
    const [showCountry, setShowCountry] = useState(false);
    const handleShowClick = () => setShowCountry(!showCountry);

    if (showCountry || singleShow === true) {
        return (
            <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <Languages languages={country.languages} />
                <img
                    width="200"
                    height="150"
                    src={country.flag}
                    alt={country.name + "flag"}
                />
                <Weather capital={country.capital} />
            </div>
        );
    } else {
        return (
            <div>
                {country.name}{" "}
                <button onClick={handleShowClick}>{"show"}</button>
            </div>
        );
    }
};
export default Country;
