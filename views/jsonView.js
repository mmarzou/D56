const getJsonData = (req, res) => {
    res.set('Content-Type', 'application/json');
    res.json({ message: 'hello: world' });
}

module.exports = {
    getJsonData
}