window.Tracker = window.Tracker || {};

window.Tracker.Time = {

    element: $('.time'),

    update: function (timecode) {
        var passed  = Math.floor(timecode / 1000),
            minutes = Math.floor(passed / 60),
            seconds = passed - minutes * 60;

        var str = [minutes, seconds].map(function (item) {
            return (item < 10 ? '0' : '') + item;
        }).join(':');
        
        this.element.text(str);
    }
};