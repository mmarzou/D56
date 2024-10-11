const express = require('express');
const router = express.Router();
const xmlView = require('../views/xmlView');

// POST /xml
router.post('/', (req, res) => {
    // post xml data
});

// GET /xml
router.get('/', (req, res) => {
    xmlView.getXmlView(req, res);
});

module.exports = router;