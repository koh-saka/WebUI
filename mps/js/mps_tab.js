var MpsTab = (function () {

    function init() {
        bindEvents();
        render();
    }

    function bindEvents() {
        $(document).on('click', '.js-tab', onTrackAdjustTabClick);
        $(document).on('click', '.js-assist-tab', onAssistTabClick);
    }

    function onTrackAdjustTabClick(e) {
        var key = $(e.currentTarget).attr('data-key');

        if (!key) {
            return;
        }

        MpsState.tabs.trackAdjust = key;
        render();
    }

    function onAssistTabClick(e) {
        var key = $(e.currentTarget).attr('data-key');

        if (!key) {
            return;
        }

        MpsState.tabs.assist = key;
        render();
    }

    function render() {
        renderTrackAdjustTabs();
        renderAssistTabs();
    }

    function renderTrackAdjustTabs() {
        var activeKey = MpsState.tabs.trackAdjust || 'autoFraming';

        $('.js-tab').each(function () {
            var key = $(this).attr('data-key');
            $(this).toggleClass('mps_is_active', key === activeKey);
        });

        $('.js-tab-content').each(function () {
            var key = $(this).attr('data-key');
            $(this).toggleClass('mps_is_hidden', key !== activeKey);
        });
    }

    function renderAssistTabs() {
        var activeKey = MpsState.tabs.assist || 'trackingControl';

        $('.js-assist-tab').each(function () {
            var key = $(this).attr('data-key');
            $(this).toggleClass('mps_is_active', key === activeKey);
        });

        $('.js-assist-content').each(function () {
            var key = $(this).attr('data-key');
            $(this).toggleClass('mps_is_hidden', key !== activeKey);
        });
    }

    return {
        init: init
    };

})();