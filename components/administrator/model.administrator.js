var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var administrator = new Schema({
	title 			: String,
	firstName 			: { type : String, required : true},
	lastName 			: { type : String, required : true},
	middleName 		: String,
	age				: Number,
	sex				: String,
	experience		: Number,
	address	: {
		country		: { type : String, required : true},
		city		: String,
		zipCode		: Number,
		areaCode	: Number,
		postalCode	: Number,
		state_district	: { type : String, required : true},
		streetLine1		: String,
		streetLine2		: String
	},
	contact : {
		email 			: { type : String, required : true},
		mobileNumber	: {
			code : String
		},
		landLine		: {
			code : String 
		},
		faxNumber		: {
			code : String 
		},
		onlineProfile	: String
	},
	security	: {
		email 		: { type : String, required : true, default : this.contact.email},
		mobileNumber 	: { type : String, required : true, default : this.contact.mobileNumber},
		altEmail 	: String,
		nationality	: String
	}
});

mongoose.model('administrator',administrator);
module.exports = mongoose.model('administrator');
