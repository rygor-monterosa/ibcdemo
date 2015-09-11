/* jshint devel:true */

$(function () {

    // URL parameters
    var params = {};

    /*
     * Grab config parameters from URL
     */
    location.search.substr(1).split("&").forEach(function(item) {
        var chunk = item.split("="), 
            key   = chunk[0], 
            value = chunk[1] && decodeURIComponent(chunk[1]);

        params[key] = value;
    });

    if (typeof params.bc === "undefined") {
        return console.warn("Can't initialise LViS API: bootstrap channel is not set");
    }

    if (typeof params.sh === "undefined") {
        return console.warn("Can't initialise LViS API: static host is not set");
    }

    var config = {};

    if (typeof params.path !== "undefined") {
        config.path = params.path;
    }

    new window.Tracker.Video(config);
    new window.Tracker.Visual();

    window.Tracker.LViS.init(params.bc, params.sh);
});
