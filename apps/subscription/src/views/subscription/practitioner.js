//AMD loading of modules and dependencies using Requirejs
define(
['jquery','underscore','backbone', 'backbone-validation', 'stickit', 
'collections/countries',
'models/subscription/practitioner',
'templates', 'intlTelInput', 'app'],
function($,_, Backbone, BackboneValidation, stickit, country, practitioner, templates, intlTelInput, Router) {
    var router = new Router();

    return Backbone.View.extend({

 	    template: templates['subscription/practitioner.html'],

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

        bindings: {
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
            '[name=licenceNumber]': {
                observe: 'licenceNumber',
                setOptions: {
                    validate: true
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
            '[name=age]': {
                observe: 'age',
                events: ['change'],
                onSet: function(val) {
                    return parseInt(val, 10) || undefined;
                },
                setOptions: {
                    validate: false
                }
            },
            '[name=sex]': {
                observe: 'sex',
                selectOptions: {
                    collection: function() {
                      return ['Male', 'Female'];
                    }
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=nationality]': {
                observe: 'nationality',
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
            '[name=maritalStatus]': {
                observe: 'maritalStatus',
                selectOptions: {
                    collection: function() {
                      return ['Single', 'Married'];
                    }
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=validictory]': {
                observe: 'validictory',
                selectOptions: {
                    collection: function() {
                      return ['PhD', 'Masters', 'Bachelors', 'Diploma', 'Certificate'];
                    }
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=experience]': {
                observe: 'experience',
                selectOptions: {
                    collection: function() {
                      return ['Below 5 years', '5-10 years', '10-25 years'];
                    }
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=country]': {
                observe: 'country',
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
                    this.model.set('country', val);
                    this.$('#country').val();
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
                observe: ['country', 'state'],
                initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a State", allowClear: true });
                },
                selectOptions: {
                    collection: function() {
                        var countryId = this.model.get('country');
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
                //var statesId = this.$('#admin_state').val();
                //console.log(statesId);
                observe: ['ountry', 'state', 'city'],
                initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a City", allowClear: true });

                },
                selectOptions: {
                    collection: function() {
                        
                        var countryStatesId = this.model.get('state'),
                            countryId = this.model.get('country'),
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
                observe: 'postal_Code',
                setOptions: {
                    validate: false
                }
            },
            '[name=email2]': {
                observe: 'email2',
                setOptions: {
                    validate: true
                }
            }, 
            '[name=mobiCode1]': {
                observe: 'mobiCode1',
                setOptions: {
                    validate: true
                }
            },
            '[name=homeCode1]': {
                observe: 'homeCode1',
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
            '[name=upin]': {
                observe: 'upin',
                setOptions: {
                    validate: false
                }
            },
            '[name=upi]': {
                observe: 'upi',
                setOptions: {
                    validate: false
                }
            },
            '[name=licence_number1]': {
                observe: 'licence_number1',
                setOptions: {
                    validate: true
                }    
            }, 
            '[name=licence_issueAuthority]': {
                observe: 'licence_issueAuthority',
                setOptions: {
                    validate: true
                }
            },
            '[name=licence_issueDate]': {
                observe: 'licence_issueDate',
                setOptions: {
                    validate: true
                }
            },
            '[name=licence_expireDate]': {
                observe: 'licence_expireDate',
                setOptions: {
                    validate: true
                }
            },
            '[name=speciality]': {
                observe: 'speciality',
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_age]': {
                observe: 'organ_age',
                selectOptions: {
                    collection: function() {
                      return utils.ageOfCompany(1000);
                    }
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_category]': {
                observe: 'organ_category',
                setOptions: {
                    validate: true
                }
            },
            '[name=employer_firstName]': {
                observe: 'employer_firstName',
                setOptions: {
                    validate: true
                }
            },
            '[name=employer_lastName]': {
                observe: 'employer_lastName',
                setOptions: {
                    validate: true
                }
            },
            '[name=employer_middleName]': {
                observe: 'employer_middleName',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_country]': {
                observe: 'organ_country',
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
                    this.model.set('organ_country', val);
                    this.$('#organ_country').val();
                    return val;
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_zipCode]': {
                observe: 'organ_zipCode',
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_state]': {
                observe: ['organ_country', 'organ_state'],
                initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a State", allowClear: true });

                },
                selectOptions: {
                    collection: function() {
                        var countryId = this.model.get('organ_country');
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
                    this.model.set('organ_state', val);
                    this.$('#organ_state').val();
                    return val;
                },
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_streetLine1]': {
                observe: 'organ_streetLine1',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_city]': {
                observe:['organ_country', 'organ_state', 'organ_city'],
                initialize: function($el) {
                    $el.select2({ width: 300, placeholder:"Select a City", allowClear: true });

                },
                selectOptions: {
                    collection: function() {
                        
                        var countryStatesId = this.model.get('organ_state'),
                            countryId = this.model.get('organ_country'),
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
            '[name=organ_streetLine2]': {
                observe: 'organ_streetLine2',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_areaCode]': {
                observe: 'organ_areaCode',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_postalCode]': {
                observe: 'organ_postalCode',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_website]': {
                observe: 'organ_website',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_mobiCode1]': {
                observe: 'organ_mobiCode1',
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_homeCode1]': {
                observe: 'organ_homeCode1',
                setOptions: {
                    validate: false
                }
            },
            '[name=organ_email]': {
                observe: 'organ_email',
                setOptions: {
                    validate: true
                }
            },
            '[name=organ_faxCode1]': {
                observe: 'organ_faxCode1',
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
            BackboneValidation.bind(this);
        },
    
        render: function() {
            this.$el.html(this.template());
            this.$securityInfo = this.$('#security-info');
            this.$personalInfo = this.$('#personal-info');
            this.$proffessionalInfo = this.$('#proffessional-info');
            utils.formAnimate('100', '800');
            this.securityVisible();
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
      		this.$securityInfo.hide();
      		this.$personalInfo.fadeIn("slow");
      		this.$proffessionalInfo.hide();
            $('.timeline').removeClass('timeline-form-border');
            $('.timeline').addClass('timeline-form-border-second');
            $('.timeline-active-1').removeClass('active');
            $('.timeline-active-2').addClass('active');
    	},

    	proffessionalVisible: function() {
                var dateOfIssue = $('#dateOfIssue');
                var dateOfExpiry = $('#dateOfExpiry');
                var regNo2 = $('#regNo2');
                this.$securityInfo.hide();
                this.$personalInfo.hide();
                this.$proffessionalInfo.fadeIn("slow");
                var companyTin = $('#companyTin').val();
                var companyTin2 = $('#companyTin2').val();

                $('.timeline').removeClass('timeline-form-border-second');
                $('.timeline').addClass('timeline-form-border-third');
                $('.timeline-active-2').removeClass('active');
                $('.timeline-active-3').addClass('active');

                $( '#regNo2' ).on("keyup change", function() {   
                        if (companyTin != companyTin2){
                            utils.showAlert('ERROR:', 'The Company Tin Do not Match.', 'modal-danger');
                            $( '#companyTin2' ).val(''); 
                            $('.dateOfIssue-error').addClass("has-error");
                        }                          
                });

                $( '#dateOfIssue, #dateOfExpiry' ).on("keyup change", function() {
                        var dateOfIssueValue = dateOfIssue.val();
                        var dateOfExpiryValue = dateOfExpiry.val();    
                        return utils.dateValidator(dateOfIssueValue,dateOfExpiryValue);                        
                }); 
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
    		this.personalNext();
            $('.timeline').removeClass('timeline-form-border-third');
            utils.formAnimate('100', '800');
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
            BackboneValidation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});