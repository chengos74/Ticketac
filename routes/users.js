var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');



/* GET users listing. */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



// Sign-up route

router.post('/signUp', async function(req, res) {  
  
	var userExist = await usersModel.findOne({
	  email : req.body.email
	})
	
	if(!userExist) {
		var newUser = new usersModel({
			firstName : req.body.firstName,
			lastName : req.body.name,
			email : req.body.email,
			password : req.body.password
		});
		var newUserSave = await newUser.save();
	
		req.session.user = {
			name : newUserSave.name,
			id : newUserSave._id
		} 
		// console.log(req.session.user);
		
			res.redirect('/sign-up');
	} else {
	  	res.redirect('/');
	}
  });



// Sign-in route

router.post('/signIn', async function(req, res) {  
  
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
				res.redirect('/sign-in');
		} else {
	  		res.redirect('/');
		}
  });



  // Log out route

  router.get('/logout', function(req, res) {
			req.session.user = null;
			res.render('login');
  })



module.exports = router;
