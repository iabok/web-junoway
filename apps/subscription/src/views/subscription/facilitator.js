//AMD loading of modules and dependencies using Requirejs
define(
['jquery','underscore','backbone', 'backbone-validation', 'stickit', 
'collections/countries',
'collections/subscription/facilitator',
'templates', 'intlTelInput', 'app'],
function($,_, Backbone, BackboneValidation, stickit, country, facilitator, templates, intlTelInput, Router) {
	var router = new Router();
    return Backbone.View.extend({

        template: templates['subscription/facilitator.html'],
        
	    events: {
	       'click .personalNext': 'personalNext',
	       'click .proffessionalNext': 'proffessionalNext',
	       'click .personalBack': 'personalBack',
	       'click .securityBack': 'securityBack',	    	
	       'click #signUpButton': function (e) {
	            e.preventDefault();
	            this.signUp();
	        }
	    },   
	    // Use stickit to perform binding between
	    // the model and the view
	    bindings: {
	    	'[name=companyName]': {
	            observe: 'companyName',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=companyTin]': {
	            observe: 'companyTin',
	            setOptions: {
	                validate: true
	            }    
	        },
	        '[name=regNo]': {
	            observe: 'regNo',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=ownersTitle]': {
	            observe: 'ownersTitle',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=firstName]': {
	            observe: 'firstName',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=lastName]': {
	            observe: 'lastName',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=middleName]': {
	            observe: 'middleName',
	            setOptions: {
	                validate: false
	            }
	        },
	        '[name=email]': {
	            observe: 'email',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=password]': {
	            observe: 'password',
	            setOptions: {
	                validate: true
	            }
        	},
	        '[name=confirmPassword]': {
	            observe: 'confirmPassword',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=terms]': {
	            observe: 'terms',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_firstName]': {
	            observe: 'admin_firstName',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_lastName]': {
	            observe: 'admin_lastName',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_middleName]': {
	            observe: 'admin_middleName',
	            setOptions: {
	                validate: false
	            }
	        },
	        '[name=gender]': {
	            observe: 'gender',
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_age]': {
	            observe: 'admin_age',
	            events: ['change'],
	            onSet: function(val) {
	                return parseInt(val, 10) || undefined;
	            },
	            setOptions: {
	                validate: false
	            }
	        },
	        '[name=admin_sex]': {
	            observe: 'admin_sex',
	            selectOptions: {
	                collection: function() {
	                  return ['Male', 'Female'];
	                }
	            },
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_nationality]': {
	            observe: 'admin_nationality',
	            initialize: function($el) {
	            	
                    $el.select2({ width: 300, placeholder: "Select Your Nationality", allowClear: true });
                    //$el.select2({templateResult: formatState});
                },
                selectOptions: {
	                collection: function() {
	                        
	                        return Nationalities;
	                },
	                valuePath: 'name',
	                labelPath: 'name',
	                    defaultOption: {
	                        label: '',
	                        value: null
	                    }
                },
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_experience]': {
	            observe: 'admin_experience',
	            selectOptions: {
	                collection: function() {
	                  return ['Below 5 years', '5-10 years', '10-25 years'];
	                }
	            },
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=admin_Country]': {
	            observe: 'admin_Country',
	            initialize: function($el) {
	            	
                    $el.select2({ width: 300, placeholder: "Select a Country", allowClear: true });
                    //$el.select2({templateResult: formatState});
                },
                selectOptions: {
	                collection: function() {
	                        
	                        return utils.countryList(countries);
	                },
	                valuePath: 'name',
	                labelPath: 'name',
	                    defaultOption: {
	                        label: '',
	                        value: null
	                    }
                },
                onSet: function(val) {
                    this.model.set('admin_Country', val);
                    this.$('#admin_Country').val();
                    return val;
                },
                setOptions: {
	                validate: true
	            }
        	},
        	'[name=admin_zipCode]': {
	            observe: 'admin_zipCode',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=admin_state]': {
	            observe: ['admin_Country', 'admin_state'],
                initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a State", allowClear: true });
                },
                selectOptions: {
                    collection: function() {
                        var countryId = this.model.get('admin_Country');
                       		return utils.stateList(countries, countryId);      
                    },
                    valuePath: 'name',
                    labelPath: 'name',
                    defaultOption: {
                        label: '',
                        value: null
                    }
                },
                onSet: function(val) {
                    this.model.set('admin_state', val);
                    this.$('#admin_state').val();
                    return val;
                },
                setOptions: {
	                validate: true
	            }
            },
	        '[name=admin_streetLine1]': {
	            observe: 'admin_streetLine1',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=admin_city]': {
        		//var statesId = this.$('#admin_state').val();
        		//console.log(statesId);
                observe: ['admin_Country', 'admin_state', 'admin_city'],
                initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a City", allowClear: true });

                },
                selectOptions: {
                    collection: function() {
                        
                        var countryStatesId = this.model.get('admin_state'),
                        	countryId = this.model.get('admin_Country'),
						    indexValueOfCountry = countryId,
						    indexValueOfState = countryStatesId;
						    //function for populating the cities
							return utils.cityList(countries, countryId, indexValueOfCountry, indexValueOfState);		
                         
                    },
                    valuePath: 'name',
                    labelPath: 'name',
	                    defaultOption: {
	                        label: '',
	                        value: null
	                    }
                },
                setOptions: {
	                validate: false
	            }
            },
	        '[name=admin_streetLine2]': {
	            observe: 'admin_streetLine2',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=admin_areaCode]': {
	            observe: 'admin_areaCode',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=admin_postalCode]': {
	            observe: 'admin_postalCode',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=admin_email]': {
	            observe: 'admin_email',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=admin_mobiCode1]': {
	            observe: 'admin_mobiCode1',
                setOptions: {
	                validate: true
	            }
        	},
        	'[name=admin_homeCode1]': {
	            observe: 'admin_homeCode1',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=admin_faxCode1]': {
	            observe: 'admin_faxCode1',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=admin_website]': {
	            observe: 'admin_website',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=companyTin2]': {
	            observe: 'companyTin2',
	            setOptions: {
	                validate: true
	            }    
	        },
	        '[name=regNo2]': {
	            observe: 'regNo2',
	            setOptions: {
	                validate: true
	            }
	        },
        	'[name=issuing]': {
	            observe: 'issuing',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=dateOfIssue]': {
	            observe: 'dateOfIssue',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=dateOfExpiry]': {
	            observe: 'dateOfExpiry',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=ageOfCompany]': {
	            observe: 'ageOfCompany',
	            selectOptions: {
	                collection: function() {
	                  return utils.ageOfCompany(1000);
	                }
	            },
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=Country]': {
	            observe: 'Country',
	            initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a Country", allowClear: true });

                },
	            selectOptions: {
	                collection: function() {
	                  return utils.countryList(countries);
	            },
	            valuePath: 'name',
                labelPath: 'name',
	                defaultOption: {
	                        label: '',
	                        value: null
	                },
            	},
            	onSet: function(val) {
                    this.model.set('Country', val);
                    this.$('#Country').val();
                    return val;
                },
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=zipCode]': {
	            observe: 'zipCode',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=state]': {
	            observe: ['Country', 'state'],
	            initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a State", allowClear: true });

                },
	            selectOptions: {
	                collection: function() {
	                	var countryId = this.model.get('Country');
	                	console.log(countryId);
	                  return utils.stateList(countries, countryId);
	            },	            
	            valuePath: 'name',
                labelPath: 'name',
                	defaultOption: {
                        label: '',
                        value: null
                	}
                },
                onSet: function(val) {
                    this.model.set('state', val);
                    this.$('#state').val();
                    return val;
                },
	            setOptions: {
	                validate: true
	            }
	        },
	        '[name=streetLine1]': {
	            observe: 'streetLine1',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=city]': {
	            observe:['Country', 'state', 'city'],
	            initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a City", allowClear: true });

                },
                selectOptions: {
                    collection: function() {
                        
                        var countryStatesId = this.model.get('state'),
                        	countryId = this.model.get('Country'),
						    indexValueOfCountry = countryId,
						    indexValueOfState = countryStatesId;
						    //function for populating the cities
						return utils.cityList(countries, countryId, indexValueOfCountry, indexValueOfState);		
                         
                    },
                    valuePath: 'id',
                    labelPath: 'name',
                    defaultOption: {
                        label: '',
                        value: null
                    }
                },
	            setOptions: {
	                validate: false
	            }
	        },
	        '[name=streetLine2]': {
	            observe: 'streetLine2',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=areaCode]': {
	            observe: 'areaCode',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=postalCode]': {
	            observe: 'postalCode',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=website]': {
	            observe: 'website',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=mobiCode1]': {
	            observe: 'mobiCode1',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=teleCode1]': {
	            observe: 'teleCode1',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=tele1Code1]': {
	            observe: 'tele1Code1',
	            setOptions: {
	                validate: false
	            }
        	},
        	'[name=faxCode1]': {
	            observe: 'faxCode1',
	            setOptions: {
	                validate: true
	            }
        	},
        	'[name=tourist]': {
	            observe: 'tourist',
	            setOptions: {
	                validate: false
	            }
        	}       	
	    },

	    initialize: function () {
	    	//this.country = new country.CountriesCollection();
			//var countryCollection = this.country.fetch();
			//console.log(countryCollection);
	        // This hooks up the validation
	        BackboneValidation.bind(this);
	        //this.facilitatorCollection = new facilitator.FacilitatorCollection();
	    },
	
	    render: function() {
	    	this.$el.html(this.template());
	    	this.$securityInfo = this.$('#security-info');
            this.$personalInfo = this.$('#personal-info');
            this.$proffessionalInfo = this.$('#proffessional-info'); 
            this.securityVisible();
            utils.formAnimate('100', '800');
	        this.stickit();
	        return this;
	    },

	    securityVisible: function() {
    		this.$securityInfo.fadeIn("slow");
      		this.$personalInfo.hide();
      		this.$proffessionalInfo.hide();
      		$('.timeline').removeClass('timeline-form-border-second');
      		$('.timeline').addClass('timeline-form-border');
	      	$('.timeline-active-1').addClass('active');
    	},

    	personalVisible: function() {
    		
    		if ($('#companyName').val()=="") 
    		{
    			$('.company-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Company Name is Required!', 'modal-danger');
    		}

    		else if ( ($('#companyTin').val()=="") && ($('#companyTin').val().length < 9) )
    		{
    			$('.tin-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Company Tin is Required!', 'modal-danger');

    		}

    		else if ($('#regNo').val()=="" && $('#regNo').val().length < "9") 
    		{
    			$('.regno-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Registration Number is Required!', 'modal-danger');

    		}

    		else if ($('#ownersTitle').val()=="") 
    		{
    			$('.owner-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Owners Title is Required!', 'modal-danger');

    		}


    		else if ($('#firstName').val()=="") 
    		{
    			$('.fname-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'First Name is Required!', 'modal-danger');

    		}

    		else if ($('#lastName').val()=="") 
    		{
    			$('.lname-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'First Name is Required!', 'modal-danger');

    		}

    		else if ($('#email').val()=="") 
    		{
    			$('.email-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Email is Required!', 'modal-danger');

    		}

    		else if ($('#password').val()=="") 
    		{
    			$('.password-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Password is Required!', 'modal-danger');

    		}

    		else if ($('#terms').checked== true){
    			utils.showAlert('ERROR:', 'Terms and Reposiblities must be Accepted!');
    		}
    		else{
	      		this.$securityInfo.hide();
	      		this.$personalInfo.fadeIn("slow");
	      		this.$proffessionalInfo.hide();
	      		$('.timeline').removeClass('timeline-form-border');
	      		$('.timeline').addClass('timeline-form-border-second');
	      		$('.timeline-active-1').removeClass('active');
	      		$('.timeline-active-2').addClass('active');
			
	      	}

    	},

    	proffessionalVisible: function() {

    		
    		if ($('#admin_firstName').val()=="") 
    		{
    			$('.admin-firstName-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator First Name is Required!', 'modal-danger');
    		}

    		else if ( ($('#admin_lastName').val()==""))
    		{
    			$('.admin-lastName-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator Last Name is Required!', 'modal-danger');

    		}

    		else if ($('#admin_Country').val()=="") 
    		{
    			$('.admin-country-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator Country is Required!', 'modal-danger');

    		}

    		else if ($('#admin_zipCode').val()=="") 
    		{
    			$('.admin-zipCode-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Zip Code is Required!', 'modal-danger');

    		}

    		
    		else if ($('#admin_state').val()=="") 
    		{
    			$('.admin-state-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator State is Required!', 'modal-danger');

    		}
			

    		else if ($('#admin_email').val()=="") 
    		{
    			$('.admin-email-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator Email is Required!', 'modal-danger');

    		}

    		else if ($('#admin_mobiCode1').val()=="") 
    		{
    			$('.admin-mobiCode1-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator Mobile Number is Required!', 'modal-danger');

    		}

    		else if ($('#admin_faxCode1').val()=="") 
    		{
    			$('.admin-faxCode1-error').addClass("has-error");
	    		utils.showAlert('ERROR:', 'Administrator Fax Number is Required!', 'modal-danger');

    		}
    		else{
	    		var dateOfIssue = $('#dateOfIssue');
			    var dateOfExpiry = $('#dateOfExpiry');
			     
	      		this.$securityInfo.hide();
	      		this.$personalInfo.hide();
	      		this.$proffessionalInfo.fadeIn("slow");
	      		$('.timeline').removeClass('timeline-form-border-second');
	      		$('.timeline').addClass('timeline-form-border-third');
	      		$('.timeline-active-2').removeClass('active');
		      	$('.timeline-active-3').addClass('active');

		      	$( '#dateOfIssue, #dateOfExpiry' ).on("keyup change", function() {
	                    var dateOfIssueValue = dateOfIssue.val();
	                    var dateOfExpiryValue = dateOfExpiry.val();    
		                return utils.dateValidator(dateOfIssueValue,dateOfExpiryValue);	            	       
	            });
            }	 
            
    	},

    	personalNext: function() {
            this.personalVisible();
            utils.formAnimate('100', '800');

    		
    	},

    	proffessionalNext: function() {	
    		this.proffessionalVisible();
    		utils.formAnimate('100', '800');  
    	},

    	personalBack: function() {
    		$('.timeline').removeClass('timeline-form-border-third');
    		this.personalNext();
    	},

    	securityBack: function() {
    		this.securityVisible();
    		utils.formAnimate('100', '800'); 
    	},	

    	signUp: function () {
    		
	        // Check if the model is valid before saving to the database
	        self = this;
	        if(this.model.isValid(true)) { 
	        	//---this.model.save()--insert the data into the database
	        	//we are extending this function by enabling callbacks. this
	        	//function takes two callback that is success and error. Each
	        	//has been explained how they are implemented below 
	        	
	            this.model.save({}, {
	            	wait:true,
	            	
	            	success: function(model, response, options) {
	            		 
			        		//Alerts if data has been successfuly inserted in the database
				            //self.render();
				            router.navigate('/success', true);
				            utils.showAlert('Success!', 'Your Information was saved successfully', 'modal-success');
				        
			        },
			        error: function(model, xhr, options) {
			        	//Alerts if they is not internet connectivity
			            //self.render();
			            utils.showAlert('ERROR:', 'An error occurred: Try Reloading Page', 'modal-danger');
			        } 
		        });
	        }else{
	        	//alerts if they are errors in the forms
	        	utils.showAlert('ERROR:', 'You have errors in your form. Click Back to confirm.!', 'modal-danger');
	        	utils.formAnimate('100', '800');
	        }
	    }, 

	    remove: function() {
	        // Remove the validation binding
	        BackboneValidation.unbind(this);
	        return Backbone.View.prototype.remove.apply(this, arguments);
	    }
	});
});