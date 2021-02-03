import Controller from './controller';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const controller = new Controller();
controller.countryWithMostCases();
controller.capitalOfCountryWithLessCases();
controller.findCountriesWithoutCovidData();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log("Server started");
});

// J'AI COMMENTE LA QUESTION 4 CAR JE L'AI CONTINUEE APRES L'ENTRETIEN
// for the question 4
// 
// GET: '/api/capitalToCovidCases' => controller.capitalToCovidCases();

// app.get('/api/capitalToCovidCases', (req, res, next) => {
//   controller.capitalToCovidCases(req, res).then((deaths) => {
//     res.json({ deaths: deaths });
//   }).catch(next);
// });

// // Error handling middleware
// app.use((err: any, req: any, res: any, next: any) => {
//   console.error(err);
//   return res.status(500).json({ error: err.toString() });
// });

// axios.get('http://localhost:5000/api/capitalToCovidCases?capital=Bern', {
//   headers: {
//     'Content-Type': 'application/json',
//   }
// }).then((r: any) => console.log("\n4) Death in Switzerland: ", r.data));
