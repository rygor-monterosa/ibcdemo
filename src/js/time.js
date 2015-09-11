window.Tracker = window.Tracker || {};

window.Tracker.Time = {

    element: null,

    offset: 0,

    update: function (timecode) {
        var passed  = Math.floor(this.offset + timecode / 1000),
            minutes = Math.floor(passed / 60),
            seconds = passed - minutes * 60;

        var str = [minutes, seconds].map(function (item) {
            return (item < 10 ? '0' : '') + item;
        }).join(':');
        
        this.element.text(str);
    },

    init: function () {
        this.element = $('.time');
    }
};