function Admministrator(){

	var model = require('./model.admministrator');

	this.create = function(formObject,callback){

		checkDuplicate(formObject['admin_firstName'],formObject['admin_lastName'],function(err,admministrator){
			if(admministrator)
				callback(null,admministrator);
			else{

				new administrator({
					title 	: formObject[''],
					firstName 	: formObject['admin_firstName'],
					lastName 	: formObject['admin_lastName'],
					middleName 	: formObject['admin_middleName'],
					age		: formObject['admin_age'],
					sex 	: formObject['admin_sex'],
					experience 	: formObject['admin_experience'],
					address : {
						country 	: formObject['admin_country'],
						city 	: formObject['admin_city'],
						zipCode 	: formObject['admin_zipCode'],
						state_district	: formObject['admin_state'],
						areaCode 	: formObject['admin_areaCode'],
						postalCode 	: formObject['admin_postalCode'],
						streetLine1 	: formObject['admin_streetLine1'],
						streetLine2 	: formObject['admin_streetLine2']
					},
					contact : {
						email 	: formObject['admin_email'],
						mobileNumber 	: {
							code : formObject['admin_mobiCode1']
						},
						landLine 	: {
							code : formObject['admin_homeCode1']
						},
						faxNumber 	: {
							code : formObject['admin_faxCode1']
						},
						onlineProfile	: formObject['admin_website']
					},
					security : {
					 	altEmail 	: formObject[''],
					 	nationality	: formObject['admin_nationality']
					}
				}).save(function(err,admministrator){
					callback(err,admministrator);
				});				
			}
		});
	};

	var checkDuplicate = function(admin_firstName,admin_lastName,callback){
		model.findOne({firstName: admin_firstName,lastName: admin_lastName},function(err,administrator){
			callback(err,administrator);
		});
	}; 
};

module.exports = new Admministrator();