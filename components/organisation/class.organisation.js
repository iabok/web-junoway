function Organisation(){

	var model = require('./model.organisation');

	this.create = function(formObject,callback){
		checkDuplicate(formObject['organ_name'],formObject['organ_country'],function(err,organisation){
			if(organisation)
				callback(null,organisation);
			else{
				new model({	
					name		: formObject['organ_name'],
					age	: formObject['organ_age'],
					category	: formObject['organ_category'],
					employerName	: {
						firstName 	: formObject['employer_firstName'],
						lastName 	: formObject['employer_lastName'],
						middleName 	: formObject['employer_middleName']
					},
					address		: {
						country		: formObject['organ_country'],
						city		: formObject['organ_city'],
						zipCode		: formObject['organ_zipCode'],
						state_district	: formObject['organ_state'],
						streetLine1	: formObject['organ_streetLine1'],
						streetLine2	: formObject['organ_streetLine2'],
						areaCode	: formObject['organ_areaCode'],
						postalCode	: formObject['organ_postalCode']
					},
					contact		: {
						website 	: formObject['organ_website'],
						mobileNumber	: {
							code : formObject['organ_mobiCode1']
						},
						landLine	: {
							code : formObject['organ_homeCode1']
						},
						employerEmail	: formObject['organ_email'],
						faxNumber 	: {
							code : formObject['organ_faxCode1']
						}
					},
					touristAttraction	:  formObject['tourist']
				}).save(function(err,organisation){
					callback(err,organisation);
				});
			}
		});
	};

	var checkDuplicate = function(organ_name, organ_country,callback){
		model.findOne({name: organ_name,'address.country': organ_country},function(err,organisation){
			callback(err,organisation);
		});
	};
};

module.exports = new Organisation();