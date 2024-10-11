const getXmlView = (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send('<hello> world </hello>');
};

module.exports = {
    getXmlView
};