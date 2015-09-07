/* jshint devel:true */

$(function () {

    /*
     * 0 – Home Team
     * 1 – Visiting Team
     * 2 – Referee
     * 3 – Home Goalkeeper
     * 4 – Visiting Goalkeeper
     */

    var squad = [{}, {}, {}];

    var initSquad = function () {
        var data = window.Tracker.DataSource.getSquad();

        data.forEach(function (team) {
            team.players.forEach(function (player) {
                var data = $.extend(player, {
                    team: team.team % 3
                });

                squad[team.team][player.jersey] = new window.Tracker.Player(data);
            });
        });
    };

    var handleDataSourceInit = function () {
        initSquad();

        window.Tracker.DataSource.start();
    };

    var handleDataSourceTrack = function (e, track) {
        window.Tracker.Time.update(track.timecode);

        track.players.forEach(function (data) {
            var team   = data.team % 3,
                jersey = data.jersey;

            if (squad[team] && squad[team][jersey]) {
                squad[team][jersey].update(data.pos, track._duration);
            }
        });

        if (track.ball !== null) {
            window.Tracker.Ball.update(track.ball, track._duration);
        }
    };

    $(window.Tracker.DataSource).bind('init', handleDataSourceInit);
    $(window.Tracker.DataSource).bind('track', handleDataSourceTrack);

    window.Tracker.DataSource.init();
});
