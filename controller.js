/**
 * Country API: https://restcountries.eu/#api-endpoints-all
 * Covid API: https://documenter.getpostman.com/view/10877427/SzYW2f8n?version=latest#287c16a2-d2b3-4de7-a45e-0455642c1a92
 */

const axios  = require('axios');
class Controller {
    country = axios.create({
        baseURL: 'https://restcountries.eu/rest/v2',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    covid = axios.create({
        baseURL: 'https://covid19-api.org/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    /**
     * Display the country with the most covid-19 cases
     * The display can be a simple object/array
     */
    countryWithMostCases() {
        let start = new Date();
        this.covid.get('status').then(r => {
            const list = r.data;
            const mostCases = list.reduce((acc, c) => c.cases > acc.cases ? c : acc);
            console.log("1) Country with most cases: ", mostCases, ` in: ${new Date() - start}`);
        });
    }

    /**
     * Display the coutry's capital name (country's name) with the less cases.
     * Display: country's capital (country's name)
     */
    capitalOfCountryWithLessCases() {
        let start = new Date();
        this.covid.get('status').then(r => {
            const list = r.data;
            const lessCases = list.reduce((acc, c) => c.cases < acc.cases ? c : acc);
            this.country.get(`alpha/${lessCases.country}`).then(r => {
                const country = r.data;
                console.log("\n2) Capital of country with less cases: ", country.capital, ` (${country.name}) `, ` in: ${new Date() - start}`);
            })
        });
    }

    /**
     * Display the coutry's name that have no covid data.
     * Some countries available in the restcountry API have no data (doesn't exist) in the covid API
     * The display must be nice, not a simple object/array (for example A, B, C ...)
     */
    async findCountriesWithoutCovidData() {
        let start = new Date();
        const countries = (await this.country.get('all')).data;
        const covids = (await this.covid.get('countries')).data;

        const countriesWithoutCovidData = countries.filter(c => covids.find(v => v.alpha2 === c.alpha2Code) === undefined);
        console.log("\n3) Countries without covid data: ", countriesWithoutCovidData.reduce((acc, c) => acc + ", " + c.name, ""), ` in: ${new Date() - start}`);
    }

    /**
     * This one will be access by a GET request
     * Set up a server in the server.js file
     * When you do a GET on localhost:5000/api/capitalToCovidCases this method must be called
     * This method will take as query parameter a country capital name and you need to return the number of death for this capital's country
     */
    async capitalToCovidCases(req, res) {
        const {capital} = req.query;
        const country = (await this.country.get(`capital/${(capital).toLowerCase()}`)).data[0];
        const covid = (await this.covid.get(`status/${country.alpha2Code}`)).data;
        res.status(200).json(covid.deaths);
    }
}

module.exports = Controller;