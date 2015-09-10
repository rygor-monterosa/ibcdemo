/* jshint devel:true */
/* global LViS */

window.Tracker = window.Tracker || {};

window.Tracker.Visual = function () {

    jQuery('<div class="pitch">' +
                '<div class="field">' +
                    '<div class="time">00:00</div>' +
                    '<div class="ball"></div>' +
                    '<div class="players"></div>' +
                '</div>' +
            '</div>')
        .appendTo(jQuery('.wrapper'));

    /*
     * 0 – Home Team
     * 1 – Visiting Team
     * 2 – Referee
     * 3 – Home Goalkeeper
     * 4 – Visiting Goalkeeper
     */

    var squad = [{}, {}, {}];

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
        initSquad(event.getSquad());

        event.bind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventStop = function (e, event) {
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

    window.Tracker.Pitch.init();
    window.Tracker.Ball.init();
    window.Tracker.Time.init();

    $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_START, handleEventStart);
    $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_STOP, handleEventStop);
};