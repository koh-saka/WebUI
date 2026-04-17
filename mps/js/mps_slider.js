var MpsSlider = (function () {
    function init() {
        bindEvents();
        render();
    }

    function bindEvents() {
        $(document).on('mousedown', '.js-slider[data-key="panTiltSpeed"]', onMouseDown);
        $(document).on('mousemove', onMouseMove);
        $(document).on('mouseup', onMouseUp);
        $(document).on('mouseleave', onMouseUp);
    }

    function onMouseDown(e) {
        var $slider = $(e.currentTarget);
        var key = $slider.attr('data-key');

        if (!key || !MpsState.sliders[key]) {
            return;
        }

        e.preventDefault();

        MpsState.drag.active = true;
        MpsState.drag.key = key;

        updateByPointer($slider, e.clientX);
    }

    function onMouseMove(e) {
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
    }

    function onMouseUp() {
        MpsState.drag.active = false;
        MpsState.drag.key = null;
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

        render();
    }

    function render() {
        var key = 'panTiltSpeed';
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

        console.log('[panTiltSpeed]', state.value);
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    return {
        init: init
    };
})();