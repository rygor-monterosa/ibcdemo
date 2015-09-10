window.Tracker = window.Tracker || {};

window.Tracker.Controls = {

    ON_FORWARD: 'forward',

    ON_BACKWARD: 'backward',

    hide: function () {
        this.element.addClass('hidden');
    },

    show: function () {
        this.element.removeClass('hidden');
    },

    handleForwardClick: function () {
        $(this).triggerHandler(this.ON_FORWARD);
    },

    handleBackwardClick: function () {
        $(this).triggerHandler(this.ON_BACKWARD);
    },

    init: function () {
        this.element = $('.controls');
        this.backward = this.element.find('a:first-child');
        this.forward = this.element.find('a:last-child');

        this.forward.bind('click', this.handleForwardClick.bind(this));
        this.backward.bind('click', this.handleBackwardClick.bind(this));
    }

};