function Facilitator(){

	var model = require('./model.facilitator');
	var Administrator = require('../organisation/class.organisation');

	this.signin = function(email,password){
		model.findOne({'security.email': email },function(err,facilitator){
			var pass = false;
			if(facilitator){
				pass = facilitator.isValidPassword(password);
			};
			callback(pass);
		});
	};

	this.signup = function(formObject,callback){

		var newFacilitator = new model({
			name 	: formObject['companyName'],
			category 	: formObject[''],
			age 	: formObject['ageOfCompany'],
			security : {
				email 		: formObject['email'],
				password 	: formObject['password'],
				licence : {
					tin 	: formObject['companyTin'],
					number 	: formObject['regNo'],
					issueAuthority 	: formObject['issuing'],
					issueDate 	: formObject['dateOfIssue'],
					expireDate 	: formObject['dateOfExpiry']
				}
			},
			address : {
				country 	: formObject['Country'],
				city 	: formObject['city'],
				state_district 	: formObject['state'],
				streetLine1 	: formObject['streetLine1'],
				streetLine2 	: formObject['streetLine2'],
				zipCode 	: formObject['zipCode'],
				areaCode 	: formObject['areaCode'],
				postalCode 	: formObject['postalCode']
			},
			contact : {
				website 	: formObject['website'],
				mobileNumber 	: {
					code : formObject['mobiCode1']
				},
				telephone1 	: {
					code : formObject['teleCode1']
				},
				telephone2 	: {
					code : formObject['tele1Code1']
				},
				faxNumber 	: {
					code : formObject['faxCode1']
				}
			},
			owner : {
				title 	: formObject['ownersTitle'],
				firstName 	: formObject['firstName'],
				lastName 	: formObject['lastName'],
				middleName 	: formObject['middleName'],
				telephone 	: formObject[''],
				email 	: formObject['']
			},
			tourist_attr	: formObject['tourist'],
			profile_picture 	: formObject[''],
			description 	: formObject['']
		});

		newFacilitator.setPassword(formObject['password']);

		Administrator.create(formObject,function(err,administrator){
			if(administrator){
				newFacilitator.setAdministrator(administrator);
				newFacilitator.save(function(err,facilitator){
					callback(err,facilitator);
				});
			}else
				callback(err,null);
		});
	};
};

module.exports = new Facilitator();