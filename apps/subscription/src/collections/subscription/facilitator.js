define(['backbone', 'models/subscription/facilitator'], function (Backbone, signUp ) {
	var signUp = new signUp.SignUpModel();

	FacilitatorCollection = Backbone.Collection.extend({

            model: signUp,
            url: "http://localhost:3000/subscribe/facilitator"

    });

    return {
        FacilitatorCollection: FacilitatorCollection
    };
});