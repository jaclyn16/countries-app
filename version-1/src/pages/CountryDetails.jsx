import { useParams } from "react-router-dom";
// this import useParams lets us read the id from the url

// this function is the countryDetails page component..
// it receives the full list of countriesData as a prop...
// line 9..const grabs the id from the url..
// line 10....const finds country thta matches id
function CountryDetails({ countriesData }) {
    const { id } = useParams();
    const country = countriesData.find(
        (c) => c.cca3 === id || c.name.common === id
    );
// if/else statement....if we couldn't find the country,show a message
    if (!country) {
        return <p>Country not found.</p>
    }
// if we DID find it, it will show these details....
    return (
        <main className="page">
           <h1 className="page-title">{country.name.common}</h1>
            <img className="country-flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
                <p>Capital: {country.capital?.[0]}</p>
       </main>

    );
}
// export so app.jsx can use this page
export default CountryDetails;