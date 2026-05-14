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
        syncPtzViewMode();

        state.initialized = true;
    }

    function bindEvents() {
        $(document).on('click', SELECTOR.expandBtn, function (e) {
            e.preventDefault();
            e.stopPropagation();

            openExpanded();
        });

        $(document).on('click', SELECTOR.reduceBtn, function (e) {
            e.preventDefault();
            e.stopPropagation();

            reduceToNormal();
        });

        $(document).on('click', SELECTOR.expandedTab, function (e) {
            e.preventDefault();
            e.stopPropagation();

            const panel = $(this).attr('data-panel');
            if (!panel) {
                return;
            }

            state.expandedPanel = panel;

            syncExpandedPanel();
            syncPtzViewMode();
        });
    }

    function openExpanded() {
        state.mode = 'expanded';

        /*
         * 仕様:
         * どの expand button を押しても expanded 初期表示は Auto Framing。
         * PTZ expanded へは expanded 内 PTZ tab クリックで遷移する。
         */
        state.expandedPanel = 'auto-framing';

        syncView();
        syncExpandedPanel();
        syncPtzViewMode();
    }

    function reduceToNormal() {
        state.mode = 'normal';
        state.expandedPanel = 'auto-framing';

        syncView();
        syncExpandedPanel();
        syncPtzViewMode();

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

    function syncPtzViewMode() {
        const isPtzExpanded =
            state.mode === 'expanded' &&
            state.expandedPanel === 'ptz';

        ensurePtzState();

        MpsState.ptz.viewMode = isPtzExpanded ? 'expanded' : 'normal';

        /*
         * PTZ expanded を離れる場合は canvasControl を解除する。
         * canvas は viewMode ごとにサイズ・座標系が変わるため、
         * 非表示状態へ canvasControl を持ち越さない。
         */
        if (
            !isPtzExpanded &&
            MpsState.ptz.uiMode === 'canvasControl' &&
            window.MpsPtzManual
        ) {
            MpsPtzManual.endCanvasDrag();
            MpsPtzManual.setUiMode('normalControl');
        }

        /*
         * 既存PTZ表示の再同期。
         * expanded DOM は次step以降で追加するため、
         * ここでは存在していなくても問題ない。
         */
        if (window.MpsPtzManual) {
            MpsPtzManual.resetAllButtons();
            MpsPtzManual.applyUiMode();
            MpsPtzManual.renderLockState();
        }

        console.log('[PTZ viewMode]', MpsState.ptz.viewMode);
    }

    function ensurePtzState() {
        if (!MpsState.ptz) {
            MpsState.ptz = {};
        }

        if (!MpsState.ptz.mode) {
            MpsState.ptz.mode = 'manual';
        }

        if (!MpsState.ptz.uiMode) {
            MpsState.ptz.uiMode = 'normalControl';
        }

        if (typeof MpsState.ptz.locked !== 'boolean') {
            MpsState.ptz.locked = false;
        }
    }

    return {
        init: init
    };
})();
