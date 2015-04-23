var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	crypto = require('crypto'),
	uuid = require('node-uuid');

var practitioner = new Schema({

	security 	: {
		firstName 	: { type : String, required : true },
		lastName 	: { type : String, required : true },
		middleName	: String,
		
		licence	: {
			number 			: {type : String, required : true},
			issueingAuthority	: String,
			issueDate		: Date,
			expireDate		: Date
		},		
		password	: { type : String, required : true},
		salt 		: { type : String, required : true, default : uuid.v1 },
		email		: { type : String, required : true } 	
	},
	personal	: {
		age		: Number,
		sex		: String,
		nationality	: String,
		maritalStatus 	: String,
		validictory 	: String,
		personalExprience	: String
	},
	address 	: {
		country		: { type : String, required : true},
		city		: String,
		zipCode		: Number,
		state_district	: String,
		streetLine1	: String,
		streetLine2	: String,
		areaCode	: Number,
		postalCode	: Number
	},
	contact 	: {
		altenateEmail	: String,
		mobileNumber	: {
			code : String,
		},
		landLine	: {
			code : String,
		},
		faxNumber	: {
			code : String,
		},
		upin		: Number,
		npi		: Number
	},
	proffesional : {
		organisation : {
			type 	: Schema.ObjectId,
			ref	: 'organisation' 	
		},
		speciality : String 
	}
});

var hash = function (passwd, salt){
	return crypto.createHmac('SHA256', salt).update(passwd).digest('hex');
};

practitioner.methods.setPassword = function (passwordString) {
	this.security.password = hash(passwordString,this.security.salt);
};

practitioner.methods.isValidPassword = function (passwordString) {
	return this.security.password === hash(passwordString, this.security.salt);
};

practitioner.methods.setOrganisation = function (organisation) {
	this.proffesional.organisation = organisation._id;
};

mongoose.model('practitioner', practitioner);
module.exports = mongoose.model('practitioner');