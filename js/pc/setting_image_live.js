/**
 * @fileOverview Setup画面:live制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var settingIoaLive = settingIoaLive();

/**
 * setup画面:live制御に関わる画面クラス
 * @class Settings画面:live制御に関わる画面クラス
 * @return {function} build 構築処理
 * @return {function} rebuild 再構築処理
 * @constructor
 */

function settingIoaLive() {
    var buildFlag = false;
    var __sto = setInterval;
    var timerCloseLive = null;
    let btnObject;
    /**
     * UHD crop設定画面構築処理
     */
    function build(index,objVOIP) {
        if (!buildFlag) {
            buildFlag = true;
            initThisPage(index,objVOIP);
        } else {
            rebuild(index,objVOIP);
        }
    }

    /**
     * UHD crop設定画面再構築処理
     */
    function rebuild(index,objVOIP) {
        initThisPage(index,objVOIP);
    }

    function initThisPage(index,objVOIP) {


        if(!_live){
            $("#setup_live_form_liveview,#setup_live_crop_ipout1").empty();
            _live = new CLiveview();
        }else{
            if(index !="crop"){
                $("#setup_live_crop_ipout1").empty();
            }
            return;
        }
        if(index == "crop"){

            if(objVOIP.jpeg_transmit2 == 1 || objVOIP.jpeg_transmit3 == 1){
                var tallyEle = document.getElementById("setup_live_form_tally");
                var liveviewEle = document.getElementById("setup_live_form_liveview");
                var jpegInterval = 30;
                _live.init(tallyEle, liveviewEle, jpegInterval, power, cparams.resolution);

                changeImageResolution(cparam_get_resolutionControl());
                changeTallyFrameColor(cparam_get_tallyInformationR());
                _live.start(currentWindowWidth,objVOIP.jpeg_transmit2,objVOIP.jpeg_transmit3,"ip2");
            }

            if(objVOIP.jpeg_transmit1 == 1){
                _live_ipout = new CLiveview();
                var tallyEle = document.getElementById("setup_live_form_tally_ipout");
                var liveviewEle = document.getElementById("setup_live_crop_ipout1");
                var jpegInterval = 30;
                _live_ipout.init(tallyEle, liveviewEle, jpegInterval, power, cparams.resolution);
                changeImageResolution(cparam_get_resolutionControl());
                changeTallyFrameColor(cparam_get_tallyInformationR());
                _live_ipout.start(currentWindowWidth,objVOIP.jpeg_transmit1,objVOIP.jpeg_transmit2,"ip1");
            }



        }else{
            var tallyEle = document.getElementById("setup_live_form_tally");
            var liveviewEle = document.getElementById("setup_live_form_liveview");
            var jpegInterval = 30;
            _live.init(tallyEle, liveviewEle, jpegInterval, power, cparams.resolution);

            changeImageResolution(cparam_get_resolutionControl());
            changeTallyFrameColor(cparam_get_tallyInformationR());
            _live.start(currentWindowWidth);
        }
        if(!btnObject){
            btnObject = ButtonCtrl('setup_live_form', 'image_adjust_camera_control', NPTZ_WORDING.wID_0451+"   >>", callbackCameraMenu);
            btnObject.show();
            btnObject.displayOff();
        }

    }

    function callbackCameraMenu(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            if(btnObject.getStatus() != Button.STATUS_ON){
                btnObject.set(NPTZ_WORDING.wID_0567 + "   <<");
                $("#camera_controller_gui_left").show();
                btnObject.displayOn();
                windowsZoomControlOnResize();
                if(!capi_IsIE()){
                    window.frames["live_Camera_controller_gui"].contentDocument.getElementById("setupBody").style.transform = "scale(" + 1 + ")";
                }else{
                    $('#setupBody',window.frames["live_Camera_controller_gui"].document).css("transform", "scale(1)");
                }
                $('#tracking_controller',window.frames["live_Camera_controller_gui"].document).hide();

            }else{

                btnObject.set(NPTZ_WORDING.wID_0451 + "   >>");
                $("#camera_controller_gui_left").hide();
                btnObject.getButtonObject().css({
                    "left":"0px",
                    "top":"600px"
                });
                $("#setup_live_form").css("left","-5px");
                btnObject.displayOff();
                windowsZoomControlOnResize();
            }

        }
    }

    function changeImageResolution(reso) {
        if (reso != 0 && reso != 1) return;
        resolution = reso;
        if (gPower == 1) {
            _live.setResolution(resolution);
        }
        else {
            _live.setResolution(0);
        }
    }

    function changeTallyFrameColor(TallyInfo) {
        if (TallyInfo != 0 && TallyInfo != 1) return;

        tally = TallyInfo;
        _live.setTallyState(tally);
    }
    function closeLive(_live) {
        if(document.getElementById("setup_live_form").style.display =="none"||document.getElementById("setup_imageAudio_main").style.display =="none"){
            _live.timerStop();
            clearInterval(timerCloseLive);
            cameraControllerSetting.stopIntervalSetSlider();
        }else{
            _live.timerstart();
        }
    }

    function stopLive(){
        if(!!_live){
            _live.timerStop();
        }
        if(!!_live_ipout){
            _live_ipout.timerStop();
        }
    }
    return {
        build: build,
        rebuild:rebuild,
        stopLive:stopLive,
        getCameraControlBtnStatus:function(){
            return btnObject.getStatus();
        }
    };
}