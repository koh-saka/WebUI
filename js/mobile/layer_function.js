/**
 * live层功能的初期化
 *
 */
var LayerFunction = layerFunction();
var silderMouseDownFlag = false;
var silderMouseUpOverSleepTime = 0;
var focusAutoFlag = 0;
var sliderTouchStartFlag = false; //add by yangyang 20180907
var gTimerInterval_30s;
var gTimerInterval_5s;
var gTimerInterval_1s;
var gCurrentStreamMode;
var initThumbnailStatus = [];
var gIndex = 0;
var retryCount = [];
var gCheckPresetImageTimerID = null;
var getImageId = null;
var zoomSilderClickFlag = false;
var operationFlag = false;
var gGammaMode = null;
var gURCPMode = null;
var presetIdListAll;
function layerFunction() {



    function build() {
        //初期化层
        LoadSize("jqmLayerFunction");
        LoadSize("jqmLayerAll");
        $("#" + "jqmLayerAll").css({"margin-top": 0});
        LoadSize("jqmOther");
        $("#" + "jqmOther").css({"margin-top": 0});
        //初期化構築live层头部
        LayerFunctionTop.build();
        //初期化構築live层身体部分
        LayerFunctionMain.build();
        //初期化構築live层底部
        LayerFunctionBottom.build();
        // 初期化構築PTページ
        LayerTouchpt.build();
        //Setmenu初期化
        Setmenu.build();
        //画面解像度の初期化
        initScreen();
        var lastTouchEnd = 0;
        var slider = {

            touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            slider:document.getElementById('setupDiv'),

            events:{
                index:0,
                slider:this.slider,
                startPos:{},
                endPos:{},
                handleEvent:function(event){
                    var self = this;
                    if(event.type == 'touchstart'){
                        if (event.target.tagName == 'img' || event.target.tagName == 'IMG'){
                            event.preventDefault();
                        }

                        self.start(event);
                    }else if(event.type == 'touchmove'){

                        self.move(event);
                    }else if(event.type == 'touchend'){

                        self.end(event);
                        var now = (new Date()).getTime();
                        if (now - lastTouchEnd <= 300) {
                            event.preventDefault();
                        }
                        lastTouchEnd = now;
                    }
                },

                start:function(event){
                    sliderTouchStartFlag = true;
                    var touch = event.targetTouches[0];
                    startPos = {x :touch.pageX,y:touch.pageY,time:+new Date};
                    isScrolling = 0;
                    document.getElementById('jqmLayerFunction').addEventListener('touchmove',this,false);
                    document.getElementById('jqmLayerFunction').addEventListener('touchend',this,false);
                    // event.preventDefault();
                    event.stopPropagation();
                },

                move:function(event) {
                    if (!sliderTouchStartFlag)return;
                    if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                    var touch = event.targetTouches[0];
                    endPos = {x: touch.pageX - startPos.x, y: touch.pageY - startPos.y};
                    isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;

                    var isVerScroll = 0;
                    var windowWidth = $(window).width();
                    if (touch.pageX > windowWidth / 2 - 150 && touch.pageX < windowWidth / 2 + 150) {
                        isVerScroll = 1;
                    } else {
                        isVerScroll = 0;
                    }

                    if (isVerScroll == 0 && event.cancelable) {
                        event.preventDefault();
                    }

                    event.stopPropagation();
                },

                end:function(event){
                    if(!sliderTouchStartFlag)return;
                    if(typeof(endPos) == "undefined")return;

                    var duration = +new Date - startPos.time;
                    if(isScrolling == 0){
                        //this.icon[this.index].className = '';
                        var result = $("#jqmLayerAll").is(":visible"); //add by yangyang 20180907

                        var resultRight =  $("#jqmLayerMenuPT").is(":visible");

                        //modify by yangyang 20180907
                        if(Number(duration) > 150) {

                            //lock状態が動作しない
                            if($("#lock").hasClass("on")){
                                return;
                            }

                            if(endPos.x > 50){
                                if(result){
                                    $("#jqmLayerAll").hide();
                                }else{
                                    if (!resultRight)
                                    {
                                        if(gPower == 1 ) {
                                            $("#jqmLayerMenuPT").show();
                                            $("#jqmOther").hide();
                                        }
                                    }
                                }
                            }else if(endPos.x < -50){
                                if(!result){
                                    if (resultRight)
                                    {
                                        $("#jqmLayerMenuPT").hide();
                                        $("#jqmOther").show();
                                    }
                                    else
                                    {
                                        $("#jqmLayerAll").show();
                                    }
                                }
                            }
                        }
                    }

                    document.getElementById('jqmLayerFunction').removeEventListener('touchmove',this,false);
                    document.getElementById('jqmLayerFunction').removeEventListener('touchend',this,false);

                    sliderTouchStartFlag = false;
                    event.stopPropagation();
                }
            },

            init:function(){
                var self = this;
                if(!!self.touch) {
                    self.slider.addEventListener('touchstart',self.events,false);
                    //document.getElementById("jqmLayerFunction").addEventListener('touchmove',self.events,false);
                    //document.getElementById("jqmLayerFunction").addEventListener('touchend',self.events,false);
                }
            }
        };
        slider.init();
        startInterval();

    }

    return {
        build: build
    }
}


function startInterval(){
    if(gPower == 1){
        gTimerInterval_30s= setInterval(startTimerInterval_30s, 30000);
        gTimerInterval_5s = setInterval(startTimerInterval_5s, 5000);
        gTimerInterval_1s = setInterval(startTimerInterval_1s, 1500);
        gURCPMode = cparam_get_UHDCrop();
        LayerTouchpt.updataState();
    }

    refresh_power_id = setInterval(function () {
        refresh_powerStatus();
    }, 7000);
    if(typeof(worker)=="undefined")
    {
        worker=new Worker("/js/pc/webWorker.js");
        worker.onmessage=function(event){
            if(event.data.postFlg && event.data.mapPtd){
                reqPtdObj = event.data;
            }else if(!event.data.postFlg && event.data.getIris != undefined){
                reqCgiObj = event.data;
            }
            //document.getElementById("result").innerHTML=event.data;
        };
    }
}

/**
 * update powerStatus
 */
function refresh_powerStatus() {
    menubar_ChkPower(gPower);
}

/**
 * check powerStatus
 * @param iPow
 */
function menubar_ChkPower(iPow) {
    if (cparam_get_powerOnStandby() != iPow) { // 画面Open時とPower状態が変わっていたらリロード
        clearTimeout(refresh_power_id);
        setTimeout(function(){
            window.location.reload();
        }, 1000);
    }
}

let lastRtmpStatus = "";
let lastSrtStatus = "";
function startTimerInterval_5s() {
    // if (document.getElementById("main_gui").style.display == "none") {
    //     clearInterval(gTimerInterval_5s);
    //     return;
    // }
    //不具合管理 #3804
    if(!operationFlag){
        checkTally();
    }
    if (gCurrentStreamMode == 'rtmp' || gCurrentStreamMode == 'rtmp_uhd') {
        $.when(getRtmpStatus()).done(function(rtmpStatus){
            if (rtmpStatus == '0') {
                LayerFunctionMain.getStreamBtnObj().displayOff();
                LayerFunctionMain.getStreamBtnObj().set('Start');
            } else {
                LayerFunctionMain.getStreamBtnObj().displayOn();
                LayerFunctionMain.getStreamBtnObj().set('Stop');
            }       
        });
    }

    if (gCurrentStreamMode == 'srt_h264' || gCurrentStreamMode == 'srt_h264_uhd' || gCurrentStreamMode == 'srt_h265' || gCurrentStreamMode == 'srt_h265_uhd') {
        $.when(getsrtStatus()).done(function(srtStatus){
            if (srtStatus == '0') {
                LayerFunctionMain.getStreamBtnObj().displayOff();
                LayerFunctionMain.getStreamBtnObj().set('Start');
            } else {
                LayerFunctionMain.getStreamBtnObj().displayOn();
                LayerFunctionMain.getStreamBtnObj().set('Stop');
            }       
        });
    }

}

