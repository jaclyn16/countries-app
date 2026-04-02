
# COUNTRIES APP 🌍

## 📌 Project Description & Purpose

-This project is a countries app that I built usin React!
-It shows information about different countries like their name, population, region, capital, as well as the countries flag.
-The goal of this project was to learn how to use APIs, React, and also connect a frontend to backend.

## 🚀 Live Site

Here's the link to view the live app: https://countries-version-4.netlify.app/

## 🖼️ Screenshots



## ✨ Features

This is what you can do on the app: 
- See a list of countries
- Click on a country to see more details
- Save countries
- Fill out a form with their information
- See a welcome message after submitting the form
- See how many times a country has been viewed

## 🛠️ Tech Stack

**Frontend**

- **Languages:** Javascript, HTML, CSS
- **Framework:** React (Vite)
- **Deployment:** Netlify

**Server/API**

- **Languages:** JavaScript
- **Framework:** Node.js
- **Deployment:** Express

**Database**

- **Languages:** PostgreSQL (Neon)
- **Deployment:** Neon

## 🔹 API Documentation

These are the API endpoints I built: 
1. POST /add-one-user **saves the user form
2. GET /get-newest-user **gets the newest user
3. POST /save-one-country **saves a country
4. GET /get-all-saved-countries **gets saved countries
5. POST /update-one-country-count **updates how many times a country was viewed

Here's the link to the full API documentation: https://github.com/ac-backend/countries-app-instructions/blob/main/version-3/api-documentation.md

## 🗄️ Database Schema

Here’s the SQL I used to create my tables:  

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  bio VARCHAR
  );

  CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL
  );

  CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL,
  count INTEGER NOT NULL
  );
```

## 💭 Reflections

**What I learned:** I learned how to use fetch to get data from an API and send data using POST requests. I also learned how frontend and backend connect!

**What I'm proud of:** I am proud that I got everything working together and understood how the data flows!

**What challenged me:** It was hard at first to understand how the API connects to the frontend and how to pass the data correctly.

**Future ideas for how I'd continue building this project:** 
1. Add a search feature
2. make the design look better
3. Add more features to save and organize countries

## 🙌 Credits & Shoutouts 

Shoutout to my instructors....
Class Lessons...
REST Countries API...
MDN Docs...

