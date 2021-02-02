const Controller = require('./controller');

const controller = new Controller();

controller.countryWithMostCases();
controller.capitalOfCountryWithLessCases();
controller.findCountriesWithoutCovidData();

// for the question 4

// GET: '/api/capitalToCovidCases' => controller.capitalToCovidCases();

// this code call your server, do not touch this code

// axios.get('http://localhost:5000/api/capitalToCovidCases?capital=Bern', {
//     headers: {
//         'Content-Type': 'application/json',
//     }
// }).then(r => console.log("\n4) Death in Switzerland: ", r.data))