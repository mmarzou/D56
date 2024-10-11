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
                <div id="suggestions">
                <h1>Weather Data:</h1>
                </div>
                <button type="submit">Rechercher</button>
            </form>
            <div id="weatherResult"></div>
            <script>
                document.getElementById('city').addEventListener('input', async function(event) {
                    const query = event.target.value;
                    if (query.length > 2) {
                        const response = await fetch(\`https://api.openweathermap.org/geo/1.0/direct?q=\${query}&limit=5&appid=${process.env.OPENWEATHERMAP_API_KEY}\`);
                        const data = await response.json();
                        const suggestions = document.getElementById('suggestions');
                        suggestions.innerHTML = '';
                        data.forEach(city => {
                            const div = document.createElement('div');
                            div.textContent = \`\${city.name}, \${city.country}\`;
                            div.addEventListener('click', () => {
                                document.getElementById('city').value = \`\${city.name}, \${city.country}\`;
                                suggestions.innerHTML = '';
                            });
                            suggestions.appendChild(div);
                        });
                    }
                });

                document.getElementById('weatherForm').addEventListener('submit', async function(event) {
                    event.preventDefault();
                    const city = document.getElementById('city').value;
                    const response = await fetch(\`/location-weather?location=\${city}\`);
                    const data = await response.json();
                    document.getElementById('weatherResult').innerHTML = \`
                        <h3>Weather Data for \${data.locationName}</h2>
                        <p>Temperature: \${data.temperature}°C</p>
                        <p>Humidity: \${data.humidity}%</p>
                        <p>Wind Speed: \${data.windSpeed} m/s</p>
                        <p>Coordinates: \${data.coordinates.lat}, \${data.coordinates.lon}</p>
                    \`;
                });
            </script>
        </body>
        </html>
    `);
};

module.exports = {
    renderLandingPage
};