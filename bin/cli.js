#!/usr/bin/env node

const { parseArgs } = require('node:util');
const ora = require('ora');

const {
    getCoordinates,
    getCurrentWeather,
    getWeatherForecast,
    getWeatherDescription
} = require('../src/api');

const {
    getRecentSearches,
    saveRecentSearch
} = require('../src/storage');

const {
    displayWeather,
    displayForecast,
    displayRecentSearches
} = require('../src/format');

// Display help instructions
function showHelp() {
    console.log(`
WEATHERLY - Your Command Line Weather Guide

Usage:
  weatherly current <city>    Show current weather
  weatherly forecast <city>   Show 5-day forecast
  weatherly recent            Show recent searches
  weatherly help              Show help instructions

Examples:
  weatherly current Kigali
  weatherly forecast Kigali
  weatherly recent
`);
}

// Main application
async function main() {
    const { values, positionals } = parseArgs({
        options: {
            help: {
                type: 'boolean',
                short: 'h'
            }
        },
        allowPositionals: true
    });

    if (values.help || positionals[0] === 'help' || positionals.length === 0) {
        showHelp();
        return;
    }

    const command = positionals[0];

    switch (command) {
        case 'current': {
            const city = positionals.slice(1).join(' ');

            if (!city) {
                throw new Error('Please provide a city. Example: weatherly current Kigali');
            }

            const spinner = ora(`Getting current weather for ${city}...`).start();

            try {
                const location = await getCoordinates(city);
                const weather = await getCurrentWeather(
                    location.latitude,
                    location.longitude
                );

                await saveRecentSearch(location.name);

                const description = getWeatherDescription(weather.weather_code);

                spinner.succeed(`Weather found for ${location.name}`);
                displayWeather(location, weather, description);
            } catch (error) {
                spinner.fail(`Could not get weather for ${city}`);
                throw error;
            }

            break;
        }

        case 'forecast': {
            const city = positionals.slice(1).join(' ');

            if (!city) {
                throw new Error('Please provide a city. Example: weatherly forecast Kigali');
            }

            const spinner = ora(`Getting 5-day forecast for ${city}...`).start();

            try {
                const location = await getCoordinates(city);
                const forecast = await getWeatherForecast(
                    location.latitude,
                    location.longitude
                );

                await saveRecentSearch(location.name);

                spinner.succeed(`Forecast found for ${location.name}`);
                displayForecast(location, forecast, getWeatherDescription);
            } catch (error) {
                spinner.fail(`Could not get forecast for ${city}`);
                throw error;
            }

            break;
        }

        case 'recent': {
            const searches = await getRecentSearches();

            if (searches.length === 0) {
                console.log('No recent searches found.');
                return;
            }

            displayRecentSearches(searches);
            break;
        }

        default:
            throw new Error(`Unknown command: ${command}. Type "weatherly help" to see available commands.`);
    }
}

// Run the application and handle errors
main().catch(error => {
    console.error('\nError:', error.message);
    process.exitCode = 1;
});
