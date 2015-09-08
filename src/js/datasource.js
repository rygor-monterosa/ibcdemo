window.Tracker = window.Tracker || {};

window.Tracker.DataSource = (function () {
    var STATE_STOPPED = 0,
        STATE_RUNNING = 1;

    var self    = {},
        idx     = 0,
        data    = {},
        delta   = 1,
        time    = 0,
        url     = '//s3-eu-west-1.amazonaws.com/ibcstats/tracking.json',
        // url     = '//s3-eu-west-1.amazonaws.com/ibcstats/tracking-full-3m.json',
        state   = STATE_STOPPED,
        timeout = null;

    var process = function () {
        var track    = $.extend({}, data.tracking[idx]),
            duration = track.timecode - time;

        track.duration = duration;

        if (idx >= data.tracking.length - 1) {
            return self.stop();
        }

        timeout = setTimeout(process, duration);

        time = track.timecode;

        idx += delta;

        $(self).triggerHandler('track', track);
    };

    self.setData = function (tracking) {
        data = tracking;
    };

    self.getSquad = function () {
        return data.squad;
    };

    self.start = function () {
        if (state === STATE_RUNNING) {
            return;
        }

        process();
        state = STATE_RUNNING;
    };

    self.stop = function () {
        if (state === STATE_STOPPED) {
            return;
        }

        clearTimeout(timeout);
        state = STATE_STOPPED;
    };

    self.seek = function (position) {
        idx = Math.floor(position * data.tracking.length);
    };

    self.init = function () {
        $.getJSON(url)
            .done(function (data) {

                // hardcode referees
                data.squad[2] = {
                    players: [
                        {jersey: 90, fn: "", ln: ""},
                        {jersey: 92, fn: "", ln: ""}
                    ],
                    team: 2
                };

                self.setData(data);

                $(self).triggerHandler('init');
            });
    };

    return self;
})();