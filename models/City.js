class City {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }
}

module.exports = City;

const city = new City('Lyon', 'France');
console.log("\n- ", city);
