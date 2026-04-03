/**
 * @fileOverview ログイン後のMAIN画面：settingMaintenaceInfo
 *
 * @author Panasonic Corporation
 */

/**
 * カメラリスト領域制御クラスインスタンス
 * @type {CameraList}
 */
var settingMaintenaceBackUp = SettingMaintenaceBackUp();

function SettingMaintenaceBackUp() {
    var objErrCode = MSG_STATUS.mID_0001;
    var gbAct = false;
    var gPathUL;
    var gProcessType;
    var gFlgValid;
    var gLimitTime;
    var gBlinkTimerID;
    var gHeartBeatTimerID;
    var gFlgBlink;
    var gFlgFinProcess;
    var gStartTime = new Date();
    var gMin = 0;
    var gSec = 0;

    var myDOM = {};
    myDOM.ajax = {};

    /**
     * 構築フラグ
     * @type boolean
     */
    var buildFlag = false;
    /**
     * labelオブジェクト
     * @type txtMaintenanceBackupObject[]
     */
    var txtMaintenanceBackupObject = [];
    /**
     * label定義(maintenance_Backup) : Download
     * @type number
     */
    var SETUP_MAINTENANCE_BACKUP_DOWNLOAD_LABEL = 0;
    /**
     * label定義(maintenance_Backup) : Config data type (Download)
     * @type number
     */
    var SETUP_MAINTENANCE_BACKUP_CONFIGDATATYPE_DOWNLOAD_LABEL = 1;
    /**
     * label定義(maintenance_Backup) : Upload
     * @type number
     */
    var SETUP_MAINTENANCE_BACKUP_UPLOAD_LABEL = 2;
    /**
     * label定義(maintenance_Backup) : Config data type (Upload)
     * @type number
     */
    var SETUP_MAINTENANCE_BACKUP_CONFIGDATATYPE_UPLOAD_LABEL = 3;
    /**
     * label定義(maintenance_Backup) : Config data
     * @type number
     */
    var SETUP_MAINTENANCE_BACKUP_CONFIGDATA_LABEL = 4;
    /**
     * label定義(maintenance_Backup) : Scene update
     * @type number
     */
    var SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_LABEL = 5;

    /**
     * select[]
     * @type selectMaintenanceBackupObject[]
     */
    var selectMaintenanceBackupObject = [];
    /**
     * select定義(maintenance_backup) : Config data type (Download)
     */
    var SETUP_MAINTENANCE_BACKUP_CONFIGDATA_DOWNLOAD_SELECT = 0;
    /**
     * select定義(maintenance_backup) : Config data type (Upload)
     */
    var SETUP_MAINTENANCE_BACKUP_CONFIGDATA_UPLOAD_SELECT = 1;

    /**
     * button[]
     * @type btnMaintenanceBackupObject[]
     */
    var btnMaintenanceBackupObject = [];
    /**
     * Maintenance backup button : Download
     */
    var SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON = 0;
    /**
     * Maintenance backup button : configdata file select
     */
    var SETUP_MAINTENANCE_BACKUP_FILE_SELECT_BUTTON = 1;
    /**
     * Maintenance backup button : configdata file select
     */
    var SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON = 2;

    /**
     * input[] : text
     * @type inputMaintenanceBackupObject[]
     */
    var inputMaintenanceBackupObject = [];
    /**
     * input定義(maintenance_backup) : configdata file
     */
    var SETUP_MAINTENANCE_BACKUP_CONFIGDATA_INPUT = 0;
    var setup_maintenance_backup_file = null;

    /**
     * radio[] : radio button
     * @type radioMaintenanceBackupObject[]
     */
    var radioMaintenanceBackupObject = [];
    /**
     * input定義(maintenance_backup) : configdata file
     */
    var SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_RADIO = 0;

    var line1 = null;
    var line2 = null;
    var line3 = null;
    var line4 = null;
    var line5 = null;
    var line6 = null;
    var line7 = null;
    var line8 = null;
    /**
     * Log設定画面構築処理
     */
    function build() {
        if (!buildFlag) {
            buildFlag = true;
            var setup_maintenance_backup_labels = "setup_maintenance_backup_labels";
            var setup_maintenance_backup_form = "setup_maintenance_backup_form";
            txtMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_DOWNLOAD_LABEL] = TextCtrl(setup_maintenance_backup_labels, 'setup_maintenance_backup_download_label', NPTZ_WORDING.wID_0067);
            txtMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATATYPE_DOWNLOAD_LABEL] = TextCtrl(setup_maintenance_backup_labels, 'setup_maintenance_backup_configdatatype_download_label', NPTZ_WORDING.wID_0068);
            txtMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_LABEL] = TextCtrl(setup_maintenance_backup_labels, 'setup_maintenance_backup_upload_label', NPTZ_WORDING.wID_0069);
            txtMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATATYPE_UPLOAD_LABEL] = TextCtrl(setup_maintenance_backup_labels, 'setup_maintenance_backup_configdatatype_upload_label', NPTZ_WORDING.wID_0068);
            txtMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_LABEL] = TextCtrl(setup_maintenance_backup_labels, 'setup_maintenance_backup_scene_update_label', NPTZ_WORDING.wID_0936);
            txtMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_LABEL] = TextCtrl(setup_maintenance_backup_labels, 'setup_maintenance_backup_configdata_label', NPTZ_WORDING.wID_0070);
            selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_DOWNLOAD_SELECT] = SelectCtrl(setup_maintenance_backup_form, "", "datatype", "setup_maintenance_backup_configdata_download_select");
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON] = ButtonCtrl(setup_maintenance_backup_form, "setup_maintenance_backup_download_button", NPTZ_WORDING.wID_0067, callbackSettingBackExecute, SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON);
            selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_UPLOAD_SELECT] = SelectCtrl(setup_maintenance_backup_form, "", "datatype2", "setup_maintenance_backup_configdata_upload_select", callbackBackupConfigData);
            inputMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_INPUT] = InputCtrl(setup_maintenance_backup_form, 'setup_maintenance_backup_configdata_input', '', 'setup_maintenance_backup_configdata_input', '');
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_FILE_SELECT_BUTTON] = ButtonCtrl(setup_maintenance_backup_form, "setup_maintenance_backup_file_select_button", NPTZ_WORDING.wID_0157, callbackSettingBackupFileSelect);
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON] = ButtonCtrl(setup_maintenance_backup_form, "setup_maintenance_backup_upload_button", NPTZ_WORDING.wID_0069, callbackSettingBackExecute, SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON);
            setup_maintenance_backup_file = buildInputFileObject("back_form", "path_ul", "backupdata", "setup_maintenance_backup_configdata_input", "setup_maintenance_backup_file_select_input");
            radioMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_RADIO] = RadioButtonGroupCtrl('setup_maintenance_backup_form', "setup_maintenance_backup_scene_update_", RADIO_GROUP.rID_0001, getSceneUpdateValue(), callbackSceneUpdate);

            line1 = LineCtrl('setting_maintenance_backup', "horizontal", 150, 20, 1547,"setup_maintenance_backup_configdatatype_download_label");
            line2 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_configdatatype_upload_label");
            line3 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_configdata_download_select");
            line4 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_configdatatype_upload_select","96.3");
            line5 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_configdata_input");
            line6 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_configdata_download","96.3");
            line7 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_scene_update","96.3");
            line8 = LineCtrl('setting_maintenance_backup', "horizontal", 349, 20, 1547,"setup_maintenance_backup_configdatatype_upload","96.3");

            setTimeout(function(){
                //20190118 #3803 add with wpz
                var fileSelect = document.getElementsByClassName("setup_maintenance_backup_file_select_button")[0];
                var fileElem = document.getElementById("path_ul");
                    fileSelect.addEventListener("click", function (e) {
                    if (fileElem) {
                        fileElem.click();
                    }
                    e.preventDefault();
                }, false);
            },500);

            for (var txt in txtMaintenanceBackupObject) {
                txtMaintenanceBackupObject[txt].show();
            }
            for (var btn in btnMaintenanceBackupObject) {
                btnMaintenanceBackupObject[btn].show();
                btnMaintenanceBackupObject[btn].displayOff();
            }
            inputMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_INPUT].displayDisabled();
            inputMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_INPUT].show();
            for (var select in selectMaintenanceBackupObject) {
                selectMaintenanceBackupObject[select].show();
                selectMaintenanceBackupObject[select].displayOff();
            }
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
            setSetupMaintenanceBackupValueToEle();
            callbackBackupConfigData();
        } else {
            rebuild();
        }
    }

    /**
     * Log設定画面再構築処理
     */
    function rebuild() {
        setSetupMaintenanceBackupValueToEle();
        callbackBackupConfigData();
        radioMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_RADIO].setSelectedValue(getSceneUpdateValue());
    }

    function setSetupMaintenanceBackupValueToEle() {
        setSetupMaintenanceBackupValueToDownloadSelect();
        setSetupMaintenanceBackupValueToUploadSelect();
        InitThisPage();
    }

    function setSetupMaintenanceBackupValueToDownloadSelect() {
        var select_maintenance_backup_download_value = [];
        var select_maintenance_backup_download_text = [];
        select_maintenance_backup_download_value.push(
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "50",
            "51",
            "52",
            "98" ,
            "60"
        );
        select_maintenance_backup_download_text.push(
            "Camera(CURRENT)",
            "Camera(SCENE1)",
            "Camera(SCENE2)",
            "Camera(SCENE3)",
            "Camera(SCENE4)",
            "Camera(SCENE5)",
            "Camera(SCENE6)",
            "Camera(SCENE7)",
            "Camera(SCENE8)",
            "Camera(USER1)",
            "Camera(USER2)",
            "Camera(USER3)",
            "Camera(PRESET)",
            "Network"
        );
        selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_DOWNLOAD_SELECT].appendOptions(select_maintenance_backup_download_value, select_maintenance_backup_download_text, 0);
    }

    function setSetupMaintenanceBackupValueToUploadSelect() {
        var select_maintenance_backup_upload_value = [];
        var select_maintenance_backup_upload_text = [];
        select_maintenance_backup_upload_value.push(
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "50",
            "51",
            "52",
            "98" ,
            "60"
        );
        select_maintenance_backup_upload_text.push(
            "Camera(CURRENT)",
            "Camera(SCENE1)",
            "Camera(SCENE2)",
            "Camera(SCENE3)",
            "Camera(SCENE4)",
            "Camera(SCENE5)",
            "Camera(SCENE6)",
            "Camera(SCENE7)",
            "Camera(SCENE8)",
            "Camera(USER1)",
            "Camera(USER2)",
            "Camera(USER3)",
            "Camera(PRESET)",
            "Network"
        );
        selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_UPLOAD_SELECT].appendOptions(select_maintenance_backup_upload_value, select_maintenance_backup_upload_text, 0);
    }

    function callbackSettingBackExecute(mouse, num) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            if (num === SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON) {
                DoSubmit_Download();
            } else if (num === SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON) {
                DoSubmit_Upload();
            }
        } else {
            // 処理なし
        }
    }

    function callbackBackupConfigData() {
        var value = selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_UPLOAD_SELECT].get();
        var text = $("#setup_maintenance_backup_configdata_input").val();
        switch (value) {
            case '60':
                $('#path_ul').attr('accept', '.nal');
                if(text.substring(text.length-4,text.length) == ".nal"){
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayOff();
                } else {
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
                }
                break;
            case '98':
                $('#path_ul').attr('accept', '.cpr');
                if(text.substring(text.length-4,text.length) == ".cpr"){
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayOff();
                } else {
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
                }
                break;
            default:
                if(value >= '50' && value <= '52') {
                   if(capi_IsIE() || capi_IsEdge() || capi_IsSafari()){
                       $('#path_ul').attr('accept', '.us,.us1,.us2,.us3');
                   } else {
                       $('#path_ul').attr('accept', '.us?');
                   }
                    if(text.substring(text.length-4,text.length) == ".us1"
                        ||text.substring(text.length-4,text.length) == ".us2"
                        ||text.substring(text.length-4,text.length) == ".us3"
                        ||text.substring(text.length-3,text.length) == ".us"){
                        btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayOff();
                    } else {
                        btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
                    }
                }
                else if(value >= '0' && value <= '8') {
                   if(capi_IsIE() || capi_IsEdge() || capi_IsSafari()){
                       $('#path_ul').attr('accept', '.cs,.cs0,.cs1,.cs2,.cs3,.cs4,.cs5,.cs6,.cs7,.cs8');
                   } else {
                       $('#path_ul').attr('accept', '.cs?');
                   }
                    if(text.substring(text.length-4,text.length) == ".cs1"
                        ||text.substring(text.length-4,text.length) == ".cs2"
                        ||text.substring(text.length-4,text.length) == ".cs3"
                        ||text.substring(text.length-4,text.length) == ".cs4"
                        ||text.substring(text.length-4,text.length) == ".cs5"
                        ||text.substring(text.length-4,text.length) == ".cs6"
                        ||text.substring(text.length-4,text.length) == ".cs7"
                        ||text.substring(text.length-4,text.length) == ".cs8"
                        ||text.substring(text.length-4,text.length) == ".cs0"
                        ||text.substring(text.length-3,text.length) == ".cs"){
                        btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayOff();
                    } else {
                        btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
                    }
                }
                break;
        }
        
        // USER1～USER3かチェック
        if(value >= '50' && value <= '52') {
            // USER1～USER3の場合は、Scene Updateをアクティブにする。
            radioMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_RADIO].displayOff();
        } else {
            // USER1～USER3以外の場合は、Scene Updateを非アクティブにする。
            radioMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_RADIO].displayDisabled();
        }
    }

    function isRightTypeSelected(fname){
        var value = selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_UPLOAD_SELECT].get();
        var isUCX100File = false;
        switch (value) {
            case '98':
                return fname.indexOf('.cpr') != -1;
            case '60':
                return fname.indexOf('.nal') != -1;
			default:
			    if(value >= '50' && value <= '52') {
                    var text = fname.replace(" ", "");
                    isUCX100File = (text.indexOf('.us') != -1 && text.substring(text.length-3,text.length) == ".us");
                    return text.indexOf('.us1') != -1 || text.indexOf('.us2') != -1 || text.indexOf('.us3') != -1 || isUCX100File;
				}
                else if(value >= '0' && value <= '8') {
                    var text = fname.replace(" ", "");
                    isUCX100File = (text.indexOf('.cs') != -1 && text.substring(text.length-3,text.length) == ".cs");
                    return text.indexOf('.cs1') != -1 || text.indexOf('.cs2') != -1 || text.indexOf('.cs3') != -1 || text.indexOf('.cs4') != -1 || text.indexOf('.cs5') != -1 || text.indexOf('.cs6') != -1 || text.indexOf('.cs7') != -1 || text.indexOf('.cs8') != -1 || text.indexOf('.cs0') != -1 || isUCX100File;
				}
        }
    }

    function callbackSettingBackupFileSelect(mouse) {
        if (mouse == Button.MOUSE_UP) {

        } else if (mouse == Button.MOUSE_DOWN) {
            //setup_maintenance_backup_file.click();
        } else {
            // 処理なし
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

    function DbgCallback(xhr) {
        if (( xhr.status ) == 200) {
            if (gProcessType == 2) {
                location.reload();
            }

            if (gFlgFinProcess == 1) {
                return;
            }
            gFlgFinProcess = 1;
            checkFinProcess();
        } else {
            // DO NOTHING
        }
    }

    var BlinkStatus = function () {
        var now;
        var diff;
        var min;
        var sec;
        if (gFlgBlink == 0) {
            gFlgBlink = 1;
        } else {
            gFlgBlink = 0;
            return;
        }
        now = new Date();
        diff = parseInt(( now.getTime() - gStartTime.getTime() ) / 1000);
        min = parseInt(( diff / 60 ) % 60);
        sec = parseInt(diff % 60);
        if (min >= gLimitTime) {
            clearInterval(gBlinkTimerID);
            clearInterval(gHeartBeatTimerID);
            window.alert("Process time out !   \nReboot the camera manually .   \nAnd retry to access around 1 minute later .   ");
            gbAct = false;
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON].displayOff();
            gPathUL.disabled = false;
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_FILE_SELECT_BUTTON].displayOff();
            if (gProcessType == 2) {
                checkUploadPath();
            } else {
                // DO NOTHING
            }
        }
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
        gMin = min;
        gSec = sec;
    };

    function checkFinProcess() {
        if (gFlgFinProcess == 1) {
            clearInterval(gBlinkTimerID);
            clearInterval(gHeartBeatTimerID);
            if (gProcessType == 1) {  // Download
                gbAct = false;
                btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON].displayOff();
                gPathUL.disabled = false;
                btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_FILE_SELECT_BUTTON].displayOff();
                if (gFlgValid == 1) {
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayOff();
                } else {
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
                }
            } else if (gProcessType == 2) {  // Upload
            } else {  // 想定外
            }

        } else {
            // DO NOTHING
        }
    }

    var sendHeartBeat = function () {
        var url = '/cgi-bin/aw_cam?cmd=QID&res=1';
        var xhr = null;
        xhr = myDOM.ajax.GetHttpRequest(url, DbgCallback);

        if (!xhr) {
            window.alert("Error : sendHeartBeat()");
            clearInterval(gBlinkTimerID);
            clearInterval(gHeartBeatTimerID);

        } else {
            // DO NOTHING
        }
    };

    function checkUploadPath(event) {
        var fname = getUploadFilename();
        var bError = false;
        if(fname.length == 0)
        {
            return;
        }
        if(!isRightTypeSelected(fname)){
            bError = true;
            objErrCode = MSG_STATUS.mID_0014;
        }

        if (!bError && chkfile_uploadBackupFilename(gPathUL.value) == true) {
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayOff();
            gFlgValid = 1;
        } else {
            objErrCode = MSG_STATUS.mID_0015;
            capi_DispError(document.all.backupdata, objErrCode);
            btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
            gFlgValid = 0;
        }
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function() {
            if(reader.result) {
                console.log(reader.result)
            }
        };
        reader.readAsText(input.files[0]);
    }

    function checkKeyDown(event) {
        if (( event.keyCode != 37 ) && ( event.keyCode != 39 )) {
            return false;
        }
    }

    function InitThisPage() {
        cparam_updateInformation();
        gProcessType = 0;
        gFlgValid = 0;
        gLimitTime = 0;
        gFlgBlink = 0;
        gFlgFinProcess = 0;
        gPathUL = document.getElementById("path_ul");
        gPathUL.onchange = checkUploadPath;
        gPathUL.onkeydown = checkKeyDown;
        gPathUL.style.imeMode = "disabled";
    }

    function DoSubmit_Download() {
        var heartbeat_dly;

        if (!gbAct) {
            gbAct = true;
        } else {
            return false;
        }

        if (jConfirm(MSG_STATUS.mID_0038, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
                if (confirm) {
                    $("#dialog_setup").show();
                    var date = [];
                    var url = "";
                    var value = selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_DOWNLOAD_SELECT].get();
                    if (value == 60) {
                        url = "/cgi-bin/netdatadown";
                        heartbeat_dly = 5000;
                        date = null;
                        download_file(url);
                    }else {
                        url = "/cgi-bin/datadown?type=" + value;
                        download_file(url);
                    }
                    gProcessType = 1;
                    gLimitTime = 1;
                    gFlgBlink = 0;
                    gFlgFinProcess = 0;
                    gStartTime = new Date();

                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_DOWNLOAD_BUTTON].displayDisabled();
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_UPLOAD_BUTTON].displayDisabled();
                    gPathUL.disabled = true;
                    btnMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_FILE_SELECT_BUTTON].displayDisabled();
                    checkFinProcess();
                    gBlinkTimerID = setInterval(BlinkStatus, 500);
                    setTimeout(function () {
                        gHeartBeatTimerID = setInterval(sendHeartBeat, 1000);
                    }, heartbeat_dly);
                } else {
                    gbAct = false;
                    return false;
                }
            }));
    }

    function getUploadFilename() {
        var path = gPathUL.value;
        var idx;

        if ((idx = path.lastIndexOf("\\")) != -1) {
            path = path.slice(idx);
        }

        if ((idx = path.lastIndexOf("/")) != -1) {
            path = path.slice(idx);
        }

        return path;
    }

    function DoSubmit_Upload() {
        const path = $("#path_ul").val();
        if (window.FileReader) {
            const file = $("#path_ul")[0];
            const reader = new FileReader();
            reader.onload = function() {
                $("#text").html(this.result)

                    if (jConfirm(MSG_STATUS.mID_0061 + path + " ." + MSG_STATUS.mID_0061_2, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
                        if (confirm) {
                            $("#dialog_setup").show();
                            var value = selectMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_CONFIGDATA_UPLOAD_SELECT].get();
                            var inputType = '<input id="typeCtrl" name="type" type="text" />';
                            if ($('#typeCtrl').length > 0) {
                                if (value == 60) {
                                    $('#typeCtrl').remove();
                                }
                            } else {
                                if (value != 60) {
                                    $('#path_ul').before($(inputType));
                                }
                            }
                            with (document.forms["back_form"]) {
                                method = "post";
                                if (value == 60) {
                                    action = "/cgi-bin/netdataup";
                                }
                                else {
                                    action = "/cgi-bin/dataup";
                                    type.value = value;
                                }
                                encoding = "multipart/form-data";  // IE6/IE7用
                                enctype = "multipart/form-data";  // IE8以降用
                                target = "dummy_frame";
                                submit();
                            }
                            gProcessType = 2;
                            setTimeout(function(){
                                gHeartBeatTimerID = setInterval(sendHeartBeat, 1000);
                            },90000);
                        } else {
                            gbAct = false;
                            return false;
                        }
                    }));

            }
            reader.readAsText(file.files[0],"gb2312");
        }
    }

    function callDownFile(url, num) {
        return function () {
            download_multi_file(url, num);
        }
    }

    function download_multi_file(url, num) {
        if (download_multi_file["iframe" + num]) {
            $('body').children('#' + download_multi_file['iframe' + num].id).remove();
            delete download_multi_file["iframe" + num];
        }
        var iframe = document.createElement("iframe");
        download_multi_file["iframe" + num] = iframe;
        download_multi_file["iframe" + num].id = 'downloadIframe' + num;
        document.body.appendChild(download_multi_file["iframe" + num]);
        download_multi_file["iframe" + num].src = url;
        download_multi_file["iframe" + num].style.display = "none";

        var timer = setInterval(function () {
            var iframeDoc = getIframeDom(download_multi_file["iframe" + num].id);
            if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
                $("#dialog_setup").hide();
                clearInterval(timer);
                return;
            }
        }, 2000);
    }

    function download_file(url) {
        if (download_file.iframe) {
            $('body').children('#' + download_file.iframe.id).remove();
            delete download_file.iframe;
        }

        var iframe = document.createElement("iframe");
        download_file.iframe = iframe;
        download_file.iframe.id = 'downloadIframe';
        document.body.appendChild(download_file.iframe);
        download_file.iframe.src = url;
        download_file.iframe.style.display = "none";

        var timer = setInterval(function () {
            var iframeDoc = getIframeDom(download_file.iframe.id);
            if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
                $("#dialog_setup").hide();

                setTimeout(function(){
                    $("#dialog_setup").empty();
                    var randomName = Math.random();
                    var obj = $('<div class="setup_status"></div>');
                    obj.css('background-image', "url(../css/pc/parts/setup_update_vu_arrow_2.gif?t="+randomName+")");
                    $("#dialog_setup").append(obj);
                },3000);
                clearInterval(timer);
                return;
            }
        }, 2000);

    }

    function getIframeDom(iframeId) {
        return document.getElementById(iframeId).contentDocument || window.frames[iframeId].document;
    }
   
    function downloadAllFile() {
        for (var i = 0; i < 4; i++) {
            setTimeout(callDownFile("/cgi-bin/datadown?type=" + (i + 1), i), i * 3000);
        }
    }

    function getSceneUpdateValue() {
        return getSceneUpdate().mode;
    }
    
    function callbackSceneUpdate() {
        $.ajax({
            type: "get",
            url: "/cgi-bin/set_scene_update",
            data: getSceneUpdateData(),
            success: function (data) {
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function getSceneUpdateData() {
        var data = {};
        data['mode'] = radioMaintenanceBackupObject[SETUP_MAINTENANCE_BACKUP_SCENE_UPDATE_RADIO].getSelectedValue();
        return data;
    }
    
    return {
        build: build
    }
}