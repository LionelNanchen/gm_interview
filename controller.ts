/**
 * Country API: https://restcountries.eu/#api-endpoints-all
 * Covid API: https://documenter.getpostman.com/view/10877427/SzYW2f8n?version=latest#287c16a2-d2b3-4de7-a45e-0455642c1a92
 */

import axios from 'axios';

interface Covid {

}

interface Country {

}

class Controller {
    covid: any;

    /**
     * Display the country with the most covid-19 cases
     * The display can be a simple object/array
     */
    countryWithMostCases() {

        axios.get("https://covid19-api.org/api/status").then((res: any) => {
            this.covid = res.data;
            let max = 0;
            let country;
            for (let covid of this.covid) {
                if (covid.cases > max) {
                    max = covid.cases;
                    country = covid.country;
                }
            }
            console.log("1) Country with most cases: " + country);
        });

    }


    /**
     * Display the coutry's capital name (country's name) with the less cases.
     * Display: country's capital (country's name)
     */
    capitalOfCountryWithLessCases() {
        axios.get("https://covid19-api.org/api/status").then((res: any) => {
            this.covid = res.data;
            this.covid.sort((a: any, b: any) => {
                return a.cases - b.cases;
            });

            axios.get("https://restcountries.eu/rest/v2/alpha/" + this.covid[0].country).then((res) => {
                console.log("\n2) Capital of country with less cases: ", ` (this.covid[0]) `, res.data.capital);
            });

        });
    }

    countryNames(countries: any) {
        return countries.map((x: any) => {
            return x.name;
        });
    }

    /**
     * Display the coutry's name that have no covid data.
     * The display must be nice, not a simple object/array (for example A, B, C ...)
     */
    async findCountriesWithoutCovidData() {
        const allCountries = (await axios.get("https://restcountries.eu/rest/v2/all")).data;
        const covidCountries = (await axios.get("https://covid19-api.org/api/countries")).data;

        const allCountriesNames = this.countryNames(allCountries);
        const covidCountriesNames = this.countryNames(covidCountries);

        const diff = allCountriesNames.filter((x: any) => covidCountriesNames.indexOf(x) === -1);

        console.log("\n3) Countries without covid data: " + diff);
    }

    /**
     * This one will be access by a GET request
     * Set up a server in the server.js file
     * When you do a GET on localhost:5000/api/capitalToCovidCases this method must be called
     * This method will take as query parameter a country capital name and you need to return the number of death for this capital's country
     */
    // async capitalToCovidCases(req: any, res: any) {
    //     const capital = req.query.capital;
    //     const country = (await axios.get(`https://restcountries.eu/rest/v2/capital/${capital}`)).data;

    //     const covidData = (await axios.get(`https://covid19-api.org/api/status/${country.alpha2Code}`)).data;
    //     const deaths = covidData.deaths;
    //     return deaths;

    // }
}

export default Controller;