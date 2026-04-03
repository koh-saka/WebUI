/**
 * @fileOverview Setup画面:basic制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var settingBasic = settingBasic();

/**
 * setup画面:basic制御に関わる画面クラス
 * @class setup画面:basic制御に関わる画面クラス
 * @return {function} show 表示処理
 * @return {function} hide 非表示処理
 * @constructor
 */

function settingBasic() {
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildSetupPanTiltFlag = false;
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildSetupDateTimeFlag = false;
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildSetupLivePageFlag = false;

    /**
     * labelオブジェクト
     * @type txtDateTimeObject[]
     */
    var txtDateTimeObject = [];
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_AUTO = 0;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL = 1;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_PC = 2;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_NTP = 3;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_DATE_TIME = 4;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_TIME_ZONE = 5;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_YEAR = 9;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_MONTH = 10;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_DAY = 11;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_HOUR = 12;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_MIN = 13;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_DATE_MANUAL_SEC = 14;

    /**
     * ボタンオブジェクト
     * @type btnDateTimeObject[]
     */
    var btnDateTimeObject = [];
    /**
     * button定義
     * @type number
     */
    var BTN_BASIC_DATE_EXECUTE = 0;
    /**
     * button定義
     * @type number
     */
    var BTN_BASIC_DATE_NTP = 1;
    /**
     * button定義
     * @type number
     */
    var BTN_BASIC_DATE_SET = 2;

    /**
     * ボタンオブジェクト
     * @type selectDateTimeObject[]
     */
    var selectDateTimeObject = [];
    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_HOUR = 0;
    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_MIN = 2;
    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_SEC = 3;

    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_YEAR = 4;
    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_MONTH = 5;
    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_DAY = 6;
    /**
     * select定義
     * @type number
     */
    var SELECT_BASIC_DATE_TIMEZONE = 7;
    var TXT_BASIC_DATE_TITLE =17;
    var TXT_BASIC_DATE_LIVE_TITLE=18;
    var isDataTimeChange = false;

    var isTimeZoneChange = false;

    var txtObject = [];
    const INITALL_POSLTION = 0;
    const SMART_PICTURE = 1;
    const SMART_MODE = 2;
    const SMART_FLIP = 3;
    const P_T_SPEED = 4;
    const P_T_ACCELERATION_SETTING =5
    const P_T_ACCELERATION =6;
    const RISE_S_CURVE = 7;
    const FALL_CURVE = 8;
    const RISE_ACCELERATION = 9;
    const FALL_ACCELERATION = 10;
    const SPEED_WITH_ZOOM = 11;
    const FOCUS_ADJUST = 12;
    const PRIVACY_MODE = 13;
    const POWER_ON_POSITON  = 14;
    const PRESET_NUMBER  = 15;
    const SPEED_WITH_ZOOM_MODE = 16;
    const panDiv = "setting_basic_system_pan_scroll";
    const panOutDiv= "setup_system_pan_form";
    const panOutDiv_line= "setup_system_div";
    const panPartDiv = "setup_system_pan_part_form";
    const radioPanTiltButtonGroup = [];
    const RADIO_SYSTEM_PAN_INSTALL = 0;
    const RADIO_SYSTEM_PAN_SPEED_MODE = 1;
    const RADIO_SYSTEM_PAN_SPEED_ZOOM = 2;
    const RADIO_SYSTEM_PAN__FOCUS_ADJUST = 3;
    const RADIO_SYSTEM_POWER_ON_POSITION = 4;
    const RADIO_SYSTEM_PRIVACY_MODE = 5;
    const RADIO_SYSTEM_PT_ACCELERATION = 6;
    const RADIO_SYSTEM_SMART_PICTURE_MODE = 7;
    const RADIO_SYSTEM_PAN_SPEED_ZOOM_MODE = 8;
    var selectObject = [];
    var SELECT_SYSTEM_PRESET_NUMBER =0;
    var sliderFlipDetectAngle;
    var sliderRiseCurve;
    var sliderFallCurve;
    var sliderRiseAcceleration;
    var sliderFallAcceleration;
    let myScroll = null;
    var buildScrollSuccessFlg = true;
    /**
     * Pan/Ttilt画面構築処理
     */
    function buildSetupPantilt(){
        if(!buildSetupPanTiltFlag){
            buildSetupPanTiltFlag = true;
            txtObject[INITALL_POSLTION] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_install", NPTZ_WORDING.wID_0225);
            txtObject[SMART_PICTURE] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_status_smart_picture", NPTZ_WORDING.wID_0226);
            txtObject[SMART_MODE] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_status_smart_mode", NPTZ_WORDING.wID_0227);
            txtObject[SMART_FLIP] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_status_smart_flip", NPTZ_WORDING.wID_0228);
            txtObject[P_T_SPEED] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_p_t_speed", NPTZ_WORDING.wID_0229);
            txtObject[P_T_ACCELERATION_SETTING] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_p_t_acceleration_setting", NPTZ_WORDING.wID_0502);
            txtObject[P_T_ACCELERATION] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_p_t_acceleration", NPTZ_WORDING.wID_0501);
            txtObject[RISE_S_CURVE] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_rise_s_curve", NPTZ_WORDING.wID_0495);
            txtObject[FALL_CURVE] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_fall_curve", NPTZ_WORDING.wID_0496);
            txtObject[RISE_ACCELERATION] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_rise_acceleration", NPTZ_WORDING.wID_0497);
            txtObject[FALL_ACCELERATION] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_fall_acceleration", NPTZ_WORDING.wID_0498);
            txtObject[SPEED_WITH_ZOOM] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_speed_with_zoom", NPTZ_WORDING.wID_0230);
            txtObject[SPEED_WITH_ZOOM_MODE] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_speed_with_zoom_mode", NPTZ_WORDING.wID_0941);
            txtObject[FOCUS_ADJUST] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_focus_adjust", NPTZ_WORDING.wID_0231);
            txtObject[PRIVACY_MODE] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_privacy_mode", NPTZ_WORDING.wID_0490);
            txtObject[POWER_ON_POSITON] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_power_on_position", NPTZ_WORDING.wID_0232);
            txtObject[PRESET_NUMBER] = TextCtrl("setup_system_pan_tilt_labels", "setting_basic_system_preset_number", NPTZ_WORDING.wID_0233);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_INSTALL] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_pan_install", RADIO_GROUP.rID_0020, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_MODE] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_pan_pt_speed", RADIO_GROUP.rID_0022, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_ZOOM] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_pan_speed_with_zoom", RADIO_GROUP.rID_0016, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_ZOOM_MODE] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_pan_speed_with_zoom_mode", RADIO_GROUP.rID_0110, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN__FOCUS_ADJUST] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_pan_focus_adjust", RADIO_GROUP.rID_0016, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_POWER_ON_POSITION] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_power_on_position_", RADIO_GROUP.rID_0023, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PRIVACY_MODE] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_privacy_mode_", RADIO_GROUP.rID_0016, '0', priorityStreamRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_PT_ACCELERATION] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_pt_acceleration_", RADIO_GROUP.rID_0029, '0', ptAccelerationRadioButton);
            radioPanTiltButtonGroup[RADIO_SYSTEM_SMART_PICTURE_MODE] = RadioButtonGroupCtrl("setup_system_pan_tilt_form", "setting_basic_system_smart_picture_mode_", RADIO_GROUP.rID_0021, '0', ptAccelerationRadioButton);
            sliderFlipDetectAngle = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_flip_detect_angle_slider', 120, 60, 90, DoSubmitFDA, '')
            sliderRiseCurve = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_riseCurve_slider', 30, 0, 90, DoSubmitFDA, '')
            sliderFallCurve = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_fallCurve_slider', 30, 0, 90, DoSubmitFDA, '')
            sliderRiseAcceleration = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_rise_acceleration_slider', 255, 1, 90, DoSubmitFDA, '')
            sliderFallAcceleration = SliderCtrl("setup_system_pan_tilt_form", 'setup_basic_system_fallacceleration_slider', 255, 1, 90, DoSubmitFDA, '')
  
            selectObject[SELECT_SYSTEM_PRESET_NUMBER] = SelectCtrl("setup_system_pan_tilt_form", "setting_basic_system_pan_preset_number", "setting_basic_system_pan_preset_number", "setting_basic_system_pan_preset_number");
            let presetNumberKey = [];
            let presetNumberValue = [];
            for(i= 0; i < 100;i++){
                presetNumberKey[i] = ('0' + (i)).slice(-2);
                presetNumberValue[i] = 'Preset' + ('000' + (i + 1)).slice(-3);
            }

            selectObject[SELECT_SYSTEM_PRESET_NUMBER].appendOptions(presetNumberKey, presetNumberValue,'00');
            for (let select in selectObject) {
                selectObject[select].show();
                selectObject[select].displayOff();
            }
            for (var txt in txtObject) {
                txtObject[txt].show();
            }
            var btnPanSet = ButtonCtrl("setup_system_pan_tilt_form", "btn_system_pan_set", NPTZ_WORDING.wID_0141, callbackDoSystemsubmit, 6);
            btnPanSet.show();
            btnPanSet.displayOff();
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine0"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine1"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine2"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine3"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine4"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine5"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine6"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine7"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine8"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine9"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine10"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine11"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine12"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine13"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine14"></div>'));   
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine15"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine16"></div>'));
            $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine17"></div>'));
            // $('#setting_basic_system_pan_inner').append($('<div class="systemPanTiltLine18"></div>'));
            LineCtrl("setting_basic_system_pan_inner", "vertical", 0, 0, 0,"setting_basic_system_pan_tilt_smart_picture");
            LineCtrl("setting_basic_system_pan_inner", "vertical", 0, 0, 0,"setting_basic_system_pan_tilt_acceleration");
            LineCtrl("setting_basic_system_pan_inner", "vertical", 0, 0, 0,"setting_basic_system_speed_with_zoom_mode");
            destroyMyScroll();
            buildMyScroll();
            InitThisPagePan();
        }else{
            destroyMyScroll();
            buildMyScroll();
            InitThisPagePan();
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
                myScroll = new IScroll('#setting_basic_system_pan_scroll', {
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
            }, 300)
        }
    }
    function InitThisPagePan(){
        // if(isUE80){
            sliderFlipDetectAngle.setValue(cparam_get_flipDetectAngle());
            sliderRiseCurve.setValue(cparam_get_riseCurve());
            sliderFallCurve.setValue(cparam_get_fallCurve());
            sliderRiseAcceleration.setValue(cparam_get_riseAcceleration());
            sliderFallAcceleration.setValue(cparam_get_fallAcceleration());
            //#4924
            radioPanTiltButtonGroup[RADIO_SYSTEM_PT_ACCELERATION].setSelectedValue(cparam_get_pt_acceleration());
            ptAccelerationRadioButton();
        // }else{
            if(cparam_get_usb_auto_standby() == 1){
                radioPanTiltButtonGroup[RADIO_SYSTEM_PRIVACY_MODE].displayDisabled();
                radioPanTiltButtonGroup[RADIO_SYSTEM_POWER_ON_POSITION].displayDisabled();
            }else{
                radioPanTiltButtonGroup[RADIO_SYSTEM_PRIVACY_MODE].displayOff();
                radioPanTiltButtonGroup[RADIO_SYSTEM_POWER_ON_POSITION].displayOff();
            }
        // }
        let smartPictureFlip = cparam_get_smartPictureFlip();
        radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_INSTALL].setSelectedValue(cparam_get_installPosition());
        radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_MODE].setSelectedValue(cparam_get_PTSpeedMode());
        radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_ZOOM].setSelectedValue(cparam_get_speedWithZoomPOS());
        radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_ZOOM_MODE].setSelectedValue(cparam_get_speedWithZoomPosMode());
        radioPanTiltButtonGroup[RADIO_SYSTEM_SMART_PICTURE_MODE].setSelectedValue(smartPictureFlip);
        if(cparam_get_focusMode() == 1) {
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN__FOCUS_ADJUST].displayDisabled();
        } else {
            radioPanTiltButtonGroup[RADIO_SYSTEM_PAN__FOCUS_ADJUST].displayOff();
        }
        event.stopPropagation()
        radioPanTiltButtonGroup[RADIO_SYSTEM_PAN__FOCUS_ADJUST].setSelectedValue(cparam_get_focusADJWithPTZ());
        radioPanTiltButtonGroup[RADIO_SYSTEM_POWER_ON_POSITION].setSelectedValue(cparam_get_powerOnPosition());
        radioPanTiltButtonGroup[RADIO_SYSTEM_PRIVACY_MODE].setSelectedValue(cparam_get_privacyMode());
        //radioModeButtonGroup[RADIO_SYSTEM_PT_ACCELERATION].setSelectedValue(cparam_get_pt_acceleration());
        selectObject[SELECT_SYSTEM_PRESET_NUMBER].val(('0' + (cparam_get_powerOnPresetNumber())).slice(-2));
        //ptAccelerationRadioButton();
        if(smartPictureFlip == 0){
            sliderFlipDetectAngle.setDisable();
        }else{
            sliderFlipDetectAngle.setEnable();
        }
        if(cparam_get_pt_acceleration() == 1) {
            sliderRiseCurve.setDisable();
            sliderFallCurve.setDisable();
            sliderRiseAcceleration.setDisable();
            sliderFallAcceleration.setDisable();
        } else {
            sliderRiseCurve.setEnable();
            sliderFallCurve.setEnable();
            sliderRiseAcceleration.setEnable();
            sliderFallAcceleration.setEnable();
        }
    }
    /**
     * callbackDosubmitボタン押下時の処理
     */
    function callbackDoSystemsubmit(mouse, index) {
        if (mouse == Button.MOUSE_DOWN) {
            if (index == 1 && (is24fpsFormat(getFormatName(selectObject[SELECT_SYSTEM_FORMAT].get())))
                && getStreamMode() == CONST_STREAM_MODE_NDI_HX) {
                jAlert(MSG_STATUS.mID_0051, NPTZ_WORDING.wID_0039);
                return;
            }
            $("#dialog_setup").show();
            var smartPictureFlip = cparam_get_smartPictureFlip();
            cparam_set_installPosition(radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_INSTALL].getSelectedValue());
            // if (isUE80) {
            cparam_set_pt_acceleration(radioPanTiltButtonGroup[RADIO_SYSTEM_PT_ACCELERATION].getSelectedValue());
            cparam_set_riseCurve(sliderRiseCurve.getValue());
            cparam_set_fallCurve(sliderFallCurve.getValue());
            cparam_set_riseAcceleration(sliderRiseAcceleration.getValue());
            cparam_set_fallAcceleration(sliderFallAcceleration.getValue());
            // }
            cparam_set_smartPictureFlip(radioPanTiltButtonGroup[RADIO_SYSTEM_SMART_PICTURE_MODE].getSelectedValue());
            // if(radioModeButtonGroup[RADIO_SYSTEM_PAN_MODE].getSelectedValue() == 1){
            //     cparam_set_flipDetectAngle(sliderBasicSystemFlipDetectAngleLevel.getValue());
            // }
            cparam_set_flipDetectAngle(sliderFlipDetectAngle.getValue());
            cparam_set_PTSpeedMode(radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_MODE].getSelectedValue());
            cparam_set_speedWithZoomPOS(radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_ZOOM].getSelectedValue());
            cparam_set_speedWithZoomPosMode(radioPanTiltButtonGroup[RADIO_SYSTEM_PAN_SPEED_ZOOM_MODE].getSelectedValue());
            cparam_set_focusADJWithPTZ(radioPanTiltButtonGroup[RADIO_SYSTEM_PAN__FOCUS_ADJUST].getSelectedValue());
            cparam_set_powerOnPosition(radioPanTiltButtonGroup[RADIO_SYSTEM_POWER_ON_POSITION].getSelectedValue());
            cparam_set_privacyMode(radioPanTiltButtonGroup[RADIO_SYSTEM_PRIVACY_MODE].getSelectedValue());

            cparam_set_powerOnPresetNumber(selectObject[SELECT_SYSTEM_PRESET_NUMBER].get());

            setTimeout(function () {
                $("#dialog_setup").hide();
            }, 500);
        }
    }
    function DoSubmitFDA()
    {
    }
    function ptAccelerationRadioButton(){
        if(radioPanTiltButtonGroup[RADIO_SYSTEM_PT_ACCELERATION].getSelectedValue() == 1) {
            sliderRiseCurve.setDisable();
            sliderFallCurve.setDisable();
            sliderRiseAcceleration.setDisable();
            sliderFallAcceleration.setDisable();
        } else {
            sliderRiseCurve.setEnable();
            sliderFallCurve.setEnable();
            sliderRiseAcceleration.setEnable();
            sliderFallAcceleration.setEnable();
        }
        if(radioPanTiltButtonGroup[RADIO_SYSTEM_SMART_PICTURE_MODE].getSelectedValue() == "0"){
            sliderFlipDetectAngle.setDisable();
        }else{
            sliderFlipDetectAngle.setEnable();
        }
    }
    function priorityStreamRadioButton(){
        // btnObject[BTN_EXECUTE].displayOff();
    }
    /**
     * Date&Time画面構築処理
     */
    function buildSetupDateTime() {
        if (!buildSetupDateTimeFlag) {
            buildSetupDateTimeFlag = true;
            var setup_dateTime_labels = "setup_dateTime_labels";
            // left labels
            txtDateTimeObject[TXT_BASIC_DATE_TITLE] = TextCtrl("setup_dateTime_main", "setup_dateTime_title", NPTZ_WORDING.wID_0179);
            txtDateTimeObject[TXT_BASIC_DATE_LIVE_TITLE] = TextCtrl("setup_livePage_main", "setup_livePage_title", NPTZ_WORDING.wID_0180);

            txtDateTimeObject[TXT_BASIC_DATE_AUTO] = TextCtrl(setup_dateTime_labels, 'setup_dateTime_auto_label', NPTZ_WORDING.wID_0016);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL] = TextCtrl(setup_dateTime_labels, 'setup_dateTime_manual_label', NPTZ_WORDING.wID_0118);
            txtDateTimeObject[TXT_BASIC_DATE_PC] = TextCtrl(setup_dateTime_labels, 'setup_dateTime_pc_label', NPTZ_WORDING.wID_0181);
            txtDateTimeObject[TXT_BASIC_DATE_NTP] = TextCtrl(setup_dateTime_labels, 'setup_dateTime_ntp_label', NPTZ_WORDING.wID_0133);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_DATE_TIME] = TextCtrl(setup_dateTime_labels, 'setup_dateTime_date_time_label', NPTZ_WORDING.wID_0182);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_TIME_ZONE] = TextCtrl(setup_dateTime_labels, 'setup_dateTime_time_zone_label', NPTZ_WORDING.wID_0183);
            // lines
            LineCtrl(setup_dateTime_labels, "vertical", 40, 40, 60,"setup_dateTime_auto_label");
            LineCtrl(setup_dateTime_labels, "vertical", 140, 40, 100,"setup_dateTime_manual_label");
            LineCtrl("setup_dateTime_main", "horizontal", 108, 20, "","setup_dateTime_ntp_label","96.2");
            LineCtrl("setup_dateTime_main", "horizontal", 185, 20, "","setup_dateTime_pc_label","96.2");
            LineCtrl("setup_dateTime_main", "horizontal", 262, 20, "","setup_dateTime_date_time_label","96.2");
            LineCtrl("setup_dateTime_main", "horizontal", 339, 20, "","setup_dateTime_end_label","96.2");
            // right labels
            var setup_dateTime_form = "setup_dateTime_form"
            // date
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_YEAR] = TextCtrl(setup_dateTime_form, 'setup_dateTime_year_label', NPTZ_WORDING.wID_0184);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_MONTH] = TextCtrl(setup_dateTime_form, 'setup_dateTime_month_label', NPTZ_WORDING.wID_0185);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_DAY] = TextCtrl(setup_dateTime_form, 'setup_dateTime_day_label', NPTZ_WORDING.wID_0186);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_HOUR] = TextCtrl(setup_dateTime_form, 'setup_dateTime_hour_label', NPTZ_WORDING.wID_0187);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_MIN] = TextCtrl(setup_dateTime_form, 'setup_dateTime_min_label', NPTZ_WORDING.wID_0188);
            txtDateTimeObject[TXT_BASIC_DATE_MANUAL_SEC] = TextCtrl(setup_dateTime_form, 'setup_dateTime_sec_label', NPTZ_WORDING.wID_0189);
            for (var txt in txtDateTimeObject) {
                txtDateTimeObject[txt].show();
            }

            btnDateTimeObject[BTN_BASIC_DATE_EXECUTE] = ButtonCtrl(setup_dateTime_form, 'btn_basic_date_execute', NPTZ_WORDING.wID_0154, callbackBasicDateExecute);
            btnDateTimeObject[BTN_BASIC_DATE_NTP] = ButtonCtrl(setup_dateTime_form, 'btn_basic_date_ntp', NPTZ_WORDING.wID_0133 + " >>", callbackBasicDateNtp);
            btnDateTimeObject[BTN_BASIC_DATE_SET] = ButtonCtrl("setup_dateTime_btn_set_area", 'btn_basic_date_set', NPTZ_WORDING.wID_0141, callbackBasicDateSet);
            for (var btn in btnDateTimeObject) {
                btnDateTimeObject[btn].show();
                btnDateTimeObject[btn].displayOff();
            }

            // date and time
            selectDateTimeObject[SELECT_BASIC_DATE_HOUR] = SelectCtrl(setup_dateTime_form, "date_hour", "date_hour", "setup_dateTime_hour_select");
            selectDateTimeObject[SELECT_BASIC_DATE_MIN] = SelectCtrl(setup_dateTime_form, "date_min", "date_min", "setup_dateTime_min_select");
            selectDateTimeObject[SELECT_BASIC_DATE_SEC] = SelectCtrl(setup_dateTime_form, "date_sec", "date_sec", "setup_dateTime_sec_select");
            selectDateTimeObject[SELECT_BASIC_DATE_YEAR] = SelectCtrl(setup_dateTime_form, "date_year", "date_year", "setup_dateTime_year_select", ChangeDayItems);
            selectDateTimeObject[SELECT_BASIC_DATE_MONTH] = SelectCtrl(setup_dateTime_form, "date_month", "date_month", "setup_dateTime_month_select", ChangeDayItems);
            selectDateTimeObject[SELECT_BASIC_DATE_DAY] = SelectCtrl(setup_dateTime_form, "date_day", "date_day", "setup_dateTime_day_select", ChangeDayItems);
            // timezone
            selectDateTimeObject[SELECT_BASIC_DATE_TIMEZONE] = SelectCtrl(setup_dateTime_form, "timezone", "timezone", "setup_dateTime_timezone_select");
            for (var select in selectDateTimeObject) {
                selectDateTimeObject[select].show();
                selectDateTimeObject[select].displayOff();
            }

            setSetupDateTimeValueToEle();

            $(".setup_dateTime_year_select,.setup_dateTime_month_select,.setup_dateTime_day_select,.setup_dateTime_hour_select,.setup_dateTime_min_select,.setup_dateTime_sec_select").on("change",function(){
                isDataTimeChange = true;
            })
            $(".setup_dateTime_timezone_select").on("change",function(){
                isTimeZoneChange = true;
            })

            initBtnStatus();
        } else {
            rebuildSetupDateTime();
        }
    }

    /**
     * Date&Time画面再構築処理
     */
    function rebuildSetupDateTime() {
        setSetupDateTimeValueToEle();
        initBtnStatus();
    }

    function setSetupDateTimeValueToEle() {
        setBasicDateTimeYearDate();
        setBasicDateTimeMonthDate();
        setBasicDateTimeDayDate();
        setBasicDateTimeHourDate();
        setBasicDateTimeMinDate();
        setBasicDateTimeSecDate();

        setBasicDateTimeTimezone();

        InitBasicDateTimePage();
    }

    function getPtpInfo() {
        var url = "/cgi-bin/get_ptp_info";
        var ret = cparam_sendRequest(url);
        if (ret) {
            ret = cparam_getRetArray(ret);
        }
        return ret;
    }
    function getPtpResult(ret) {
        var result;
        if (ret) {
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf('status=') == 0) {
                    result = ret[i].substring('status='.length);
                    continue;
                }
            }
        }
        return result;
    }
    function initBtnStatus(){
        var data = getPtpResult(getPtpInfo());
        if(data == "locked"){
            btnDateTimeObject[BTN_BASIC_DATE_EXECUTE].displayDisabled();
            btnDateTimeObject[BTN_BASIC_DATE_NTP].displayDisabled();
            btnDateTimeObject[BTN_BASIC_DATE_SET].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_HOUR].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_MIN].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_SEC].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_YEAR].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_MONTH].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_DAY].displayDisabled();
            selectDateTimeObject[SELECT_BASIC_DATE_TIMEZONE].displayDisabled();
        }else{
            btnDateTimeObject[BTN_BASIC_DATE_EXECUTE].displayOff();
            btnDateTimeObject[BTN_BASIC_DATE_NTP].displayOff();
            btnDateTimeObject[BTN_BASIC_DATE_SET].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_HOUR].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_MIN].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_SEC].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_YEAR].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_MONTH].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_DAY].displayOff();
            selectDateTimeObject[SELECT_BASIC_DATE_TIMEZONE].displayOff();
        }
    }
    /**
     * select:year
     */
    function setBasicDateTimeYearDate() {
        var select_basic_date_year_value = [];
        var select_basic_date_year_text = [];
        for (var iIndex = 2000; iIndex <= 2036; iIndex++) {
            select_basic_date_year_value[iIndex - 2000] = iIndex;
            select_basic_date_year_text[iIndex - 2000] = iIndex;
        }
        select_basic_date_year_value.push('----');
        select_basic_date_year_text.push('----');
        selectDateTimeObject[SELECT_BASIC_DATE_YEAR].appendOptions(select_basic_date_year_value, select_basic_date_year_text);
    }

    /**
     * select:month
     */
    function setBasicDateTimeMonthDate() {
        var select_basic_date_month_value = [];
        var select_basic_date_month_text = [];
        for (var iIndex = 1; iIndex <= 12; iIndex++) {
            if (( giFormat == 3 ) || ( giFormat == 5 )) {
                select_basic_date_month_value[iIndex - 1] = iIndex;
                select_basic_date_month_text[iIndex - 1] = MONTH_UPPER[iIndex - 1];
            }
            else {
                select_basic_date_month_value[iIndex - 1] = iIndex;
                select_basic_date_month_text[iIndex - 1] = capi_FormatNum(iIndex);
            }
        }
        select_basic_date_month_value.push('----');
        select_basic_date_month_text.push('----');
        selectDateTimeObject[SELECT_BASIC_DATE_MONTH].appendOptions(select_basic_date_month_value, select_basic_date_month_text);
    }

    /**
     * select:day
     */
    function setBasicDateTimeDayDate() {
        var select_basic_date_day_value = [];
        var select_basic_date_day_text = [];
        for (var iIndex = 1; iIndex <= MaximumDay(objCamDate.getYear(), objCamDate.getMonth() + 1); iIndex++) {
            select_basic_date_day_text[iIndex - 1] = capi_FormatNum(iIndex);
            select_basic_date_day_value[iIndex - 1] = iIndex;
        }
        select_basic_date_day_text.push('----');
        select_basic_date_day_value.push('----');
        selectDateTimeObject[SELECT_BASIC_DATE_DAY].appendOptions(select_basic_date_day_value, select_basic_date_day_text);
    }

    /**
     * select:hour
     */
    function setBasicDateTimeHourDate() {
        var select_basic_date_day_value = [];
        var select_basic_date_day_text = [];
        if (giDisp == 12) {
            for (var iIndex = 1; iIndex <= 12; iIndex++) {
                select_basic_date_day_text[iIndex - 1] = capi_FormatNum(iIndex);
                select_basic_date_day_value[iIndex - 1] = iIndex;
            }
        }
        else {
            for (var iIndex = 0; iIndex <= 23; iIndex++) {
                select_basic_date_day_text[iIndex] = capi_FormatNum(iIndex);
                select_basic_date_day_value[iIndex] = iIndex;
            }
        }
        select_basic_date_day_text.push('----');
        select_basic_date_day_value.push('----');
        selectDateTimeObject[SELECT_BASIC_DATE_HOUR].appendOptions(select_basic_date_day_value, select_basic_date_day_text);
    }

    /**
     * select:min
     */
    function setBasicDateTimeMinDate() {
        var select_basic_date_min_value = [];
        var select_basic_date_min_text = [];
        for (var iIndex = 0; iIndex <= 59; iIndex++) {
            select_basic_date_min_text[iIndex] = capi_FormatNum(iIndex);
            select_basic_date_min_value[iIndex] = iIndex;
        }
        select_basic_date_min_text.push('----');
        select_basic_date_min_value.push('----');
        selectDateTimeObject[SELECT_BASIC_DATE_MIN].appendOptions(select_basic_date_min_value, select_basic_date_min_text);
    }

    /**
     * select:sec
     */
    function setBasicDateTimeSecDate() {
        var select_basic_date_sec_value = [];
        var select_basic_date_sec_text = [];
        for (var iIndex = 0; iIndex <= 59; iIndex++) {
            select_basic_date_sec_text[iIndex] = capi_FormatNum(iIndex);
            select_basic_date_sec_value[iIndex] = iIndex;
        }
        select_basic_date_sec_text.push('----');
        select_basic_date_sec_value.push('----');
        selectDateTimeObject[SELECT_BASIC_DATE_SEC].appendOptions(select_basic_date_sec_value, select_basic_date_sec_text);
    }

    /**
     * select:timezone
     */
    function setBasicDateTimeTimezone() {
        var select_basic_date_timezone_value = [];
        var select_basic_date_timezone_text = [];
        for (var iIndex = 0; iIndex < 75; iIndex++) {
            select_basic_date_timezone_value[iIndex] = iIndex+1;
        }
        select_basic_date_timezone_text
            .push("(GMT-12:00) Eniwetok, Kwajalein",
                "(GMT-11:00) Midway Island, Samoa",
                "(GMT-10:00) Hawaii",
                "(GMT-09:00) Alaska",
                "(GMT-08:00) Pacific Time (US & Canada), Tijuana",
                "(GMT-07:00) Arizona",
                "(GMT-07:00) Mountain Time (US & Canada)",
                "(GMT-06:00) Saskatchewan",
                "(GMT-06:00) Mexico City",
                "(GMT-06:00) Central America",
                "(GMT-06:00) Central Time (US & Canada)",
                "(GMT-05:00) Indiana (East)",
                "(GMT-05:00) Bogota, Lima, Quito",
                "(GMT-05:00) Eastern Time (US & Canada)",
                "(GMT-04:30) Caracas",
                "(GMT-04:00) La Paz",
                "(GMT-04:00) Santiago, Georgetown",
                "(GMT-04:00) Atlantic Time (Canada)",
                "(GMT-03:30) Newfoundland",
                "(GMT-03:00) Greenland",
                "(GMT-03:00) Buenos Aires",
                "(GMT-03:00) Brasilia",
                "(GMT-02:00) Mid-Atlantic",
                "(GMT-01:00) Azores",
                "(GMT-01:00) Cape Verde Is.",
                "(GMT) Casablanca, Monrovia",
                "(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London",
                "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
                "(GMT+01:00) Sarajevo, Skopje, Sofija, Vilnius, Warsaw, Zagreb",
                "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris",
                "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
                "(GMT+01:00) West Central Africa",
                "(GMT+02:00) Athens, Istanbul",
                "(GMT+02:00) Jerusalem",
                "(GMT+02:00) Cairo",
                "(GMT+02:00) Harare, Pretoria",
                "(GMT+02:00) Bucharest",
                "(GMT+02:00) Helsinki, Riga, Tallinn",
                "(GMT+03:00) Kuwait, Riyadh, Minsk",
                "(GMT+03:00) Nairobi",
                "(GMT+03:00) Baghdad",
                "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
                "(GMT+03:30) Tehran",
                "(GMT+04:00) Abu Dhabi, Muscat",
                "(GMT+04:00) Baku, Tbilisi, Yerevan",
                "(GMT+04:30) Kabul",
                "(GMT+05:00) Islamabad, Karachi, Tashkent",
                "(GMT+05:00) Ekaterinburg",
                "(GMT+05:30) Calcutta, Chennai, Mumbai, New Delhi",
                "(GMT+05:30) Sri Jayawardenepura Kotte",
                "(GMT+05:45) Kathmandu",
                "(GMT+06:00) Astana, Dhaka",
                "(GMT+06:00) Almaty",
                "(GMT+06:30) Yangon(Rangoon)",
                "(GMT+07:00) Krasnoyarsk, Novosibirsk",
                "(GMT+07:00) Bangkok, Hanoi, Jakarta",
                "(GMT+08:00) Irkutsk, Ulaan Bataar",
                "(GMT+08:00) Kuala Lumpur, Singapore",
                "(GMT+08:00) Perth",
                "(GMT+08:00) Taipei",
                "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
                "(GMT+09:00) Seoul",
                "(GMT+09:00) Yakutsk",
                "(GMT+09:00) Osaka, Sapporo, Tokyo",
                "(GMT+09:30) Adelaide",
                "(GMT+09:30) Darwin",
                "(GMT+10:00) Vladivostok",
                "(GMT+10:00) Canberra, Melbourne, Sydney",
                "(GMT+10:00) Guam, Port Moresby",
                "(GMT+10:00) Brisbane",
                "(GMT+10:00) Hobart",
                "(GMT+11:00) Solomon Is., New Caledonia, Magadan",
                "(GMT+12:00) Auckland, Wellington",
                "(GMT+12:00) Fiji, Kamchatka, Marshall Is.",
                "(GMT+13:00) Nukualofa"
            );
        selectDateTimeObject[SELECT_BASIC_DATE_TIMEZONE].appendOptions(select_basic_date_timezone_value, select_basic_date_timezone_text);
    }

    /**
     * labelオブジェクト
     * @type txtLivePageObject[]
     */
    var txtLivePageObject = [];
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_LIVEPAGE_CAMERA_TITLE = 0;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_LIVEPAGE_AUTOMATIC = 1;
    /**
     * label定義
     * @type number
     */
    var TXT_BASIC_LIVEPAGE_SMOOTHER = 2;
    /**
     * ボタンオブジェクト
     * @type btnLivePageObject[]
     */
    var btnLivePageObject = [];
    /**
     * button定義
     * @type number
     */
    var BTN_BASIC_LIVEPAGE_SET = 0;

    /**
     * inputブジェクト
     * @type inputLivePageObject[]
     */
    var inputLivePageObject = [];
    /**
     * input定義
     * @type number
     */
    var INPUT_LIVEPAGE_CAM_TITLE = 0;

    /**
     * radio buttonブジェクト
     * @type {Array}
     */
    var radioModeButtonGroup = [];

    /**
     * plugin_download定義
     * @type {number}
     */
    var RADIO_LAYPAGE_PLUGIN_DOWNLOAD = 0;

    /**
     * plugin_disp定義
     * @type {number}
     */
    var RADIO_LAYPAGE_PLUGIN_DISP = 1 ;

    /**
     * Live page画面構築処理
     */
    function buildLivePage() {
        if (!buildSetupLivePageFlag) {
            buildSetupLivePageFlag = true;
            $('#setup_livePage_main').append($('<div class="livePageDivInnerLine1"></div>'));

            var setup_livePage_labels = "setup_livePage_labels";
            txtLivePageObject[TXT_BASIC_LIVEPAGE_CAMERA_TITLE] = TextCtrl(setup_livePage_labels, 'setup_livePage_camera_title_lable', NPTZ_WORDING.wID_0190);
            txtLivePageObject[TXT_BASIC_LIVEPAGE_AUTOMATIC] = TextCtrl(setup_livePage_labels, 'setup_livePage_automatic_lable', NPTZ_WORDING.wID_0191);
            txtLivePageObject[TXT_BASIC_LIVEPAGE_SMOOTHER] = TextCtrl(setup_livePage_labels, 'setup_livePage_smoother_lable', NPTZ_WORDING.wID_0192);
            var setup_livePage_form = "setup_livePage_form";
            inputLivePageObject[INPUT_LIVEPAGE_CAM_TITLE] = InputCtrl(setup_livePage_form, 'cam_title', 'cam_title', 'setup_livePage_cam_title_text', '', null, null, null, null, 20);
            inputLivePageObject[INPUT_LIVEPAGE_CAM_TITLE].displayOff();
            inputLivePageObject[INPUT_LIVEPAGE_CAM_TITLE].show();

            radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DOWNLOAD] = RadioButtonGroupCtrl("setup_livePage_form", "radio_plugin_download_", RADIO_GROUP.rID_0042, 'enable', plugindownloadRadioButton);

            radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DISP] = RadioButtonGroupCtrl("setup_livePage_form", "radio_plugin_disp_", RADIO_GROUP.rID_0001, '1', plugindispRadioButton);
            txtLivePageObject[TXT_BASIC_LIVEPAGE_CAMERA_TITLE].show();

            if (IsIE()) {
                txtLivePageObject[TXT_BASIC_LIVEPAGE_AUTOMATIC].show();
                txtLivePageObject[TXT_BASIC_LIVEPAGE_SMOOTHER].show();

                $('#setup_livePage_main').append($('<div class="livePageDivInnerLine2"></div>'));
                $('#setup_livePage_main').append($('<div class="livePageDivInnerLine3"></div>'));
            } else {
                radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DOWNLOAD].hide();
                radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DISP].hide();
            }

            btnLivePageObject[BTN_BASIC_LIVEPAGE_SET] = ButtonCtrl("setup_livePage_btn_set_area", 'btn_basic_livepage_set', NPTZ_WORDING.wID_0141, callbackBasicLivepageSet);
            for (var btn in btnLivePageObject) {
                btnLivePageObject[btn].show();
                btnLivePageObject[btn].displayOff();
            }

            InitLivePage();
        } else {
            rebuildLivePage();
        }
    }

    function plugindownloadRadioButton(){

    }

    function plugindispRadioButton(){

    }

    /**
     * Live page画面再構築処理
     */
    function rebuildLivePage() {
        InitLivePage();
    }

    function InitThisPage() {
        cparam_updatePriorityMode();
    }

    function callbackBasicDateExecute(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            TimeSyncWithPC();
        }
    }

    function callbackBasicDateNtp(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            //show network
            $(".btn_basic").removeClass('on');
            $(".btn_basic").removeClass('disable');
            $(".btn_basic").removeClass('on_hover');
            $(".btn_basic").removeClass('off_hover');
            $(".btn_basic").addClass('off');
            $(".btn_network").removeClass('off');
            $(".btn_network").removeClass('disable');
            $(".btn_network").removeClass('on_hover');
            $(".btn_network").removeClass('off_hover');
            $(".btn_network").addClass('on');
            $(".btn_ntp").addClass('on');
            $("#setting_network").show();
            $("#setup_basic_div").hide();
            $("#setting_image").hide();
            $("#setting_mulit").hide();
            $("#setting_user_mng").hide();
            $("#setting_maintenance").hide();
            //show advanced
            $("#setup_network_main").hide();
            $("#setup_advanced_main").show();
            //show ftp
            $("#setting_network_advanced_rtsp").hide();
            $("#setting_network_advanced_ntp").show();
            $("#setting_network_advanced_upnp").hide();
            $("#setting_network_advanced_https").hide();
            $(".btn_rtsp").removeClass('on').addClass('off');
            $(".btn_upnp").removeClass('on').addClass('off');
            $(".btn_https").removeClass('on').addClass('off');
            $(".setting_network_middle_bg").removeClass('setting_network_middle_bg_https');

            setupMainMenu.callbackButtonControl(1,20);
            settingNetworkAdvanced.callbackAdvancedMenuNtp(1);
        }
    }

    function callbackBasicDateSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoSubmitDate();
        }
    }

    function callbackBasicLivepageSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoLiveSubmit();
        }
    }

    var gsDateset = "2015,2,26,11,28,25";
    var objCamDate = new Date(gsDateset.split(',')[0],
        gsDateset.split(',')[1] - 1,
        gsDateset.split(',')[2],
        gsDateset.split(',')[3],
        gsDateset.split(',')[4],
        gsDateset.split(',')[5]);
    var giDisp = "24";
    var giFormat = 5;
    var gbAct = false;
    var f = document.all;

    var iTimeZone = 63;
    var MONTH_UPPER = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
    var objDatetime;

    function InitBasicDateTimePage() {
        objDatetime = getDatetime();
        iTimeZone = objDatetime.basicTimeZone;
        objErrCode = MSG_STATUS.mID_0001;
        cpage_initSelect(f.timezone, iTimeZone, 62);
        if (objDatetime) {
            SetDateValue();
        }
        else {
            SetDateValueOrg(objCamDate);
        }
    }

    function TimeSyncWithPC() {
        if (gbAct) {
            return;
        }
        var sysTime = new Date();
        var nowMsec = sysTime.getTime();    // msec
        var offsetMsec = sysTime.getTimezoneOffset() * 60 * 1000;    // min * 60 * 1000 -> msec

        var utcMsec = nowMsec + offsetMsec; // msec
        var tz = document.getElementById("timezone");
        var newTimeZone = tz.options[tz.selectedIndex].text;
        var offset_sign = newTimeZone.substr(4, 1);  // +,-
        var offset_hour = newTimeZone.substr(5, 2);  // hh
        var offset_min = newTimeZone.substr(8, 2);  // mm
        var newMsec = utcMsec;
        if (offset_sign == "+") {
            newMsec += (offset_hour * 3600000 + (offset_min * 60000));
        }
        else if (offset_sign == "-") {
            newMsec -= (offset_hour * 3600000 + (offset_min * 60000));
        }
        var newTime = new Date(newMsec);
        DocWriteDayItemRepeat(newTime);
        f.date_year.value = newTime.getFullYear();
        f.date_month.value = newTime.getMonth() + 1;
        f.date_day.value = newTime.getDate();
        f.date_hour.value = newTime.getHours();
        f.date_min.value = newTime.getMinutes();
        f.date_sec.value = newTime.getSeconds();
        $("#dialog_setup").show();
        with (document.getElementById("dateTimeForm")) {
            method = "post";
            target = "FrameHide";
            action = "/cgi-bin/date_time";
            submit();
        }
        setTimeout(function(){
            $("#dialog_setup").hide();
        },500);
    }


    function SetDateValue(objDate) {
        var temptime = objCamDate;
        with (f) {
            date_year.value = objDatetime.date_year;
            date_month.value = objDatetime.date_month;
            temptime = new Date(objDatetime.date_year, objDatetime.date_month - 1, 1);
            DocWriteDayItemRepeat(temptime);
            date_day.value = objDatetime.date_day;
            date_hour.value = objDatetime.date_hour;
            date_min.value = objDatetime.date_min;
            date_sec.value = objDatetime.date_sec;
        }
    }

    function SetDateValueOrg(objDate) {
        with (f) {
            date_year.value = objDate.getFullYear();
            date_month.value = objDate.getMonth() + 1;
            date_day.value = objDate.getDate();
            date_hour.value = objDate.getHours();
            date_min.value = objDate.getMinutes();
            date_sec.value = objDate.getSeconds();
        }
    }

    function getDateTimeValue(){
        var data = {};
        if(isTimeZoneChange&&isDataTimeChange){
            data['date_year'] = f.date_year.value;
            data['date_month'] = f.date_month.value;
            data['date_day'] = f.date_day.value;
            data['date_hour'] = f.date_hour.value;
            data['date_min'] =f.date_min.value;
            data['date_sec'] =f.date_sec.value;
            data['timezone'] = f.timezone.value;
        }else if(isTimeZoneChange){
            data['timezone'] = f.timezone.value;
        }else if(isDataTimeChange){
            data['date_year'] = f.date_year.value;
            data['date_month'] = f.date_month.value;
            data['date_day'] = f.date_day.value;
            data['date_hour'] = f.date_hour.value;
            data['date_min'] =f.date_min.value;
            data['date_sec'] =f.date_sec.value;
            data['timezone'] = f.timezone.value;
        }
        return data;
    }
    function checkDateTime() {
        return f.date_year.value == '----'
            || f.date_month.value == '----'
            || f.date_day.value == '----'
            || f.date_hour.value == '----'
            || f.date_min.value == '----'
            || f.date_sec.value == '----'
            || f.timezone.value == '----'
    }

    function DoSubmitDate() {
        if(checkDateTime()){
            jAlert(MSG_STATUS.mID_0104, NPTZ_WORDING.wID_0039);
            return;
        }
        $("#dialog_setup").show();
        $.ajax({
            type: "post",
            url: "/cgi-bin/date_time",
            data: getDateTimeValue(),
            success: function (data) {
                InitBasicDateTimePage();
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });

    }

    function DocWriteDayItemRepeat(objTime) {
        f.date_day.length = MaximumDay(objTime.getYear(), objTime.getMonth() + 1) + 1;
        for (var iIndex = 1; iIndex <= MaximumDay(objTime.getYear(), objTime.getMonth() + 1); iIndex++) {
            f.date_day.options[iIndex - 1].text = capi_FormatNum(iIndex);
            f.date_day.options[iIndex - 1].value = iIndex;
        }
        f.date_day.options[iIndex - 1].text ='----';
        f.date_day.options[iIndex - 1].value = '----';
    }

    function ChangeDayItems() {
        var objElem;
        var iMaximum = MaximumDay(f.date_year.value, f.date_month.value);
        if (f.date_day.length <= iMaximum) {
            for (var iIndex = f.date_day.length + 1; iIndex <= iMaximum; iIndex++) {
                objElem = document.createElement("option");
                objElem.text = capi_FormatNum(iIndex);
                objElem.value = iIndex;
                f.date_day.add(objElem);
            }
        }
        else {
            if (f.date_day.value > iMaximum) {
                f.date_day.value = 1;
            }
            while (f.date_day.length > iMaximum) {
                f.date_day.remove(f.date_day.length - 1);
            }
        }
    }

    function MaximumDay(iYear, iMonth) {
        if (( iMonth == 1 )
            || ( iMonth == 3 )
            || ( iMonth == 5 )
            || ( iMonth == 7 )
            || ( iMonth == 8 )
            || ( iMonth == 10 )
            || ( iMonth == 12 )) {
            return 31;
        }
        if (( iMonth == 4 )
            || ( iMonth == 6 )
            || ( iMonth == 9 )
            || ( iMonth == 11)) {
            return 30;
        }
        if (IsLeapYear(iYear)) {
            return 29;
        }
        else {
            return 28;
        }
        return 30;
    }

    function IsLeapYear(iSetYear) {
        if (iSetYear % 4 == 0) {
            if (iSetYear % 400 == 0) {
                return true;
            }
            if (iSetYear % 100 == 0) {
                return false;
            }
            return true;
        }
        return false;
    }

    function getDatetime() {
        var url = "/cgi-bin/get_date_time";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("display=") == 0) {
                    result.display = ret[i].substring("display=".length);
                }
                else if (ret[i].indexOf("date_year=") == 0) {
                    if (result.display == 1) {
                        result.date_year = ret[i].substring("date_year=".length);
                    } else {
                        result.date_year = '----';
                    }
                }
                else if (ret[i].indexOf("date_month=") == 0) {
                    if (result.display == 1) {
                        result.date_month = ret[i].substring("date_month=".length);
                    } else {
                        result.date_month = '----';
                    }
                }
                else if (ret[i].indexOf("date_day=") == 0) {
                    if (result.display == 1) {
                        result.date_day = ret[i].substring("date_day=".length);
                    } else {
                        result.date_day = '----';
                    }
                }
                else if (ret[i].indexOf("date_hour=") == 0) {
                    if (result.display == 1) {
                        result.date_hour = ret[i].substring("date_hour=".length);
                    } else {
                        result.date_hour = '----';
                    }
                }
                else if (ret[i].indexOf("date_min=") == 0) {
                    if (result.display == 1) {
                        result.date_min = ret[i].substring("date_min=".length);
                    } else {
                        result.date_min = '----';
                    }
                }
                else if (ret[i].indexOf("date_sec=") == 0) {
                    if (result.display == 1) {
                        result.date_sec = ret[i].substring("date_sec=".length);
                    } else {
                        result.date_sec = '----';
                    }
                }
                else if (ret[i].indexOf("timezone=") == 0) {
                    result.basicTimeZone = ret[i].substring("timezone=".length);
                }
            }
        }
        return result;
    }

    function InitLivePage() {
        var basicInfo = getBasic();
        if (basicInfo.hasOwnProperty("plugin_download")) {
            radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DOWNLOAD].setSelectedValue(basicInfo.plugin_download);
            radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DISP].setSelectedValue(basicInfo.plugin_disp);
        }
        else {
            radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DOWNLOAD].setSelectedValue("disable");
            radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DISP].setSelectedValue("0");
        }
        var title = htmlEncodeJQ(basicInfo.camtitle);
        cpage_initValue(document.getElementById("cam_title"), htmlDecodeJQ(title), "");
        displayBaseHeaderTab.getTitleName();
        document.title = htmlEncodeJQ(title);
        $(".txt_show_title").attr("title",title);
    }

    function getBasic() {
        var url = "/cgi-bin/get_basic";
        var result = {};
        var ret = cparam_sendRequest(url);
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("cam_title=") == 0) {
                    result.camtitle = ret[i].substring("cam_title=".length);
                    continue;
                }
                if (ret[i].indexOf("plugin_download=") == 0) {
                    result.plugin_download = ret[i].substring("plugin_download=".length);
                    continue;
                }
                if (ret[i].indexOf("plugin_disp=") == 0) {
                    result.plugin_disp = ret[i].substring("plugin_disp=".length);
                }
            }
        }
        return result;
    }

    function DoLiveSubmit() {
        if (!CheckLiveForm()) {
            gbAct = false;
            return false;
        }
        $("#dialog_setup").show();
        $.ajax({
            type: "post",
            url: "/cgi-bin/set_basic",
            data: getLivePageSettingData(),
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);

                InitLivePage();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }

    function getLivePageSettingData() {
        var data = {};

        data["cam_title"] = document.getElementById("cam_title").value;

        if(IsIE() && getStreamMode() != 'rtmp'){
            data["plugin_download"] = radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DOWNLOAD].getSelectedValue();
            data["plugin_disp"] = radioModeButtonGroup[RADIO_LAYPAGE_PLUGIN_DISP].getSelectedValue();
        }else{

        }

        return data;
    }

    function CheckLiveForm() {
        objTitle = document.getElementById("cam_title");

        if (!checkLive1(objTitle.value)) {
            jAlert(objErrCode, NPTZ_WORDING.wID_0039);
            return false;
        }
        if (!chktitle_IsValidCameraTitle(objTitle.value)) {
            jAlert(objErrCode, NPTZ_WORDING.wID_0039);
            return false;
        }
        return true;
    }

    function checkLive1(str) {
        var err = 0;
        var code;
        
        if (str.length == 0){
            objErrCode = MSG_STATUS.mID_0009;
            return false;
        }
        
        for (var i = 0; i < str.length; i++) {
            code = str.charCodeAt(i);
            if ((0x21 <= code && code <= 0x7e)) {
                ;
            }
            else err++;
        }
        if (err != 0) {
            objErrCode = MSG_STATUS.mID_0009;
            return false;
        }
        else {
            return true;
        }
    }


    function init() {
        InitThisPage();
        cparam_updateTitle();
    }

    return {
        buildSetupPantilt: buildSetupPantilt,
        buildSetupDateTime: buildSetupDateTime,
        buildLivePage: buildLivePage,
        init: init,
        destroyMyScroll:destroyMyScroll,
        buildMyScroll:buildMyScroll,
        refreshPanTiltSlider: function () {
            sliderFlipDetectAngle.refresh();
            sliderRiseCurve.refresh();
            sliderFallCurve.refresh();
            sliderRiseAcceleration.refresh();
            sliderFallAcceleration.refresh();
        }
    };
}

