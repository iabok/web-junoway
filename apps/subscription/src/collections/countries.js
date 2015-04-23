//AMD loading of modules and dependencies using Requirejs
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

    var Countries = Backbone.Model.extend({

    });
          
    var CountriesCollection = Backbone.Collection.extend({
        model: Countries,
        url: "json/countries.json",

        parse: function(response) {
            return response;
          },

        initialize: function () {

        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });

        this.deferred = new $.Deferred();
        },

        deferred: Function.constructor.prototype,

        fetchSuccess: function (collection, response) {
            collection.deferred.resolve();
        },

        fetchError: function (collection, response) {
            throw new Error("countries fetch did get collection from API");
        }
          });
      
    return {
        CountriesCollection : CountriesCollection
    };
});