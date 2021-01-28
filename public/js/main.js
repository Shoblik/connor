$(document).ready(function() {
    animation.init();
})

$(window).on('scroll',function() {
    animation.rain = true;
    $(window).off();
});

var animation = {
    frameCount: 0,
    squareCount: 0,
    containerWidth: null,
    containerHeight: null,
    animate: true,
    createSquare: true,
    rain: false,
    rainDrops: [

    ],

    init: function() {
        animation.containerWidth = $('#target').innerWidth();
        animation.containerHeight = $('#target').innerHeight();

        setTimeout(function() {
            requestAnimationFrame(animation.frame);
        }, 500)
    },

    frame: function() {
        animation.frameCount++;

        if (animation.createSquare) {
            animation.createRandomSquare();
        }

        if (animation.rain) {
            animation.createRainDrop();
        }

        if (animation.animate) {
            requestAnimationFrame(animation.frame);
        }
    },

    createRandomSquare: function() {
            animation.squareCount++;

        if (animation.squareCount < 1500) {
            var coords = animation.getRandomPosition();

            if (animation.squareCount % 30 === 0) coords.x = 0;

            if (animation.squareCount % 31 === 0) coords.y = 0;

            var square = $('<square>').addClass('square').css({
                top: coords.y,
                left: coords.x
            });

            $('#target').prepend(square);

        } else {
            console.log('Done with squares');
            animation.createSquare = false;
        }
    },

    getRandomPosition: function() {
        return {
            x: animation.getRandomNumber(0, animation.containerWidth),
            y: animation.getRandomNumber(0, animation.containerHeight)
        };
    },

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1));
    },

    createRainDrop: function() {
        if (animation.frameCount % 10 === 0) {
            animation.collectRainWater();

            var randomId = animation.getRandomNumber(10000, 99999);

            var rainDrop = $('<div>').addClass('square').css({
                top: '-100px',
                left: animation.getRandomNumber(0, animation.containerWidth),
            }).attr('id', 'drop' + randomId);

            $('#rainTarget').prepend(rainDrop);

            animation.rainDrops.push('drop' + randomId);
        }

        animation.moveRainDrops();
    },

    moveRainDrops: function() {
        for (var i = 0; i < animation.rainDrops.length; i++) {
            // get the current y position
            var nextYPos = Number($('#' + animation.rainDrops[i]).css('top').slice(0, -2)) + Number(15);

            $('#' + animation.rainDrops[i]).css({
                top: nextYPos + 'px',
            })
        }
    },

    collectRainWater: function() {
        for (var i = 0; i < animation.rainDrops.length; i++) {

            var nextPos = Number($('#' + animation.rainDrops[i]).css('top').slice(0, -2)) + Number(15);

            if (nextPos > animation.containerHeight) {
                $('#' + animation.rainDrops[i]).remove();
                animation.rainDrops.splice(animation.rainDrops.indexOf(animation.rainDrops[i]), 1);
                console.log('killing in the name of')
                console.log($('#rainTarget').children().length)
            }

        }
    }
}

