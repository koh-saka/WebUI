$(function () {
    MpsApp.init();
});

var MpsApp = (function () {

    let state = {
        title: "MPS Standalone",
        message: "MPS Ready",
        initialized: false
    };

    let ui = {
        title: null,
        backBtn: null,
        viewTop: null,
        viewBottom: null,
        panelHeader: null,
        viewPlaceholder: null
    };

    function init() {
        console.log("init");

        if (state.initialized) {
            return;
        }
        
        build();
        bindEvents();
        state.initialized = true;
        load();
    }

    function build() {
        console.log("build");

        ui.title = TextCtrl("mps_header", "mps_title", state.title);
        ui.backBtn = ButtonCtrl("mps_header", "mps_back_btn", "Back", callbackBack);

        ui.viewTop = TextCtrl("mps_view_top", "mps_view_placeholder", "LIVE VIEW AREA");
        ui.viewBottom = TextCtrl("mps_view_bottom", "mps_view_placeholder", "BOTTOM CONTROL AREA");

        ui.panelHeader = TextCtrl("mps_panel_header", "mps_panel_placeholder", "PANEL HEADER");
        ui.status = TextCtrl("mps_panel_body", "mps_status", state.message);
    }

    function bindEvents() {
        console.log("bindEvents");
    }

    function load() {
        console.log("load");

        updateView();
        checkLayout();
    }

    function updateView() {
        console.log("updateView");

        ui.title.show();
        ui.backBtn.show();

        ui.viewTop.show();
        ui.viewBottom.show();

        ui.panelHeader.show();

        ui.backBtn.displayOff();

        ui.status.set(state.message);
        ui.status.show();
    }

    function destroy() {
        console.log("destroy");
    }

    function callbackBack(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            window.location.href = '/index.html'; // 仮
        }
    }

    function checkLayout() {
        console.log("===== Layout Check =====");

        const ids = [
            "#mps_view",
            "#mps_view_top",
            "#mps_view_bottom",
            "#mps_panel",
            "#mps_panel_header",
            "#mps_panel_body"
        ];

        ids.forEach(id => {
            const el = $(id);
            console.log(id, el.length ? "OK" : "NG");
        });
    }

    return {
        init: init,
        destroy: destroy
    };

})();
