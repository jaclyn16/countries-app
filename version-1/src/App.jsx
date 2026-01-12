// line 4 is importing we need from the react-router...the routes/route lets us switch
// pages.. and link lets us click to navigate without reloading page..
// lines 5-8 are the page componeents and css styling on line 8
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import "./App.css";

// this imports the country data from the local js file
import localData from "../localData.js";
console.log(localData);

// this is the main app component..the return is what shows back on screen.. link to home page
// link to saved countries page..
function App() {
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
        <Route path="/" element={<Home countriesData={localData} />} />
        <Route path="/saved" element={<SavedCountries />} />
        <Route path="/details/:id" element={<CountryDetails countriesData={localData} />} />
      </Routes>
    </div>
  );
}
// export allows other files to use app...
export default App;
