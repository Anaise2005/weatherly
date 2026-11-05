
// Import file system module
const fs = require('node:fs/promises');

// Import path module
const path = require('node:path');

// Locate the recent.json file
const filePath = path.join(__dirname, '../data/recent.json');

// Read recent searches
async function getRecentSearches() {
    try {
        const data = await fs.readFile(filePath, 'utf8');

        return JSON.parse(data);

    } catch (error) {

        if (error.code === 'ENOENT') {
            return [];
        }

        throw error;
    }
}

// Save a searched city
async function saveRecentSearch(city) {

    let searches = await getRecentSearches();

    // Remove an older entry for the same city
    searches = searches.filter(
        item => item.city.toLowerCase() !== city.toLowerCase()
    );

    // Add the new search at the beginning
    searches.unshift({
        city: city,
        searchedAt: new Date().toISOString()
    });

    // Keep only the latest 10 searches
    searches = searches.slice(0, 10);

    // Save information in JSON format
    await fs.writeFile(
        filePath,
        JSON.stringify(searches, null, 2),
        'utf8'
    );
}

// Export functions
module.exports = {
    getRecentSearches,
    saveRecentSearch
};
