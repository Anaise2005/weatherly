
// Get the coordinates of a city
async function getCoordinates(city) {

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to connect to the location service.');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" was not found.`);
    }

    return data.results[0];
}


// Get current weather
async function getCurrentWeather(latitude, longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to retrieve weather information.');
    }

    const data = await response.json();

    return data.current;
}


// Get 5-day weather forecast
async function getWeatherForecast(latitude, longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&forecast_days=5&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to retrieve weather forecast.');
    }

    const data = await response.json();

    return data.daily;
}


// Convert weather codes into descriptions
function getWeatherDescription(code) {

    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with heavy hail'
    };

    return descriptions[code] || 'Unknown weather condition';
}


// Export all functions
module.exports = {
    getCoordinates,
    getCurrentWeather,
    getWeatherForecast,
    getWeatherDescription
};
