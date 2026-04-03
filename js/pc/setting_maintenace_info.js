/**
 * @fileOverview ログイン後のMAIN画面：settingMaintenaceInfo
 *
 * @author Panasonic Corporation
 */

/**
 * カメラリスト領域制御クラスインスタンス
 * @type {CameraList}
 */
var settingMaintenaceInfo = SettingMaintenaceInfo();

function SettingMaintenaceInfo() {
    var objErrCode = MSG_STATUS.mID_0001;
    var gbAct = false;
    var gPath;
    var gPathTxt;
    var gUpdInfo;
    var gUpdInterval;
    var gStsMsg;
    var gTimerID;
    var gFlgBlink;
    var gFlgValid;
    var gStartTime;
    var getPower = gPower;
    var gPwrOnErr = 0x00;
    var gProgress = 0;
    var myDOM = {};
    myDOM.ajax = {};
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildFlag = false;
    /**
     * labelオブジェクト
     * @type txtMaintenanceLogObject[]
     */
    var txtMaintenanceInfoObject = [];
    /**
     * label定義(maintenance_info) : Model no.
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_MODEL_LABEL = 0;
    /**
     * label定義(maintenance_info) : MAC address
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_MAC_LABEL = 1;
    /**
     * label定義(maintenance_info) : Serial no.
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_SERIAL_LABEL = 2;
    /**
     * label定義(maintenance_info) : Firmware version
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_FIRMWARE_LABEL = 3;
    /**
     * label定義(maintenance_info) : CPU Software
     * @type number
     */
    // var SETUP_MAINTENANCE_INFO_CPU_LABEL = 4;
    /**
     * label定義(maintenance_info) : EEPROM
     * @type number
     */
    // var SETUP_MAINTENANCE_INFO_EEPROM_LABEL = 5;
    /**
     * label定義(maintenance_info) : FPGA
     * @type number
     */
    // var SETUP_MAINTENANCE_INFO_FPGA_LABEL = 6;
    /**
     * label定義(maintenance_info) : Activation
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_ACTIVATION_LABEL = 4;
    /**
     * label定義(maintenance_info) : Operation time
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_OPERATION_LABEL = 5;
    /**
     * label定義(maintenance_info) : Viewer software installation counter
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VIEWER_LABEL = 6;
    /**
     * label定義(maintenance_info) : OSS license display
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_OSS_LABEL = 7;
    /**
     * label定義(maintenance_info) : Model no.
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_MODEL_LABEL = 8;
    /**
     * label定義(maintenance_info) value : MAC address
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_MAC_LABEL = 9;
    /**
     * label定義(maintenance_info) value : Serial no.
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_SERIAL_LABEL = 10;
    /**
     * label定義(maintenance_info) value : Firmware version
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_FIRMWARE_LABEL = 11;
    /**
     * label定義(maintenance_info) value : Activation
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_LABEL = 12;
    /**
     * label定義(maintenance_info) value : Operation time
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_OPERATION_LABEL = 13;
    /**
     * label定義(maintenance_info) value : Viewer software installation counter
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_VIEWER_LABEL = 14;

    var SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL = 15;
    /**
     * label定義(maintenance_info) : MAC address(SFP+)
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_MAC_SFP_LABEL = 16;
    /**
     * label定義(maintenance_info) value : MAC address(SFP+)
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_VALUE_MAC_SFP_LABEL = 17;
    /**
     * button[]
     * @type btnMaintenanceInfoObject[]
     */
    var btnMaintenanceInfoObject = [];
    /**
     * Maintenance info button : View
     */
    var SETUP_MAINTENANCE_INFO_VIEW_BUTTON = 0;
    /**
     * Maintenance info button : Select
     */
    var SETUP_MAINTENANCE_INFO_SELECT_BUTTON = 1;
    /**
     * Maintenance info button : Execute
     */
    var SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON = 2;
    /**
     * Maintenance info button : close OSS License
     */
    var SETUP_MAINTENANCE_INFO_CLOSE_LICENSE_BUTTON = 3;
    /**
     * input[] : text
     * @type inputMaintenanceInfoObject[]
     */
    var inputMaintenanceInfoObject = [];
    /**
     * input定義(maintenance_info) : Firmware file
     */
    var SETUP_MAINTENANCE_INFO_FIRMWARE_INPUT = 0;
    /**
     * label定義(maintenance_info) : Firmware file
     * @type number
     */
    var SETUP_MAINTENANCE_INFO_FIRMWARE_FILE_LABEL = 18;
    var setup_maintenance_info_file = null;
    var activation_note;
    var myScroll = null;
    var buildScrollSuccessFlg = true;
    var fileSele;
    var fileElem;

    function build() {
        if(myScroll!=null){
            myScroll.destroy();
            myScroll = null;
        }
        if (!buildFlag) {
            buildFlag = true;
            var setup_maintenance_info_labels = "setup_maintenance_info_labels";
            var setup_maintenance_info_form = "setup_maintenance_info_form";
            if(isUE163){
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_MODEL_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_model_label isUE163', NPTZ_WORDING.wID_0381);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_MAC_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_mac_label', NPTZ_WORDING.wID_0382);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SERIAL_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_serial_label isUE163', NPTZ_WORDING.wID_0383);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_firmware_label isUE163', NPTZ_WORDING.wID_0384);
                // txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_CPU_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_cpu_label', NPTZ_WORDING.wID_0385);
                // txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EEPROM_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_eeprom_label', NPTZ_WORDING.wID_0386);
                // txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FPGA_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_fpga_label', NPTZ_WORDING.wID_0387);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_ACTIVATION_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_activation_label isUE163', NPTZ_WORDING.wID_0072);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_OPERATION_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_operation_label isUE163', NPTZ_WORDING.wID_0388);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEWER_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_viewer_label isUE163', NPTZ_WORDING.wID_0389);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_OSS_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_oss_label isUE163', NPTZ_WORDING.wID_0390);
            }else{
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_MODEL_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_model_label', NPTZ_WORDING.wID_0381);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_MAC_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_mac_label', NPTZ_WORDING.wID_0382);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_MAC_SFP_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_mac_sfp_label', NPTZ_WORDING.wID_0907);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SERIAL_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_serial_label', NPTZ_WORDING.wID_0383);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_firmware_label', NPTZ_WORDING.wID_0384);
                // txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_CPU_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_cpu_label', NPTZ_WORDING.wID_0385);
                // txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EEPROM_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_eeprom_label', NPTZ_WORDING.wID_0386);
                // txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FPGA_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_fpga_label', NPTZ_WORDING.wID_0387);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_ACTIVATION_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_activation_label', NPTZ_WORDING.wID_0072);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_OPERATION_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_operation_label', NPTZ_WORDING.wID_0388);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEWER_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_viewer_label', NPTZ_WORDING.wID_0389);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_OSS_LABEL] = TextCtrl(setup_maintenance_info_labels, 'setup_maintenance_info_oss_label', NPTZ_WORDING.wID_0390);
            }
            if(isUE163){
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MODEL_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_model_label isUE163', NPTZ_WORDING.wID_0381);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MAC_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_mac_label isUE163', NPTZ_WORDING.wID_0382);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_SERIAL_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_serial_label isUE163', NPTZ_WORDING.wID_0383);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_FIRMWARE_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_firmware_label isUE163', NPTZ_WORDING.wID_0384);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_activation_label isUE163', "");
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_activation_moip_label isUE163', "");
                activation_note = TextCtrl(setup_maintenance_info_form, "setup_maintenance_info_value_activation_label_note isUE163", NPTZ_WORDING.wID_0391);
            }else{
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MODEL_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_model_label', NPTZ_WORDING.wID_0381);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MAC_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_mac_label', NPTZ_WORDING.wID_0382);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MAC_SFP_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_mac_sfp_label', NPTZ_WORDING.wID_0907);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_SERIAL_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_serial_label', NPTZ_WORDING.wID_0383);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_FIRMWARE_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_firmware_label', NPTZ_WORDING.wID_0384);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_activation_label', "");
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_activation_moip_label', "");
                activation_note = TextCtrl(setup_maintenance_info_form, "setup_maintenance_info_value_activation_label_note", NPTZ_WORDING.wID_0391);
            }

           
            if(isUE163){
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_OPERATION_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_operation_label isUE163', NPTZ_WORDING.wID_0388);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_VIEWER_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_viewer_label isUE163', NPTZ_WORDING.wID_0389);    
                btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEW_BUTTON] = ButtonCtrl(setup_maintenance_info_form, "setup_maintenance_info_view_button isUE163", NPTZ_WORDING.wID_0432, callbackMaintenanceInfoView);
            }else{
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_OPERATION_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_operation_label', NPTZ_WORDING.wID_0388);
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_VIEWER_LABEL] = TextCtrl(setup_maintenance_info_form, 'setup_maintenance_info_value_viewer_label', NPTZ_WORDING.wID_0389);    
                btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEW_BUTTON] = ButtonCtrl(setup_maintenance_info_form, "setup_maintenance_info_view_button", NPTZ_WORDING.wID_0432, callbackMaintenanceInfoView);
            }
            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON] = ButtonCtrl("setup_maintenance_info_btn_set_area", "setup_maintenance_info_select_button", NPTZ_WORDING.wID_0157, callbackMaintenanceInfoSelect);
            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON] = ButtonCtrl("setup_maintenance_info_btn_set_area", "setup_maintenance_info_execute_button", NPTZ_WORDING.wID_0154, callbackMaintenanceInfoExecute);
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_FILE_LABEL] = TextCtrl("setup_maintenance_info_btn_set_area", 'setup_maintenance_info_firmware_file_label', NPTZ_WORDING.wID_0392);
            inputMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_INPUT] = InputCtrl("setup_maintenance_info_btn_set_area", 'setup_maintenance_info_firmware_input', '', 'setup_maintenance_info_firmware_input', '');
            setup_maintenance_info_file = buildInputFileObject("fw_form", "fw_path", "fw_path", "setup_maintenance_info_firmware_input", "setup_maintenance_info_select_button");
            $('#fw_path').attr('accept', '.upd,.bin'); //add 対応3611(1)

            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_CLOSE_LICENSE_BUTTON] = ButtonCtrl("setting_maintenance_info_oss_license_set_area", "setup_maintenance_info_close_license_button", NPTZ_WORDING.wID_0427, callbackMaintenanceInfoCloseLicense);

            $(".setup_maintenance_info_firmware_file_label").attr('id', 'fw_title');
            for (var txt in txtMaintenanceInfoObject) {
                txtMaintenanceInfoObject[txt].show();
            }
            for (var btn in btnMaintenanceInfoObject) {
                btnMaintenanceInfoObject[btn].show();
                btnMaintenanceInfoObject[btn].displayOff();
            }
            inputMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_INPUT].displayDisabled();
            inputMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_INPUT].show();

            if(isUE163){
                // LineCtrl("setup_maintenance_info_inner", "vertical", 264, 37, 258,"setup_maintenance_info_firmware_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 103, 20, 1547,"setup_maintenance_info_model_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 172, 20, 1547,"setup_maintenance_info_mac_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 172, 20, 1547,"setup_maintenance_info_mac_sfp_label");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 241, 20, 1547,"setup_maintenance_info_serial_label");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 374, 50, 1518,"setup_maintenance_info_cpu_label","96.5");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 467, 50, 1518,"setup_maintenance_info_eeprom_label","96.5");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 568, 20, 1547,"setup_maintenance_info_fpga_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 637, 20, 1547,"setup_maintenance_info_activation_label_isUE163");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 706, 20, 1547,"setup_maintenance_info_operation_label_isUE163");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 775, 20, 1547,"setup_maintenance_info_viewer_label_isUE163");
            }else{
                // LineCtrl("setup_maintenance_info_inner", "vertical", 264, 37, 258,"setup_maintenance_info_firmware_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 103, 20, 1547,"setup_maintenance_info_model_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 172, 20, 1547,"setup_maintenance_info_mac_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 172, 20, 1547,"setup_maintenance_info_mac_sfp_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 241, 20, 1547,"setup_maintenance_info_serial_label");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 374, 50, 1518,"setup_maintenance_info_cpu_label","96.5");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 467, 50, 1518,"setup_maintenance_info_eeprom_label","96.5");
                // LineCtrl("setup_maintenance_info_inner", "horizontal", 568, 20, 1547,"setup_maintenance_info_fpga_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 637, 20, 1547,"setup_maintenance_info_activation_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 706, 20, 1547,"setup_maintenance_info_operation_label");
                LineCtrl("setup_maintenance_info_inner", "horizontal", 775, 20, 1547,"setup_maintenance_info_viewer_label");
            }
            setSetupMaintenanceInfoValueToEle();

            var fileSelect = document.getElementsByClassName("setup_maintenance_info_select_button")[1];
            var fileElem = document.getElementById("fw_path");
            fileSelect.addEventListener("click", function (e) {
                if (fileElem) {
                    fileElem.click();
                }
                e.preventDefault(); // prevent navigation to "#"
            }, false);

        } else {
            rebuild();
        }
        buildMyScroll();
    }

    function rebuild() {
        setSetupMaintenanceInfoValueToEle();
    }

    function setSetupMaintenanceInfoValueToEle() {
        $("#setting_maintenance_info_normal").show();
        $("#setting_maintenance_info_oss_license").hide();
        gForm = document.getElementById("fw_form");
        gPath = document.getElementById("fw_path");
        gPathTxt = document.getElementById("setup_maintenance_info_firmware_input");
        gUpdInfo = document.getElementById("upd_info");
        gUpdInterval = document.getElementById("upd_interval");
        gStsMsg = document.getElementById("status_message");
        btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON].displayDisabled();

        gPath.onchange = CheckFirmwareType;
        gPath.onkeydown = checkKeyDown;
        gPath.style.imeMode = "disabled";
        gPathTxt.style.imeMode = "disabled";

        gUpdInfo.innerHTML = "<br><br>";
        gUpdInterval.innerHTML = "<br>";

        gFlgValid = false;
        // CGIを送信
        cparam_updateProductInfo();

        if(isUE163){
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MODEL_LABEL].set(cparams["name"]);
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MAC_LABEL].set(cparams["macadr"].replace(/:/g, "-"));
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_SERIAL_LABEL].set(cparams["serial"]);
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_FIRMWARE_LABEL].set(cparam_get_systemVersion());
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_OPERATION_LABEL].set(cparams["opetime"] + "h");
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_VIEWER_LABEL].set(cparam_cgi_gaxcIso());
        }else{
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MODEL_LABEL].set(cparams["name"]);
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MAC_LABEL].set(cparams["macadr"].replace(/:/g, "-"));
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_MAC_SFP_LABEL].set(cparams["lan1_macadr"].replace(/:/g, "-"));
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_SERIAL_LABEL].set(cparams["serial"]);
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_FIRMWARE_LABEL].set(cparam_get_systemVersion());
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_OPERATION_LABEL].set(cparams["opetime"] + "h");
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_VIEWER_LABEL].set(cparam_cgi_gaxcIso());
        }
