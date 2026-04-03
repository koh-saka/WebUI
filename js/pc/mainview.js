var dateobj = new Date();
// ここで1日に初期化しておく。
// PCの日付が 5/31 でカメラの日付が31日がない月だった場合、
// setMonth() → setDate()の順で設定してしまうと、setMonth()が意図した挙動にならないため。
dateobj.setDate(1);
cparam_updateHttpInfo();

var menubarCtrl = window.parent.menubarCtrl;
var menubarStream = window.parent.menubarStream;
var _StreamInfo = menubarCtrl.menubar_GetStreamInfo();

//var _basic_info = cparam_getBasicInfo();
var _aenc = _StreamInfo.aEnc;
var _ai = parseInt(_StreamInfo.aInterval, 10);
var _ai711 = 0;
var _audio_mode = _StreamInfo.aEnable;
var _br = _StreamInfo.aBitrate;					//audio bitrate (kbps)
var _event_port = _StreamInfo.ePort;
var mainViewOperationFlag = false;
var _hmuc = "239.192.0.3";
var _h2muc = "239.192.0.4";
var _h3muc = "239.192.0.5";
var _h4muc = "239.192.0.6";

var _h_r_mode = parseInt(_StreamInfo.sRtspMode_h264);				// rtspかどうか
var _h_r_mode2 = parseInt(_StreamInfo.sRtspMode_h264_2);
var _h_r_mode3 = parseInt(_StreamInfo.sRtspMode_h264_3);
var _h_r_mode4 = parseInt(_StreamInfo.sRtspMode_h264_4);
var _hcpm = 32004;				// multicast送信時のポート番号
var _hcpm2 = 32004;
var _hcpm3 = 32004;
var _hcpm4 = 32004;
var _hctm = "0";				// multicast-TTL
var _hctm2 = "0";
var _hctm3 = "0";
var _hctm4 = "0";
var _hfp = "0";				// delivery mode? (0/2/3)
var _hfp2 = "0";
var _hfp3 = "0";
var _hfp4 = "0";
var _hp = cparams.http_port;
var _https = cparams.https;
var _https_port = cparams.https_port;
var _hum = "uni";	// uni or multi
var _hum2 = "uni";	// uni or multi
var _hum3 = "uni";
var _hum4 = "uni";
var _ji = 30;				// jpeg interval(fps)
var _muc = "0";				// mpeg4 address
var _mcpm = 0;				// mpeg4 multicast port
var _mctm = "0";			// mpeg4 multicast TTL
var _mum = "0";				// mpeg4 delivery mode (uni/manual/uni_manual)
var _plugin_disp = _basic_info.plugin_disp;
var _plugin_dl = _basic_info.plugin_download;
var _rtsp_port = cparams.rtsp_port;			// RTSP port
var _ucthap = "0";			// audio port
var _ucthap2 = "0";
var _ucthap3 = "0";
var _ucthap4 = "0";
var _ucthvp = "0";
var _ucthvp2 = "0";
var _ucthvp3 = "0";
var _ucthvp4 = "0";
var _uctmvp = "0";
var _uid = _StreamInfo.UID;
var _vcodec = _StreamInfo.ImageFormat;

//initialize h264's setting data
/*------------------------------------------------------*/
var h264Settingdata = menubarCtrl.menubar_getH264SettingData();
_hmuc = h264Settingdata.hmuc;
_h2muc = h264Settingdata.hmuc2;
_h3muc = h264Settingdata.hmuc3;
_h4muc = h264Settingdata.hmuc4;
_hcpm = parseInt(h264Settingdata.hcpm);
_hcpm2 = parseInt(h264Settingdata.hcpm2);
_hcpm3 = parseInt(h264Settingdata.hcpm3);
_hcpm4 = parseInt(h264Settingdata.hcpm4);
_hctm = h264Settingdata.hctm;
_hctm2 = h264Settingdata.hctm2;
_hctm3 = h264Settingdata.hctm3;
_hctm4 = h264Settingdata.hctm4;
_hfp = h264Settingdata.hfp;
_hfp2 = h264Settingdata.hfp2;
_hfp3 = h264Settingdata.hfp3;
_hfp4 = h264Settingdata.hfp4;
_hum = h264Settingdata.hum;
_hum2 = h264Settingdata.hum2;
_hum3 = h264Settingdata.hum3;
_hum4 = h264Settingdata.hum4;
_ucthap = h264Settingdata.ucthap;
_ucthap2 = h264Settingdata.ucthap2;
_ucthap3 = h264Settingdata.ucthap3;
_ucthap4 = h264Settingdata.ucthap4;
_ucthvp = h264Settingdata.ucthvp;
_ucthvp2 = h264Settingdata.ucthvp2;
_ucthvp3 = h264Settingdata.ucthvp3;
_ucthvp4 = h264Settingdata.ucthvp4;
/*------------------------------------------------------------*/

/// safariの場合、menubarからgetuidを発行せずmainviewを呼出している
/// その場合、%uid%が読込まれず、javascriptエラーになってしまうので
/// 一度文字列で取得し、取得できたら数値に変換し変数に格納する手順をとる
var gsUid = _uid;
var giUid;
if (gsUid == "") {
}
else {
    giUid = parseInt(gsUid, 10);
}

var gsCodec = _vcodec;
var gbAudioActX = true;
var gbErr35 = false;
var mbReload = false;
var gbErr36 = false;
var gbErrAlarm = false;
var iAudioEnv = _audio_mode;
var giAudioState = 0;
var gbEventActX = true;
var EvPort = _event_port;
var image_DelayTimer;
var gPlugDl = _plugin_dl;
var iWidth;
var iHeight;
var giRtsp = [_h_r_mode, _h_r_mode2, _h_r_mode3, _h_r_mode4];
var gsDelivery = [_hum, _hum2, _hum3, _hum4];
var gsMultiAdd = [_hmuc, _h2muc, _h3muc, _h4muc];
var giMultiPort = [_hcpm, _hcpm2, _hcpm3, _hcpm4];
var gsUniPort = [_ucthvp, _ucthvp2, _ucthvp3, _ucthvp4];
var giMultiTTL = [_hctm, _hctm2, _hctm3, _hctm4];
var gsUniAudioPort = [_ucthap, _ucthap2, _ucthap3, _ucthap4];
var giTrans = 0;
var iEncode = _aenc;
var giStMode = 1;  // %stream_mode% = 1 ( Fixed )
var gsHttpTBL = ["http://", "https://"];
var gihttps = _https;
var gsStNo = "&stream=1";
var giSendTimeCheckTally;
var giRecvTimeCheckTally;
var AWCAM_DELAY_START_LIVE = 5000;
var gsHttpPort = _hp;
var gsHttpsPort = _https_port;
var iStream = menubarCtrl.menubar_GetStreamMode();
var iQuality = menubarCtrl.menubar_GetQuality();
var gViewImage_dbd = 1;
var gChangeMenuFlg = 0;	// 1:MenuBarからの引継ぎ有り、0:MenuBarからの引継ぎ無し
// MenuBarから引き継ぐ値
var gsJpegBaseQual;
var giMulti;
var giTrans2;
var giTrans3;
var giTrans4;
var gsBitrateMax = menubarCtrl.menubar_GetBitrateMax();
var giBitrateMax = parseInt(gsBitrateMax, 10);
var gsDeliMode = [_hfp, _hfp2, _hfp3, _hfp4];
var IETimer = null;
var prevFullScreenStateIE = null;
var nowFullScreenStateIE = null;
if ((gsCodec == "jpeg") || (gsCodec == "jpeg_2") || (gsCodec == "jpeg_3")) {
    giTrans = 0;
}
else {
    switch (giRtsp[iStream - 1]) {
        case 0:
            giTrans = 0;				// http://[i]/cgi-bin/h264
            break;
        case 1:
        case 2:
            if (gsDelivery[iStream - 1] == "multi") {
                giTrans = 2;		// rtsp://[ip]/MediaInput/h264/stream_x
            }
            else {
                giTrans = 4;		// http://[ip]/MediaInput/h264/stream_x
            }
            break;
        default:
            giTrans = 0;
            break;
    }
}
var gsStNo = "&stream=" + iStream;
var gsNum = "";
if (iStream != 1) {
    gsNum = "_" + iStream;
}

