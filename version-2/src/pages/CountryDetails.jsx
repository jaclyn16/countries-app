import { useParams, useNavigate } from "react-router-dom";
// this import useParams lets us read the id from the url and useNavigate lets user move/back to another page

// this function is the countryDetails page component..
// it receives the full list of countriesData array as a prop from app.jsx...
// line 9..const grabs the id values from the url..
// line 12....const finds country that matches id..searches through the data array
function CountryDetails({ countriesData }) {
    const { id } = useParams();
    const navigate = useNavigate(); 
// line 10 creates navigate function inside component to change pages...
    const country = countriesData.find((country) => {
        return country.name.common === id;
    });


    return (
        <main className="page">
            <button className="back-btn" type="button" onClick={() => navigate(-1)}>Back</button>
            <div className="details-layout">      
            <img className="detail-flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
           <div className="details-info"> 
                    <h2 className="details-title">{country.name.common}</h2>
           <button className="save-btn" type="button">Save</button>
           
            <p className="details-text">Population: {country.population}</p>
            <p className="details-text">Region: {country.region}</p>
            <p className="details-text"> Capital: {country.capital?.[0]}</p>
            </div>
            </div>
       </main>

    );
}
// export so app.jsx can use this page
export default CountryDetails;