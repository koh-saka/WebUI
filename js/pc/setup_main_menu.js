/**
 * @fileOverview 画面制御の基本処理を管理するクラス
 *
 * @author Panasonic Corporation
 */

/**
 * 画面制御の基本処理を管理するクラスのインスタンス
 */
var setupMainMenu = setupMainMenu();

var positionScroll =  null;
var buildScrollSuccessFlg = true;

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
function setupMainMenu() {
    /**
     * ボタンオブジェクト
     * @type txtObject[]
     */
    let txtObject = [];
    /**
     * ボタンオブジェクト
     * @type btnObject[]
     */
    let btnObject = [];
    /**
     * 構築フラグ
     * @type boolean
     */
    let buildFlag = false;
    /**
     *
     * @type {number}
     */
    const TXT_BASIC = 0;
    /**
     *
     * @type {number}
     */
     const TXT_SIGNALS = 1;
    /**
     *
     * @type {number}
     */
    const TXT_IMAGE_AUDIO = 2;
    /**
     *
     * @type {number}
     */
     const TXT_CONNECTED_SOLUTIONS = 3;
    /**
     *
     * @type {number}
     */
    const TXT_USER_MNG = 4;
    /**
     *
     * @type {number}
     */
    const TXT_NETWORK = 5;
    /**
     *
     * @type {number}
     */
    const TXT_MAINTENACE = 6;
    /**
     * button定義
     * @type number
     */
    const BTN_SETUP_SETTING_STATUS = 0;
    /**
     * button定義
     * @type number
     */
    const BTN_BASIC_SYSTEM = 1;
    const BTN_BASIC_PAN_TILT = 2
    /**
     * button定義
     * @type number
     */
    const BTN_BASIC_DATE_TIME = 3;
    /**
     * button定義
     * @type number
     */
    const BTN_BASIC_LIVE_PAGE = 4;
    /**
     * button定義
     * @type number
     */
     const BTN_SIGNALS_OUTPUT = 5;
     /**
      * button定義
      * @type number
      */
     const BTN_SIGNALS_RETURN = 6;
     /**
      * button定義
      * @type number
      */
     const BTN_SIGNALS_IP_SIGNAL = 7;
    /**
     * button定義
     * @type number
     */
    const BTN_VIDEO_OVER_IP = 8;
    /**
     * button定義
     * @type number
     */
    const BTN_MEDIA_OVER_IP = 9;
    /**
     * button定義
     * @type number
     */
    const BTN_AUDIO = 10;
    /**
     * button定義
     * @type number
     */
    const BTN_IMAGE_ADJUST = 11;
    /**
     * button定義
     * @type number
     */
    const BTN_MONITOR_DISPLAY = 12;
    /**
     * button定義
     * @type number
     */
    const BTN_LENS = 13;
    /**
     * button定義
     * @type number
     */
    const BTN_UDP_CROP = 14;
    /**
     * button定義
     * @type number
     */
    const BTN_PRESET_POSITION = 15;
    /**
     * button定義
     * @type number
     */
    const BTN_USER_MNG_USER_AUTH = 16;
    /**
     * button定義
     * @type number
     */
    const BTN_USER_MNG_HOST_AUTH = 17;
    /**
     * button定義
     * @type number
     */
    const BTN_USER_MNG_PRIORITY_STREAM = 18;
    /**
     * button定義
     * @type number
     */
    const BTN_NETWORK_NETWORK = 19;
    /**
     * button定義
     * @type number
     */
    const BTN_NETWORK_ADVANCE = 20;
    /**
     * button定義
     * @type number
     */
    const BTN_MAINTENANCE_SYSTEM_LOG = 21;
    /**
     * button定義
     * @type number
     */
    const BTN_MAINTENANCE_MAINTENANCE = 22;
    /**
     * button定義
     * @type number
     */
    const BTN_MAINTENANCE_PRODUCT_INFO = 23;
    /**
     * button定義
     * @type number
     */
    // const BTN_MAINTENANCE_DEFAULT_RESET = 22;
    /**
     * button定義
     * @type number
     */
    const BTN_MAINTENANCE_BACKUP = 24;
    /**
     * button定義
     * @type number
     */
    const BTN_VIRTUAL_STUDIO = 25;
    /**
     * button定義
     * @type number
     */
    const BTN_P2_CAST = 26;
    /**
     * button定義
     * @type number
     */
    const BTN_VIRTUAL_CSP_CONTROL = 27;

    // Paint用ワーカースレッド変数
    let paintWorker;
    
    /**
     * Image/Audio設定画面構築処理
     */
    function build() {
        if (!buildFlag) {
            buildFlag = true;
            // 親DIV
            var div = 'setup_main_menu';
            var div_other = "setup_main_menu_other";

            // Paint用ワーカースレッド起動
            getPaintWorker();

            // Situation button
            btnObject[BTN_SETUP_SETTING_STATUS] = MenuButtonCtrl(div, 'setup_menu_setting_status_btn', NPTZ_WORDING.wID_0077, callbackButtonControl, BTN_SETUP_SETTING_STATUS, MenuButtonType.SINGLE);

            // Basic
            txtObject[TXT_BASIC] = TextCtrl(div, 'setup_main_basic_menu_label', NPTZ_WORDING.wID_0405);
            // Basic menu button
            btnObject[BTN_BASIC_SYSTEM] = MenuButtonCtrl(div, 'setup_menu_basic_system_btn', NPTZ_WORDING.wID_0193, callbackButtonControl, BTN_BASIC_SYSTEM, MenuButtonType.TOP);
            btnObject[BTN_BASIC_PAN_TILT] = MenuButtonCtrl(div, 'setup_menu_basic_pan_tilt_btn', NPTZ_WORDING.wID_0676, callbackButtonControl, BTN_BASIC_PAN_TILT, MenuButtonType.MIDDLE);
            btnObject[BTN_BASIC_DATE_TIME] = MenuButtonCtrl(div, 'setup_menu_basic_dateTime_btn', NPTZ_WORDING.wID_0179, callbackButtonControl, BTN_BASIC_DATE_TIME, MenuButtonType.MIDDLE);
            btnObject[BTN_BASIC_LIVE_PAGE] = MenuButtonCtrl(div, 'setup_menu_basic_livePage_btn', NPTZ_WORDING.wID_0180, callbackButtonControl, BTN_BASIC_LIVE_PAGE, MenuButtonType.BOTTOM);

            // Signals
            txtObject[TXT_SIGNALS] = TextCtrl(div, 'setup_main_signals_menu_label', NPTZ_WORDING.wID_0627);
            // Signals menu button
            btnObject[BTN_SIGNALS_OUTPUT] = MenuButtonCtrl(div, 'setup_menu_output_btn', NPTZ_WORDING.wID_0628, callbackButtonControl, BTN_SIGNALS_OUTPUT, MenuButtonType.TOP);
            if (!isUE163) {
                btnObject[BTN_SIGNALS_RETURN] = MenuButtonCtrl(div, 'setup_menu_return_btn', NPTZ_WORDING.wID_0629, callbackButtonControl, BTN_SIGNALS_RETURN, MenuButtonType.MIDDLE);
                btnObject[BTN_SIGNALS_IP_SIGNAL] = MenuButtonCtrl(div, 'setup_menu_ip_signal_btn', NPTZ_WORDING.wID_0630, callbackButtonControl, BTN_SIGNALS_IP_SIGNAL, MenuButtonType.BOTTOM);

                // Image/Audio
                txtObject[TXT_IMAGE_AUDIO] = TextCtrl(div, 'setup_main_imageOrAudio_menu_label', NPTZ_WORDING.wID_0406);
                // Image/Audio menu button
                btnObject[BTN_VIDEO_OVER_IP] = MenuButtonCtrl(div, 'setup_menu_videoOverIP_btn', NPTZ_WORDING.wID_0083, callbackButtonControl, BTN_VIDEO_OVER_IP, MenuButtonType.TOP);
                btnObject[BTN_MEDIA_OVER_IP] = MenuButtonCtrl(div, 'setup_menu_mediaOverIP_btn', NPTZ_WORDING.wID_0682, callbackButtonControl, BTN_MEDIA_OVER_IP, MenuButtonType.MIDDLE);

                btnObject[BTN_AUDIO] = MenuButtonCtrl(div, 'setup_menu_audio_btn', NPTZ_WORDING.wID_0252, callbackButtonControl, BTN_AUDIO, MenuButtonType.MIDDLE);
                btnObject[BTN_IMAGE_ADJUST] = MenuButtonCtrl(div, 'setup_menu_imageAdjust_btn', NPTZ_WORDING.wID_0005, callbackButtonControl, BTN_IMAGE_ADJUST, MenuButtonType.MIDDLE);
                btnObject[BTN_MONITOR_DISPLAY] = MenuButtonCtrl(div, 'setup_menu_monitor_display_btn', NPTZ_WORDING.wID_0732, callbackButtonControl, BTN_MONITOR_DISPLAY, MenuButtonType.MIDDLE);
                btnObject[BTN_LENS] = MenuButtonCtrl(div, 'setup_menu_lens_btn', NPTZ_WORDING.wID_0356, callbackButtonControl, BTN_LENS, MenuButtonType.MIDDLE);
                btnObject[BTN_UDP_CROP] = MenuButtonCtrl(div, 'setup_menu_UHDCrop_btn', NPTZ_WORDING.wID_0443, callbackButtonControl, BTN_UDP_CROP, MenuButtonType.MIDDLE);
                btnObject[BTN_PRESET_POSITION] = MenuButtonCtrl(div, 'setup_menu_presetPosition_btn', NPTZ_WORDING.wID_0364, callbackButtonControl, BTN_PRESET_POSITION, MenuButtonType.BOTTOM);

                //Connected Solutions
                txtObject[TXT_CONNECTED_SOLUTIONS] = TextCtrl(div, 'setup_main_connected_menu_label', NPTZ_WORDING.wID_0476);
                btnObject[BTN_VIRTUAL_STUDIO] = MenuButtonCtrl(div, 'setup_menu_virtual_btn', NPTZ_WORDING.wID_0463, callbackButtonControl, BTN_VIRTUAL_STUDIO, MenuButtonType.TOP);

                if(!isUCW4380){
                    btnObject[BTN_P2_CAST] = MenuButtonCtrl(div, 'setup_menu_cast_btn', NPTZ_WORDING.wID_0536, callbackButtonControl, BTN_P2_CAST, MenuButtonType.MIDDLE);
                }
                btnObject[BTN_VIRTUAL_CSP_CONTROL] = MenuButtonCtrl(div, 'setup_menu_csp_btn', NPTZ_WORDING.wID_0923, callbackButtonControl, BTN_VIRTUAL_CSP_CONTROL, MenuButtonType.BOTTOM);

                // User Mng
                txtObject[TXT_USER_MNG] = TextCtrl(div_other, 'setup_main_userMng_menu_label', NPTZ_WORDING.wID_0407);
                // User Mng menu button
                btnObject[BTN_USER_MNG_USER_AUTH] = MenuButtonCtrl(div_other, 'setup_menu_userMng_userAuth_btn', NPTZ_WORDING.wID_0076, callbackButtonControl, BTN_USER_MNG_USER_AUTH, MenuButtonType.TOP);
                btnObject[BTN_USER_MNG_HOST_AUTH] = MenuButtonCtrl(div_other, 'setup_menu_userMng_hostAuth_btn', NPTZ_WORDING.wID_0079, callbackButtonControl, BTN_USER_MNG_HOST_AUTH, MenuButtonType.BOTTOM);

                // Network
                txtObject[TXT_NETWORK] = TextCtrl(div_other, 'setup_main_network_label', NPTZ_WORDING.wID_0108);
                // Network menu button
                btnObject[BTN_NETWORK_NETWORK] = MenuButtonCtrl(div_other, 'setup_menu_network_network_btn', NPTZ_WORDING.wID_0108, callbackButtonControl, BTN_NETWORK_NETWORK, MenuButtonType.TOP);
                btnObject[BTN_NETWORK_ADVANCE] = MenuButtonCtrl(div_other, 'setup_menu_network_advance_btn', NPTZ_WORDING.wID_0444, callbackButtonControl, BTN_NETWORK_ADVANCE, MenuButtonType.BOTTOM);

                // Maintenance
                txtObject[TXT_MAINTENACE] = TextCtrl(div_other, 'setup_main_maintenance_menu_label', NPTZ_WORDING.wID_0408);
                // Maintenance menu button
                btnObject[BTN_MAINTENANCE_SYSTEM_LOG] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_system_log_btn', NPTZ_WORDING.wID_0399, callbackButtonControl, BTN_MAINTENANCE_SYSTEM_LOG, MenuButtonType.TOP);
                btnObject[BTN_MAINTENANCE_MAINTENANCE] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_maintenance_btn', NPTZ_WORDING.wID_0408, callbackButtonControl, BTN_MAINTENANCE_MAINTENANCE, MenuButtonType.MIDDLE);
                btnObject[BTN_MAINTENANCE_PRODUCT_INFO] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_product_info_btn', NPTZ_WORDING.wID_0445, callbackButtonControl, BTN_MAINTENANCE_PRODUCT_INFO, MenuButtonType.MIDDLE);
                // btnObject[BTN_MAINTENANCE_DEFAULT_RESET] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_default_reset_btn', NPTZ_WORDING.wID_0446, callbackButtonControl, BTN_MAINTENANCE_DEFAULT_RESET, MenuButtonType.MIDDLE);
                btnObject[BTN_MAINTENANCE_BACKUP] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_backup_btn', NPTZ_WORDING.wID_0447, callbackButtonControl, BTN_MAINTENANCE_BACKUP, MenuButtonType.BOTTOM);
            } else {
                btnObject[BTN_SIGNALS_IP_SIGNAL] = MenuButtonCtrl(div, 'setup_menu_ip_signal_btn isUE163', NPTZ_WORDING.wID_0630, callbackButtonControl, BTN_SIGNALS_IP_SIGNAL, MenuButtonType.BOTTOM);
                // Image/Audio
                txtObject[TXT_IMAGE_AUDIO] = TextCtrl(div, 'setup_main_imageOrAudio_menu_label isUE163', NPTZ_WORDING.wID_0406);
                // Image/Audio menu button
                btnObject[BTN_VIDEO_OVER_IP] = MenuButtonCtrl(div, 'setup_menu_videoOverIP_btn isUE163', NPTZ_WORDING.wID_0083, callbackButtonControl, BTN_VIDEO_OVER_IP, MenuButtonType.TOP);
                btnObject[BTN_AUDIO] = MenuButtonCtrl(div, 'setup_menu_audio_btn isUE163', NPTZ_WORDING.wID_0252, callbackButtonControl, BTN_AUDIO, MenuButtonType.MIDDLE);
                btnObject[BTN_IMAGE_ADJUST] = MenuButtonCtrl(div, 'setup_menu_imageAdjust_btn isUE163', NPTZ_WORDING.wID_0005, callbackButtonControl, BTN_IMAGE_ADJUST, MenuButtonType.MIDDLE);
                btnObject[BTN_MONITOR_DISPLAY] = MenuButtonCtrl(div, 'setup_menu_monitor_display_btn isUE163', NPTZ_WORDING.wID_0732, callbackButtonControl, BTN_MONITOR_DISPLAY, MenuButtonType.MIDDLE);
                btnObject[BTN_LENS] = MenuButtonCtrl(div, 'setup_menu_lens_btn isUE163', NPTZ_WORDING.wID_0356, callbackButtonControl, BTN_LENS, MenuButtonType.MIDDLE);
                btnObject[BTN_UDP_CROP] = MenuButtonCtrl(div, 'setup_menu_UHDCrop_btn isUE163', NPTZ_WORDING.wID_0443, callbackButtonControl, BTN_UDP_CROP, MenuButtonType.MIDDLE);
                btnObject[BTN_PRESET_POSITION] = MenuButtonCtrl(div, 'setup_menu_presetPosition_btn isUE163', NPTZ_WORDING.wID_0364, callbackButtonControl, BTN_PRESET_POSITION, MenuButtonType.BOTTOM);

                //Connected Solutions
                txtObject[TXT_CONNECTED_SOLUTIONS] = TextCtrl(div, 'setup_main_connected_menu_label isUE163', NPTZ_WORDING.wID_0476);
                btnObject[BTN_VIRTUAL_STUDIO] = MenuButtonCtrl(div, 'setup_menu_virtual_btn isUE163', NPTZ_WORDING.wID_0463, callbackButtonControl, BTN_VIRTUAL_STUDIO, MenuButtonType.TOP);
                btnObject[BTN_P2_CAST] = MenuButtonCtrl(div, 'setup_menu_cast_btn isUE163', NPTZ_WORDING.wID_0536, callbackButtonControl, BTN_P2_CAST, MenuButtonType.MIDDLE);
                btnObject[BTN_VIRTUAL_CSP_CONTROL] = MenuButtonCtrl(div, 'setup_menu_csp_btn isUE163', NPTZ_WORDING.wID_0923, callbackButtonControl, BTN_VIRTUAL_CSP_CONTROL, MenuButtonType.BOTTOM);

                // User Mng
                txtObject[TXT_USER_MNG] = TextCtrl(div_other, 'setup_main_userMng_menu_label isUE163', NPTZ_WORDING.wID_0407);
                // User Mng menu button
                btnObject[BTN_USER_MNG_USER_AUTH] = MenuButtonCtrl(div_other, 'setup_menu_userMng_userAuth_btn isUE163', NPTZ_WORDING.wID_0076, callbackButtonControl, BTN_USER_MNG_USER_AUTH, MenuButtonType.TOP);
                btnObject[BTN_USER_MNG_HOST_AUTH] = MenuButtonCtrl(div_other, 'setup_menu_userMng_hostAuth_btn isUE163', NPTZ_WORDING.wID_0079, callbackButtonControl, BTN_USER_MNG_HOST_AUTH, MenuButtonType.BOTTOM);

                // Network
                txtObject[TXT_NETWORK] = TextCtrl(div_other, 'setup_main_network_label isUE163', NPTZ_WORDING.wID_0108);
                // Network menu button
                btnObject[BTN_NETWORK_NETWORK] = MenuButtonCtrl(div_other, 'setup_menu_network_network_btn isUE163', NPTZ_WORDING.wID_0108, callbackButtonControl, BTN_NETWORK_NETWORK, MenuButtonType.TOP);
                btnObject[BTN_NETWORK_ADVANCE] = MenuButtonCtrl(div_other, 'setup_menu_network_advance_btn isUE163', NPTZ_WORDING.wID_0444, callbackButtonControl, BTN_NETWORK_ADVANCE, MenuButtonType.BOTTOM);

                // Maintenance
                txtObject[TXT_MAINTENACE] = TextCtrl(div_other, 'setup_main_maintenance_menu_label isUE163', NPTZ_WORDING.wID_0408);
                // Maintenance menu button
                btnObject[BTN_MAINTENANCE_SYSTEM_LOG] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_system_log_btn isUE163', NPTZ_WORDING.wID_0399, callbackButtonControl, BTN_MAINTENANCE_SYSTEM_LOG, MenuButtonType.TOP);
                btnObject[BTN_MAINTENANCE_MAINTENANCE] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_maintenance_btn isUE163', NPTZ_WORDING.wID_0408, callbackButtonControl, BTN_MAINTENANCE_MAINTENANCE, MenuButtonType.MIDDLE);
                btnObject[BTN_MAINTENANCE_PRODUCT_INFO] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_product_info_btn isUE163', NPTZ_WORDING.wID_0445, callbackButtonControl, BTN_MAINTENANCE_PRODUCT_INFO, MenuButtonType.MIDDLE);
                // btnObject[BTN_MAINTENANCE_DEFAULT_RESET] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_default_reset_btn', NPTZ_WORDING.wID_0446, callbackButtonControl, BTN_MAINTENANCE_DEFAULT_RESET, MenuButtonType.MIDDLE);
                btnObject[BTN_MAINTENANCE_BACKUP] = MenuButtonCtrl(div_other, 'setup_menu_maintenance_backup_btn isUE163', NPTZ_WORDING.wID_0447, callbackButtonControl, BTN_MAINTENANCE_BACKUP, MenuButtonType.BOTTOM);
            }
            for (var btn in txtObject) {
                txtObject[btn].show();
            }
            for (var btn in btnObject) {
                if(isUE163 && (btn == BTN_SIGNALS_RETURN || btn == BTN_MEDIA_OVER_IP)){
                    continue;
                }
                btnObject[btn].show();
                btnObject[btn].displayOff();
            }

            switch (Platform.fromWitchSetupPage()){
                case '16':
                    btnObject[BTN_USER_MNG_USER_AUTH].displayOn();
                    buildUserMng(16);
                    windowsZoomControlOnResize();
                    break;
                case '17':
                    btnObject[BTN_USER_MNG_HOST_AUTH].displayOn();
                    buildUserMng(17);
                    windowsZoomControlOnResize();
                    break;
                default:
                    btnObject[BTN_SETUP_SETTING_STATUS].displayOn();
                    settingStatus.build();
            }

            SFPModeControlMenu();

        } else {
            rebuild();
        }

        buildMyScroll();
    }

    /**
     * 画面再構築処理
     */
    function rebuild() {
        destroyMyScroll();
        buildMyScroll();
        SFPModeControlMenu();
    }

    function buildMyScroll(){
        if(buildScrollSuccessFlg) {
            buildScrollSuccessFlg = false;
            setTimeout(function () {
                myScroll = new IScroll('#setup_menu_scroll', {
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

    function destroyMyScroll(){
        if(myScroll!=null){
            myScroll.destroy();
            myScroll = null;
        }
    }

    /**
     * Menuボタン押下時の画面表示切替処理
     */
    function callbackButtonControl(mouse, type) {
        $(".btn_touch_af").hide();
        if (mouse == Button.MOUSE_DOWN) {
            if(positionScroll != null){
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
            settingIoaLive.stopLive();
            _live = null;
            // if(type!=BTN_IMAGE_ADJUST  && type!=BTN_PRESET_POSITION && type == BTN_UDP_CROP){
            //
            // }
            //
            if(type != BTN_UDP_CROP){
                settingIoaLive.stopLive();
                _live = null;
                _live_ipout = null;
            }

            $("#setting_Situation,#setup_live_form_tally_ipout").hide();
            $("#setup_basic_div").hide();
            $("#setup_imageAudio_main").hide();
            $("#setup_signals").hide();
            $("#setting_user_mng").hide();
            $("#setting_network").hide();
            $("#setting_maintenance").hide();
            $("#camera_controller_gui").hide();
            $("#setting_basic_system_pan").hide();
            $("#setup_dateTime_main").hide();
            $("#setting_basic_system_status").hide();
            $("#setting_basic_system_labels").show();
            $(".setup_livePage_title").show();
            $("#setup_system").hide();
            $(".basic_system_title_out").hide();
            $(".setup_preset_form_outter_preset_title").hide();
            $("#setup_system_output_main").hide();
            $("#setup_imageAdjust_main,#setting_p2_cast,#ip_out1,#setup_UHDCrop_main,#setting_csp_control").hide();
            $("#setup_advanced_tsl_inner,#setup_advanced_referer_inner,#setup_advanced_mDNS_inner").hide();
            Platform.setFromWitchSetupPage(type);
            switch (type) {
                case BTN_SETUP_SETTING_STATUS:
                    _live = null;
                    $("#setting_Situation").show();
                    settingStatus.build();
                    windowsZoomControlOnResize();
                    break;
                case BTN_BASIC_SYSTEM:
                    buildSetupBasicMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_BASIC_PAN_TILT:
                    buildSetupBasicMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_BASIC_DATE_TIME:
                    buildSetupBasicMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_BASIC_LIVE_PAGE:
                    buildSetupBasicMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_SIGNALS_OUTPUT:
                    buildSetupSignalsMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_SIGNALS_RETURN:
                    buildSetupSignalsMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_SIGNALS_IP_SIGNAL:
                    buildSetupSignalsMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_VIDEO_OVER_IP:
                    _live = null;
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    break;
                 case BTN_MEDIA_OVER_IP:
                    _live = null;
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_AUDIO:
                    _live = null;
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_IMAGE_ADJUST:
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    windowsZoomControlOnResize();
                    break;
                case BTN_MONITOR_DISPLAY:
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_VIRTUAL_STUDIO:
                    _live = null;
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_LENS:
                    _live = null;
                    buildImageOrAudio(type);
                    break;
                case BTN_UDP_CROP:
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    windowsZoomControlOnResize();
                    $("#camera_controller_gui_scroll").css("z-index","-1");
                    $("#camera_controller_gui_scroll").css("top","0");
                    break;
                case BTN_PRESET_POSITION:
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    windowsZoomControlOnResize();

                    if (!Platform.isTouchMode()) {
                        if(buildScrollSuccessFlg && positionScroll == null ) {
                            buildScrollSuccessFlg = false;
                            $("#camera_controller_gui_scroll").css("z-index","999");
                            setTimeout(function () {
                                positionScroll = new IScroll('#camera_controller_gui', {
                                    preventDefault: false,
                                    click: false,
                                    tap: true,
                                    scrollbars: true,
                                    mouseWheel: true,
                                    interactiveScrollbars: true,
                                    shrinkScrollbars: 'scale',
                                    fadeScrollbars: false,
                                    useTransform: false,
                                });
                                buildScrollSuccessFlg = true;
                            }, 200);
                        }
                    }
                    break;
                case BTN_USER_MNG_USER_AUTH:
                    buildUserMng(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_P2_CAST:
                    _live = null;
                    buildImageOrAudio(type);
                    break;
                case BTN_VIRTUAL_CSP_CONTROL:
                    buildImageOrAudio(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_USER_MNG_HOST_AUTH:
                    buildUserMng(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_USER_MNG_PRIORITY_STREAM:
                    buildUserMng(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_NETWORK_NETWORK:
                    buildSetupNetworkMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_NETWORK_ADVANCE:
                    btnObject[BTN_NETWORK_ADVANCE].displayOn();
                    buildSetupNetworkMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_MAINTENANCE_SYSTEM_LOG:
                    buildSetupMaintenancekMenu(type);
                    windowsZoomControlOnResize();
                    break;
                case BTN_MAINTENANCE_MAINTENANCE:
                    buildSetupMaintenancekMenu(type);
                    windowsZoomControlOnResize();
                    break;    
                case BTN_MAINTENANCE_PRODUCT_INFO:
                    buildSetupMaintenancekMenu(type);
                    windowsZoomControlOnResize();
                    break;
                // case BTN_MAINTENANCE_DEFAULT_RESET:
                //     buildSetupMaintenancekMenu(type);
                //     windowsZoomControlOnResize();
                //     break;
                case BTN_MAINTENANCE_BACKUP:
                    buildSetupMaintenancekMenu(type);
                    windowsZoomControlOnResize();
                    break;
                default:
                    _live = null;
                    $("#setting_Situation").show();
                    settingStatus.build();
                    windowsZoomControlOnResize();
                    break;
            }
            if (type != 9) {
                mediaOverIPInstance.clearIntervalSettingStatus();
                mediaOverIPInstance.clearIntervalSettingNmos();
            }
        }
    }

    /**
     *
     * @param type
     */
    function buildImageOrAudio(type) {
        $("#setup_imageAudio_main").show();
        $("#setup_videoOverIp_main").hide();
        $("#setup_audio_main").hide();
        $("#setup_mediaOverIp_main").hide();
        $("#setup_live_form").hide();
        $("#setup_imageAdjust_main").hide();
        $("#setup_monitor_display_main").hide();
        $("#setup_lens_main").hide();
        $("#setup_UHDCrop_main").hide();
        $("#setup_presetPosition_main").hide();
        $("#setup_audio_settingStatus_main").hide();
        $("#setup_audio_audioOverIP_main").hide();
        $("#setup_virtual_main,#setup_virtual_studio_main,#setup_virtual_mode_main,.image_adjust_camera_control").hide();
        $("#setup_virtual_settingStatus_main").hide();
        switch (type) {
            case BTN_VIDEO_OVER_IP:
                $("#setup_videoOverIp_main").show();
                videooverip.build();
                break;
            case BTN_MEDIA_OVER_IP:
                $("#setup_mediaOverIp_main").show();
                mediaOverIPInstance.build();
                break;
            case BTN_AUDIO:
                $("#setup_audio_main").show();
                audioInstance.build();
                break;
            case BTN_IMAGE_ADJUST:
                $("#setup_imageAdjust_main").show();
                $("#setup_live_form,.image_adjust_camera_control").show();
                imageAdjustInstance.build();
                //#8515 ---start
                var iframe = $('#live_Camera_controller_gui');
                var iframeDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
                var element = $(iframeDoc).find('.btn_a_iris_win');
                if (element[1] != undefined && element[1].className.indexOf( "on" ) !== -1 ) {
                    $('#setup_live_iris_setting_mask').show();
                }    
                //#8515 ---end
                break;
            case BTN_MONITOR_DISPLAY:
                $("#setup_monitor_display_main").show();
                monitorDisplay.build();
                Platform.setCurrentPage('monitorDisplay');
                break;
            case BTN_VIRTUAL_STUDIO:
                $("#setup_virtual_main").show();
                $("#setup_virtual_settingStatus_main").show();
                virtualStudioInstance.build();
                break;
            case BTN_LENS:
                $("#setup_lens_main").show();
                lensInstance.build();
                Platform.setCurrentPage('lens');
                break;
            case BTN_UDP_CROP:
                $("#setup_UHDCrop_main,#ip_out1").show();
                $("#setup_live_form,#setup_live_form_tally_ipout").show();
                $("#camera_controller_gui").show();
                settingIoaUhd.build();
                $(".setup_preset_zoom_pos_touch_label").hide();
                $(".setup_preset_zoom_pos_touchOn_radio").hide();
                $(".setup_preset_zoom_pos_touchOff_radio").hide();
                $(".setup_preset_zoom_pos_touchOn_label").hide();
                $(".setup_preset_zoom_pos_touchOff_label").hide();

                $(".setup_preset_focus_adj_touch_label").hide();
                $(".setup_preset_focus_adj_touchOn_radio").hide();
                $(".setup_preset_focus_adj_touchOff_radio").hide();
                $(".setup_preset_focus_adj_touchOn_label").hide();
                $(".setup_preset_focus_adj_touchOff_label").hide();

                $(".camera_ptz_line_6,#camera_preset_title,#camera_adjust_title,.image_adjust_camera_control").hide();
                $("#div_pan_lens_control").show();
                $(".camera_control_setup_left_line").css("top","-20");
                cameraControllerSetting.startSetSliderValue();
                cameraControllerSetting.updateStatus(gPower);
                ImageControlButton.addEventListener();
                $('#setup_live_iris_setting_mask').hide(); //#8515
                break;
            case BTN_PRESET_POSITION:
                $("#setup_presetPosition_main").show();
                $("#setup_live_form").show();
                $("#camera_controller_gui").show();
                $(".setup_preset_form_outter_preset_title").show();
                $(".camera_control_setup_left_line").css("top","-500");
                $("#div_border").hide();
                cameraControllerSetting.initPresetButton();

                Platform.setCurrentPage('setupIoaPresetPosition');
                setupIoaPresetPosition.build();
                cameraControllerSetting.presetSetting.buildPresetAndInput();
                cameraControllerSetting.updateStatus(gPower);
                cameraControllerSetting.setTouchPTZTabOn();
                cameraControllerSetting.startSetSliderValue();
                $(".image_adjust_camera_control").hide();
                $('#setup_live_iris_setting_mask').hide(); //#8515
                break;
            case BTN_P2_CAST:
                $("#setting_p2_cast").show();
                p2CastInstance.build();
                Platform.setCurrentPage('p2cast');
                break;
            case BTN_VIRTUAL_CSP_CONTROL:
                $("#setting_csp_control").show();
                cspControlInstance.build();
                Platform.setCurrentPage('cspControl');
                break;
        }
    }

    /**
     * buildSetupBasicMenu
     * @param type
     */
    function buildUserMng(type) {
        _live = null;
        $("#setting_user_mng").hide();
        $("#setup_videoOverIp_main").hide();
        $("#setup_audio_main").hide();
        $("#setup_live_form").hide();
        switch (type) {
            case BTN_USER_MNG_USER_AUTH:
                $("#setting_user_mng_user").show();
                settingusermng.build(type);
                settingusermng.callbackUserAuth();
                break;
            case BTN_USER_MNG_HOST_AUTH:
                $("#setting_user_mng_host").show();
                settingusermng.build(type);
                settingusermng.callbackHostAuth();
                break;
            case BTN_USER_MNG_PRIORITY_STREAM:
                $("#setting_user_mng_priority").show();
                settingusermng.build(type);
                break;
        }
    }

    /**
     * buildSetupBasicMenu
     * @param type
     */
    function buildSetupBasicMenu(type) {
        _live = null;
        $("#setup_basic_div").show();

        $("#setting_basic_system").hide();
        $("#setup_dateTime_main").hide();
        $("#setup_livePage_main").hide();
        switch (type) {
            case BTN_BASIC_SYSTEM:
                $("#setting_basic_system").show();
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
                $("#div_system_menu").show();
                settingBasicSystem.build();
                break;
            case BTN_BASIC_PAN_TILT:
                $("#setting_basic_system_pan").show();
                $("#div_system_menu").hide();
                settingBasic.buildSetupPantilt();
                break;
            case BTN_BASIC_DATE_TIME:
                $("#setup_dateTime_main").show();
                $("#div_system_menu").hide();
                settingBasic.buildSetupDateTime();
                break;
            case BTN_BASIC_LIVE_PAGE:
                $("#setup_livePage_main").show();
                $("#div_system_menu").hide();
                settingBasic.buildLivePage();
                break;
        }
    }

    function buildSetupSignalsMenu(type) {
        _live = null;
        $("#setup_signals").show();

        $("#setup_output_main").hide();
        $("#setup_return_main").hide();
        $("#setup_ip_signal_main").hide();
        switch (type) {
            case BTN_SIGNALS_OUTPUT:
                $("#setup_output_main").show();
                signalsOutput.build();
                break;
            case BTN_SIGNALS_RETURN:
                $("#setup_return_main").show();
                signalsReturn.build();
                break;
            case BTN_SIGNALS_IP_SIGNAL:
                $("#setup_ip_signal_main").show();
                signalsIpSignal.build();
                break;
        }
    }

    /**
     * buildSetupNetworkMenu
     * @param type
     */
    function buildSetupNetworkMenu(type) {
        _live = null;
        $("#setting_network").show();
        $("#setup_network_main").hide();
        $("#setup_advanced_main").hide();
        switch (type) {
            case BTN_NETWORK_NETWORK:
                $("#setup_network_main").show();
                settingnetwork.buildNetwork();
                break;
            case BTN_NETWORK_ADVANCE:
                $("#setup_advanced_main").show();
                settingNetworkAdvanced.buildAdvanced();
                break;
        }
    }

    /**
     * buildSetupMaintenancekMenu
     * @param type
     */
    function buildSetupMaintenancekMenu(type) {
        _live = null;
        $("#setting_maintenance").show();
        $("#setting_maintenance_log").hide();
        $("#setting_maintenance_maintenance").hide();
        $("#setting_maintenance_info").hide();
        $("#setting_maintenance_reset").hide();
        $("#setting_maintenance_backup").hide();
        switch (type) {
            case BTN_MAINTENANCE_SYSTEM_LOG:
                $("#setting_maintenance_log").show();
                settingMaintenaceLog.buildSetupMaintenanceLog();
                break;
            case BTN_MAINTENANCE_MAINTENANCE:
                $("#setting_maintenance_maintenance").show();
                settingMaintenanceMaintenance.build();
                break;
            case BTN_MAINTENANCE_PRODUCT_INFO:
                $("#setting_maintenance_info").show();
                settingMaintenaceInfo.build();
                break;
            // case BTN_MAINTENANCE_DEFAULT_RESET:
            //     $("#setting_maintenance_reset").show();
            //     settingMaintenaceReset.build();
            //     break;
            case BTN_MAINTENANCE_BACKUP:
                $("#setting_maintenance_backup").show();
                settingMaintenaceBackUp.build();
                break;
        }
    }

    function SFPModeControlMenu() {
        var is12GOutput = cparam_get_SFPMode();

        if(is12GOutput == 0 || cparam_get_moip_active_status() == "NG") {
            if(!isUE163){
                btnObject[BTN_SIGNALS_RETURN].displayDisabled(); 
                btnObject[BTN_MEDIA_OVER_IP].displayDisabled(); 
            }
        } else {
            if(!isUE163){
                btnObject[BTN_SIGNALS_RETURN].displayOff();
                btnObject[BTN_MEDIA_OVER_IP].displayOff(); 
            }
        }

    }
    function getPaintWorker() {
        if(typeof(paintWorker)=="undefined") {
            paintWorker = new Worker("/js/pc/webWorkerPaint.js");
            paintWorker.onmessage=function(event){
                if(event.data.Brightness) {
                    brightnessDataObj = event.data.Brightness;
                }
                if(event.data.Picture) {
                    pictureDataObj = event.data.Picture;
                }
                if(event.data.Matrix) {
                    matrixDataObj = event.data.Matrix;
                }
                if(event.data.GammaKnee) {
                    gammaKneeDataObj = event.data.GammaKnee;
                }
                if(event.data.Detail) {
                    detailDataObj = event.data.Detail;
                }
            };
        }
    }
    function getPaintWorkerObject() {
        return paintWorker;
    }
    return {
        build: build,
        rebuild: rebuild,
        callbackButtonControl:callbackButtonControl,
        destroyMyScroll:destroyMyScroll,
        buildMyScroll:buildMyScroll,
        getPaintWorkerObject: getPaintWorkerObject,
    };
}