const express = require('express');
const router = express.Router();
const { getLocationWeatherData } = require('../views/locationWeatherView');

router.get('/', getLocationWeatherData);

module.exports = router;