/**
 * Created by Viktor Blovytskyi on 21.06.2016.
 */
$(function () {

    //  Rectangle Model
    //  ----------------------------------

    var Rectangle = Backbone.Model.extend({

        defaults: function () {
            return {
                width: "0px",
                height: "0px",
                color: "red"
            }
        },

        initialize: function() {
            if (!this.get("width")) {
                this.set({"width": this.defaults().width});
            } else if (!this.get("height")){
                this.set({"height": this.defaults().height})
            } else if (!this.get("color")) {
                this.set({"color": this.defaults().color})
            }
        }
    });

    //  Rectangle Collection
    //  -----------------------------------
    
    var RectangleList = Backbone.Collection.extend({

        model: Rectangle,
        localStorage: new Backbone.LocalStorage("rectangles")

    });

    var Rectangles = new RectangleList;

    //  Rectangle View
    //  -----------------------------------

    var RectangleView = Backbone.View.extend({
        
    });
    
    //  App View
    //  -----------------------------------
    
    var AppView = Backbone.View.extend({
        el: $("#editor")
    });
});