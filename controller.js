/**
 * Country API: https://restcountries.eu/#api-endpoints-all
 * Covid API: https://documenter.getpostman.com/view/10877427/SzYW2f8n?version=latest#287c16a2-d2b3-4de7-a45e-0455642c1a92
 */

class Controller {
    /**
     * Display the country with the most covid-19 cases
     * The display can be a simple object/array
     */
    countryWithMostCases() {
        console.log("1) Country with most cases: ");
    }

    /**
     * Display the coutry's capital name (country's name) with the less cases.
     * Display: country's capital (country's name)
     */
    capitalOfCountryWithLessCases() {
        console.log("\n2) Capital of country with less cases: ", ` () `);
    }

    /**
     * Display the coutry's name that have no covid data.
     * Some countries available in the restcountry API have no data (doesn't exist) in the covid API
     * The display must be nice, not a simple object/array (for example A, B, C ...)
     */
    async findCountriesWithoutCovidData() {
        console.log("\n3) Countries without covid data: ");
    }

    /**
     * This one will be access by a GET request
     * Set up a server in the server.js file
     * When you do a GET on localhost:5000/api/capitalToCovidCases this method must be called
     * This method will take as query parameter a country capital name and you need to return the number of death for this capital's country
     */
    async capitalToCovidCases(req, res) {
        
    }
}

module.exports = Controller;