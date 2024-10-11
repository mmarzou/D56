const City = require('../models/City');
const Coordinates = require('../models/Coordinates');
const Location = require('../models/Location');
const WeatherData = require('../models/WeatherData');
const LocationWeatherData = require('../DTO/LocationWeatherData');

describe('Models and DTOs', () => {
    it('should create a City object', () => {
        const city = new City('Paris', 'France');
        expect(city.name).toBe('Paris');
        expect(city.country).toBe('France');
    });

    it('should create a Coordinates object', () => {
        const coordinates = new Coordinates(48.8566, 2.3522);
        expect(coordinates.latitude).toBe(48.8566);
        expect(coordinates.longitude).toBe(2.3522);
    });

    it('should create a Location object', () => {
        const city = new City('Paris', 'France');
        const coordinates = new Coordinates(48.8566, 2.3522);
        const location = new Location('Eiffel Tower', coordinates, city);
        expect(location.name).toBe('Eiffel Tower');
        expect(location.coordinates).toBe(coordinates);
        expect(location.city).toBe(city);
    });

    it('should create a WeatherData object', () => {
        const weatherData = new WeatherData(18, 65, 10);
        expect(weatherData.temperature).toBe(18);
        expect(weatherData.humidity).toBe(65);
        expect(weatherData.windSpeed).toBe(10);
    });

    it('should create a LocationWeatherData DTO', () => {
        const city = new City('Paris', 'France');
        const coordinates = new Coordinates(48.8566, 2.3522);
        const location = new Location('Eiffel Tower', coordinates, city);
        const weatherData = new WeatherData(18, 65, 10);
        const locationWeatherData = new LocationWeatherData(location, weatherData);

        expect(locationWeatherData.locationName).toBe('Eiffel Tower');
        expect(locationWeatherData.latitude).toBe(48.8566);
        expect(locationWeatherData.longitude).toBe(2.3522);
        expect(locationWeatherData.cityName).toBe('Paris');
        expect(locationWeatherData.country).toBe('France');
        expect(locationWeatherData.temperature).toBe(18);
        expect(locationWeatherData.humidity).toBe(65);
        expect(locationWeatherData.windSpeed).toBe(10);
    });
});