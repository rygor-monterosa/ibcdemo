window.Tracker = window.Tracker || {};

window.Tracker.Player = function (config) {
    var element = jQuery('<div />')
                    .addClass('team-' + (config.team % 3))
                    .addClass('jersey-' + config.jersey)
                    .text(config.jersey)
                    .appendTo('.players');

    var name = jQuery('<span />')
                .text(config.ln)
                .appendTo(element);

    this.setTitle = function (title) {
        name.text(title);
    };

    this.update = function (coordinates, duration) {
        var CSSCoordinates = window.Tracker.Pitch.toCSSCoordinates(coordinates);

        window.requestAnimationFrame(function () {
            element.css({
                'transform': 
                    'translateX(' + CSSCoordinates[0] + 'px) ' + 
                    'translateY(' + CSSCoordinates[1] + 'px) ',
                'transition-duration': duration + 'ms'
            });
        });
    };
};