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

    //  Rectangle View
    //  -----------------------------------


    var RectangleView = Backbone.View.extend({

        tagName: 'div',
        //template: _.template("<div id="+Date.now()+" style=\"position: absolute; top: <%= top %>px; left: <%= left %>px;\">TEST</div> "),

        initialize: function () {
            this.render();
        },
        
        render: function () {

            this.el.id = this.model.attributes.id;
            this.el.style.position = 'absolute';
            this.el.class = 'rectangle';
            this.el.style.cursor = 'move';
            this.el.style.top = this.model.attributes.top;
            this.el.style.left = this.model.attributes.left;
            this.$el.html("test");
            return this;
        },

        events: {
            'mousedown' : 'drugAndDrop'
        },

        drugAndDrop: function (e) {
            e.preventDefault();
            var frame = document.getElementById('frame');

            var drug = function (e) {
                e.preventDefault();
                var frame = document.getElementById('frame');
                this.changePosition(e.clientY, e.clientX);
            }.bind(this);

            var drop = function (e) {
                e.preventDefault();
                var frame = document.getElementById('frame');
                this.changePosition(e.clientY, e.clientX);
                frame.removeEventListener('mouseup', drop);
                frame.removeEventListener('mousemove', drug);
            }.bind(this);
            frame.addEventListener('mousemove', drug);
            frame.addEventListener('mouseup', drop);

        },

        changePosition: function (top, left) {
            this.model.attributes.top = top;
            this.model.attributes.left = left;
            this.render();
        }



        
    });
    
    //  App View
    //  -----------------------------------
    
    var AppView = Backbone.View.extend({

        el: $("#frame"),

        events: {
            'dblclick': 'createRectangle'
        },

        initialize: function () {
            //console.log(this.events);
        },

        createRectangle: function (e) {
            e.preventDefault();
            var rectangle =     new Rectangle({top: e.clientY, left: e.clientX }),
                rectangleView = new RectangleView({model:rectangle}),
                frame =        document.getElementById('frame');

            frame.appendChild(rectangleView.render().el);
        }

    });

    var app = new AppView;
    //console.log(app);
});

