// file: js/mps_ptz_mode.js

var MpsPtzMode = (function () {

    var MODE_MANUAL = 'manual';
    var MODE_FRAME_ADJUST = 'frameAdjust';

    function init() {
        bindEvents();

        applyMode(MpsState.ptz.mode);
        syncAvailability();
    }

    function bindEvents() {
        $(document).on('click', '.mps_manual_tab', onTabClick);
    }

    function onTabClick(e) {
        var $tab = $(e.currentTarget);

        if ($tab.hasClass('mps_is_disabled')) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        var mode = $tab.data('ptz-mode');

        if (!isValidMode(mode)) {
            return;
        }

        applyMode(mode);
    }

    function applyMode(mode) {
        if (!isValidMode(mode)) {
            return;
        }

        var $container = $('.mps_manual_control_container');
        var $targetTab = $('.mps_manual_tab[data-ptz-mode="' + mode + '"]');

        if ($targetTab.length === 0) {
            console.warn('PTZ mode tab not found:', mode);
            return;
        }

        MpsState.ptz.mode = mode;

        $container
            .removeClass('mps_mode_manual mps_mode_frame_adjust')
            .addClass(
                mode === MODE_FRAME_ADJUST
                    ? 'mps_mode_frame_adjust'
                    : 'mps_mode_manual'
            );

        $('.mps_manual_tab').removeClass('mps_is_active');
        $targetTab.addClass('mps_is_active');

        syncZoomAutoAvailability();
        syncPtzSubButtons(mode);

        if (window.MpsPtzManual) {
            MpsPtzManual.resetAllButtons();
            MpsPtzManual.applyUiMode();
            MpsPtzManual.renderLockState();
        }
    }

    function syncAvailability() {
        var enabled = !!MpsState.toggles.autoFramingEnable;

        $('.mps_manual_tab[data-ptz-mode="frameAdjust"]')
            .toggleClass('mps_is_disabled', !enabled);

        if (!enabled) {
            applyMode(MODE_MANUAL);
            return;
        }

        syncZoomAutoAvailability();
    }

    function syncZoomAutoAvailability() {
        var isFrameAdjust =
            MpsState.ptz.mode === MODE_FRAME_ADJUST;

        var $zoomAuto = $('.js-auto-button')
            .filter('[data-auto-target="zoom"]')
            .filter('[data-auto-scope="normal"]');

        var zoomAutoState = getZoomAutoState();

        $zoomAuto.toggleClass('mps_is_disabled', !isFrameAdjust);

        if (isFrameAdjust) {
            $zoomAuto.toggleClass('mps_is_active', zoomAutoState);
            return;
        }

        // Manual中は操作不可・表示OFF
        // ただし前回状態は保持する。
        $zoomAuto.removeClass('mps_is_active is-hover is-active');
    }

    function syncZoomAutoVisual(active) {
        var $zoomAuto = $('.js-auto-button')
            .filter('[data-auto-target="zoom"]')
            .filter('[data-auto-scope="normal"]');

        if ($zoomAuto.hasClass('mps_is_disabled')) {
            return;
        }

        getZoomAutoState();

        $zoomAuto.toggleClass('mps_is_active', active);
        MpsState.autoButtons.zoom.normal = active;
    }

    function syncPtzSubButtons(mode) {
        var isFrameAdjust = mode === MODE_FRAME_ADJUST;

        // Speed: Fast/Slow, Zoom: Tele/Wide
        var $buttons = $(
            '.mps_speed_slider .mps_slider_btn,' +
            '.mps_zoom_slider .mps_slider_btn'
        );

        $buttons.toggleClass(
            'mps_ptz_mode_frame_adjust_button',
            isFrameAdjust
        );

        //syncZoomAutoVisual(isFrameAdjust);
    }

    function isValidMode(mode) {
        return mode === MODE_MANUAL ||
               mode === MODE_FRAME_ADJUST;
    }

    function getZoomAutoState() {
        if (!MpsState.autoButtons) {
            MpsState.autoButtons = {};
        }

        if (!MpsState.autoButtons.zoom) {
            MpsState.autoButtons.zoom = {};
        }

        if (typeof MpsState.autoButtons.zoom.normal !== 'boolean') {
            MpsState.autoButtons.zoom.normal = false;
        }

        return MpsState.autoButtons.zoom.normal;
    }

    return {
        init: init,
        applyMode: applyMode,
        syncAvailability: syncAvailability
    };

})();
