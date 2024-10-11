const OpenStreetMapAPI = require('../API/OpenStreetMapAPI');
const OpenWeatherMapAPI = require('../API/OpenWeatherMapAPI');
const LocationBuilder = require('../Builders/LocationBuilder');
const WeatherDataBuilder = require('../Builders/WeatherDataBuilder');
const LocationWeatherData = require('../DTO/LocationWeatherData');

const getLocationWeatherData = async (req, res) => {
    try {
        const locationQuery = req.query.location || 'Eiffel Tower, Paris';
        const locationData = await OpenStreetMapAPI.getLocationData(locationQuery);
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
        res.json(locationWeatherData);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching data' });
    }
};

module.exports = {
    getLocationWeatherData
};