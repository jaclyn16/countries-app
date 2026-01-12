// this imports the countryCard component so can be reused for each country
import CountryCard from "../components/CountryCard.jsx";

// this function is the home page component... it recieves countriesData=the big list of countries
// as a prop
// return shows info and map() loops through every country in the list=for each country we create a country card
// key helps react keep track of each item in the list on line 13
function Home({ countriesData }) {
    return (
        <main className="page"> 
        <div className="cards-grid"> 
            {countriesData.map((country) => (
                <CountryCard key={country.cca3 || country.name.common} country={country} />
            ))}
        </div>
        </main>
    );
}
// export so app.jsx can use this page
export default Home;