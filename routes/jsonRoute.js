const express = require('express');
const router = express.Router();
const jsonView = require('../views/jsonView');

// POST /json
router.post('/', (req, res) => {
    // post json data
});

// GET /json
router.get('/', (req, res) => {
    jsonView.getJsonData(req, res);
});

module.exports = router;