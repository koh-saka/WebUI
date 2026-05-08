// file: js/mps_circle_button.js

var MpsCircleButton = (function () {
    var SELECTOR = '.mps_common_circle_button';
    var CLASS_HOVER = 'is-hover';
    var CLASS_ACTIVE = 'is-active';
    var CLASS_DISABLED = 'mps_is_disabled';

    function init() {
        bindEvents();
    }

    function bindEvents() {
        $(document)
            .on('mouseenter', SELECTOR, onMouseEnter)
            .on('mouseleave', SELECTOR, onMouseLeave)
            .on('mousedown', SELECTOR, onMouseDown)
            .on('mouseup', onDocumentMouseUp);

        $(window)
            .on('blur', onWindowBlur);
    }

    function isDisabled($button) {
        return $button.hasClass(CLASS_DISABLED);
    }

    function onMouseEnter() {
        var $button = $(this);

        if (isDisabled($button)) {
            clearState($button);
            return;
        }

        $button.addClass(CLASS_HOVER);
    }

    function onMouseLeave() {
        clearState($(this));
    }

    function onMouseDown(e) {
        var $button = $(this);

        if (isDisabled($button)) {
            e.preventDefault();
            e.stopPropagation();
            clearState($button);
            return;
        }

        $button.addClass(CLASS_ACTIVE);
    }

    function onDocumentMouseUp() {
        clearActive();
    }

    function onWindowBlur() {
        clearActive();
    }

    function clearState($button) {
        $button.removeClass(CLASS_HOVER + ' ' + CLASS_ACTIVE);
    }

    function clearActive() {
        $(SELECTOR).removeClass(CLASS_ACTIVE);
    }

    return {
        init: init
    };
})();
