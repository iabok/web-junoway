var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	crypto = require('crypto'),
	uuid = require('node-uuid');



var facilitator = new Schema({

	name 		: String,
	category	: String,
	age 		: String,

	security : {
		password	: { type : String, required : true},
		salt		: { type : String, required : true, default : uuid.v1 },
		email 		: String,
		tin			: Number,
		licence	: {
			number 		: { type : String, required : true},
			issueAuthority 	: { type : String, required : true},
			issueDate		: Date,
			expireDate 		: Date
		}
	},
	address	: {
		country 	: { type : String, required : true},
		city		: String,
		state_district	: { type : String, required : true},
		streetLine1	: String,
		streetLine2	: String,
		zipCode		: Number,
		areaCode	: Number,
		postalCode	: Number
	},
	contact	: {
		website		: String,
		mobileNumber	: {
			code : String 
		},
		telephone1	: {
			code : String 
		},
		telephone2	: {
			code : String
		},
		faxNumber	: {
			code : String
		}
	},
	owner : {
		title			: String,
		firstName 		: String,
		lastName		: String,
		middleName 		: String,
		telephone 		: Number,
		email 			: String
	},
	administrator 	: {
		type	: Schema.ObjectId,
		ref 	: 'administrator'
	},
	tourist_attr : String,
	profile_picture : String,
	description : String
});

facilitator.methods.setAdministrator = function(administrator){
	this.administrator = administrator._id;
};
var hash = function (passwd, salt){
	return crypto.createHmac('SHA256', salt).update(passwd).digest('hex');
};

facilitator.methods.setPassword = function (passwordString) {
	this.security.password = hash(passwordString,this.security.salt);
};

facilitator.methods.isValidPassword = function (passwordString) {
	return this.security.password === hash(passwordString, this.security.salt);
};

mongoose.model('facilitator', facilitator);
module.exports = mongoose.model('facilitator');
