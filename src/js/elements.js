/* jshint devel:true */
/* global LViS */

window.Tracker = window.Tracker || {};

window.Tracker.Elements = {

    container: null,

    handleEventStart: function (e, event) {
        var history = event.getHistory();

        if (history.length > 0) {
            this.handleElementCreate(history[history.length - 1]);
        }

        event.bind(LViS.Event.ON_ELEMENT_CREATE, this.handleElementCreate);
    },

    handleEventStop: function (e, event) {
        event.unbind(LViS.Event.ON_ELEMENT_CREATE, this.handleElementCreate);
    },

    handleElementCreate: function (element) {
        var Klass;

        switch (element.getContentType()) {
            case 'media':
                Klass = window.Tracker.Media;
            break;
            case 'quiz':
                Klass = window.Tracker.Quiz;
            break;
            default:
                return;
        }

        this.container.empty();

        new Klass({
            element: element,
            container: this.container
        });
    },

    init: function () {
        this.handleElementCreate = this.handleElementCreate.bind(this);

        this.container = $('<div class="elements" />').appendTo(document.body);

        $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_START, this.handleEventStart.bind(this));
        $(window.Tracker.LViS).on(window.Tracker.LViS.ON_EVENT_STOP, this.handleEventStop.bind(this));
    }
};