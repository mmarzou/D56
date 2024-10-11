const express = require('express');
const app = express();
require('dotenv').config();

// Routes
const jsonRoute = require('./routes/jsonRoute');
const xmlRoute = require('./routes/xmlRoute');
const csvRoute = require('./routes/csvRoute');

// Landing page
app.get('/', (req, res) => {
    res.send(`
        <h1>D56 - API</h1>
        <ul>
            <li><a href="/json">JSON Route</a></li>
            <li><a href="/xml">XML Route</a></li>
            <li><a href="/csv">CSV Route</a></li>
        </ul>
    `);
});
app.use('/json', jsonRoute);
app.use('/xml', xmlRoute);
app.use('/csv', csvRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Il y a un problème chef!' });
});

// DTOs testing
const City = require('./models/City');
const Coordinates = require('./models/Coordinates');
const Location = require('./models/Location');
const WeatherData = require('./models/WeatherData');
const LocationWeatherData = require('./DTO/LocationWeatherData');

// Create instances of your models
// const city = new City('Paris', 'France');
// const coordinates = new Coordinates(48.8566, 2.3522);
// const location = new Location('Tour Eiffel', coordinates, city);
// const weatherData = new WeatherData(18, 65, 10);

// // Create an instance of LocationWeatherData DTO
// const locationWeatherData = new LocationWeatherData(location, weatherData);
// console.log(locationWeatherData);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;