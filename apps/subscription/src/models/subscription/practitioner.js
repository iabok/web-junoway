//AMD loading of modules and dependencies using Requirejs
define(['underscore', 'backbone', 'backbone-validation'], function (_, Backbone, BackboneValidation) {
    // Since we are automatically updating the model, we want the model
    // to also hold invalid values, otherwise, we might be validating
    // something else than the user has entered in the form.
    BackboneValidation.configure({
        forceUpdate: true
    });

    // Extend the callbacks to work with Bootstrap,  
    _.extend(BackboneValidation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'), 
                $group = $el.closest('.form-group');
            
            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'), 
                $group = $el.closest('.form-group');
            
            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });
     var PractitionerSignUpModel = Backbone.Model.extend({
        url: "http://localhost:3000/subscribe/practitioner",
        
        parse: function(response) {
        return response;
        },

        constructor: function (attributes, options) {
             Backbone.Model.apply(this, arguments);
        },

        idAttribute: '_id',
        defaults: {
            idAttribute: null
        },
        validation: {
             
            firstName: {
                required: true,
                minLength: 3
            },
            lastName: {
                required: true,
                minLength: 3
            },
            middleName: {
                required: false,
                minLength: 3
            },
            licenceNumber: {
                required: true,
                minLength: 3
            },
            email: {
                required: true,
                pattern: 'email'
            },
            password: {
                minLength: 8
            },
            confirmPassword: {
                equalTo: 'password',
                msg: 'The passwords does not match'
            },
            terms: {
                acceptance: true
            },
            age: {
                required: false,
                range: [18, 100]
            },
            sex: {
                oneOf: ['Male', 'Female']
            },
            nationality: {
                required:true,
              //oneOf: ['Ugandan', 'Kenyan', 'Tanzanian', 'Rwandanese', 'Burundian']
            },
            maritalStatus: {
                //oneOf: ['Single', 'Married']
            },
            validictory: {
                //oneOf: ['Single', 'Married']
            },
            experience: {
              oneOf: ['Below 5 years', '5-10 years', '10-25 years']
            },
            country: {
                required:true,
                //oneOf: ['Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Burundi']
            },
            state: {
                required: true,
                //oneOf: ['Kampala', 'Florida', 'Ohio', 'Los Angele','California']
            },
            city: {
                required: false,
                //oneOf: ['Kampala', 'Nairobi', 'Arusha', 'Kigali', 'Juba']
            },
            zipCode: {
                //required: true,
                minLength: 3
            },
            streetLine1: {
                required: false
            },
            streetLine2: {
                required: false
            },
            areaCode: {
                required: false
            },
            postalCode: {
                required: false
            },
            email2: {
                required: true,
                pattern: 'email'
            },
            mobiCode1: {
                required: true,
                minLength: 9
            },
            homeCode1: {
                required: false,
                minLength: 9
            },
            faxCode1: {
                required: true,
                minLength: 9
            },
             
            upin: {
                required: false,
                minLength: 3
            },
            upi: {
                required: false,
                minLength: 3
            },
            licence_number1: {
                equalTo: 'licenceNumber',
                msg: 'Licence Number Do not match'
            },
            licence_issueAuthority: {
                required: true,
                minLength: 3
            },
            licence_issueDate: {
                required: true,
                minLength: 3
            },
            licence_expireDate: {
                required: true,
                minLength: 3
            },
            speciality: {
                required:false,
                //oneOf: ['Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Burundi']
            },
            organ_age: {
                required: true,
                //oneOf: ['1', '2', '3','4','5']
            },
            organ_category: {
                required:false,
                //oneOf: ['Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Burundi']
            },
            employer_firstName: {
                required: true,
                minLength: 3
            },
            employer_lastName: {
                required: true,
                minLength: 3
            },
            employer_middleName: {
                required: false,
                minLength: 3
            },
            organ_country: {
                required:true,
                //oneOf: ['Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Burundi']
            },
            organ_zipCode: {
                required: true,
                minLength: 3
            },
            organ_state: {
                required: true,
                //oneOf: ['Arizona', 'Florida', 'Ohio', 'Los Angele','California']
            },
            organ_streetLine1: {
                required: false,
                minLength: 3
            },
            organ_city: {
                required: false,
                //oneOf: ['Kampala', 'Nairobi', 'Arusha', 'Kigali', 'Juba']
            },
            organ_streetLine2: {
                required: false,
                minLength: 3
            },
            organ_areaCode: {
                required: false,
                minLength: 3
            },
            organ_postalCode: {
                required: false,
                minLength: 3
            },
            organ_website: {
                required: false,
                minLength: 3
            },
            organ_mobiCode1: {
                required: true,
                minLength: 9
            },
            organ_homeCode1: {
                required: true,
                minLength: 9
            }, 
            organ_email: {
                required: true,
                pattern: 'email'
            },
            organ_faxCode1: {
                required: true,
                minLength: 9
            },
            tourist: {
                required: false,
                minLength: 3
            }
        }
    });

    return {
        PractitionerSignUpModel: PractitionerSignUpModel
    }
});