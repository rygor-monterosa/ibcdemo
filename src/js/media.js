window.Tracker = window.Tracker || {};

window.Tracker.Media = function (config) {

    config = config || {};

    var element   = config.element || null;
    var container = config.container || null;

    if (element === null || container === null) {
        return;
    }

    var text  = element.getCustomFields('text'),
        image = element.getCustomFields('image');

    var html = $('<div class="media"></div>').appendTo(container);

    if (text) {
        $('<h3>').text(text).appendTo(html);
    }

    if (image) {
        $('<img>').attr({'src': image}).appendTo(html);
    }
};
