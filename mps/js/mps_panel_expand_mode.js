var MpsPanelExpandMode = (function () {
    const SELECTOR = {
        expandBtn: '#mps_root .mps_track_adjust_expand_btn',
        reduceBtn: '#mps_root .mps_track_adjust_reduce_btn',
        normalPanel: '#mps_panel_normal',
        expandedPanel: '#mps_panel_expanded',
        normalAutoFramingTab: '#mps_root .js-tab[data-key="autoFraming"]'
    };

    let state = {
        initialized: false,
        mode: 'normal'
    };

    function init() {
        if (state.initialized) {
            return;
        }

        bindEvents();
        syncView();
        state.initialized = true;
    }

    function bindEvents() {
        $(document).on('click', SELECTOR.expandBtn, function (e) {
            e.preventDefault();
            openExpanded();
        });

        $(document).on('keydown', SELECTOR.expandBtn, function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openExpanded();
            }
        });

        $(document).on('click', SELECTOR.reduceBtn, function (e) {
            e.preventDefault();
            reduceToNormal();
        });
    }

    function openExpanded() {
        state.mode = 'expanded';
        syncView();
    }

    function reduceToNormal() {
        state.mode = 'normal';
        syncView();
        $(SELECTOR.normalAutoFramingTab).trigger('click');
    }

    function syncView() {
        const isExpanded = state.mode === 'expanded';
        $(SELECTOR.normalPanel).toggle(!isExpanded);
        $(SELECTOR.expandedPanel).toggle(isExpanded);
    }

    return {
        init: init
    };
})();