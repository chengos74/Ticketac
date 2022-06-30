var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');


// Get users listing
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



// Sign-in route
router.post('/sign-in', async function(req, res) {  
  
	var userSignedIn = await usersModel.findOne({
	  email : req.body.email,
	  password : req.body.password
	});
	// console.log(userSignedIn);
  
	if(userSignedIn) {
	  req.session.user = {
		name : userSignedIn.email,
		id : userSignedIn._id
	  } 
	  // console.log(req.session.user);

	  res.redirect('/');
	} else {
	  res.redirect('/login');
	}
  });



// Sign-up route

router.post('/sign-up', async function(req, res) {  
  
	var userExist = await usersModel.findOne({
	  email : req.body.emailFromFront
	})
	
	if(!userExist) {
	  var newUser = new usersModel({
		username : req.body.usernameFromFront,
		email : req.body.emailFromFront,
		password : req.body.passwordFromFront
	  });
	  var newUserSave = await newUser.save();
  
	  req.session.user = {
		name : newUserSave.username,
		id : newUserSave._id
	  } 
	  // console.log(req.session.user);

	  res.redirect('/');
	} else {
	  res.redirect('/login');
	}
  });


module.exports = router;
