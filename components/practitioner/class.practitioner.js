
function Practitioner(){

	var model = require('./model.practitioner');
	var Organisation = require('../organisation/class.organisation');

	this.signin = function(email,password,callback){
		model.findOne({'security.email': email },function(err,practitioner){
			var pass = false;
			if(practitioner){
				pass = practitioner.isValidPassword(password);
			};

			callback(pass);
		});
	};

	this.signup = function(formObject,callback){

		var newPractitioner = new model({
			security : {
				firstName 	: formObject['firstName'],
				lastName  	: formObject['lastName'],
				middleName 	: formObject['middleName'],
				licence 	: {
					number 		: formObject['licenceNumber'],
					issueAuthority 	: formObject['licenceIssueAuthority'],
					issueDate	: formObject['licenceIssueDate'],
					expireDate	: formObject['licenceExpireDate']
				},
				email		: formObject['email']
			},
			personal	: {
				age		: formObject['age'],
				sex		: formObject['sex'],
				nationality	: formObject['nationality'],
				maritalStatus 	: formObject['maritalStatus'],
				validictory 	: formObject['validictory'],
				personalExprience	: formObject['exprience']
			},
			address 	: {
				country		: formObject['country'],
				city		: formObject['city'],
				zipCode		: formObject['zipCode'],
				state_district	: formObject['state'],
				streetLine1	: formObject['streetLine1'],
				streetLine2	: formObject['streetLine2'],
				areaCode	: formObject['areaCode'],
				postalCode	: formObject['postalCode']
			},
			contact 	: {
				altenateEmail	: formObject['email2'],
				mobileNumber	: {
					code : formObject['mobiCode1']
				},
				landLine	: {
					code : formObject['homeCode1']
				},
				faxNumber	: {
					code : formObject['faxCode1']
				},
				upin		: formObject['upin'],
				npi		: formObject['npi']
			},
			proffesional 	: {
				speciality : formObject['speciality']
			}
		}); //newPractitioner - instance of practitioner model

		//SET PRACTITIONER PASSWORD
		newPractitioner.setPassword(formObject['password']);

		Organisation.create(formObject,function(err,organisation){
			if(organisation){
				newPractitioner.setOrganisation(organisation);
				newPractitioner.save(function(err,practitioner){
					callback(err,practitioner);
				});
			}
			else
				console.log(err.message);
		});		
	};
};

module.exports = new Practitioner();
