define(['backbone', 'models/subscription/practitioner'], function (Backbone, signUp ) {
	var signUp = new signUp.PractitionerSignUpModel();

	practitionerCollection = Backbone.Collection.extend({

            model: signUp,
            url: "http://localhost:3000/subscribe/practitioner"

    });

    return {
        practitionerCollection: practitionerCollection
    };
});