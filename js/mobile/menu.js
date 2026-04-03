/**
 * menu 初期化
 * */
var Setmenu = setmenu();

function setmenu() {
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildFlag = false;
    /**
     *
     * @type BtnCtrl[]
     */
    var btnObject = [];
    var DIV_0 = 0;
    var DIV_1 = 1;
    var DIV_2 = 2;
    var DIV_3 = 3;
    var DIV_4 = 4;
    var DIV_5 = 5;
    var DIV_6 = 6;
    var DIV_7 = 7;
    var DIV_8 = 8;
    var DIV_9 = 9;

    var TITLE_HEAD_LEFT = 1999;
    var TITLE_HEAD_RIGHT_IMG = 2999;
    var SETUP_TITLE_HEAD_LEFT = 3999;
    var SETUP_TITLE_HEAD_RIGHT_IMG = 4999;

    var TITLE_0 = 10;
    var TITLE_O_BTN_0 = 100;
    var TITLE_O_BTN_1 = 101;

    var TITLE_1 = 11;
    var TITLE_1_BTN_0 = 110;
    var TITLE_1_BTN_1 = 111;

    var TITLE_2 = 12;
    var TITLE_2_BTN_0 = 120;
    var TITLE_2_BTN_1 = 121;
    var TITLE_2_BTN_2 = 122;
    var TITLE_2_BTN_3 = 123;

    var TITLE_3 = 13;
    var TITLE_3_BTN_0 = 130;
    var TITLE_3_BTN_1 = 131;
    var TITLE_3_BTN_2 = 132;

    var TITLE_4 = 14;
    var TITLE_4_BTN_0 = 140;
    var TITLE_4_BTN_1 = 141;
    var TITLE_4_BTN_2 = 142;
    var TITLE_4_BTN_3 = 143;

    var TITLE_5 = 15;
    var TITLE_5_BTN = 150;

    var TITLE_6 = 16;
    var TITLE_6__P = 160;


    var TITLE_7 = 17;
    var TITLE_7_SWITCH = 170;

    var TITLE_8 = 18;
    var TITLE_8_SWITCH = 180;

    var TITLE_9 = 19;
    var TITLE_9_BTN_0 = 190;
    var TITLE_9_BTN_1 = 191;

    var SETUPTITLE_0 = 20;
    var SETUPTITLE_0__P = 200;

    var SETUPTITLE_1 = 21;
    var SETUPTITLE_1__P = 210;

    var SETUPTITLE_2 = 22;
    var SETUPTITLE_2__P = 220;

    var hideflg = true;

    //var objVOIP = cparam_getVideoOverIpInfo();
    var _live_stream = objVOIP.sStream;
    var gsDefaultStream = _live_stream;

    var _jr = parseInt(objVOIP.resol_stream1);
    var _jr2 = parseInt(objVOIP.resol_stream2);
    var _jr3 = parseInt(objVOIP.resol_stream3);

    var _jt = objVOIP.jpeg_transmit1 === "1" ? 1 : 0;
    var _jt2 = objVOIP.jpeg_transmit2 === "1" ? 1 : 0;
    var _jt3 = objVOIP.jpeg_transmit3 === "1" ? 1 : 0;

    var giJpegEnv = [0, _jt];
    var giJpegEnv2 = [0, _jt2];
    var giJpegEnv3 = [0, _jt3];

    var giJpegStream1Resol = _jr;
    var giJpegStream2Resol = _jr2;
    var giJpegStream3Resol = _jr3;

    if (gsDefaultStream == "jpeg") {
        giJpegResol = giJpegStream1Resol;
    } else if (gsDefaultStream == "jpeg_2") {
        giJpegResol = giJpegStream2Resol;
    } else if (gsDefaultStream == "jpeg_3") {
        giJpegResol = giJpegStream3Resol;
    } else {
        giJpegResol = giJpegStream1Resol;
    }


    var gsCodec;
    var giStMode = 1;

    function build() {
        if (!buildFlag) {
            buildFlag = true;
            //初期化menu和子画面 jqmLayerMenu存放的是Menu主菜单
            // 子菜单放在jqmLayerSetPage里构建
            LoadSize("jqmLayerMenu");
            LoadSize("jqmLayerSetPage");
            LoadSize("jqmLayerSet");
            // LoadSize("SetupDiv");
            //一页七行每行的高度
            var titleHig = Size.HEIGHT / 7;
            $("#menuTitle").height(titleHig);
            $("#menuMain").height((titleHig * 6));
            var divHeight = "height: " + (titleHig - 1) + "px";
            btnObject[TITLE_HEAD_LEFT] = ButCtrl("menuTitle", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;&nbsp;Live", callbackTitle);
            btnObject[TITLE_HEAD_RIGHT_IMG] = ImgButtonCtrl("menuTitle", "/css/mobile/parts/ic_menu.png", "position-abs left-47 wth-6", null);
            btnObject[DIV_0] = divAppend("menuMain", "MenuDiv0", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_1] = divAppend("menuMain", "MenuDiv1", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_2] = divAppend("menuMain", "MenuDiv2", "wth-100 position-rel border-bottom-1", divHeight);
            // btnObject[DIV_3] = divAppend("menuMain", "MenuDiv3", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_4] = divAppend("menuMain", "MenuDiv4", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_5] = divAppend("menuMain", "MenuDiv5", "wth-100 position-rel border-bottom-1", divHeight);
            // btnObject[DIV_6] = divAppend("menuMain", "MenuDiv6", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_7] = divAppend("menuMain", "MenuDiv7", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_8] = divAppend("menuMain", "MenuDiv8", "wth-100 position-rel border-bottom-1", divHeight);
            btnObject[DIV_9] = divAppend("menuMain", "MenuDiv9", "wth-100 position-rel border-bottom-1", divHeight);

            btnObject[TITLE_0] = ButCtrl("MenuDiv0", "position-abs wth-50 hig-100", "position-abs left-5 top-37 ", "Power", null);
            btnObject[TITLE_O_BTN_0] = BtnCtrl("MenuDiv0", "TITLE_O_BTN_0", "power", NPTZ_WORDING.wID_0165, callbackPower, 1,"button_power");
            btnObject[TITLE_O_BTN_1] = BtnCtrl("MenuDiv0", "TITLE_O_BTN_1", "standby", NPTZ_WORDING.wID_0166, callbackPower, 2,"button_standy");

            btnObject[TITLE_1] = ButCtrl("MenuDiv1", "position-abs wth-50 hig-100", "position-abs left-5 top-37", NPTZ_WORDING.wID_0047, null);
            //btnObject[TITLE_1_BTN_0] = BtnCtrl("MenuDiv1", "TITLE_1_BTN_0", "", "H.264", callbackCompression, 1);
            btnObject[TITLE_1_BTN_1] = BtnCtrl("MenuDiv1", "TITLE_1_BTN_1", "", NPTZ_WORDING.wID_0084, callbackCompression, 2, "menu_TITLE_1_BTN_1");
            //
            btnObject[TITLE_2] = ButCtrl("MenuDiv2", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "Streaming", null);
            btnObject[TITLE_2_BTN_0] = BtnCtrl("MenuDiv2", "TITLE_2_BTN_0", "", NPTZ_WORDING.wID_0021, callbackStreaming, 1);
            btnObject[TITLE_2_BTN_1] = BtnCtrl("MenuDiv2", "TITLE_2_BTN_1", "", NPTZ_WORDING.wID_0022, callbackStreaming, 2);
            btnObject[TITLE_2_BTN_2] = BtnCtrl("MenuDiv2", "TITLE_2_BTN_2", "", NPTZ_WORDING.wID_0023, callbackStreaming, 3);
            //btnObject[TITLE_2_BTN_3] = BtnCtrl("MenuDiv2", "TITLE_2_BTN_3", "", "4", callbackStreaming, 4);
            //
            // btnObject[TITLE_3] = ButCtrl("MenuDiv3", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "Touch Operation", null);
            // btnObject[TITLE_3_BTN_0] = BtnCtrl("MenuDiv3", "TITLE_3_BTN_0", "", "OFF", callbackOperation, 1);
            // btnObject[TITLE_3_BTN_1] = BtnCtrl("MenuDiv3", "TITLE_3_BTN_1", "", "Touch P/T", callbackOperation, 2);
            // btnObject[TITLE_3_BTN_2] = BtnCtrl("MenuDiv3", "TITLE_3_BTN_2", "", "Touch AF", callbackOperation, 3);
            //
            btnObject[TITLE_4] = ButCtrl("MenuDiv4", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "Zoom", null);
            btnObject[TITLE_4_BTN_0] = BtnCtrl("MenuDiv4", "TITLE_2_BTN_0", "", "OFF", callbackZoom, 1);
            btnObject[TITLE_4_BTN_1] = BtnCtrl("MenuDiv4", "TITLE_5_BTN_1", "menuBtnText2", NPTZ_WORDING.wID_0456, callbackZoom, 2);
            btnObject[TITLE_4_BTN_3] = BtnCtrl("MenuDiv4", "TITLE_5_BTN_2", "menuBtnText2", NPTZ_WORDING.wID_0457, callbackZoom, 3);
            btnObject[TITLE_4_BTN_2] = BtnCtrl("MenuDiv4", "TITLE_2_BTN_3", "", NPTZ_WORDING.wID_0412, callbackZoom, 4);
            //
            btnObject[TITLE_5] = ButCtrl("MenuDiv5", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "Stream (SRT/RTMP)", null);
            btnObject[TITLE_5_BTN] = BtnCtrl("MenuDiv5", "TITLE_5_BTN", "", NPTZ_WORDING.wID_0154, callbackStream);
            //
            // btnObject[TITLE_6] = ButCtrl("MenuDiv6", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "Setup", null);
            // btnObject[TITLE_6__P] = ButCtrl("MenuDiv6", "position-abs wth-36 hig-100 right-3", "position-abs top-30 wth-100 hig-45 font-value-1-5  text-r color-fff", "http://************** &gt", callbackShow);
            // btnObject[TITLE_6__P] = ButCtrl("MenuDiv6", "position-abs wth-36 hig-100 right-3", "position-abs top-30 wth-100 hig-45 font-value-1-5  text-r color-fff", currentServerUrl + " &gt", callbackShow);
            //
            btnObject[TITLE_7] = ButCtrl("MenuDiv7", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "LocK(WEB)", null);
            btnObject[TITLE_7_SWITCH] = BtnCtrl("MenuDiv7", "TITLE_7_SWITCH", "", "", callbackOpLocl, 1,"lock");
            //
            btnObject[TITLE_8] = ButCtrl("MenuDiv8", "position-abs wth-50 hig-100", "position-abs left-5 top-37", NPTZ_WORDING.wID_0177, null);
            btnObject[TITLE_8_SWITCH] = BtnCtrl("MenuDiv8", "TITLE_8_SWITCH", "", "", callbackColorBar, 1, "color");
            //
            btnObject[TITLE_9] = ButCtrl("MenuDiv9", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "Bar Type", null);
            btnObject[TITLE_9_BTN_0] = BtnCtrl("MenuDiv9", "TITLE_9_BTN_0", "", "Type 1", callbackType, 1);
            btnObject[TITLE_9_BTN_1] = BtnCtrl("MenuDiv9", "TITLE_9_BTN_1", "", "Type 2", callbackType, 2);
            setMenuButtonStatus();
            // buildSetupMain();
            // buildServiceMain();
            InitStreamBtn();

			if($(".power").text() == NPTZ_WORDING.wID_0166) {
                standByControlDisable();
                standbyDisable();
            } else {
                // powerUnDisable();
                // standbyUnDisable();
            }
            //btnObject[TITLE_7_SWITCH].displayOff();
            if(gPower == 1){
                getLock();
                setInterval(getLock,5000);
            }


        }else{
            rebuild();
        }
    }

    /**
     * 画面再構築処理
     */
    function rebuild() {
        setMenuButtonStatus();
        if(gPower == 1){
            getStreamBtnStatus();
        }
    }

    function callForsSetMenuButtonStatus() {
        return setMenuButtonStatus();
    }

    function setMenuButtonStatus() {
        if (btnObject[TITLE_7_SWITCH].getStatus() == Button.STATUS_ON) {
            return;
        }
        if(gPower == 1){
            btnObject[TITLE_O_BTN_0].displayOn();
            btnObject[TITLE_O_BTN_1].displayOff();

            getStreamMode();

            btnObject[TITLE_1_BTN_1].displayOn();
            btnObject[TITLE_5_BTN].displayOff();
            btnObject[TITLE_2_BTN_0].displayOn();
            btnObject[TITLE_2_BTN_1].displayOff();
            btnObject[TITLE_2_BTN_2].displayOff();
            btnObject[TITLE_9_BTN_0].displayOn();
            btnObject[TITLE_9_BTN_1].displayOn();

            if(cparam_get_UHDCrop() == 0){
                if(cparam_get_digital14_20ExtenderOffOn() == 0 && cparam_get_digitalZoomDisableEnable() == 0 ){
                    btnObject[TITLE_4_BTN_0].displayOn();
                    btnObject[TITLE_4_BTN_1].displayOff();
                    btnObject[TITLE_4_BTN_3].displayOff();
                    btnObject[TITLE_4_BTN_2].displayOff();
                }else if(cparam_get_digital14_20ExtenderOffOn() == 1){
                    btnObject[TITLE_4_BTN_0].displayOff();
                    btnObject[TITLE_4_BTN_1].displayOn();
                    btnObject[TITLE_4_BTN_3].displayOff();
                    btnObject[TITLE_4_BTN_2].displayOff();
                }else if(cparam_get_digital14_20ExtenderOffOn() == 2){
                    btnObject[TITLE_4_BTN_0].displayOff();
                    btnObject[TITLE_4_BTN_1].displayOff();
                    btnObject[TITLE_4_BTN_3].displayOn();
                    btnObject[TITLE_4_BTN_2].displayOff();
                }
                else if (cparam_get_digitalZoomDisableEnable() == 1){
                    btnObject[TITLE_4_BTN_0].displayOff();
                    btnObject[TITLE_4_BTN_1].displayOff();
                    btnObject[TITLE_4_BTN_3].displayOff();
                    btnObject[TITLE_4_BTN_2].displayOn();
                    d_ExtbtnOn_ZOOM();
                } else {
                    btnObject[TITLE_4_BTN_0].displayOff();
                    btnObject[TITLE_4_BTN_1].displayOff();
                    btnObject[TITLE_4_BTN_3].displayOff();
                    btnObject[TITLE_4_BTN_2].displayOff();
                }
            }else{
                btnObject[TITLE_4_BTN_0].displayOff();
                btnObject[TITLE_4_BTN_1].displayOff();
                btnObject[TITLE_4_BTN_3].displayOff();
                btnObject[TITLE_4_BTN_2].displayOff();
                btnObject[TITLE_4_BTN_0].displayDisabled();
                btnObject[TITLE_4_BTN_1].displayDisabled();
                btnObject[TITLE_4_BTN_3].displayDisabled();
                btnObject[TITLE_4_BTN_2].displayDisabled();
            }

            btnObject[TITLE_7_SWITCH].displayOff();
            // var currentLock = parseInt(cparam_get_remoteUnLockSetting().substring(0, 1), 10);
            // if(currentLock == 0 && btnObject[TITLE_7_SWITCH].getStatus() != Button.STATUS_ON){
            //     btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);
            //     btnObject[TITLE_7_SWITCH].displayOff();
            // }else if(currentLock == 1){
            //     btnObject[TITLE_7].set(NPTZ_WORDING.wID_0448);
            //     btnObject[TITLE_7_SWITCH].displayOn();
            // }else if(btnObject[TITLE_7_SWITCH].getStatus() == Button.STATUS_ON){
            //     btnObject[TITLE_7_SWITCH].displayOn();
            //     btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);
            // }

            if(cparam_get_bar() == 0 ) {
                btnObject[TITLE_8_SWITCH].displayOff();

                btnObject[TITLE_9_BTN_0].displayDisabled();
                btnObject[TITLE_9_BTN_1].displayDisabled();
            }else{
                btnObject[TITLE_8_SWITCH].displayOn();
                if(cparam_get_colorBarType() == 0){
                    btnObject[TITLE_9_BTN_0].displayOff();
                    btnObject[TITLE_9_BTN_1].displayOn();
                }else{
                    btnObject[TITLE_9_BTN_0].displayOn();
                    btnObject[TITLE_9_BTN_1].displayOff();
                }
            }
            if(gCurrentStreamMode =="rtmp"|| gCurrentStreamMode == 'srt_h264' || gCurrentStreamMode == 'srt_h264_uhd' || gCurrentStreamMode == 'srt_h265' || gCurrentStreamMode == 'srt_h265_uhd'){
                btnObject[TITLE_5_BTN].displayOff();
            }else{
                btnObject[TITLE_5_BTN].displayDisabled();
            }

        }else{
            btnObject[TITLE_O_BTN_0].displayOff();
            btnObject[TITLE_O_BTN_1].displayOn();

            btnObject[TITLE_1_BTN_1].displayDisabled();
            btnObject[TITLE_2_BTN_0].displayDisabled();
            btnObject[TITLE_2_BTN_1].displayDisabled();
            btnObject[TITLE_2_BTN_2].displayDisabled();

            btnObject[TITLE_4_BTN_0].displayDisabled();
            btnObject[TITLE_4_BTN_1].displayDisabled();
            btnObject[TITLE_4_BTN_3].displayDisabled();
            btnObject[TITLE_4_BTN_2].displayDisabled();

            btnObject[TITLE_8_SWITCH].displayDisabled();

            btnObject[TITLE_5_BTN].displayDisabled();
            btnObject[TITLE_7_SWITCH].displayDisabled();
        }


    }

    function callbackPower(e, index) {
        if (e == Button.TOUCHSTART) {
            if( $(".TITLE_O_BTN_0").hasClass("disable") ||
                $(".TITLE_O_BTN_1").hasClass("disable")){
                return false;
            }
            if (index == 1) {
                btnObject[TITLE_O_BTN_0].displayOn();
                btnObject[TITLE_O_BTN_1].displayOff();
                cparam_set_powerOnStandby(1);
                $(".power").empty();
                $(".power").html(NPTZ_WORDING.wID_0165);
                standbyUnDisable();
                $("#jqmLayerMenu").hide();
                $("#jqmLayerAll").hide();
                LayerPortrait.initLiveView(giJpegResol);
                sessionStorage.sessionindex = 0;
                // refreshDiv();
            } else {
                btnObject[TITLE_O_BTN_0].displayOff();
                btnObject[TITLE_O_BTN_1].displayOn();
                cparam_set_powerOnStandby(0);
                $(".power").empty();
                $(".power").html(NPTZ_WORDING.wID_0166);
                standbyDisable();
                $("#jqmLayerMenu").hide();
                $("#jqmLayerAll").hide();
                LayerPortrait.initLiveView(giJpegResol);
                sessionStorage.sessionindex = 0;
                // refreshDiv();
            }
        }
    }
    function refreshDiv() {
        window.location.reload();
    }
    function standbyDisable() {
        $(".border-bottom-1").css("color", "rgb(102,102,102)");
        $(".menuBtnText").css("color", "rgb(102,102,102)");
        $(".menuBtnText2").css("color", "rgb(102,102,102)");
        //不具合管理 #3815
        $("#button_power").find("span").eq(0).removeAttr("style");
        $("#button_standy").find("span").eq(0).removeAttr("style");

        btnObject[TITLE_1_BTN_1].displayDisabled();
        btnObject[TITLE_2_BTN_0].displayDisabled();
        btnObject[TITLE_2_BTN_1].displayDisabled();
        btnObject[TITLE_2_BTN_2].displayDisabled();
        // btnObject[TITLE_3_BTN_0].displayDisabled();
        // btnObject[TITLE_3_BTN_1].displayDisabled();
        // btnObject[TITLE_3_BTN_2].displayDisabled();
        btnObject[TITLE_4_BTN_0].displayDisabled();
        btnObject[TITLE_4_BTN_1].displayDisabled();
        btnObject[TITLE_4_BTN_3].displayDisabled();
        btnObject[TITLE_4_BTN_2].displayDisabled();
        btnObject[TITLE_5_BTN].displayDisabled();
        $(".text-r color-fff").css("color", "rgb(102,102,102)");
        $(".TITLE_8_SWITCH off").css("color", "rgb(102,102,102)");
        btnObject[TITLE_9_BTN_0].displayDisabled();
        btnObject[TITLE_9_BTN_1].displayDisabled();
        $("#lock").addClass("disable");
        $("#color").addClass("disable");
    }

    function standbyUnDisable() {
        btnObject[TITLE_1_BTN_1].displayOff();
        btnObject[TITLE_2_BTN_0].displayOff();
        btnObject[TITLE_2_BTN_1].displayOff();
        btnObject[TITLE_2_BTN_2].displayOn();
        // btnObject[TITLE_3_BTN_0].displayOff();
        // btnObject[TITLE_3_BTN_1].displayOn();
        // btnObject[TITLE_3_BTN_2].displayOff();
        btnObject[TITLE_4_BTN_0].displayOn();
        btnObject[TITLE_4_BTN_1].displayOff();
        btnObject[TITLE_4_BTN_3].displayOff();
        btnObject[TITLE_4_BTN_2].displayOff();
        btnObject[TITLE_5_BTN].displayOff();
        btnObject[TITLE_7_SWITCH].displayOff();
        btnObject[TITLE_8_SWITCH].displayOff();
        btnObject[TITLE_9_BTN_0].displayOff();
        btnObject[TITLE_9_BTN_1].displayOff();
    }

    function callbackCompression(e, index) {
        if (e == Button.TOUCHSTART) {
            if($(".TITLE_1_BTN_1").hasClass("disable")){
                return false;
            }
            if (index == 1) {
                //btnObject[TITLE_1_BTN_0].displayOn();
                btnObject[TITLE_1_BTN_1].displayOn();
            } else {
                //btnObject[TITLE_1_BTN_0].displayOff();
                btnObject[TITLE_1_BTN_1].displayOn();
            }
        }
    }

    var streamIndex = "1";

    function callbackStreaming(e, index) {

        if (e == Button.TOUCHSTART) {
            // if( $(".TITLE_2_BTN_0").hasClass("disable") ||
            //     $(".TITLE_2_BTN_1").hasClass("disable") ||
            //     $(".TITLE_2_BTN_2").hasClass("disable")){
            //     return false;
            // }
            var stream = "";
            var gFramerate ;
            if (index == 1) {
                if( $(".TITLE_2_BTN_0").hasClass("disable") ){
                    return false;
                }
                if(btnObject[TITLE_2_BTN_1].getStatus() == Button.STATUS_DISABLED){
                    btnObject[TITLE_2_BTN_1].displayDisabled();
                } else {
                    btnObject[TITLE_2_BTN_1].displayOff();
                }

                if(btnObject[TITLE_2_BTN_2].getStatus() == Button.STATUS_DISABLED){
                    btnObject[TITLE_2_BTN_2].displayDisabled();
                } else {
                    btnObject[TITLE_2_BTN_2].displayOff();
                }

                btnObject[TITLE_2_BTN_0].displayOn();

                // btnObject[TITLE_2_BTN_0].displayOn();
                // btnObject[TITLE_2_BTN_1].displayOff();
                // btnObject[TITLE_2_BTN_2].displayOff();
                giJpegResol = giJpegStream1Resol;
                stream = "";
                gFramerate = objVOIP.jpeg_interval1;
                streamIndex = "1";
            } else if (index == 2) {


                if( $(".TITLE_2_BTN_1").hasClass("disable") ){
                    return false;
                }
                if(btnObject[TITLE_2_BTN_0].getStatus() == Button.STATUS_DISABLED){
                    btnObject[TITLE_2_BTN_0].displayDisabled();
                } else {
                    btnObject[TITLE_2_BTN_0].displayOff();
                }

                if(btnObject[TITLE_2_BTN_2].getStatus() == Button.STATUS_DISABLED){
                    btnObject[TITLE_2_BTN_2].displayDisabled();
                } else {
                    btnObject[TITLE_2_BTN_2].displayOff();
                }

                btnObject[TITLE_2_BTN_1].displayOn();
                giJpegResol = giJpegStream2Resol;
                stream = "_2";
                gFramerate = objVOIP.jpeg_interval2;
                streamIndex = "2";
            } else if (index == 3) {
                if( $(".TITLE_2_BTN_2").hasClass("disable") ){
                    return false;
                }
                if(btnObject[TITLE_2_BTN_0].getStatus() == Button.STATUS_DISABLED){
                    btnObject[TITLE_2_BTN_0].displayDisabled();
                } else {
                    btnObject[TITLE_2_BTN_0].displayOff();
                }

                if(btnObject[TITLE_2_BTN_1].getStatus() == Button.STATUS_DISABLED){
                    btnObject[TITLE_2_BTN_1].displayDisabled();
                } else {
                    btnObject[TITLE_2_BTN_1].displayOff();
                }

                btnObject[TITLE_2_BTN_2].displayOn();
                giJpegResol = giJpegStream3Resol;
                stream = "_3";
                gFramerate = objVOIP.jpeg_interval3;
                streamIndex = "3";
            }
            $.get("/cgi-bin/jpeg?connect=stop&UID=" + (StreamInfo.UID));
            initMainView(stream,gFramerate,giJpegResol);
        }
    }

    // function callbackOperation(e, index) {
    //     if (e == Button.TOUCHSTART) {
    //         if( $(".TITLE_3_BTN_0").hasClass("disable") ||
    //             $(".TITLE_3_BTN_1").hasClass("disable") ||
    //             $(".TITLE_3_BTN_2").hasClass("disable")){
    //             return false;
    //         }
    //         if (index == 1) {
    //             btnObject[TITLE_3_BTN_0].displayOn();
    //             btnObject[TITLE_3_BTN_1].displayOff();
    //             btnObject[TITLE_3_BTN_2].displayOff();
    //             $("#jqmtopPT").empty();
    //         } else if (index == 2) {
    //             if (btnObject[TITLE_3_BTN_1].getStatus() != Button.STATUS_ON) {
    //                 btnObject[TITLE_3_BTN_1].displayOn();
    //                 btnObject[TITLE_3_BTN_2].displayOff();
    //                 btnObject[TITLE_3_BTN_0].displayOff();
    //                 $("#jqmtopPT").empty();
    //                 $("#jqmtopPT").html("Touch P/T");
    //             }
    //         } else if (index == 3) {
    //             if (btnObject[TITLE_3_BTN_2].getStatus() != Button.STATUS_ON) {
    //                 btnObject[TITLE_3_BTN_0].displayOff();
    //                 btnObject[TITLE_3_BTN_1].displayOff();
    //                 btnObject[TITLE_3_BTN_2].displayOn();
    //                 $("#jqmtopPT").empty();
    //                 $("#jqmtopPT").html("Touch AF");
    //             }
    //         }
    //         sessionStorage.touchIndex = index;
    //     }
    // }

    function callbackZoom(e, index) {
        if (e == Button.TOUCHSTART) {
            if( $(".TITLE_4_BTN_0").hasClass("disable") ||
                $(".TITLE_4_BTN_2").hasClass("disable")){
                return false;
            }
            if (index == 1) {
                btnObject[TITLE_4_BTN_0].displayOn();
                btnObject[TITLE_4_BTN_1].displayOff();
                btnObject[TITLE_4_BTN_3].displayOff();
                btnObject[TITLE_4_BTN_2].displayOff();
                // cparam_set_digitalExtenderOffOn(0);
                cparam_set_digitalZoomDisableEnable(0);
                cparam_set_digital14_20ExtenderOffOn(0);
                //DZoomAndDextStatusChange(2);
                if (btnObject[TITLE_4_BTN_0].getStatus() == Button.STATUS_ON) {
                    d_ExtbtnOff();
                    //  $(".idZoom").html("ZOOM");
                    // // $(".idZoom").css("background-color","#00");
                    //  $(".idZoom").attr("style","");
                }
            } else if (index == 2) {
                btnObject[TITLE_4_BTN_0].displayOff();
                btnObject[TITLE_4_BTN_1].displayOn();
                btnObject[TITLE_4_BTN_3].displayOff();
                btnObject[TITLE_4_BTN_2].displayOff();
                if (btnObject[TITLE_4_BTN_1].getStatus() == Button.STATUS_ON) {
                    cparam_set_digital14_20ExtenderOffOn(1);
                    //DZoomAndDextStatusChange(1);
                    d_ExtbtnOn();
                    DigitalExt = 1;
                    //     $(".idZoom").html("D-Ext");
                    //     $(".idZoom").css("background-color","red");
                    //     $(".idZoom").css("color","white");
                }
            } else if (index == 3) {
                btnObject[TITLE_4_BTN_0].displayOff();
                btnObject[TITLE_4_BTN_1].displayOff();
                btnObject[TITLE_4_BTN_3].displayOn();
                btnObject[TITLE_4_BTN_2].displayOff();
                if (btnObject[TITLE_4_BTN_3].getStatus() == Button.STATUS_ON) {
                    cparam_set_digital14_20ExtenderOffOn(2);
                    //DZoomAndDextStatusChange(1);
                    d_ExtbtnOn2();
                    DigitalExt = 1;
                    //     $(".idZoom").html("D-Ext");
                    //     $(".idZoom").css("background-color","red");
                    //     $(".idZoom").css("color","white");
                }
            } else if (index == 4){
                btnObject[TITLE_4_BTN_0].displayOff();
                btnObject[TITLE_4_BTN_1].displayOff();
                btnObject[TITLE_4_BTN_2].displayOn();
                btnObject[TITLE_4_BTN_3].displayOff();
                if (btnObject[TITLE_4_BTN_2].getStatus() == Button.STATUS_ON) {
                    cparam_set_digitalZoomDisableEnable(1);
                    // DZoomAndDextStatusChange(3);
                    d_ExtbtnOn_ZOOM();
                    //  $(".idZoom").html("D-Zoom");
                    //  $(".idZoom").css("background-color","red");
                    //  $(".idZoom").css("color","white");
                }
            }
        }

    }

    /**
     *「D-Zoom」ボタン押下時の画面制御
     * @param mouse
     */
    function DZoomAndDextStatusChange(flg){
        if(flg == 1){
            btnObject[TITLE_4_BTN_2].displayOn();
            btnObject[TITLE_4_BTN_1].displayDisabled();
            btnObject[TITLE_4_BTN_0].displayOff();
        }else if(flg == 2){
            btnObject[TITLE_4_BTN_2].displayOff();
            btnObject[TITLE_4_BTN_1].displayOff();
            btnObject[TITLE_4_BTN_0].displayOn();
        }else if(flg == 3){
            btnObject[TITLE_4_BTN_2].displayOff();
            btnObject[TITLE_4_BTN_1].displayOn();
            btnObject[TITLE_4_BTN_0].displayOff();
        }
    }


    function d_ExtbtnOn() {
        btnObject[TITLE_4_BTN_1].displayOn();
        btnObject[TITLE_4_BTN_2].displayOff();
    }
    function d_ExtbtnOn2() {
        btnObject[TITLE_4_BTN_3].displayOn();
        btnObject[TITLE_4_BTN_2].displayOff();
    }
    function d_ExtbtnOn_ZOOM() {
        btnObject[TITLE_4_BTN_1].displayDisabled();
        btnObject[TITLE_4_BTN_3].displayDisabled();
        // $(".TITLE_4_BTN_1").hasClass("disable");
        btnObject[TITLE_4_BTN_2].displayOn();
    }

    function d_ExtbtnOff() {
        btnObject[TITLE_4_BTN_1].displayOff();
        btnObject[TITLE_4_BTN_0].displayOn();
    }

    function lockDisable() {
        LayerFunctionMain.setZoomValue('------');
        // $('#divZoomValue').empty();
        // $('#divZoomValue').set('------');
        $(".zoomT").addClass("disable");
        $(".zoomW").addClass("disable");
        $(".zoomSpeed").addClass("disable");
        $(".pcscreen").addClass("disable");
        $(".speedNum").addClass("disable");
        $(".home").addClass("disable");
        $(".iris").addClass("disable");
        $(".positionFocus").addClass("disable");
        $(".leftUp").addClass("disable");
        $(".Up").addClass("disable");
        $(".rightUp").addClass("disable");
        $(".left").addClass("disable");
        $(".right").addClass("disable");
        $(".leftDown").addClass("disable");
        $(".down").addClass("disable");
        $(".rightDown").addClass("disable");
        $(".center").addClass("disable");
        $("#addSlide").addClass("swiper-no-swiping");
        $(".Start").hide();
        $(".irisAutoMenu").addClass("disable");
        $('#divIrisValue').empty();
        $('#divIrisValue').append($('<p>Iris</p><p>' + NPTZ_WORDING.wID_0167 + '</p>'));
        //left side
        $(".speedFast").addClass("disable");
        $(".speedSlow").addClass("disable");
        $(".zoom").addClass("disable");
        //right side
        $(".divIrisFar").addClass("disable");
        $(".divIrisNear").addClass("disable");
        $(".irisPtzMenu").addClass("disable");
        $(".focusPtzMenu").addClass("disable");
        $(".focusAutoMenu").addClass("disable");
        $('#divFocusValue').empty();
        $('#divFocusValue').append($('<p>Focus</p><p>' +  NPTZ_WORDING.wID_0167 + '</p>'));
        $('.zoomDraggableMove').addClass('disable');
        $('.zoomDraggableMove').on({cancel: ['.zoomDraggableMove']});
        $(".zoomDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $('.speedDraggableMove').addClass('disable');
        $('.speedDraggableMove').on({cancel: ['.speedDraggableMove']});
        $(".speedDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $('.focusDraggableMove').addClass('disable');
        $('.focusDraggableMove').on({cancel: ['.focusDraggableMove']});
        $(".focusDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $('.irisDraggableMove').addClass('disable');
        $('.irisDraggableMove').on({cancel: ['.irisDraggableMove']});
        $(".irisDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $("img[src='/css/mobile/parts/slider_knob_normal.png']").attr('src','/css/mobile/parts/slider_knob_disable.png');
        $("img[src='/css/mobile/parts/ptz_knob_normal.png']").attr('src','/css/mobile/parts/ptz_knob_disable.png');
        $(".divFocusFar").addClass("disable");
        $(".divFocusNear").addClass("disable");

        for (var i = 0; i < 100; i++) {
            $("#t_" + i).find("span").eq(0).css("color", "#A4A4A4");
        }

    }

    function standByControlDisable() {
        LayerFunctionMain.setZoomValue('------');
        // $('#divZoomValue').empty();
        // $('#divZoomValue').set('------');
        $(".zoomT").addClass("disable");
        $(".zoomW").addClass("disable");
        $(".zoomSpeed").addClass("disable");
        $(".speedNum").addClass("disable");
        $(".home").addClass("disable");
        $(".iris").addClass("disable");
        $(".positionFocus").addClass("disable");
        $(".leftUp").addClass("disable");
        $(".Up").addClass("disable");
        $(".rightUp").addClass("disable");
        $(".left").addClass("disable");
        $(".right").addClass("disable");
        $(".leftDown").addClass("disable");
        $(".down").addClass("disable");
        $(".rightDown").addClass("disable");
        $(".center").addClass("disable");
        $("#addSlide").addClass("swiper-no-swiping");
        $(".Start").hide();
        $(".irisAutoMenu").addClass("disable");
        //left side
        $(".speedFast").addClass("disable");
        $(".speedSlow").addClass("disable");
        $(".zoom").addClass("disable");
        //right side
        $(".divIrisFar").addClass("disable");
        $(".divIrisNear").addClass("disable");
        $(".irisPtzMenu").addClass("disable");
        $(".focusPtzMenu").addClass("disable");
        $(".focusAutoMenu").addClass("disable");
        $('.zoomDraggableMove').addClass('disable');
        $('.zoomDraggableMove').on({cancel: ['.zoomDraggableMove']});
        $(".zoomDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $('.speedDraggableMove').addClass('disable');
        $('.speedDraggableMove').on({cancel: ['.speedDraggableMove']});
        $(".speedDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $('.focusDraggableMove').addClass('disable');
        $('.focusDraggableMove').on({cancel: ['.focusDraggableMove']});
        $(".focusDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $('.irisDraggableMove').addClass('disable');
        $('.irisDraggableMove').on({cancel: ['.irisDraggableMove']});
        $(".irisDraggableColor").removeClass("back-color-ff0").addClass( "back-color-7C0");
        $("img[src='/css/mobile/parts/slider_knob_normal.png']").attr('src','/css/mobile/parts/slider_knob_disable.png');
        $("img[src='/css/mobile/parts/ptz_knob_normal.png']").attr('src','/css/mobile/parts/ptz_knob_disable.png');
        $(".divFocusFar").addClass("disable");
        $(".divFocusNear").addClass("disable");
    }

    function lockUnDisable() {
        $(".divFocusFar").removeClass("disable");
        $(".divFocusNear").removeClass("disable");
        $(".zoomT").removeClass("disable");
        $(".zoomW").removeClass("disable");
        $(".zoomSpeed").removeClass("disable");
        $(".pcscreen").removeClass("disable");
        $(".speedNum").removeClass("disable");
        $(".home").removeClass("disable");
        $(".iris").removeClass("disable");
        $(".positionFocus").removeClass("disable");
        $(".leftUp").removeClass("disable");
        $(".Up").removeClass("disable");
        $(".rightUp").removeClass("disable");
        $(".left").removeClass("disable");
        $(".right").removeClass("disable");
        $(".leftDown").removeClass("disable");
        $(".down").removeClass("disable");
        $(".rightDown").removeClass("disable");
        $(".center").removeClass("disable");
        //left side
        $(".speedFast").removeClass("disable");
        $(".speedSlow").removeClass("disable");
        $(".zoom").removeClass("disable");
        //right side
        $(".divIrisFar").removeClass("disable");
        $(".divIrisNear").removeClass("disable");
        $(".irisPtzMenu").removeClass("disable");
        $(".focusPtzMenu").removeClass("disable");
        $(".focusAutoMenu").removeClass("disable");
        $('.zoomDraggableMove').removeClass('disable');
        $('.zoomDraggableMove').on({cancel: ['']});
        $(".zoomDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $('.speedDraggableMove').removeClass('disable');
        $('.speedDraggableMove').on({cancel: ['']});
        $(".speedDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $('.focusDraggableMove').removeClass('disable');
        $('.focusDraggableMove').on({cancel: ['']});
        $(".focusDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $('.irisDraggableMove').removeClass('disable');
        $('.irisDraggableMove').on({cancel: ['']});
        $(".irisDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $("img[src='/css/mobile/parts/slider_knob_disable.png']").attr('src','/css/mobile/parts/slider_knob_normal.png');
        $("img[src='/css/mobile/parts/ptz_knob_disable.png']").attr('src','/css/mobile/parts/ptz_knob_normal.png');
        $("#addSlide").removeClass("swiper-no-swiping");
        for (var i = 0; i < 100; i++) {
            if(presetIdListAll[100-(i+1)]==1){
                $("#t_" + i).find("span").eq(0).css("color", "rgb(74, 241, 8)");
            }else{
                $("#t_" + i).find("span").eq(0).css("color", "#A4A4A4");
            }

        }
    }

    function powerUnDisable() {
        $(".divFocusFar").removeClass("disable");
        $(".divFocusNear").removeClass("disable");
        $(".zoomT").removeClass("disable");
        $(".zoomW").removeClass("disable");
        $(".zoomSpeed").removeClass("disable");
        $(".pcscreen").removeClass("disable");
        $(".speedNum").removeClass("disable");
        $(".iris").removeClass("disable");
        $(".positionFocus").removeClass("disable");
        $(".leftUp").removeClass("disable");
        $(".Up").removeClass("disable");
        $(".rightUp").removeClass("disable");
        $(".left").removeClass("disable");
        $(".right").removeClass("disable");
        $(".leftDown").removeClass("disable");
        $(".down").removeClass("disable");
        $(".rightDown").removeClass("disable");
        $(".center").removeClass("disable");
        //left side
        $(".speedFast").removeClass("disable");
        $(".speedSlow").removeClass("disable");
        $(".zoom").removeClass("disable");
        //right side
        $(".divIrisFar").removeClass("disable");
        $(".divIrisNear").removeClass("disable");
        $(".irisPtzMenu").removeClass("disable");
        $(".focusPtzMenu").removeClass("disable");
        $(".focusAutoMenu").removeClass("disable");
        $('.zoomDraggableMove').removeClass('disable');
        $('.zoomDraggableMove').on({cancel: ['']});
        $(".zoomDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $('.speedDraggableMove').removeClass('disable');
        $('.speedDraggableMove').on({cancel: ['']});
        $(".speedDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $('.focusDraggableMove').removeClass('disable');
        $('.focusDraggableMove').on({cancel: ['']});
        $(".focusDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $('.irisDraggableMove').removeClass('disable');
        $('.irisDraggableMove').on({cancel: ['']});
        $(".irisDraggableColor").removeClass("back-color-7C0").addClass("back-color-ff0");
        $("img[src='/css/mobile/parts/slider_knob_disable.png']").attr('src','/css/mobile/parts/slider_knob_normal.png');
        $("img[src='/css/mobile/parts/ptz_knob_disable.png']").attr('src','/css/mobile/parts/ptz_knob_normal.png');
        $("#addSlide").removeClass("swiper-no-swiping");

    }
    var lockFlg = false;

    function callbackOpLocl(e) {
        if (e == Button.TOUCHSTART) {
            if($("#lock").hasClass("disable")){
                return;
            }
            var LockCurrent = parseInt(cparam_get_remoteUnLockSetting().substring(0, 1), 10);

            if( btnObject[TITLE_7_SWITCH].getStatus() == Button.STATUS_ON && LockCurrent == 1){
                lockFlg = false;
                btnObject[TITLE_7_SWITCH].displayOff();
                btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);
                cparam_set_remoteUnLockSetting();

                setMenuButtonStatus();
                InitStreamBtn();
                menuBtnDisplayOff();
                lockUnDisable();
                getStreamBtnStatus();
            }else if( btnObject[TITLE_7_SWITCH].getStatus() == Button.STATUS_ON && LockCurrent == 0){
                lockFlg = false;
                btnObject[TITLE_7_SWITCH].displayOff();
                btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);

                setMenuButtonStatus();
                InitStreamBtn();
                menuBtnDisplayOff();
                lockUnDisable();
                getStreamBtnStatus();
            }else{
                lockFlg = true;
                btnObject[TITLE_7_SWITCH].displayOn();
                btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);
                BtnDisabled();
                $("#color").addClass("disable");
                lockDisable();
            }
        }
    }

    function getLock(){
        try {
            var currentLock = parseInt(reqCgiObj.currentLock.substring(0, 1), 10);
            if(currentLock == 1){
                lockFlg = false;
            }
            if(lockFlg){
                if(currentLock == 0){
                    btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);
                    btnObject[TITLE_7_SWITCH].displayOn();
                }
            }else{
                if(currentLock == 0 && btnObject[TITLE_7_SWITCH].getStatus() != Button.STATUS_ON){
                    btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);
                    btnObject[TITLE_7_SWITCH].displayOff();
                }else if(currentLock == 1){
                    btnObject[TITLE_7].set(NPTZ_WORDING.wID_0448);
                    btnObject[TITLE_7_SWITCH].displayOn();

                    BtnDisabled();
                    $("#color").addClass("disable");
                    lockDisable();

                }else if(btnObject[TITLE_7_SWITCH].getStatus() == Button.STATUS_ON){
                    btnObject[TITLE_7_SWITCH].displayOff();
                    btnObject[TITLE_7].set(NPTZ_WORDING.wID_0428);



                    setMenuButtonStatus();
                    InitStreamBtn();
                    menuBtnDisplayOff();
                    lockUnDisable();
                    getStreamBtnStatus();
                }
            }
        } catch (e){

        }
    }

    function show() {
        btnObject[TITLE_O_BTN_0].displayOn();
        btnObject[TITLE_O_BTN_1].displayOff();
        //btnObject[TITLE_1_BTN_0].displayOn();
        btnObject[TITLE_1_BTN_1].displayOn();
        btnObject[TITLE_2_BTN_0].displayOff();
        btnObject[TITLE_2_BTN_1].displayOff();
        btnObject[TITLE_2_BTN_2].displayOn();
        //btnObject[TITLE_2_BTN_3].displayOff();
        // btnObject[TITLE_3_BTN_0].displayOff();
        // btnObject[TITLE_3_BTN_1].displayOn();
        // btnObject[TITLE_3_BTN_2].displayOff();
        btnObject[TITLE_4_BTN_0].displayOn();
        btnObject[TITLE_4_BTN_1].displayOff();
        btnObject[TITLE_4_BTN_2].displayOff();
        btnObject[TITLE_4_BTN_3].displayOff();
        btnObject[TITLE_5_BTN].displayOff();
        btnObject[TITLE_7_SWITCH].displayOff();
        btnObject[TITLE_8_SWITCH].displayOff();
        btnObject[TITLE_9_BTN_0].displayOff();
        btnObject[TITLE_9_BTN_1].displayOff();
    }

    /**
     * Button Disabled
     */
    function BtnDisabled() {
        $(".border-bottom-1").css("color", "rgb(102,102,102)");
        $(".menuBtnText").css("color", "rgb(102,102,102)");
        $(".menuBtnText2").css("color", "rgb(102,102,102)");
        btnObject[TITLE_O_BTN_0].displayDisabled();
        btnObject[TITLE_O_BTN_1].displayDisabled();
        //btnObject[TITLE_1_BTN_0].displayDisabled();
        btnObject[TITLE_1_BTN_1].displayDisabled();
        btnObject[TITLE_2_BTN_0].displayDisabled();
        btnObject[TITLE_2_BTN_1].displayDisabled();
        btnObject[TITLE_2_BTN_2].displayDisabled();
        //btnObject[TITLE_2_BTN_3].displayDisabled();
        // btnObject[TITLE_3_BTN_0].displayDisabled();
        // btnObject[TITLE_3_BTN_1].displayDisabled();
        // btnObject[TITLE_3_BTN_2].displayDisabled();
        btnObject[TITLE_4_BTN_0].displayDisabled();
        btnObject[TITLE_4_BTN_1].displayDisabled();
        btnObject[TITLE_4_BTN_2].displayDisabled();
        btnObject[TITLE_4_BTN_3].displayDisabled();
        btnObject[TITLE_5_BTN].displayDisabled();
        $(".text-r color-fff").css("color", "rgb(102,102,102)");
        $(".TITLE_8_SWITCH off").css("color", "rgb(102,102,102)");
        btnObject[TITLE_9_BTN_0].displayDisabled();
        btnObject[TITLE_9_BTN_1].displayDisabled();
    }

    /**
     * Button Disabled
     */
    function menuBtnDisplayOff() {
        $(".border-bottom-1").css("color", "rgb(102,102,102)");
        $(".menuBtnText").removeAttr("style");
        $(".menuBtnText2").removeAttr("style");
    }

    function callbackColorBar(e) {
        if (e == Button.TOUCHSTART) {

            if($("#color").hasClass("disable")){
                return false;
            }
            if($(".TITLE_8_SWITCH").is('.off')){
                btnObject[TITLE_8_SWITCH].displayOn();
                _cparam_awCmd_NoData_sendRequset("DCB:1");

                if(cparam_get_colorBarType() == 0) {
                    btnObject[TITLE_9_BTN_0].displayOff();
                    btnObject[TITLE_9_BTN_1].displayOn();
                } else {
                    btnObject[TITLE_9_BTN_0].displayOn();
                    btnObject[TITLE_9_BTN_1].displayOff();
                }

            }else{
                btnObject[TITLE_8_SWITCH].displayOff();
                _cparam_awCmd_NoData_sendRequset("DCB:0");
                btnObject[TITLE_9_BTN_0].displayOn();
                btnObject[TITLE_9_BTN_1].displayOn();
                btnObject[TITLE_9_BTN_0].displayDisabled();
                btnObject[TITLE_9_BTN_1].displayDisabled();
            }
        }
    }
    
    function callbackType(e, index) {
        if (e == Button.TOUCHSTART) {
            if( $(".TITLE_9_BTN_0").hasClass("disable") ||
                $(".TITLE_9_BTN_1").hasClass("disable")){
                return false;
            }
            if (index == 1) {
                btnObject[TITLE_9_BTN_0].displayOn();
                btnObject[TITLE_9_BTN_1].displayOff();
                // _cparam_awCmd_NoData_sendRequset("OSD:BA:1");
                cparam_set_colorBarType(1);
            } else {
                btnObject[TITLE_9_BTN_0].displayOff();
                btnObject[TITLE_9_BTN_1].displayOn();
                // _cparam_awCmd_NoData_sendRequset("OSD:BA:0");
                cparam_set_colorBarType(0);
            }
        }
    }

    function callbackStream(e) {
        if (e == Button.TOUCHEND) {
            if($(".TITLE_5_BTN").hasClass("disable")){
                return false;
            }
            LayerFunctionMain.getStreamBtnObj().displayOff();
            //LayerFunctionMain.getStreamStartBtnOjb().show();
           // LayerFunctionMain.getStreamStartBtnOjb().displayOff();
            $("#divStream").show();
            $("#divStream").html("Stream(SRT/RTMP)");
            //LayerFunctionMain.getStreamStartTxtObj.show();
            $("#jqmLayerMenu").hide();
            $("img[src='/css/mobile/parts/liveMenu.png']").attr('src','/css/mobile/parts/liveMenuHide.png');
            $(".Start").show();
            $(".Start").addClass('off');
            $(".Start").addClass('text-c');
            $(".txt_show_title").hide();
            $(".power").hide();
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
            //setRtmpButtonState();
        }
    }


    function callbackShow(e, index) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerMenu").hide();
            $("#jqmLayerSet").show();
            // showSetView();
        }
    }

    function callbackTitle(e, index) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerMenu").hide();
            LayerPortrait.initLiveView(giJpegResol);
        }
    }

    function callbackSetupTitle(e, index) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSet").hide();
            $("#jqmLayerMenu").show();
            // updateSetupValue();
            LayerPortrait.initLiveView(giJpegResol);
        }
    }

    /**
     * init the left page
     */
    function InitStreamBtn() {
        // if (gsDefaultStream.indexOf("jpeg") == 0) {
        //     gsCodec = "jpeg";
        //     gsJpegStream = gsDefaultStream;
        // }
        // else {
        //     gsCodec = gvCodec[giStMode][0];
        // }

        DispJpegStream();

        // if (gPower == 0) {
        //     //menubarBtnDisabled();
        //     gFlgStopViewLoading = 1;
        //     document.getElementById("mainViewHtml").src = "/live/mainview_standby.html";
        // } else {
        //
        // }

        giJpegEnv3[giStMode] == 0 ? btnObject[TITLE_2_BTN_2].displayDisabled() : true;
        giJpegEnv2[giStMode] == 0 ? btnObject[TITLE_2_BTN_1].displayDisabled() : true;
        giJpegEnv[giStMode] == 0 ? btnObject[TITLE_2_BTN_0].displayDisabled() : true;

    }

    function getStreamBtnStatus(){
        btnObject[TITLE_2_BTN_0].displayOff();
        btnObject[TITLE_2_BTN_1].displayOff();
        btnObject[TITLE_2_BTN_2].displayOff();
        giJpegEnv3[giStMode] == 0 ? btnObject[TITLE_2_BTN_2].displayDisabled() : true;
        giJpegEnv2[giStMode] == 0 ? btnObject[TITLE_2_BTN_1].displayDisabled() : true;
        giJpegEnv[giStMode] == 0 ? btnObject[TITLE_2_BTN_0].displayDisabled() : true;
        if(streamIndex == "1"){
            btnObject[TITLE_2_BTN_0].displayOn();
        }else if(streamIndex == "2"){
            btnObject[TITLE_2_BTN_1].displayOn();
        }else{
            btnObject[TITLE_2_BTN_2].displayOn();
        }
    }


    /**
     * Streamボタンの表示、非表示を切り替える
     * ChangeCodec,Initthispageで参照される
     * @constructor
     */
    function DispStream() {
        // display jpeg's stream
        if (gsCodec == "jpeg") {
            DispJpegStream();
            return;
        }

        if ((gsDefaultStream == "jpeg") || (gsDefaultStream == "jpeg_2") || (gsDefaultStream == "jpeg_3")) {
            if (gsDefaultStream == "jpeg") {
                gsVcodec = "";
                gStreamMode = 1;
                giMpegResol[giStMode] = giHr;
                gsSelectHbMax = giChHbMax1;
                gsStNo = "&stream=1";
                btnStreamObject[BTN_STREAM1].displayOn();
                btnStreamObject[BTN_STREAM2].displayOff();
                btnStreamObject[BTN_STREAM3].displayOff();
                btnStreamObject[BTN_STREAM4].displayOff();
            }
            else if (gsDefaultStream == "jpeg_2") {
                gsVcodec = "_2";
                gStreamMode = 2;
                giMpegResol[giStMode] = giHr2;
                gsSelectHbMax = giChHbMax2;
                gsStNo = "&stream=2";
                btnStreamObject[BTN_STREAM1].displayOff();
                btnStreamObject[BTN_STREAM2].displayOn();
                btnStreamObject[BTN_STREAM3].displayOff();
                btnStreamObject[BTN_STREAM4].displayOff();
            }
            else if (gsDefaultStream == "jpeg_3") {
                gsVcodec = "_3";
                gStreamMode = 3;
                giMpegResol[giStMode] = giHr3;
                gsSelectHbMax = giChHbMax3;
                gsStNo = "&stream=3";
                btnStreamObject[BTN_STREAM1].displayOff();
                btnStreamObject[BTN_STREAM2].displayOff();
                btnStreamObject[BTN_STREAM3].displayOn();
                btnStreamObject[BTN_STREAM4].displayOff();
            }
        }
    }

    /**
     * JPEG Streamボタンの表示、非表示を切り替える
     * @constructor
     */
    function DispJpegStream() {
        switch (gsDefaultStream) {
            case "jpeg_2":
                if (giJpegEnv2[giStMode] != 1) {
                    if (giJpegEnv[giStMode] == 1) {
                        gsVcodec = "";
                        gStreamMode = 1;
                        giJpegResol = giJpegStream1Resol;
                        //gsSelectHbMax = giChHbMax1;
                        gsStNo = "&stream=1";

                        btnObject[TITLE_2_BTN_0].displayOn();
                        btnObject[TITLE_2_BTN_1].displayOff();
                        btnObject[TITLE_2_BTN_2].displayOff();
                    }
                    else if (giJpegEnv2[giStMode] == 1) {
                        gsVcodec = "_2";
                        gStreamMode = 2;
                        giJpegResol = giJpegStream2Resol;
                        //gsSelectHbMax = giChHbMax2;
                        gsStNo = "&stream=2";

                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOn();
                        btnObject[TITLE_2_BTN_2].displayOff();
                    }
                    else if (giJpegEnv3[giStMode] == 1) {
                        gsVcodec = "_3";
                        gStreamMode = 3;
                        giJpegResol = giJpegStream3Resol;
                        //gsSelectHbMax = giChHbMax3;
                        gsStNo = "&stream=3";

                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOff();
                        btnObject[TITLE_2_BTN_2].displayOn();
                    }
                }
                else {
                    gsVcodec = "_2";
                    gStreamMode = 2;
                    giJpegResol = giJpegStream2Resol;
                    //gsSelectHbMax = giChHbMax2;
                    gsStNo = "&stream=2";
                    // btnStreamObject[BTN_STREAM1].displayOff();
                    // btnStreamObject[BTN_STREAM2].displayOn();
                    // btnStreamObject[BTN_STREAM3].displayOff();
                    // btnStreamObject[BTN_STREAM4].displayOff();

                    btnObject[TITLE_2_BTN_0].displayOff();
                    btnObject[TITLE_2_BTN_1].displayOn();
                    btnObject[TITLE_2_BTN_2].displayOff();
                }
                break;
            case "jpeg_3":
                if (giJpegEnv3[giStMode] != 1) {
                    if (giJpegEnv[giStMode] == 1) {
                        gsVcodec = "";
                        gStreamMode = 1;
                        giJpegResol = giJpegStream1Resol;
                        //gsSelectHbMax = giChHbMax1;
                        gsStNo = "&stream=1";
                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOn();
                        btnObject[TITLE_2_BTN_2].displayOff();
                    }
                    else if (giJpegEnv2[giStMode] == 1) {
                        gsVcodec = "_2";
                        gStreamMode = 2;
                        giJpegResol = giJpegStream2Resol;
                        //gsSelectHbMax = giChHbMax2;
                        gsStNo = "&stream=2";
                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOn();
                        btnObject[TITLE_2_BTN_2].displayOff();
                    }
                    else if (giJpegEnv3[giStMode] == 1) {
                        gsVcodec = "_3";
                        gStreamMode = 3;
                        giJpegResol = giJpegStream3Resol;
                        //gsSelectHbMax = giChHbMax3;
                        gsStNo = "&stream=3";
                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOff();
                        btnObject[TITLE_2_BTN_2].displayOn();
                    }
                }
                else {
                    gsVcodec = "_3";
                    gStreamMode = 3;
                    giJpegResol = giJpegStream3Resol;
                    //gsSelectHbMax = giChHbMax3;
                    gsStNo = "&stream=3";
                    btnObject[TITLE_2_BTN_0].displayOff();
                    btnObject[TITLE_2_BTN_1].displayOff();
                    btnObject[TITLE_2_BTN_2].displayOn();
                }
                break;
            case "jpeg":
            default:
                if (giJpegEnv[giStMode] != 1) {
                    if (giJpegEnv[giStMode] == 1) {
                        gsVcodec = "";
                        gStreamMode = 1;
                        giJpegResol = giJpegStream1Resol;
                        //gsSelectHbMax = giChHbMax1;
                        gsStNo = "&stream=1";
                        btnObject[TITLE_2_BTN_0].displayOn();
                        btnObject[TITLE_2_BTN_1].displayOff();
                        btnObject[TITLE_2_BTN_2].displayOff();
                    }
                    else if (giJpegEnv2[giStMode] == 1) {
                        gsVcodec = "_2";
                        gStreamMode = 2;
                        giJpegResol = giJpegStream2Resol;
                        //gsSelectHbMax = giChHbMax2;
                        gsStNo = "&stream=2";
                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOn();
                        btnObject[TITLE_2_BTN_2].displayOff();
                    }
                    else if (giJpegEnv3[giStMode] == 1) {
                        gsVcodec = "_3";
                        gStreamMode = 3;
                        giJpegResol = giJpegStream3Resol;
                        //gsSelectHbMax = giChHbMax3;
                        gsStNo = "&stream=3";
                        btnObject[TITLE_2_BTN_0].displayOff();
                        btnObject[TITLE_2_BTN_1].displayOff();
                        btnObject[TITLE_2_BTN_2].displayOn();
                    }
                }
                else {
                    gsVcodec = "";
                    gStreamMode = 1;
                    giJpegResol = giJpegStream1Resol;
                    //gsSelectHbMax = giChHbMax1;
                    gsStNo = "&stream=1";
                    btnObject[TITLE_2_BTN_0].displayOn();
                    btnObject[TITLE_2_BTN_1].displayOff();
                    btnObject[TITLE_2_BTN_2].displayOff();
                }
                break;
        }
    }

    function getResolution (){
        return parseInt(giJpegResol);
    }

    return {
        build: build,
        rebuild:rebuild,
        show: show,
        getResolution:getResolution,
        getLockStatus:function(){
            return lockFlg;
        }
    }
}


