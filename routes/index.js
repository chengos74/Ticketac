var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET Login page. */
router.get('/', function(req, res, next) {

  res.render('login', { });
});


// // Sign IN : l'utilisateur n'est pas inscrit
// router.get('/signIn', (req, res, next) => {

//   //. Vérifier si l'email existe déjà dans la bdd
//   //.   L'email n'existe pas --> on ajoute l'utilisateur à la bdd --> on redirige sur la home page
//   //.   L'email existe --> on refuse l'ajout et on affiche que l'email existe déjà --> on vide les champs de saisie

//   res.redirect('index');
// });

// // Sign UP : l'utilisateur est déjà inscrit et se connecte à son compte
// router.get('/signUp', (req, res, next) => {

//   //. Vérifier si l'email existe déjà dans la bdd
//   //. Vérifier si le password existe déjà dans la bdd
//   //. SI les DEUX conditions sont validés --> on redirige sur la home page

//   res.redirect('index');
// });

// GET Destination 
router.post('/destination', (req,res,next) => {

  //. Afficher les destinations disponibles 
if(true){
  res.render('train');
}else{
  res.render('error');
}
});

// Error page : il n'y a pas de train
router.get('/changeDestination', (req,res,next) => {

// on redirige l'utilateur sur la home page 
  res.redirect('/');
})

// Panier: l'utilsateur à ajouter un train au panier
router.get('/basket', (req,res,next) => {

  res.render('basket')
});

// Paiement
router.get('/payment', (req,res,next) => {

  res.render('success') 
});


// Faire une nouvelle recherche depuis le panier
router.get('newSearch', (req,res,next) => {

  res.render('/')
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
