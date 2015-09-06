window.Tracker = window.Tracker || {};

window.Tracker.Ball = {

    element: $('.ball'),

    update: function (coordinates, duration) {
        var CSSCoordinates = window.Tracker.Pitch.toCSSCoordinates(coordinates);

        this.element.css({
            'transform': 
                'translateX(' + CSSCoordinates[0] + 'px) ' + 
                'translateY(' + CSSCoordinates[1] + 'px) ' + 
                'scale(' + CSSCoordinates[2] + ')',
            'transition-duration': duration + 'ms'
        });
    }
};