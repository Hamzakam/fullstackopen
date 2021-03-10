import Country from "./Country";

const Countries = ({ countries, newFilter }) => {
    const filteredData = countries.filter((country) => {
        return (
            newFilter === "" ||
            country.name.toLowerCase().includes(newFilter.toLowerCase())
        );
    });

    if (filteredData.length <= 10) {
        if (filteredData.length === 1) {
            return <Country country={filteredData[0]} singleShow={true} />;
        } else {
            return filteredData.map((country) => {
                return (
                    <div key={country.name}>
                        <Country country={country} />
                    </div>
                );
            });
        }
    } else {
        return <div>Too Many Countries.Specify another filter</div>;
    }
};
export default Countries;
