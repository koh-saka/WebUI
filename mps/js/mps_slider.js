// file: mps_slider.js

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
    }

    function onSliderMouseDown(e) {
        var $slider = $(e.currentTarget);
        var key = $slider.attr('data-key');

        if (!key || !MpsState.sliders[key]) return;

        e.preventDefault();

        MpsState.drag.active = true;
        MpsState.drag.key = key;

        updateByPointer($slider, e);
        renderHandleState(key);
    }

    function onDocumentMouseMove(e) {
        if (!MpsState.drag.active || !MpsState.drag.key) return;

        var key = MpsState.drag.key;
        var $slider = $('.js-slider[data-key="' + key + '"]:visible');

        if ($slider.length === 0) return;

        updateByPointer($slider, e);
        renderHandleState(key);
    }

    function onDocumentMouseUp() {
        if (!MpsState.drag.active) return;

        var key = MpsState.drag.key;

        MpsState.drag.active = false;
        MpsState.drag.key = null;

        if (key) renderHandleState(key);
    }

    // =========================
    // 縦横判定
    // =========================
    function isVertical($slider) {
        return $slider.hasClass('mps_vertical_slider');
    }

    // =========================
    // 値更新（共通）
    // =========================
    function updateByPointer($slider, e) {
        var key = $slider.attr('data-key');
        var state = MpsState.sliders[key];
        var rect, percent, value;

        if (!state) return;

        rect = $slider[0].getBoundingClientRect();

        if (isVertical($slider)) {
            if (rect.height <= 0) return;

            percent = (e.clientY - rect.top) / rect.height;
            percent = 1 - percent; // 下→上に変換
        } else {
            if (rect.width <= 0) return;

            percent = (e.clientX - rect.left) / rect.width;
        }

        percent = clamp(percent, 0, 1);

        value = state.min + ((state.max - state.min) * percent);
        value = Math.round(value);
        value = clamp(value, state.min, state.max);

        state.value = value;

        renderSlider(key);
    }

    // =========================
    // 初期描画
    // =========================
    function renderAll() {
        $('.js-slider').each(function () {
            var key = $(this).attr('data-key');

            // 未定義はエラー
            if (!MpsState.sliders[key]) {
                console.error('Undefined slider state:', key);
                return;
            }
            renderSlider(key);
        });
    }

    // =========================
    // 描画
    // =========================
    function renderSlider(key) {
        var state = MpsState.sliders[key];
        var $sliders = $('.js-slider[data-key="' + key + '"]');

        if (!state || $sliders.length === 0) {
            return;
        }

        $sliders.each(function () {
            var $slider = $(this);
            var percent = (state.value - state.min) / (state.max - state.min);
            percent = clamp(percent, 0, 1);

            $slider.attr('data-value', state.value);

            if ($slider.hasClass('mps_vertical_slider')) {
                $slider.find('.mps_common_slider_fill').css('height', (percent * 100) + '%');
                $slider.find('.mps_common_slider_handle').css('top', ((1 - percent) * 100) + '%');
            } else {
                $slider.find('.mps_common_slider_fill').css('width', (percent * 100) + '%');
                $slider.find('.mps_common_slider_handle').css('left', (percent * 100) + '%');
            }
        });
    }
    // =========================
    // handle状態
    // =========================
    function renderAllHandleStates() {
        $('.js-slider').each(function () {
            var key = $(this).attr('data-key');
            renderHandleState(key);
        });
    }

    function renderHandleState(key) {
        var $handle = $('.js-slider[data-key="' + key + '"] .mps_common_slider_handle');

        if ($handle.length === 0) return;

        var active = MpsState.drag.active && MpsState.drag.key === key;

        $handle.toggleClass('is-active', active);
    }

    function onHandleMouseEnter(e) {
        $(e.currentTarget).addClass('is-hover');
    }

    function onHandleMouseLeave(e) {
        if (!MpsState.drag.active) {
            $(e.currentTarget).removeClass('is-hover');
        }
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    return {
        init: init
    };

})();