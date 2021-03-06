$(document).ready(function() {
    animation.init();
})

$(window).scroll(function() {

    if($(window).scrollTop() >= $(window).height() - Number(400)) {
        animation.showSaveConnorButton();
    }
});

var animation = {
    frameCount: 0,
    squareCount: 0,
    containerWidth: null,
    containerHeight: null,
    fallingContainerWidth: null,
    fallingContainerHeight: null,
    animate: true,
    createSquare: true,
    rain: false,
    squareSize: 100,
    currentX: 0,
    currentY: 0,
    killCount: 0,
    rainDrops: [

    ],
    connorDropSpeed: 10,

    init: function() {
        animation.containerWidth = $('#target').innerWidth();
        animation.containerHeight = $('#target').innerHeight();
        animation.fallingContainerWidth = $('#rainTarget').innerWidth();
        animation.fallingContainerHeight = $('#rainTarget').innerHeight();

        setTimeout(function() {
            requestAnimationFrame(animation.frame);
        }, 500)

        $('.square').on('mouseenter', function() {
            animation.flipSquare(event);
        })

        $('.spare-connor').on('click', function() {
            animation.speedConnorUp();
        })
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

        var square = $('<square>').addClass('square').css({
            top: animation.currentY,
            left: animation.currentX
        });

        $('#target').prepend(square);

        if (animation.currentX + animation.squareSize >= animation.containerWidth) {
            animation.currentX = 0;
            animation.currentY += animation.squareSize;

            if (animation.currentY > animation.containerHeight) {
                animation.createSquare = false;
                console.log('filled pane');
                animation.rotateTarget();
            }

        } else {
            animation.currentX += animation.squareSize;
        }

    },

    rotateTarget: function() {
        $('#target').css({
            transition: '.6s',
            transform: 'rotateZ(90deg)'
        });
        animation.rain = true;

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
                left: animation.getRandomNumber(0, animation.fallingContainerWidth),
            }).attr('id', 'drop' + randomId).on('hover', function(event) {

                $(event.target).css('background-color', 'black');
                console.log('dead');

            });

            $('#rainTarget').prepend(rainDrop);

            animation.rainDrops.push('drop' + randomId);
        }

        animation.moveRainDrops();
    },

    moveRainDrops: function() {
        for (var i = 0; i < animation.rainDrops.length; i++) {
            // get the current y position
            var nextYPos = Number($('#' + animation.rainDrops[i]).css('top').slice(0, -2)) + Number(animation.connorDropSpeed);

            $('#' + animation.rainDrops[i]).css({
                top: nextYPos + 'px',
            });
        }
    },

    collectRainWater: function() {
        for (var i = 0; i < animation.rainDrops.length; i++) {

            var nextPos = Number($('#' + animation.rainDrops[i]).css('top').slice(0, -2)) + Number(10);

            if (nextPos > animation.fallingContainerHeight) {
                $('#' + animation.rainDrops[i]).remove();
                animation.killCount++;
                animation.updateKillCount();
                animation.rainDrops.splice(animation.rainDrops.indexOf(animation.rainDrops[i]), 1);
                console.log('killing in the name of')
                console.log($('#rainTarget').children().length)
            }

        }
    },

    flipSquare: function(e) {
        $(e.target).addClass('flip');
    },

    showSaveConnorButton: function() {
        $('.spare-connor-container').css('opacity', .8);
    },

    speedConnorUp: function() {
        $('.spare-connor').addClass('active')
        setTimeout(function() {
            $('.spare-connor').removeClass('active')
        }, 300);
        animation.connorDropSpeed += 10;
    },
    updateKillCount: function() {
        $('#killCount').text(animation.killCount);
    }
}

