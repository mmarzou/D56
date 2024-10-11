const City = require('../models/City');
const Coordinates = require('../models/Coordinates');
const Location = require('../models/Location');

class LocationBuilder {
    constructor() {
        this.location = new Location();
    }

    setName(name) {
        this.location.name = name;
        return this;
    }

    setCoordinates(latitude, longitude) {
        this.location.coordinates = new Coordinates(latitude, longitude);
        return this;
    }

    setCity(name, country) {
        this.location.city = new City(name, country);
        return this;
    }

    build() {
        return this.location;
    }
}

module.exports = LocationBuilder;