function setRtmpButtonState() {
    if (LayerFunctionMain.getStreamBtnObj().getStatus() != Button.STATUS_ON) {
        if (gCurrentStreamMode == 'rtmp' || gCurrentStreamMode == 'rtmp_uhd') {
            if(sendRtmpCmd('start') == 'OK'){
                if (getRtmpStatus() == '1') {
                    // stop &  red color
                    LayerFunctionMain.getStreamBtnObj().displayOn();
                    LayerFunctionMain.getStreamBtnObj().set('Stop');
                    //LayerFunctionMain.getStreamStartBtnObj.displayOn();
                    $(".StartStream").show();
                    //LayerFunctionMain.getStreamStartTxtObj.show();
                    $("#divStreamUrl").show();
                    $("#divStream").hide();
                }
            }else{
                jAlert(MSG_STATUS.mID_0073, NPTZ_WORDING.wID_0039);
            }
        } else if(gCurrentStreamMode == 'srt_h264' || gCurrentStreamMode == 'srt_h264_uhd' || gCurrentStreamMode == 'srt_h265' || gCurrentStreamMode == 'srt_h265_uhd'){
            if(sendSrtCmd('start') == 'OK'){
                if(getsrtStatus() == '1'){
                    // stop &  red color
                    LayerFunctionMain.getStreamBtnObj().displayOn();
                    LayerFunctionMain.getStreamBtnObj().set('Stop');
                    //LayerFunctionMain.getStreamStartBtnObj.displayOn();
                    $(".StartStream").show();
                    //LayerFunctionMain.getStreamStartTxtObj.show();
                    $("#divStreamUrl").show();
                    $("#divStream").hide();
                }
            }else{
                jAlert(MSG_STATUS.mID_0092, NPTZ_WORDING.wID_0039);
            }
        }
    }else{
        if(gCurrentStreamMode == 'srt_h264' || gCurrentStreamMode == 'srt_h264_uhd' || gCurrentStreamMode == 'srt_h265' || gCurrentStreamMode == 'srt_h265_uhd'){
            if(sendSrtCmd('stop') == 'OK'){
                // stop &  red color
                LayerFunctionMain.getStreamBtnObj().displayOn();
                LayerFunctionMain.getStreamBtnObj().set('Stop');
                //LayerFunctionMain.getStreamStartBtnObj.displayOn();
                $(".StartStream").show();
                //LayerFunctionMain.getStreamStartTxtObj.show();
                $("#divStreamUrl").show();
                $("#divStream").hide();
            }else{
                jAlert(MSG_STATUS.mID_0093, NPTZ_WORDING.wID_0039);
            }
        }else if(gCurrentStreamMode == 'rtmp' || gCurrentStreamMode == 'rtmp_uhd'){
            if(sendRtmpCmd('stop') == 'OK'){
                // stop &  red color
                LayerFunctionMain.getStreamBtnObj().displayOn();
                LayerFunctionMain.getStreamBtnObj().set('Stop');
                //LayerFunctionMain.getStreamStartBtnObj.displayOn();
                $(".StartStream").show();
                //LayerFunctionMain.getStreamStartTxtObj.show();
                $("#divStreamUrl").show();
                $("#divStream").hide();
            }else{
                jAlert(MSG_STATUS.mID_0074, NPTZ_WORDING.wID_0039);
            }
        }
    }

}
function sendRtmpCmd(pCmd){
    let retValue ;
    $.ajax({
        type: "get",
        url: "/cgi-bin/rtmp_ctrl?cmd=" + pCmd,
        async: false,
        timeout: 100,
        success: function (data) {
            retValue = 'OK';

        },
        error: function (jqXHR, textStatus, errorThrown) {
            retValue = 'NG';
        }
    });
    return retValue;
}
function sendSrtCmd(pCmd){
    let retValue ;
    $.ajax({
        type: "get",
        url: "/cgi-bin/srt_ctrl?cmd=" + pCmd,
        async: false,
        timeout: 100,
        success: function (data) {
            retValue = 'OK';

        },
        error: function (jqXHR, textStatus, errorThrown) {
            retValue = 'NG';
        }
    });
    return retValue;
}
function getRtmpStatusValue() {
    let retValue = _cparam_Cgi_NoData_sendRequset("get", "/cgi-bin/get_rtmp_status");
    if (retValue.indexOf("status") == 0) {
        retValue = retValue.substring("status".length + 1, retValue.length - 2);
    }
    return retValue;
}
function getsrtStatusValue() {
    let retValue = _cparam_Cgi_NoData_sendRequset("get", "/cgi-bin/get_srt_status");
    if (retValue.indexOf("status") == 0) {
        retValue = retValue.substring("status".length+1, retValue.length - 1);
    }
    return retValue;
}
function getsrtStatus() {
    var retValue = '';
    const defer = $.Deferred();
    $.ajax({
        type: "get",
        url: "/cgi-bin/get_srt_status",
        timeout: 100,
        success: function (data) {
            if (data.indexOf("status") == 0) {
                retValue = data.substring("status".length + 1, data.length - 1);
                defer.resolve(retValue);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return defer.promise();

}
function getRtmpStatus() {
    var retValue = '';
    const defer = $.Deferred();
    $.ajax({
        type: "get",
        url: "/cgi-bin/get_rtmp_status",
        timeout: 100,
        success: function (data) {
            if (data.indexOf("status") == 0) {
                retValue = data.substring("status".length + 1, data.length - 2);
                defer.resolve(retValue);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return defer.promise();
}

function startTimerInterval_30s(){
    // if(document.getElementById("main_gui").style.display == "none"){
    //     clearInterval(gTimerInterval_30s);
    //     return;
    // }
    // getStreamMode();
    // if (cparam_get_powerOnStandby() == 0) {
    //     location.reload();
    // }
    //3805 	不具合管理 修正しました
    //不具合管理 #3805 QSE:2J　⇒　Timer:30s 変更する

    var getMode = cparam_get_UHDCrop();
    if(getMode != gURCPMode){
        gURCPMode = getMode;
        LayerTouchpt.updataState();
    }
    // if(gURCPMode == 1){
    //     // $(".TITLE_TOUCH_AF").removeClass('on');
    //     // $(".TITLE_TOUCH_AF").removeClass('off');
    //     // $(".TITLE_TOUCH_AF").removeClass('on_hover');
    //     // $(".TITLE_TOUCH_AF").removeClass('off_hover');
    //     // $(".TITLE_TOUCH_AF").addClass('disable');
    //     // LayerTouchpt.updateStatus();
    //     // var LayerTouchpt = layertouchpt();
    //     LayerTouchpt.updataState();
    // } else {
    //     if(sessionStorage.touchIndex == 1){
    //         $(".TITLE_TOUCH_AF").removeClass('disable');
    //         $(".TITLE_TOUCH_AF").addClass('off');
    //     } else if(sessionStorage.touchIndex == 2){
    //         $(".TITLE_TOUCH_AF").removeClass('disable');
    //         $(".TITLE_TOUCH_AF").addClass('on');
    //     } else {
    //         $(".TITLE_TOUCH_AF").removeClass('disable');
    //         $(".TITLE_TOUCH_AF").addClass('off');
    //     }
    // }
    var getMode = cparam_get_gammaMode();
    if(gGammaMode == null){
        gGammaMode = getMode;
    }else{
        if(gGammaMode == 7 && getMode != 7){
            location.reload();
        }
        if(gGammaMode!= 7 && getMode == 7){
            location.reload();
        }
    }

}

function getStreamMode() {
    var retValue ;
    $.ajax({
        type: "get",
        url: "/cgi-bin/get_stream_mode",
        async: false,
        timeout: 100,
        success: function (data) {
            if (data.indexOf("stream_mode") == 0) {
                retValue = data.substring("stream_mode".length + 1, data.length - 2);
                gCurrentStreamMode = retValue;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    return retValue;
}


let last_DZoom = null;
let last_DExt = null;
var irisFlg = false;
var focusFlg = false;
var zoomFlag = true;
function startTimerInterval_1s()
{
    if(($(".TITLE_7_SWITCH").is('.on')) || ($(".power").text() == NPTZ_WORDING.wID_0166)){
        return;
    }

    //add by yangyang 20180911
    //不具合管理 #3804 2019/01/14
    if(!operationFlag)
    {

        var DZoom = reqCgiObj.Dzoom;
        var DExt = reqCgiObj.DExt;
        if (DZoom == 1) {
            $(".idZoom").html("D-Zoom");
            $(".idZoom").css("line-height","");
            $(".idZoom").css("background-color","red");
            $(".idZoom").css("color","white");

        } else if (DZoom == 0 && DExt == 0) {
            $(".idZoom").html("ZOOM");
            $(".idZoom").attr("style","");
        } else if(DZoom == 0 && DExt == 1){
            $(".idZoom").html("D-Ext x1.4");
            $(".idZoom").css("line-height","100%");
            $(".idZoom").css("background-color","red");
            $(".idZoom").css("color","white");
        }else if(DZoom == 0 && DExt == 2){
            $(".idZoom").html("D-Ext x2.0");
            $(".idZoom").css("line-height","100%");
            $(".idZoom").css("background-color","red");
            $(".idZoom").css("color","white");
        }
        if(Setmenu.getLockStatus()) return;
        var getIris = reqCgiObj.getIris;
        if (getIris == 0) {
            LayerFunctionMain.irisAutoUndisable();
        }else{
            LayerFunctionMain.irisAutoDisable();
        }
        //add by yangyang 20180911
        if(Setmenu.getLockStatus()) return;
        var getFocus = reqCgiObj.getFocus;
        if(getFocus == 1){
            AutoFocus = 1;
            LayerFunctionMain.focusAutoDisable();
        }else{
            AutoFocus = 0;
            LayerFunctionMain.focusAutoUndisable();
        }


    }

}

/*
* live头部初期化
* */
var LayerFunctionTop = layerFunctionTop();

function layerFunctionTop() {
    var btnObject = [];
    var txtObject = [];
    var LIVE_MENU = 0;
    var SET_BTN_MENU = 1;
    var srcFlag = true;
    var TXT_SHOW_TITLE = 2;
    var TXT_POWER = 3;
    var TXT_STANDBY = 4;
    var TXT_SHOW_TOUCH_TITLE = 5;
    function build() {
        //live menu按钮
        btnObject[LIVE_MENU] = ImgButtonCtrl("jqmTop", "/css/mobile/parts/liveMenu.png", "position-abs wth-8 left-0-5 top-35", callbackLive,"liveMenu");
        //setup 按钮
        btnObject[SET_BTN_MENU] = ButtonCtrl("jqmTop","pcscreen","PC Screen", callbackSetBtn);
        btnObject[SET_BTN_MENU].show();
        btnObject[SET_BTN_MENU].displayOff();

        // $("#jqmTop").append("<div id ='jqmtopTallyColor1' class='position-abs wth-25 left-38 top-35' style='height:10%;margin: 0 auto; padding: 0;'></div>");
        // $("#jqmTop").append("<div id ='jqmtopTallyColor2' class='position-abs wth-25 left-38 top-23' style='height:10%;margin: 0 auto; padding: 0'></div>");

        $("#tallyBar").append("<div id ='jqmtopTallyColor1' class='position-abs wth-25 left-38 top-35' style='height:10%;margin: 0 auto; padding: 0;'></div>");
        $("#tallyBar").append("<div id ='jqmtopTallyColor2' class='position-abs wth-25 left-38 top-23' style='height:10%;margin: 0 auto; padding: 0'></div>");

        //设置文字
        //$("#jqmTop").append($('<span id="jqmtopPT" style="position: absolute;width: 15%;right: 10%;top: 35%;text-align: right;font-size: 1.5em; color: #A4A4A4"></span>'));
        var text = cparam_cgi_updateWebPageTitle();
        document.title = text;
        txtObject[TXT_SHOW_TITLE] = TextCtrl("jqmTop", "txt_show_title", text,null,null,text);
        txtObject[TXT_SHOW_TOUCH_TITLE] = TextCtrl("touchModeDiv", "txt_Touch_title", "",null,null,null);
        txtObject[TXT_SHOW_TITLE].show();
        txtObject[TXT_SHOW_TOUCH_TITLE].show();
        var powerText = gPower;
        var powerTitle = powerText;
        if(powerText == 1){
            txtObject[TXT_POWER] = TextCtrl("jqmTop", "power", NPTZ_WORDING.wID_0165,null,null,powerTitle);
            txtObject[TXT_POWER].show();
        }else if(powerText == 0){
            txtObject[TXT_STANDBY] = TextCtrl("jqmTop", "power", NPTZ_WORDING.wID_0166,null,null,powerTitle);
            txtObject[TXT_STANDBY].show();
        }

        setSetupMaintenanceResetValueToEle();
    }

    function init() {
        InitThisPage();
        cparam_updateTitle();
    }
    function InitThisPage() {
        cparam_updatePriorityMode();
    }

    function setSetupMaintenanceResetValueToEle() {
        gPower = cparam_get_powerOnStandby(); //cparams.power;
        try {
            Setmenu.clearAllBtns();
            Setmenu.clickBtn("btnMainte");
        }
        catch (e) {

        }
    }

    function callbackLive(e) {
        $("#liveMenu").attr('id','liveMenuHide');
        if (e == Button.TOUCHSTART) {
            if ($("img[src='/css/mobile/parts/liveMenuHide.png']").length == 0) {
                Setmenu.rebuild();
               // Setmenu.build();
                $("#jqmLayerMenu").show();
                $(".Start").hide();
            } else {
                $("#jqmLayerAll").show();
                $("img[src='/css/mobile/parts/liveMenuHide.png']").attr('src','/css/mobile/parts/liveMenu.png');
                $(".power").show();
                $(".txt_show_title").show();
                $(".Start").hide();
                $("#divStream").hide();

            }
        }
    }

    function callbackSetBtn(e) {
        if($(".pcscreen").hasClass("disable")){
            return;
        }else {
            if (e == Button.TOUCHSTART) {
                sessionStorage.isAdminPage = true;
                btnObject[SET_BTN_MENU].displayOn();
                window.location.href="/live/index.html";
            }else if (e == Button.TOUCHEND) {
                btnObject[SET_BTN_MENU].displayOff();
            }
        }
    }

    return {
        build: build,
        init: init,
    }
}
/*
* live中间部分初期化
* */
var LayerFunctionMain = layerFunctionMain();

function layerFunctionMain() {

    var btnObject = [];
    var textObject = [];
    var imgBtnObject = [];
    var sliderZoom = Slider();
    var sliderSpeed = Slider();
    var sliderFocus = Slider();
    var sliderIris = Slider();
    var MAIN_LEFT = 0;
    //zoom
    var ZOOM_SPEED = 1;
    var ZOOM_LEFT = 2;
    var ZOOM_T = 3;
    var ZOOM_W = 4;
    var ZOOM_VALUE = 5;
    var ZOOM_DRAGGABLE = 6;
    var ZOOM_DRAGGABLE_BK = 7;
    var ZOOM_DRAGGABLE_COLOR = 8;
    var ZOOM_DRAGGABLE_MOVE = 9;
    //speed
    var SPEED_LEFT = 10;
    var SPEED_T = 11;
    var SPEED_W = 12;
    var SPEED_VALUE = 13;
    var SPEED_DRAGGABLE = 14;
    var SPEED_DRAGGABLE_BK = 15;
    var SPEED_DRAGGABLE_COLOR = 16;
    var SPEED_DRAGGABLE_MOVE = 17;
    //position
    var POSITION_RIGHT = 18;
    var POSITION_BTN_DIV = 19;
    var POSITION_FOCUS = 20;
    var P_UP_LEFT_BTN = 21;
    var P_UP_BTN = 22;
    var P_UP_RIGHT_BTN = 23;
    var P_LEFT_BTN = 24;
    var P_RIGHT_BTN = 25;
    var P_DOWN_LEFT_BTN = 26;
    var P_DOWN_BRN = 27;
    var P_DOWN_RIGHT_BTN = 28;
    var P_CENTER_BTN = 29;
    //focus
    var FOCUS_RIGHT = 30;
    var FOCUS_PTZ = 31;
    var FOCUS_FAR = 32;
    var FOCUS_NEAR = 33;
    var FOCUS_VALUE = 34;
    var FOCUS_DRAGGABLE = 35;
    var FOCUS_DRAGGABLE_BK = 36;
    var FOCUS_DRAGGABLE_COLOR = 37;
    var FOCUS_DRAGGABLE_MOVE = 38;
    var FOCUS_AUTO = 39;

    //joystick
    var JOYSTICK_DIV = 40;
    var JOYSTICK_BOTTOM = 41;
    var JOYSTICK_CORE = 42;

    //iris
    var IRIS_RIGHT = 43;
    var IRIS_PTZ = 44;
    var IRIS_FAR = 45;
    var IRIS_NEAR = 46;
    var IRIS_VALUE = 47;
    var IRIS_DRAGGABLE = 48;
    var IRIS_DRAGGABLE_BK = 49;
    var IRIS_DRAGGABLE_COLOR = 50;
    var IRIS_DRAGGABLE_MOVE = 51;
    var IRIS_AUTO = 52;
    //var zoomValue = 4.0;
    //var focusValue = 1.02;
    //var irisValue = 1.02;
    var speedFlag =true;
    var irisAutoFlag=0;
    //新加
    var Start = 199;
    var speedNum = 200;
    var IRIS = 201;
    var ZOOM = 202;
    var StartStream = 203;
    var StartStreamTxt = 204;
    var StartStreamUrl = 205;
    /**
     * ZOOMタイマーインターバル
     * @type setInterval
     */
    var intervalIDZoom = null;

    /**
     * IRISタイマーインターバル
     * @type setInterval
     */
    var intervalIDIris = null;

    /**
     * SPEEDタイマーインターバル
     * @type setInterval
     */
    var intervalIDSpeed = null;


    /**
     * FOCUSタイマーインターバル
     */
    var intervalIDFocus = null;

    /**
     * ZOOM button
     * @type object
     */
    var zoomObject = [];
    zoomObject[ZOOM_W] = 'down';
    zoomObject[ZOOM_T] = 'up';

    /**
     * FOCUS button
     * @type object
     */
    var focusObject = [];
    focusObject[FOCUS_FAR] = 'far';
    focusObject[FOCUS_NEAR] = 'near';

    /**
     * IRIS button
     * @type object
     */
    var irisObject = [];

    irisObject[IRIS_FAR] = 'up';
    irisObject[IRIS_NEAR] = 'down';

    var statusFlag = 1;

    function build() {
        textObject[MAIN_LEFT] = divAppend("jqmMain", "mainLeft", "mainLeft position-abs wth-50 hig-100");
        //stream(rtmp)
        textObject[StartStreamTxt] = divAppend("jqmTop", "divStream", "divStream position-abs wth-16 left-9 top-27  text-c color-fff");
        textObject[StartStreamUrl] = divAppend("jqmTop", "divStreamUrl", "divStreamUrl position-abs wth-16 left-25 top-60  text-c color-fff");
        //iPhone版UI
        btnObject[ZOOM_SPEED] = ButtonCtrl("mainLeft", "zoomSpeed","P/T Speed", callbackZoomS);
        // btnObject[ZOOM_SPEED].show();
        // btnObject[ZOOM_SPEED].displayOff();

        // //新加
        btnObject[speedNum] = ButtonCtrl("mainLeft","speedNum","x1.0",callbackspeedNum);
        // btnObject[speedNum].show();
        // btnObject[speedNum].displayOff();
        btnObject[Start] = ButtonCtrl("mainLeft", "Start", "Start", callbackBegin);
        btnObject[StartStream] = ButtonCtrl("jqmTop", "StartStream", "Stream(RTMP)", callbackStreamStart);

        //zoom初期化
        zoomLeftInit();
        //speed 初期化
        speedLeftInit();
        //上下左右方向初期化
        positionRightInit();
        //focus 初期化
        focusRightInit();
        //iris 初期化
        irisRightInit();
        //摇杆初期化
        joystickInit();

        sliderZoom.build('zoomDraggable', 'zoomDraggableMove', zoomCtrlCallback, "zoomLeft",999);
        sliderSpeed.build('speedDraggable', 'speedDraggableMove', speedCtrlCallback, "speedLeft",100);
        sliderFocus.build('focusDraggable', 'focusDraggableMove', focusCtrlCallback, "focusRight",99);
        sliderIris.build('irisDraggable', 'irisDraggableMove', irisCtrlCallback, "irisRight",254);

        if(gPower == 1){
            startSetSliderValue();
        }
        updateStatus(gPower);//add by yangyang 20180905

        for (var text in btnObject) {
            btnObject[text].show();
            btnObject[text].displayOff();
        }
        btnObject[Start].hide();
        btnObject[StartStream].hide();
    }

    //iPhone版UI
    function zoomLeftInit() {
        textObject[ZOOM_LEFT] = divAppend("mainLeft", "zoomLeft", "position-abs wth-100 hig-75");
        textObject[ZOOM_VALUE] = divAppend("zoomLeft", "divZoomValue", "idZoomValue position-abs wth-16 left-1 top-50  text-c color-fff");
        textObject[ZOOM] = divAppend("zoomLeft", "divZoom", "idZoom position-abs wth-16 left-1 top-37  text-c color-fff");
        textObject[ZOOM].append($('<p>ZOOM</p><p>' + '</p>'));
        btnObject[ZOOM_T] = ButtonCtrl("zoomLeft","zoomT","T",callbackZoomT);
        btnObject[ZOOM_W] = ButtonCtrl("zoomLeft","zoomW","W", callbackZoomW);
        textObject[ZOOM_DRAGGABLE] = divAppend("zoomLeft", "zoomDraggable", "position-abs wth-16 hig-90 left-23 top-5");
        textObject[ZOOM_DRAGGABLE_BK] = divAppend("zoomDraggable", "zoomDraggableSilder", "zoomDraggableSilder position-abs wth-10 hig-100 left-35 back-color-555");
        textObject[ZOOM_DRAGGABLE_COLOR] = divAppend("zoomDraggable", "zoomDraggableColor", "zoomDraggableColor position-abs wth-10 left-35 hig-100 back-color-ff0");
        imgBtnObject[ZOOM_DRAGGABLE_MOVE] = ImgButtonCtrl("zoomDraggable", "/css/mobile/parts/slider_knob_normal.png", "zoomDraggableMove position-abs wth-50 hig-15 left-14", null, "zoomDraggableMove");
        draggable("zoomDraggableMove", "zoomDraggableColor");
    }

    function speedLeftInit() {
        textObject[SPEED_LEFT] = divAppend("mainLeft", "speedLeft", "position-abs hide wth-100 hig-75");
        textObject[SPEED_LEFT].show();
        document.getElementById("speedLeft").style.visibility = 'hidden'
        textObject[SPEED_VALUE] = divAppend("speedLeft", "", "position-abs wth-16 left-1 top-37 text-c color-fff");
        textObject[SPEED_VALUE].append($('<p>P/T</p> <p>Speed</p>'));
        btnObject[SPEED_T] = ButtonCtrl("speedLeft","speedFast","Fast", callbackSpeedFast);
        btnObject[SPEED_W] = ButtonCtrl("speedLeft","speedSlow","Slow", callbackSpeedSlow);
        textObject[SPEED_DRAGGABLE] = divAppend("speedLeft", "speedDraggable", "position-abs wth-16 hig-90 left-23 top-5");
        textObject[SPEED_DRAGGABLE_BK] = divAppend("speedDraggable", "speedDraggableSilder", "speedDraggableSilder position-abs wth-10 hig-100 left-35 back-color-555");
        textObject[SPEED_DRAGGABLE_COLOR] = divAppend("speedDraggable", "speedDraggableColor", " speedDraggableColor position-abs wth-10 left-35 hig-100 back-color-ff0");
        imgBtnObject[SPEED_DRAGGABLE_MOVE] = ImgButtonCtrl("speedDraggable", "/css/mobile/parts/slider_knob_normal.png", "speedDraggableMove position-abs wth-50 hig-15 left-14", speedCtrlCallback, "speedDraggableMove");
        draggable("speedDraggableMove", "speedDraggableColor");
    }

    function joystickInit() {
        textObject[JOYSTICK_DIV] = divAppend("jqmMain", "TouchDiv", "position-abs wth-50 left-50 hig-100 vhide index2");
        imgBtnObject[JOYSTICK_BOTTOM] = ImgButtonCtrl("TouchDiv", "/css/mobile/parts/ptz_img_joystick_base_pressed.png", "position-abs wth-50 left-50 top-3", null, "joystick");
        imgBtnObject[JOYSTICK_CORE] = ImgButtonCtrl("TouchDiv", "/css/mobile/parts/ptz_knob_pressed.png", "position-abs wth-10", null, "joystickCore");
        joystick("joystick", "joystickCore");
    }

    function positionRightInit() {
        textObject[POSITION_RIGHT] = divAppend("jqmMain", "positionRight", "position-abs left-50 wth-50 hig-100");
        textObject[POSITION_BTN_DIV] = divAppend("positionRight", "positionBtn",null,"display: block;");
        imgBtnObject[P_UP_LEFT_BTN] = ImgButtonCtrl("positionBtn", "", "leftUp", callbackPosMove, "", "", "UL");
        imgBtnObject[P_UP_BTN] = ImgButtonCtrl("positionBtn", "", "Up", callbackPosMove, "", "", "U");
        imgBtnObject[P_UP_RIGHT_BTN] = ImgButtonCtrl("positionBtn", "", "rightUp", callbackPosMove, "", "", "UR");
        imgBtnObject[P_LEFT_BTN] = ImgButtonCtrl("positionBtn", "", "left", callbackPosMove, "", "", "L");
        imgBtnObject[P_RIGHT_BTN] = ImgButtonCtrl("positionBtn", "", "right", callbackPosMove, "", "", NPTZ_WORDING.wID_0345);
        imgBtnObject[P_DOWN_LEFT_BTN] = ImgButtonCtrl("positionBtn", "", "leftDown ", callbackPosMove, "", "", "DL");
        imgBtnObject[P_DOWN_BRN] = ImgButtonCtrl("positionBtn", "", "down", callbackPosMove, "", "", "D");
        imgBtnObject[P_DOWN_RIGHT_BTN] = ImgButtonCtrl("positionBtn", "", "rightDown", callbackPosMove, "", "", "DR");
        imgBtnObject[P_CENTER_BTN] = ImgButtonCtrl("positionBtn", "/css/mobile/parts/ptz_knob_normal.png", "center position-abs wth-18 right-16 top-23-5", callbackPosMove, "", "", "M");
        btnObject[POSITION_FOCUS] = ButtonCtrl("positionRight", "positionFocus","Focus Manual", callbackPosFocus);
        //新加按钮
        btnObject[IRIS] = ButtonCtrl("positionRight", "iris","Iris Manual", callbackPosIris);
        for (var text in imgBtnObject) {
            imgBtnObject[text].show();
            imgBtnObject[text].displayOff();
        }
    }

    function focusRightInit() {
        textObject[FOCUS_RIGHT] = divAppend("jqmMain", "focusRight", "position-abs left-50 hide wth-50 hig-100");
        textObject[FOCUS_VALUE] = divAppend("focusRight", "divFocusValue", "position-abs wth-16 right-1 top-25 text-c color-fff");
        btnObject[FOCUS_FAR] = ButtonCtrl("focusRight", "divFocusFar","Far", callbackFocusF);
        btnObject[FOCUS_NEAR] = ButtonCtrl("focusRight", "divFocusNear","Near", callbackFocusN);
        textObject[FOCUS_DRAGGABLE] = divAppend("focusRight", "focusDraggable", "position-abs wth-16 hig-67-5 right-23 top-4");
        textObject[FOCUS_DRAGGABLE_BK] = divAppend("focusDraggable", "focusDraggableSilder", "focusDraggableSilder position-abs wth-10 hig-100 right-35 back-color-555");
        textObject[FOCUS_DRAGGABLE_COLOR] = divAppend("focusDraggable", "focusDraggableColor", " focusDraggableColor position-abs wth-10 right-35 hig-100 back-color-ff0");
        imgBtnObject[FOCUS_DRAGGABLE_MOVE] = ImgButtonCtrl("focusDraggable", "/css/mobile/parts/slider_knob_normal.png", "focusDraggableMove position-abs wth-50 hig-15 right-15-5", null, "focusDraggableMove");
        btnObject[FOCUS_PTZ] = ButtonCtrl("focusRight", "focusPtzMenu",NPTZ_WORDING.wID_0409, callbackFocusPosition);
        btnObject[FOCUS_AUTO] = ButtonCtrl("focusRight", "focusAutoMenu",NPTZ_WORDING.wID_0016, callbackFocusAuto);
        draggable("focusDraggableMove", "focusDraggableColor");

    }

    function irisRightInit() {
        textObject[IRIS_RIGHT] = divAppend("jqmMain", "irisRight", "position-abs hide left-50 hide wth-50 hig-100");
        textObject[IRIS_VALUE] = divAppend("irisRight", "divIrisValue", "position-abs wth-16 right-1 top-25 text-c color-fff");
        btnObject[IRIS_FAR] = ButtonCtrl("irisRight", "divIrisFar","+", callbackIrisA);
        btnObject[IRIS_NEAR] = ButtonCtrl("irisRight", "divIrisNear",NPTZ_WORDING.wID_0015, callbackIrisS);
        textObject[IRIS_DRAGGABLE] = divAppend("irisRight", "irisDraggable", "position-abs wth-16 hig-67-5 right-23 top-4");
        textObject[IRIS_DRAGGABLE_BK] = divAppend("irisDraggable", "irisDraggableSilder", "irisDraggableSilder position-abs wth-10 hig-100 right-35 back-color-555");
        textObject[IRIS_DRAGGABLE_COLOR] = divAppend("irisDraggable", "irisDraggableColor", " irisDraggableColor position-abs wth-10 right-35 hig-100 back-color-ff0");
        imgBtnObject[IRIS_DRAGGABLE_MOVE] = ImgButtonCtrl("irisDraggable", "/css/mobile/parts/slider_knob_normal.png", "irisDraggableMove position-abs wth-50 hig-15 right-15-5", null, "irisDraggableMove");
        btnObject[IRIS_PTZ] = ButtonCtrl("irisRight", "irisPtzMenu",NPTZ_WORDING.wID_0409, callbackFocusPosition);
        btnObject[IRIS_AUTO] = ButtonCtrl("irisRight", "irisAutoMenu",NPTZ_WORDING.wID_0016, callbackIrisAuto);
        draggable("irisDraggableMove", "irisDraggableColor");

    }


    /**
     * Zoomコントロールコールバック処理
     * @param {number} percent　設定倍率
 */
    function zoomCtrlCallback(percent) {
        zoomSilderClickFlag = true;
        if($(".zoomDraggableMove").hasClass("disable")){
            return;
        }
        percent = percent < 0 ? 0 : percent;
        percent = percent > 999 ? 999 : percent;
        percent = Math.floor(percent/999*2730+1365);
        doZoomSlider(parseInt(percent));
        setTimeout(function(){
            zoomSilderClickFlag = false;
        },4000);
    }

    /**
     * zoom slider control
     * @param percent
     */
    function doZoomSlider(percent) {
        cparam_set_zoomPositionControl(percent);

    }

    // /**
    //  * スピードコントロールコールバック処理
    //  * @param {number} percent　設定倍率
    //  */
    function speedCtrlCallback(percent) {
        // doFocusSlider(parseInt(percent));
        if($(".speedDraggableMove").hasClass("disable")){
            return;
        }
        sliderSpeed.redrawSliderLevelColor(true);
    }

    /**
     * Focusコントロールコールバック処理
     * @param {number} percent　設定倍率
     */
    function focusCtrlCallback(percent) {
        if($("#focusDraggable").hasClass("disable")){
            return;
        };
        percent = percent < 0 ? 0 : percent;
        percent = percent > 99 ? 99 : percent;
        percent = Math.floor(percent/99*2730+1365);
        doFocusSlider(parseInt(percent));
    }

    // /**
    //  * focus slider control
    //  * @param percent
    //  */
    function doFocusSlider(percent) {
        cparam_set_focusPositionControl(percent);
    }

    /**
     * Irisコントロールコールバック処理
     * @param {number} percent　設定倍率
     */
    function irisCtrlCallback(percent) {
        if($("#irisDraggable").hasClass("disable")){
            return;
        };
        percent = percent < 0 ? 0 : percent;
        percent = percent > 254 ? 254 : percent;
        percent = Math.round(percent/254*99);
        percent = percent < 1 ? 1 : percent;
        doIrisSlider(percent);
    }

    /**
     * iris slider control
     * @param percent
     */
    function doIrisSlider(percent) {
        cparam_set_irisControlSpeed(percent);
    }

    /*****************新加function********************/
    function callbackspeedNum(e) {
        if($(".speedNum").hasClass("disable")){
            return;
        }else{
            if (e == Button.TOUCHSTART) {
                btnObject[speedNum].displayOn();
                if (gFlgDisableCamCtrl == true) {
                    return;
                } else {
                    var perc = 1365;
                    cparam_set_zoomPositionControl(perc);
                }
                // function doZoomSlider(percent) {
                //     // var requestData = parseInt(percent).toString(16).toUpperCase();
                //     // console.log("zoomCtrlCallback=>percent:" + percent + " requestData:" + requestData);
                //     // zoomSpeedFocusCtrlButton.SetZoomRequestData(requestData, getZoomCallback);
                //     console.log("zoomCtrlCallback=>percent:" + percent);
                //     cparam_set_zoomPositionControl(percent);
                //
                // }
            }else if(e == Button.TOUCHEND) {
                btnObject[speedNum].displayOff();
            }
        }
    }

    function callbackBegin(e) {
        if (e == Button.TOUCHSTART) {
            setRtmpButtonState();
        }
    }

    function getRtmpParam() {
        var retValue = {};
        $.ajax({
            type: "get",
            url: "/cgi-bin/get_rtmp_param",
            async: false,
            timeout: 100,
            success: function (data) {
                var dataArray = cparam_getRetArray(data);
                var type;
                var url;
                var key;
                if (dataArray[0].indexOf('type') != -1) {
                    type = dataArray[0].substring('type'.length + 1);
                }
                if (dataArray[1].indexOf("url") != -1) {
                    url = dataArray[1].substring("url".length + 1);
                }
                if (dataArray[2].indexOf("key") != -1) {
                    key = dataArray[2].substring("key".length + 1);
                }
                retValue.type = type;
                retValue.url = url;
                retValue.key = key;
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
        return retValue;
    }

    function callbackStreamStart(e) {
        if (e == Button.TOUCHSTART) {
            $("#divStream").show();
            $("#jqmLayerMenu").hide();
            $("img[src='/css/mobile/parts/liveMenu.png']").attr('src','/css/mobile/parts/liveMenuHide.png');
            $(".Start").show();
            $(".txt_show_title").hide();
            $(".power").hide();
            setRtmpButtonState();
        }
    }
    function callbackPosIris(e) {
        if($(".iris").hasClass("disable")){
            return;
        }else{
            if (e == Button.TOUCHSTART) {
                irisFlg = true;
                textObject[POSITION_RIGHT].hide();
                textObject[IRIS_RIGHT].show();
            }
        }

    }

    /*************************************/
    var touchFlg = false;
    function callbackZoomT(e) {
        if($(".zoomT").hasClass("disable")){
            var zoomVaule = NPTZ_WORDING.wID_0167;
            $('#divZoomValue').empty();
            textObject[ZOOM_VALUE].append($('<p>' + zoomVaule + '</p>'));
            return;
        }
        if (e == Button.TOUCHSTART) {

            setTimeout(function(){
                btnObject[ZOOM_T].displayOn();
                if (intervalIDZoom != null) {
                    clearInterval(intervalIDZoom);
                }
                StartZoom(zoomObject[ZOOM_T], event);

                intervalIDZoom = setInterval(function () {
                    zoomTele();
                }, 150);
            },500)
        } else if (e == Button.TOUCHEND) {
            setTimeout(function(){
                btnObject[ZOOM_T].displayOff();
                //clearInterval(intervalIDZoom);
                StopZoom(event);
            },700)

        }
    }
    function callbackZoomW(e) {
        if($(".zoomW").hasClass("disable")){
            var zoomVaule = NPTZ_WORDING.wID_0167;
            $('#divZoomValue').empty();
            textObject[ZOOM_VALUE].append($('<p>' + zoomVaule + '</p>'));
            return;
        }
        if (e == Button.TOUCHSTART) {
            setTimeout(function(){
                btnObject[ZOOM_W].displayOn();
                if (intervalIDZoom != null) {
                    clearInterval(intervalIDZoom);
                }
                StartZoom(zoomObject[ZOOM_W], event);
                intervalIDZoom = setInterval(function () {
                    zoomWide()
                }, 150);
            },500)
        } else if (e == Button.TOUCHEND){
            setTimeout(function(){
                btnObject[ZOOM_W].displayOff();
                clearInterval(intervalIDZoom);
                intervalIDZoom = null;
                StopZoom(event);
            },700)
        }
    }

    /**
     * zoom 拡大処理 (+1)
     */
    function zoomTele() {
        //var mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        var msg = {}
        msg.sComm = null;
        msg.type = "getZoom";
        worker.postMessage(msg);
        var zoomVal = reqPtdObj.mapPtv.zoom;
        if(zoomVal == undefined || zoomVal < 1365){
            zoomVal = 1365;
        }
        zoomVal = Math.floor((zoomVal-1365)/2730*999);
        LayerFunctionMain.setSliderZoomPosition(zoomVal);
    }

    /**
     * zoom 縮小処理 (-1)
     */
    function zoomWide() {
        var msg = {}
        msg.sComm = null;
        msg.type = "getZoom";
        worker.postMessage(msg);
        var zoomVal = reqPtdObj.mapPtv.zoom;
        if(zoomVal == undefined || zoomVal < 1365){
            zoomVal = 1365;
        }
        zoomVal = Math.floor((zoomVal-1365)/2730*999);
        LayerFunctionMain.setSliderZoomPosition(zoomVal);
    }


    /**
     * zoom Value 設定
     */
    function setZoomValue(value) {
        $('#divZoomValue').empty();
        textObject[ZOOM_VALUE].append($('<p>' + value + '</p>'));
    }

    function callbackSpeedFast(e) {
        if($(".speedFast").hasClass("disable")){
            return;
        }else {
            if (speedFlag) {
                if (e == Button.TOUCHSTART) {
                    btnObject[SPEED_T].displayOn();
                    if (intervalIDSpeed != null) {
                        clearInterval(intervalIDSpeed);
                    }
                    intervalIDSpeed = setInterval(function () {
                        speedFast()
                    }, 20);

                } else if (e == Button.TOUCHEND) {
                    btnObject[SPEED_T].displayOff();
                    clearInterval(intervalIDSpeed);
                    intervalIDSpeed = null;
                    var percent = LayerFunctionMain.getSliderSpeed();
                }
            } else {
                if (e == Button.TOUCHSTART) {
                    btnObject[SPEED_T].displayOn();
                    if (intervalIDSpeed != null) {
                        clearInterval(intervalIDSpeed);
                    }
                    intervalIDZoom = setInterval(function () {
                        speedFast()
                    }, 20);
                }
                else if (e == Button.TOUCHEND) {
                    btnObject[SPEED_T].displayOff();
                    clearInterval(intervalIDSpeed);
                    intervalIDSpeed = null;
                    var percent = LayerFunctionMain.getSliderSpeed();
                }
            }
        }
    }
    function callbackSpeedSlow(e) {
        if($(".speedSlow").hasClass("disable")){
            return;
        } else{
            if (speedFlag) {
                if (e == Button.TOUCHSTART) {
                    btnObject[SPEED_W].displayOn();
                    if (intervalIDSpeed != null) {
                        clearInterval(intervalIDSpeed);
                    }
                    intervalIDSpeed = setInterval(function () {
                        speedSlow()
                    }, 20);
                } else if (e == Button.TOUCHEND) {
                    btnObject[SPEED_W].displayOff();
                    clearInterval(intervalIDSpeed);
                    intervalIDSpeed = null;
                    var percent = LayerFunctionMain.getSliderSpeed();
                }
            } else {
                if (e == Button.TOUCHSTART) {
                    btnObject[SPEED_W].displayOn();
                    if (intervalIDSpeed != null) {
                        clearInterval(intervalIDSpeed);
                    }
                    intervalIDZoom = setInterval(function () {
                        speedSlow()
                    }, 20);
                }
                else if (e == Button.TOUCHEND) {
                    btnObject[SPEED_W].displayOff();
                    clearInterval(intervalIDSpeed);
                    intervalIDSpeed = null;
                    var percent = LayerFunctionMain.getSliderSpeed();
                }
            }
        }
    }



    function StartZoom(sType, evt) {
        if (gFlgDisableCamCtrl == true) {
            return;
        }
        if (window.event) {
            evt = window.event;
        }
        if (( sType == 'down' ) || ( sType == 'up' )) {
            var val = LayerFunctionMain.getSliderSpeed();
           // var val = position;
            val = val > 98 ? 98 : val;
            val = val < 2 ? 2 : val;
            var tFast = Math.round(val / 2) + 50;
            var tSlow = 50 - Math.round(val / 2);
            if (sType == 'down') {
                sComm = tSlow < 10 ? '0' + tSlow : tSlow;
            } else {  // 'up'
                sComm = tFast;
            }
        } else {  // 'stop'
            sComm = 50;
        }
        var msg = {}
        msg.sComm = sComm;
        msg.type = "zoom";
        worker.postMessage(msg);
    }

    function StopZoom(evt) {
        if (window.event) {
            evt = window.event;
        }
        var msg = {}
        msg.sComm = 50;
        msg.type = "zoom";
        worker.postMessage(msg);
    }

    function callbackDraggable(percent) {
            percent = percent < 0 ? 0 : percent;
            percent = percent > 999 ? 999 : percent;
            percent = Math.floor(percent/999*2730+1365);
            doZoomSlider(parseInt(percent));

    }
    /**
     * カメラ状態情報更新処理<br>
     * 更新されたカメラ状態情報に応じてスピード・ズーム各種スライダの押下可否判定を行う
     * @param {object} status カメラ状態
     */
    function updateStatus(status) {
        statusFlag = status;
        // todo
        if (status == 1) {
            sliderZoom.undisable();
            sliderSpeed.undisable();
            sliderFocus.undisable();
            sliderIris.undisable();
        } else {
            sliderFocus.disable();
            sliderIris.disable();
        }
    }
    function callbackZoomS(e) {
        if (e == Button.TOUCHSTART) {
            if($(".zoomSpeed").hasClass("disable")){
                return;
            }
            btnObject[ZOOM_SPEED].displayOn();
            if (zoomFlag) {
                btnObject[ZOOM_SPEED] = ButtonCtrl("mainLeft", "zoom","ZOOM", callbackZoomS);
                btnObject[ZOOM_SPEED].show();
                btnObject[ZOOM_SPEED].displayOff();
                $(".zoomSpeed").hide();
                btnObject[speedNum].hide();
                textObject[ZOOM_LEFT].hide();
                document.getElementById("speedLeft").style.visibility = 'visible'

                zoomFlag = false;
            } else {
                btnObject[ZOOM_SPEED] = ButtonCtrl("mainLeft", "zoomSpeed","P/T Speed", callbackZoomS);
                btnObject[ZOOM_SPEED].show();
                btnObject[ZOOM_SPEED].displayOff();
                $(".zoom").hide();
                btnObject[speedNum].show();
                btnObject[speedNum].displayOff();
                textObject[ZOOM_LEFT].show();
                //textObject[SPEED_LEFT].hide();
                document.getElementById("speedLeft").style.visibility = 'hidden'
                zoomFlag = true;
            }
        }
    }

    function callbackPosFocus(e) {
        if($(".positionFocus").hasClass("disable")){
            return;
        }else{
            if (e == Button.TOUCHSTART) {
                focusFlg = true;
                textObject[POSITION_RIGHT].hide();
                textObject[FOCUS_RIGHT].show();
            }
        }
    }

    function callbackPosMove(e, p) {
        if($(".leftUp").hasClass("disable")||
        $(".Up").hasClass("disable")||
        $(".rightUp").hasClass("disable")||
        $(".left").hasClass("disable")||
        $(".right").hasClass("disable")||
        $(".leftDown").hasClass("disable")||
        $(".down").hasClass("disable")||
        $(".rightDown").hasClass("disable")||
        $(".center").hasClass("disable")){
            return;
        }
        var cmd = new Object();
        var moveTop = $("#" + "speedDraggableMove").position().top;
        var speedDraggableHeight = $("#" + "speedDraggable").height() - $("#" + "speedDraggableMove").height();
        var positionVal = Math.floor((moveTop)/speedDraggableHeight*99);
        positionVal = 100 - positionVal;
        var position =parseInt(positionVal/2);
        position = position > 49 ? 49 : position;
        position = position < 1 ? 1 : position;
        //不具合管理 #3804
        if(e == Button.TOUCHSTART){
            operationFlag = true;
        } else if(e == Button.TOUCHEND){
            operationFlag = false;
        }

        switch (p) {
            case "UL":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_UP_LEFT_BTN].displayOn();
                    cmd.tilt = pts.TILT_SPEED_STOP + position;
                    if (cmd.tilt > pts.TILT_UP_SPEED_MAX) {
                        cmd.tilt = pts.TILT_UP_SPEED_MAX;
                    }
                    cmd.pan = pts.PAN_SPEED_STOP - position;
                    if (cmd.pan < pts.PAN_LEFT_SPEED_MAX) {
                        cmd.pan = pts.PAN_LEFT_SPEED_MAX;
                    }
                } else if (e == Button.TOUCHEND) {
                    cparam_set_panTiltSpeedControl(50, 50);
                    imgBtnObject[P_UP_LEFT_BTN].displayOff();
                }
                break;
            case "U":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_UP_BTN].displayOn();
                    cmd.pan = pts.PAN_SPEED_STOP;
                    cmd.tilt = pts.TILT_SPEED_STOP + position;
                    if (cmd.tilt > pts.TILT_UP_SPEED_MAX) {
                        cmd.tilt = pts.TILT_UP_SPEED_MAX;
                    }
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_UP_BTN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            case "UR":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_UP_RIGHT_BTN].displayOn();
                    cmd.tilt = pts.TILT_SPEED_STOP + position;
                    if (cmd.tilt > pts.TILT_UP_SPEED_MAX) {
                        cmd.tilt = pts.TILT_UP_SPEED_MAX;
                    }
                    cmd.pan = pts.PAN_SPEED_STOP + position;
                    if (cmd.pan > pts.PAN_RIGHT_SPEED_MAX) {
                        cmd.pan = pts.PAN_RIGHT_SPEED_MAX;
                    }
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_UP_RIGHT_BTN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            case "L":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_LEFT_BTN].displayOn();
                    cmd.pan = pts.PAN_SPEED_STOP - position;
                    if (cmd.pan < pts.PAN_LEFT_SPEED_MAX) {
                        cmd.pan = pts.PAN_LEFT_SPEED_MAX;
                    }
                    cmd.tilt = pts.TILT_SPEED_STOP;
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_LEFT_BTN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            case "M":
                if (e == Button.TOUCHSTART) {
                    textObject[POSITION_BTN_DIV].hide();
                    textObject[JOYSTICK_DIV].rClass("vhide");
                }
                break;
            case "R":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_RIGHT_BTN].displayOn();
                    cmd.pan = pts.PAN_SPEED_STOP + position;
                    if (cmd.pan > pts.PAN_RIGHT_SPEED_MAX) {
                        cmd.pan = pts.PAN_RIGHT_SPEED_MAX;
                    }
                    cmd.tilt = pts.TILT_SPEED_STOP;
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_RIGHT_BTN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            case "DL":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_DOWN_LEFT_BTN].displayOn();
                    cmd.tilt = pts.TILT_SPEED_STOP - position;
                    if (cmd.tilt < pts.TILT_DOWN_SPEED_MAX) {
                        cmd.tilt = pts.TILT_DOWN_SPEED_MAX;
                    }
                    cmd.pan = pts.PAN_SPEED_STOP - position;
                    if (cmd.pan < pts.PAN_LEFT_SPEED_MAX) {
                        cmd.pan = pts.PAN_LEFT_SPEED_MAX;
                    }
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_DOWN_LEFT_BTN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            case "D":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_DOWN_BRN].displayOn();
                    cmd.pan = pts.PAN_SPEED_STOP;
                    cmd.tilt = pts.TILT_SPEED_STOP - position;
                    if (cmd.tilt < pts.TILT_DOWN_SPEED_MAX) {
                        cmd.tilt = pts.TILT_DOWN_SPEED_MAX;
                    }
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_DOWN_BRN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            case "DR":
                if (e == Button.TOUCHSTART) {
                    imgBtnObject[P_DOWN_RIGHT_BTN].displayOn();
                    cmd.tilt = pts.TILT_SPEED_STOP - position;
                    if (cmd.tilt < pts.TILT_DOWN_SPEED_MAX) {
                        cmd.tilt = pts.TILT_DOWN_SPEED_MAX;
                    }
                    cmd.pan = pts.PAN_SPEED_STOP + position;
                    if (cmd.pan > pts.PAN_RIGHT_SPEED_MAX) {
                        cmd.pan = pts.PAN_RIGHT_SPEED_MAX;
                    }
                } else if (e == Button.TOUCHEND) {
                    imgBtnObject[P_DOWN_RIGHT_BTN].displayOff();
                    cparam_set_panTiltSpeedControl(50, 50);
                }
                break;
            default:
                break;
        }
        cparam_set_panTiltSpeedControl(cmd.pan, cmd.tilt);
    }
    var pts = {
        PAN_LEFT_SPEED_MAX: 1,
        PAN_LEFT_SPEED_MIN: 49,
        PAN_SPEED_STOP: 50,
        PAN_RIGHT_SPEED_MIN: 51,
        PAN_RIGHT_SPEED_MAX: 99,
        TILT_DOWN_SPEED_MAX: 1,
        TILT_DOWN_SPEED_MIN: 49,
        TILT_SPEED_STOP: 50,
        TILT_UP_SPEED_MIN: 51,
        TILT_UP_SPEED_MAX: 99,
    };

    // function getSpeedPosition(val) {
    //     val = val > 98 ? 98 : val;
    //     val = val < 2 ? 2 : val;
    //     var t = Math.round(val / 2);
    //     return t;
    // }

    /**
     * button control start : direction
     * @param sType
     * @param evt
     * @constructor
     */
    function StartPanTilt(sType, evt) {
        var cmd_url;
        if (gFlgDisableCamCtrl == true) {
            return;
        }
        if (window.event) {
            evt = window.event;
        }
        for (var i = 0; i < gsPanTiltType.length; i++) {
            if (sType == gsPanTiltType[i]) {
                break;
            }
        }
        if (i < gsPanTiltType.length) {
            if (i > 0) {
                if (gFlgSlow) {
                    cparam_set_panTiltSpeedControl(gsPanTiltSpeedSlow[i].substring(0,2), gsPanTiltSpeedSlow[i].substring(2, 4));
                } else {
                    cparam_set_panTiltSpeedControl(gsPanTiltSpeed[i].substring(0,2), gsPanTiltSpeed[i].substring(2, 4));
                }
            } else {  // stop
                cparam_set_panTiltSpeedControl(50, 50);
            }
        } else {
            // DO NOTHING
        }
    }

    /**
     * button control stop : direction
     * @param evt
     * @constructor
     */
    function StopPanTilt(evt) {
        cparam_set_panTiltSpeedControl(50, 50);
    }

    function callbackIrisA(e) {
        if($(".divIrisFar").hasClass("disable")){
            return false;
        }else{
            if (e == Button.TOUCHSTART) {
                setTimeout(function(){
                    btnObject[IRIS_FAR].displayOn();
                    if (intervalIDIris != null) {
                        clearInterval(intervalIDIris);
                    }
                    var val = reqPtdObj.mapPtv.iris;
                    if(val == undefined || val < 1365)
                    {
                        val = 1365
                    }
                    val = Math.floor((val-1365)/2730*99);
                    if (val<99) {
                        val = val + 1;
                        irisADD(val);
                    }
                    StartIris(irisObject[IRIS_FAR], event, val);
                    intervalIDIris = setInterval(function () {
                        if (val<99) {
                            val = val + 1;
                            irisADD(val);
                        }
                    }, 150);
                },500)
            }
            else if (e == Button.TOUCHEND) {
                setTimeout(function(){
                    btnObject[IRIS_FAR].displayOff();
                    clearInterval(intervalIDIris);
                    intervalIDIris = null;
                    StopIris(event);
                },700)
            }
        }
    }

    function callbackFocusF(e) {
        if($(".divFocusFar").hasClass("disable")){
            return false;
        }else{
            if (e == Button.TOUCHSTART) {

                btnObject[FOCUS_FAR].displayOn();
                if (intervalIDFocus != null) {
                    clearInterval(intervalIDFocus);
                }
                StartFocus(focusObject[FOCUS_FAR], event);
                intervalIDFocus = setInterval(function () {
                    focusFar();
                }, 100);
            } else if (e == Button.TOUCHEND) {
                btnObject[FOCUS_FAR].displayOff();
                clearInterval(intervalIDFocus);
                intervalIDFocus = null;
                StopFocus(event);
            }
        }
    }


    function callbackIrisS(e){
        if($(".divIrisNear").hasClass("disable")){
            return;
        }else{
            if (e == Button.TOUCHSTART) {

                setTimeout(function(){
                    btnObject[IRIS_NEAR].displayOn();
                    var val = reqPtdObj.mapPtv.iris;
                    if(val == undefined || val < 1365)
                    {
                        val = 1365
                    }
                    val = Math.floor((val-1365)/2730*99);
                    if (val>1) {
                        val = val - 1;
                        irisSUB(val);
                    }
                    StartIris(irisObject[IRIS_FAR], event, val);
                    intervalIDIris = setInterval(function () {
                        if (val>1) {
                            val = val - 1;
                            irisSUB(val);
                        }
                    }, 150);
                },500)
            }
            else if (e == Button.TOUCHEND) {
                setTimeout(function(){
                    btnObject[IRIS_NEAR].displayOff();
                    // DirectCtrl("Z50")
                    clearInterval(intervalIDIris);
                    intervalIDIris = null;
                    StopIris(event);
                },700)
            }
        }
    }


    function callbackFocusN(e) {
        if($(".divFocusNear").hasClass("disable")){
            return false;
        }else{
            if (e == Button.TOUCHSTART) {

                btnObject[FOCUS_NEAR].displayOn();
                StartFocus(focusObject[FOCUS_NEAR], event);
                intervalIDFocus = setInterval(function () {
                    focusNear();
                }, 100);
            } else if (e == Button.TOUCHEND) {
                clearInterval(intervalIDFocus);
                intervalIDFocus = null;
                StopFocus(event);
                btnObject[FOCUS_NEAR].displayOff();
            }
        }
    }

    /**
     * iris アップ処理 (+1)
     */
    function irisADD(nowVal) {
        //cparam_set_irisControlSpeed(nowVal);
        var msg = {}
        msg.sComm = nowVal;
        msg.type = "iris";
        worker.postMessage(msg);
        //var mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        var irisVal = reqPtdObj.mapPtv.iris;

        if(irisVal == undefined || irisVal < 1365){
            irisVal = 1365;
        }
        irisVal = Math.floor((irisVal-1365)/2730*254);
        LayerFunctionMain.setSliderIrisPosition(irisVal);
    }

    /**
     * iris ダウン処理 (-1)
     */
    function irisSUB(nowVal) {
        var msg = {}
        msg.sComm = nowVal;
        msg.type = "iris";
        worker.postMessage(msg);
        //var mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        var irisVal = reqPtdObj.mapPtv.iris;

        if(irisVal == undefined || irisVal < 1365){
            irisVal = 1365;
        }
        irisVal = Math.floor((irisVal-1365)/2730*254);
        LayerFunctionMain.setSliderIrisPosition(irisVal);
    }


    /**
     * focus アップ処理 (+1)
     */
    function focusFar() {
        //var mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        var focusVal = reqPtdObj.mapPtv.focus;
        console.log("focusVal"+focusVal)
        if(focusVal == undefined || focusVal < 1365){
            focusVal = 4095;
        }
        focusVal = Math.floor((focusVal-1365)/2730*99);
        LayerFunctionMain.setSliderFocusPosition(focusVal);
    }

    /**
     * focus ダウン処理 (-1)
     */
    function focusNear() {

        //var mapPtv = cparam_get_panTiltZoomFocusIrisTogetherControl();
        var focusVal = reqPtdObj.mapPtv.focus;
        if(focusVal == undefined || focusVal < 1365){
            focusVal = 4095;
        }
        focusVal = Math.floor((focusVal-1365)/2730*99);
        LayerFunctionMain.setSliderFocusPosition(focusVal);

    }

    // /**
    //  * speed アップ処理 (+1)
    //  */
    function speedFast() {
        var val = LayerFunctionMain.getSliderSpeed();
        if (val < 99) {
            LayerFunctionMain.setSliderSpeedPosition(val + 1);
        }

    }

    //
    // /**
    //  * speed ダウン処理 (-1)
    //  */
    function speedSlow() {
        var val = LayerFunctionMain.getSliderSpeed();
        if (val > 1) {
            LayerFunctionMain.setSliderSpeedPosition(val - 1);
        }
    }

    function StartFocus(sType, evt) {
        if ((gFlgDisableCamCtrl == true) || (AutoFocus == 1)) {
            return;
        }
        if (window.event) {
            evt = window.event;
        }
        if (( sType == 'near' ) || ( sType == 'far' )) {
            var val = LayerFunctionMain.getSliderSpeed();
            val = val > 98 ? 98 : val;
            val = val < 2 ? 2 : val;

            var tFast = Math.round(val / 2) + 50;
            var tSlow = 50 - Math.round(val / 2);

            if (sType == 'near') {
                sComm = tSlow < 10 ? '0' + tSlow : tSlow;

            } else {  // 'far'
                sComm = tFast;
            }
        } else {  // 'stop'
            sComm = 50;

        }
        var msg = {}
        msg.sComm = sComm;
        msg.type = "focus";
        worker.postMessage(msg);
    }

    /**
     * stop to control focus
     * @param evt
     * @constructor
     */
    function StopFocus(evt) {
        var cmd_url;
        if (window.event) {
            evt = window.event;
        }
        var msg = {}
        msg.sComm = 50;
        msg.type = "focus";
        worker.postMessage(msg);
    }

    /**
     * start to control iris
     * @param sType
     * @param evt
     * @constructor
     */
    function StartIris(sType, evt, nowVal) {
        var sComm;
        if ((gFlgDisableCamCtrl == true) || !canSetIris() || (AutoIris == 1)) {
            return;
        }
        if (window.event) {
            evt = window.event;
        }
        if (( sType == 'down' ) || ( sType == 'up' )) {
            if (sType == 'down') {
                if (nowVal>0)
                {
                    sComm = nowVal-1
                    //cparam_set_irisControlSpeed(nowVal-1);
                }
            } else {  // 'up'
                if (nowVal<99)
                {
                    sComm = nowVal+1
                    //cparam_set_irisControlSpeed(nowVal+1);
                }
            }
        } else {  // 'stop'
            sComm = -50;
            //cparam_set_irisStop();
        }

        var msg = {}
        msg.sComm = sComm;
        msg.type = "iris";
        worker.postMessage(msg);
    }

    /**
     * stop to control iris
     * @param evt
     * @constructor
     */
    function StopIris(evt) {
        if (window.event) {
            evt = window.event;
        }
        cparam_set_irisStop();
    }

    var fSound = document;
    var Str_cursor, End_cursor, Lst_cursor, Now_cursor;
    var _ms = "" + cparams.inputvolume;
    var Bac_x = new Array(384, 484);


    var SetId = "0";

    var Minsdr_x = 0;
    var Maxsdr_x = 48;
    var Move_max = new Array(Bac_x[0] + Maxsdr_x, Bac_x[1] + Maxsdr_x);
    var Move_min = new Array(Bac_x[0] + Minsdr_x, Bac_x[1] + Minsdr_x);
    /**
     * control sound
     */
    function soundSlider() {
        var GetId = "";
        var id = "ImgCursor";
        GetId = event.srcElement.id;
        SetId = Math.abs(GetId.substring(6, 7));
        if (( gbAudioState == 1 ) && ( SetId == "1" )) {
            var lcStr = fSound.getElementById(id + SetId).style.left;
            Lst_cursor = Number(lcStr.substr(0, lcStr.length - 2));
            Str_cursor = event.x;
            Slide_flg = true;
        }
    }

    var Slide_flg = false;



    /**
     * drag end
     * @constructor
     */
    function SliderEnd() {
        Slide_flg = false;
        if (( gbAudioState == 1 ) && ( SetId == "1" )) {
            VolSet(SetId);
        }
    }

    /**
     * do dragging
     * @constructor
     */
    function SliderMove() {
        var id = "ImgCursor";
        if (( gbAudioState == 1 ) && ( SetId == "1" )) {
            if (Slide_flg) {
                End_cursor = event.x;
                Now_cursor = (End_cursor - Str_cursor) + Lst_cursor;
                if (Now_cursor < Move_min[SetId - 1]) {
                    Now_cursor = Move_min[SetId - 1];
                }
                if (Now_cursor > Move_max[SetId - 1]) {
                    Now_cursor = Move_max[SetId - 1];
                }
                fSound.getElementById(id + SetId).style.left = Now_cursor + "px";
            }
        }
        event.returnValue = false;
    }

    /**
     * the feasibility of set iris
     * @returns {boolean}
     */
    function canSetIris() {
        // scene: not Fullauto, hdr: off, day/night:day
        if (gScene != 4 && cparam_get_gammaMode() == 0 && cparams.sdrs == 0 /*&& (cparams.day_night == 0 || cparams.day_night == 1)*/) {
            return true;
        }
        return false;
    }

    function callbackFocusPosition(e) {
        if($(".focusPtzMenu").hasClass("disable") || $(".irisPtzMenu").hasClass("disable")){
            return false;
        }else {
            if (e == Button.TOUCHSTART) {
                irisFlg = false;
                focusFlg = false;
                textObject[POSITION_RIGHT].show();
                textObject[FOCUS_RIGHT].hide();
                textObject[IRIS_RIGHT].hide();
            }
        }
    }
    var oldFocusDate = null;
    var oldIrisDate = null;

    function callbackFocusAuto(e) {
        if($(".focusAutoMenu").hasClass("disable")||$(".irisAutoMenu").hasClass("disable")){
            return false;
        }else {
            if (e == Button.TOUCHSTART) {
                if (focusAutoFlag == 1) {
                    SndAutoFocus(0);
                    focusAutoUndisable();
                } else {
                    SndAutoFocus(1);
                    focusAutoDisable();
                }
            }
        }

    }

    function focusAutoUndisable() {
        if(focusAutoFlag == 0) return;
        sliderFocus.undisable(); //add by yangyang 20180906
        btnObject[FOCUS_FAR].displayOff();
        btnObject[FOCUS_NEAR].displayOff();
        btnObject[POSITION_FOCUS].srcConvert("/css/mobile/parts/btn_common_normal.png");
        btnObject[FOCUS_AUTO].srcConvert("/css/mobile/parts/btn_common_normal.png");
        btnObject[FOCUS_AUTO].displayOff();
        if($(".positionFocus").hasClass("disable")){
            return;
        }else {
            btnObject[POSITION_FOCUS].displayOff();
        }
        if ($('.focusDraggableColor').hasClass("back-color-7C0")) {
            $('.focusDraggableColor').removeClass("back-color-7C0");
        }
        $('.focusDraggableColor').addClass("back-color-ff0");

        if($("#focusDraggableMove").attr("src") != "/css/mobile/parts/slider_knob_pressed.png")
        {
            imgBtnObject[FOCUS_DRAGGABLE_MOVE].srcConvert("/css/mobile/parts/slider_knob_normal.png");
        }

        $(".positionFocus p").text("Focus Manual");
        focusAutoFlag = 0;
        //$('#divFocusValue').empty();
        // if(!oldFocusDate == null){
        //     btnObject[FOCUS_VALUE].append($('<p>Focus</p><p>' + oldFocusDate + '</p>'));    //add by yangyang 20180906
        //     btnObject[FOCUS_DRAGGABLE_MOVE].srcConvert("/css/mobile/parts/slider_knob_normal.png"); //add by yangyang 20180907
        // }
    }

    function focusAutoDisable() {
        if(focusAutoFlag == 1) return;
        sliderFocus.disable(); //add by yangyang 20180906
        btnObject[FOCUS_AUTO].srcConvert("/css/mobile/parts/btn_common_selectedPressed.png");
        btnObject[FOCUS_AUTO].displayOn();

        btnObject[POSITION_FOCUS].srcConvert("/css/mobile/parts/btn_label_pressed.png");
        btnObject[POSITION_FOCUS].displayOn();
        $(".positionFocus p").text("Focus Auto");
        btnObject[FOCUS_FAR].show();
        btnObject[FOCUS_NEAR].show();
        btnObject[FOCUS_FAR].displayDisabled();
        btnObject[FOCUS_NEAR].displayDisabled();
        oldFocusDate = parseInt($("#divFocusValue")[0].innerText);
        if ($('.focusDraggableColor').hasClass("back-color-ff0")) {
            $('.focusDraggableColor').removeClass("back-color-ff0");
        }
        $('.focusDraggableColor').addClass("back-color-7C0");
        var focusVaule= NPTZ_WORDING.wID_0167;
        $('#divFocusValue').empty();
        textObject[FOCUS_VALUE].append($('<p>Focus</p><p>' + focusVaule + '</p>'));

        //add by yangyang 20180906
        var mapPtd = cparam_get_panTiltZoomFocusIrisTogetherDisplay();
        oldFocusDate = mapPtd.focus;
        imgBtnObject[FOCUS_DRAGGABLE_MOVE].srcConvert("/css/mobile/parts/slider_knob_disable.png"); //add by yangyang 20180907
        focusAutoFlag = 1;
    }

    function callbackIrisAuto(e) {
        if($(".irisAutoMenu").hasClass("disable")){

        } else {
            if (e == Button.TOUCHSTART) {
                if (irisAutoFlag == 1) {
                    SetBrightAuto(0); //modify by yangyang 20180907
                    irisAutoUndisable();
                } else {
                    //$("#irisDraggable").addClass("disable");
                    SetBrightAuto(1); //modify by yangyang 20180907
                    irisAutoDisable();
                }
            }
        }
    }

    function irisAutoUndisable() {
        sliderIris.undisable(); //add by yangyang 20180906
        irisAutoFlag = 0;
        btnObject[IRIS_FAR].displayOff();
        btnObject[IRIS_NEAR].displayOff();
        btnObject[IRIS].srcConvert("/css/mobile/parts/btn_common_normal.png");
        btnObject[IRIS_AUTO].srcConvert("/css/mobile/parts/btn_common_selectedPressed.png");
        btnObject[IRIS_AUTO].displayOff();
        if($(".iris").hasClass("disable")){
            return;
        }else{
            btnObject[IRIS].displayOff();
        }
        if ($('.irisDraggableColor').hasClass("back-color-7C0")) {
            $('.irisDraggableColor').removeClass("back-color-7C0");
        }
        $('.irisDraggableColor').addClass("back-color-ff0");
        $(".iris p").text("Iris Manual");

        if($("#irisDraggableMove").attr("src") != "/css/mobile/parts/slider_knob_pressed.png")
        {
            imgBtnObject[IRIS_DRAGGABLE_MOVE].srcConvert("/css/mobile/parts/slider_knob_normal.png");
        }

        // $('#divIrisValue').empty();
        // if(!oldIrisDate == null){
        //     btnObject[IRIS_VALUE].append($('<p>Iris</p><p>' + oldIrisDate + '</p>')); //add by yangyang 20180906
        //     btnObject[IRIS_DRAGGABLE_MOVE].srcConvert("/css/mobile/parts/slider_knob_normal.png"); //add by yangyang 20180907
        // }

    }

    function irisAutoDisable() {
        sliderIris.disable(); //add by yangyang 20180906
        irisAutoFlag = 1;
        btnObject[IRIS].srcConvert("/css/mobile/parts/btn_label_pressed.png");
        btnObject[IRIS_AUTO].srcConvert("/css/mobile/parts/btn_common_selectedPressed.png");
        btnObject[IRIS_AUTO].displayOn();
        btnObject[IRIS].displayOn();
        $(".iris p").text("Iris\nAuto");
        btnObject[IRIS_FAR].show();
        btnObject[IRIS_NEAR].show();
        btnObject[IRIS_FAR].displayDisabled();
        btnObject[IRIS_NEAR].displayDisabled();
        if ($('.irisDraggableColor').hasClass("back-color-ff0")) {
            $('.irisDraggableColor').removeClass("back-color-ff0");
        }
        $('.irisDraggableColor').addClass("back-color-7C0");
        var irisvalue= NPTZ_WORDING.wID_0167;
        $('#divIrisValue').empty();
        textObject[IRIS_VALUE].append($('<p>Iris</p><p>' + irisvalue + '</p>'));
        //add by yangyang 20180906
        var mapPtd = reqPtdObj.mapPtd;
        oldIrisDate = mapPtd.strIris;
        imgBtnObject[IRIS_DRAGGABLE_MOVE].srcConvert("/css/mobile/parts/slider_knob_disable.png"); //add by yangyang 20180907
    }

    function SndAutoFocus(kind) {
        // var cmd_url;
        if (kind == 1) {
            reqCgiObj.getFocus = 1;
            cparam_set_focusMode(1);
            // cmd_url = cawcamctrl_sendAwComm('OAF:1', true);
        } else {
            reqCgiObj.getFocus = 0;
            cparam_set_focusMode(0);
            // cmd_url = cawcamctrl_sendAwComm('OAF:0', true);
        }
        // if (cmd_url != false) {
        //     sendAuto(cmd_url);
        // }
    }

    /**
     * set iris auto commend
     * @constructor
     */
    function SetBrightAuto(kind) {
        if (kind == 1) {
            reqCgiObj.getIris = 1;
            cparam_set_irismode(1);
            // cmd_url = cawcamctrl_sendAwComm('OAF:1', true);
        } else {
            reqCgiObj.getIris = 0;
            cparam_set_irismode(0);
            // cmd_url = cawcamctrl_sendAwComm('OAF:0', true);
        }
    }

    var intervalSetSliderValue = null;

    function startSetSliderValue() {
        if(intervalSetSliderValue != null){
            clearInterval(intervalSetSliderValue);
        }
        intervalSetSliderValue = setInterval(function () {
            if(silderMouseDownFlag == false){
                if(silderMouseUpOverSleepTime > 0){
                    silderMouseUpOverSleepTime = silderMouseUpOverSleepTime - 1;
                }else {
                    getSliderValues();
                }
            }
        }, 1500);

    }
    function stopIntervalSetSlider(){
        if(intervalSetSliderValue == null) return;
        clearInterval(intervalSetSliderValue);
        intervalSetSliderValue = null;
    }

    function getSliderValues() {

        // if(document.getElementById("camera_controller_gui").style.display == "none" ){
        //     return;
        // }
        if($(".zoomT").hasClass("disable")||
            $(".zoomW").hasClass("disable")){
            return;
        }
        if(!operationFlag && reqPtdObj.mapPtv){

            var mapPtv = reqPtdObj.mapPtv;
            var mapPtd = reqPtdObj.mapPtd;

            if (!($('#zoomDraggableMove').hasClass('disable')) && !($('#zoomDraggableMove').hasClass('drag'))) { //add by yangyang 20180907
                // zoom
                var zoomVal = mapPtv.zoom;
                if (zoomVal == undefined || zoomVal < 1365) {
                    zoomVal = 1365;
                }
                zoomVal = Math.floor((zoomVal - 1365) / 2730 * 999);
                if (zoomVal >= 0) {
                    if(!zoomSilderClickFlag){
                        sliderZoom.setPosition(zoomVal, 999);  //00H-3E7h 0-999 1000
                    }

                    $('#divZoomValue').empty();
                    textObject[ZOOM_VALUE].append($('<p>' + mapPtd.zoom + '</p>'));
                }
                else {
                    var zoomVaule = NPTZ_WORDING.wID_0167;
                    $('#divZoomValue').empty();
                    textObject[ZOOM_VALUE].append($('<p>ZOOM</p><p>' + zoomVaule + '</p>'));
                }
            }
            // focus
            if (!($('#focusDraggableMove').hasClass('disable')) && !($('#focusDraggableMove').hasClass('drag')) && !$("#focusRight").is(":hidden")) { //modify by yangyang 20180906 //add by yangyang 20180907
                var focusValue = mapPtv.focus; //555h-FFFh  1365-4095
                if (focusValue == undefined || focusValue < 1365) {
                    focusValue = 4095;
                }
                focusValue = Math.floor((focusValue - 1365) / 2730 * 99);
                if (focusValue >= 0) {
                    sliderFocus.setPosition(focusValue, 99);
                    $('#divFocusValue').empty();
                    textObject[FOCUS_VALUE].append($('<p>Focus</p><p>' + mapPtd.focus + '</p>'));
                } else {
                    $('#divFocusValue').empty();
                    textObject[FOCUS_VALUE].append($('<p>Focus</p><p>------</p>'));
                }
            }
            // iris
            if (!($('#irisDraggableMove').hasClass('disable')) && !($('#irisDraggableMove').hasClass('drag')) && !$("#irisRight").is(":hidden")) {  //modify by yangyang 20180906 //add by yangyang 20180907
                var irisVal = mapPtv.iris;
                if (irisVal == undefined || irisVal < 1365) {
                    irisVal = 1365;
                }
                irisVal = Math.floor((irisVal - 1365) / 2730 * 254);
                if (irisVal >= 0) {
                    sliderIris.setPosition(irisVal, 254);
                    $('#divIrisValue').empty();
                    textObject[IRIS_VALUE].append($('<p>Iris</p><p>' + mapPtd.strIris + '</p>'));
                } else {
                    $('#divIrisValue').empty();
                    textObject[IRIS_VALUE].append($('<p>Iris</p><p>------</p>'));
                }
            } else {
                $('#divIrisValue').empty();
                textObject[IRIS_VALUE].append($('<p>Iris</p><p>------</p>'));
            }
        }
        //不具合管理 #3804
        LayerTouchpt.updataState();
    }

    /**
     * スライダ制御クラス
     * @class スライダ制御クラス
     * @return {function} build 構築処理
     * @return {function} redraw 再描画処理
     * @return {function} show　 表示処理
     * @return {function} hide　 非表示処理
     * @return {function} disable 無効化処理
     * @return {function} undisable 有効化処理
     * @return {number} getValue スライダのレベルの取得
     * @return {number} getStatus スライダ状態の取得
     * @return {function} setPosition スライダの再描画処理
     * @return {function} setValue スライダレベルの現在再描画
     * @return {function} redrawSliderLevelColor スライダ待機中処理(現状、未使用)
     * @constructor
     */
    function Slider() {
        /**
         * スライダ初期ポジション
         * @type number
         */
        var DEFAULT_POSITION = null;

        /**
         * スライダサイズ
         * @type number
         */
        var SIZE;

        /**
         * スライダポジション
         * @type number
         */
        var position = DEFAULT_POSITION;

        /**
         * スライダオブジェクト
         * @type string
         */
        var SLIDER_BASE_KEY;

        /**
         * つまみ位置
         * @type string
         */
        var SLIDER_HANDLE_KEY;

        /**
         * スライダレベル
         * @type string
         */
        var SLIDER_LEVEL_KEY;

        /**
         * スライダ現在設定レベル
         * @type string
         */
        var SLIDER_NOW_LEVEL_KEY;

        /**
         * スライダHEIGHT
         * @type number
         */
        var SLIDER_BASE_HEIGHT;

        /**
         * スライダWIDTH
         * @type number
         */
        var SLIDER_BASE_WIDTH;

        /**
         * つまみ位置HEIGHT
         * @type number
         */
        var SLIDER_HANDLE_HEIGHT;

        /**
         * つまみ位置WIDTH
         * @type number
         */
        var SLIDER_HANDLE_WIDTH;

        /**
         * 構築済みフラグ
         * @type boolean
         */
        var buildFlag = false;

        /**
         * ボタン押下状態
         * @type number
         */
        var buttonStatus = Button.STATUS_DISABLED;

        /**
         * ドラッグ判定フラグ
         * @type boolean
         */
        var draggingFlag = false;

        var maxNumber = null;

        /**
         * スライダ構築処理
         * @param {string} sliderBaseKey 　スライダ設定値キー
         * @param {string} sliderHandleKey スライダつまみ設定値キー
         * @param {function} sliderCallback  コールバック関数
         */
        function build(sliderBaseKey, sliderHandleKey, sliderCallback, parentDiv,max) {
            /**
             * スライダ初期値(％)
             * @type {number}
             */
            position = max;
            maxNumber = max;

            if (buildFlag == false) {

                buildFlag = true;

                // CSSと紐付けられた引数をセット
                SLIDER_BASE_KEY = sliderBaseKey;
                SLIDER_HANDLE_KEY = sliderHandleKey;
                SLIDER_LEVEL_KEY = SLIDER_BASE_KEY + "Color";
                SLIDER_NOW_LEVEL_KEY = SLIDER_BASE_KEY + "Silder";

                // スライダのボタン要素作成
                var button = $('<div id="' + SLIDER_BASE_KEY + '"> </div>');
                $('#' + parentDiv).append(button);
                button.append('<div class="' + SLIDER_LEVEL_KEY + '"> </div>');
                button.append('<div class="' + SLIDER_NOW_LEVEL_KEY + '"> </div>');
                button.append('<div class="' + SLIDER_HANDLE_KEY + '"> </div>');

                // CSSから情報取得(倍率計算処理に使用するパラメータ)
                if((SLIDER_BASE_KEY == "speedDraggable") || (SLIDER_BASE_KEY == "focusDraggable") || (SLIDER_BASE_KEY == "irisDraggable") ){
                    SLIDER_BASE_HEIGHT = parseInt($('#zoomDraggable').css('height'));
                }else{
                    SLIDER_BASE_HEIGHT = parseInt($('#' + SLIDER_BASE_KEY).css('height'));
                }

                SLIDER_BASE_WIDTH = parseInt($('#' + SLIDER_BASE_KEY).css('width'));
                SLIDER_HANDLE_HEIGHT = parseInt($('.' + SLIDER_HANDLE_KEY).css('height'));
                SLIDER_HANDLE_WIDTH = parseInt($('.' + SLIDER_HANDLE_KEY).css('width'));
                SIZE = SLIDER_BASE_HEIGHT - SLIDER_HANDLE_HEIGHT;

            }

            // jQueryでドラッグ可能なオブジェクトを指定
            $('.' + SLIDER_HANDLE_KEY).on(
                {
                    // 垂直方向のみドラッグ可能
                    axis: ["y"],
                    containment: ['parent'],

                    // ドラッグ開始時、終了時、ドラッグ時の処理を規定
                    touchstart: function (e) {
                        if($("#" + SLIDER_HANDLE_KEY).hasClass("disable")){
                            return;
                        }
                        silderMouseDownFlag = true;
                        $('.' + SLIDER_HANDLE_KEY).removeClass('hover');
                        $('.' + SLIDER_HANDLE_KEY).addClass('drag');
                        draggingFlag = true;
                    },
                    touchend: function (e) {
                        // var a = e.currentTarget.className;
                        // if(a.indexOf("disable") != -1){
                        //     return ;
                        // }
                        // if($("#focusDraggable").hasClass("disable") || $("#irisDraggable").hasClass("disable")){
                        //     return false;
                        // }
                        e.preventDefault();
                        // var top = $("#"+sliderHandleKey).position().top;
                        var top = parseInt($("#"+sliderHandleKey).css("top"));
                        draggingFlag = false;
                        $('.' + SLIDER_HANDLE_KEY).removeClass('drag');

                        // ドラッグ位置(％)を計算し、コールバックを呼出
                        position = parseInt(max - (top * max / SIZE));
                        sliderCallback(position);
                        redrawSliderLevel(position,max);
                        silderMouseDownFlag = false;
                        silderMouseUpOverSleepTime = 1;
                    },
                    touchmove: function (e) {
                        // if($("#focusDraggable").hasClass("disable") || $("#irisDraggable").hasClass("disable")){
                        //     return false;
                        // }
                        // var a = e.currentTarget.className;
                        // if(a.indexOf("disable") != -1){
                        //     return ;
                        // }
                        e.preventDefault();
                        silderMouseDownFlag = true;
                        var top = parseInt($("#"+sliderHandleKey).css('top'));
                        position = parseInt(max - (top * max / SIZE));
                        if(position < 0){
                            $('.' + SLIDER_HANDLE_KEY).mouseup();
                            position=1;
                            redrawSlider(position,max);
                            redrawSliderLevel(position,max);
                        } else {
                            $('.' + SLIDER_HANDLE_KEY).on({cancel: ['']})
                        }
                        redrawSliderLevel(position,max);
                    }
                }
            );

            $('.' + SLIDER_NOW_LEVEL_KEY).on(
                {
                    // 垂直方向のみドラッグ可能
                    axis: ["y"],
                    containment: ['parent'],
                    touchend: function (e) {
                        e.preventDefault();
                        // var top = $("#"+sliderHandleKey).position().top;
                        // var top = parseInt($("#"+SLIDER_NOW_LEVEL_KEY).css("top"));
                        if ($("#" + SLIDER_HANDLE_KEY).hasClass("disable")) {
                            return;
                        }
                        var top = $("." + SLIDER_NOW_LEVEL_KEY).offset().top;
                        var pageY = e.originalEvent.changedTouches[0].pageY;
                        draggingFlag = false;
                        $('.' + SLIDER_HANDLE_KEY).removeClass('drag');
                        // ドラッグ位置(％)を計算し、コールバックを呼出
                        var offset = pageY - top;
                        position = parseInt(max - (offset * max / SIZE));
                        // position = parseInt(max - (top * max / SIZE));
                        sliderCallback(position);
                        redrawSlider(position,max);
                        silderMouseDownFlag = false;
                        silderMouseUpOverSleepTime = 1;
                    }
                }

            );

            $('.' + SLIDER_LEVEL_KEY).on(
                {
                    // 垂直方向のみドラッグ可能
                    axis: ["y"],
                    containment: ['parent'],
                    touchend: function (e) {
                        e.preventDefault();
                        // var top = $("#"+sliderHandleKey).position().top;
                        // var top = parseInt($("#"+sliderHandleKey).css("top"));
                        if ($("#" + SLIDER_HANDLE_KEY).hasClass("disable")) {
                            return;
                        }
                        draggingFlag = false;
                        $('.' + SLIDER_HANDLE_KEY).removeClass('drag');
                        var top = $("." + SLIDER_HANDLE_KEY).offset().top;
                        var pageY = e.originalEvent.changedTouches[0].pageY;
                        var offset = pageY - top - SLIDER_HANDLE_HEIGHT;
                        // ドラッグ位置(％)を計算し、コールバックを呼出
                        position = position - parseInt(offset * max / SIZE);
                        // position = parseInt(max - (top * max / SIZE));
                        sliderCallback(position);
                        redrawSlider(position,max);
                        silderMouseDownFlag = false;
                        silderMouseUpOverSleepTime = 1;
                    }
                }

            );

            // マウスオーバー時の処理を規定
            $('.' + SLIDER_HANDLE_KEY).hover(function () {
                if (buttonStatus != Button.STATUS_DISABLED) {
                    if (!draggingFlag) {
                        $('.' + SLIDER_HANDLE_KEY).removeClass('drag');
                        $('.' + SLIDER_HANDLE_KEY).addClass('hover');
                    }
                }
            }, function () {
                if (buttonStatus != Button.STATUS_DISABLED) {
                    $('.' + SLIDER_HANDLE_KEY).removeClass('hover');
                }
            });

            // マウスクリック時の処理を規定
            $('.' + SLIDER_HANDLE_KEY).mousedown(function (event) {
                silderMouseDownFlag = true;
                if (event.which == Button.CLICK_LEFT) {
                    if (buttonStatus != Button.STATUS_DISABLED) {
                        $('.' + SLIDER_HANDLE_KEY).removeClass('hover');
                        $('.' + SLIDER_HANDLE_KEY).addClass('drag');
                    }
                }
            });

            // マウスクリック解除時の処理を規定
            $('.' + SLIDER_HANDLE_KEY).mouseup(function (event) {
                if (event.which == Button.CLICK_LEFT) {
                    if (buttonStatus != Button.STATUS_DISABLED) {
                        $('.' + SLIDER_HANDLE_KEY).removeClass('drag');
                        $('.' + SLIDER_HANDLE_KEY).addClass('hover');
                    }
                }

                silderMouseDownFlag = false;
                silderMouseUpOverSleepTime = 1;
            });

            // 初期値を設定
            redrawSlider(position,max);
            // redrawSliderNowLevel(position);

            // ビルド直後はdisable状態とする。
            buttonStatus = Button.STATUS_DISABLED;
            $('.' + SLIDER_HANDLE_KEY).addClass('disable');
            $('.' + SLIDER_HANDLE_KEY).on({cancel: ['.' + SLIDER_HANDLE_KEY]});
        }

        /**
         * スライダの再描画処理(ユーザ操作以外を契機に実行される処理)
         * @param {number} percent スライダ位置(％)
         */
        function redrawSlider(percent,max) {
            position = percent;
            percent = percent > max ? max : percent;
            var height = $('.' + SLIDER_HANDLE_KEY).height();
            var y = Math.round((max - percent) * (SIZE) / max);


            // ボタンの可動範囲を考慮してCSSのピクセル値を決定
            $('.' + SLIDER_HANDLE_KEY).css({
                //left: Math.round(SLIDER_BASE_WIDTH / 2 - 1 * SLIDER_HANDLE_WIDTH / 2) + 'px',
                // top: y > SIZE ? 0 + "%" : (y-height)/SIZE*100 + '%'

                top: y > SIZE ?(SIZE/(SIZE + height)*100) : (y)/(SIZE + height)*100 + '%'
                // top: y > 272 ? 272 : y + 'px'
            });
            redrawSliderLevel(percent,max);
            // alert(111);
        }

        /**
         * スライダレベルの再描画(ユーザ操作)
         * @param {number} percent 設定倍率
         */
        function redrawSliderLevel(percent,max) {
            percent = percent > max ? max : percent;
            var y = Math.round((max - percent) * SIZE / max);
            $('.' + SLIDER_LEVEL_KEY).css({
                // top: y + SLIDER_HANDLE_HEIGHT + 'px',
                // top: (y + SLIDER_HANDLE_HEIGHT)/SIZE*100 + "%",
                // top: (SIZE - y) > SIZE ? 0 + "%" : (1 - (SIZE - y)/SIZE*100)+ '%',
                top: y > SIZE ? 0 + "%" : y/SIZE*100 + '%',
                height: (SIZE - y) > SIZE ? 100 + '%' : (SIZE - y)/SIZE*100 + '%'
            });
        }

        /**
         * スライダレベルの現在再描画
         * @param {number} percent 設定倍率
         */
        function redrawSliderNowLevel(percent,index) {
            var value;
            if(index =="zoom"){
                value = 999;
            }else if(index =="focus"){
                value = 99;
            }else{
                value = 254;
            }
            percent = percent > value ? value : percent;
            var y = Math.round((value - percent) * SLIDER_BASE_HEIGHT / value);
            $('.' + SLIDER_NOW_LEVEL_KEY).css({
                top: y + 'px',
                height: SLIDER_BASE_HEIGHT - y + 'px'
            });
        }

        /**
         * スライダ待機中処理(現状、未使用)
         * @param {boolean} busy 待機判定
         */
        function redrawSliderLevelColor(busy) {
            if (busy == true) {
                $('.' + SLIDER_LEVEL_KEY).addClass('on');
            } else {
                $('.' + SLIDER_LEVEL_KEY).removeClass('on');
            }
        }

        /**
         * slider's style changed
         * @param sliderBaseKeyOld
         * @param sliderHandleKeyOld
         * @param sliderBaseKey
         * @param sliderHandleKey
         */
        function changeSliderStyle(sliderBaseKeyOld, sliderHandleKeyOld, sliderBaseKey, sliderHandleKey) {
            SLIDER_BASE_KEY = sliderBaseKey;
            SLIDER_HANDLE_KEY = sliderHandleKey;
            SLIDER_LEVEL_KEY = SLIDER_BASE_KEY + "Color";
            SLIDER_NOW_LEVEL_KEY = SLIDER_BASE_KEY + "Silder";

            // スライダのボタン要素
            $("." + sliderBaseKeyOld).removeClass(sliderBaseKeyOld).addClass(sliderBaseKey);
            $("." + sliderHandleKeyOld).removeClass(sliderHandleKeyOld).addClass(sliderHandleKey);
            $("." + sliderBaseKeyOld + "Color").removeClass(sliderBaseKeyOld + "Color").addClass(sliderBaseKey + "Color");
            $("." + sliderBaseKeyOld + "Silder").removeClass(sliderBaseKeyOld + "Silder").addClass(sliderBaseKey + "Silder");

            // CSSから情報取得(倍率計算処理に使用するパラメータ)
            SLIDER_BASE_HEIGHT = parseInt($('#' + SLIDER_BASE_KEY).css('height'));
            SLIDER_BASE_WIDTH = parseInt($('#' + SLIDER_BASE_KEY).css('width'));
            SLIDER_HANDLE_HEIGHT = parseInt($('.' + SLIDER_HANDLE_KEY).css('height'));
            SLIDER_HANDLE_WIDTH = parseInt($('.' + SLIDER_HANDLE_KEY).css('width'));
            SIZE = SLIDER_BASE_HEIGHT - SLIDER_HANDLE_HEIGHT;

        }

        return {
            build: build,

            redraw: function () {
                // 未使用の可能性あり
                $('.' + SLIDER_LEVEL_KEY).hide();
                $('.' + SLIDER_BASE_KEY).hide();
            },

            show: function () {
                $('.' + SLIDER_BASE_KEY).show();
                $('.' + SLIDER_LEVEL_KEY).show();
            },

            hide: function () {
                $('.' + SLIDER_BASE_KEY).hide();
                $('.' + SLIDER_LEVEL_KEY).hide();
            },
            disable: function () {
                buttonStatus = Button.STATUS_DISABLED;
                $('.' + SLIDER_HANDLE_KEY).addClass('disable');
                $('.' + SLIDER_HANDLE_KEY).on({cancel: ['.' + SLIDER_HANDLE_KEY]});
                //$("#"+SLIDER_HANDLE_KEY).draggable("disable")
                //$(selector).draggable("disable")
            },
            undisable: function () {
                buttonStatus = Button.STATUS_OFF;
                $('.' + SLIDER_HANDLE_KEY).removeClass('disable');
                $('.' + SLIDER_HANDLE_KEY).on({cancel: ['']});
            },
            getValue: function () {

                return position;
            },
            getStatus: function () {
                return buttonStatus;
            },
            setPosition: redrawSlider,
            setValue: redrawSliderNowLevel,
            redrawSliderLevel: redrawSliderLevel,
            redrawSliderLevelColor: redrawSliderLevelColor,
            changeSliderStyle: changeSliderStyle,
            getSliderTouchStatus: function (){
                return draggingFlag;
            }
        };
    }

    function getStreamBtnObj(){
        return btnObject[Start];
    }

    function getStreamStartBtnObj(){
        return btnObject[StartStream];
    }

    function getStreamStartTxtObj(){
        return textObject[StartStreamTxt];
    }

    return {
        build: build,

        updateStatus: updateStatus,

        getSliderZoom: function () {
            return sliderZoom.getValue();
        },

        setSliderZoomPosition: function (val) {
            sliderZoom.setPosition(val,999);
        },

        getSliderSpeed: function () {
            return sliderSpeed.getValue();
        },

        setSliderSpeedPosition: function (val) {
            sliderSpeed.setPosition(val,100)
        },

        getFocus: function () {
            return sliderFocus;
        },

        getSliderFocus: function () {
            return sliderFocus.getValue();
        },

        setSliderFocusPosition: function (val) {
            sliderFocus.setPosition(val,99)
        },

        getSliderIris: function () {
            return sliderIris.getValue();
        },

        setSliderIrisPosition: function (val) {
            sliderIris.setPosition(val,254)
        },

        disableFocusSlider: function () {
            sliderFocus.disable();
        },
        undisableFocusSlider: function () {
            sliderFocus.undisable();
        },
        disableIrisSlider: function () {
            sliderIris.disable();
        },
        undisableIrisSlider: function () {
            sliderIris.undisable();
        },
        disableZoomSlider: function () {
            sliderZoom.disable();
        },
        undisableZoomSlider: function () {
            sliderZoom.undisable();
        },
        //zoomSpeedFocusCtrlButton: zoomSpeedFocusCtrlButton,
        soundSlider: soundSlider,
        SliderMove: SliderMove,
        SliderEnd: SliderEnd,
        sliderSpeed: sliderSpeed,
        stopIntervalSetSlider:stopIntervalSetSlider,
        getSliderValues:getSliderValues,
        startSetSliderValue:startSetSliderValue,
        focusAutoUndisable:focusAutoUndisable, //add by yangyang 20180911
        focusAutoDisable:focusAutoDisable,//add by yangyang 20180911
        irisAutoUndisable:irisAutoUndisable,//add by yangyang 20180911
        irisAutoDisable:irisAutoDisable,//add by yangyang 20180911
        getStreamBtnObj:getStreamBtnObj,
        getStreamStartBtnObj:getStreamStartBtnObj,
        getStreamStartTxtObj:getStreamStartTxtObj,
        setZoomValue:setZoomValue

    }
}
/*
* live底部初期化
*/
var LayerFunctionBottom = layerFunctionBottom();

function layerFunctionBottom() {

    var btnObject = [];
    var textObject = [];
    var SWIPER_CONTAINER = 0;
    var ADD_SLIDE = 1;
    var SWIPER_PAGINATION = 2;
    var SWIPER_SLIDE = 3;
    var SWIPER_SLIDE_TITLE = 4;
    var SWIPER_HOME_IMG = 5;
    var SELECT_ID;
    var inputListObject = [];
    var initStatesObject = [];
    var touchTime;
    var presentSelectIndex = 0;
    var isTouchPresent = false;
    var thumbnailIndex =0;
    var indexFlg = 1;
    var errRetyCount = [];

    function build() {
        //iPadUI
        // btnObject[SWIPER_CONTAINER] = divAppend("jqmBottom", "swiper1", "swiper-any wth-85 hig-100 right-3" );
        // btnObject[SWIPER_HOME_IMG] = ImgButtonCtrl("jqmBottom", "/css/mobile/parts/focus.png", "position-abs wth-9 hig-13 left-3 top-84", callbackHome);

        //iPhoneUI
        // btnObject[SWIPER_CONTAINER] = divAppend("jqmBottom", "swiper1", "swiper-any wth-89-5 hig-100 right-0-5" );
        // btnObject[SWIPER_HOME_IMG] = ImgButtonCtrl("jqmBottom", "/css/mobile/parts/preset_btn_home_normal.png", "position-abs wth-9 hig-12-5 left-0-5 top-84", callbackHome);
        // btnObject[ADD_SLIDE] = divAppend("swiper1", "addSlide", "swiper-wrapper top-2");
        // btnObject[SWIPER_PAGINATION] = divAppend("swiper1", "", "swiper-pagination top-15");

        //PcUI
        textObject[SWIPER_CONTAINER] = divAppend("jqmBottom", "swiper1", "swiper-containe swiper-any wth-89-5 hig-18 right-0-5" );
        btnObject[SWIPER_HOME_IMG] = ButtonCtrl("jqmBottom", "home",NPTZ_WORDING.wID_0415, callbackHome);
        btnObject[SWIPER_HOME_IMG].show();
        btnObject[SWIPER_HOME_IMG].displayOff();
        textObject[ADD_SLIDE] = divAppend("swiper1", "addSlide", "swiper-wrapper top-10", "height: 555%;");
        textObject[SWIPER_PAGINATION] = divAppend("swiper1", "", "swiper-pagination", "top:80%");

        initSwiper();
        //incloudJs("/js/mobile/swiper.init.js");

        var gGetPresetImg = null;

        var swiper1 = new Swiper('#swiper1', {
            pagination: {
                el: '.swiper-pagination',
            },
            slidesPerView: 9,
            slidesPerGroup: 9,
            preventClicksPropagation: true,
            watchSlidesProgress: true,
            on: {
                slideChangeTransitionStart: function(){
                    clearInterval(gGetPresetImg);
                    gGetPresetImg = null;
                },
                slideChangeTransitionEnd: function() {
                    var index = this.activeIndex;
                    updateSwiperindex(index);
                    if (index > 99)return;
                    if (index < 99) {
                        if (!initStatesObject[index].states) { //現在のピクチャのコンテナが構築を完了したかどうかを判断します。
                            for (var i = index; i < 9 + index; i++) {
                                buildSwiperDiv(i); //画像配置用のコンテナを構築する
                            }
                        }

                        if (gGetPresetImg == null) { //コンテナーが既に構築されているかどうかに関係なく、画像情報を更新します。
                            gGetPresetImg = setInterval(function () {
                                if (gIndex == 9) {
                                    clearInterval(gGetPresetImg);
                                    gGetPresetImg = null;
                                    gIndex = 0;
                                    return;
                                }
                                updateSwiperImage(index);
                                gIndex++;
                                index++;
                            }, 500);
                        }
                    } else { //最終ページの画像を更新する
                        if (!initStatesObject[99].states) {
                            buildSwiperDiv(99);
                        }

                        updateSwiperImage(99);
                    }
                    // getThumbnailStatus();
                },
                touchStart: function(event){
                    isTouchPresent = true;
                    touchTime = new Date;
                },
                touchMove: function(event){
                    isTouchPresent=false;
                },
                touchEnd: function(event){
                    if(!isTouchPresent)return;
                    var duration = +new Date - touchTime;
                    if(Number(duration) < 500){
                        cparam_set_recallPresetMemory(presentSelectIndex);
                    }

                    isTouchPresent = false;
                }
            },
        });

        $("div[id^='swiperSlide']").on({
            touchstart: function (e) {
                var id = this.id.split("_")[1];
                SELECT_ID = id;
                for (var n = 0; n < 100; n++) {
                    if (n == id) {
                        $("#t_" + id).addClass("set-contrast-img-fff");
                    } else {
                        $("#t_" + n).removeClass("set-contrast-img-fff");
                    }
                }
            }
        });

        ///Swiper Title押下処理
        $("div[id^='t_']").on({
            touchstart: function (event) {
                // if(event.target.childNodes.length>=2){
                //     return;
                // }

                var id =  event.currentTarget.id;
                var presetName = event.currentTarget.innerText;

                //lock状態が動作しない
                if(($("#lock").hasClass("on")) || ($(".power").text() == NPTZ_WORDING.wID_0166)){
                    return;
                }
                
                if((id != null) && (id != ""))
                {
                    var index = id.split("t_")[1];
                    var toolTipdiv=$('<div></div>');
                    toolTipdiv.attr("id",  "toolTip_" + index);
                    toolTipdiv.attr("name", "toolTip_" + index);
                    presetName = presetName.substring(((parseInt(index)+1)).toString().length + 1);
                    toolTipdiv.html(presetName);
                    toolTipdiv.attr("class", "toolTip back-color-555 color-fff");
                    toolTipdiv.attr("style", "overflow:visible");
                    toolTipdiv.attr("zIndex", "5");
                    // toolTipdiv.appendTo($("#swiperSlide_" + index));
                    toolTipdiv.appendTo($("#jqmMain"));
                }
            },
            touchend: function(event){
                var id =  event.currentTarget.id;
                var index = id.split("t_")[1];
                // $('#swiperSlide_' + index + '>div[name="toolTip_' + index + '"]').remove();
                $('#jqmMain>div[name="toolTip_' + index + '"]').remove();
            }
        });

        //Swiper pageIndex初期化処理
        initPageIndexPara();
        //initThumbnailStatus取得


        if(gPower == 1){
            initThumbnailStatus = cparam_get_presetNameThumbnailCounter(thumbnailIndex).split(":");
            setTimeout(function(){
                gThumbnailId = setInterval(getThumbnailStatus,5000);
            },850);
        }

    }
    var isGetPresetImaging = false;

    function getThumbnailStatus() {
        // var url = window.location.href.indexOf("admin");
        if ($("#jqmBottom").css("display") != "none" ) {
            if(isGetPresetImaging) {
                return;
            }
            const data = cparam_get_pad_presetNameThumbnailCounter(thumbnailIndex);

            //var retBuf = cparam_get_presetNameThumbnailCounter(thumbnailIndex).split(":");
            $.when(_cparam_awCmd_deferreds_sendRequset('QSJ:3C:' + data, 'OSJ:3C:')).done(function(retBuf){
                retBuf = retBuf.split(":");
                if (parseInt(retBuf[0],16) == thumbnailIndex) {
                    if(retBuf[1] != initThumbnailStatus[1]) {
                        initGetPresetImagePara();
                    } else {
                        return;
                    }
                    var currentValue = retBuf[1].split("");
                    var initValue = initThumbnailStatus[1].split("");

                    for (var i = 0; i < currentValue.length; i++) {
                        if (currentValue[i] == initValue[i]) {
                            var pageIndex = parseInt(-(i - 8));
                            sucessStateIndex[pageIndex] = pageIndex;
                        }
                    }
                    if(getImageId == null){
                        getImageId = setInterval(function () {
                            if(sucessStateIndex[gIndex] == gIndex) {
                                gIndex++;
                                return;
                            } else {
                                getPresetImage();
                            }
                        },400);
                    }
                    initThumbnailStatus = retBuf;
                }
            });
        }
    }

    /**
     * Swiper pageIndex初期化処理
     */
    function initPageIndexPara() {
        //Swiper pageIndex初期化処理
        indexFlg = 1;
        thumbnailIndex = 0;
    }

    /**
     * Swiper pageIndex更新
     */
    function updateSwiperindex(index) {
        //Swiper pageIndex更新
        thumbnailIndex = parseInt(index/9);
        indexFlg = thumbnailIndex + 1
    }

    var isGetPresetImaging = false;
    var sucessStateIndex =[];

    function initGetPresetImagePara() {
        gIndex = 0;
        for(var i = 0; i < 9; i++) {
            retryCount[i] = 0;
        }
        isGetPresetImaging = false;
        sucessStateIndex = [];
        if(gCheckPresetImageTimerID) {
            clearInterval(gCheckPresetImageTimerID);
            gCheckPresetImageTimerID = null;
        }
        if(getImageId) {
            clearInterval(getImageId);
            getImageId = null;
        }
    }

    function getPresetImage() {
        if (gIndex >= 9) {
            clearInterval(getImageId);
            getImageId = null;
            gIndex = 0;
            if (gCheckPresetImageTimerID != null) {
                clearInterval(gCheckPresetImageTimerID);
            }
            gCheckPresetImageTimerID = setInterval(intervalCheckPresetImage, 500);
            return;
        }
        isGetPresetImaging = true;
        bindLoadEvent();
        var num = (indexFlg - 1) * 9 + gIndex;

        if(num<=99){
            // get preset thumbnail
            try {
                $("#swiperSlideImg_" + num)[0].src = "/cgi-bin/get_preset_thumbnail?preset_number=" + (num + 1) + "?t=" + Math.random();
            } catch(e){
            };
        }
        ++gIndex;
    }

    function bindLoadEvent() {
        for(var i = 0; i < 9; i++) {
            $("#swiperSlideImg_" + i).bind("load", function () {
                var isEqualVale = false;
                var thumbIndex  = Number(this.id.substr(this.id.length - 1, 1));
                for (var i = 0; i < 9; i++) {
                    if (sucessStateIndex[thumbIndex] == thumbIndex) {
                        isEqualVale = true;
                        break;
                    }
                }
                if (!isEqualVale) {
                    sucessStateIndex[thumbIndex] = thumbIndex;
                }
            });
        }
    }

    function intervalCheckPresetImage() {
        var isFinishFlag = true;
        for(var i = 0; i < 9; i++) {
            if (sucessStateIndex[i] != i) {
                isFinishFlag = false;
                var num = (indexFlg - 1) * 9 + i;
                if(num <= 99){
                    $("#swiperSlideImg_" + num)[0].src = "/cgi-bin/get_preset_thumbnail?preset_number=" + (num + 1) + "?t=" + Math.random();
                }
                errorProcess(i);
                break;
            }
        }
        if(isFinishFlag) {
            isGetPresetImaging = false;
            if(gCheckPresetImageTimerID != null) {
                clearInterval(gCheckPresetImageTimerID);
                gCheckPresetImageTimerID = null;
            }
        }
    }

    var retryCount = [];
    function errorProcess(thumbIndex) {
        if(retryCount[thumbIndex] < 4) {
            retryCount[thumbIndex] = retryCount[thumbIndex] + 1;
        } else {
            retryCount[thumbIndex] = 0;
            sucessStateIndex[thumbIndex] = thumbIndex;
            $("#swiperSlideImg_" + thumbIndex).attr('src', '/css/mobile/parts/btn_cameraController_preset_normal.png');
        }
    }

    function buildSwiperDiv(index){

        var fontSize = 6 * (Size.WIDTH / 340) + "px";
        var value = cparam_get_presetNameSettingIndividual(index);
        value = value == "" ? "P" + (index + 1) : value;

        //$("#t_" + index).append($('<span class="swiperSlideTitle" style="position: relative;top: -2px; margin-left: 25%; font-size:'+ fontSize + ';">' + value + '</span>')); //modify by yangyang 20180911
        $("#presetNum_"+index).html($("#presetNum_"+index).text()+"   "+value);
        inputListObject[index] = ImgButtonCtrl("swiperSlide_" + index, '', "wth-95 hig-7-5", callbackSelect, "swiperSlideImg_" + index, value, index);
        //$("#" + "swiperSlideImg_" + index).attr('src', "/cgi-bin/get_preset_thumbnail?preset_number=" + (index + 1));

        initStatesObject[index].states = true;
    }

    function  updateSwiperImage(index) {
        //$("#" + "swiperSlideImg_" + index).attr('src', "/cgi-bin/get_preset_thumbnail?preset_number=" + (index + 1));
        errRetyCount[index] = 0;
        try{
			//ue150 #4848
            $("#" + "swiperSlideImg_" + index).on('error',function(){
                if(errRetyCount[index] < 5)
                {
                    updateSwiperImage(index);
                }else{
                    errRetyCount[index] = 0;
                    $("#" + "swiperSlideImg_" + index).attr('src', '/css/mobile/parts/btn_cameraController_preset_normal.png');
                }
            })
            $("#" + "swiperSlideImg_" + index).attr('src', "/cgi-bin/get_preset_thumbnail?preset_number=" + (index + 1)) +"?t="+Math.random();
        }catch(e){
            //Image取得エラーの場合、Retry　5回で追
            errRetyCount[index]++;
        };
    }

    var gGetStartPresetImg = null;
    var gStartIndex = 0;

    function initSwiper() {
        // if($(".swiper-wrapper").hasClass("disable")){
        //     return;
        // }

        var fontSize = 6 * (Size.WIDTH / 340) + "px";

        if(gPower == 1){
            presetIdListAll = getPresetIdStatus();
        }
        for (var i = 0; i < 100; i++) {
            textObject[SWIPER_SLIDE] = divAppend("addSlide", "swiperSlide_" + i, "swiper-slide");
            textObject[SWIPER_SLIDE_TITLE] = divAppend("swiperSlide_" + i, "t_" + i, "wth-95 hig-5 back-color-555 color-fff opacity-0-9 text-cl","text-overflow:ellipsis; white-space:nowrap; overflow:hidden; font-size:xx-small; ");
            var id = "presetNum_"+i;
            if(gPower == 1){
                if(presetIdListAll[100-(i+1)] == 1) {
                    textObject[SWIPER_SLIDE_TITLE].append($('<span id = '+ id + ' style=" top:0px; left:0px; font-size:'+ fontSize + ';color:rgb(74, 241, 8)">' + (i + 1) + '</span>'));
                } else {
                    textObject[SWIPER_SLIDE_TITLE].append($('<span id = '+ id + ' style=" top:0px; left:0px; font-size:'+ fontSize + '; color:#A4A4A4">' + (i + 1) + '</span>'));
                }
            } else {
                textObject[SWIPER_SLIDE_TITLE].append($('<span id = '+ id + ' style="top:0px; left:0px;font-size:'+ fontSize + '; color:#A4A4A4">' + (i + 1) + '</span>'));

            }
            initStatesObject[i] = {index:i,states:false};
        }

        if(parseInt(fontSize) < 7){
            $(".text-cl").css(
                "line-height", "0.8"
            )
        }

        //空の div を使用して行を占有する
        for(var m = 100; m < 108;m++){
            textObject[SWIPER_SLIDE] = divAppend("addSlide", "swiperSlide_" + m, "swiper-slide");
        }

        //ホームページのピクチャコンテナを構成する
        if(gPower == 1) {
            for (var j = 0; j < 9; j++) {
                buildSwiperDiv(j);
            }
        }

        if (gGetStartPresetImg == null) {
            setTimeout(function() {
                gGetStartPresetImg = setInterval(function () {
                    if (gStartIndex == 9) {
                        clearInterval(gGetStartPresetImg);
                        gGetStartPresetImg = null;
                        gStartIndex = 0;
                        return;
                    }
                    updateSwiperImage(gStartIndex);
                    gStartIndex++;
                }, 500);
            },5000);
        }

    }

    function incloudJs(src) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = src;
        oHead.appendChild(oScript);
    }

    function callbackHome(e) {
        if($(".home").hasClass("disable")){
            return;
        }else{
            if (e == Button.TOUCHSTART) {
                btnObject[SWIPER_HOME_IMG].displayOn();
                cparam_set_absolutePositionControl2(8000, 8000);
            } else  if(e == Button.TOUCHEND){
                btnObject[SWIPER_HOME_IMG].displayOff();
            }
        }
    }

    /**
     * Presetタイマーインターバル
     */
    //var time = 0;

    function callbackSelect(e, index) {
        presentSelectIndex = index;
        // if (e == Button.TOUCHSTART) {
        //     time = setTimeout(function () {
        //         cparam_set_recallPresetMemory(index);
        //     }, 500);
        // } else if (e == Button.TOUCHEND) {
        //     clearTimeout(time);
        // }
    }

    return {
        build: build,
        selectId: function () {
            return SELECT_ID;
        }
    }
}