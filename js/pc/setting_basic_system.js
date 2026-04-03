/**
 * @fileOverview SetUp画面：settingUserSystem
 *
 * @author Panasonic Corporation
 */

/**
 * カメラリスト領域制御クラスインスタンス
 * @type {SettingUserSystem}
 */
var settingBasicSystem = SettingBasicSystem();

/**
 * カメラリスト領域制御クラスインスタンス
 * @type {SettingBasicSystem}
 */
function SettingBasicSystem() {
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildFlag = false;
    /**
     * ボタンオブジェクト:ioaipppInner_limit
     * @type btnObject[]
     */
    var btnObject = [];
    var set_btnObject = [];
    var execute_btnObject = [];
    var systemTextObject = [];
    var radioModeButtonGroup = [];
    var radioRefSignalButtonGroup = [];
    var selectObject = [];
    const SYSTEM_TITLE = 0;
    const SYSTEM_STATUS = 1;
    const SYSTEM_FREQUENCY = 2;
    const SYSTEM_FORMAT = 3;
    const SYSTEM_SFP_MODE = 4;
    const SYSTEM_V_LOG = 5;
    const SYSTEM_HDR = 6;
    const SYSTEM_GAMUT = 7;
    const SYSTEM_SHOOTING_MODE = 8;
    const SYSTEM_SERIAL_CONNECTION = 9;
    const SYSTEM_BAR = 10;
    const SYSTEM_LEVEL_GAUGE = 11;
    const SYSTEM_TALLY = 12;
    const SYSTEM_SYNC_SIGNAL = 13;
    const SYSTEM_BAR_ID = 14;
    const SYSTEM_FPS_SW = 15;
    const SYSTEM_FPS = 16;

    const BTN_SETTING_STATUS_INDEX = 0;
    const BTN_SETTING_FREQUENCY_INDEX = 1;
    const BTN_SETTING_FORMAT_INDEX = 2;
    const BTN_SETTING_SFP_MODE_INDEX = 3;
    const BTN_SETTING_V_LOG_INDEX = 4;
    const BTN_SETTING_HDR_INDEX = 5;
    const BTN_SETTING_GAMUT_INDEX = 6;
    const BTN_SETTING_SHOOTING_MODE_INDEX = 7;
    const BTN_SETTING_SERIAL_CONNECTION_INDEX = 8;
    const BTN_SETTING_BAR_INDEX = 9;
    const BTN_SETTING_LEVEL_GAUGE_INDEX = 10;
    const BTN_SETTING_TALLY_INDEX = 11;
    const BTN_SETTING_SYNC_SIGNAL_INDEX = 12;
    const BTN_SETTING_BAR_ID_INDEX = 13;
    //set_btn
    const BTN_SETTING_FREQUENCY_SET = 0;
    const BTN_SETTING_FORMAT_SET = 1;
    // const BTN_SETTING_SFP_MODE_SET = 2;
    const BTN_SETTING_V_LOG_SET = 2;
    const BTN_SETTING_HDR_SET = 3;
    // const BTN_SETTING_GAMUT_SET = 4;
    const BTN_SETTING_SHOOTING_MODE_SET = 5;
    // const BTN_SETTING_SERIAL_CONNECTION_SET = 6;

    //execute_btn
    const LEVEL_GAUGE_SET_EXECUTE_BUTTON = 0;
    const LEVEL_GAUGE_RESET_EXECUTE_BUTTON = 1;

    //select
    const SELECT_SYSTEM_FORMAT = 0;
    //radio
    const RADIO_SYSTEM_FREQUENCY = 0;
    const RADIO_SYSTEM_SFP_MODE = 1;
    const RADIO_SYSTEM_V_LOG = 2;
    const RADIO_SYSTEM_V_LOG_PAINT_SW = 3;
    const RADIO_SYSTEM_HDR = 4;
    const RADIO_SYSTEM_GAMUT = 5;
    const RADIO_SYSTEM_SHOOTING_MODE = 6;
    const RADIO_SYSTEM_SERIAL_CONNECTION = 7;
    const RADIO_SYSTEM_BAR = 8;
    const RADIO_SYSTEM_BAR_COLOR_TYPE = 9;
    const RADIO_SYSTEM_TONE = 10;
    const RADIO_SYSTEM_LEVEL_GAUGE = 11;
    const RADIO_SYSTEM_TALLY = 12;
    const RADIO_SYSTEM_R = 13;
    const RADIO_SYSTEM_G = 14;
    const RADIO_SYSTEM_Y = 15;
    const RADIO_SYSTEM_TALLY_GUARD = 16;
    const RADIO_SYSTEM_OUTPUT1 = 17;
    const RADIO_SYSTEM_OUTPUT2 = 18;
    const RADIO_SYSTEM_BAR_ID = 19;
    const RADIO_REF_SIGNAL = 20;
    const RADIO_SYSTEM_TALLY_BRIGHTNESS  = 21;
    const RADIO_SYSTEM_FPS_SW = 22;
    const RADIO_SYSTEM_FPS = 23;

    let sliderHPhaseCoarse;
    let sliderHPhaseFine;
    let sliderBrightness;
    let sliderId1positionV;
    let sliderId1positionH;
    let sliderId2positionV;
    let sliderId2positionH;
    let sliderOffsetV;
    let sliderOffsetH;
    let id1Input;
    let nowfreq = null;
    let sFormat = "";
    let myScroll = null;
    let buildScrollSuccessFlg = true;
    let myDOM = {};
    let uhdCropRadioDate;
    myDOM.ajax = {};
    myDOM.ajax.GetHttpRequest = function (url, callback, headers) {

        var xhr = null;

        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new window.ActiveXObject("MSXML2.XMLHTTP.6.0");
            } catch (e) {
                try {
                    xhr = new window.ActiveXObject("MSXML2.XMLHTTP.3.0");
                } catch (e) {
                    try {
                        xhr = new window.ActiveXObject("MSXML2.XMLHTTP");
                    } catch (e) {
                        window.alert("XMLHttpRequest / MSXML2.XMLHTTP is NOT exist !");
                        return null;
                    }
                }
            }
        } else {
            return null;
        }

        if (xhr != null) {
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Pragma', 'no-cache');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
            if (typeof( headers ) == 'object') {
                for (var name in headers) {
                    xhr.setRequestHeader(name, headers[name]);
                }
            } else {
                // DO NOTHING
            }
            if (typeof( callback ) == 'function') {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        xhr.onreadystatechange = new Function;
                        callback(xhr);
                    } else {
                        // DO NOTHING
                    }
                };
            } else {
                // DO NOTHING
            }
            xhr.send(null);
        } else {
            return null;
        }

        return xhr;
    };


    /**
     * SettingUserSystem画面の初期化
     * @type {SettingUserSystem}
     */

    function build() {
        if (!buildFlag) {
            cparam_updateSystem();
            sFormat = cparam_get_format();
            nowfreq = GetFreqMode();
            uhdCropRadioDate = cparam_get_UHDCrop();
            buildFlag = true;
            systemTextObject[SYSTEM_TITLE] = TextCtrl("div_system_menu", "system_title", NPTZ_WORDING.wID_0193);
            systemTextObject[SYSTEM_STATUS] = TextCtrl("setting_basic_system_status", "basic_system_title", NPTZ_WORDING.wID_0194);
            systemTextObject[SYSTEM_FREQUENCY] = TextCtrl("setting_basic_system_frequency", "basic_system_title", NPTZ_WORDING.wID_0195);
            systemTextObject[SYSTEM_FORMAT] = TextCtrl("setting_basic_system_format", "basic_system_title", NPTZ_WORDING.wID_0196);
            systemTextObject[SYSTEM_SFP_MODE] = TextCtrl("setting_basic_system_sfp_mode", "basic_system_title", NPTZ_WORDING.wID_0197);
            systemTextObject[SYSTEM_V_LOG] = TextCtrl("setting_basic_system_v_log", "basic_system_title", NPTZ_WORDING.wID_0198);
            systemTextObject[SYSTEM_HDR] = TextCtrl("setting_basic_system_hdr", "basic_system_title", NPTZ_WORDING.wID_0199);
            systemTextObject[SYSTEM_GAMUT] = TextCtrl("setting_basic_system_gamut", "basic_system_title", NPTZ_WORDING.wID_0200);
            systemTextObject[SYSTEM_SHOOTING_MODE] = TextCtrl("setting_basic_system_shooting_mode", "basic_system_title", NPTZ_WORDING.wID_0201);
            systemTextObject[SYSTEM_SERIAL_CONNECTION] = TextCtrl("setting_basic_system_serial_connection", "basic_system_title", NPTZ_WORDING.wID_0202);
            systemTextObject[SYSTEM_BAR] = TextCtrl("setting_basic_system_bar", "basic_system_title", NPTZ_WORDING.wID_0203);
            systemTextObject[SYSTEM_LEVEL_GAUGE] = TextCtrl("setting_basic_system_level_gauge", "basic_system_title", NPTZ_WORDING.wID_0204);
            systemTextObject[SYSTEM_TALLY] = TextCtrl("setting_basic_system_tally", "basic_system_title", NPTZ_WORDING.wID_0205);
            systemTextObject[SYSTEM_SYNC_SIGNAL] = TextCtrl("setting_basic_system_sync_signal", "basic_system_title", NPTZ_WORDING.wID_0206);
            systemTextObject[SYSTEM_BAR_ID] = TextCtrl("setting_basic_system_bar_id", "basic_system_title", NPTZ_WORDING.wID_0207);

            btnObject[BTN_SETTING_STATUS_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_status", NPTZ_WORDING.wID_0194, callbackSystemStatus, 0, MenuButtonType.SINGLE);
            btnObject[BTN_SETTING_FREQUENCY_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_frequency", NPTZ_WORDING.wID_0195, callbackSystemStatus, 1, MenuButtonType.TOP);
            btnObject[BTN_SETTING_FORMAT_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_format", NPTZ_WORDING.wID_0196, callbackSystemStatus, 2, MenuButtonType.MIDDLE);
            if(isUE163){
                btnObject[BTN_SETTING_V_LOG_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_vlog isUE163", NPTZ_WORDING.wID_0198, callbackSystemStatus, 4, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_HDR_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_hdr isUE163", NPTZ_WORDING.wID_0199, callbackSystemStatus, 5, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_GAMUT_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_gamut isUE163", NPTZ_WORDING.wID_0200, callbackSystemStatus, 6, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_SHOOTING_MODE_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_shooting_mode isUE163", NPTZ_WORDING.wID_0201, callbackSystemStatus, 7, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_SERIAL_CONNECTION_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_serial_connection isUE163", NPTZ_WORDING.wID_0202, callbackSystemStatus, 8, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_BAR_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_bar isUE163", NPTZ_WORDING.wID_0203, callbackSystemStatus, 9, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_LEVEL_GAUGE_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_level_gauge isUE163", NPTZ_WORDING.wID_0204, callbackSystemStatus, 10, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_TALLY_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_tally isUE163", NPTZ_WORDING.wID_0205, callbackSystemStatus, 11, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_SYNC_SIGNAL_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_sync_signal isUE163", NPTZ_WORDING.wID_0206, callbackSystemStatus, 12, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_BAR_ID_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_bar_id isUE163", NPTZ_WORDING.wID_0207, callbackSystemStatus, 13, MenuButtonType.BOTTOM);
            }else{
                btnObject[BTN_SETTING_SFP_MODE_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_sfp_mode", NPTZ_WORDING.wID_0197, callbackSystemStatus, 3, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_V_LOG_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_vlog", NPTZ_WORDING.wID_0198, callbackSystemStatus, 4, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_HDR_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_hdr", NPTZ_WORDING.wID_0199, callbackSystemStatus, 5, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_GAMUT_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_gamut", NPTZ_WORDING.wID_0200, callbackSystemStatus, 6, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_SHOOTING_MODE_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_shooting_mode", NPTZ_WORDING.wID_0201, callbackSystemStatus, 7, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_SERIAL_CONNECTION_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_serial_connection", NPTZ_WORDING.wID_0202, callbackSystemStatus, 8, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_BAR_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_bar", NPTZ_WORDING.wID_0203, callbackSystemStatus, 9, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_LEVEL_GAUGE_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_level_gauge", NPTZ_WORDING.wID_0204, callbackSystemStatus, 10, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_TALLY_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_tally", NPTZ_WORDING.wID_0205, callbackSystemStatus, 11, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_SYNC_SIGNAL_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_sync_signal", NPTZ_WORDING.wID_0206, callbackSystemStatus, 12, MenuButtonType.MIDDLE);
                btnObject[BTN_SETTING_BAR_ID_INDEX] = MenuButtonCtrl('div_system_menu', "div_system_menu_bar_id", NPTZ_WORDING.wID_0207, callbackSystemStatus, 13, MenuButtonType.BOTTOM);
            }
            for (var i = 0; i < btnObject.length; i++) {
                if (i == BTN_SETTING_SFP_MODE_INDEX && isUE163) {
                    continue;
                }
                btnObject[i].show();
                btnObject[i].displayOff();
            }

            //set button
            set_btnObject[BTN_SETTING_FREQUENCY_SET] = ButtonCtrl("setting_basic_system_frequency", "btn_system_frequency_set", NPTZ_WORDING.wID_0141, callbackSetFreq, 0);
            set_btnObject[BTN_SETTING_FORMAT_SET] = ButtonCtrl("setting_basic_system_format", "btn_system_three_labels_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 1);
            // set_btnObject[BTN_SETTING_SFP_MODE_SET] = ButtonCtrl("setting_basic_system_sfp_mode", "btn_system_frequency_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 2);
            //set_btnObject[BTN_SETTING_V_LOG_SET] = ButtonCtrl("setting_basic_system_v_log", "btn_system_two_labels_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 3);
            //set_btnObject[BTN_SETTING_HDR_SET] = ButtonCtrl("setting_basic_system_hdr", "btn_system_frequency_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 4);
            // set_btnObject[BTN_SETTING_GAMUT_SET] = ButtonCtrl('setting_basic_system_gamut', "btn_system_frequency_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 5);
            //set_btnObject[BTN_SETTING_SHOOTING_MODE_SET] = ButtonCtrl('setting_basic_system_shooting_mode', "btn_system_frequency_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 6);
            // set_btnObject[BTN_SETTING_SERIAL_CONNECTION_SET] = ButtonCtrl("setting_basic_system_serial_connection", "btn_system_frequency_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 7);

            //build  select
            selectObject[SELECT_SYSTEM_FORMAT] = SelectCtrl("setting_basic_system_format", "select_setting_basic_system_format", "setup_system_fomat_select", "setup_system_fomat_select", callbackSelectFormat);
            refreshSystemFormat();

            //system_frequency
            //radio
            radioModeButtonGroup[RADIO_SYSTEM_FREQUENCY] = RadioButtonGroupCtrl("setting_basic_system_frequency", "setting_basic_system_frequency", RADIO_GROUP.rID_0043, GetFreqMode(), priorityStreamRadioButton);
            const frequency = TextCtrl("setting_basic_system_frequency", "setting_basic_system_frequency", NPTZ_WORDING.wID_0195);
            frequency.show();
            $('#setting_basic_system_frequency').append($('<div class="systemDivInnerLine1"></div>'));

            //system_format
            const format = TextCtrl("setting_basic_system_format", "setting_basic_system_format", NPTZ_WORDING.wID_0196);
            format.show();
            $('#setting_basic_system_format').append($('<div class="systemDivInnerLine1"></div>'));
            const format_fps_sw = TextCtrl("setting_basic_system_format", "setting_basic_system_format_fps_sw_label", NPTZ_WORDING.wID_0939);
            format_fps_sw.show();
            $('#setting_basic_system_format').append($('<div class="systemDivInnerLine2"></div>'));
            const format_fps = TextCtrl("setting_basic_system_format", "setting_basic_system_format_fps_label", NPTZ_WORDING.wID_0940);
            format_fps.show();
            $('#setting_basic_system_format').append($('<div class="systemDivInnerLine3"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_FPS_SW] = RadioButtonGroupCtrl("setting_basic_system_format", "setting_basic_system_format_fps_sw_", RADIO_GROUP.rID_0001, '0', callbackFpsSw);
            radioModeButtonGroup[RADIO_SYSTEM_FPS] = RadioButtonGroupCtrl("setting_basic_system_format", "setting_basic_system_format_fps_", RADIO_GROUP.rID_0109, '0', callbackFps);

            //sfp mode
            const sfpMode = TextCtrl("setting_basic_system_sfp_mode", "setting_basic_system_format", NPTZ_WORDING.wID_0197_01);
            sfpMode.show();
            $('#setting_basic_system_sfp_mode').append($('<div class="systemDivInnerLine1"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_SFP_MODE] = RadioButtonGroupCtrl("setting_basic_system_sfp_mode", "setting_basic_system_sfp_mode_", RADIO_GROUP.rID_0044, '0', callbackSfpModeRadioButton);

            //V-LOG
            const v_log = TextCtrl("setting_basic_system_v_log", "setting_basic_system_format", NPTZ_WORDING.wID_0198);
            v_log.show();
            $('#setting_basic_system_v_log').append($('<div class="systemDivInnerLine1"></div>'));
            const v_log_paint_sw = TextCtrl("setting_basic_system_v_log", "setting_basic_system_v_log_label", NPTZ_WORDING.wID_0198_01);
            v_log_paint_sw.show();
            $('#setting_basic_system_v_log').append($('<div class="systemDivInnerLine2"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG] = RadioButtonGroupCtrl("setting_basic_system_v_log", "setting_basic_system_v_log_", RADIO_GROUP.rID_0052,'0', callbackVlogRadioButton);
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW] = RadioButtonGroupCtrl("setting_basic_system_v_log", "setting_basic_system_v_log_paint_sw_", RADIO_GROUP.rID_0052, '0',callbackVlogPaintSwRadioButton);

            //HDR
            const hdr = TextCtrl("setting_basic_system_hdr", "setting_basic_system_format", NPTZ_WORDING.wID_0199);
            hdr.show();
            $('#setting_basic_system_hdr').append($('<div class="systemDivInnerLine1"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_HDR] = RadioButtonGroupCtrl("setting_basic_system_hdr", "setting_basic_system_hdr_", RADIO_GROUP.rID_0052, '0', callbackHdrRadioButton);

            //gamut
            const gamut = TextCtrl("setting_basic_system_gamut", "setting_basic_system_format", NPTZ_WORDING.wID_0200);
            gamut.show();
            $('#setting_basic_system_gamut').append($('<div class="systemDivInnerLine1"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_GAMUT] = RadioButtonGroupCtrl("setting_basic_system_gamut", "setting_basic_system_gamut_", RADIO_GROUP.rID_0085, '0', callbackGamutRadioButton);

            //shooting mode
            const shooting_mode = TextCtrl("setting_basic_system_shooting_mode", "setting_basic_system_format", NPTZ_WORDING.wID_0201);
            shooting_mode.show();
            $('#setting_basic_system_shooting_mode').append($('<div class="systemDivInnerLine1"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_SHOOTING_MODE] = RadioButtonGroupCtrl("setting_basic_system_shooting_mode", "setting_basic_system_shooting_mode_", RADIO_GROUP.rID_0053, '0', callbackShootingRadioButton);

            //serial connection
            const serial_connection = TextCtrl("setting_basic_system_serial_connection", "setting_basic_system_format", NPTZ_WORDING.wID_0202_01);
            serial_connection.show();
            $('#setting_basic_system_serial_connection').append($('<div class="systemDivInnerLine1"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_SERIAL_CONNECTION] = RadioButtonGroupCtrl("setting_basic_system_serial_connection", "setting_basic_system_serial_connection_", RADIO_GROUP.rID_0054, '0', callbackSerialConnectionRadioButton);

            // BAR
            const bar = TextCtrl("setting_basic_system_bar", "setting_basic_system_format", NPTZ_WORDING.wID_0212);
            bar.show();
            $('#setting_basic_system_bar').append($('<div class="systemDivInnerLine1"></div>'));
            const colorBarType = TextCtrl("setting_basic_system_bar", "setting_basic_system_bar_label", NPTZ_WORDING.wID_0213);
            colorBarType.show();
            $('#setting_basic_system_bar').append($('<div class="systemDivInnerLine2_Bar systemDivInnerLine2"></div>'));
            $('#setting_basic_system_bar').append($('<div class="systemDivInnerLine2_ver vertical_line_common"></div>'));
            const tone = TextCtrl("setting_basic_system_bar", "setting_basic_system_third_label", NPTZ_WORDING.wID_0214);
            tone.show();
            $('#setting_basic_system_bar').append($('<div class="systemDivInnerLine3"></div>'));
            radioModeButtonGroup[RADIO_SYSTEM_BAR] = RadioButtonGroupCtrl("setting_basic_system_bar", "setting_basic_system_bar_", RADIO_GROUP.rID_0052,'0', callbackBarRadioButtion);
            radioModeButtonGroup[RADIO_SYSTEM_BAR_COLOR_TYPE] = RadioButtonGroupCtrl("setting_basic_system_bar", "setting_basic_system_bar_color_type_", RADIO_GROUP.rID_0014,'0', callbackColorBarType);
            radioModeButtonGroup[RADIO_SYSTEM_TONE] = RadioButtonGroupCtrl("setting_basic_system_bar", "setting_basic_system_tone_", RADIO_GROUP.rID_0052,'0', callbackBarToneRadioButtion);

            // level gauge
            // const levelGauge = TextCtrl("setting_basic_system_level_gauge", "setting_basic_system_format", NPTZ_WORDING.wID_0204);
            // levelGauge.show();
            $('#setting_basic_system_level_gauge').append($('<div class="systemDivInnerLine1"></div>'));
            const levelGaugeSet = TextCtrl("setting_basic_system_level_gauge", "setting_basic_system_second_label", NPTZ_WORDING.wID_0204_01);
            levelGaugeSet.show();
            $('#setting_basic_system_level_gauge').append($('<div class="systemDivInnerLine2"></div>'));
            const levelGaugeReset = TextCtrl("setting_basic_system_level_gauge", "setting_basic_system_level_gauge_reset_label", NPTZ_WORDING.wID_0204_02);
            levelGaugeReset.show();
            // $('#setting_basic_system_level_gauge').append($('<div class="systemDivInnerLine3"></div>'));
            // radioModeButtonGroup[RADIO_SYSTEM_LEVEL_GAUGE] = RadioButtonGroupCtrl("setting_basic_system_level_gauge", "setting_basic_system_level_gauge_", RADIO_GROUP.rID_0052,'0', callbackLevelGaugeRadioButton);
            execute_btnObject[LEVEL_GAUGE_SET_EXECUTE_BUTTON] = ButtonCtrl("setting_basic_system_level_gauge", "btn_system_level_gauge_set_execute", NPTZ_WORDING.wID_0154, priorityStreamRadioButton);
            execute_btnObject[LEVEL_GAUGE_RESET_EXECUTE_BUTTON] = ButtonCtrl("setting_basic_system_level_gauge", "btn_system_level_gauge_reset_execute", NPTZ_WORDING.wID_0154, priorityStreamRadioButton);

            // tally
            const tally = TextCtrl("setting_basic_system_tally", "setting_basic_system_format", NPTZ_WORDING.wID_0219);
            tally.show();
            radioModeButtonGroup[RADIO_SYSTEM_TALLY] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_", RADIO_GROUP.rID_0017,'0', callbackSystemTallyRadioButton);
            $('#setting_basic_system_tally').append($('<div class="systemDivInnerLine1"></div>'));
            const tallyLedLimit = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_label", NPTZ_WORDING.wID_0581);
            tallyLedLimit.show();
            LineCtrl("setting_basic_system_tally", "vertical", 0, 0, 0,"setting_basic_system_tally_1");
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_2","96");
            const r = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_r", NPTZ_WORDING.wID_0345);
            r.show();
            radioModeButtonGroup[RADIO_SYSTEM_R] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_r_", RADIO_GROUP.rID_0068,'0', callbackSystemTallyRRadioButton);
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_3","96");
            const g = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_g", NPTZ_WORDING.wID_0544);
            g.show();
            radioModeButtonGroup[RADIO_SYSTEM_G] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_g_", RADIO_GROUP.rID_0068,'0', callbackSystemTallyGRadioButton);
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_4","96");
            const y = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_y", NPTZ_WORDING.wID_0058,'0');
            y.show();
            radioModeButtonGroup[RADIO_SYSTEM_Y] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_y_", RADIO_GROUP.rID_0068,'0', callbackSystemTallyYRadioButton);
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_5","96");
            const tallyGuard = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_guard", NPTZ_WORDING.wID_0220,'0');
            tallyGuard.show();
            radioModeButtonGroup[RADIO_SYSTEM_TALLY_GUARD] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_guard_", RADIO_GROUP.rID_0052,'0', callbackSystemTallyGuardRadioButton);
            // $('#setting_basic_system_tally').append($('<div class="systemDivInnerLine6"></div>'));
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_11","96");
            const externalOutput = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_external_output", NPTZ_WORDING.wID_0222);
            externalOutput.show();
            LineCtrl("setting_basic_system_tally", "vertical", 0, 0, 0,"setting_basic_system_tally_6");
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_7","96");
            const output1 = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_output1", NPTZ_WORDING.wID_0223);
            output1.show();
            radioModeButtonGroup[RADIO_SYSTEM_OUTPUT1] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_output1_", RADIO_GROUP.rID_0019,'0', callbackSystemTallyOutput1RadioButton);
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_8","96");
            const output2 = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_output2", NPTZ_WORDING.wID_0224);
            output2.show();
            radioModeButtonGroup[RADIO_SYSTEM_OUTPUT2] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_output2_", RADIO_GROUP.rID_0019,'0', callbackSystemTallyOutput2RadioButton);
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_9","96");
            //Tally Brightness
            const tallyBrightness = TextCtrl("setting_basic_system_tally", "setting_basic_system_tally_brightness", NPTZ_WORDING.wID_0725);
            tallyBrightness.show();
            radioModeButtonGroup[RADIO_SYSTEM_TALLY_BRIGHTNESS] = RadioButtonGroupCtrl("setting_basic_system_tally", "setting_basic_system_tally_brightness_", RADIO_GROUP.rID_0018,'0', callbackSystemTallyBrightnessRadioButton);
            LineCtrl("setting_basic_system_tally", "horizontal", 0, 0, "","setting_basic_system_tally_10","96");

            // SYNC SIGNAL
            if (!isUE163) {
                const refSignalTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_ref_signal_title", NPTZ_WORDING.wID_0621);
                refSignalTitle.show();
                radioRefSignalButtonGroup[RADIO_REF_SIGNAL] = RadioButtonGroupCtrl("setting_basic_system_sync_signal", "setting_basic_system_ref_signal", RADIO_GROUP.rID_0073, getRefSignal(), setRefSignal);
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine1"></div>'));

                const genlockTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_genlock_title", NPTZ_WORDING.wID_0625);
                genlockTitle.show()
                const hPhaseCoarseTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_h_phase_coarse_title", NPTZ_WORDING.wID_0626);
                hPhaseCoarseTitle.show()
                sliderHPhaseCoarse = SliderCtrl('setting_basic_system_sync_signal', 'setup_basic_system_h_phase_coarse_slider', 5, -5, cparam_get_h_phase_coarse(), doHPhaseCoarse, '');
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine2_GenLock systemDivInnerLine2_5"></div>'));
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine2_ver_Gen vertical_line_common"></div>'));
                const phaseFineTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_h_phase_fine_title", NPTZ_WORDING.wID_0624);
                phaseFineTitle.show()
                sliderHPhaseFine = SliderCtrl('setting_basic_system_sync_signal', 'setup_basic_system_h_phase_fine_slider', 100, -100, cparam_get_h_phase_fine(), doHPhaseFine, '');
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine3_5"></div>'));
            }else{
                const genlockTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_genlock_title isUE163", NPTZ_WORDING.wID_0625);
                genlockTitle.show()
                const hPhaseCoarseTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_h_phase_coarse_title isUE163", NPTZ_WORDING.wID_0626);
                hPhaseCoarseTitle.show()
                sliderHPhaseCoarse = SliderCtrl('setting_basic_system_sync_signal', 'setup_basic_system_h_phase_coarse_slider isUE163', 5, -5, cparam_get_h_phase_coarse(), doHPhaseCoarse, '');
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine2_GenLock systemDivInnerLine2_5 isUE163"></div>'));
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine2_ver_Gen vertical_line_common  isUE163"></div>'));
                const phaseFineTitle = TextCtrl("setting_basic_system_sync_signal", "setting_basic_system_h_phase_fine_title isUE163", NPTZ_WORDING.wID_0624);
                phaseFineTitle.show()
                sliderHPhaseFine = SliderCtrl('setting_basic_system_sync_signal', 'setup_basic_system_h_phase_fine_slider isUE163', 100, -100, cparam_get_h_phase_fine(), doHPhaseFine, '');
                $('#setting_basic_system_sync_signal').append($('<div class="systemDivInnerLine3_5 isUE163"></div>'));
            }
            // BAR ID
            // radio
            const barIdTitle = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id_title", NPTZ_WORDING.wID_0207);
            barIdTitle.show();
            radioModeButtonGroup[RADIO_SYSTEM_BAR_ID] = RadioButtonGroupCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id", RADIO_GROUP.rID_0001, getBarId(), setBarId);
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine1"></div>'));
            //Brightness
            const brightnessTitle = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_brightness_title", NPTZ_WORDING.wID_0612);
            brightnessTitle.show()
            sliderBrightness = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_brightness_slider', 100, 0, cparam_get_brightness(), doBrightness, '%');
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine2"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine3"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine4"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine5"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine6"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine7"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine8"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine9"></div>'));
            $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine10"></div>'));
            // $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine11"></div>'));
            // $('#setting_basic_system_bar_id').append($('<div class="systemDivInnerLine12"></div>'));
            const id1positionVTitle = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id1_position_v_title", NPTZ_WORDING.wID_0613);
            id1positionVTitle.show()
            sliderId1positionV = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_bar_id1_position_v_slider', 5, 0, cparam_get_id1_v_position(), doId1VPosition, '');
            const id1positionHTitle = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id1_position_h_title", NPTZ_WORDING.wID_0614);
            id1positionHTitle.show()
            sliderId1positionH = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_bar_id1_position_h_slider', 15, 0, cparam_get_id1_h_position(), doId1HPosition, '');
            const id1Title = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id1_title", NPTZ_WORDING.wID_0615);
            id1Title.show()           
            id1Input = InputCtrl("setting_basic_system_bar_id", 'setting_basic_system_bar_id1_input', 'setting_basic_system_bar_id1_input', 'setting_basic_system_bar_id1_input', cparam_get_id1(),doId1);
            id1Input.show();
            id1Input.displayOff();
            const id2positionVTitle = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id2_position_v_title", NPTZ_WORDING.wID_0616);
            id2positionVTitle.show()
            sliderId2positionV = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_bar_id2_position_v_slider', 5, 0, cparam_get_id2_v_position(), doId2VPosition, '');
            const id2positionHTitle = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id2_position_h_title", NPTZ_WORDING.wID_0617);
            id2positionHTitle.show()
            sliderId2positionH = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_bar_id2_position_h_slider', 15, 0, cparam_get_id2_h_position(), doId2HPosition, '');
            const id2Title = TextCtrl("setting_basic_system_bar_id", "setting_basic_system_bar_id2_title", NPTZ_WORDING.wID_0618);
            id2Title.show();
            id2Input = InputCtrl("setting_basic_system_bar_id", 'setting_basic_system_bar_id2_input', 'setting_basic_system_bar_id2_input', 'setting_basic_system_bar_id2_input', cparam_get_id2());
            id2Input.show();
            id2Input.displayOff();
            const offsetVTitle = TextCtrl("setting_basic_system_bar_id", "setup_basic_system_bar_offset_v_title", NPTZ_WORDING.wID_0619);
            offsetVTitle.show()    
            sliderOffsetV = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_bar_offset_v_slider', 89, 0, cparam_get_offset_v_position(), doOffsetVPosition, '');
            const offsetHTitle = TextCtrl("setting_basic_system_bar_id", "setup_basic_system_bar_offset_h_title", NPTZ_WORDING.wID_0620);
            offsetHTitle.show()   
            sliderOffsetH = SliderCtrl('setting_basic_system_bar_id', 'setup_basic_system_bar_offset_h_slider', 79, 0, cparam_get_offset_h_position(), doOffsetHPosition,'');

            id1Input.getInputObject().keyup(function (e) {
                var inputStr = id1Input.get();
                var repVal = inputStr.replace(/[^a-zA-Z0-9 \!\#\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\[\]\_\~\$\@\|]/g,'');

                if (inputStr.length > repVal.length) {
                    id1Input.val(repVal);
                }
            });

            id2Input.getInputObject().keyup(function (e) {
                var inputStr = id2Input.get();
                var repVal = inputStr.replace(/[^a-zA-Z0-9 \!\#\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\[\]\_\~\$\@\|]/g,'');

                if (inputStr.length > repVal.length) {
                    id2Input.val(repVal);
                }
            });

            id1Input.getInputObject().change(function (e) {
                cparam_set_id1(id1Input.get());
            });

            id1Input.getInputObject().keypress(function (e) {
                if (e.keyCode == 13) {
                    cparam_set_id1(id1Input.get());
                    return false;
                }
            });

            id2Input.getInputObject().change(function (e) {
                cparam_set_id2(id2Input.get());
            });

            id2Input.getInputObject().keypress(function (e) {
                if (e.keyCode == 13) {
                    cparam_set_id2(id2Input.get());
                    return false;
                }
            });

            systemStatus();
        }else {
            rebuild();
        }
    }

    function refreshSelectControl(){
        cparam_updateSystem();
        nowfreq = GetFreqMode();
        sFormat = cparam_get_format();
        uhdCropRadioDate = cparam_get_UHDCrop();
    }

    function systemStatus() {
        const sCameraModel = cparam_get_frequency();
        selectObject[SELECT_SYSTEM_FORMAT].val(sFormat);
        const val_format = $("#select_setting_basic_system_format option:selected").text();

        txtObjectStatus[TXT_FREQUENCY] = TextCtrl("setting_basic_system_status", "setting_basic_system_status_frequency",NPTZ_WORDING.wID_0195);
        txtObjectStatus[TXT_FREQUENCY_Value] = TextCtrl("setting_basic_system_status", "setting_basic_system_status_frequency_value",sCameraModel);
        txtObjectStatus[TXT_FORMAT] = TextCtrl("setting_basic_system_status", "setting_basic_system_status_format", NPTZ_WORDING.wID_0196);
        txtObjectStatus[TXT_FORMAT_Value] = TextCtrl("setting_basic_system_status", "setting_basic_system_status_format_value", val_format);

        for (let i = 0; i < txtObjectStatus.length; i++) {
            if(txtObjectStatus[i]){
                txtObjectStatus[i].show();
            }
        }
        for (let i = 0; i < systemTextObject.length; i++) {
            systemTextObject[i].show();
        }
        for (let i = 0; i < set_btnObject.length; i++) {
            if (i == 0 || i == 1 || i == 5) {
              set_btnObject[i].show();
              set_btnObject[i].displayOff();
            }
        }
        for (let i = 0; i < execute_btnObject.length; i++) {
            execute_btnObject[i].show();
            execute_btnObject[i].displayOff();
        }
        for (let select in selectObject) {
            selectObject[select].show();
            selectObject[select].displayOff();
        }

        $("#setup_system_labels").hide();
        btnObject[BTN_SETTING_STATUS_INDEX].displayOn();
        $("#setting_basic_system_status").show();
        InitThisPageStatus();
    }
    /**
     * 画面再構築処理
     */
    function rebuild() {
        InitThisPageStatus();
        for (let i = 0; i < btnObject.length; i++) {
            btnObject[i].show();
            btnObject[i].displayOff();
        }
        btnObject[BTN_SETTING_STATUS_INDEX].displayOn();
    }

    function cparam_get_h_phase_coarse(){
        let Value = _cparam_awCmd_sendRequset('QSL:09', 'OSL:09:');
        Value = parseInt(Value, 16);
        Value -= 128;
    
        return Value;
    }
    function cparam_get_h_phase_fine(){
        let Value = _cparam_awCmd_sendRequset('QSL:0A', 'OSL:0A:');
        Value = parseInt(Value, 16);
        Value -= 128;
    
        return Value;
    }
    function doHPhaseCoarse(){
        let sliderValue = Number(sliderHPhaseCoarse.getValue());
        cparam_set_h_phase_coarse(sliderValue);
    }
    function doHPhaseFine(){
        let sliderValue = Number(sliderHPhaseFine.getValue());
        cparam_set_h_phase_fine(sliderValue);
    }
    function doBrightness(){
        let sliderValue = Number(sliderBrightness.getValue());
        cparam_set_brightness(sliderValue);
    }
    function doId1(mouse) {
        if (mouse === 1111) {
            cparam_set_id1(id1Input.get());
        }
    }
    function doId1VPosition(){
        let sliderValue = Number(sliderId1positionV.getValue());
        cparam_set_id1_v_position(sliderValue);
    }
    function doId1HPosition(){
        let sliderValue = Number(sliderId1positionH.getValue());
        cparam_set_id1_h_position(sliderValue);
    }
    function doId2VPosition(){
        let sliderValue = Number(sliderId2positionV.getValue());
        cparam_set_id2_v_position(sliderValue);
    }
    function doId2HPosition(){
        let sliderValue = Number(sliderId2positionH.getValue());
        cparam_set_id2_h_position(sliderValue);
    }
    function doOffsetVPosition(){
        let sliderValue = Number(sliderOffsetV.getValue());
        cparam_set_offset_v_position(sliderValue);
    }
    function doOffsetHPosition(){
        let sliderValue = Number(sliderOffsetH.getValue());
        cparam_set_offset_h_position(sliderValue);
    }
    function InitThisPage() {
        const priority = getPriority();
        sPriority = priority.priority;
        sIp_addr = priority.ip_addr;
        sIp_addr2 = priority.ip_addr2;
        skind = priority.stream_type;
    }

    let txtObjectStatus = [];
    const TXT_FREQUENCY = 0;
    const TXT_FORMAT = 1;
    const TXT_FREQUENCY_Value = 16;
    const TXT_FORMAT_Value = 17;

    function InitThisPageStatus() {
        refreshSelectControl();
        refreshSystemFormat();
        let freq = "";
        if(nowfreq ==0 ){
            freq ="59.94Hz";
        }else if(nowfreq ==1 ){
            freq ="50Hz";
        }else if(nowfreq ==2 ){
            freq ="24Hz";
        }else if(nowfreq ==3 ){
            freq ="23.98Hz";
        }else if(nowfreq ==4 ){
            freq ="60Hz";
        }
        selectObject[SELECT_SYSTEM_FORMAT].val(sFormat);
        const val_format = $("#select_setting_basic_system_format option:selected").text();
        txtObjectStatus[TXT_FREQUENCY_Value].set(freq);
        txtObjectStatus[TXT_FORMAT_Value].set(val_format);
    }

    function refreshSystemFormat(){
        let select_system_format_value = [];
        let select_system_format_text = [];
        if (nowfreq == 0) {
            select_system_format_value.push(
                "19",
                "17",
                "26",
                "10",
                "14",
                "01"
            );
            select_system_format_text.push(
                '2160/59.94p',
                '2160/29.97p',
                '1080/119.88p',
                '1080/59.94p',
                '1080/29.97p',
                '720/59.94p'
            );
        } else if (nowfreq == 1) {
            select_system_format_value.push(
                "1A",
                "18",
                "27",
                "11",
                "15",
                "02"
            );
            select_system_format_text.push(
                '2160/50p',
                '2160/25p',
                '1080/100p',
                '1080/50p',
                '1080/25p',
                '720/50p'
            );
        } else if (nowfreq == 2) {
            select_system_format_value.push(
                "21",
                "22"
            );
            select_system_format_text.push(
                '2160/24p',
                '1080/24p'
            );
        } else if (nowfreq == 3) {
            select_system_format_value.push(
                "1B",
                "23"
            );
            select_system_format_text.push(
                '2160/23.98p',
                '1080/23.98p'
            );
        } else if (nowfreq == 4) {
            select_system_format_value.push(
                "1F",
                "20"
            );
            select_system_format_text.push(
                "2160/60p",
                '1080/60p'
            );
        }
        selectObject[SELECT_SYSTEM_FORMAT].appendOptions(select_system_format_value, select_system_format_text);
    }

    function InitThisPageFrequency(){
        radioModeButtonGroup[RADIO_SYSTEM_FREQUENCY].setSelectedValue(cparam_get_frequency());
    }

    function InitThisPageFormat(){
        if( nowfreq != GetFreqMode()) {
            nowfreq = GetFreqMode();
            refreshSystemFormat();
        }
        selectObject[SELECT_SYSTEM_FORMAT].val(cparam_get_format());
        radioModeButtonGroup[RADIO_SYSTEM_FPS_SW].setSelectedValue(cparam_get_fps_sw());
        radioModeButtonGroup[RADIO_SYSTEM_FPS].setSelectedValue(cparam_get_fps());
        callbackSelectFormat();
    }

    function InitThisPageSFPMode(){
        radioModeButtonGroup[RADIO_SYSTEM_SFP_MODE].setSelectedValue(cparam_get_SFPMode());
    }

    function InitThisPageVLog(){
        if (cparam_get_hdr() == 0) {
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG].setEnable("0,1");
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setEnable("0,1");

            radioModeButtonGroup[RADIO_SYSTEM_V_LOG].setSelectedValue(cparam_get_v_log());
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setSelectedValue(cparam_get_v_log_paint_sw());

            if(cparam_get_v_log() == 0) {
                radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setDisable("0,1");
            } else {
                radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setEnable("0,1");
            }
        }
        else {
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG].setDisable("0,1");
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setDisable("0,1");
        }
    }

    function InitThisPageHDR() {
        if (cparam_get_v_log() == 0) {
            radioModeButtonGroup[RADIO_SYSTEM_HDR].setEnable("0,1");
            radioModeButtonGroup[RADIO_SYSTEM_HDR].setSelectedValue(cparam_get_hdr());
        }
        else {
            radioModeButtonGroup[RADIO_SYSTEM_HDR].setDisable("0,1");
        }
    }

    function InitThisPageGamut(){
        radioModeButtonGroup[RADIO_SYSTEM_GAMUT].setSelectedValue(cparam_get_gamut());

        if(cparam_get_hdr() == 0) {
            radioModeButtonGroup[RADIO_SYSTEM_GAMUT].setDisable("0,1");
        } else {
            radioModeButtonGroup[RADIO_SYSTEM_GAMUT].setEnable("0,1");
        }
    }

    function InitThisPageShootingMode(){
        radioModeButtonGroup[RADIO_SYSTEM_SHOOTING_MODE].setSelectedValue(cparam_get_shooting_mode());
    }

    function InitThisPageSerialConnection(){
        radioModeButtonGroup[RADIO_SYSTEM_SERIAL_CONNECTION].setSelectedValue(cparam_get_serial_connection());
        TrackingDataOutpitSerialControl();
    }

    function TrackingDataOutpitSerialControl() {
        var serial = cparam_get_Serial();

        if(serial == 1) {
            radioModeButtonGroup[RADIO_SYSTEM_SERIAL_CONNECTION].setDisable("0,1,2");
        } else {
            radioModeButtonGroup[RADIO_SYSTEM_SERIAL_CONNECTION].setEnable("0,1,2");
        }
    }

    function InitThisPageBar(){
        radioModeButtonGroup[RADIO_SYSTEM_BAR].setSelectedValue(cparam_get_bar());
        radioModeButtonGroup[RADIO_SYSTEM_BAR_COLOR_TYPE].setSelectedValue(cparam_get_colorBarType());
        radioModeButtonGroup[RADIO_SYSTEM_TONE].setSelectedValue(cparam_get_tone());
    }
    function InitThisPageLevelGauge(){
        // radioModeButtonGroup[RADIO_SYSTEM_LEVEL_GAUGE].setSelectedValue(cparam_get_levelGauge());
    }
    function InitThisPageTally(){
        radioModeButtonGroup[RADIO_SYSTEM_TALLY].setSelectedValue(cparam_get_tally());
        radioModeButtonGroup[RADIO_SYSTEM_TALLY_BRIGHTNESS].setSelectedValue(cparam_get_tally_brightness());
        radioModeButtonGroup[RADIO_SYSTEM_R].setSelectedValue(cparam_get_tally_led_limit_r());
        radioModeButtonGroup[RADIO_SYSTEM_G].setSelectedValue(cparam_get_tally_led_limit_g());
        radioModeButtonGroup[RADIO_SYSTEM_Y].setSelectedValue(cparam_get_tally_led_limit_y());
        radioModeButtonGroup[RADIO_SYSTEM_TALLY_GUARD].setSelectedValue(cparam_get_tally_guard());
        radioModeButtonGroup[RADIO_SYSTEM_OUTPUT1].setSelectedValue(cparam_get_output1());
        radioModeButtonGroup[RADIO_SYSTEM_OUTPUT2].setSelectedValue(cparam_get_output2());
    }
    function InitThisPageSyncSignal(){
        if((isUE160 || isUCW4380) && !isUE163){
            radioRefSignalButtonGroup[RADIO_REF_SIGNAL].setSelectedValue(cparam_get_ref_signal());
        }
        sliderHPhaseCoarse.setValue(cparam_get_h_phase_coarse());
        sliderHPhaseFine.setValue(cparam_get_h_phase_fine());

        //cparam_get_h_phase_coarse
        SFPModeControlMenu();
    }
    function getSt2110Info() {
        var url = "/cgi-bin/get_st2110_info";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
        }
        return ret;
    }
    function getSt2110InfoResult(ret) {
        var result = { enable: "", port: "" };
        if (ret) {
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf('enable=') == 0) {
                    result.enable = ret[i].substring('enable='.length);
                    continue;
                }
                if (ret[i].indexOf('port=') == 0) {
                    result.port = ret[i].substring('port='.length);
                    continue;
                }
            }
        }
        return result;
    }

    function SFPModeControlMenu() {
        var is12GOutput = cparam_get_SFPMode();

        var objSt2110Info = getSt2110Info();
        var st2110Status = getSt2110InfoResult(objSt2110Info);
        var st2110EnableState = st2110Status["enable"] == "1" ? true : false;

        if((is12GOutput == 0 || cparam_get_moip_active_status() == "NG" || !st2110EnableState) && (isUE160 || isUCW4380) && !isUE163) {
            if((isUE160 || isUCW4380) && !isUE163){
                radioRefSignalButtonGroup[RADIO_REF_SIGNAL].setDisable("1");
            }

        } else {
            if((isUE160 || isUCW4380) && !isUE163){
                radioRefSignalButtonGroup[RADIO_REF_SIGNAL].setEnable("1");
            }
        }

        if(cparam_get_ref_signal() == 1) {
            sliderHPhaseCoarse.setDisable();
            sliderHPhaseFine.setDisable();
        } else {    
            sliderHPhaseCoarse.setEnable();
            sliderHPhaseFine.setEnable();
        }
    }

    function InitThisPageBarId(){
        radioModeButtonGroup[RADIO_SYSTEM_BAR_ID].setSelectedValue(cparam_get_bar_id());
        sliderBrightness.setValue(cparam_get_brightness());
        sliderId1positionV.setValue(cparam_get_id1_v_position());
        sliderId1positionH.setValue(cparam_get_id1_h_position());
        id1Input.val(cparam_get_id1());
        sliderId2positionV.setValue(cparam_get_id2_v_position());
        sliderId2positionH.setValue(cparam_get_id2_h_position());
        id2Input.val(cparam_get_id2());
        sliderOffsetV.setValue(cparam_get_offset_v_position());
        sliderOffsetH.setValue(cparam_get_offset_h_position());
    }
    function callbackSetFreq(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            if ((radioModeButtonGroup[RADIO_SYSTEM_FREQUENCY].getSelectedValue() == '2')
                && (getStreamMode() == CONST_STREAM_MODE_NDI_HX || getStreamMode() == CONST_STREAM_MODE_NDI_UHD)) {
                    jAlert(MSG_STATUS.mID_0111, NPTZ_WORDING.wID_0039);
                    return;
                } else if((radioModeButtonGroup[RADIO_SYSTEM_FREQUENCY].getSelectedValue() == '3')
                && (getStreamMode() == CONST_STREAM_MODE_NDI_HX || getStreamMode() == CONST_STREAM_MODE_NDI_UHD)) {
                jAlert(MSG_STATUS.mID_0111, NPTZ_WORDING.wID_0039);
                return;
            }
            DoSubmitFreq();
        }
    }
    /**
     * callbackDosubmitボタン押下時の処理
     */
    function callbackDoSystemsubmit(mouse,index) {
        if (mouse == Button.MOUSE_DOWN) {
            if (index == 1 && (is24fpsFormat(getFormatName(selectObject[SELECT_SYSTEM_FORMAT].get())))
                && getStreamMode() == CONST_STREAM_MODE_NDI_HX){
                jAlert(MSG_STATUS.mID_0051,NPTZ_WORDING.wID_0039);
                return;
            }
            $("#dialog_setup").show();
            if( index == 0) {
            }else if(index == 1){
                let format = selectObject[SELECT_SYSTEM_FORMAT].get();
                cparam_set_format(format);
                if(format == '11'){ // Format=1080/50pの場合だけ有効
                    cparam_set_fps_sw(radioModeButtonGroup[RADIO_SYSTEM_FPS_SW].getSelectedValue());
                    cparam_set_fps(radioModeButtonGroup[RADIO_SYSTEM_FPS].getSelectedValue());
                }
            }else if(index == 2){
                cparam_set_SFPMode(radioModeButtonGroup[RADIO_SYSTEM_SFP_MODE].getSelectedValue());
            }else if(index == 3){
                cparam_set_v_log(radioModeButtonGroup[RADIO_SYSTEM_V_LOG].getSelectedValue());
                cparam_set_v_log_paint_sw(radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].getSelectedValue());
            }else if(index == 4){
                cparam_set_hdr(radioModeButtonGroup[RADIO_SYSTEM_HDR].getSelectedValue());
            }else if(index == 5){
                //gamut
            }else if(index == 6){
                cparam_set_shooting_mode(radioModeButtonGroup[RADIO_SYSTEM_SHOOTING_MODE].getSelectedValue());
            }else if(index == 7){
                cparam_set_serial_connection(radioModeButtonGroup[RADIO_SYSTEM_SERIAL_CONNECTION].getSelectedValue())
            }else if (index == 8) {
                
            }else if (index == 9) {
                
            }else if (index == 10) {
                
            }else if (index == 11) {
                
            }else if (index == 12) {
                
            }
            setTimeout(function(){
                $("#dialog_setup").hide();
            }, 500);
        }
    }

    function callbackSystemStatus(mouse, index) {
        if (mouse == Button.MOUSE_DOWN) {
            destroyMyScroll();
            $("#setup_system_other_form").show();
            if (index == 0) {
                //status
                $("#setup_system_other_form").hide();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").show();
                $("#setting_basic_system_labels").show();
                InitThisPageStatus();
            }
            else if (index == 1) {
                //frequency
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").show();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageFrequency();
            }
            else if (index == 2) {
                //format
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").show();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageFormat();
            }
            else if (index == 3) {
                //SFP Mode
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").show();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageSFPMode();
            }
            else if (index == 4) {
                //v-log
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").show();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageVLog();
            }
            else if (index == 5) {
                //HDR
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').show();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageHDR();
            }
            else if (index == 6) {
                //GAMUT
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').show();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageGamut();
            }
            else if (index == 7) {
                //shooting mode
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").show();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageShootingMode();
            }
            else if (index == 8) {
                //serial connection
                $("#setup_system_other_form").show()
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").show();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageSerialConnection();
            }
            else if (index == 9) {
                //bar
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").show();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageBar();
            }
            else if (index == 10) {
                //level gauge
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").show();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageLevelGauge();
            }
            else if (index == 11) {
                //tally
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").show();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageTally();
            }
            else if (index == 12) {
                //sync signal
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").show();
                $("#setting_basic_system_bar_id").hide();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageSyncSignal();
            }
            else if (index == 13) {
                //bar id
                $("#setup_system_other_form").show();
                $("#setting_basic_system_frequency").hide();
                $("#setting_basic_system_format").hide();
                $("#setting_basic_system_sfp_mode").hide();
                $("#setting_basic_system_v_log").hide();
                $('#setting_basic_system_hdr').hide();
                $('#setting_basic_system_gamut').hide();
                $("#setting_basic_system_shooting_mode").hide();
                $("#setting_basic_system_serial_connection").hide();
                $("#setting_basic_system_bar").hide();
                $("#setting_basic_system_level_gauge").hide();
                $("#setting_basic_system_tally").hide();
                $("#setting_basic_system_sync_signal").hide();
                $("#setting_basic_system_bar_id").show();
                $("#setting_basic_system_status").hide();
                $("#setting_basic_system_labels").hide();
                InitThisPageBarId();
            }
        }
    }

    function destroyMyScroll(){
        if(myScroll!=null){
            myScroll.destroy();
            myScroll = null;
        }
    }
    function buildMyScroll(){
        if(buildScrollSuccessFlg) {
            buildScrollSuccessFlg = false;
            setTimeout(function () {
                myScroll = new IScroll('#setup_system_output_main', {
                    preventDefault: false,
                    click: false,
                    tap: true,
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: false,
                    useTransform: false
                });
                buildScrollSuccessFlg = true;
            }, 1500)
        }
    }

    function callbackSelectFormat() {
        let format = selectObject[SELECT_SYSTEM_FORMAT].get();
        if(format == "11") { // Format=1080/50pの場合だけ有効
            radioModeButtonGroup[RADIO_SYSTEM_FPS_SW].displayOff();
            radioModeButtonGroup[RADIO_SYSTEM_FPS].displayOff();
        } else {
            radioModeButtonGroup[RADIO_SYSTEM_FPS_SW].displayDisabled();
            radioModeButtonGroup[RADIO_SYSTEM_FPS].displayDisabled();
        }
    }

    function callbackFpsSw() {
    
    }
    
    function callbackFps() {
    
    }

    function callbackSfpModeRadioButton(){
        // cparam_set_SFPMode(radioModeButtonGroup[RADIO_SYSTEM_SFP_MODE].getSelectedValue());
        window.jConfirm(MSG_STATUS.mID_0062, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
            if(confirm){
                clearInterval(refresh_power_id);
                $("#dialog_setup").show();
                cparam_set_SFPMode(radioModeButtonGroup[RADIO_SYSTEM_SFP_MODE].getSelectedValue());
                checkIfSetFreqSuccess();
            }else{
                return;
            }
        });
    }

    function callbackVlogRadioButton(){
        cparam_set_v_log(radioModeButtonGroup[RADIO_SYSTEM_V_LOG].getSelectedValue());

        if(radioModeButtonGroup[RADIO_SYSTEM_V_LOG].getSelectedValue() == 0) {
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setDisable("0,1");
        } else {
            radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].setEnable("0,1");
        }
    }
    function callbackVlogPaintSwRadioButton(){
        cparam_set_v_log_paint_sw(radioModeButtonGroup[RADIO_SYSTEM_V_LOG_PAINT_SW].getSelectedValue());
    }
    function callbackGamutRadioButton(value,a,b){
        // cparam_set_gamut(radioModeButtonGroup[RADIO_SYSTEM_GAMUT].getSelectedValue())
        cparam_set_gamut(value)
    }
    function callbackShootingRadioButton(){
        cparam_set_shooting_mode(radioModeButtonGroup[RADIO_SYSTEM_SHOOTING_MODE].getSelectedValue())
    }
    function callbackSerialConnectionRadioButton(){
        cparam_set_serial_connection(radioModeButtonGroup[RADIO_SYSTEM_SERIAL_CONNECTION].getSelectedValue())
    }

    function callbackBarRadioButtion() {
        cparam_set_bar(radioModeButtonGroup[RADIO_SYSTEM_BAR].getSelectedValue());
    }

    function callbackColorBarType(){
        cparam_set_colorBarType(radioModeButtonGroup[RADIO_SYSTEM_BAR_COLOR_TYPE].getSelectedValue());
    }

    function callbackBarToneRadioButtion() {
        cparam_set_tone(radioModeButtonGroup[RADIO_SYSTEM_TONE].getSelectedValue());
    }

    function callbackHdrRadioButton() {
        cparam_set_hdr(radioModeButtonGroup[RADIO_SYSTEM_HDR].getSelectedValue());

        if(radioModeButtonGroup[RADIO_SYSTEM_HDR].getSelectedValue() == 0) {
            radioModeButtonGroup[RADIO_SYSTEM_GAMUT].setDisable("0,1");
        } else {
            radioModeButtonGroup[RADIO_SYSTEM_GAMUT].setEnable("0,1");
        }
    }

    function callbackLevelGaugeRadioButton () {
        cparam_set_levelGauge(radioModeButtonGroup[RADIO_SYSTEM_LEVEL_GAUGE].getSelectedValue());
    }

    //Tally
    function callbackSystemTallyRadioButton() {
        cparam_set_tally(radioModeButtonGroup[RADIO_SYSTEM_TALLY].getSelectedValue());
    }
    //Tally Brightness
    function callbackSystemTallyBrightnessRadioButton() {
        cparam_set_tally_brightness(radioModeButtonGroup[RADIO_SYSTEM_TALLY_BRIGHTNESS].getSelectedValue());
    }

    //R
    function callbackSystemTallyRRadioButton() {
        cparam_set_tally_led_limit_r(radioModeButtonGroup[RADIO_SYSTEM_R].getSelectedValue());
    }
    //G
    function callbackSystemTallyGRadioButton() {
        cparam_set_tally_led_limit_g(radioModeButtonGroup[RADIO_SYSTEM_G].getSelectedValue());
    }
    //Y
    function callbackSystemTallyYRadioButton() {
        cparam_set_tally_led_limit_y(radioModeButtonGroup[RADIO_SYSTEM_Y].getSelectedValue());
    }
    //Tally Guard
    function callbackSystemTallyGuardRadioButton() {
        cparam_set_tally_guard(radioModeButtonGroup[RADIO_SYSTEM_TALLY_GUARD].getSelectedValue());
    }
    //Output1
    function callbackSystemTallyOutput1RadioButton() {
        cparam_set_output1(radioModeButtonGroup[RADIO_SYSTEM_OUTPUT1].getSelectedValue());
    }
    //Output2
    function callbackSystemTallyOutput2RadioButton() {
        cparam_set_output2(radioModeButtonGroup[RADIO_SYSTEM_OUTPUT2].getSelectedValue());
    }

    function priorityStreamRadioButton(){
        
    }
    
    function getRefSignal(){
        return cparam_get_ref_signal();
    }
    function setRefSignal(){
        if(isUE163) return;
        cparam_set_ref_signal(radioRefSignalButtonGroup[RADIO_REF_SIGNAL].getSelectedValue())

        if(radioRefSignalButtonGroup[RADIO_REF_SIGNAL].getSelectedValue() == 1) {
            sliderHPhaseCoarse.setDisable();
            sliderHPhaseFine.setDisable();
        } else {
            sliderHPhaseCoarse.setEnable();
            sliderHPhaseFine.setEnable();
        }
    }

    function setBarId(){
        cparam_set_bar_id(radioModeButtonGroup[RADIO_SYSTEM_BAR_ID].getSelectedValue())
    }

    function DoSubmitFreq() {
        var request = radioModeButtonGroup[RADIO_SYSTEM_FREQUENCY].getSelectedValue();
        var now = cparam_get_frequency();
        if (request != now) {
            window.jConfirm(MSG_STATUS.mID_0062, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                if(confirm){
                    clearInterval(refresh_power_id);
                    $("#dialog_setup").show();
                    cparam_set_frequency(request);
                    checkIfSetFreqSuccess();
                }else{
                    return;
                }
            });
        }
    }

    function checkIfSetFreqSuccess() {
        intervId = setInterval(function () {
                sendHeartBeat();
            }, 10000);
    }

    function sendHeartBeat() {
        var url = '/cgi-bin/aw_cam?cmd=QID&res=1';
        var xhr = null;
        xhr = myDOM.ajax.GetHttpRequest(url, DbgCallback2);
    }

    function DbgCallback2(xhr) {
        if (xhr.responseText == "OID:AW-UE160" || xhr.responseText == "OID:AW-UE100") {
            clearInterval(intervId);
            $("#dialog_setup").hide();
            window.location.href = '/admin/index.html';
        }
    }

    function GetFreqMode()
    {
        return cparam_get_frequency();
    }

    function getBarId()
    {
         return cparam_get_bar_id();
    }


    function getPriority() {
        var url = "/cgi-bin/get_priority";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("priority=") == 0) {
                    result.priority = ret[i].substring("priority=".length);
                    continue;
                }
                if (ret[i].indexOf("ip_addr=") == 0) {
                    result.ip_addr = ret[i].substring("ip_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip_addr2=") == 0) {
                    result.ip_addr2 = ret[i].substring("ip_addr2=".length);
                    continue;
                }
                if (ret[i].indexOf("stream_type=") == 0) {
                    result.stream_type = ret[i].substring("stream_type=".length);
                }
            }
        }

        return result;
    }

    return {
        InitThisPage: InitThisPage,
        build: build,
        destroyMyScroll:destroyMyScroll,
        buildMyScroll:buildMyScroll,
        callbackSystemStatus:callbackSystemStatus,
        refreshSyncSignalSlider: function () {
            sliderHPhaseCoarse.refresh();
            sliderHPhaseFine.refresh();
        },
        refreshBarIdSlider: function () {
            sliderBrightness.refresh();
            sliderId1positionV.refresh();
            sliderId1positionH.refresh();
            sliderId2positionV.refresh();
            sliderId2positionH.refresh();
            sliderOffsetV.refresh();
            sliderOffsetH.refresh();
        }
    }
}