var myDOM = {};
myDOM.ajax = {};
var gTallyTimerID;
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
 * Check ie install ActiveX or not
 * @constructor
 */
function CheckInstallActiveX() {
    // ActiveXがインストールされている(使用できる)かどうかをチェックするだけ
    document.WebVideo.SetMenuItem(1, "Dummy");
}


/**
 * Judge whether ie need to install ActiveX then install it
 * @constructor
 */
function OnloadInitThisPage() {
    //20200923//20200923
    if(window.parent.adminPage)return;
    if (IsIE()) {
        try {
            CheckInstallActiveX();
            window.parent.activexInitialization = true;
        } catch (e) {
            window.parent.activexInitialization = false;
            window.parent.cameraControllerSetting.updateStatus(0);
            // window.parent.menubarCtrl.menubarBtnDisabled();
            window.parent.menubarCtrl.changeWidows();

        }
    }
    InitThisPage();
    if(isMobile){
        var lastTouchEnd = 0;
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
        document.addEventListener('touchend', function(event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        document.addEventListener('gesturestart', function(event) {
            event.preventDefault();
        });
    }
    startCheckTally();
}

function changeImageResolution(reso) {
    if (reso != 0 && reso != 1) return;
    resolution = reso;
    if (power == 1) {
        _live.setResolution(resolution);
    }
    else {
        _live.setResolution(0);
    }
}

function IsPc() {
    var userAgent = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
    var flag = true;
    for(var i = 0;i < Agents.length;i++) {
        if(userAgent.indexOf(Agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

var voip = objVOIP;
var _hmuc1 = voip.h264_multicast_addr_ch1;
var _hmuc2 = voip.h264_multicast_addr_ch2;
var _hmuc3 = voip.h264_multicast_addr_ch3;
var _hmuc4 = voip.h264_multicast_addr_ch4;
var _hum1  = voip.h264_unimulti_ch1;
var _hum2  = voip.h264_unimulti_ch2;
var _hum3  = voip.h264_unimulti_ch3;
var _hum4  = voip.h264_unimulti_ch4;
var _h_r_mode1 = voip.h264_rtsp_mode_ch1;
var _h_r_mode2 = voip.h264_rtsp_mode_ch2;
var _h_r_mode3 = voip.h264_rtsp_mode_ch3;
var _h_r_mode4 = voip.h264_rtsp_mode_ch4;
var _hcpm1 = voip.h264_multicast_port_ch1;
var _hcpm2 = voip.h264_multicast_port_ch2;
var _hcpm3 = voip.h264_multicast_port_ch3;
var _hcpm4 = voip.h264_multicast_port_ch4;
var _hr1  = voip.h264_resolution_ch1;
var _hr2 = voip.h264_resolution_ch2;
var _hr3 = voip.h264_resolution_ch3;
var _hr4 = voip.h264_resolution_ch4;
var _ht1 = voip.h264_transmit_ch1;
var _ht2 = voip.h264_transmit_ch2;
var _ht3 = voip.h264_transmit_ch3;
var _ht4 = voip.h264_transmit_ch4;
var _hi1 = voip.h264_framerate_ch1;
var _hi2 = voip.h264_framerate_ch2;
var _hi3 = voip.h264_framerate_ch3;
var _hi4 = voip.h264_framerate_ch4;

var _jt1 = voip.jpeg_transmit1;
var _jt2 = voip.jpeg_transmit2;
var _jt3 = voip.jpeg_transmit3;
var _jr1 = voip.resol_stream1;			// jpeg resolution;
var _jr2 = voip.resol_stream2;			// jpeg resolution;
var _jr3 = voip.resol_stream3;			// jpeg resolution;
var _ji1 = voip.jpeg_interval1;
var _ji2 = voip.jpeg_interval2;
var _ji3 = voip.jpeg_interval3;
var _jq1 = voip.jpeg_quality_ch1;
var _jq2 = voip.jpeg_quality_ch2;
var _jq3 = voip.jpeg_quality_ch3;
cparams_get_glc();
cparam_updateAudio();
var br = cparams.new_bit;
var ai = 80;
var glc = cparams.glc;
var _audio_mode = cparams.audio_transmit==1 ? "in":"off";
/**
 * init mainview.html
 * @constructor
 */
function InitThisPage() {
    var iResol = 0;
    gsStNo = menubarCtrl.menubar_GetStreamNo();
    var retValue = sysStreamMode;
    var currentWindowWidth = window.parent.currentWindowWidth;
    var currentZoomValue = window.parent.currentZoomValue;
    var changeFlg = menubarCtrl.streamControler.isStreamBtnChangeFun();
    if(getLiveModeStatus() == 0){
        liveModeFlg = true;
    }else{
        liveModeFlg = false;
    }

    if(changeFlg ){
        if(window.parent.document.getElementById("preset_list_area").style.display == "none" || window.parent.document.getElementById("preset_list_area").style.display == ""){
            document.getElementsByTagName("body")[0].style.transform = "scale(" + 0.001 + ")";
        }

    }
    if (IsIE()) {
        document.all.MainUid.value = giUid;

        if (giTrans < 2) {
            try {
                SetVideoProperty();
            } catch (e) {
                this.location.href = "/live/install.html";
                cameraControllerSetting.updateStatus(0);
                menubarCtrl.menubarBtnDisabled();
            }

            try {
                switch (iAudioEnv) {
                    case "in":
                        SetAudioProperty();
                        if (sysStreamMode != 'rtmp') {
                            document.WebAudio.StartLive();
                            giAudioState = 1;
                        }
                        break;
                    default:
                        break;
                }
            }
            catch (e) {
                gbAudioActX = false;
            }
        } else {
            try {

                SetVideoPro_Rtsp();
                switch (iAudioEnv) {
                    case "in":
                        SetAudioPro_Rtsp();
                        break;
                    default:
                        break;
                }
                setTimeout("document.WebVideo.StartLive();", window.parent.AWCAM_DELAY_START_LIVE);
                window.parent.AWCAM_DELAY_START_LIVE = 10;
            } catch (e) {
                this.location.href = "/live/pc/install.html";
            }
        }
        setTimeout(function(){
            if(IsIE()){
                document.WebVideo.ViewWidth = currentWindowWidth*currentZoomValue;
                document.WebVideo.ViewHeight = (currentWindowWidth/16*9)*currentZoomValue;
            }
        },200);
    } else {
        iResol = menubarCtrl.menubar_GetResolution();
        if(checkUserAgent() == "Chrome" || checkUserAgent() == "Safari" || checkUserAgent() == "Edge"){
            switch(iResol)
            {
                case 160:
                    sResol = "160x90";
                    break;
                case 320:
                    sResol = "320x180";
                    break;
                case 640:
                    sResol = "640x360";
                    break;
                case 1280:
                    sResol = "1280x720";
                    break;
                case 1920:
                    sResol = "1920x1080";
                    break;
                case 3840:
                    sResol = "3840x2160";
                    break;
                default:
                    break;
            }
            if(iResol>=1920){
                iResol = 1450;
            }

            var fps = menubarCtrl.menubar_GetFramerate();
            var iJpegInter = menubarCtrl.menubar_GetFramerate();
            if(!IsPc()) {
                var iResolution = 320;
            }else{
                var iResolution = menubarCtrl.menubar_GetResolution();
            }
            // var iResolution = menubarCtrl.menubar_GetResolution();
            var url = gsHttpTBL[gihttps] + location.host + "/cgi-bin/jpeg?connect=start&framerate=" + iJpegInter + "&resolution=" + iResolution + "&quality=" + iQuality + "&UID=" + giUid;
            // console.log("uid"+giUid);
            setInterval(function(){
                var url = gsHttpTBL[gihttps] + location.host + "/cgi-bin/keep_alive?mode=jpeg&protocol=http&UID=" + giUid;
                $.get(url).fail(function(e){
                    // console.log('心跳停了',e)
                    stopPlaying();
                });
            },30000);
            setTimeout(function(){
                // document.getElementById( "WebVideo" ).innerHTML = '<img src="/cgi-bin/mjpeg?resolution=' + sResol + '&framerate=' + fps + '&quality=' + iQuality +'" border="0" ' +
                //     'width="' + iResol + '" height="' + iResol/16*9 + '" />';
                document.getElementById( "WebVideo" ).innerHTML = '<img src="'+ url +'" border="0" ' +
                    'width="100%" height="100%" onload="isPlaying()" onerror="stopPlaying(this)"/>';

            },window.parent.AWCAM_DELAY_START_LIVE);
            window.parent.AWCAM_DELAY_START_LIVE = 10;

            $("#WebVideo").on("mousedown", function (e) {
                if (isTouchAF_CenterClickDisable() == true || !liveModeFlg) {
                    return;
                }
                e = e || window.event;
                var x, y;

                if (window.parent.gBTN_TOUCH_F_status == 1) {
                    x = e.offsetX / parseInt($("#WebVideo").css('width'));
                    y = e.offsetY / parseInt($("#WebVideo").css('Height'));
                    if (window.parent.gBTN_FOCUS_GUIDE_status == 1) {
                        if (x < 0.17) x = 0.17;
                        if (x > 0.83) x = 0.83;
                        if (y < 0.1) y = 0.1;
                        if (y > 0.9) y = 0.9;
                    }
                    cparam_set_toutchAF(x * 100, y * 100);
                    // cparam_set_focus_guid_position(x * 100, y * 100);
                } 
                if (window.parent.gBTN_FOCUS_GUIDE_status == 1) {
                    x = e.offsetX / parseInt($("#WebVideo").css('width'));
                    y = e.offsetY / parseInt($("#WebVideo").css('Height'));
                    if (x < 0.17) x = 0.17;
                    if (x > 0.83) x = 0.83;
                    if (y < 0.1) y = 0.1;
                    if (y > 0.9) y = 0.9;
                    cparam_set_focus_guid_position(x * 100, y * 100);
                }
                if (window.parent.gBTN_TOUCH_F_status != 1 && window.parent.gBTN_FOCUS_GUIDE_status != 1) {
                    var width = parseInt($("#WebVideo").width()) / iResol;
                    x = e.offsetX / width;
                    y = e.offsetY / width;
                    //y = parseInt($("#WebVideo").css('Height'));
                    send_Cgi_center_click(x, y, iResolution);
                }
            });

        }else{

        }
    }
    if(currentWindowWidth>=1920){
        currentWindowWidth = 1450;
    }
    $('body').css('width',currentWindowWidth+'px');
    window.parent.document.getElementById("tracking_controller").style.width = currentWindowWidth/currentZoomValue+"px";
    setInterval(function(){

        if(!liveModeFlg){
            cparams_get_glc();
        }
        var power = window.parent.gPower;
        var voip = window.parent.objVOIP;
        var _audio_mode = window.parent.cparams.audio_transmit==1 ? "in":"off";
        var _ai = 80;
        var _br = cparams.new_bit;
        var _rtsp_port = cparams.rtsp_port;
        var _glc = cparams.glc;
        CheckSetting(voip,_rtsp_port,_audio_mode,_br,_ai,power,_glc );

    },30000);
    if(window.parent.document.getElementById("preset_list_area").style.display == "none" || window.parent.document.getElementById("preset_list_area").style.display == ""){
        setTimeout(function(){
            if(!window.parent.isLoad){
                window.parent.windowsIsResize();
            }
            window.parent.isLoad = false;
        },500);
    }else{
        //window.parent.displayBaseHeaderTab.mainViewRequestFullScreen();
    }


}
function isPlaying(){
    window.parent.canPlayImage = true;
}
function stopPlaying(){
    window.parent.canPlayImage = false;
}
function checkUserAgent(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    //判断是否Opera浏览器
    if (isOpera) {
        return "Opera"
    };
    //判断是否Firefox浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    //判断是否chorme浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    //判断是否Safari浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    //判断是否IE浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    //判断是否Edge浏览器
    if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
    }
}
function getResolution(iResol){
    var cssLiveClass ;

    switch (iResol) {
        case 160:
            break;
        case 320:
            cssLiveClass = "CssLiveViewBox_VGA_320";
            break;
        case 640:
            cssLiveClass = "CssLiveViewBox_VGA_640";
            break;
        case 1280:
            cssLiveClass = "CssLiveViewBox_VGA_1280";
            break;
        case 1920:
            cssLiveClass = "CssLiveViewBox_VGA_1920";
            break;
        case 3840:
            cssLiveClass = "CssLiveViewBox_VGA_1920";
            break;
        default:
            cssLiveClass = "CssLiveViewBox_VGA_1280";
            break;
    }
    return cssLiveClass;
}

function CheckSetting( objVoip, iRtspPort, iAudio, iAudioRate, iAudioInter, iPower, iGLC ) {
    var iStream = menubarCtrl.menubar_GetStreamMode();
    var codec = menubarCtrl.menubar_GetCodecMode();
    if (( iAudio != _audio_mode)
        || ( iAudioRate != br)
        || ( iAudioInter != ai)
        || ( iPower != power )
        || ( iGLC != glc )
    ) {
        try {
            mainview_StopLive();
        } catch (e) {
            // DO NOTHING
        }
        setTimeout("reloadLivePage();", 3000);
    }

    if (codec == "h264") {
        var ht, hum, hr, hmuc, hcpm, h_r_mode, hi;
        var iH264, sHDelivery, iH264Resol, sH264Addr, iH264Port, iHRMode;

        ht = eval("_ht" + iStream);
        hum = eval("_hum" + iStream);
        hr = eval("_hr" + iStream);
        hmuc = eval("_hmuc" + iStream);
        hcpm = eval("_hcpm" + iStream);
        h_r_mode = eval("_h_r_mode" + iStream);
        hi = eval("_hi" + iStream);

        iH264 = eval("objVoip.h264_transmit_ch" + iStream);
        sHDelivery = eval("objVoip.h264_unimulti_ch" + iStream);
        iH264Resol = eval("objVoip.h264_resolution_ch" + iStream);
        sH264Addr = eval("objVoip.h264_multicast_addr_ch" + iStream);
        iH264Port = eval("objVoip.h264_multicast_port_ch" + iStream);
        iHRMode = eval("objVoip.h264_rtsp_mode_ch" + iStream);
        iHFps = eval("objVoip.h264_framerate_ch" + iStream);

        if (( iH264 != ht )
            || ( sHDelivery != hum )
            || ( iH264Resol != hr )
            || ( sH264Addr != hmuc )
            || ( iH264Port != hcpm )
            || ( iHFps != hi )
            || ( iRtspPort != _rtsp_port )
            || ( iHRMode != h_r_mode )
        ) {
            try {
                mainview_StopLive();
            } catch (e) {
                // DO NOTHING
            }
            setTimeout("reloadLivePage();", 3000);
        } else {
            // DO NOTHING
        }
    }
    else {
        // jpeg
        var jt, jr, jq, ji;
        var iJpeg, iJpegResol, iJpegRate, iJpegQuality;

        jt = eval("_jt" + iStream);
        jr = eval("_jr" + iStream);
        jq = eval("_jq" + iStream);
        ji = eval("_ji" + iStream);

        iJpeg = eval("objVoip.jpeg_transmit" + iStream);
        iJpegResol = eval("objVoip.resol_stream" + iStream);
        iJpegRate = eval("objVoip.jpeg_interval" + iStream);
        iJpegQuality = eval("objVoip.jpeg_quality_ch" + iStream);

        if (( iJpeg != jt )
            || ( iJpegResol != jr )
            || ( iJpegRate != ji )
            || ( iJpegQuality != jq )
        ) {
            try {
                mainview_StopLive();
            } catch (e) {
                // DO NOTHING
            }
            setTimeout("reloadLivePage();", 3000);
        } else {
            // DO NOTHING
        }
    }
}

function reloadLivePage()
{
    parent.location.reload();
}

/**
 * Use the mouse wheel to control the picture to become larger or smaller
 * @param e
 * @returns {boolean}
 * @constructor
 */
function MouseWheelHandler(e) {

    if (window.parent.menubarCtrl.checkFull()) return;

    var myimage = document.getElementById("WebVideoImg");
    var mydivWidth = parseInt(document.getElementById("WebVideo").clientWidth);
    var mydivHeight = parseInt(document.getElementById("WebVideo").clientHeight);
    document.getElementById("WebVideo").style.width = mydivWidth;
    document.getElementById("WebVideo").style.height = mydivHeight;
    var height = myimage.height;

    var marLeft = parseInt($('#WebVideoImg').css('marginLeft'));
    var marRight = parseInt($('#WebVideoImg').css('marginTop'));

    var e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (height >= 1332 && delta > 0) return;
    myimage.style.width = Math.max(mydivWidth, Math.min(2400, myimage.clientWidth + (64 * delta))) + "px";
    myimage.style.height = Math.max(mydivHeight, Math.min(1350, myimage.clientHeight + (36 * delta))) + "px";
    if (delta > 0) {
        document.getElementById("WebVideoImg").style.marginLeft = (marLeft - 32) + "px";
        document.getElementById("WebVideoImg").style.marginTop = (marRight - 18) + "px";
    } else if (delta < 0 && height > mydivHeight && marLeft <= -32) {
        document.getElementById("WebVideoImg").style.marginLeft = (marLeft + 32) + "px";
        document.getElementById("WebVideoImg").style.marginTop = (marRight + 18) + "px";
    }
    return false;
}

function SetVideoProperty() {
    var PlgDsp = _plugin_disp;
    var objVideo = document.WebVideo;
    var ratio = 1;

    if (typeof window.devicePixelRatio !== "undefined") {
        ratio = window.devicePixelRatio;
    }

    with (objVideo) {
        width = iWidth;
        height = iWidth / 16 * 9;
        ViewWidth = (iWidth) * ratio;
        ViewHeight = (iWidth / 16 * 9) * ratio;
    }
    with (objVideo) {
        RateEstimateMode = 0;
        AccessType = 0;
        RetryCount = 2;
        RetryTime = 30;
        BackColor = 0x000000;
        PTEnable = 1;
        EleZoom = 1;
        VmdEnable = 0;
        CatchFocus = 1;
        WheelZoomMode = 1;
        IgnoreSSLError = 1;
        if (( gsDeliMode[iStream - 1] == "2" ) || ( gsDeliMode[iStream - 1] == "3" )) {
            TransMethod = 5;
        }
        else {
            TransMethod = 0;
        }
    }
    if (menubarCtrl.menubar_GetCodecMode() == "jpeg") {
        var iJpegInter = menubarCtrl.menubar_GetFramerate();
        var iResolution = menubarCtrl.menubar_GetResolution();
        objVideo.ImageFormat = 0;
        if (location.port != "") {
            objVideo.HttpPort = location.port;
        }
        objVideo.HttpPort = chknet_CheckSetPortNo(location.port, gsHttpPort, gsHttpsPort, gihttps);
        objVideo.JPEGPushUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/jpeg?connect=start&framerate=" + iJpegInter + "&resolution=" + iResolution + "&quality=" + iQuality + "&UID=" + giUid;
        objVideo.JPEGPushStopUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/jpeg?connect=stop&UID=" + giUid;
        objVideo.HealthCheckUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/keep_alive?mode=jpeg&protocol=http&UID=" + giUid;
        objVideo.HealthCheckTime = 30;
        setTimeout("document.WebVideo.StartLive();", window.parent.AWCAM_DELAY_START_LIVE);
        window.parent.AWCAM_DELAY_START_LIVE = 10
    } else {
        var sDelivery = gsDelivery[iStream - 1];
        var sMultiAdd = gsMultiAdd[iStream - 1];
        var iMultiPort = giMultiPort[iStream - 1];
        var sUniPort = gsUniPort[iStream - 1];
        var sUniAudioPort = gsUniAudioPort[iStream - 1];
        var iResolution = menubarCtrl.menubar_GetResolution();
        objVideo.ImageFormat = 2;

        objVideo.HttpPort = chknet_CheckSetPortNo(location.port, gsHttpPort, gsHttpsPort, gihttps);
        if (location.port != "") {
            objVideo.HttpPort = location.port;
        }

        if (sDelivery == "uni") {
            objVideo.MultiCastMode = 0;
            objVideo.FixUDPPort = 0;
            var dtmNow = new Date();
            objVideo.UDPPort = 5000 + ( ( dtmNow.getTime() % 5000 ) * 2 );
        }
        else if (sDelivery == "uni_manual") {
            objVideo.FixUDPPort = 1;
            objVideo.MultiCastMode = 0;
            objVideo.UDPPort = sUniPort;
        }
        else {
            objVideo.MultiCastMode = 1;
            objVideo.MultiCastAddr = sMultiAdd;
            objVideo.FixUDPPort = 1;
            objVideo.UDPPort = iMultiPort;
        }
        image_DelayTimer = setTimeout("Image_DelayTimeout()", 300);
    }

    objVideo.MPEG4FluctionCtrl = parseInt(PlgDsp, 10);
    if (PlgDsp == "1") {
        var iBufCnt = 5;
        var iResolution = menubarCtrl.menubar_GetResolution();
        if (giBitrateMax < 0) {
            iBufCnt = 15;
        }
        else if (giBitrateMax >= 20480) {
            iBufCnt = 15;
        }
        else if (giBitrateMax >= 6144) {
            iBufCnt = 10;
        }
        else {
            if (iResolution >= 1920) {
                iBufCnt = 10;
            }
            else {
                iBufCnt = 5;
            }
        }
        objVideo.DecodeBufferCount = iBufCnt;
    }
}

function chknet_CheckSetPortNo(sSetPort, sHttpPort, sHttpsPort, ihttps) {
    var sRetPortNo = 0;
    if (sSetPort == "") {
        if (ihttps == 0) {
            sRetPortNo = parseInt(sHttpPort);
        }
        else {
            sRetPortNo = parseInt(sHttpsPort);
        }
    }
    else {
        sRetPortNo = parseInt(sSetPort);
    }
    return sRetPortNo;
}

/**
 * change stream to rtsp(video : h264)
 */
function    SetVideoPro_Rtsp() {
    var PlgDsp = _plugin_disp;
    var objVideo = document.WebVideo;
    var ratio = 1;

    if (typeof window.devicePixelRatio !== "undefined") {
        ratio = window.devicePixelRatio;
    }

    with (objVideo) {
        width = iWidth;
        height = iWidth / 16 * 9;
        ViewWidth = (iWidth) * ratio;
        ViewHeight = (iWidth / 16 * 9) * ratio;
    }
    with (objVideo) {
        TransMethod = giTrans;
        RateEstimateMode = 0;
        AccessType = 0;
        RetryCount = 2;
        RetryTime = 30;
        BackColor = 0x000000;
        PTEnable = 1;
        EleZoom = 1;
        VmdEnable = 0;
        CatchFocus = 1;
        RTSPDstHost = location.hostname;
        RTSPPort = _rtsp_port;
        RTSPTimeOut = 60;
        WheelZoomMode = 1;
        RTSPScheme = gihttps;
        IgnoreSSLError = 1;
    }
    if (menubarCtrl.menubar_GetCodecMode() == "h264") {
        var ret = getRtsp();
        var sDelivery = gsDelivery[iStream - 1];
        var sMultiAdd = gsMultiAdd[iStream - 1];
        var iMultiPort = giMultiPort[iStream - 1];
        var iMultiTTL = giMultiTTL[iStream - 1];
        var sUniPort = gsUniPort[iStream - 1];
        objVideo.ImageFormat = 2;
        switch (iStream) {
            case 1:
                objVideo.RTSPPathName = "/" + ret.h264_rtsp_req_uri1;
                break;
            case 2:
                objVideo.RTSPPathName = "/" +  ret.h264_rtsp_req_uri2;
                break;
            case 3:
                objVideo.RTSPPathName = "/" + ret.h264_rtsp_req_uri3;
                break;
            case 4:
                objVideo.RTSPPathName = "/" + ret.h264_rtsp_req_uri4;
                break;
            case 5:
                objVideo.RTSPPathName = "/" + ret.h265_rtsp_req_uri1;
                break;
        }
    } else {
        var sDelivery = _mum;
        var sMultiAdd = _muc;
        var iMultiPort = _mcpm;
        var iMultiTTL = _mctm;
        var sUniPort = _uctmvp;
        objVideo.ImageFormat = 1;
        objVideo.RTSPPathName = "/MediaInput/mpeg4/stream_" + iStream;
    }
    objVideo.HttpPort = chknet_CheckSetPortNo(location.port, gsHttpPort, gsHttpsPort, gihttps);
    if (location.port != "") {
        objVideo.HttpPort = location.port;
    }
    if (sDelivery == "uni") {
        objVideo.MultiCastMode = 0;
        objVideo.FixUDPPort = 0;
        var dtmNow = new Date();
        objVideo.UDPPort = 5000 + ( ( dtmNow.getTime() % 5000 ) * 2 );
    } else if (sDelivery == "uni_manual") {
        objVideo.FixUDPPort = 1;
        objVideo.MultiCastMode = 0;
        objVideo.UDPPort = sUniPort;
    } else {
        objVideo.MultiCastMode = 1;
        objVideo.MultiCastAddr = sMultiAdd;
        objVideo.FixUDPPort = 1;
        objVideo.UDPPort = iMultiPort;
        objVideo.MultiCastTTL = iMultiTTL;
    }
    objVideo.MPEG4FluctionCtrl = parseInt(PlgDsp, 10);
    if (PlgDsp == "1") {
        var iBufCnt = 5;
        var iResolution = menubarCtrl.menubar_GetResolution();
        if (giBitrateMax < 0) {
            iBufCnt = 15;
        }
        else if (giBitrateMax >= 20480) {
            iBufCnt = 15;
        }
        else if (giBitrateMax >= 6144) {
            iBufCnt = 10;
        }
        else {
            if (iResolution >= 1920) {
                iBufCnt = 10;
            }
            else {
                iBufCnt = 5;
            }
        }
        objVideo.DecodeBufferCount = iBufCnt;
        objVideo.ReceiveWaitTime = 2000;
    }
    objVideo.HealthCheckTime = 30;
}

function getRtsp(iStream) {
    var url = "/cgi-bin/get_rtsp";
    var ret = cparam_sendRequest(url);
    var result = {};
    if (ret) {
        ret = cparam_getRetArray(ret);
        for (var i = 0; i < ret.length; i++) {
            if (ret[i].indexOf("rtsp_port=") == 0) {
                result.rtsp_port = ret[i].substring("rtsp_port=".length);
                continue;
            }
            if (ret[i].indexOf("h264_rtsp_req_uri1=") == 0) {
                result.h264_rtsp_req_uri1 = ret[i].substring("h264_rtsp_req_uri1=".length);
                continue;
            }
            if (ret[i].indexOf("h264_rtsp_req_uri2=") == 0) {
                result.h264_rtsp_req_uri2 = ret[i].substring("h264_rtsp_req_uri2=".length);
                continue;
            }
            if (ret[i].indexOf("h264_rtsp_req_uri3=") == 0) {
                result.h264_rtsp_req_uri3 = ret[i].substring("h264_rtsp_req_uri3=".length);
                continue;
            }
            if (ret[i].indexOf("h264_rtsp_req_uri4=") == 0) {
                result.h264_rtsp_req_uri4 = ret[i].substring("h264_rtsp_req_uri4=".length);
                continue;
            }
            if (ret[i].indexOf("h265_rtsp_req_uri1=") == 0) {
                result.h265_rtsp_req_uri1 = ret[i].substring("h265_rtsp_req_uri1=".length);
            }
        }
    }
    return result;
}

/**
 * set audio stream
 */
function SetAudioProperty() {
    var objAudio = document.WebAudio;
    var sDelivery = "";
    var sMultiAdd = "";
    var iMultiPort = "";
    var iBitRate = _br;
    var iAudioEnc = _aenc;
    var sUniAudioPort;

    if (iEncode == "0") {
        var iInterval = _ai;
    }
    else if (iEncode == "1") {
        var iInterval = _ai711;
    }
    else {
        var iInterval = 20;
    }
    if (iAudioEnc == 0) {
        if (iBitRate == 32) {
            iBitRate = 0;
        }
        else {
            iBitRate = 1;
        }
    }
    else {
        iBitRate = 0;
    }
    if (menubarCtrl.menubar_GetCodecMode() == "h264") {
        var sDelivery = gsDelivery[iStream - 1];
        var sMultiAdd = gsMultiAdd[iStream - 1];
        var iMultiPort = giMultiPort[iStream - 1];
        var sUniAudioPort = gsUniAudioPort[iStream - 1];
    }
    with (objAudio) {
        AccessType = 0;
        RetryCount = 2;
        RetryTime = 30;
        HealthCheckTime = 30;

        if (iAudioEnc == 2) {
            if (menubarCtrl.menubar_GetCodecMode() == "jpeg") {
                VoiceFormat = 2;
            }
            else {
                VoiceFormat = 6;
            }
        }
        else {
            VoiceFormat = iAudioEnc;

        }
        VoiceBitRate = iBitRate;
        var iVoiceBuff = 0;
        switch (iInterval) {
            case 20:
                iVoiceBuff = 200;
                break;
            case 40:
                iVoiceBuff = 320;
                break;
            case 80:
                iVoiceBuff = 400;
                break;
            case 160:
                iVoiceBuff = 720;
                break;
            default:
                iVoiceBuff = iInterval * 4;
                break;
        }
        VoiceBuffer = iVoiceBuff;
        VoiceInterval = iInterval;
        Volume = 9;
    }
    objAudio.HttpPort = chknet_CheckSetPortNo(location.port, gsHttpPort, gsHttpsPort, gihttps);
    if (menubarCtrl.menubar_GetCodecMode() == "h264") {
        objAudio.TransMethod = 0;
        objAudio.RTPUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/audio?connect=start&protocol=rtp&mode=in&UID=" + giUid + gsStNo;
        objAudio.RTPStopUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/audio?connect=stop&protocol=rtp&mode=in&UID=" + giUid + gsStNo;
        objAudio.HealthCheckUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/keep_alive?mode=audio&protocol=rtp&UID=" + giUid + gsStNo;
        if (sDelivery == "uni") {
            objAudio.MultiCastMode = 0;
            objAudio.FixUDPPort = 0;
            var dtmNow = new Date();
            objAudio.UDPPort = 6000 + ((dtmNow.getTime() % 5000) * 2);
        }
        else if (sDelivery == "uni_manual") {
            objAudio.MultiCastMode = 0;
            objAudio.FixUDPPort = 1;
            objAudio.UDPPort = sUniAudioPort;
        }
        else {
            objAudio.MultiCastMode = 1;
            objAudio.MultiCastAddr = sMultiAdd;
            objAudio.FixUDPPort = 1;
            objAudio.UDPPort = iMultiPort + 1000;
        }
        objAudio.ErrorConcealment = 1;
    }
    else if (menubarCtrl.menubar_GetCodecMode() == "jpeg") {
        objAudio.TransMethod = 1;
        objAudio.HTTPPushUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/audio?connect=start&protocol=http&mode=in&UID=" + giUid;
        objAudio.HTTPPushStopUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/audio?connect=stop&protocol=http&mode=in&UID=" + giUid;
        objAudio.HealthCheckUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/keep_alive?mode=audio&protocol=http&UID=" + giUid + gsStNo;
    }

    objAudio.Mute = cparam_get_audio() == 1 ? 0: 1;
}

/**
 * change stream to rtsp(audio : h264)
 * @constructor
 */
function SetAudioPro_Rtsp() {
    var objAudio = document.WebVideo;
    var sDelivery = _mum;
    var iBitRate = _br;
    var iAudioEnc = _aenc;
    var iStream = menubarCtrl.menubar_GetStreamMode();
    var sUniAudioPort;
    var iMultiPort = giMultiPort[iStream - 1];

    if (iEncode == "0") {
        var iInterval = _ai;
    }
    else if (iEncode == "1") {
        var iInterval = _ai711;
    }
    else {
        var iInterval = 20;
    }
    if (iAudioEnc == 0) {
        if (iBitRate == 32) {
            iBitRate = 0;
        }
        else {
            iBitRate = 1;
        }
    }
    else {
        iBitRate = 0;
    }
    with (objAudio) {
        TransSendMethod = 0;
        AudioTransMethod = 0;
        AudioMode = 1;
        if (iAudioEnc == 2) {
            if (menubarCtrl.menubar_GetCodecMode() == "jpeg") {
                VoiceFormat = 2;
            }
            else {
                VoiceFormat = 6;
            }
        }
        else {
            VoiceFormat = iAudioEnc;
        }
        VoiceBitRate = iBitRate;
        var iVoiceBuff = 0;
        switch (iInterval) {
            case 20:
                iVoiceBuff = 200;
                break;
            case 40:
                iVoiceBuff = 320;
                break;
            case 80:
                iVoiceBuff = 400;
                break;
            case 160:
                iVoiceBuff = 720;
                break;
            default:
                iVoiceBuff = iInterval * 4;
                break;
        }
        VoiceBuffer = iVoiceBuff;
        VoiceInterval = iInterval;
        Volume = 9;
    }
    if (menubarCtrl.menubar_GetCodecMode() == "h264") {
        sDelivery = gsDelivery[iStream - 1];
        sUniAudioPort = gsUniAudioPort[iStream - 1];
    }
    if (sDelivery == "uni") {
        var dtmNow = new Date();
        objAudio.AudioUDPPort = 6000 + ((dtmNow.getTime() % 5000) * 2);
    }
    else if (sDelivery == "uni_manual") {
        objAudio.AudioUDPPort = sUniAudioPort;
    }
    else {
        objAudio.AudioUDPPort = iMultiPort + 1000;
    }
    objAudio.ErrorConcealment = 1;

    objAudio.Mute = cparam_get_audio() == 1 ? 0: 1;
}

/**
 * show error message
 * @param iCode
 * @param ObjID
 * @constructor
 */
function DetectErr(iCode, ObjID) {
    if (( iCode == 35 ) && ( !gbErr35 )) {
        gbErr35 = true;
        alert(MSG_STATUS.mID_0030);
    }
    if (( iCode == 36 ) && ( !gbErr36 )) {
        gbErr36 = true;
        if (ObjID == "WebVideo") {
            alert(MSG_STATUS.mID_0032);
        } else if (ObjID == "WebAudio") {
            alert(MSG_STATUS.mID_0033);
        }
    }
    if (ObjID == "WebAlarm") {
        if (( iCode == 1 ) && ( !gbErrAlarm )) {
            gbErrAlarm = true;
            alert(MSG_STATUS.mID_0034);
        }
    }
    if (( iCode == 2011 ) || ( iCode == 3005 ) || ( iCode == 3006 )) {
        try {
            if (!mbReload) {
                mbReload = true;
            }
        } catch (e) {
            location.href = "/live/index.html";
        }
    }
}

/**
 * mainview.html : stop live stream
 */
function mainview_StopLive() {
    try{
        if (IsIE()) {
            try {
                document.WebVideo.StopLive();
                if (( gbAudioActX ) && ( giAudioState == 1 )) {
                    try {
                        if (giTrans < 2) {
                            document.WebAudio.StopLive();
                            giAudioState = 0;
                        }
                    }
                    catch (e) {
                    }
                }
            } catch (e) {
                // DO NOTHING
            }
        } else {
            menubarCtrl.menubar_GetStreamInfo();
            $.get("/cgi-bin/jpeg?connect=stop&UID=" + (giUid));
            document.getElementById("camView").innerHTML
                = '<div id="WebVideo" style="display: block; background-color: #000000; '
                + ' width: ' + iWidth + 'px; height: ' + iHeight + 'px;"></div>';
        }
    }catch (e){

    }
}

/**
 * document.write : web video
 * @constructor
 */
function DocWriteWebVideo() {
    gViewImageT = 1;
    gViewImage_dbd = 1;
    iWidth = menubarCtrl.menubar_GetResolution();
    if(iWidth>=1920){
        iWidth = 1450;
    }
    gNormalWidth = iWidth;
    iHeight = iWidth / 16 * 9;
    gNormalHeight = iHeight;
    if (giTrans < 2) {
        cactivex_CreateMediaControl(iWidth, iHeight, gPlugDl);
    }
    else {
        cactivex_CreateMediaControl(iWidth, iHeight, gPlugDl);
    }
    ActiveXWidth = iWidth;
    ActiveXHeight = iHeight;
}

function Image_DelayTimeout() {

    var objVideo = document.WebVideo;
    clearTimeout(image_DelayTimer);
    objVideo.H264StartUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/h264?connect=start&protocol=rtp&UID=" + giUid + gsStNo;
    objVideo.H264StopUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/h264?connect=stop&UID=" + giUid + gsStNo;
    objVideo.HealthCheckUrl = gsHttpTBL[gihttps] + location.host + "/cgi-bin/keep_alive?mode=h264" + gsNum + "&protocol=rtp&UID=" + giUid;
    objVideo.HealthCheckTime = 30;
    try {
        setTimeout("document.WebVideo.StartLive();", window.parent.AWCAM_DELAY_START_LIVE);
        window.parent.AWCAM_DELAY_START_LIVE = 10;
    } catch (e) {
        this.location.href = "/live/pc/install.html";

    }
}

function mainview_ViewFull() {
    try {
        if (gViewImage_dbd == 1) {
            document.WebVideo.ViewFull(1);
            SetRightMenu();
        } else {

            var ratio = 1;

            if (typeof window.devicePixelRatio !== "undefined") {
                ratio = window.devicePixelRatio;
            }

            document.getElementById('WebVideo').style.width = gNormalWidth + 'px';
            document.getElementById('WebVideo').style.height = gNormalHeight + 'px';
            document.WebVideo.ViewWidth = gNormalWidth * ratio;
            document.WebVideo.ViewHeight = gNormalHeight * ratio;
            gViewImage_dbd = 1;
        }
    } catch (e) {
        // DO NOTHING
    }
}

function mainview_ViewFullCheck() {
    try {
        if (document.WebVideo.ViewFullMode == 1) {
            document.WebVideo.ViewFull(0);
        }
    }
    catch (e) {
        // DO NOTHING
    }
}

function SetRightMenu() {
    document.WebVideo.SetMenuItem(1, "Back");
    document.WebVideo.MenuEnable = 1;
}

/**
 * select the menu right to return the normal view
 * @param menuID
 * @constructor
 */
function RightMenuSelect(menuID) {
    if (menuID == 1) {
        document.WebVideo.MenuEnable = 0;
        LiveNormalView();
    }
}

/**
 * return to normal view
 * @constructor
 */
function LiveNormalView() {
    var ratio = 1;
    if (typeof window.devicePixelRatio !== "undefined") {
        ratio = window.devicePixelRatio;
    }
    try {
        document.WebVideo.ViewFull(0);
        document.WebVideo.ViewWidth = ActiveXWidth * ratio;
        document.WebVideo.ViewHeight = ActiveXHeight * ratio;
        document.getElementById('WebVideo').style.width = ActiveXWidth + 'px';
        document.getElementById('WebVideo').style.height = ActiveXHeight + 'px';
    }
    catch (e) {
    }
    gViewImage_dbd = gViewImageT;
    /* 全画面表示解除時に補正必要(0)/不要(1)状態に戻す */
}

/**
 * check if it is locked or not
 * @param lnum
 * @constructor
 */
function LockCheck(lnum) {
    if (lnum == 1) {
        document.getElementById("ifrmRight_id").contentWindow.OpLockFunc();
    } else {
        document.getElementById("ifrmRight_id").contentWindow.ThisPageReload();
    }
}

/**
 * start check tally
 */
function startCheckTally() {
    setTimeout(function(){
        gTallyTimerID = setInterval("checkTally();", 5000);
    },200)
}

/**
 * stop check tally
 */
function stopCheckTally() {
    clearTimeout(gTallyTimerID);
}

/**
 * Detect timeout every 5 seconds
 */
function checkTimeoutTallyRequest() {
    var iCurrentTime;
    if (( giRecvTimeCheckTally - giSendTimeCheckTally ) < 0) {
        iCurrentTime = ( new Date() ).getTime();
        if (( iCurrentTime - giSendTimeCheckTally ) > 30000) {
            checkTally();
        } else {
            // DO NOTHING
        }
    } else {
        // DO NOTHING
    }
    gTallyTimerID = setTimeout("checkTimeoutTallyRequest();", 5000);
}

/**
 * check tally and update tally state
 * @returns {boolean}
 */
function checkTally() {
    if(!mainViewOperationFlag){
        updateTallyState();
    }

}

/**
 * update tally state
 */
var count = 0;
function updateTallyState() {
    if(!window.parent.liveModeFlg){
        count++;
        if(count<5){
            return;
        }
    }
    count = 0;
    var tally_state = window.parent.reqCgiObj.tally_state;
    
    var r_tally_state = parseInt(tally_state.substring(0,1));
    var r_tally_command = parseInt(tally_state.substring(1,2));
    var r_tally_wired = parseInt(tally_state.substring(2,3));
    
    var g_tally_state = parseInt(tally_state.substring(3,4));
    var g_tally_command = parseInt(tally_state.substring(4,5));
    var g_tally_wired = parseInt(tally_state.substring(5,6));

    var y_tally_state = parseInt(tally_state.substring(6,7));
    var y_tally_command = parseInt(tally_state.substring(7,8));
    var y_tally_wired = parseInt(tally_state.substring(8,9));

    if((r_tally_state == 0 && g_tally_state == 0 && y_tally_state == 0)) {
    	$("#div_tally").hide();
        $("#div_tally_1").hide();
        $("#div_tally_2").hide();
    }else if((r_tally_command == 1 || r_tally_wired ==1) && (g_tally_command == 1 || g_tally_wired == 1) && (y_tally_command == 1 || y_tally_wired == 1)){
        $("#div_tally").show();
        $("#div_tally_1").show();
        $("#div_tally_2").show();
        $("#div_tally").css('background-color','red');
        $("#div_tally_1").css('background-color','green');
        $("#div_tally_2").css('background-color','yellow');
    }else if((r_tally_command == 1 || r_tally_wired ==1) && (g_tally_command == 1 || g_tally_wired == 1) && (y_tally_command == 0 || y_tally_wired == 0)){
    	$("#div_tally").hide();
        $("#div_tally_1").show();
        $("#div_tally_2").show();
        $("#div_tally_1").css('background-color','red');
        $("#div_tally_2").css('background-color','green');
    }else if((r_tally_command == 1 || r_tally_wired ==1) && (g_tally_command == 0 || g_tally_wired == 0) && (y_tally_command == 1 || y_tally_wired == 1)){
    	$("#div_tally").hide();
        $("#div_tally_1").show();
        $("#div_tally_2").show();
        $("#div_tally_1").css('background-color','red');
        $("#div_tally_2").css('background-color','yellow');
    }else if((r_tally_command == 0 || r_tally_wired ==0) && (g_tally_command == 1 || g_tally_wired == 1) && (y_tally_command == 1 || y_tally_wired == 1)){
    	$("#div_tally").hide();
        $("#div_tally_1").show();
        $("#div_tally_2").show();
        $("#div_tally_1").css('background-color','green');
        $("#div_tally_2").css('background-color','yellow');
    }else if((r_tally_command == 0 || r_tally_wired ==0) && (g_tally_command == 0 || g_tally_wired == 0) && (y_tally_command == 1 || y_tally_wired == 1)){
    	$("#div_tally").hide();
        $("#div_tally_1").hide();
        $("#div_tally_2").show();
        $("#div_tally_2").css('background-color','yellow');
    }else if((r_tally_command == 0 || r_tally_wired ==0) && (g_tally_command == 1 || g_tally_wired == 1) && (y_tally_command == 0 || y_tally_wired == 0)){
    	$("#div_tally").hide();
        $("#div_tally_1").hide();
        $("#div_tally_2").show();
        $("#div_tally_2").css('background-color','green');
    }else if((r_tally_command == 1 || r_tally_wired ==1) && (g_tally_command == 0 || g_tally_wired == 0) && (y_tally_command == 0 || y_tally_wired == 0)){
    	$("#div_tally").hide();
        $("#div_tally_1").hide();
        $("#div_tally_2").show();
        $("#div_tally_2").css('background-color','red');
    }
}

function hideTallyState() {
    $("#div_tally").hide();
    $("#div_tally_1").hide();
    $("#div_tally_2").hide();
}


/**
 * init camera view page
 */
function initCameraView() {
    var str = "";
    iResol = menubarCtrl.menubar_GetResolution();
    if (iResol >= 1920 ) {
        if(IsIE()){
            iResol = 1450;
        }else{
            iResol = 1450;
        }
    }
    $("#camView").prepend("<div id ='div_tally' style='height:30px;margin-top:-96px;position:absolute;'></div>");
    $("#div_tally").css("width",iResol+"px");
    $("#camView").prepend("<div id ='div_tally_1' style='height:30px;margin-top:-64px;position:absolute;'></div>");
    $("#div_tally_1").css("width",iResol+"px");
    $("#camView").prepend("<div id ='div_tally_2' style='height:30px;margin-top:-32px;position:absolute;'></div>");
    $("#div_tally_2").css("width",iResol+"px");    
    var retValue = sysStreamMode;
    if (IsIE()) {
        str = strMainView;
    } else {
        str = "                                        <div id=\"WebVideo\" class=\"CssTally_VGA\">\n" +
            "                                            <div id=\"liveviewO\" align=\"center\"></div>\n" +
            "                                        </div>"
    }
    document.write(str);
}

function mainview_Mute() {
    if (gbAudioActX) {
        if (giTrans < 2) {
            document.WebAudio.Mute = 1;
            document.WebAudio.StopLive();
            giAudioState = 0;
        }
        else {
            document.WebVideo.Mute = 1;
        }
    }
}

function mainview_MuteCancel() {
    if (gbAudioActX) {
        if (giTrans < 2) {
            document.WebAudio.StartLive();
            giAudioState = 1;
            document.WebAudio.Mute = 0;
        }
        else {
            document.WebVideo.Mute = 0;
        }
    }
}

/**
 * document.write : web audio
 * @constructor
 */
function DocWriteWebAudio() {
    if (giTrans < 2) {
        cactivex_CreateAudioControl("disable");
    }
}

function mainview_get_Codec() {
    return gsCodec;
}

function mainview_get_JpegResol() {
    return giJpegResol;
}

function mainview_get_JpegBaseQual() {
    return gsJpegBaseQual;
}

function mainview_get_StreamMode() {
    return gStreamMode;
}

function mainview_get_StNo() {
    return gsStNo;
}

function mainview_get_Multi() {
    return giMulti;
}

function mainview_get_Trans() {
    return giTrans;
}

function mainview_get_Trans2() {
    return giTrans2;
}

function mainview_get_Trans3() {
    return giTrans3;
}

function mainview_get_Trans4() {
    return giTrans4;
}

var resolution = 0; // 0:VGA,1:QVGA
var power = gPower;
var tally = 0; // 0:TallyOff,1:TallyOn
var _live;


function isTouchAF_CenterClickDisable() {
    var status = menubarCtrl.streamControler.getBtnLockObjcet().getStatus();
    if(status == 1){
        return true;
    }
    if (IsIE()) {
        if (document.WebVideo.ViewFullMode == 1) {
            return true;
        }
    } else {
        if (menubarCtrl.checkFull()) {
            return true;
        }
    }
    if(menubarCtrl.streamControler.isAllChannelOFF()) {
        return true;
    }
    if(cparam_get_UHDCrop() != 0) {
        return true;
    }
    if(cparam_get_bar() == 1) {
        return true;
    }

    return false;
}

function MouseUpEvent( btom, shf, pan, tilt )
{

    if(isTouchAF_CenterClickDisable() == true) {
        return;
    }

    var currentZoomValue = window.parent.currentZoomValue;
    var currentIeZoomValue = window.parent.currentIeZoomValue;

    iResol = menubarCtrl.menubar_GetResolution();

    if(iResol >= 1280) { //#3877 add by 12090307
        pan = parseFloat(pan / (currentZoomValue)) / currentIeZoomValue;
        tilt = parseFloat(tilt / (currentZoomValue)) / currentIeZoomValue;
    }else {
        pan = parseFloat(pan / (currentZoomValue));
        tilt = parseFloat(tilt / (currentZoomValue));
    }

    var width;
    var Height;
    if(isTouchAF_CenterClickDisable() == true || !liveModeFlg) {
        return;
    }
    if (window.parent.gBTN_TOUCH_F_status == 1) {
        if(iResol > 1280){
            width = 1450; // parseInt( pan * (1920/1450) );
            Height = 1450 / 16 * 9; //parseInt( tilt * (1920/1450) ); //parseInt( pan/16*9 );
        }else{
            width =  iResol; //parseInt( pan * (3840/1450));
            Height = iResol / 16 * 9; //parseInt( pan/16*9 );
        }
        var x = pan / width;
        var y = tilt / Height;
         cparam_set_toutchAF(x * 100, y * 100);
    } else {
        send_Cgi_center_click(pan, tilt, iResol);
    }
    return;
}

function checkFullScreenIE() {

    if(nowFullScreenStateIE != null) {
        prevFullScreenStateIE = nowFullScreenStateIE;
    }
    
    nowFullScreenStateIE = document.WebVideo.ViewFullMode;
    
    if(prevFullScreenStateIE == 1 && nowFullScreenStateIE == 0) {
        prevFullScreenStateIE = null;
        nowFullScreenStateIE = null;
        clearInterval(IETimer);
        IETimer = null;
        window.parent.onresize();
    }

}
    
var strMainView = ( '<script type="text/javascript">DocWriteWebVideo();' + '</script>' +
    '<script for="WebVideo" event="Err(code)" language="JavaScript">DetectErr(code,"WebVideo");</script>' +
    '<script for="WebVideo" event="MenuSelect(menuID)" language="JavaScript">RightMenuSelect(menuID);</script>');
