const City = require('./City');
const Coordinates = require('./Coordinates');

class Location {
    constructor(name, coordinates, city) {
        this.name = name;
        this.coordinates = coordinates;
        this.city = city;
    }
}

module.exports = Location;

const city = new City('Paris', 'France');
const coordinates = new Coordinates(48.8566, 2.3522);
const location = new Location('Eiffel Tower', coordinates, city);

console.log(location);