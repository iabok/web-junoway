var express = require('express');
var Practitioner = require('../components/practitioner/class.practitioner');
var Facilitator = require('../components/facilitator/class.facilitator');
var varify = require('../handlers/varify');
var db = require('../handlers/db');
var router = express.Router();

/* POST practitioner form data */
router.post('/practitioner', function(req, res) {
	var formObject = req.body;
	Practitioner.signup(formObject,function(err,practitioner){
		if(err){
			console.log('Sorry Error this ' + err +'  occurred while saving your data.!!');
			res.send({'error':'An error has occurred'});
		}
		else{
			console.log('Success: ' + JSON.stringify(practitioner));
            res.send(JSON.stringify(practitioner));
        }
	});
});

/* POST facilitator form data */
router.post('/facilitator', function(req, res) {
	var formObject = req.body;
	//console.log('Adding facilitator Details: ' + JSON.stringify(formObject));
	Facilitator.signup(formObject,function(err,facilitator){
		if(err){
			console.log('Sorry Error this ' + err +'  occurred while saving your data.!!');
			res.send({'error':'An error has occurred'});
		}
		else{
			console.log('Success: ' + JSON.stringify(facilitator));
            res.send(JSON.stringify(facilitator));
        }
	});
});

/*Varify subscriber's license number*/
router.get('/varify/:number',function(req,res){
	var number = req.params.number;
	var varified = null;

	varify.Practioner(number,function(practitioner){
		varified = practitioner;
		if (varified) {
			res.end(JSON.stringify(varified));
		};		
	});

	if(!varified){
		varify.Facilitator(number,function(facilitator){
			varified = facilitator;
			res.end(JSON.stringify(varified));
		});
	};

});

module.exports = router;
