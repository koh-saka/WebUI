//セットアップ => イメージ調整 => シーン：マニュアル1 => コントラスト
var SetContrast = setContrast();

function setContrast() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    var btnObject = [];
    var BACK = 1;
    var TITLE_1 = 1;
    var TITLE_2 = 2;
    var TITLE_3 = 3;
    var TITLE_4 = 4;
    var TITLE_5 = 5;
    var TITLE_6 = 6;
    var TITLE_7 = 7;
    var TITLE_8 = 8;
    var TITLE_9 = 9;
    var TITLE_10 = 10;
    var TITLE_11 = 11;
    var TITLE_12 = 12;
    var TITLE_13 = 13;
    var TITLE_14 = 14;

    var TITLE_1_TOP = 15;
    var TITLE_1_LEFT = 16;
    var TITLE_1_RIGHT = 17;
    var TITLE_2_TOP = 18;
    var TITLE_2_LEFT = 19;
    var TITLE_2_RIGHT = 20;
    var TITLE_3_TOP = 21;
    var TITLE_3_LEFT = 22;
    var TITLE_3_RIGHT = 23;
    var TITLE_4_TOP = 24;
    var TITLE_4_LEFT = 25;
    var TITLE_4_RIGHT = 26;
    var TITLE_5_TOP = 27;
    var TITLE_5_LEFT = 28;
    var TITLE_5_RIGHT = 29;
    var TITLE_6_TOP = 30;
    var TITLE_6_LEFT = 31;
    var TITLE_6_RIGHT = 32;
    var TITLE_7_TOP = 33;
    var TITLE_7_LEFT = 34;
    var TITLE_7_RIGHT = 35;
    var TITLE_8_TOP = 36;
    var TITLE_8_LEFT = 37;
    var TITLE_8_RIGHT = 38;
    var TITLE_9_TOP = 39;
    var TITLE_9_LEFT = 40;
    var TITLE_9_RIGHT = 41;
    var TITLE_10_TOP = 42;
    var TITLE_10_LEFT = 43;
    var TITLE_10_RIGHT = 44;
    var TITLE_11_TOP = 45;
    var TITLE_11_LEFT = 46;
    var TITLE_11_RIGHT = 47;
    var TITLE_12_TOP = 48;
    var TITLE_12_LEFT = 49;
    var TITLE_12_RIGHT = 50;
    var TITLE_13_TOP = 51;
    var TITLE_13_LEFT = 52;
    var TITLE_13_RIGHT = 53;
    var TITLE_14_TOP = 54;
    var TITLE_14_LEFT = 55;
    var TITLE_14_RIGHT = 56;
    var TITLE_5_MAIN = 57;
    var TITLE_13_MAIN = 58;
    var TITLE_14_MAIN = 59;

    var CONTRAST_LEVEL = 60;
    var CONTRAST_LEVEL_VALUE = 61;
    var CONTRAST_LEVEL_UP = 62;
    var CONTRAST_LEVEL_DOWN = 63;
    var CONTRAST_LEVEL_MOVE = 64;
    var CONTRAST_LEVEL_SLIDER = 65;

    var SHUTTER_LIMIT = 66;
    var SHUTTER_LIMIT_UP = 67;
    var SHUTTER_LIMIT_1 = 68;
    var SHUTTER_LIMIT_2 = 69;
    var SHUTTER_LIMIT_3 = 70;
    var SHUTTER_LIMIT_4 = 71;
    var SHUTTER_LIMIT_5 = 72;
    var SHUTTER_LIMIT_DOWN = 73;
    var SHUTTER_LIMIT_SCROLL = 74;
    var shutter_limit_bk;
    var contrastLevel = true;
    var shutterLimit = true;

    function build() {
        var titleHig = Size.HEIGHT / 4;
        var divHeight = "height: " + (titleHig - 1) + "px";
        btnObject[BACK] = ButtonCtrl("jqmLayerSetContrast", "position-abs left-1 top-2 wth-10 hig-10 border-radius set-contrast-img", "position-abs left-20 top-30", "&lt;&nbsp;戻る", callbackReturn);
        btnObject[TITLE_1] = divAppend("setContrast_Main", "tetieContrast1", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_2] = divAppend("setContrast_Main", "tetieContrast2", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_3] = divAppend("setContrast_Main", "tetieContrast3", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_4] = divAppend("setContrast_Main", "tetieContrast4", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_5] = divAppend("setContrast_Main", "tetieContrast5", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_6] = divAppend("setContrast_Main", "tetieContrast6", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_7] = divAppend("setContrast_Main", "tetieContrast7", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_8] = divAppend("setContrast_Main", "tetieContrast8", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_9] = divAppend("setContrast_Main", "tetieContrast9", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_10] = divAppend("setContrast_Main", "tetieContrast10", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_11] = divAppend("setContrast_Main", "tetieContrast11", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_12] = divAppend("setContrast_Main", "tetieContrast12", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_13] = divAppend("setContrast_Main", "tetieContrast13", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_14] = divAppend("setContrast_Main", "tetieContrast14", "wth-100 right-0 position-rel border-top-1", divHeight);

        btnObject[TITLE_1_TOP] = ButtonCtrl("tetieContrast1", "position-abs wth-100 hig-15", "position-abs left-5", "コントラストモード", null);
        btnObject[TITLE_2_TOP] = ButtonCtrl("tetieContrast2", "position-abs wth-100 hig-15", "position-abs left-5", "コントラストレベル", null);
        btnObject[TITLE_3_TOP] = ButtonCtrl("tetieContrast3", "position-abs wth-100 hig-15", "position-abs left-5", "Auto Slow Shutter", null);
        btnObject[TITLE_4_TOP] = ButtonCtrl("tetieContrast4", "position-abs wth-100 hig-15", "position-abs left-5", "Auto Shutter Limit", null);
        btnObject[TITLE_5_TOP] = ButtonCtrl("tetieContrast5", "position-abs wth-100 hig-15", "position-abs left-5", "Shutter モード", null);
        btnObject[TITLE_6_TOP] = ButtonCtrl("tetieContrast6", "position-abs wth-100 hig-15", "position-abs left-5", "ステップ", null);
        btnObject[TITLE_7_TOP] = ButtonCtrl("tetieContrast7", "position-abs wth-100 hig-15", "position-abs left-5", "シンクロ", null);
        btnObject[TITLE_8_TOP] = ButtonCtrl("tetieContrast8", "position-abs wth-100 hig-15", "position-abs left-5", NPTZ_WORDING.wID_0271, null);
        btnObject[TITLE_9_TOP] = ButtonCtrl("tetieContrast9", "position-abs wth-100 hig-15", "position-abs left-5", "Auto F.Mix Max Gain", null);
        btnObject[TITLE_10_TOP] = ButtonCtrl("tetieContrast10", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", NPTZ_WORDING.wID_0010, null);
        btnObject[TITLE_11_TOP] = ButtonCtrl("tetieContrast11", "position-abs wth-100 hig-15", "position-abs left-5", NPTZ_WORDING.wID_0270, null);
        btnObject[TITLE_12_TOP] = ButtonCtrl("tetieContrast12", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", NPTZ_WORDING.wID_0272, null);
        btnObject[TITLE_13_TOP] = ButtonCtrl("tetieContrast13", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", "Day / Night", null);
        btnObject[TITLE_14_TOP] = ButtonCtrl("tetieContrast14", "position-abs wth-100 hig-15", "position-abs left-5", "Night-Day レベル", null);

        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieContrast1", "position-abs wth-25 hig-30 top-50 left-45 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", NPTZ_WORDING.wID_0016, callbackContrastMode, "1");
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieContrast2", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "2");
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieContrast3", "position-abs wth-25 hig-30 top-50 left-45 border-left-radius set-contrast-img-fff", "position-abs left-40 top-25", "On", callbackContrastShutter, "1");
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieContrast4", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "4");
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetieContrast5", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-40 top-25", "Off", callbackContrastShutterMode, "1");
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetieContrast6", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "6");
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetieContrast7", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "7");
        btnObject[TITLE_8_LEFT] = ButtonCtrl("tetieContrast8", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "8");
        btnObject[TITLE_9_LEFT] = ButtonCtrl("tetieContrast9", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "9");
        btnObject[TITLE_10_LEFT] = ButtonCtrl("tetieContrast10", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "10");
        btnObject[TITLE_11_LEFT] = ButtonCtrl("tetieContrast11", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "11");
        btnObject[TITLE_12_LEFT] = ButtonCtrl("tetieContrast12", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackContrast, "12");
        btnObject[TITLE_13_LEFT] = ButtonCtrl("tetieContrast13", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Day", callbackContrastDayNight, "1");
        btnObject[TITLE_14_LEFT] = ButtonCtrl("tetieContrast14", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Low", callbackContrastDayNightLevel, "1");


        btnObject[TITLE_5_MAIN] = ButtonCtrl("tetieContrast5", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-20 top-25", "ステップ", callbackContrastShutterMode, "2");
        btnObject[TITLE_13_MAIN] = ButtonCtrl("tetieContrast13", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Night", callbackContrastDayNight, "2");
        btnObject[TITLE_14_MAIN] = ButtonCtrl("tetieContrast14", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Mid", callbackContrastDayNightLevel, "2");

        btnObject[TITLE_1_RIGHT] = ButtonCtrl("tetieContrast1", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-10 top-25", "マニュアル", callbackContrastMode, "2");
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetieContrast2", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "0", null);btnObject[TITLE_1_RIGHT] = ButtonCtrl("tetieContrast1", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-10 top-25", "マニュアル", callbackContrastMode, "2");
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetieContrast3", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-40 top-25", "Off", callbackContrastShutter, "2");
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieContrast4", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "Off", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetieContrast5", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-20 top-25", "シンクロ", callbackContrastShutterMode, "3");
        btnObject[TITLE_6_RIGHT] = ButtonCtrl("tetieContrast6", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "1/10000", null);
        btnObject[TITLE_7_RIGHT] = ButtonCtrl("tetieContrast7", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "107.89Hz", null);
        btnObject[TITLE_8_RIGHT] = ButtonCtrl("tetieContrast8", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "Off", null);
        btnObject[TITLE_9_RIGHT] = ButtonCtrl("tetieContrast9", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "0dB", null);
        btnObject[TITLE_10_RIGHT] = ButtonCtrl("tetieContrast10", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", NPTZ_WORDING.wID_0016, null);
        btnObject[TITLE_11_RIGHT] = ButtonCtrl("tetieContrast11", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "24dB", null);
        btnObject[TITLE_12_RIGHT] = ButtonCtrl("tetieContrast12", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "Through", null);
        btnObject[TITLE_13_RIGHT] = ButtonCtrl("tetieContrast13", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", NPTZ_WORDING.wID_0016, callbackContrastDayNight, "3");
        btnObject[TITLE_14_RIGHT] = ButtonCtrl("tetieContrast14", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callbackContrastDayNightLevel, "3");
    }

    function callbackReturn(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetImageManual_1").show();
            $("#jqmLayerPortrait").removeClass("index998");
            $("#jqmLayerSetContrast").hide();
        }
    }

    function callbackContrastMode(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_1_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_1_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_1_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_1_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackContrastShutter(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_3_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_3_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_3_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_3_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackContrastShutterMode(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_5_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_5_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_5_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_5_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_5_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_5_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_5_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_5_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_5_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackContrastDayNight(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_13_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_13_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_13_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_13_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_13_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_13_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_13_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_13_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_13_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackContrastDayNightLevel(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_14_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_14_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_14_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_14_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_14_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_14_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_14_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_14_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_14_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackContrast(e, p) {
        switch (p) {
            case "2":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_2].aClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    if (contrastLevel) {
                        contrastLevelInit();
                        contrastLevel = false;
                    } else {
                        $("#contrastLevel").show();
                    }
                    $("#shutterLimit").hide();
                }
                break;
            case "4":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_4].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    if (shutterLimit) {
                        shutterLimitInit();
                        shutterLimit = false;
                    } else {
                        $("#shutterLimit").show();
                    }
                    $("#contrastLevel").hide();
                }
                break;
            case "6":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_6].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            case "7":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_7].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            case "8":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_8].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            case "9":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_9].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            case "10":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_10].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            case "11":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_11].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_12].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            case "12":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_12].aClass("set-contrast-img-fff");
                    btnObject[TITLE_2].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_7].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_10].rClass("set-contrast-img-fff");
                    btnObject[TITLE_11].rClass("set-contrast-img-fff");
                    $("#contrastLevel").hide();
                    $("#shutterLimit").hide();
                }
                break;
            default:
                break;
        }
    }

    function contrastLevelInit() {
        btnObject[CONTRAST_LEVEL] = divAppend("jqmLayerSetContrast", "contrastLevel", "wth-25 hig-60 left-1 top-15 position-rel");
        btnObject[CONTRAST_LEVEL_VALUE] = divAppend("contrastLevel", "", "position-abs wth-30 top-40 font-value-2 text-c color-fff");
        btnObject[CONTRAST_LEVEL_VALUE].append($('<p>0</p>'));
        btnObject[CONTRAST_LEVEL_UP] = ImgButtonCtrl("contrastLevel", "/css/mobile/parts/ImageCommonAdd.png", "position-abs wth-30 top-11", null);
        btnObject[CONTRAST_LEVEL_DOWN] = ImgButtonCtrl("contrastLevel", "/css/mobile/parts/ImageCommonSubtract.png", "position-abs wth-30 top-60", null);
        btnObject[CONTRAST_LEVEL_SLIDER] = ImgButtonCtrl("contrastLevel", "/css/mobile/parts/ContrastLevelSilder.png", "position-abs wth-6 hig-70 top-10 left-55", null, "contrastLevelSlider");
        btnObject[CONTRAST_LEVEL_MOVE] = ImgButtonCtrl("contrastLevel", "/css/mobile/parts/ContrastLevelMove.png", "position-abs hig-8 left-41", null, "contrastLevelMove");
        contrastLevelMove("contrastLevelMove");
    }

    function contrastLevelMove(id1) {
        var sdy = 0, mdy = 0, vdy = 0;

        var id1Hig = (Size.HEIGHT * 0.6 * 0.08) / 2;

        var initTop = Size.HEIGHT * 0.6 * 0.1 - id1Hig;

        var top = initTop + Size.HEIGHT * 0.15 + +Size.TOP;

        //silder height
        var h = Size.HEIGHT * 0.6 * 0.7;

        $("#" + id1).css({"top": (initTop + h / 2)});

        $("#" + id1).on({
            touchstart: function (e) {
                var touch = e.originalEvent.targetTouches[0];
                sdy = touch.pageY;
                vdy = sdy - top;
            },
            touchmove: function (e) {
                e.preventDefault();
                var touch = e.originalEvent.targetTouches[0];
                mdy = touch.pageY;
                var topV = mdy - sdy + vdy;
                if (topV < id1Hig) {
                    $("#" + id1).css({"top": initTop});
                } else if (topV > h) {
                    $("#" + id1).css({"top": (initTop + h)});
                } else {
                    $("#" + id1).css({"top": topV});
                }
            },
            touchend: function (e) {
                // null
            },
        });
    }


    function shutterLimitInit() {
        btnObject[SHUTTER_LIMIT] = divAppend("jqmLayerSetContrast", "shutterLimit", "wth-25 hig-60 left-1 top-15 position-rel set-contrast-img");
        btnObject[SHUTTER_LIMIT_UP] = ButtonCtrl("shutterLimit", "position-abs wth-100 hig-10 border-bottom-1", "position-abs left-50 top-25", "&and;", null);
        btnObject[SHUTTER_LIMIT_DOWN] = ButtonCtrl("shutterLimit", "position-abs wth-100 top-90 hig-10", "position-abs left-50 top-25", "&or;", null);

        btnObject[SHUTTER_LIMIT_SCROLL] = divAppend("shutterLimit", "shutterLimitScroll", "position-abs wth-100 hig-80 top-10 scroll-y");

        btnObject[SHUTTER_LIMIT_1] = ButtonCtrl("shutterLimitScroll", "position-rel wth-100 hig-24 border-bottom-1", "position-abs left-48 top-25", "Off", callbackChoose, "1");
        btnObject[SHUTTER_LIMIT_2] = ButtonCtrl("shutterLimitScroll", "position-rel wth-100 hig-24 border-bottom-1", "position-abs left-45 top-25", "1/60", callbackChoose, "2");
        btnObject[SHUTTER_LIMIT_3] = ButtonCtrl("shutterLimitScroll", "position-rel wth-100 hig-24 border-bottom-1", "position-abs left-45 top-25", "1/100", callbackChoose, "3");
        btnObject[SHUTTER_LIMIT_4] = ButtonCtrl("shutterLimitScroll", "position-rel wth-100 hig-24 border-bottom-1", "position-abs left-45 top-25", "1/120", callbackChoose, "4");
        btnObject[SHUTTER_LIMIT_5] = ButtonCtrl("shutterLimitScroll", "position-rel wth-100 hig-23 border-bottom-1", "position-abs left-45 top-25", "1/240", callbackChoose, "5");

        shutter_limit_bk = $('<img src="/admin/parts/checkMark.png" class="position-abs wth-10 left-85 top-25" alt="">');
    }

    function callbackChoose(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    btnObject[SHUTTER_LIMIT_1].append(shutter_limit_bk);
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    btnObject[SHUTTER_LIMIT_2].append(shutter_limit_bk);
                }
                break;
            case "3":
                if (e == Button.TOUCHSTART) {
                    btnObject[SHUTTER_LIMIT_3].append(shutter_limit_bk);
                }
                break;
            case "4":
                if (e == Button.TOUCHSTART) {
                    btnObject[SHUTTER_LIMIT_4].append(shutter_limit_bk);
                }
                break;
            case "5":
                if (e == Button.TOUCHSTART) {
                    btnObject[SHUTTER_LIMIT_5].append(shutter_limit_bk);
                }
                break;
            default:
                break;
        }
    }

    return {
        build: build
    }
}