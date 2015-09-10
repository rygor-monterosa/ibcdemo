/* jshint devel:true */
/* global LViS */

$(function () {

    // URL parameters
    var params = {};

    // Current LViS Event
    var event = null;

    /*
     * 0 – Home Team
     * 1 – Visiting Team
     * 2 – Referee
     * 3 – Home Goalkeeper
     * 4 – Visiting Goalkeeper
     */

    var squad = [{}, {}, {}];

    /*
     * Grab config parameters from URL
     */
    location.search.substr(1).split("&").forEach(function(item) {
        var chunk = item.split("="), 
            key   = chunk[0], 
            value = chunk[1] && decodeURIComponent(chunk[1]);

        params[key] = value;
    });

    var initSquad = function (data) {
        jQuery('.players').empty();

        data.forEach(function (team) {
            team.players.forEach(function (player) {
                var playerData = $.extend(player, {
                    team: team.team % 3
                });

                squad[team.team][player.jersey] = new window.Tracker.Player(playerData);
            });
        });
    };

    var handleEventStart = function (e, event) {
        console.log('handleEventStart');

        initSquad(event.getSquad());

        event.bind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventStop = function () {
        console.log('handleEventStop');

        event.unbind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventTrack = function (track) {
        window.Tracker.Time.update(track.timecode);

        track.players.forEach(function (data) {
            var team   = data.team % 3,
                jersey = data.jersey;

            if (squad[team] && squad[team][jersey]) {
                squad[team][jersey].update(data.pos, track.duration);
            }
        });

        if (track.ball !== null) {
            window.Tracker.Ball.update(track.ball, track.duration);
        }
    };

    if (typeof params.bc === "undefined") {
        return console.warn("Can't initialise LViS API: bootstrap channel is not set");
    }

    if (typeof params.sh === "undefined") {
        return console.warn("Can't initialise LViS API: static host is not set");
    }

    $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_START, handleEventStart);
    $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_STOP, handleEventStop);

    window.Tracker.LViS.init(params.bc, params.sh);
});
