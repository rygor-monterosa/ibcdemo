window.Tracker = window.Tracker || {};

window.Tracker.DataSource = (function (config) {
    var STATE_STOPPED = 0,
        STATE_RUNNING = 1;

    var self    = {},
        idx     = 0,
        data    = {},
        delta   = 1,
        url     = '/assets/data/tracking.json',
        state   = STATE_STOPPED,
        timeout = null;
        // url   = '/assets/data/tracking-full-3m.json';

    var process = function () {
        var track    = data.tracking[idx],
            duration = track.timecode - (idx > 0 ? data.tracking[idx - 1].timecode : 0);

        track._duration = duration;

        $(self).triggerHandler('track', track);

        timeout = setTimeout(process, duration);

        idx += delta;
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