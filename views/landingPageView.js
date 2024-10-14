const renderLandingPage = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>D56 - API</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <h1>D56 - API</h1>
            <ul class="nav">
                <li><a href="/json">JSON Route</a></li>
                <li><a href="/xml">XML Route</a></li>
                <li><a href="/csv">CSV Route</a></li>
                <li><a href="/location-weather">Location Weather Route</a></li>
            </ul>
            <form id="weatherForm">
                <label for="city">Enter City Name:</label>
                <input type="text" id="city" name="city" placeholder="Rechercher une ville.." required>
                <label for="format">Select Format:</label>
                <select id="format" name="format">
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                </select>
                <button type="submit">Rechercher</button>
            </form>
            <div id="weatherResult"></div>
            <script>
                document.getElementById('weatherForm').addEventListener('submit', async function(event) {
                    event.preventDefault();
                    const city = document.getElementById('city').value;
                    const format = document.getElementById('format').value;
                    try {
                        const response = await fetch(\`/location-weather?location=\${city}&format=\${format}\`);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        if (format === 'json') {
                            const data = await response.json();
                            if (!data.locationName || !data.temperature) {
                                throw new Error('Invalid data structure');
                            }
                            document.getElementById('weatherResult').innerHTML = \`
                                <h3>Weather Data for \${data.locationName}</h3>
                                <pre><code>\${JSON.stringify(data, null, 2)}</code></pre>\`;
                        } else if (format === 'xml') {
                            const data = await response.text();
                            document.getElementById('weatherResult').innerHTML = \`
                                <h3>Weather Data (XML)</h3>
                                <pre><code>\${escapeHtml(data)}</code></pre>\`;
                        } else if (format === 'csv') {
                            const data = await response.text();
                            document.getElementById('weatherResult').innerHTML = \`
                                <h3>Weather Data (CSV)</h3>
                                <pre><code>\${escapeHtml(data)}</code></pre>\`;
                        }
                    } catch (error) {
                        document.getElementById('weatherResult').innerHTML = \`
                            <p>Error fetching weather data: \${error.message}</p>\`;
                    }
                });

                function escapeHtml(unsafe) {
                    return unsafe
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                }
            </script>
        </body>
        </html>
    `);
};

module.exports = {
    renderLandingPage
};