//        if (cparams.ndihx_activate_model || ((isUE160 || isUCW4380) && !isUE163)) {
//            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_LABEL].set(NPTZ_WORDING.wID_0542);
//            if(cparam_get_moip_active_status() == "OK" && !isUE163){
//                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL].set(NPTZ_WORDING.wID_0859);
//            }else{
//                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL].set("");
//            }
//            activation_note.show();
//        }
        if (cparams.ndihx_activate_model) {
            txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_LABEL].set(NPTZ_WORDING.wID_0542);
            if(cparam_get_moip_active_status() == "OK"){
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL].set(NPTZ_WORDING.wID_0859);
            }else{
                txtMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VALUE_ACTIVATION_MOIP_LABEL].set("");
            }
            activation_note.show();
        }
    }


    function callbackMaintenanceInfoView(mouse) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            OpenLicense();
        } else {
            // 処理なし
        }
    }

    function callbackMaintenanceInfoSelect(mouse) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {

        } else {
            // 処理なし
        }
    }

    function callbackMaintenanceInfoExecute(mouse) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            ExecVerUp();
        } else {
            // 処理なし
        }
    }

    function callbackMaintenanceInfoCloseLicense(mouse) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            $("#setting_maintenance_info_oss_license").hide();
            $("#setting_maintenance_info_normal").show();
        } else {
            // 処理なし
        }
    }

    function checkKeyDown() {
        if (( event.keyCode != 37 ) && ( event.keyCode != 39 )) {
            return false;
        }
    }

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
                        jAlert(MSG_STATUS.mID_0067, NPTZ_WORDING.wID_0039);
                        return null;
                    }
                }
            }
        } else {
            return null;
        }

        if (xhr != null) {
            xhr.open('GET', url, true);
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

    function DbgCallback2(xhr) {
        if (( xhr.status ) == 200) {
            gFlgFinProcess++;
        } else {
            gFlgFinProcess = 0;
        }
    }

    function DbgCallback(xhr) {
        var resValue = "";
        if (( xhr.status ) == 200) {
            if (xhr.responseText.indexOf(":NG") < 0) {
                resValue = xhr.responseText.slice(17, 19);
                gPwrOnErr = parseInt(resValue, 16);
                CheckPowerOnError();
            } else {
                setTimeout("GetPowerOnError()", 1000);
            }
        } else {
            setTimeout("GetPowerOnError()", 1000);
        }
    }

    function CheckPowerOnError() {
        var tmpErrNo = 0;
        if (getPower < 0) {
            tmpErrNo = ( 0 - getPower );
            document.getElementById("fw_title").style.color = "#808080";
            gPath.disabled = true;
            gPathTxt.disabled = true;
            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
            gStsMsg.style.color = "#FF0000";
            gStsMsg.innerHTML = "[ Power State Check Error " + tmpErrNo + " ] Reboot the camera and access this page again .";
        } else {
            if (getPower == 1) {
                if (gPwrOnErr == 0x00) {
                    document.getElementById("fw_title").style.color = "#000000";
                    gPath.disabled = false;
                    gPathTxt.disabled = false;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayOff();
                    gStsMsg.style.color = "#00FF00";
                    gStsMsg.innerHTML = "Select the firmware file.<br>"
                        + " [Camera] *.bin  &nbsp / &nbsp"
                        + " [Network] *.img  &nbsp / &nbsp"
                        + " [EEPROM] *.eep";
                    return;
                } else if (gPwrOnErr == 0x06) {
                    document.getElementById("fw_title").style.color = "#808080";
                    gPath.disabled = true;
                    gPathTxt.disabled = true;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
                    gStsMsg.style.color = "#FFFF00";
                    if (gProgress == 0) {
                        gStsMsg.innerHTML = "Waiting for boot-up process of camera";
                        gProgress++;
                    } else if (gProgress > 10) {
                        gStsMsg.innerHTML = "Waiting for boot-up process of camera .";
                        gProgress = 2;
                    } else {
                        gStsMsg.innerHTML += " .";
                        gProgress++;
                    }
                    return;
                } else {
                    // DO NOTHING
                }
            }

            switch (gPwrOnErr) {
                case 0x00:
                case 0x06:
                    document.getElementById("fw_title").style.color = "#808080";
                    gPath.disabled = true;
                    gPathTxt.disabled = true;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
                    gStsMsg.style.color = "#FFA500";
                    gStsMsg.innerHTML = "[ Standby ] Change power state to \"Power ON\" before updating firmware .";
                    break;
                case 0x07:
                    document.getElementById("fw_title").style.color = "#000000";
                    gPath.disabled = false;
                    gPathTxt.disabled = false;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayOff();
                    gStsMsg.style.color = "#FFA500";
                    gStsMsg.innerHTML = "[ Interface EEPROM Read Error ] Update \"EEPROM / Interface\" ( .eep ) .";
                    break;
                case 0x01:
                    document.getElementById("fw_title").style.color = "#808080";
                    gPath.disabled = true;
                    gPathTxt.disabled = true;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
                    gStsMsg.style.color = "#FF0000";
                    gStsMsg.innerHTML = "[ Camera Main Comm. Error ] Reboot the camera and access this page again .";
                    break;
                case 0x02:
                    document.getElementById("fw_title").style.color = "#000000";
                    gPath.disabled = false;
                    gPathTxt.disabled = false;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayOff();
                    gStsMsg.style.color = "#FFA500";
                    gStsMsg.innerHTML = "[ Frontend FPGA Config Error ] Update \"FPGA / Frontend\" ( .ffe ) .";
                    break;
                case 0x03:
                    document.getElementById("fw_title").style.color = "#808080";
                    gPath.disabled = true;
                    gPathTxt.disabled = true;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
                    gStsMsg.style.color = "#FF0000";
                    gStsMsg.innerHTML = "[ Servo Comm. Error ] Reboot the camera and access this page again .";
                    break;
                case 0x08:
                    document.getElementById("fw_title").style.color = "#000000";
                    gPath.disabled = false;
                    PathTxt.disabled = false;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayOff();
                    gStsMsg.style.color = "#FFA500";
                    gStsMsg.innerHTML = "[ Power-On Sync Data Error ]<br>";
                    gStsMsg.innerHTML += "&nbsp;&nbsp;Update <span id=\"id_ul\">Both \"EEPROM / Interface\" and \"EEPROM / Camera Main\"<" + "/span> ( .eep ) .";
                    document.getElementById("id_ul").style.textDecoration = "underline";
                    break;
                case 0x09:
                    document.getElementById("fw_title").style.color = "#808080";
                    gPath.disabled = true;
                    PathTxt.disabled = true;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
                    gStsMsg.style.color = "#FF0000";
                    gStsMsg.innerHTML = "[ Power-On Sync Comm. Error ] Reboot the camera and access this page again .";
                    break;
                default:
                    document.getElementById("fw_title").style.color = "#808080";
                    gPath.disabled = true;
                    PathTxt.disabled = true;
                    btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayDisabled();
                    gStsMsg.style.color = "#FF0000";
                    gStsMsg.innerHTML = "[ Unknown Error ] Reboot the camera and access this page again .";
                    break;
            }
        }
    }

    function GetPowerOnError() {
        var url = '/cgi-bin/aw_evr?cmd=AD10;%25RE:0713:01&res=1';
        var xhr = null;
        xhr = myDOM.ajax.GetHttpRequest(url, DbgCallback);

        if (!xhr) {
            setTimeout("GetPowerOnError()", 1000);
        } else {
            // DO NOTHING
        }
    }

    function CheckFirmwareType() {
        var extensionList = new Array("upd","bin");
        var intervalList = [7200, 7200];
        var intervalList1 = [300, 0];  // 秒単位
        var intervalList2 = [300, 0];  // 秒単位 : process.html の値と合わせる必要あり
        var intervalAll = 0;
        var intervalStep1 = 0;
        var intervalStep2 = 0;
        var i;
        var extColor;
        var extFontWeight;
        var sExtStr = "";
        var iExtPos = -1;

        iExtPos = gPath.value.lastIndexOf(".", gPath.value.length);
        if (iExtPos == -1) {
            inputMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_FIRMWARE_INPUT].set();
            gFlgValid = false;
        } else {
            sExtStr = gPath.value.substring(( iExtPos + 1 ), gPath.value.length);
            gFlgValid = false;
            for (i = 0; i < extensionList.length; i++) {
                extColor = "#FFFFFF";
                extFontWeight = "normal";
                if (sExtStr.toUpperCase() == extensionList[i].toUpperCase()) {
                    gFlgValid = true;
                    extColor = "#00FF00";
                    extFontWeight = "bold";
                    intervalAll = Math.ceil(( intervalList[i] ) / 60);
                    intervalStep1 = intervalList1[i];
                    intervalStep2 = Math.ceil(intervalList2[i] / 60);
                } else {
                    // DO NOTHING
                }
                switch (extensionList[i]) {
                    case "bin":
                        // document.getElementById("t_bin1").style.color = extColor;
                        // document.getElementById("t_bin2").style.color = extColor;
                        // document.getElementById("t_bin1").style.fontWeight = extFontWeight;
                        // document.getElementById("t_bin2").style.fontWeight = extFontWeight;
                        break;
                    case "img":
                        document.getElementById("t_img1").style.color = extColor;
                        document.getElementById("t_img2").style.color = extColor;
                        document.getElementById("t_img1").style.fontWeight = extFontWeight;
                        document.getElementById("t_img2").style.fontWeight = extFontWeight;
                        break;
                    case "eep":
                        document.getElementById("t_eep").style.color = extColor;
                        document.getElementById("t_eep").style.fontWeight = extFontWeight;
                        break;
                    default:
                        break;
                }
            }
        }

        if (gFlgValid == true) {
            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON].displayOff();
            gUpdInfo.innerHTML = "It will take <span style=\"color: #EE4000\">around " + intervalAll + " minute" + plural(intervalAll) + " <" + "/span> to complete the update .<br>";
            gUpdInfo.innerHTML += "Please wait and do not operate the browser during this process .";
        } else {
            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON].displayDisabled();
            gUpdInfo.innerHTML = "<br><br>";
            gUpdInterval.innerHTML = "<br>";
            gUpdInfo.style.color = "#FF8000";
            gUpdInfo.innerHTML = "[ Error ] Invalid firmware file . Select again .";
        }
    }

    function GetCommFormState() {
        if (gFlgBlink == false) {
            gStsMsg.innerHTML = "[ Step 1/2 ] Sending firmware file ...";
            ViewPassTime();
            gFlgBlink = true;
        } else {
            gStsMsg.innerHTML = "";
            gFlgBlink = false;
        }
    }

    function ViewPassTime() {
        var now;
        var diff;
        var min;
        var sec;

        now = new Date();
        diff = parseInt(( now.getTime() - gStartTime.getTime() ) / 1000);
        min = parseInt(( diff / 60 ) % 60);
        sec = parseInt(diff % 60);
        if (min < 10) {
            min = ( "0" + min );
        } else {
            // DO NOTHING
        }
        if (sec < 10) {
            sec = ( "0" + sec );
        } else {
            // DO NOTHING
        }
        gStsMsg.innerHTML += "&nbsp;&nbsp;(" + min + ":" + sec + ")";
        gUpdInfo.innerHTML = "Sending firmware file ... (" + min + ":" + sec + ")";
        gUpdInfo.style.color = "#20B020";

        if (min >= 5) {
            clearInterval(gTimerID);
            alert("[ Error ] Response time out . \nReboot the camera manually , \nand retry to access around 1 minute later .   ");
            gStsMsg.style.color = "#FFA500";
            gStsMsg.innerHTML = "[ Error ] Response time out.<br>"
                + "Reboot the camera manually , \nand retry to access around 1 minute later .";
        } else {
            // DO NOTHING
        }
    }

    function ExecVerUp() {
        clearInterval(refresh_power_id);
        var bVerUp = false;

        if (!gFlgValid) {
            return;
        } else {
            // DO NOTHING
        }

        if (!gbAct) {
            gbAct = true;
            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON].displayDisabled();
        } else {
            return false;
        }

        var filetype = chkfile_uploadFilename(gPath.value);
        if (!filetype) {
            capi_DispError(gPath, objErrCode);
            gbAct = false;
            return false;
        } else {
            bVerUp = true;
        }

        if (bVerUp) {
            if (jConfirm(MSG_STATUS.mID_0037, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
                    if (confirm) {
                        // try {
                        //     titlebar_main_StopRefreshTimer();
                        // } catch (e) {
                        //     // DO NOTHING
                        // }
                        try {

                            $("#maintenance_info_file_display_label").show();
                            $("#maintenance_info_file_transfer").show();
                            var ajax_option = {
                                success: function (data) {
                                    IEsuccessFlag = 1; //success
                                    $("#maintenance_info_file_transfer").hide();
                                    completeUploadFile();
                                },
                                error: function () {
                                    IEsuccessFlag = 2; //error
                                    jAlert(MSG_STATUS.mID_0068, NPTZ_WORDING.wID_0039);
                                    $("#maintenance_info_file_transfer").hide();
                                    $("#maintenance_info_file_display_label").hide();
                                }
                                ,
                                xhr: function () {
                                    var xhr = $.ajaxSettings.xhr();
                                    if (onprogress && xhr.upload) {
                                        xhr.upload.addEventListener("progress", onprogress, false);
                                        return xhr;
                                    }
                                }
                                ,
                                timeout:5400000
                            };
                            setTimeout(function () {
                                $('#fw_form').ajaxSubmit(ajax_option);
                            }, 1000);
                            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEW_BUTTON].displayDisabled();
                            gFlgBlink = false;
                            gStartTime = new Date();
                        } catch (e) {
                            jAlert(MSG_STATUS.mID_0069, NPTZ_WORDING.wID_0039);
                            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON].displayOff();

                            gPath.disabled = false;
                            gPathTxt.disabled = false;
                            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_SELECT_BUTTON].displayOff();
                            btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEW_BUTTON].displayOff();
                            gbAct = false;
                            return false;
                        }

                    } else {
                        btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_EXECUTE_BUTTON].displayOff();
                        gbAct = false;
                        return false;
                    }
                })) ;
        } else {
            gbAct = false;
            bVerUp = false;
        }
    }

    var IEsuccessFlag = 0;
    var maxWidth = 400;
    function onprogress(evt) {
        var loaded = evt.loaded;
        var tot = evt.total;
        var per = Math.floor(100 * loaded / tot);
        $("#maintenance_info_file_transfer_slider_process_inner").css({
            width: per * maxWidth / 100 + "px"
        });
    }

    var gInterval;
    var gBlinkTimerID;
    var gBarUpdateTimerID;
    var gHeartBeatTimerID;
    var gBarPercent;
    var gFlgFinProcess;
    var gForm;
    var gShowMsg = true;

    function completeUploadFile() {
        $("#maintenance_info_version_up").show();
        gFlgBlink = 0;
        gFlgFinProcess = 0;
        gBarPercent = 0;
        gForm = document.getElementById("fw_form");
        gInterval = 60;
        gForm.action = "#";
        gForm.onsubmit = function () {
            return false;
        };
        if (gInterval != 0) {
            gStartTime = new Date();
            gBlinkTimerID = setInterval(checkFinProcess, 500);
            gBarUpdateTimerID = setInterval(updateProgressBar, ( ( gInterval * 1000 ) / 100 ));
            setTimeout(function(){
                gHeartBeatTimerID = setInterval(sendHeartBeat, 1000);  // ★ テスト時はコメントアウト
            },5000);
        } else {
            // DO NOTHING
        }
    }

    function changeProgressBar(percent) {
        if (percent == 100) {
        }
        $("#maintenance_info_version_up_slider_process_inner").css({
            width: percent * maxWidth / 100 + "px"
        });
    }

    function updateProgressBar() {
        if (gBarPercent < 99) {
            gBarPercent++;
            changeProgressBar(gBarPercent);
        } else {
        }
    }

    function sendHeartBeat() {
        var url = '/cgi-bin/aw_cam?cmd=QID&res=1';
        var xhr = null;
        xhr = myDOM.ajax.GetHttpRequest(url, DbgCallback2);

        if (!xhr) {
            jAlert(MSG_STATUS.mID_0070, NPTZ_WORDING.wID_0039);
            clearInterval(gBlinkTimerID);
            clearInterval(gBarUpdateTimerID);
            clearInterval(gHeartBeatTimerID);
        } else {
            // DO NOTHING
        }
    }

    function checkFinProcess() {
        var now;
        var diff;
        var min;
        var sec;

        now = new Date();
        diff = parseInt(( now.getTime() - gStartTime.getTime() ) / 1000);
        min = parseInt(( diff / 60 ) % 60);
        sec = parseInt(diff % 60);

        if (( min >= 60 ) || ( diff >= ( gInterval * 120 ) )) {
            clearInterval(gBlinkTimerID);
            clearInterval(gBarUpdateTimerID);
            clearInterval(gHeartBeatTimerID);
            jAlert(MSG_STATUS.mID_0071,NPTZ_WORDING.wID_0039);
        } else {
            if (gFlgFinProcess >= 3) {
                changeProgressBar(100);
                clearInterval(gBlinkTimerID);
                clearInterval(gBarUpdateTimerID);
                clearInterval(gHeartBeatTimerID);
                setTimeout(showMessage, 200);
            } else {
                if (gFlgBlink == 0) {
                    gFlgBlink = 1;
                } else {
                    gFlgBlink = 0;
                }
            }
        }

        // if (min < 10) {
        //     min = ( "0" + min );
        // } else {
        //     // DO NOTHING
        // }

        // if (sec < 10) {
        //     sec = ( "0" + sec );
        // } else {
        //     // DO NOTHING
        // }
    }

    function showMessage() {
        if (gShowMsg) {
            jStrAlert(MSG_STATUS.mID_0077, NPTZ_WORDING.wID_0039, function () {
                location.reload();
            },false);
            setTimeout(closeUpdateWindow, 2000);
        }
    }

    function closeUpdateWindow() {
        $("#maintenance_info_version_up").hide();
        $("#maintenance_info_file_display_label").hide();
        btnMaintenanceInfoObject[SETUP_MAINTENANCE_INFO_VIEW_BUTTON].displayOff();
    }

    function titlebar_main_StopRefreshTimer() {
        clearTimeout(gidTimer);
    }

    function plural(sValue) {
        var char = "s";

        if (sValue < 2) {
            char = "";
        }
        return char;
    }

    function completeSubmit() {
        if (gFlgValid) {
            var win = document.getElementById("E").contentWindow;
            if (typeof win.document === "unknown") {
                // fail.
                cparams.title = null;
                cparam_updateTitle();
                return;
            }
        }
    }

    function OpenLicense() {
        $("#setting_maintenance_info_oss_license").show();
        $("#setupInfoOssLicense").html(setupInfoOssLicense);
        $("#setting_maintenance_info_normal").hide();
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
                myScroll = new IScroll('#setup_maintenance_info_inner_scroll', {
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
            }, 500)
        }
    }
    return {
        build: build,
        destroyMyScroll:destroyMyScroll,
        buildMyScroll:buildMyScroll
    }
}