const axios  = require('axios');
const express = require('express');
const Controller = require('./controller');

const controller = new Controller();
controller.countryWithMostCases();
controller.capitalOfCountryWithLessCases();
controller.findCountriesWithoutCovidData();

const app = express();

const port = 5000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
    next();
});
app.use(express.json());

app.get('/api/capitalToCovidCases', (req, res) => controller.capitalToCovidCases(req, res));


app.listen(port, () => {
  console.log(`config app listening on port ${port}`);
});


// for the question 4
axios.get('http://localhost:5000/api/capitalToCovidCases?capital=Bern', {
    headers: {
        'Content-Type': 'application/json',
    }
}).then(r => console.log("\n4) Death in Switzerland: ", r.data))