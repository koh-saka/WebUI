/**
 * @fileOverview ログイン後のMAIN画面：settingMaintenaceInfo
 *
 * @author Panasonic Corporation
 */

/**
 * カメラリスト領域制御クラスインスタンス
 * @type {CameraList}
 */
var settingMaintenaceReset = SettingMaintenaceReset();

function SettingMaintenaceReset() {
    var gbAct = false;
    var gPower = 1;
    /**
     * labelオブジェクト
     * @type txtMaintenanceResetObject[]
     */
    var txtMaintenanceResetObject = [];
    /**
     * label定義(maintenance_reset) : Reset to the default (Except the network settings)
     * @type number
     */
    var SETUP_MAINTENANCE_RESET_RESET_LABEL = 0;
    /**
     * label定義(maintenance_reset) : Reboot
     * @type number
     */
    var SETUP_MAINTENANCE_RESET_REBOOT_LABEL = 1;
    /**
     * button[]
     * @type btnMaintenanceResetObject[]
     */
    var btnMaintenanceResetObject = [];
    /**
     * Maintenance reset button : Reset to the default (Except the network settings)
     */
    var SETUP_MAINTENANCE_RESET_EXECUTE1_BUTTON = 0;
    /**
     * Maintenance reset button : Reboot
     */
    var SETUP_MAINTENANCE_RESET_EXECUTE2_BUTTON = 1;
    /**
     * 構築フラグ
     * @type boolean
     */

    var buildFlag = false;

    var line1 = null;
    var line2 = null;
    var line3 = null;
    var myDOM  = new Object();
    myDOM.ajax = new Object();

    /**
     * reset設定画面構築処理
     */
    function build() {
        if (!buildFlag) {
            buildFlag = true;
            var setup_maintenance_reset_labels = "setup_maintenance_reset_labels";
            var setup_maintenance_reset_form = "setup_maintenance_reset_form";

            txtMaintenanceResetObject[SETUP_MAINTENANCE_RESET_RESET_LABEL] = TextCtrl(setup_maintenance_reset_labels, 'setup_maintenance_reset_reset_label', NPTZ_WORDING.wID_0400);
            txtMaintenanceResetObject[SETUP_MAINTENANCE_RESET_REBOOT_LABEL] = TextCtrl(setup_maintenance_reset_labels, 'setup_maintenance_reset_reboot_label', NPTZ_WORDING.wID_0401);
            btnMaintenanceResetObject[SETUP_MAINTENANCE_RESET_EXECUTE1_BUTTON] = ButtonCtrl(setup_maintenance_reset_form, "setup_maintenance_reset_execute1_button", NPTZ_WORDING.wID_0154, callbackSettingResetExecute, SETUP_MAINTENANCE_RESET_EXECUTE1_BUTTON);
            btnMaintenanceResetObject[SETUP_MAINTENANCE_RESET_EXECUTE2_BUTTON] = ButtonCtrl(setup_maintenance_reset_form, "setup_maintenance_reset_execute2_button", NPTZ_WORDING.wID_0154, callbackSettingResetExecute, SETUP_MAINTENANCE_RESET_EXECUTE2_BUTTON);
            line1 = LineCtrl('setting_maintenance_reset', "horizontal", 83, 20, 1547,"setup_maintenance_reset_reset_label");
            line2 = LineCtrl('setting_maintenance_reset', "horizontal", 152, 20, 1547,"setup_maintenance_reset_reboot_label");
            for (var txt in txtMaintenanceResetObject) {
                txtMaintenanceResetObject[txt].show();
            }
            for (var btn in btnMaintenanceResetObject) {
                btnMaintenanceResetObject[btn].show();
                btnMaintenanceResetObject[btn].displayOff();
            }
        } else {
            rebuild();
        }
    }

    /**
     * Log設定画面再構築処理
     */
    function rebuild() {
        setSetupMaintenanceResetValueToEle();
    }

    function setSetupMaintenanceResetValueToEle() {
        gPower = cparam_get_powerOnStandby();
        try {
            menubarCtrl.clearAllBtns();
            menubarCtrl.clickBtn("btnMainte");
        }
        catch (e) {

        }
    }

    function callbackSettingResetExecute(mouse, num) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            if (num === SETUP_MAINTENANCE_RESET_EXECUTE1_BUTTON) {
                DoSubmit('data')
            } else if (num === SETUP_MAINTENANCE_RESET_EXECUTE2_BUTTON) {
                DoSubmit('reset')
            }
        } else {
            // 処理なし
        }
    }

    function DoSubmit(sType) {
        var strAlert = "";
        if (sType == "data") {
            strAlert = MSG_STATUS.mID_0054;
        } else if (sType == "reset") {
            strAlert = MSG_STATUS.mID_0055;
        } else {
            return false;
        }
        window.jConfirm(strAlert,NPTZ_WORDING.wID_0039,NPTZ_WORDING.wID_0040,function(confirm){
            if(confirm){
                clearInterval(refresh_power_id);
                $("#dialog_setup").show();
                if (sType == "data") {
                    cparam_set_initializeForMenu();
                    gbAct = false;
                } else {
                    Reset(sType);
                }
                setTimeout(checkIfSuccess, 2000);
            }else{
                return;
            }
        });
    }

    var myDOM = {};
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
    function checkIfSuccess() {
        intervResetId = setInterval(function () {
                sendHeartBeat();
            },
            5000);
    }

    function sendHeartBeat() {
        var url = '/cgi-bin/aw_cam?cmd=QID&res=1';
        var xhr = null;
        xhr = myDOM.ajax.GetHttpRequest(url, DbgCallback2);
    }



    function DbgCallback2(xhr) {
        if (xhr.responseText == "OID:AW-UE150" || xhr.responseText == "OID:AW-UE100") {
            clearInterval(intervResetId);
            $("#dialog_setup").hide();
            jStrAlert(MSG_STATUS.mID_0077, NPTZ_WORDING.wID_0039, function () {
                window.location.href = '/admin/index.html';
            },false);
        }
    }


    function Reset(sType) {
        M.location = "/cgi-bin/initial";
    }

    return {
        build: build
    }
}