// file: js/mps_limitation.js

var MpsLimitation = (function () {
    var SELECTOR_MAIN = '#mps_main';

    var SELECTOR_ROOT = '.mps_limitation_control';
    var SELECTOR_TOGGLE = '.js-limitation-toggle';
    var SELECTOR_TOGGLE_BUTTON = '.mps_limitation_common_btn';
    var SELECTOR_POPUP = '.mps_limitation_control_right_content';
    var SELECTOR_LIMIT_BUTTON = '.js-limitation-button';

    var CLASS_VISIBLE = 'mps_is_visible';
    var CLASS_ACTIVE = 'mps_is_active';
    var CLASS_HOVER = 'is-hover';
    var CLASS_PRESSED = 'is-active';
    var CLASS_ON = 'on';
    var CLASS_MOUSE_HOVER = 'mouse_hover';

    var arrowClassMap = {
        up: 'up',
        right: 'right',
        down: 'down',
        left: 'left'
    };

    var isPopupDragging = false;

    var popupDragState = {
        startClientX: 0,
        startClientY: 0,
        startLeft: 0,
        startTop: 0
    };

    function init() {
        ensureState();
        bindEvents();
        render();
    }

    function ensureState() {
        if (!MpsState.limitation) {
            MpsState.limitation = {};
        }

        if (typeof MpsState.limitation.visible !== 'boolean') {
            MpsState.limitation.visible = false;
        }

        ['up', 'right', 'down', 'left'].forEach(function (direction) {
            if (typeof MpsState.limitation[direction] !== 'boolean') {
                MpsState.limitation[direction] = false;
            }
        });

        if (!MpsState.limitation.popupPosition) {
            MpsState.limitation.popupPosition = null;
        }
    }

    function bindEvents() {
        $(document)
            // Limitation main button
            .on('mouseenter', SELECTOR_TOGGLE, onToggleMouseEnter)
            .on('mouseleave', SELECTOR_TOGGLE, onToggleMouseLeave)
            .on('mousedown', SELECTOR_TOGGLE, onToggleMouseDown)
            .on('click', SELECTOR_TOGGLE, onToggleClick)
            // Limitation popup direction buttons
            .on('mouseenter', SELECTOR_LIMIT_BUTTON, onLimitMouseEnter)
            .on('mouseleave', SELECTOR_LIMIT_BUTTON, onLimitMouseLeave)
            .on('mousedown', SELECTOR_LIMIT_BUTTON, onLimitMouseDown)
            // Limitation popup drag
            .on('mousedown', SELECTOR_POPUP, onPopupMouseDown)
            .on('mousemove', onPopupMouseMove)
            .on('mouseup', onPopupMouseUp);

        $(document).on('mouseup', clearPressedAll);
        $(window).on('blur', clearPressedAll);
    }

    function onToggleMouseEnter() {
        $(this).addClass(CLASS_HOVER);
    }

    function onToggleMouseLeave() {
        if (MpsState.limitation && MpsState.limitation.visible) {
            $(this).removeClass(CLASS_HOVER);
            return;
        }

        $(this).removeClass(CLASS_HOVER + ' ' + CLASS_PRESSED);
    }

    function onToggleMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).addClass(CLASS_PRESSED);
    }

    function onToggleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        var nextVisible = !MpsState.limitation.visible;

        setVisible(nextVisible);

        if (!nextVisible) {
            $(this).removeClass(CLASS_PRESSED);
            $(this).addClass(CLASS_HOVER);
        }
    }

    function onLimitMouseEnter() {
        $(this).addClass(CLASS_MOUSE_HOVER);
    }

    function onLimitMouseLeave() {
        $(this).removeClass(CLASS_MOUSE_HOVER + ' ' + CLASS_PRESSED);
    }

    function onLimitMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        var $button = $(this);
        var direction = $button.data('limit-direction');

        if (!isValidDirection(direction) || $button.hasClass('disable')) {
            return;
        }

        MpsState.limitation[direction] = !MpsState.limitation[direction];

        // CGI未決: 現段階ではUI状態のみ。
        render();
    }

    function getPopupCurrentPosition($popup) {
        var left = parseFloat($popup.css('left'));
        var top = parseFloat($popup.css('top'));

        if (Number.isNaN(left)) {
            left = 0;
        }

        if (Number.isNaN(top)) {
            top = 0;
        }

        return {
            left: left,
            top: top
        };
    }

    function setPopupPosition(left, top) {
        MpsState.limitation.popupPosition = {
            left: left,
            top: top
        };

        $(SELECTOR_POPUP).css({
            left: left + 'px',
            top: top + 'px'
        });
    }

    function clampPopupPosition(left, top) {
        var $main = $(SELECTOR_MAIN);
        var $popup = $(SELECTOR_POPUP);

        if ($main.length === 0 || $popup.length === 0) {
            return {
                left: left,
                top: top
            };
        }

        var mainRect = $main.get(0).getBoundingClientRect();
        var popupRect = $popup.get(0).getBoundingClientRect();

        var popupWidth = popupRect.width;
        var popupHeight = popupRect.height;

        /*
        * popup の left/top は mps_limitation_control 基準なので、
        * mps_main 基準へ一度変換して clamp する。
        */
        var $control = $(SELECTOR_ROOT);
        var controlRect = $control.get(0).getBoundingClientRect();

        var popupMainLeft = controlRect.left + left - mainRect.left;
        var popupMainTop = controlRect.top + top - mainRect.top;

        var minMainLeft = 0;
        var minMainTop = 0;
        var maxMainLeft = mainRect.width - popupWidth;
        var maxMainTop = mainRect.height - popupHeight;

        popupMainLeft = clamp(popupMainLeft, minMainLeft, maxMainLeft);
        popupMainTop = clamp(popupMainTop, minMainTop, maxMainTop);

        return {
            left: popupMainLeft + mainRect.left - controlRect.left,
            top: popupMainTop + mainRect.top - controlRect.top
        };
    }

    function clamp(value, min, max) {
        if (max < min) {
            return min;
        }

        return Math.max(min, Math.min(max, value));
    }    

    function onPopupMouseDown(e) {
        if (!MpsState.limitation.visible) {
            return;
        }

        /*
        * 方向ボタン押下時は、方向ON/OFFを優先する。
        * popup移動は開始しない。
        */
        if ($(e.target).closest(SELECTOR_LIMIT_BUTTON).length > 0) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        var $popup = $(SELECTOR_POPUP);
        var position = getPopupCurrentPosition($popup);

        isPopupDragging = true;

        popupDragState.startClientX = e.clientX;
        popupDragState.startClientY = e.clientY;
        popupDragState.startLeft = position.left;
        popupDragState.startTop = position.top;

        $popup.addClass('is-dragging');
    }

    function onPopupMouseMove(e) {
        if (!isPopupDragging) {
            return;
        }

        e.preventDefault();

        var deltaX = e.clientX - popupDragState.startClientX;
        var deltaY = e.clientY - popupDragState.startClientY;

        var nextLeft = popupDragState.startLeft + deltaX;
        var nextTop = popupDragState.startTop + deltaY;

        var clamped = clampPopupPosition(nextLeft, nextTop);

        setPopupPosition(clamped.left, clamped.top);
    }

    function onPopupMouseUp() {
        endPopupDrag();
    }

    function endPopupDrag() {
        if (!isPopupDragging) {
            return;
        }

        isPopupDragging = false;

        $(SELECTOR_POPUP).removeClass('is-dragging');
    }

    function setVisible(visible) {
        ensureState();
        MpsState.limitation.visible = !!visible;
        render();
    }

    function render() {
        ensureState();

        $(SELECTOR_ROOT).find(SELECTOR_POPUP)
            .toggleClass(CLASS_VISIBLE, MpsState.limitation.visible);

        $(SELECTOR_TOGGLE)
            .toggleClass(CLASS_ACTIVE, MpsState.limitation.visible)
            .toggleClass(CLASS_PRESSED, MpsState.limitation.visible);

        if (MpsState.limitation.visible) {
            applyPopupPosition();
        }

        renderDirection('up');
        renderDirection('right');
        renderDirection('down');
        renderDirection('left');

        clearLimitButtonPressedAll();
    }

    function renderDirection(direction) {
        var active = !!MpsState.limitation[direction];

        $(SELECTOR_LIMIT_BUTTON + '[data-limit-direction="' + direction + '"]')
            .toggleClass(CLASS_ON, active)
            .removeClass(CLASS_MOUSE_HOVER + ' ' + CLASS_PRESSED);

        $('.js-limitation-arrow-' + direction)
            .toggleClass(arrowClassMap[direction], active);
    }

    function clearPressedAll() {
        if (!MpsState.limitation || !MpsState.limitation.visible) {
            $(SELECTOR_TOGGLE).removeClass(CLASS_PRESSED);
        }

        clearLimitButtonPressedAll();
    }

    function clearLimitButtonPressedAll() {
        $(SELECTOR_LIMIT_BUTTON).removeClass(CLASS_PRESSED);
    }

    function isValidDirection(direction) {
        return direction === 'up' ||
               direction === 'right' ||
               direction === 'down' ||
               direction === 'left';
    }

    function applyPopupPosition() {
        var position = MpsState.limitation.popupPosition;

        if (!position) {
            return;
        }

        var clamped = clampPopupPosition(position.left, position.top);

        $(SELECTOR_POPUP).css({
            left: clamped.left + 'px',
            top: clamped.top + 'px'
        });

        MpsState.limitation.popupPosition = {
            left: clamped.left,
            top: clamped.top
        };
    }

    return {
        init: init,
        setVisible: setVisible,
        render: render
    };
})();
