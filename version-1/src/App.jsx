// line 4 is importing we need from the react-router...the routes/route lets us switch
// pages.. and link lets us click to navigate without reloading page..
// lines 5-8 are the page componeents and css styling on line 8
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import "./App.css";

// this imports the country data from the local js file
import localData from "../localData.js";

// this is the main app component..the return is what shows back on screen.. link to home page
// link to saved countries page..
function App() {
  const [countriesData, setCountriesData] = useState([]);
  const getCountriesData = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      const data = await response.json();
      setCountriesData(data);
    } catch (error) {
      console.log("Error fetching countries:", error);
      setCountriesData(localData);
    }
  };
  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <Link className="app-title" to="/">Where in the world?</Link>
        <Link className="app-link" to="/saved">Saved Countries</Link>
      </header>
{/* these are routes=different pages in the app= when the url is /. shows the home page, */}
      {/* we pass local data into home as a prop called countriesData.. */}
      {/* when the url is /saved, it shows savedCountries page */}
      {/* when the url is /details/id, it shows the countryDetails page that passes localdata into it */}
      <Routes>
        <Route path="/" element={<Home countriesData={countriesData} />} />
        <Route path="/saved" element={<SavedCountries countriesData={countriesData} />} />
        <Route path="/details/:id" element={<CountryDetails countriesData={countriesData} />} />
      </Routes>
    </div>
  );
}
// export allows other files to use app...
export default App;
