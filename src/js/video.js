/* jshint devel:true */
/* global LViS */

window.Tracker = window.Tracker || {};

window.Tracker.Video = function (config) {
    config = config || {};

    var self    = this,
        formats = ['mp4', 'webm'],
        path    = config.path || '//s3-eu-west-1.amazonaws.com/ibcstats/video',
        video   = '10098218A',
        poster  = 'poster.jpg',
        offset  = 10,
        started = false;
    
    var url = function (file) {
        return [path, file].join('/');
    };

    var container = 
        $('<div class="video"></div>')
            .appendTo(document.body);

    var element = $('<video></video>')
        .attr({ 
            poster: url(poster),
            autoplay: false
        })
        .prop({
            volume: 0
        })
        .appendTo(container);

    formats.forEach(function (format) {
        jQuery('<source>')
            .attr({
                src: url([video, format].join('.')),
                type: ['video', format].join('/')
            })
            .appendTo(element);
    });

    var handleEventStart = function (e, event) {
        event.bind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventStop = function (e, event) {
        self.play();
        started = false;

        event.unbind(LViS.Event.ON_TRACK, handleEventTrack);
    };

    var handleEventTrack = function (track) {
        // console.log('handleEventTrack', track);

        if (!started) {
            self.seek(track.timecode / 1000);
            self.play();

            started = true;
        }
    };

    var handleVideoClick = function () {
        container.toggleClass('opened');
    };

    this.play = function () {
        element[0].play();
    };

    this.pause = function () {
        element[0].pause();
    };

    this.seek = function (time) {
        // console.log();
        element[0].currentTime = offset + time;
    };

    element.bind('click', handleVideoClick);

    $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_START, handleEventStart);
    $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_STOP, handleEventStop);
};