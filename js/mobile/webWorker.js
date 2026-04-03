const _aw_cam = "/cgi-bin/aw_cam?cmd=";
const _aw_ptz = "/cgi-bin/aw_ptz?cmd=";
var cgiObj = {};
// cgiObj['Dzoom'] = 0;
// cgiObj['DExt'] = 0;
self.onmessage = function(data) {
    const sendType = data.data.type;
    if(sendType == "zoom"){
        cparam_set_zoomSpeed(data.data.sComm);
    }else if(sendType == "focus"){
        cparam_set_focusSpeed(data.data.sComm);
    }else if(sendType == "iris") {
        if(data.data.sComm != -50){
            cparam_set_irisControlSpeed(data.data.sComm)
            cgiObj.mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
            postMessage(cgiObj);
        }else{
            cparam_set_irisStop();
        }
    }else if(sendType == "getZoom"){
        cgiObj.mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        postMessage(cgiObj);
    }
}

function startTimerInterval_1s()
{
    cgiObj.Dzoom = cparam_get_digitalZoomDisableEnable();
    cgiObj.DExt= cparam_get_digital14_20ExtenderOffOn();
    cgiObj.getIris = cparam_get_irismode();
    cgiObj.getFocus = cparam_get_focusMode();
    postMessage(cgiObj);
    setTimeout("startTimerInterval_1s()",1000);
}
function startTimerInterval_3s()
{
    cgiObj.mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
    cgiObj.mapPtd = cparam_get_panTiltZoomFocusIrisTogetherDisplay();
    cgiObj.bar = cparam_get_bar();
    postMessage(cgiObj);
    setTimeout("startTimerInterval_3s()",1000);
}
function startTimerInterval_5s()
{
    cgiObj.tally_state = cparam_get_tallyInformationRGY();
    cgiObj.currentLock = cparam_get_remoteUnLockSetting();
    postMessage(cgiObj);
    setTimeout("startTimerInterval_5s()",5000);
}

startTimerInterval_1s();
startTimerInterval_3s();
startTimerInterval_5s();


// IRIS(STOP)
function cparam_set_irisStop() {
    return _cparam_awCmd_NoData_sendRequset('LIT');
}
function cparam_set_irisControlSpeed(data) {

    // to cmd format 01-99
    data = ('00' + data).slice(-2).toUpperCase();
    return _cparam_awCmd_sendRequset('#I' + data, 'iC');
}
// Focus Speed
function cparam_set_focusSpeed(data) {

    return _cparam_awCmd_sendRequset('#F' + data, 'fS');
}
function cparam_set_zoomSpeed(data) {

    return _cparam_awCmd_sendRequset('#Z' + data, 'zS');
}
function cparam_get_bar() {
    // return hex string
    return parseInt(_cparam_awCmd_sendRequset('QBR', 'OBR:'), 10);
}
// 他リモコンロック状態問い合わせ
function cparam_get_remoteUnLockSetting() {
    return _cparam_awCmd_sendRequset('QSJ:40', 'OSJ:40:');
}
// Pan/Tilt/Zoom/Focus/Irisの一括取得コマンド(表示値取得)
function cparam_get_panTiltZoomFocusIrisTogetherDisplay() {
    var retValue = _cparam_awCmd_sendRequset('#PTD', 'pTD');
    var map = {};
    map.pan = retValue.substring(0, 4);
    map.tilt = retValue.substring(4, 8);
    map.zoom = parseInt(retValue.substring(8, 11), 16);
    map.focus = parseInt(retValue.substring(11, 13), 16);

    map.decIris = parseInt(retValue.substring(13, 15), 16);
    map.strIris = parseInt(retValue.substring(13, 15), 16) / 10;
    map.strIris = map.strIris.toString();
    // to format
    if(map.strIris.indexOf(".") < 0) {
        map.strIris = map.strIris + ".0";
    } else {
        map.strIris = map.strIris + "0";
    }
    map.strIris.substring(0, map.strIris.indexOf(".") + 2);
    map.strIris = "F" + map.strIris;

    return map;
}
// Pan/Tilt/Zoom/Focus/Irisの一括取得コマンド(制御値取得)
function cparam_get_panTiltZoomFocusIrisTogetherControl() {
    var retValue = _cparam_awCmd_sendRequset('#PTV', 'pTV');
    var map = {};
    map.pan = retValue.substr(0, 4);
    map.tilt = retValue.substr(4, 4);
    map.zoom = parseInt(retValue.substr(8, 3), 16);
    map.focus = parseInt(retValue.substr(11, 3), 16);
    map.iris = parseInt(retValue.substr(14, 3), 16);
    return map;
}

// Tally Information-R/G/Y
function cparam_get_tallyInformationRGY() {
    return _cparam_awCmd_sendRequset('#TAA', 'tAA');
}
// FOCUS　MODE
function cparam_get_focusMode() {
    return parseInt(_cparam_awCmd_sendRequset('QAF', 'OAF:'), 10);
}
function cparam_get_irismode() {
    return parseInt(_cparam_awCmd_sendRequset('QRS', 'ORS:'), 16);
}
// Digital Zoom Disable/Enable
function cparam_get_digitalZoomDisableEnable() {
    return parseInt(_cparam_awCmd_sendRequset('QSE:70', 'OSE:70:'), 10);
}
function cparam_get_digital14_20ExtenderOffOn() {
    return parseInt(_cparam_awCmd_sendRequset('QSJ:4E', 'OSJ:4E:'), 10);
}
function cparam_get_focus_guide(){
    let Value = _cparam_awCmd_sendRequset('QSL:C3', 'OSL:C3:');
    return Value;
}
function _cparam_awCmd_sendRequset(reqCmd, respCmd) {
    //return ""
    var retValue = "";

    var uri = _aw_cam  + reqCmd + "&res=1";
    if(reqCmd.indexOf("#") == 0) {
        reqCmd = reqCmd.replace("#",'%23');
        uri = _aw_ptz  + reqCmd + "&res=1";
    }
    var reqobj = _cparam_createXMLHttpRequest(null);
    if (!reqobj) return;
    try {
        reqobj.open("GET", uri, false);
        try {
            if (typeof reqobj.timeout !== 'undefined') {
                reqobj.timeout = 5 * 1000;
            }
        } catch (e) {
        }
        reqobj.send(null);
        if (reqobj.readyState == 4 && reqobj.status == 200) {
            var data = reqobj.responseText;
            try { //add by yangyang 20180911
                if (data.indexOf(respCmd) == 0) {
                    retValue = data.substring(respCmd.length);
                } else {
                    retValue = data;
                }
            }
            catch(e){
                retValue = "";
            }
            delete reqobj;
            return retValue;
        } else {
            delete reqobj
            return "";
        }
    }
    catch (e) {
        delete reqobj;
        return "";
    }
}

function _cparam_createXMLHttpRequest(cbFunc) {
    var XMLhttpObject = null;
    try {
        XMLhttpObject = new XMLHttpRequest();
    } catch (e) {
        try {
            XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                return null;
            }
        }
    }
    XMLhttpObject.onreadystatechange = cbFunc;
    return XMLhttpObject;
}