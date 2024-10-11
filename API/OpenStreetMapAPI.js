const axios = require('axios');

class OpenStreetMapAPI {
    static async getLocationData(query) {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`);
        return response.data[0];
    }
}

module.exports = OpenStreetMapAPI;