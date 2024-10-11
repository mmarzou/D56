const express = require('express');
const router = express.Router();
const { renderLandingPage } = require('../views/landingPageView');

router.get('/', renderLandingPage);

module.exports = router;