function SetupBodyScallBar(div,distance) {
    var isScrolling = 0;
    var startPos;

    document.getElementById(div).addEventListener('touchstart', touchStartFunc, false);
    document.getElementById(div).addEventListener('touchmove', touchMoveFunc, false);
    document.getElementById(div).addEventListener('touchend', touchEndFunc, false);

    function touchStartFunc() {
        var touch = event.targetTouches[0];
        startPos = {x :touch.pageX,y:touch.pageY,time:+new Date};
        isScrolling = 0;

        addOpenScallBarEventListener();
    }

    function touchMoveFunc(event) {
        var touch = event.targetTouches[0];
        var endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
        isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;

        if(isScrolling === 1){
            if(Math.abs(endPos.y) > distance) {
                addOpenScallBarEventListener();
            }
        }
        else {
            addCloseScallBarEventListener();
        }
    }

    function touchEndFunc() {
        addCloseScallBarEventListener();
    }

    function addOpenScallBarEventListener() {
        document.getElementById("setupBody").removeEventListener('touchmove', addTouchEvent,  { passive: false });
        document.getElementById("setupBody").addEventListener('touchmove', addTouchEvent,  { passive: false });
    }

    function addCloseScallBarEventListener() {
        document.getElementById("setupBody").removeEventListener('touchmove', removeTouchEvent,  { passive: false });
        document.getElementById("setupBody").addEventListener('touchmove', removeTouchEvent,  { passive: false });
    }

    function addTouchEvent() {
        window.event.returnValue = true;
    }

    function removeTouchEvent() {
        window.event.returnValue = false;
    }
}



