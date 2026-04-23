var MpsPanelExpandMode = (function () {
    const SELECTOR = {
        expandBtn: '#mps_root .mps_track_adjust_expand_btn',
        reduceBtn: '#mps_root .mps_track_adjust_reduce_btn',
        expandedTab: '#mps_root .js-mps-expanded-tab',
        expandedContent: '#mps_root .js-mps-expanded-content',
        normalPanel: '#mps_panel_normal',
        expandedPanel: '#mps_panel_expanded',
        normalAutoFramingTab: '#mps_root .js-tab[data-key="autoFraming"]'
    };

    let state = {
        initialized: false,
        mode: 'normal',
        expandedPanel: 'auto-framing'
    };

    function init() {
        if (state.initialized) {
            return;
        }

        bindEvents();
        syncView();
        syncExpandedPanel();

        state.initialized = true;
    }

    function bindEvents() {
        $(document).on('click', SELECTOR.expandBtn, function (e) {
            e.preventDefault();
            openExpanded();
        });

        $(document).on('click', SELECTOR.reduceBtn, function (e) {
            e.preventDefault();
            reduceToNormal();
        });

        $(document).on('click', SELECTOR.expandedTab, function (e) {
            e.preventDefault();

            const panel = $(this).attr('data-panel');
            if (!panel) {
                return;
            }

            state.expandedPanel = panel;
            syncExpandedPanel();
        });
    }

    function openExpanded() {
        state.mode = 'expanded';
        state.expandedPanel = 'auto-framing';
        syncView();
        syncExpandedPanel();
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

    function syncExpandedPanel() {
        $(SELECTOR.expandedTab).each(function () {
            const panel = $(this).attr('data-panel');
            $(this).toggleClass('mps_is_active', panel === state.expandedPanel);
        });

        $(SELECTOR.expandedContent).each(function () {
            const panel = $(this).attr('data-panel');
            $(this).toggleClass('mps_is_hidden', panel !== state.expandedPanel);
        });
    }

    return {
        init: init
    };
})();