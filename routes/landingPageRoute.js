const express = require('express');
const router = express.Router();
const OpenStreetMapAPI = require('../API/OpenStreetMapAPI');
const OpenWeatherMapAPI = require('../API/OpenWeatherMapAPI');
const LocationBuilder = require('../Builders/LocationBuilder');
const WeatherDataBuilder = require('../Builders/WeatherDataBuilder');
const LocationWeatherData = require('../DTO/LocationWeatherData');
const { parse } = require('json2csv');
const xml = require('xml');
const { renderLandingPage } = require('../views/landingPageView');

router.get('/', renderLandingPage);

router.get('/location-weather', async (req, res) => {
    try {
        const city = req.query.location;
        const format = req.query.format || 'json';
        const locationData = await OpenStreetMapAPI.getLocationData(city);
        const weatherData = await OpenWeatherMapAPI.getWeatherData(locationData.lat, locationData.lon);

        const locationBuilder = new LocationBuilder()
            .setName(locationData.display_name)
            .setCoordinates(locationData.lat, locationData.lon)
            .setCity(locationData.address.city, locationData.address.country)
            .build();

        const weatherDataBuilder = new WeatherDataBuilder()
            .setTemperature(weatherData.main.temp)
            .setHumidity(weatherData.main.humidity)
            .setWindSpeed(weatherData.wind.speed)
            .build();

        const locationWeatherData = new LocationWeatherData(locationBuilder, weatherDataBuilder);

        if (format === 'json') {
            res.json(locationWeatherData);
        } else if (format === 'xml') {
            res.set('Content-Type', 'application/xml');
            const xmlData = xml([{ locationWeatherData: [
                { locationName: locationWeatherData.locationName },
                { latitude: locationWeatherData.latitude },
                { longitude: locationWeatherData.longitude },
                { cityName: locationWeatherData.cityName },
                { country: locationWeatherData.country },
                { temperature: locationWeatherData.temperature },
                { humidity: locationWeatherData.humidity },
                { windSpeed: locationWeatherData.windSpeed }
            ]}]);
            res.send(xmlData);
        } else if (format === 'csv') {
            const csv = parse(locationWeatherData);
            res.set('Content-Type', 'text/csv');
            res.send(csv);
        } else {
            res.status(400).send({ message: 'Invalid format' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: 'Error fetching data' });
    }
});

module.exports = router;