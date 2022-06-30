var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { });
});

// Home page
router.post('/sign-in', (req,res,next) => {

  res.render('homePage');
});

// Home page
router.post('/sign-up', (req,res,next) => {

  res.render('homePage');
});

// GET Destination page
router.post('/go', (req,res,next) => {

  //. Afficher les destinations disponibles 
if(true){
  res.render('trainList'); // il y a des trains disponibles
}else{
  res.render('noTrain'); // il n'y a pas de trains
}
});

// Error page : il n'y a pas de train. On redirige l'utilateur sur la home page quand il clique le bouton
router.get('/changeDestination', (req,res,next) => {


  res.redirect('/homePage');
})

// Panier: l'utilsateur à ajouter un train au panier
router.get('/basket', (req,res,next) => {

  res.render('basket')
});


// Demander une nouvelle recherche de train depuis le panier
router.get('/newSearch', (req,res,next) => {

  res.redirect('/homePage') // on retourne à la home page
});




// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
