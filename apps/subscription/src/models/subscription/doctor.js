define(['backbone', 'backbone-validation'], function (Backbone, BackboneValidation) {


     var DoctorModel = Backbone.Model.extend({
         urlRoot: "/varify/number/",
    });

    return {
        PractitionerSignUpModel: PractitionerSignUpModel
    }
});