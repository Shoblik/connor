$(document).ready(function() {
    animation.init();
})

var animation = {
    frameCount: 0,
    squareCount: 0,
    containerWidth: null,
    containerHeight: null,
    animate: true,
    createSquare: true,

    init: function() {
        animation.containerWidth = $('#target').innerWidth();
        animation.containerHeight = $('#target').innerHeight();

        setTimeout(function() {
            requestAnimationFrame(animation.frame);
        }, 500)
    },

    frame: function() {
        if (animation.createSquare) {
            animation.createRandomSquare();
        }

        if (animation.animate) {
            var id = requestAnimationFrame(animation.frame);
        }
    },

    createRandomSquare: function() {
        animation.squareCount++;

        if (animation.squareCount < 2500) {
            var coords = animation.getRandomPosition();

            if (animation.squareCount % 30 === 0) {
                coords.x = 0;
            }

            if (animation.squareCount % 31 === 0) {
                coords.y = 0;
            }

            var square = $('<square>').addClass('square').css({
                top: coords.y,
                left: coords.x
            });

            $('#target').prepend(square);
        } else {
            console.log('removing');
            animation.createSquare = false;
        }
    },

    removeASquare: function() {
        if (animation.squareCount > 0) {
            $($('.square')[animation.squareCount - 1]).remove();
            animation.squareCount--;
        } else {
            setTimeout(function() {
                animation.createSquare = true;
                animation.removeSquare = false;
            }, 2000);
        }
    },

    getRandomPosition: function() {
        return {
            x: Math.floor(Math.random() * (animation.containerWidth - 0 + 1)),
            y: Math.floor(Math.random() * (animation.containerHeight - 0 + 1))
        };
    }
}

