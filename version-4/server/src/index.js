// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// importing our Node modules

import express from "express";
import pg from "pg";
import config from "./config.js"; //importing database connection string..

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

// Creating an instance of the express module so that we can use all the methods that come with it

const app = express();

// Tell express which port to listen to to receive requests

const port = 3000;

// This server will be receiving JSON and responding in JSON

app.use(express.json());

app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
})


// 🌸USER HELPER FUNCTIONS FORM DATA....

// get-newest-user..
async function getNewestUser() { //this function gets newest user from database
    // this runs a sql query..gets all columns/sorts by newest-highest/only returns 1 user
    const result = await db.query(` 
        SELECT * FROM users       
        ORDER BY user_id DESC
        LIMIT 1;`);
    return result.rows; //send back the result rows
       
}
// get-all-users....
async function getAllUsers() { //function gets all the users from database
    // runs a sql query that gets every user
    const result = await db.query(`
        SELECT * FROM users;
        `);
    return result.rows; //returns all the rows
}
// add-one-user...
async function addOneUser(name, country_name, email, bio) { //function adds a user to database
    // this runs insert query/columns/placeholders/return new user
    const result = await db.query(` 
        INSERT INTO users (name, country_name, email, bio)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [name, country_name, email, bio]); //values go into $1-$4
    return result.rows; //returns the inserted user
}
// 🌸USER ENDPOINTS FORM DATA....

// get-newest-user...
app.get("/get-newest-user", async (req, res) => { //this endpoint returns newest user
    const data = await getNewestUser(); //calls helper function
    res.json(data);  //sends the data back as JSON
});

// get-all-users..
app.get("/get-all-users", async (req, res) => { //this endpoint returns all the users
    const data = await getAllUsers(); //calls helper function
    res.json(data); //sends the data back as JSON
});

// POST add-one-user..
app.post("/add-one-user", async (req, res) => {  //endpoint adds one user
    const { name, country_name, email, bio } = req.body; //gets values from request body
   await addOneUser(name, country_name, email, bio); //calls helper function/passes values
    res.send("Success! User has been added."); //send success message
});

// 🌻 SAVED COUNTRIES HELPER FUNCTIONS...

// get-all-saved-countries...
async function getAllSavedCountries() { //function gets all saved countries
    // runs the query to get country name column
    const result = await db.query(`
        SELECT country_name FROM saved_countries;
        `);
    return result.rows; //returns the results
}
// save-one-country...
async function saveCountry(country) { //function saves a country into table
    // this runs insert query/column name/placeholder/avoids duplicates/retuns inserted row
    const result = await db.query(`
        INSERT INTO saved_countries (country_name)
        VALUES ($1)
        ON CONFLICT (country_name) DO NOTHING
        RETURNING *;
        `, [country]); //replace $1 with actual country
    return result.rows; //returns the result
}
// unsave-one-country...
async function unsaveCountry(country) { //this function removes one country from table
    // this runs delete query/removes from table/match country/return deleted row
    const result = await db.query(`
        DELETE FROM saved_countries
        WHERE country_name = $1
        RETURNING *;
        `, [country]); //replaces $1
    return result.rows; //returns the result
}

// 🌻 SAVED COUNTRIES ENDPOINTS...

// get-all-saved-countries..
app.get("/get-all-saved-countries", async (req, res) => { //endpoint returns all saved countries
    const data = await getAllSavedCountries(); //calls the helper function
    res.json(data); //sends back data as json
});

// POST save-one-country..
app.post("/save-one-country", async (req, res) => {  //endpoint saves one country
    const { country_name } = req.body; //gets country name from body
    const data = await saveCountry(country_name); //calls helper
    res.send("Success! The country is saved"); //send success message
});

// POST unsave-one-country..
app.post("/unsave-one-country", async (req, res) => { //endpoint removes a country
    const { country_name } = req.body; //get country name from request
    const data = await unsaveCountry(country_name); //calls helper
    res.send("Success! The country is unsaved."); //send success message
});


// 🌹 COUNTRY COUNT HELPER FUNCTION...

// update-country-count..
async function updateCountryCount(country) { //function updates how many times a country is selected
    // runs insert/update query/insert new row/start count at 1/if already exists=add 1/return updated count
    const result = await db.query(`
        INSERT INTO country_counts (country_name, count)
        VALUES ($1, 1)
        ON CONFLICT (country_name)
        DO UPDATE SET count = country_counts.count + 1
        RETURNING count;
        `, [country]); //replaces $1
    return result.rows; //returns result
}

// 🌹 COUNTRY COUNT ENDPOINT...

// update-one-country-count..
app.post("/update-one-country-count", async (req, res) => { //endpoint updates the country count
    const { country_name } = req.body; //get country name from request
    const data = await updateCountryCount(country_name); //calls the helper function
    res.json(data[0]); //send back the updated count
});



// we need helper functions so the database logic stays separate and reusable and the endpoint just handles the request and response!!