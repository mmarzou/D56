const WeatherData = require('../models/WeatherData');

class WeatherDataBuilder {
    constructor() {
        this.weatherData = new WeatherData();
    }

    setTemperature(temperature) {
        this.weatherData.temperature = temperature;
        return this;
    }

    setHumidity(humidity) {
        this.weatherData.humidity = humidity;
        return this;
    }

    setWindSpeed(windSpeed) {
        this.weatherData.windSpeed = windSpeed;
        return this;
    }

    build() {
        return this.weatherData;
    }
}

module.exports = WeatherDataBuilder;