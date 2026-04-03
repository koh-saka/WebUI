/**
 * @fileOverview 画面制御の基本処理を管理するクラス
 *
 * @author Panasonic Corporation
 */

/**
 * 画面制御の基本処理を管理するクラスのインスタンス
 */
var displayBaseHeaderTab = DisplayBaseHeaderTab();

/**
 * HeaderTab制御クラス
 * @class HeaderTab HeaderTab制御クラス
 * @return {number} 　MODE_MAIN    MAINタブ選択状態定義
 * @return {number} 　MODE_SETTING Settingsタブ選択状態定義
 * @return {function} build 生成処理
 * @return {function} rebuild 再構築処理(選択状態の初期化)
 * @return {function} show 表示処理
 * @return {function} hide 非表示処理
 * @return {function} showModeTab SettingTabを選択状況に合わせて表示
 * @constructor
 */
function DisplayBaseHeaderTab() {
    /**
     * MAINタブオブジェクト(インデックス値)
     * @type number
     */
    const BTN_MAIN = 1;

    /**
     * SETTINGタブオブジェクト(インデックス値)
     * @type number
     */
    const BTN_SETTING = 2;

    /**
     * CHANGETOTOUCHタブオブジェクト(インデックス値)
     * @type number
     */
    const CHANGETOTOUCH = 3;

    const CHANGETOMOBILE = 4;

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    let btnObject = [];

    /**
     * 共通部オブジェクトの配列インデックス値show title(インデックス値)
     * @type number
     */
    const TXT_SHOW_TITLE = 1;
    const TXT_MEUN_TITLE = 2;
    /**
     * ボタンオブジェクト
     * @type txtObject[]
     */
    let txtObject = [];

    /**
     * 構築済みフラグ
     * @type boolean
     */
    let buildFlag = false;

    /**
     * buttonフラグ
     * @type boolean
     */
    let buttonFlg = false;

    /**
     * クラスインスタンス構築処理
     */
    function build() {
        if (buildFlag == false) {
            Platform.setIsTouchMode(false);
            buildFlag = true;
            let text = cparam_cgi_updateWebPageTitle();
            const title = text;
            if (text.length > 14) {
                text = text.substr(0, 14) + "...";
            }
            document.title = title;
            txtObject[TXT_SHOW_TITLE] = TextCtrl("base_header", "txt_show_title", htmlEncodeJQ(text), null, null, title);
            txtObject[TXT_MEUN_TITLE] = TextCtrl("base_main_setup_view", "base_main_setup_view", NPTZ_WORDING.wID_0043);
            // ボタンオブジェクト生成
            btnObject[BTN_MAIN] = ButtonCtrl('header_center', 'base_mode_view', NPTZ_WORDING.wID_0048, callbackLive);
            btnObject[BTN_SETTING] = ButtonCtrl('header_center', 'base_mode_main', NPTZ_WORDING.wID_0049, callbackSetUp);
            btnObject[CHANGETOTOUCH] = ButtonCtrl('base_header', 'btn_changetotouch', "", callbackChangeToTouch);
            btnObject[CHANGETOMOBILE] = ButtonCtrl('base_header', 'btn_changetomobile', "", callbackChangeToMobile);
            for (let txt in txtObject) {
                txtObject[txt].show();
            }
            // cameraControllerSetting領域の構築
            cameraControllerSetting.build();
            cameraControllerSetting.show();
            let powerSelect = document.getElementById("power");
            powerSelect.onchange = function () {
                let value = document.getElementById("power").value;
                if (value == "1") {
                    DoSubmitPower(1);
                } else {
                    DoSubmitPower(0);
                }
            };
            $("#power").val(gPower);
            onLoadProcess();
            $('#camera_controller_gui').hide();
            refresh_power_id = setInterval(function () {
                refresh_powerStatus();
                getLock();
            }, 5000);
            for (let btn in btnObject) {
                btnObject[btn].show();
                btnObject[btn].displayOff();

            }
            if (gPower == 0) {
                btnObject[BTN_MAIN].displayDisabled();
                btnObject[BTN_SETTING].displayDisabled();
                btnObject[CHANGETOTOUCH].displayDisabled();
                btnObject[CHANGETOMOBILE].displayDisabled();
            } else {
                btnObject[BTN_MAIN].displayOn();
                btnObject[BTN_SETTING].displayOff();
                btnObject[CHANGETOTOUCH].displayOff();
                btnObject[CHANGETOMOBILE].displayOff();
            }
            callbackSetUp(Button.MOUSE_DOWN);
            Platform.clearCurrentPage();
            changeCss(Platform.isTouchMode());
            if (isMobile) {
                $("#dialog_setup").css({
                    "width": "1920px",
                    "height": "1250px",
                });
                document.body.addEventListener('touchmove',bodyScroll,false);
                $('body').css({'position':'fixed',"width":"100%"});
                btnObject[CHANGETOMOBILE].show();
            }else{
                btnObject[CHANGETOMOBILE].hide();
            }
            //$("#base").css("visibility","hidden");
            initMainMenuScroll(true);
            liveModeFlg = true;
        }
    }

    function bodyScroll(event){
        event.preventDefault();
    }
    function getLock(){
        try {
            const currentLock = parseInt(cparam_get_remoteUnLockSetting().substring(0, 1), 10);
            if(currentLock == 1){
                window.location.href="/live/index.html";
            }
        } catch (e){

        }
    }

    /**
     * update powerStatus
     */
    function refresh_powerStatus() {
        menubar_ChkPower(gPower);
        if (reqCgiObj.streamStatus == '1') {
            $("#stream_status").removeClass('off').addClass('on');
        } else {
            $("#stream_status").removeClass('on').addClass('off');
        }
        if (reqCgiObj.syncStatus == '1') {
            $("#sync_status").removeClass('off').addClass('on');
        } else {
            $("#sync_status").removeClass('on').addClass('off');
        }
    }

    /**
     * check powerStatus
     * @param iPow
     */
    function menubar_ChkPower(iPow) {
        if (cparam_get_powerOnStandby() != iPow) { // 画面Open時とPower状態が変わっていたらリロード
            clearTimeout(refresh_power_id);
            setTimeout(function(){
                window.location.href = '/live/index.html';
            }, 1000);
        }
    }

    function DoSubmitPower(power) {
        cparam_set_powerOnStandby(power);
        if (power == 0) {
            iInterval = 100;
            const mode = {};
            mode['mode'] = 0;
            cparam_setCspControlMode(mode);
        } else {
            iInterval = 3000;
        }
        setTimeout(refreshDiv, iInterval);
    }

    let refreshDiv = function() {
        window.location.href = '/live/index.html';
    }

    function getTitleName(){
        let text = cparam_cgi_updateWebPageTitle();
        if (text.length > 14) {
            text = text.substr(0, 14) + "...";
        }
        txtObject[TXT_SHOW_TITLE].set(htmlEncodeJQ(text));
    }

    function callbackChangeToTouch(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            if(positionScroll!=null){
                positionScroll.destroy();
                positionScroll = null;
            }
            if(controlScroll!=null){
                controlScroll.destroy();
                controlScroll = null;
            }
            if(settingScroll!=null){
                settingScroll.destroy();
                settingScroll = null;
            }
            if(virtualStudio.settingSetClient != null){
            	virtualStudioInstance.settingSetClient.destroyMyScroll();
            }
            toggleTouchMode();
            if (Platform.isTouchMode()) {
                cameraControllerSetting.openPtz();
            } else {
                cameraControllerSetting.narrowArea();
            }

            if(Platform.isSetupMode()) {
                setupMainMenu.destroyMyScroll();
                setupMainMenu.buildMyScroll();
            }

            if(Platform.isSetupMode() && ($(".setup_menu_UHDCrop_btn").hasClass('on_hover') || $(".setup_menu_UHDCrop_btn").hasClass('on'))) {
                settingIoaUhd.changeMode();
            }

            if(Platform.isSetupMode() && ($(".setup_menu_presetPosition_btn").hasClass('on')||$(".setup_menu_presetPosition_btn").hasClass('on_hover'))){
                setupIoaPresetPosition.build();
                cameraControllerSetting.setTouchPTZTabOn();
                setTimeout(function () {
                    setupIoaPresetPosition.changeCameraControllerToPreset();
                }, 350)
                
            }
            if(Platform.isSetupMode() && ($(".setup_menu_maintenance_product_info_btn").hasClass('on')||$(".setup_menu_maintenance_product_info_btn").hasClass('on_hover'))){
                settingMaintenaceInfo.destroyMyScroll();
                settingMaintenaceInfo.buildMyScroll();
            }
            // if(Platform.isSetupMode() && ($(".setup_menu_network_network_btn").hasClass('on')||$(".setup_menu_network_network_btn").hasClass('on_hover'))){
            //     settingnetwork.destroyMyScroll();
            //     settingnetwork.buildMyScroll();
            // }
            if(Platform.isSetupMode() && ($(".setup_advanced_menu_802_1_x").hasClass('on')||$(".setup_advanced_menu_802_1_x").hasClass('on_hover'))) {
                settingNetworkAdvanced.destroy_802_1x_Scroll();
                settingNetworkAdvanced.build_802_1X_Scroll();
            }
            if(Platform.isSetupMode() && ($(".setup_menu_basic_pan_tilt_btn").hasClass('on')||$(".setup_menu_basic_pan_tilt_btn").hasClass('on_hover'))){
                // $(".setup_basic_system_flip_detect_angle_slider").remove();
                // $(".setup_basic_system_riseCurve_slider").remove();
                // $(".setup_basic_system_fallCurve_slider").remove();
                // $(".setup_basic_system_rise_acceleration_slider").remove();
                // $(".setup_basic_system_fallacceleration_slider").remove();
                // var sliderFlipDetectAngle = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_flip_detect_angle_slider', 120, 60, cparam_get_flipDetectAngle(), '', '');
                // var sliderRiseCurve = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_riseCurve_slider', 30, 0, cparam_get_riseCurve(), '', '');
                // var sliderFallCurve = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_fallCurve_slider', 30, 0, cparam_get_fallCurve(), '', '');
                // var sliderRiseAcceleration = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_rise_acceleration_slider', 255, 1, cparam_get_riseAcceleration(), '', '');
                // var sliderFallAcceleration = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_fallacceleration_slider', 255, 1, cparam_get_fallAcceleration(), '', '');
                // if(cparam_get_smartPictureFlip() == 0){
                //     sliderFlipDetectAngle.setDisable();
                // }else{
                //     sliderFlipDetectAngle.setEnable();   
                // }
                // if(cparam_get_pt_acceleration() == 1) {
                //     sliderRiseCurve.setDisable();
                //     sliderFallCurve.setDisable();
                //     sliderRiseAcceleration.setDisable();
                //     sliderFallAcceleration.setDisable();
                // } else {
                //     sliderRiseCurve.setEnable();
                //     sliderFallCurve.setEnable();
                //     sliderRiseAcceleration.setEnable();
                //     sliderFallAcceleration.setEnable();
                // }
                settingBasic.destroyMyScroll();
                settingBasic.buildMyScroll();
                settingBasic.refreshPanTiltSlider();
            }
            if(Platform.isSetupMode() && ($(".div_system_menu_shooting_mode").hasClass('on')||$(".div_system_menu_shooting_mode").hasClass('on_hover'))){
                settingBasicSystem.destroyMyScroll();
                settingBasicSystem.buildMyScroll();
            }
            if(Platform.isSetupMode() && ($(".div_system_menu_sync_signal").hasClass('on')||$(".div_system_menu_sync_signal").hasClass('on_hover'))){
                settingBasicSystem.refreshSyncSignalSlider();
            }
            if(Platform.isSetupMode() && ($(".div_system_menu_bar_id").hasClass('on')||$(".div_system_menu_bar_id").hasClass('on_hover'))){
                settingBasicSystem.destroyMyScroll();
                settingBasicSystem.refreshBarIdSlider();
            }
            if(Platform.isSetupMode() && ($(".setup_audio_audio_btn").hasClass('on')||$(".setup_audio_audio_btn").hasClass('on_hover'))){
                audioInstance.settingAudio.refreshAudiolSlider();
            }
            if(Platform.isSetupMode() && (document.getElementById("setup_videoOverIp_h264_main_outer").style.display !="none")){
                videooverip.destroyMyScroll();
                videooverip.buildMyScroll();
            }
            if(Platform.isSetupMode() && (document.getElementById("setup_virtual_studio_main").style.display !="none")){
                virtualStudioInstance.settingSetClient.destroyMyScroll();
                virtualStudioInstance.settingSetClient.buildMyScroll();
            }

            if(Platform.isSetupMode() && ($(".setup_menu_output_btn").hasClass('on')||$(".setup_menu_output_btn").hasClass('on_hover')))
            {
                signalsOutput.destroyMyScroll(); 
                signalsOutput.buildMyScroll();
            }

            refreshCurrentPage();
            isChangeHeight()
            $("#live_Camera_controller_gui")[0].contentWindow.displayBaseHeaderTab.callbackChangeToTouch(1);
        }
    }

    function refreshCurrentPage(){
        switch (Platform.currentPage()) {
            case 'lens':
                lensInstance.build();
                break;
            case 'imageAdjust.settingBrightness':
                imageAdjustInstance.settingBrightness.build();
                break;
            case 'imageAdjust.settingPicture':
                imageAdjustInstance.settingPicture.build();
                break;
            case 'imageAdjust.settingMatrix':
                imageAdjustInstance.settingMatrix.build();
                break;
            case 'imageAdjust.settingGammaKnee':
                imageAdjustInstance.settingGammaKnee.build();
                break;
            case 'imageAdjust.settingDetail':
                imageAdjustInstance.settingDetail.build();
                break;
            case 'audio.settingAudio':
                audioInstance.settingAudio.build();
                break;
            case 'setupIoaPresetPosition':
                setupIoaPresetPosition.initPresetSpeedSlider();
                break;
        }
    }

    function callbackChangeToMobile(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            window.location.href="/mobile/live/index.html";
        }
    }
    function changeCss(mode){
        let control_Css = document.getElementById("control_cssId");
        let camera_live_area_Css = document.getElementById("camera_live_area_cssId");
        let display_base_Css = document.getElementById("display_base_cssId");
        let tracking_controller_Css = document.getElementById("tracking_controller_cssId");
        let common_function_Css = document.getElementById("common_function_cssId");
        let slider_Css = document.getElementById("slider_cssId");
        let setup_main_menu_Css = document.getElementById("setup_main_menu_cssId");
        let setting_imageOrAudio_Css = document.getElementById("setting_imageOrAudio_cssId");
        let setting_mediaOverIp_Css = document.getElementById("setting_mediaOverIp_cssId");
        let setting_basic_Css = document.getElementById("setting_basic_cssId");
        let setting_user_mng_Css = document.getElementById("setting_user_mng_cssId");
        let setting_network_Css = document.getElementById("setting_network_cssId");
        let setting_maintenace_Css = document.getElementById("setting_maintenace_cssId");
        let camera_controller_setting_Css = document.getElementById("camera_controller_setting_cssId");
        let setting_status_Css = document.getElementById("setting_status_cssId");
        let setting_signals_Css = document.getElementById("setting_signals_cssId");
        if (mode) {
            control_Css.href = "/css/pc/control_touch.css";
            camera_live_area_Css.href = "/css/pc/camera_live_area_touch.css";
            display_base_Css.href = "/css/pc/display_base_touch.css";
            tracking_controller_Css.href = "/css/pc/tracking_controller_touch.css";
            common_function_Css.href = "/css/pc/common_function_touch.css";
            slider_Css.href = "/css/pc/slider_touch.css";
            setup_main_menu_Css.href = "/css/pc/setup_main_menu_touch.css";
            setting_imageOrAudio_Css.href = "/css/pc/setting_imageOrAudio_touch.css";
            setting_mediaOverIp_Css.href = "/css/pc/setting_mediaOverIp_touch.css";
            setting_basic_Css.href = "/css/pc/setting_basic_touch.css";
            setting_user_mng_Css.href = "/css/pc/setting_user_mng_touch.css";
            setting_network_Css.href = "/css/pc/setting_network_touch.css";
            setting_maintenace_Css.href = "/css/pc/setting_maintenace_touch.css";
            camera_controller_setting_Css.href = "/css/pc/camera_controller_setting_touch.css";
            setting_status_Css.href = "/css/pc/setting_status_touch.css";
            setting_signals_Css.href = "/css/pc/setting_signals_touch.css";
            cameraControllerSetting.openPtz();

        } else {
            control_Css.href = "/css/pc/control.css";
            camera_live_area_Css.href = "/css/pc/camera_live_area.css";
            display_base_Css.href = "/css/pc/display_base.css";
            tracking_controller_Css.href = "/css/pc/tracking_controller.css";
            common_function_Css.href = "/css/pc/common_function.css";
            slider_Css.href = "/css/pc/slider.css";
            setup_main_menu_Css.href = "/css/pc/setup_main_menu.css";
            setting_imageOrAudio_Css.href = "/css/pc/setting_imageOrAudio.css";
            setting_mediaOverIp_Css.href = "/css/pc/setting_mediaOverIp.css";
            setting_basic_Css.href = "/css/pc/setting_basic.css";
            setting_user_mng_Css.href = "/css/pc/setting_user_mng.css";
            setting_network_Css.href = "/css/pc/setting_network.css";
            setting_maintenace_Css.href = "/css/pc/setting_maintenace.css";
            camera_controller_setting_Css.href = "/css/pc/camera_controller_setting.css";
            setting_status_Css.href = "/css/pc/setting_status.css";
            setting_signals_Css.href = "/css/pc/setting_signals.css";
            cameraControllerSetting.narrowArea();
        }
        refreshCurrentPage();
    }


    /**
     * FullScreen button controller
     * @param element
     */
    function requestFullScreen(element) {
        const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
            requestMethod.call(element);
        }
    }

    /**
     * update setting button style to off
     */
    function settingButtonOff() {
        btnObject[BTN_SETTING].displayOff();
    }

    /**
     * update setting button style to disable
     */
    function settingButtonDisabled() {
        btnObject[BTN_SETTING].displayDisabled();
    }

    /**
     * update setting button style to disable
     */
    function settingButtonDisplayOff() {
        btnObject[BTN_SETTING].displayOff();
    }

    /**
     * VIEW表示更新処理
     */
    function showView() {
        //ボタンの制御
        btnObject[BTN_MAIN].displayOff();
        btnObject[BTN_SETTING].displayOn();
        //divの制御
        $('#base_header').show();
        $('#base_header_common').show();
        $('#view_gui').show();
        $('#camera_count').show();
        $('#main_gui').hide();
        $('#setting_gui').hide();
        $('#base_main_controller').hide();
        $("#setting_camera_ptz_title").hide();

        $('#camera_controller_gui').hide();
        $('#camera_controller_gui_open').hide();
        $('#camera_controller_gui').show();
    }

    /**
     * MAIN表示更新処理
     */
    function showMain() {
        //ボタンの制御
        if(gPower == 0){
            btnObject[BTN_MAIN].displayDisabled();
            btnObject[BTN_SETTING].displayDisabled();
            btnObject[CHANGETOTOUCH].displayDisabled();
            btnObject[CHANGETOMOBILE].displayDisabled();
        }else{
            btnObject[BTN_MAIN].displayOn();
            btnObject[BTN_SETTING].displayOff();
            btnObject[CHANGETOTOUCH].displayOff();
            btnObject[CHANGETOMOBILE].displayOff();
        }

        //divの制御
        $('#base_header').show();
        $('#base_header_common').show();
        $('#view_gui').show();
        $('#main_gui').show();
        $('#base_main_controller').show();
        $('#camera_controller_gui').show();
        $('#base_view_controller').hide();
        $('#camera_count').hide();
        $('#setting_gui').hide();
        $("#setting_camera_ptz_title").hide();
        $('.txt_action').css("left", "150px");
    }

    function setting_changeMouseStyle(type) {
        if (type == "add") {
            $("#pad_center").addClass("changeMouseStyle");
            document.getElementById("control").src = "./css/parts/btn_cameraController_slider_none_normal.png";
        } else if (type == "remove") {
            $("#pad_center").removeClass("changeMouseStyle");
            document.getElementById("control").src = "./css/parts/cc_header_btn_fullscreen_normal.png";
        }
    }

    /**
     * HeaderTab:SetUp 押下時の画面制御
     * @param {number} mouse マウス・ボタン操作状況
     */
    function callbackSetUp(mouse) {
        let ret = 0;
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            if (!buttonFlg) {
                buttonFlg = true;
                ret = cparam_cgi_network_easyipset();
                if (ret > 0) {
                    showView();
                    $("#camera_stream_menu")[0].style.display = "none";
                    $("#camera_osd_menu")[0].style.display = "none";
                    $("#camera_setup")[0].style.display = "";
                    $("#stream_menu").hide();
                    $("#other_menu").hide();
                    $("#camera_controller_gui").hide();
                    $("#btn_live_menu").hide();
                    $("#camera_live_line").hide();

                    //追加・変更 対応不具合 3496
                    $('#divndihx').hide();

                    setupMainMenu.build();

                    $("#pad_center").mousedown(function () {
                        setting_changeMouseStyle("add");
                    });
                    $("#pad_center").mouseup(function () {
                        setting_changeMouseStyle("remove");
                    });

                    $(".btn_lock").hide();
                    document.getElementById("mainViewHtml").src = "";
                    cameraControllerSetting.stopIntervalSetSlider();

                    $("#camera_live_area_bottom_line").hide();
                    if (isMobile) {
                    } else {
                        windowsZoomControlOnResize();
                    }
                    Platform.setIsSetupMode(true);
                } else {
                }
            }
        } else {
            // 処理なし
        }
    }

    /**
     * HeaderTab:Live 押下時の画面制御
     * @param {number} mouse マウス・ボタン操作状況
     */
    function callbackLive(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            sessionStorage.isAdminPage = true ;
            window.location.href = '/live/index.html';
            Platform.setIsTouchMode(false);
            Platform.setIsSetupMode(false);
        } else {
            // 処理なし
        }
    }
    return {
        build: build,
        rebuild: function () {
            showView();
        },
        show: function () {
            for (var btn in btnObject) {
                btnObject[btn].show();
            }
            for (var txt in txtObject) {
                txtObject[txt].show();
            }
            showMain();
        },
        hide: function () {
        },
        getTitleName:getTitleName,
        settingButtonOff: settingButtonOff,
        settingButtonDisabled: settingButtonDisabled,
        settingButtonDisplayOff: settingButtonDisplayOff
    };
}