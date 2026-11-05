# Weatherly 🌤️

Weatherly is a command-line weather application built with Node.js. It allows users to check current weather conditions, view a five-day weather forecast, and see their recent city searches.

## Features

- Check current weather for any supported city.
- View a five-day weather forecast.
- View recently searched cities.
- Display weather information in formatted tables.
- Show loading indicators while fetching data.
- Handle invalid cities and other errors with friendly messages.

## Technologies Used

- Node.js
- JavaScript
- Open-Meteo API
- Chalk
- CLI Table 3
- Ora

## Installation

1. Clone or download this repository.
2. Open the project folder in your terminal.
3. Install the dependencies:

```bash
npm install
```

4. Link the CLI globally:

```bash
npm link
```

## Usage

Check the available commands:

```bash
weatherly help
```

Check current weather:

```bash
weatherly current Kigali
```

View the five-day forecast:

```bash
weatherly forecast Kigali
```

View recent searches:

```bash
weatherly recent
```

You can replace `Kigali` with another supported city.

## API

Weatherly uses the free Open-Meteo API for geocoding and weather information.

Website: https://open-meteo.com/

## Author

Weatherly was developed as a Node.js CLI group project.