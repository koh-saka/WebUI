var MpsToggle = (function () {
    function init() {
        bindEvents();
        renderAll();
        syncAllToggleRelatedControls();
    }

    function bindEvents() {
        $(document).on('click', '.js-toggle', onToggleClick);
    }

    function onToggleClick(e) {
        var key = $(e.currentTarget).attr('data-key');

        if (!key || typeof MpsState.toggles[key] === 'undefined') {
            return;
        }

        MpsState.toggles[key] = !MpsState.toggles[key];
        render(key);

        syncToggleRelatedControls(key);
    }

    function renderAll() {
        $('.js-toggle').each(function () {
            var key = $(this).attr('data-key');
            render(key);
        });
    }

    function render(key) {
        var $toggle = $('.js-toggle[data-key="' + key + '"]');
        var isActive;

        if ($toggle.length === 0) {
            return;
        }

        isActive = !!MpsState.toggles[key];
        $toggle.toggleClass('mps_is_active', isActive);
    }

    function syncToggleRelatedControls(key) {
        if (key === 'autoFramingEnable') {
            syncTrackingControlSliders();
            syncFrameAdjustTab();

            if (window.MpsPtzMode) {
                MpsPtzMode.syncAvailability();
            }
        }
    }

    function syncAllToggleRelatedControls() {
        syncTrackingControlSliders();
    }

    function syncTrackingControlSliders() {
        var disabled = !MpsState.toggles.autoFramingEnable;

        MpsSlider.setSliderDisabled('panTiltSpeed', disabled);
        MpsSlider.setSliderDisabled('autoZoomSpeed', disabled);
        MpsSlider.setSliderDisabled('sensitivity', disabled);
    }

    function syncFrameAdjustTab() {
        var disabled = !MpsState.toggles.autoFramingEnable;

        $('.mps_manual_tab')
            .filter(function () {
                return $(this).text().trim() === 'Frame Adjust';
            })
            .toggleClass('mps_is_disabled', disabled);

        if (disabled) {
            // OFF時は Manual に戻す
            $('.mps_manual_tab').removeClass('mps_is_active');
            $('.mps_manual_tab').first().addClass('mps_is_active');

            // 将来 Frame Adjust content を作ったらここで非表示化
        }
    }    

    return {
        init: init
    };
})();
