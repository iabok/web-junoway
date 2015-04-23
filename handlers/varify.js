var mongoose = require('mongoose');
var async = require('async');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
	Reg_No 	: String,
	Surname	: String,
	Other_Name	: String,
	Telephone	: Number,
	Email 	: String,
	Employer	: String,
	Postal_Address	: String,
	First_Qualification	: String,
	Data_of_First_Registration	: Date,
	Additional_Qualification	: String,
	Speciality	: String
});

var clinicSchema = new Schema({
	Reg_No 		: Number,
	Reg_Date 	: Date,
	Name  		: String,
	Address 	: String,
	District	: String,
	Owner 		: String
});

var labSchema = new Schema({
	Reg_No 		: String,
	Reg_Date 	: Date,
	Name 		: String,
	Address 	: String,
	District	: String,
	Level	 	: String,
	Qualification 	: String,
	Incharge	: String	 
});

var hospitalSchema = new Schema({
	Reg_No 	: String,
	Name  	: String,
	Owner	: String,
	Owner_Telephone	: Number,
	Owner_Email	: String,
	Supervisor	: String,
	Supervisor_Telephone	: Number,
	Supervisor_Email	: String,
	Plot	: String,
	Ward	: String,
	Division	: String,
	District	: String,
	Village	: String,
	Sub_County	: String,
	Sub_County	: String,
	Category_of_Health_Unit	: String,
	Health_Unit_Status	: String,
	Number_of_Beds 	: Number,
	Laboratory_Services	: Boolean,
	Xray_Services	: Boolean,
	Raadiotherapy_Services 	: Boolean,
	Ambulance_Services	: Boolean,
	Other_Services : Array,
	Receipt_No 	: Number,
	Serial_No	: Number,
	OL_2014	: Date
});

var clinic = mongoose.model('clinic',clinicSchema);
var doctor = mongoose.model('doctor',doctorSchema);
var hospital = mongoose.model('hospital',hospitalSchema);
var lab = mongoose.model('lab',labSchema);

exports.Practioner = function(licenseNum,callback){
	doctor.findOne({Reg_No: licenseNum},function(err,doc){
		callback(doc);
	});
};

exports.Facilitator = function(licenseNum,callback){
	var varified = null;

	hospital.findOne({Reg_No: licenseNum},function(err,hospital){
		if(hospital){
			varified = hospital;
			callback(varified);
		};
	});
	if(!varified){
		licenseNum = Number(licenseNum);
		clinic.findOne({Reg_No: licenseNum},function(err,clinic){
			varified = clinic;
			if (varified)
				callback(varified);
		});
	};
	if(!varified){
		lab.findOne({"Lab No": licenseNum},function(err,lab){
			varified = clinic;
			callback(varified);
		});
	};
};