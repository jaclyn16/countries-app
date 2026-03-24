import { useParams, useNavigate } from "react-router-dom";
// this import useParams lets us read the id from the url and useNavigate lets user move/back to another page

// react hooks for state..
import { useEffect, useState } from "react";

// this function is the countryDetails page component..
// it receives the full list of countriesData array as a prop from app.jsx...
// const grabs the id values from the url..
// const nav finds country that matches id..searches through the data array
function CountryDetails({ countriesData }) {
    const { id } = useParams();
    const navigate = useNavigate(); 
    // creates navigate function inside component to change pages...

    // holds view count we get from back end..
    const [viewCount, setViewCount] = useState(null);
   
    // finds the country object that matches url id..
    // countriesData...is full list of country objects
    // id= string from url
    const country = countriesData.find((country) => {
        return country.name.common === id;
    });
    // POST request updates the view count for this country...
    const storeCountryCount = async (countryObj) => {
    //    sends post request to backend endpoint..
        const response = await fetch(
            "/api/update-one-country-count",
            {
                method: "POST",
                // method..changing/updating data..
                // headers..tells backend sending JSON
                headers: {
                    'Content-Type': 'application/json',
                },
                // body..backend expects a key named country_name
                body: JSON.stringify({
                    country_name: countryObj.name.common,
                }),
            }
        );
        // returns JSON...a number
        const result = await response.json();
        console.log("count:", result.count);
        setViewCount(result.count);
        // setView...saves count in state so can render on the page..
    };
    // run when page loads..or..when url id changes/if is run successfully found a country
    useEffect(() => {
        if (country) {
            storeCountryCount(country);
        }
    }, [id]);
// id= dependency..rerun if changes

    // POST request..saves this country to database..
    const storeSavedCountryData = async (countryObj) => {
        // sends POST request to save one country
        // method post cause saving data..
        const response = await fetch(
            "/api/save-one-country",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                //  only sending the country_name for saving
                body: JSON.stringify({
                    country_name: countryObj.name.common,
                }),
            }
        );
        // returns text for this endpoint...
        //  backend return message..."success country has been saved"
        const result = await response.text();
        console.log(result);
    };
    // click handler for the save button
    const handleSaveCountry = () => {
        storeSavedCountryData(country);
    };
    
    return (
        <main className="page">
            <button className="back-btn" type="button" onClick={() => navigate(-1)}>← Back</button>
            <div className="details-layout">      
            <img className="detail-flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
           <div className="details-info"> 
                    <h2 className="details-title">{country.name.common}</h2>
           <button className="save-btn" type="button" onClick={handleSaveCountry}>Save</button>
           
            <p className="details-text">Population: {country.population}</p>
            <p className="details-text">Region: {country.region}</p>
                    <p className="details-text"> Capital: {country.capital?.[0]}</p>
                    {viewCount !== null && (
                        <p className="details-text">Viewed {viewCount} times</p>
                    )}
            </div>
            </div>
       </main>

    );
}
// export so app.jsx can use this page
export default CountryDetails;