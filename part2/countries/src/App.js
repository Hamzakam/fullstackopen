import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./Components/Countries";

const App = () => {
    const [newFilter, setNewFilter] = useState("");
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
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
