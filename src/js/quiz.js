window.Tracker = window.Tracker || {};

window.Tracker.Quiz = function (config) {

    config = config || {};

    var self      = this,
        element   = config.element || null,
        container = config.container || null;

    if (element === null || container === null) {
        return;
    }

    var html = $('<div class="quiz"></div>').appendTo(container);


    $('<h3 />')
        .text(element.getQuestion().text)
        .appendTo(html);

    var remainingElement = $('<div class="remaining" />').appendTo(html),
        optionsElement   = $('<div class="options" />').appendTo(html);

    var handleButtonClick = function (e) {
        element.vote(e.data.idx);

        self.renderOptions();
    };

    var handleStateChange = function (state) {
        switch (state) {
            case window.LViS.Trivia.STATE_REVEALED:
                self.renderOptions();
            break;
        }
    };

    this.updateRemaining = function () {
        var remaining = new Date(element.getDurationLeft() * 1000),
            minutes   = remaining.getMinutes(),
            seconds   = remaining.getSeconds();

        var text = [minutes, seconds].map(function (item) {
            return item < 10 ? '0' + item : item;
        }).join(':');

        remainingElement.text(text);
    };

    this.renderOptions = function () {
        optionsElement.empty();

        var vote     = element.getUserVote(),
            voted    = element.hasUserVoted(),
            correct  = element.getCorrectOption(),
            revealed = element.getState() === window.LViS.Trivia.STATE_REVEALED;

        element.getOptions().forEach(function (item, idx) {
            var classes = [];

            if (vote === idx) {
                classes.push('selected');

                if (revealed) {
                    classes.push(vote === correct ? 'correct' : 'incorrect');
                }
            }

            $('<button />')
                .html(item.text)
                .addClass(classes.join(' '))
                .prop('disabled', voted || revealed)
                .bind('click', {idx: idx}, handleButtonClick)
                .appendTo(optionsElement);
        });
    };

    setInterval(this.updateRemaining, 1000);

    this.updateRemaining();
    this.renderOptions();

    element.bind(window.LViS.Trivia.ON_STATE_CHANGE, handleStateChange);
};
