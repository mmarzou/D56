const express = require('express');
const app = express();
require('dotenv').config();

// Serve static files
app.use(express.static('public'));

// Routes
const landingPageRoute = require('./routes/landingPageRoute');
const jsonRoute = require('./routes/jsonRoute');
const xmlRoute = require('./routes/xmlRoute');
const csvRoute = require('./routes/csvRoute');
const locationWeatherRoute = require('./routes/locationWeatherRoute');

app.use('/', landingPageRoute);
app.use('/json', jsonRoute);
app.use('/xml', xmlRoute);
app.use('/csv', csvRoute);
app.use('/location-weather', locationWeatherRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Il y a un problème chef!' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;