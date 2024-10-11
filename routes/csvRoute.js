const express = require('express');
const router = express.Router();
const csvView = require('../views/csvView');

// POST /csv
router.post('/', (req, res) => {
    // post csv data
});

// GET /csv
router.get('/', (req, res) => {
    csvView.getCsvData(req, res);
});

module.exports = router;