const getCsvData = (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('hello\nworld\n');
};

module.exports = {
    getCsvData
};