var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');

// Sign-up route
router.post('/signUp', async function (req, res, next){

	console.log("req.body "+ req.body.firstName);

	var userExist = await usersModel.findOne({ 
		email: req.body.email
	})

	if (!userExist) {
		var newUser = new usersModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		});
		var newUserSave = await newUser.save();

		req.session.userSession = {
			name: newUserSave.name,
			id: newUserSave._id
		}

		res.redirect('/homePage');
	} else {
		res.redirect('/');
	}
});

// Sign-in route
router.post('/signIn', async function (req, res) {

	var userSignedIn = await usersModel.findOne({
		email: req.body.email,
		password: req.body.password
	});

	if (userSignedIn) {
		req.session.user = {
			name: userSignedIn.email,
			id: userSignedIn._id
		}
		res.redirect('/homePage');
	} else {
		res.redirect('/');
	}
});


// Log out route
router.get('/logout', function (req, res) {
	req.session.user = null;
	res.render('login');
})

module.exports = router;
