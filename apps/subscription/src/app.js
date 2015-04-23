define(['jquery', 'backbone', 'views/home/main', 'views/alerts/success'], function ($, Backbone, HomeView,SuccessView) {

	var $content = $('.main-app');
    var $bgContent = document.getElementById('juno-body').style.background="#eeeeee";
    var $loadingRemove = $('#juno-loading').hide();
    var dateOfIssue = $('#dateOfIssue');
    var dateOfExpiry = $('#dateOfExpiry');
    var date1;
    var date2;

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "contact": "contact",
            "success": "success",
            "subscription": "subscription",
            "subscription/practitioners": "practitioners",
            "subscription/facilitators": "facilitators"
        },

        home: function () {
            var homeView = new HomeView({el: $content });
            homeView.render();
            $loadingRemove;
            $('.flexslider').flexslider( {animation: "fade", controlNav: false, directionNav: false});
            
        },

        contact: function () {
            var homeView = new HomeView({el: $content });
            homeView.render();
            $loadingRemove;
            $('.flexslider').flexslider( {animation: "fade", controlNav: false, directionNav: false});
        },

        success: function () { 
                var successView = new SuccessView({el: $content});
                successView.render();                             
                $(".sub-content-bg").hide();
                $(".footer-bg").removeClass('footer-background');
                $(".footer-bg").addClass('footer-background-1');
                $loadingRemove; 
                $bgContent;      
            
        },

        subscription: function () {
            require(["views/subscription/homepage"], function (SubscribeView) {
                var subscribeView = new SubscribeView({el: $content});
                subscribeView.render();                             
                $("#sub-warning").modal('show');
                $loadingRemove; 
                $bgContent;  
                utils.formAnimate('0', '800');    
            });
        },

        practitioners: function () {
            require(["models/subscription/practitioner", "views/subscription/practitioner"], function (PractitionerSignUpModel, PractitionerView) {
                var practitionerView = new PractitionerView({el: $content,  model: new PractitionerSignUpModel.PractitionerSignUpModel() });
                practitionerView.render();
                $loadingRemove;

                $( '#dateOfIssue, #dateOfExpiry' ).datepicker({ dateFormat: 'yy-mm-dd' });
                $bgContent;
                $("#organ_mobiCode1, #organ_homeCode1, #organ_faxCode1, #mobiCode1, #homeCode1, #faxCode1").intlTelInput({
                    allowExtensions: true,
                    autoFormat: true,
                    //autoHideDialCode: false,
                    autoPlaceholder: true,
                    defaultCountry: "ug",
                    //ipinfoToken: "yolo",
                    nationalMode: false,
                    numberType: "MOBILE",
                    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
                    preferredCountries: ['ug','ke','tz','rw','us', 'gb',],
                    utilsScript: "lib/libphonenumber/build/utils.js"
                  });

                
                
            });
        },

        facilitators: function () {
            require(["models/subscription/facilitator", "views/subscription/facilitator"], function (FacilitatorSignUpModel, FacilitatorView) {
                var facilitatorView = new FacilitatorView({el: $content,  model: new FacilitatorSignUpModel.SignUpModel() });
                facilitatorView.render();
                //remove the spining effects
                $loadingRemove;
                //Datepicker by jquery
                $( '#dateOfIssue, #dateOfExpiry' ).datepicker({ dateFormat: 'yy-mm-dd' });
                //white backgroung   
                $bgContent;
                //International Calling Code
                $("#admin_mobiCode1, #admin_homeCode1, #admin_faxCode1, #mobiCode1, #teleCode1, #tele1Code1, #faxCode1").intlTelInput({
                    allowExtensions: true,
                    autoFormat: true,
                    //autoHideDialCode: false,
                    autoPlaceholder: true,
                    defaultCountry: "ug",
                    //ipinfoToken: "yolo",
                    nationalMode: false,
                    numberType: "MOBILE",
                    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
                    preferredCountries: ['ug','ke','tz','rw','us', 'gb',],
                    utilsScript: "lib/libphonenumber/build/utils.js"
                  });
                 
            });
        }
    });

});