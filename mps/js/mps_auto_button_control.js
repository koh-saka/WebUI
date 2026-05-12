// file: js/mps_auto_button_control.js

var MpsAutoButtonControl = (function () {
    var SELECTOR_AUTO_BUTTON = '.js-auto-button';

    var CLASS_ACTIVE_STATE = 'mps_is_active';
    var CLASS_DISABLED = 'mps_is_disabled';
    var CLASS_HOVER = 'is-hover';
    var CLASS_PRESSED = 'is-active';

    var callbacks = {};

    function init() {
        bindEvents();
        initializeDefaultStates();
        renderAll();
    }

    function bindEvents() {
        $(document)
            .on('mouseenter', SELECTOR_AUTO_BUTTON, onMouseEnter)
            .on('mouseleave', SELECTOR_AUTO_BUTTON, onMouseLeave)
            .on('mousedown', SELECTOR_AUTO_BUTTON, onMouseDown)
            .on('click', SELECTOR_AUTO_BUTTON, onClick)
            .on('mouseup', onDocumentMouseUp);

        $(window).on('blur', clearPressedAll);
    }

    function initializeDefaultStates() {
        // 暫定仕様: 全Auto初期値OFF
        $(SELECTOR_AUTO_BUTTON).removeClass(CLASS_ACTIVE_STATE);
    }

    function onMouseEnter() {
        var $button = $(this);

        if (isDisabled($button)) {
            clearVisualState($button);
            return;
        }

        $button.addClass(CLASS_HOVER);
    }

    function onMouseLeave() {
        clearVisualState($(this));
    }

    function onMouseDown(e) {
        var $button = $(this);

        if (isDisabled($button)) {
            e.preventDefault();
            e.stopPropagation();
            clearVisualState($button);
            return;
        }

        $button.addClass(CLASS_PRESSED);
    }

    function onClick(e) {
        var $button = $(this);

        if (isDisabled($button)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        var target = $button.data('auto-target');
        var scope = $button.data('auto-scope');

        $button.toggleClass(CLASS_ACTIVE_STATE);

        var active = $button.hasClass(CLASS_ACTIVE_STATE);
        saveAutoButtonState(target, scope, active);

        clearPressedAll();
        renderByTarget(target, scope);
        notifyChanged(target, scope, active, $button);
    }

    function onDocumentMouseUp() {
        clearPressedAll();
    }

    function renderAll() {
        $(SELECTOR_AUTO_BUTTON).each(function () {
            var $button = $(this);

            renderByTarget(
                $button.data('auto-target'),
                $button.data('auto-scope')
            );
        });
    }

    function renderByTarget(target, scope) {
        if (target === 'zoom') {
            return;
        }

        renderControlledParts(target, scope, isActive(target, scope));
    }

    function renderControlledParts(target, scope, shouldDisable) {
        $('[data-auto-controlled-target="' + target + '"]' +
          '[data-auto-scope="' + scope + '"]')
            .toggleClass(CLASS_DISABLED, shouldDisable);
    }

    function isActive(target, scope) {
        return $(SELECTOR_AUTO_BUTTON +
            '[data-auto-target="' + target + '"]' +
            '[data-auto-scope="' + scope + '"]'
        ).hasClass(CLASS_ACTIVE_STATE);
    }

    function saveAutoButtonState(target, scope, active) {
        if (!MpsState.autoButtons) {
            MpsState.autoButtons = {};
        }

        if (!MpsState.autoButtons[target]) {
            MpsState.autoButtons[target] = {};
        }

        MpsState.autoButtons[target][scope] = !!active;
    }

    function isDisabled($button) {
        return $button.hasClass(CLASS_DISABLED);
    }

    function clearVisualState($button) {
        $button.removeClass(CLASS_HOVER + ' ' + CLASS_PRESSED);
    }

    function clearPressedAll() {
        $(SELECTOR_AUTO_BUTTON).removeClass(CLASS_PRESSED);
    }

    function notifyChanged(target, scope, isAuto, $button) {
        var key = buildKey(target, scope);

        if (typeof callbacks[key] !== 'function') {
            return;
        }

        callbacks[key]({
            target: target,
            scope: scope,
            isAuto: isAuto,
            $button: $button
        });
    }

    function onChange(target, scope, callback) {
        callbacks[buildKey(target, scope)] = callback;
    }

    function setAutoState(target, scope, isAuto) {
        var $button = $(SELECTOR_AUTO_BUTTON +
            '[data-auto-target="' + target + '"]' +
            '[data-auto-scope="' + scope + '"]'
        );

        $button.toggleClass(CLASS_ACTIVE_STATE, !!isAuto);
        saveAutoButtonState(target, scope, !!isAuto);

        renderByTarget(target, scope);
    }

    function buildKey(target, scope) {
        return target + ':' + scope;
    }

    return {
        init: init,
        renderAll: renderAll,
        setAutoState: setAutoState,
        onChange: onChange
    };
})();
