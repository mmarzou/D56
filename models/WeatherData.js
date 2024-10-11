class WeatherData {
    constructor(temperature, humidity, windSpeed) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
}

module.exports = WeatherData;

const weather = new WeatherData(18, 65, 10);
console.log("\n- ", weather)