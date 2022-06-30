var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');



/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });



// Sign-up route

router.post('/sign-up', function(req, res) {  
  
	// var userExist = await usersModel.findOne({
	//   email : req.body.emailFromFront
	// })
	
	// if(!userExist) {
	// 	var newUser = new usersModel({
	// 		lastName : req.body.nameFromFront,
	// 		firstName : req.body.firstNameFromFront,
	// 		email : req.body.emailFromFront,
	// 		password : req.body.passwordFromFront
	// 	});
	// 	var newUserSave = await newUser.save();
	
	// 	req.session.user = {
	// 		name : newUserSave.username,
	// 		id : newUserSave._id
	// 	} 
	// 	// console.log(req.session.user);
		
	// 	res.render('/homePage');
	// } else {
	//   	res.render('/login');
	// }

		res.redirect('/homePage');
  });



// Sign-in route

router.post('/sign-in', function(req, res) {  
  
	// var userSignedIn = await usersModel.findOne({
	//   email : req.body.email,
	//   password : req.body.password
	// });
	// // console.log(userSignedIn);
  
	// if(userSignedIn) {
	//   req.session.user = {
	// 	name : userSignedIn.email,
	// 	id : userSignedIn._id
	//   } 
	//   // console.log(req.session.user);
	//   res.render('homePage');
	// } else {
	//   res.render('/');
	// }

	res.redirect('/homePage')
  });



  // Log out route

  router.get('/logout', function(req, res) {
	req.session.user = null;
	res.render('login');
  })



module.exports = router;
