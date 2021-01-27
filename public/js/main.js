$(document).ready(function() {
    animation.init();
})

var animation = {
    frameCount: 0,
    circleCount: 0,
    containerWidth: null,
    containerHeight: null,
    animate: true,
    createCircle: true,
    removeCircle: true,

    init: function() {
        animation.containerWidth = $('#target').innerWidth();
        animation.containerHeight = $('#target').innerHeight();

        setTimeout(function() {
            requestAnimationFrame(animation.frame);
        }, 500)
    },

    frame: function() {
        if (animation.createCircle) {
            animation.createRandomCircle();
        } else if (animation.removeCircle) {
            animation.removeACircle();
        }

        if (animation.animate) {
            var id = requestAnimationFrame(animation.frame);
        }
    },

    createRandomCircle: function() {
        animation.circleCount++;

        if (animation.circleCount < 2500) {
            var coords = animation.getRandomPosition();

            if (animation.circleCount % 30 === 0) {
                coords.x = 0;
            }

            if (animation.circleCount % 31 === 0) {
                coords.y = 0;
            }

            var circle = $('<circle>').addClass('circle').css({
                top: coords.y,
                left: coords.x
            });

            $('#target').prepend(circle);
        } else {
            console.log('removing');
            setTimeout(function() {
                animation.createCircle = false;
                animation.removeCircle = true
            }, 2000);
        }
    },

    removeACircle: function() {
        if (animation.circleCount > 0) {
            $($('.circle')[animation.circleCount - 1]).remove();
            animation.circleCount--;
        } else {
            setTimeout(function() {
                animation.createCircle = true;
                animation.removeCircle = false;
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

