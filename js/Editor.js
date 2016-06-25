/**
 * Created by Viktor Blovytskyi on 21.06.2016.
 */
$(function () {

    //  Rectangle Model
    //  ----------------------------------

    var Rectangle = Backbone.Model.extend({

        defaults: function () {
            return {
                id: Date.now(),
                top: "30px",
                left: "30px",
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
    
    // var RectangleList = Backbone.Collection.extend({
    //
    //     model: Rectangle,
    //
    //     localStorage: new Backbone.LocalStorage("rectangles")
    //
    // });

    // var Rectangles = new RectangleList;

    //  Rectangle View
    //  -----------------------------------

    //<div style=\"position: absolute; top: 30px; left: 30px;;\">TEST</div>

    var RectangleView = Backbone.View.extend({

        tagName: 'div',
        //template: _.template("<div id="+Date.now()+" style=\"position: absolute; top: <%= top %>px; left: <%= left %>px;\">TEST</div> "),

        initialize: function () {
            //this.render();
        },
        
        render: function () {

            this.el.id = this.model.attributes.id;
            this.el.style.position = 'absolute';
            this.el.style.top = this.model.attributes.top;
            this.el.style.left = this.model.attributes.left;
            this.$el.html("test");
            return this;
        },

        events: {
            'click' : 'test'
        },

        test:function(e){
            console.log(this.$el);
        }

        
    });
    
    //  App View
    //  -----------------------------------
    
    var AppView = Backbone.View.extend({

        el: $("#editor"),

        events: {
            'click': 'createRectangle'
        },

        initialize: function () {
            //console.log(this.events);
        },

        createRectangle: function (e) {
            var rectangle = new Rectangle({top: e.clientY, left: e.clientX });
            var rectangleView = new RectangleView({model:rectangle});
            this.$el.append(rectangleView.render().el);
        }
    });

    var app = new AppView;
    //console.log(app);
});

