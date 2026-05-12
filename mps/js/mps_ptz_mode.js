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
        var $container = $('.mps_manual_control_container');

        MpsState.ptz.mode = mode;

        $container
            .removeClass('mps_mode_manual mps_mode_frame_adjust')
            .addClass(
                mode === MODE_FRAME_ADJUST
                    ? 'mps_mode_frame_adjust'
                    : 'mps_mode_manual'
            );

        $('.mps_manual_tab').removeClass('mps_is_active');

        $('.mps_manual_tab[data-ptz-mode="' + mode + '"]')
            .addClass('mps_is_active');

        syncZoomAutoAvailability();
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

        $zoomAuto.toggleClass(
            'mps_is_disabled',
            !isFrameAdjust
        );

        if (!isFrameAdjust) {
            $zoomAuto.removeClass(
                'mps_is_active is-hover is-active'
            );
        }
    }

    function isValidMode(mode) {
        return mode === MODE_MANUAL ||
               mode === MODE_FRAME_ADJUST;
    }

    return {
        init: init,
        applyMode: applyMode,
        syncAvailability: syncAvailability
    };

})();
