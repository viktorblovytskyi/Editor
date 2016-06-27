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
                firstCordX: 10,
                firstCordY: 10,
                secondCordX: 20,
                secondCordY: 20,
                top: "30px",
                left: "30px",
                width: "10px",
                height: "10px",
                color: "red"

            }
        },

        initialize: function() {
            if( this.firstCordX > this.secondCordX){
                this.left = this.secondCordX;
                this.width = this.firstCordX - this.secondCordY;
            } else {
                this.left = this.firstCordX;
                this.width = this.secondCordX - this.firstCordX;
            }

            if( this.firstCordY > this.secondCordY){
                this.top = this.secondCordY;
                this.height = this.firstCordY - this.secondCordY;
            } else {
                this.top = this.firstCordY;
                this.height = this.secondCordY - this.firstCordY;
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
            this.el.style.backgroundColor = this.model.attributes.color;
            this.el.style.top = this.model.attributes.top;
            this.el.style.left = this.model.attributes.left;
            this.$el.html("TEST");
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
                frame.style.cursor = 'move';
            }.bind(this);

            var drop = function (e) {
                e.preventDefault();
                var frame = document.getElementById('frame');
                this.changePosition(e.clientY, e.clientX);
                frame.removeEventListener('mouseup', drop);
                frame.removeEventListener('mousemove', drug);
                frame.style.cursor = 'pointer';
            }.bind(this);
            frame.addEventListener('mousemove', drug);
            frame.addEventListener('mouseup', drop);

        },

        changePosition: function (top, left) {
            this.model.attributes.top = top;
            this.model.attributes.left = left;
            this.render();
        },

        deleteRectangle: function (e) {
            e.preventDefault();
            this.remove();
            this.model.destroy();
        }



        
    });
    
    //  App View
    //  -----------------------------------
    
    var AppView = Backbone.View.extend({

        el: $("#editor"),

        events: {
            'dblclick div.frame': 'createRectangle'
        },

        initialize: function () {
        },

        createRectangle: function (e) {
            e.preventDefault();
            console.log(this.model);
            var frame = document.getElementById('frame'),
                cordFirstX = 0,
                cordFirstY =0,
                cordSecondX = 0,
                cordSecondY = 0,
                rectangle =     new Rectangle({firstCordX: cordFirstX, firstCordY: cordFirstY, secondCordX: cordSecondX, secondCordY: cordSecondY }),
                rectangleView = new RectangleView({model:rectangle});

            var mouseDown = function (e) {
                rectangle.firstCordX =  e.clientX;
                rectangle.firstCordY = e.clientY;
                frame.removeEventListener('mousedown', mouseDown);
                frame.addEventListener('mousemove', mouseMove);
                frame.addEventListener('mouseup', mouseUp);
            }.bind(this);

            var mouseMove = function (e) {
                rectangle.secondCordX = e.clientX;
                rectangle.secondCordY = e.clientY;
            }.bind(this);

            var mouseUp = function (e) {
                rectangle.secondCordX = e.clientX;
                rectangle.secondCordY = e.clientY;
                frame.removeEventListener('mousemove', mouseMove);
                frame.removeEventListener('mouseup', mouseUp);
            }.bind(this);

            frame.addEventListener('mousedown', mouseDown);

            frame.appendChild(rectangleView.render().el);
        }

    });

    var app = new AppView;
});

