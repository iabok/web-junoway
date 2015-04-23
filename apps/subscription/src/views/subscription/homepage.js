define(
['backbone', 'templates'],
function(Backbone, templates) {

    return Backbone.View.extend({

        template: templates['subscription/homepage.html'],
        
        render: function() {
            this.$el.html(this.template());

            return this;
        }

    });

});