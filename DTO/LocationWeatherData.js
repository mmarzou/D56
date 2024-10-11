class LocationWeatherData {
    constructor(location, weatherData) {
        this.locationName = location.name;
        this.latitude = location.coordinates.latitude;
        this.longitude = location.coordinates.longitude;
        this.cityName = location.city.name;
        this.country = location.city.country;
        this.temperature = weatherData.temperature;
        this.humidity = weatherData.humidity;
        this.windSpeed = weatherData.windSpeed;
    }
}

module.exports = LocationWeatherData;