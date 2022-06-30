var express = require('express');
var router = express.Router();

var usersModel = require('../models/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//Sign-in route
router.post('/login', function(req,res) {
	res.render ('index', )


})



module.exports = router;
