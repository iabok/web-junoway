define(
['backbone', 'templates'],
function(Backbone, templates) {

    return Backbone.View.extend({

        template: templates['subscription/success-create.html'],

        render: function() {
            this.$el.html(this.template());

            return this;
        }

    });

});
