import { Link } from "react-router-dom";
// line 1 imports link so the whole card can be clickable and go to another page..

// the function component creates one country card.. it recieves one country object as a prop..
// the const creates id for url..and if doesnt exist, use use country name..
// the return= what shows on the screen
function CountryCard({ country }) {
    const id = country.name.common;
    return (
        // this link when you click on card=it goes to details/id
        <Link to={`/details/${id}`} className="country-card-link"> 
        <div className="country-card">
            <img className="country-flag" src={country.flags.png} alt={`Flag of ${country.name.common}`}
                /> 
                {/* this holds the text info... line20 is an array,so shows the 1st one */}
       <div className="card-content"> 
            <h3 className="country-name">{country.name.common}</h3>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.[0]}</p>
        </div>
        </div>
        </Link>
    );
}
// this exports so other files can use this component
export default CountryCard;