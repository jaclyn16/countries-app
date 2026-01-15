// the import useEffect/useState are react hooks that let us use them and run the code
// when the component loads... 
// the import routes, route, link are routing tools from react-router-dom, the 
// routes and route let us switch pages and link lets us navigate without refreshing page..
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// these are the imports for the page components..and the global css styling for the app
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import "./App.css";

// this imports the country data from the local js file as a backup if main
// api fails!!...
import localData from "../localData.js";

// this is the main app component..
// creates state to store the list of countries, and countriesData starts as an empty array.
// the const getCountries is an async function to fetch the country data from an api..
// the const response is a request to the rest countries api..
// const data converts the respone into JSON data, the setCountriesData saves it into state
// the catch error is if the fetch fails,log it.. and then use the local backup data instead
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
  // on line 37.. the useEffect runs once when the app component loads

  // this return is the JSX that renders everything on the screen..
  // header that appears on every page..lin that goes to home page and the saved countries
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
// on line 57...this is the country details page that shows with the url..
// the :id is a route parameter from the url

// export allows other files to use app...
export default App;
