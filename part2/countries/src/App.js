import axios from "axios";
import { useEffect, useState } from "react";
const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map((language) => {
                    return <li key={language.name}>{language.name}</li>;
                })}
            </ul>
            <img
                width="200"
                height="150"
                src={country.flag}
                alt={country.name + "flag"}
            />
        </div>
    );
};
const Countries = ({ countries, newFilter }) => {
    const filteredData = countries.filter((country) => {
        return (
            newFilter === "" ||
            country.name.toLowerCase().includes(newFilter.toLowerCase())
        );
    });
    if (filteredData.length <= 10) {
        if (filteredData.length === 1) {
            return <Country country={filteredData[0]} />;
        } else {
            return filteredData.map((country) => {
                return <div key={country.name}>{country.name}</div>;
            });
        }
    } else {
        return <div>Too Many Countries.Specify another filter</div>;
    }
};
const App = () => {
    const [newFilter, setNewFilter] = useState("");
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
            console.log(res.data);
            setCountries(res.data);
        });
    }, []);
    return (
        <div>
            find countries:
            <input
                onChange={(e) => setNewFilter(e.target.value)}
                value={newFilter}
            />
            <Countries countries={countries} newFilter={newFilter} />
        </div>
    );
};
export default App;
