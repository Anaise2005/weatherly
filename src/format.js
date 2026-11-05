
const chalk = require('chalk');
const Table = require('cli-table3');

// Display current weather
function displayWeather(location, weather, description) {

    console.log('\n' + chalk.cyan.bold('======================================'));
    console.log(chalk.cyan.bold('             WEATHERLY 🌦️'));
    console.log(chalk.cyan.bold('======================================'));

    const table = new Table({
        head: [
            chalk.yellow('Weather Information'),
            chalk.yellow('Details')
        ],
        colWidths: [25, 30]
    });

    table.push(
        ['City', location.name],
        ['Country', location.country],
        ['Temperature', chalk.yellow(`${weather.temperature_2m}°C`)],
        ['Feels Like', `${weather.apparent_temperature}°C`],
        ['Condition', chalk.green(description)],
        ['Humidity', `${weather.relative_humidity_2m}%`],
        ['Wind Speed', `${weather.wind_speed_10m} km/h`],
        ['Precipitation', `${weather.precipitation} mm`]
    );

    console.log(table.toString());
}


// Display five-day forecast
function displayForecast(location, forecast, getWeatherDescription) {

    console.log('\n' + chalk.cyan.bold('======================================'));
    console.log(chalk.cyan.bold('        WEATHERLY 5-DAY FORECAST'));
    console.log(chalk.cyan.bold('======================================'));

    console.log(
        chalk.white(`City: ${location.name}, ${location.country}\n`)
    );

    const table = new Table({
        head: [
            chalk.yellow('Date'),
            chalk.yellow('Condition'),
            chalk.yellow('Max °C'),
            chalk.yellow('Min °C'),
            chalk.yellow('Rain %'),
            chalk.yellow('Wind km/h')
        ],
        colWidths: [14, 22, 10, 10, 10, 12],
        wordWrap: true
    });

    forecast.time.forEach((date, index) => {

        const dayName = new Date(date + 'T12:00:00')
            .toLocaleDateString('en-US', {
                weekday: 'short'
            });

        const condition = getWeatherDescription(
            forecast.weather_code[index]
        );

        table.push([
            `${dayName} ${date}`,
            condition,
            forecast.temperature_2m_max[index],
            forecast.temperature_2m_min[index],
            forecast.precipitation_probability_max[index],
            forecast.wind_speed_10m_max[index]
        ]);
    });

    console.log(table.toString());
}


// Display recent searches
function displayRecentSearches(searches) {

    console.log('\n' + chalk.cyan.bold('======= RECENT SEARCHES ======='));

    const table = new Table({
        head: [
            chalk.yellow('No.'),
            chalk.yellow('City'),
            chalk.yellow('Date Searched')
        ]
    });

    searches.forEach((item, index) => {

        table.push([
            index + 1,
            item.city,
            item.searchedAt
        ]);

    });

    console.log(table.toString());
}


// Export functions
module.exports = {
    displayWeather,
    displayForecast,
    displayRecentSearches
};
