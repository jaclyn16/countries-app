// react hooks...useState lets us store and update the form input values
import { useEffect, useState } from "react";

// a component the renders the saved countries page..the newest user..a profile form
// the const formData stores all the the input values into 1 object..
// each key "" matches the inputs name attribute...
function SavedCountries({ countriesData }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        bio: "",
    });
    // api data state..stores newest user data and saved countries from backend..
    const [newestUserData, setNewestUserData] = useState(null);
    const [savedCountries, setSavedCountries] = useState([]);
    // this function runs everytime the user types in the input..
    // the setFormData..updates only when being changed, when the form data stays the same..
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // fetches saved contries..
    // the const data converts response to java script data..
    // the setSavedCountries...saves data to state..
    const getSavedCountriesData = async () => {
        try {
            const response = await fetch(
                "/api/get-all-saved-countries",
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setSavedCountries(data);
        } catch (error) {
            console.log(error);
            }
    };
    // runs once when page loads
     useEffect(() => {
    getSavedCountriesData();
  }, []);
    // fetches newest user..
    const getNewestUserData = async () => {
        try {
            const response = await fetch(
                '/api/get-newest-user',
                {
                    method: "GET",
                }
            );
            // api returns an array, so grabs the 1st object..
            const data = await response.json();
            const userData = data[0];
            // save newest user to state
            setNewestUserData(userData);
        } catch (error) {
            console.log(error);
        }
    };
     useEffect(() => {
    getNewestUserData();
     }, []);
    // match saved countries to full country data..savedCountries has country name..countriesData has full country info
    // .map loops over saved countries... .find finds the matching full country object
    const matchedSavedCountries = savedCountries.map((item) => {
        return countriesData.find(
            (country) => country.name?.common === item.country_name
        );
    })
// sends user form data to the backend so can be saved..= when the form is filled out & clicks submit,,
    const storeUserData = async (data) => {
        // POST...sends data to the server to add one user...
        const response = await fetch(
            '/api/add-one-user',
            {
                method: "POST",
                // tells backend we're sending JSON
                headers: {
                    'Content-Type': 'application/json',
                },
                // body must be a string for fetch cause api's dont understand JS objects..need json
                // form is submitted, takes users input & converts into JSON so backend can store it.
                body: JSON.stringify({
                    name: data.fullName,
                    country_name: data.country,
                    email: data.email,
                    bio: data.bio,
                }),
            }
        );
        // this is backend return message.."success user added"
        const result = await response.text();
        console.log("POST result:", result);
    };
// POST request to save one country..to the backend database
    const saveCountryData = async (countryName) => {
        // sending a country_name to be stored in database
        const response = await fetch(
            "/api/save-one-country",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                // only sending the country_name for saving
                body: JSON.stringify({
                    country_name: countryName,
                }),
            }
        );
        // backend return message..."success country has been saved"
        const result = await response.text();
        console.log("Saved country result:", result);
    };
   
    // handles form submit..function runs when the form is submitted...
    // the e.prevent stops page from refreshing
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted Profile Info..", formData);
        // this instantly updates welcome message 
        setNewestUserData({
            name: formData.fullName,
        });
        await storeUserData(formData);
        // this just resets the form after was submitted
        setFormData({
            fullName: "",
            email: "",
            country: "",
            bio: "",
        });
    };
    // this is the jsx that returns what to be displayed on page..
    return (
        <main className="page">
            <h2 className="page-title">My Saved Countries</h2>
            <section className="countries-section">
                {matchedSavedCountries.map((country) => (
                    <div className="country-card" key={country.cca3}>
                        <img className="country-flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                       <div className="card-content"> 
                        <h3>{country.name.common}</h3>
                        <p>Population: {country.population}</p>
                        <p>Region: {country.region}</p>
                        <p>Capital: {country.capital?.[0]}</p>
                        </div>
                    </div>
                ))}
            </section>
            {newestUserData && (
                <h2 className="welcome-message">
                    Welcome, {newestUserData.name}!</h2>
            )}
            
            <section className="saved-layout">
                <div className="profile-card">
                  <h2 className="section-title">My Profile</h2>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}/>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange}/>
                    <textarea name="bio" placeholder="Bio" rows="6" value={formData.bio} onChange={handleChange}/>
                    <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

// export so the app.jsx can use this page
export default SavedCountries;