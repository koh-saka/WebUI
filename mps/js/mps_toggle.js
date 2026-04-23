var MpsToggle = (function () {
    function init() {
        bindEvents();
        renderAll();
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

    return {
        init: init
    };
})();