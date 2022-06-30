var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const match = require('nodemon/lib/monitor/match');

var trainsModel = require('../models/trains');

var city = ["Paris", "Marseille", "Nantes", "Lyon", "Rennes", "Melun", "Bordeaux", "Lille"]
var date = ["2018-11-20", "2018-11-21", "2018-11-22", "2018-11-23", "2018-11-24"]



/* GET Login page. */
router.get('/', function (req, res, next) {
  res.render('login', {});
});

// Home page from sign-IN
router.post('/sign-in', (req, res, next) => {
  res.redirect('/homePage');
});

// Home page from sign-UP
router.post('/sign-up', (req, res, next) => {
  res.redirect('/homePage');
});

// GET Home page 
router.get('/homePage', (req, res, next) => {
  res.render('homePage');
});


// GET Destination page
router.post('/go', async (req, res, next) => {

  var trainList = await trainsModel.find({ departure: req.body.departure, arrival: req.body.arrival, date: req.body.date}); // récupérer la liste des trains en bdd

  var departure = req.body.departure; // départ entré par l'utilisateur
  var arrival = req.body.arrival; // arrivée entré par l'utilisateur
  var date = req.body.date;
  
  var journeyIsValid = false;

  for (var i = 0; i < trainList.length; i++) {
    console.log(trainList[i].price)
    if (departure == trainList[i].departure && arrival == trainList[i].arrival) {
      journeyIsValid = true;
    }
  } 

  if (journeyIsValid) {
    res.render('trainList', { trainList, date }); // il y a des trains disponibles
  }else{
    res.render('noTrain'); // il n'y a pas de trains
  }
});

// Error page : il n'y a pas de train. On redirige l'utilateur sur la home page quand il clique le bouton
router.get('/changeDestination', (req, res, next) => {
  res.redirect('/homePage');
})

// Panier: l'utilsateur à ajouter un train au panier
router.get('/basket', (req, res, next) => {

  res.render('basket')
});


// Demander une nouvelle recherche de train depuis le panier
router.get('/newSearch', (req, res, next) => {

  res.redirect('/homePage') // on retourne à la home page
});




// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function (req, res, next) {

  // How many trains we want
  var count = 300

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if (departureCity != arrivalCity) {

      var newUser = new trainsModel({
        departure: departureCity,
        arrival: arrivalCity,
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });

      await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function (req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {

    trainsModel.find(
      { departure: city[i] }, //filtre

      function (err, trains) {

        console.log(`Nombre de trajets au départ de ${trains[0].departure} : `, trains.length);
      }
    )

  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
