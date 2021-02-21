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
    noKillCount: false,
    dropOffset: -100,
    heaven: false,
    stepSize: .05,
    connorDropSpeed: 10,
    connorFunnel: 10,
    createRainDrops: true,

    init: function() {
        var target = $('#target');
        var rainTarget = $('#rainTarget');
        animation.containerWidth = target.innerWidth();
        animation.containerHeight = target.innerHeight();
        animation.fallingContainerWidth = rainTarget.innerWidth();
        animation.fallingContainerHeight = rainTarget.innerHeight();

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
            if (animation.createRainDrops) {
                animation.createRainDrop();
            }

            animation.moveRainDrops();

            if (animation.frameCount % 5 === 0) {
                animation.collectRainWater();
            }
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
        if (animation.frameCount % animation.connorFunnel === 0) {
            var randomId = animation.getRandomNumber(10000, 99999);
            var randomRotateDir = animation.getRandomNumber(-1, 1);
            var dirVal = 1;

            if (randomRotateDir) {
                dirVal = -1;
            }

            var rainDrop = $('<div>').addClass('square').css({
                top: animation.dropOffset + 'px',
                left: animation.getRandomNumber(0, animation.fallingContainerWidth - 80),
            }).attr({
                id: 'drop' + randomId,
                step: 1,
                rotateDirVal: 0,
                rotateDir: dirVal
            }).on('hover', function(event) {

                $(event.target).css('background-color', 'black');
                console.log('dead');

            });

            $('#rainTarget').prepend(rainDrop);

            animation.rainDrops.push('drop' + randomId);
        }
    },

    moveRainDrops: function() {
        for (var i = 0; i < animation.rainDrops.length; i++) {
            var rainDrop = $('#' + animation.rainDrops[i]);
            var rotateDirVal = Number(rainDrop.attr('rotateDirVal')) + Number(rainDrop.attr('rotateDir'))
            var step = null;

            if (animation.heaven) {
                step = Number(rainDrop.attr('step')) - animation.stepSize;
            } else {
                step = Number(rainDrop.attr('step')) + animation.stepSize;
            }

            // get the current y position
            var nextYPos = Number(rainDrop.css('top').slice(0, -2)) + Number(step);

            rainDrop.css({
                top: nextYPos + 'px',
                transform: 'rotate('+ rotateDirVal +'deg)'
            });

            rainDrop.attr({
                step: step,
                rotateDirVal: rotateDirVal
            });

        }

    },

    collectRainWater: function() {
        for (var i = 0; i < animation.rainDrops.length; i++) {
            var rainDrop = $('#' + animation.rainDrops[i]);
            var nextPos = Number(rainDrop.css('top').slice(0, -2)) + Number(10);

            if (nextPos > animation.fallingContainerHeight || nextPos < animation.dropOffset) {
                rainDrop.remove();
                animation.killCount++;
                if (!animation.noKillCount) {
                    animation.updateKillCount();
                }
                animation.rainDrops.splice(animation.rainDrops.indexOf(animation.rainDrops[i]), 1);
            }
        }
    },

    flipSquare: function(e) {
        $(e.target).addClass('flip');
    },

    showSaveConnorButton: function() {
        $('.spare-connor-container').css('opacity', .8);
    },

    buttonClick: function(ele) {
        ele.addClass('active')
        setTimeout(function() {
            ele.removeClass('active')
        }, 200);
    },

    speedConnorUp: function() {
        animation.buttonClick($('.spare-connor'));
        animation.stepSize += .1;

        $('#spareBtn').text('Actually Spare Connor?').attr('onclick', 'animation.sendConnorToHeaven()');

    },
    sendConnorToHeaven: function() {
        animation.stepSize = .05;
        animation.heaven = true;
        animation.createRainDrops = false;
        setTimeout(function() {
            animation.noKillCount = true;
        }, 1000)
    },
    updateKillCount: function() {
        $('#killCount').text(animation.killCount);
    }
}

