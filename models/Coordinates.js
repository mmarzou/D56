class Coordinates {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = Coordinates;

const coords = new Coordinates(48.8566, 2.3522);
// console.log("\n- ", coords);