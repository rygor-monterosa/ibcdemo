/* jshint devel:true */
/* global LViS */

$(function () {

    // URL parameters
    var params = {};

    // Current LViS Event
    var event = null;

    /*
     * Grab config parameters from URL
     */
    location.search.substr(1).split("&").forEach(function(item) {
        var chunk = item.split("="), 
            key   = chunk[0], 
            value = chunk[1] && decodeURIComponent(chunk[1]);

        params[key] = value;
    });

    var handleEventStart = function (e, event) {
        event.bind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventStop = function () {
        event.unbind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventTrack = function (/* track */) {
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
