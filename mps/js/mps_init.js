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
        status: null
    };

    function init() {
        console.log("init");

        if (state.initialized) {
            return;
        }
        
        build();
        bindEvents();
        MpsSlider.init();
        MpsTab.init();
        MpsToggle.init();
        MpsPanelExpandMode.init();
        MpsCircleButton.init();
        MpsAutoButtonControl.init();
        state.initialized = true;
        load();
    }

    function build() {
        console.log("build");

        ui.title = TextCtrl("mps_header_left", "mps_title", state.title);
        ui.status = TextCtrl("mps_header_status", "mps_status", state.message);
        ui.backBtn = ButtonCtrl("mps_header_button", "mps_back_btn", "Back", callbackBack);

    }

    function bindEvents() {
        console.log("bindEvents");
    }

    function load() {
        updateView();
        checkLayout();
        updateDebugInfo();
    }

    function updateView() {
        console.log("updateView");

        ui.title.show();
        ui.backBtn.show();
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

    function initSliders() {
        $('.js-slider').each(function () {
            setSliderInitialPosition($(this));
        });
    }

    function setSliderInitialPosition($slider) {
        var min = Number($slider.attr('data-min'));
        var max = Number($slider.attr('data-max'));
        var value = Number($slider.attr('data-value'));

        if (isNaN(min) || isNaN(max) || isNaN(value) || max <= min) {
            return;
        }

        var percent = ((value - min) / (max - min)) * 100;

        $slider.find('.mps_common_slider_fill').css('width', percent + '%');
        $slider.find('.mps_common_slider_handle').css('left', percent + '%');
    }

    function checkLayout() {
        console.log("===== Layout Check =====");

        const ids = [
            "#mps_root",
            "#mps_header",
            "#mps_main",
            "#mps_view",
            "#mps_view_top",
            "#mps_view_bottom",
            "#mps_panel",
            "#mps_panel_normal_header",
            "#mps_panel_expanded_header",
            "#mps_panel_body",

            ".mps_live_view_container",
            ".mps_live_view_header",
            ".mps_live_view_body",
            ".mps_live_view_split",
            ".mps_live_view_side_controls",

            ".mps_preset_container",
            ".mps_preset_toolbar",
            ".mps_preset_body",
            ".mps_preset_list_container",
            ".mps_preset_center_line",
            ".mps_target_frame_container",

            ".mps_manual_control_container",
            ".mps_manual_frame_adjust_tabs",
            ".mps_manual_control_line_1",
            ".mps_manual_control_main",
            ".mps_manual_ptz_column",
            ".mps_manual_control",
            ".mps_lock_part",
            ".mps_speed_slider",
            ".mps_zoom_slider",
            ".mps_focus_slider",

            ".mps_limitation_container",
            ".mps_track_adjust_tabs_container",
            ".mps_track_adjust_content_container",
            ".mps_auto_framing_container",
            ".mps_image_adjust_container"
        ];
        
        ids.forEach(id => {
            const el = $(id);
            console.log(id, el.length ? "OK" : "NG");
        });
    }

    function updateDebugInfo() {
        document.querySelectorAll('#mps_root .debug-box').forEach(function (el) {
            const rect = el.getBoundingClientRect();
            el.setAttribute(
                'title',
                el.getAttribute('data-name') + ' : ' +
                Math.round(rect.width) + ' x ' +
                Math.round(rect.height)
            );
        });
    }

    return {
        init: init,
        destroy: destroy
    };

})();
