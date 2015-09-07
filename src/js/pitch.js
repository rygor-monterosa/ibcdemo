window.Tracker = window.Tracker || {};

window.Tracker.Pitch = {

    element: $('.pitch'),

    // size in meters,
    meters: [105, 68],

    // size in pixels
    pixels: (function () {
        var container = $('.field');

        return [container.width(), container.height()];
    }()),

    depth: 7,

    toCSSCoordinates: function (coordinates) {
        var newCoordinates = [];

        newCoordinates[0] = this.pixels[0] * coordinates[0] / this.meters[0];
        newCoordinates[1] = this.pixels[1] * coordinates[1] / this.meters[1];
        newCoordinates[2] = 1 + (typeof coordinates[2] !== 'undefined' ? coordinates[2] / this.depth : 0);

        return newCoordinates;
    }
};