// cparam.jsを再利用する。
// _cparam_Cgi_NoData_sendRequset, _cparam_awCmd_sendRequsetはcparam.jsで定義されているが、
// webWorkerLive内ではjQueryの使用ができないので、cparam.jsでの関数定義を解除し、webWorkerLive内で再定義したものを利用する。
importScripts("/js/include/cparam.js");
_cparam_Cgi_NoData_sendRequset = null;
_cparam_awCmd_sendRequset = null;

let cgiObj = {};
let cgiPtdObj = {};
let focusGuide = {};
let cgiObjCopy = null;
let focusGuideCache = null;
let focusGuideStart = 0;
self.onmessage = function (data) {
    const sendType = data.data.type;
    if (sendType == "zoom") {
        cparam_set_zoomSpeed(data.data.sComm);
    } else if (sendType == "focus") {
        cparam_set_focusSpeed(data.data.sComm);
    } else if (sendType == "iris") {
        if (data.data.sComm != -50) {
            cparam_set_irisControlSpeed(data.data.sComm)
            cgiPtdObj.mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
            postMessage(cgiPtdObj);
        } else {
            cparam_set_irisStop();
        }
    } else if (sendType == "getZoom") {
        cgiPtdObj.mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        postMessage(cgiPtdObj);
    }
}

function startTimerInterval_1s() {
    cgiObj.Dzoom = cparam_get_digitalZoomDisableEnable();
    cgiObj.DExt = cparam_get_digital14_20ExtenderOffOn();
    cgiObj.getIris = cparam_get_irismode();
    cgiObj.getFocus = cparam_get_focusMode();
    cgiObj.dZoomM = cparam_get_dZoomMagnification();
    cgiObj.imageAdjustValue = cparam_get_gainColorShutterNDTogether();
    cgiObj.getWhiteBalanceMode = cparam_get_whiteBalanceModeCameraControl();
    cgiObj.getDayNight = cparam_get_dayNight();
    cgiObj.Gain = cgiObj.imageAdjustValue.substring(0, 2);
    cgiObj.Shutter = cgiObj.imageAdjustValue.substring(7, 8);
    cgiObj.ND = cgiObj.imageAdjustValue.substring(cgiObj.imageAdjustValue.length - 1, cgiObj.imageAdjustValue.length)
    if (JSON.stringify(cgiObjCopy) != JSON.stringify(cgiObj)) {
        cgiObj.postFlg = false;
        postMessage(cgiObj);
        cgiObjCopy = JSON.parse(JSON.stringify(cgiObj));
    }
    setTimeout("startTimerInterval_1s()", 1000);
}
function focusGuideInterval_1s() {
    // focusGuide.position = [Math.round(Math.random() * 100), Math.round(Math.random() * 100)]
    // focusGuide.status = Math.round(Math.random() * 10) - 5
    focusGuide.position = cparam_get_focus_guid_position();
    focusGuide.status = cparam_get_focus_guid_status() || 0;

    if (JSON.stringify(focusGuide) != JSON.stringify(focusGuideCache)) {
        focusGuide.focusGuideFlg = true;
        focusGuide.focusGuideStartFlg = false;
        postMessage(focusGuide);
        focusGuideCache = JSON.parse(JSON.stringify(focusGuide));
    }
    if (focusGuide.status !== 'FE') {
        setTimeout("focusGuideInterval_1s()", 1000);
    }
}
function focusGuideStartInterval_1s() {
    focusGuideStart = cparam_get_focus_guide();
    focusGuide.focusGuideStartFlg = true;
    focusGuide.focusGuideFlg = false;
    focusGuide.focusGuideStart = focusGuideStart;
    postMessage(focusGuide);
    // console.log("C3===============================================",focusGuideStart);
    if (focusGuideStart == 1) {
        focusGuideInterval_1s();
    }
    setTimeout("focusGuideStartInterval_1s()", 1000);
}
function startTimerInterval_3s() {
    cgiPtdObj.mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
    cgiPtdObj.mapPtd = cparam_get_panTiltZoomFocusIrisTogetherDisplay();
    cgiPtdObj.bar = cparam_get_bar();
    cgiPtdObj.postFlg = true;
    postMessage(cgiPtdObj);
    setTimeout("startTimerInterval_3s()", 1000);
}
function startTimerInterval_5s() {
    cgiPtdObj.postFlg = true;
    cgiObj.srtStatus = getsrtStatus();
    cgiObj.streamStatus = getStreamStatus();
    cgiObj.syncStatus = getSyncStatus();
    cgiObj.rtmpStatus = getRtmpStatus();
    cgiObj.udpStatus = getTsUdpStatus();
    cgiObj.tally_state = cparam_get_tallyInformationRGY();
    cgiObj.currentLock = cparam_get_remoteUnLockSetting();
    cgiObj.gScene = cparam_get_sceneMode();
    if (JSON.stringify(cgiObjCopy) != JSON.stringify(cgiObj) && cgiPtdObj.postFlg) {
        cgiPtdObj.postFlg = false;
        postMessage(cgiObj);
        cgiObjCopy = JSON.parse(JSON.stringify(cgiObj));
    }
    setTimeout("startTimerInterval_5s()", 5000);
}
function cparam_get_focus_guid_position() {
    var retData = _cparam_awCmd_sendRequset('QSL:C4', 'OSL:C4:');
    var dataArry = [];
    if (retData.indexOf(":" != -1)) {
        dataArry = retData.split(":")
    }
    return [parseInt(dataArry[0], 16), parseInt(dataArry[1], 16)];
}
function cparam_get_focus_guid_status() {
    var ret = _cparam_awCmd_sendRequset('QSL:C5', 'OSL:C5:')
    if (ret == 'FE' || ret == 'FF') return ret;
    return parseInt(ret, 16) - 128;
}
function cparam_get_focus_guide() {
    let Value = _cparam_awCmd_sendRequset('QSL:C3', 'OSL:C3:');
    return Value;
}
// コマンドの再定義
_cparam_awCmd_sendRequset = function (reqCmd, respCmd) {

    var retValue = "";

    var uri = _aw_cam + reqCmd + "&res=1";
    if (reqCmd.indexOf("#") == 0) {
        reqCmd = reqCmd.replace("#", '%23');
        uri = _aw_ptz + reqCmd + "&res=1";
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
            catch (e) {
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

_cparam_Cgi_NoData_sendRequset = function (type, uri) {
    var retValue = "";
    var reqobj = _cparam_createXMLHttpRequest(null);
    if (!reqobj) return;
    try {
        reqobj.open(type, uri, false);
        try {
            if (typeof reqobj.timeout !== 'undefined') {
                reqobj.timeout = 5 * 1000;
            }
        } catch (e) {
        }
        reqobj.send(null);
        if (reqobj.readyState == 4 && reqobj.status == 200) {
            retValue = reqobj.responseText;
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

function getStreamStatus() {
    let retValue = _cparam_Cgi_NoData_sendRequset("get", "/cgi-bin/get_stream_status");
    if (retValue.indexOf("status") == 0) {
        retValue = retValue.substring("status".length + 1, retValue.length - 2);
    }
    return retValue;
}

function getSyncStatus() {
    return parseInt(_cparam_awCmd_sendRequset('QSL:C7', 'OSL:C7:'), 10);
}
// WebWorkerLive定期処理開始
focusGuideStartInterval_1s();
startTimerInterval_1s();
startTimerInterval_3s();
startTimerInterval_5s();