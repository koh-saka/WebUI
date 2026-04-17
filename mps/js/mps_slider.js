var MpsSlider = (function () {
    function init() {
        bindEvents();
        renderAll();
        renderAllHandleStates();
    }

    function bindEvents() {
        $(document).on('mousedown', '.js-slider', onSliderMouseDown);
        $(document).on('mousemove', onDocumentMouseMove);
        $(document).on('mouseup', onDocumentMouseUp);
        $(document).on('mouseleave', onDocumentMouseUp);

        $(document).on('mouseenter', '.js-slider .mps_common_slider_handle', onHandleMouseEnter);
        $(document).on('mouseleave', '.js-slider .mps_common_slider_handle', onHandleMouseLeave);
        $(document).on('mousedown', '.js-slider .mps_common_slider_handle', onHandleMouseDown);
    }

    function onSliderMouseDown(e) {
        var $slider = $(e.currentTarget);
        var key = $slider.attr('data-key');

        if (!key || !MpsState.sliders[key]) {
            return;
        }

        e.preventDefault();

        MpsState.drag.active = true;
        MpsState.drag.key = key;

        updateByPointer($slider, e.clientX);
        renderHandleState(key);
    }

    function onDocumentMouseMove(e) {
        var key;
        var $slider;

        if (!MpsState.drag.active || !MpsState.drag.key) {
            return;
        }

        key = MpsState.drag.key;
        $slider = $('.js-slider[data-key="' + key + '"]');

        if ($slider.length === 0) {
            return;
        }

        updateByPointer($slider, e.clientX);
        renderHandleState(key);
    }

    function onDocumentMouseUp() {
        var key;

        if (!MpsState.drag.active) {
            return;
        }

        key = MpsState.drag.key;

        MpsState.drag.active = false;
        MpsState.drag.key = null;

        if (key) {
            renderHandleState(key);
        }
    }

    function onHandleMouseEnter(e) {
        var key = getSliderKeyFromHandle(e.currentTarget);
        var handleState = ensureHandleState(key);

        if (!key) {
            return;
        }

        handleState.hover = true;
        renderHandleState(key);
    }

    function onHandleMouseLeave(e) {
        var key = getSliderKeyFromHandle(e.currentTarget);
        var handleState = ensureHandleState(key);

        if (!key || MpsState.drag.active) {
            return;
        }

        handleState.hover = false;
        renderHandleState(key);
    }

    function onHandleMouseDown(e) {
        var key = getSliderKeyFromHandle(e.currentTarget);
        var handleState = ensureHandleState(key);

        if (!key) {
            return;
        }

        handleState.hover = true;
        renderHandleState(key);
    }

    function updateByPointer($slider, clientX) {
        var key = $slider.attr('data-key');
        var state = MpsState.sliders[key];
        var rect;
        var percent;
        var value;

        if (!state) {
            return;
        }

        rect = $slider[0].getBoundingClientRect();

        if (rect.width <= 0) {
            return;
        }

        percent = (clientX - rect.left) / rect.width;
        percent = clamp(percent, 0, 1);

        value = state.min + ((state.max - state.min) * percent);
        value = Math.round(value);
        value = clamp(value, state.min, state.max);

        state.value = value;

        renderSlider(key);
    }

    function renderAll() {
        $('.js-slider').each(function () {
            var key = $(this).attr('data-key');
            renderSlider(key);
        });
    }

    function renderSlider(key) {
        var state = MpsState.sliders[key];
        var $slider = $('.js-slider[data-key="' + key + '"]');
        var percent;

        if (!state || $slider.length === 0) {
            return;
        }

        percent = (state.value - state.min) / (state.max - state.min);
        percent = clamp(percent, 0, 1);

        $slider.attr('data-value', state.value);
        $slider.find('.mps_common_slider_fill').css('width', (percent * 100) + '%');
        $slider.find('.mps_common_slider_handle').css('left', (percent * 100) + '%');

        console.log('[' + key + ']', state.value);
    }

    function renderAllHandleStates() {
        $('.js-slider').each(function () {
            var key = $(this).attr('data-key');
            renderHandleState(key);
        });
    }

    function renderHandleState(key) {
        var handleState = ensureHandleState(key);
        var $handle = $('.js-slider[data-key="' + key + '"] .mps_common_slider_handle');

        if (!key || $handle.length === 0) {
            return;
        }

        $handle.toggleClass('is-hover', handleState.hover && !(MpsState.drag.active && MpsState.drag.key === key));
        $handle.toggleClass('is-active', MpsState.drag.active && MpsState.drag.key === key);
    }

    function getSliderKeyFromHandle(handleEl) {
        return $(handleEl).closest('.js-slider').attr('data-key');
    }

    function ensureHandleState(key) {
        if (!MpsState.handle[key]) {
            MpsState.handle[key] = {
                hover: false
            };
        }

        return MpsState.handle[key];
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    return {
        init: init
    };
})();