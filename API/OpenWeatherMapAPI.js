const axios = require('axios');
require('dotenv').config();

class OpenWeatherMapAPI {
    static async getWeatherData(lat, lon) {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        return response.data;
    }
}

module.exports = OpenWeatherMapAPI;