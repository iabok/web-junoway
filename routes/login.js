var express = require('express');
var Practitioner = require('../components/practitioner/class.practitioner');
var Facilitator = require('../components/facilitator/class.facilitator');
var db = require('../handlers/db');
var router = express.Router();

/* POST practitioner form data */
router.post('/practitioner', function(req, res) {
	var formObject = req.body;
	var practitioner = new Practitioner();

	practitioner.signin(formObject['email'],formObject['password'],function(pass){
		if(pass)
			res.write('Successful Login');
		else
			res.write('Login Failed');
	});

});

/* POST facilitator form data */
router.post('/facilitator', function(req, res) {
	var formObject = req.body;
	var facilitator = new Facilitator();

	facilitator.signin(formObject['email'],formObject['password'],function(pass){
		if(pass)
			res.write('Successful Login');
		else
			res.write('Login Failed');
	});

});

module.exports = router;
