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


    /*
     * Searches for the nearest active or 
     * upcoming event and initialises it
     */
    var initialiseNearestEvent = function () {
        var current  = LViS.Listings.getCurrent(),
            upcoming = LViS.Listings.getNext();

        if (current !== null) {
            return startEvent(current[0]);
        } else if (upcoming !== null) {
            return startEvent(upcoming[0]);
        } else {
            console.warn("There is neither active or upcoming events");
        }
    };

    /*
     * Initialises chosen event, binds to its events
     */
    var startEvent = function (newEvent) {
        console.log('Starting new event "%s"', newEvent.getName());

        event = newEvent;

        event.bind(LViS.Event.ON_ELEMENT_CREATE, handleElementCreate);
        event.bind(LViS.Event.ON_STATE, handleEventState);
        event.bind(LViS.Event.ON_TRACK, handleEventTrack);

        LViS.setEvent(event, handleEventReady);
    };

    /*
     * Removes event and tears down its events handling
     */
    var stopEvent = function () {
        console.log('Starting event "%s"', event.getName());

        event.unbind(LViS.Event.ON_ELEMENT_CREATE, handleElementCreate);
        event.unbind(LViS.Event.ON_STATE, handleEventState);

        event = null;
    };

    /*
     * Handles new element publish
     */
    var handleElementCreate = function (element) {
        console.log('New element is published', element);
    };


    var handleEventReady = function () {
        console.log('Event is ready');

        var history = event.getHistory();

        if (history.length > 0) {
            console.log('Last published element: ', history[history.length - 1]);
        } else {
            console.log('There is no published elements');
        }
    };

    var handleEventState = function (state) {
        console.log('Event state: ' + state);

        switch (state) {
            // case window.LViS.Event.STATE_UPCOMING: break;
            // case window.LViS.Event.STATE_ACTIVE: break;
            case window.LViS.Event.STATE_FINISHED:
                stopEvent(event);
            break;
        }        
    };

    var handleEventTrack = function (/* track */) {
    };

    var handleListingsUpdate = function () {
        console.log('Listings have been updated');

        if (event === null) {
            initialiseNearestEvent();
        }
    };

    var handleLViSReady = function () {
        console.log('LViS API is ready');

        initialiseNearestEvent();
    };


    if (typeof params.bc === "undefined") {
        return console.warn("Can't initialise LViS API: bootstrap channel is not set");
    }

    if (typeof params.sh === "undefined") {
        return console.warn("Can't initialise LViS API: static host is not set");
    }

    LViS.bind(LViS.ON_READY, handleLViSReady);
    LViS.Listings.bind(LViS.Listings.ON_UPDATE, handleListingsUpdate);

    LViS.init({
        bChannel: params.bc,
        host: params.sh
    });
});
