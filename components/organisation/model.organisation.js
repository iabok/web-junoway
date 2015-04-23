var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organisation = new Schema({
	
	name		: String,
	age			: String,
	category	: String,
	employerName	: {
		firstName 	: String,
		lastName 	: String,
		middleName 	: String
	},
	address		: {
		country		: String,
		city		: String,
		zipCode		: Number,
		state_district	: String,
		streetLine1	: String,
		streetLine2	: String,
		areaCode	: Number,
		postalCode	: Number
	},
	contact		: {
		website 	: String,
		mobileNumber	: {
			code : String
			 
		},
		landLine	: {
			code 	: String
			 
		},
		employerEmail	: String,
		faxNumber 	: {
			code 	: String
		}
	},
	touristAttraction	:  String
});

mongoose.model('organisation',organisation);
module.exports = mongoose.model('organisation');