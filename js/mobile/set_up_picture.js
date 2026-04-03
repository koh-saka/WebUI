//セットアップ => イメージ調整 => シーン：マニュアル1 => ピクチュア
var SetPicture = setPicture();

function setPicture() {

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
    var TITLE_7_MAIN = 57;
    var TITLE_13_MAIN = 58;
    var TITLE_14_MAIN = 59;

    var CHROMA_LEVEL = 60;
    var CHROMA_LEVEL_VALUE = 61;
    var CHROMA_LEVEL_UP = 62;
    var CHROMA_LEVEL_DOWN = 63;
    var CHROMA_LEVEL_MOVE = 64;
    var CHROMA_LEVEL_SLIDER = 65;

    var TITLE_3_MAIN = 66;
    var TITLE_3_LEFT_B = 67;
    var TITLE_3_RIGHT_B = 68;
    var TITLE_3_MAIN_B = 69;
    var TITLE_10_MAIN = 70;
    var TITLE_11_MAIN = 71;
    var TITLE_12_MAIN = 72;
    var TITLE_16_MAIN = 73;
    var TITLE_17_MAIN = 74;


    var TITLE_15 = 75;
    var TITLE_16 = 76;
    var TITLE_17 = 77;
    var TITLE_15_TOP = 78;
    var TITLE_15_LEFT = 79;
    var TITLE_15_RIGHT = 80;
    var TITLE_16_TOP = 81;
    var TITLE_16_LEFT = 82;
    var TITLE_16_RIGHT = 83;
    var TITLE_17_TOP = 84;
    var TITLE_17_LEFT = 85;
    var TITLE_17_RIGHT = 86;

    var chromaLevel = true;

    function build() {
        var titleHig = Size.HEIGHT / 4;
        var divHeight = "height: " + (titleHig - 1) + "px";
        btnObject[BACK] = ButtonCtrl("jqmLayerSetPicture", "position-abs left-1 top-2 wth-10 hig-10 border-radius set-contrast-img", "position-abs left-20 top-30", "&lt;&nbsp;戻る", callbackReturn);
        btnObject[TITLE_1] = divAppend("setPicture_Main", "tetiePicture1", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_2] = divAppend("setPicture_Main", "tetiePicture2", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_3] = divAppend("setPicture_Main", "tetiePicture3", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_4] = divAppend("setPicture_Main", "tetiePicture4", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_5] = divAppend("setPicture_Main", "tetiePicture5", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_6] = divAppend("setPicture_Main", "tetiePicture6", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_7] = divAppend("setPicture_Main", "tetiePicture7", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_8] = divAppend("setPicture_Main", "tetiePicture8", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_9] = divAppend("setPicture_Main", "tetiePicture9", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_10] = divAppend("setPicture_Main", "tetiePicture10", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_11] = divAppend("setPicture_Main", "tetiePicture11", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_12] = divAppend("setPicture_Main", "tetiePicture12", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_13] = divAppend("setPicture_Main", "tetiePicture13", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_14] = divAppend("setPicture_Main", "tetiePicture14", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_15] = divAppend("setPicture_Main", "tetiePicture15", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_16] = divAppend("setPicture_Main", "tetiePicture16", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_17] = divAppend("setPicture_Main", "tetiePicture17", "wth-100 right-0 position-rel border-top-1", divHeight);

        btnObject[TITLE_1_TOP] = ButtonCtrl("tetiePicture1", "position-abs wth-100 hig-15", "position-abs left-5", "Chroma レベル", null);
        btnObject[TITLE_2_TOP] = ButtonCtrl("tetiePicture2", "position-abs wth-100 hig-15", "position-abs left-5", NPTZ_WORDING.wID_0017, null);
        btnObject[TITLE_3_TOP] = ButtonCtrl("tetiePicture3", "position-abs wth-100 hig-15", "position-abs left-5", "WB モード", null);
        btnObject[TITLE_4_TOP] = ButtonCtrl("tetiePicture4", "position-abs wth-100 hig-15", "position-abs left-5", "色温度", null);
        btnObject[TITLE_5_TOP] = ButtonCtrl("tetiePicture5", "position-abs wth-100 hig-15", "position-abs left-5", NPTZ_WORDING.wID_0276, null);
        btnObject[TITLE_6_TOP] = ButtonCtrl("tetiePicture6", "position-abs wth-100 hig-15", "position-abs left-5", NPTZ_WORDING.wID_0277, null);
        btnObject[TITLE_7_TOP] = ButtonCtrl("tetiePicture7", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", NPTZ_WORDING.wID_0289, null);
        btnObject[TITLE_8_TOP] = ButtonCtrl("tetiePicture8", "position-abs wth-100 hig-15", "position-abs left-5", "Detail レベル H", null);
        btnObject[TITLE_9_TOP] = ButtonCtrl("tetiePicture9", "position-abs wth-100 hig-15", "position-abs left-5", "Detail レベル L", null);
        btnObject[TITLE_10_TOP] = ButtonCtrl("tetiePicture10", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", "Flesh Tone Mode", null);
        btnObject[TITLE_11_TOP] = ButtonCtrl("tetiePicture11", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", "HDR", null);
        btnObject[TITLE_12_TOP] = ButtonCtrl("tetiePicture12", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", NPTZ_WORDING.wID_0325, null);
        btnObject[TITLE_13_TOP] = ButtonCtrl("tetiePicture13", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", "Pedestal", null);
        btnObject[TITLE_14_TOP] = ButtonCtrl("tetiePicture14", "position-abs wth-100 hig-15 back-color-555", "position-abs left-5", NPTZ_WORDING.wID_0315, null);
        btnObject[TITLE_15_TOP] = ButtonCtrl("tetiePicture15", "position-abs wth-100 hig-15", "position-abs left-5", "Gamma Type", null);
        btnObject[TITLE_16_TOP] = ButtonCtrl("tetiePicture16", "position-abs wth-100 hig-15", "position-abs left-5", "Gamma Level", null);
        btnObject[TITLE_17_TOP] = ButtonCtrl("tetiePicture17", "position-abs wth-100 hig-15", "position-abs left-5", "Back Light COMP", null);


        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetiePicture1", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "1");
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetiePicture3", "position-abs wth-25 hig-30 top-25 left-20 border-left-top-radius set-contrast-img-fff", "position-abs left-30 top-25", "ATW", callbackWbMode, "1");
        btnObject[TITLE_3_LEFT_B] = ButtonCtrl("tetiePicture3", "position-abs wth-25 hig-30 top-55 left-20 border-left-bottom-radius", "position-abs left-30 top-25", "3200K", callbackWbMode, "4");
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetiePicture4", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "4");
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetiePicture5", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "5");
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetiePicture6", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "6");
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetiePicture7", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Off", callbackDetail, "1");
        btnObject[TITLE_8_LEFT] = ButtonCtrl("tetiePicture8", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "8");
        btnObject[TITLE_9_LEFT] = ButtonCtrl("tetiePicture9", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "9");
        btnObject[TITLE_10_LEFT] = ButtonCtrl("tetiePicture10", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Off", callbackToneMode, "1");
        btnObject[TITLE_11_LEFT] = ButtonCtrl("tetiePicture11", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Off", callbackHDR, "1");
        btnObject[TITLE_12_LEFT] = ButtonCtrl("tetiePicture12", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Off", callbackDNR, "1");
        btnObject[TITLE_13_LEFT] = ButtonCtrl("tetiePicture13", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "13");
        btnObject[TITLE_14_LEFT] = ButtonCtrl("tetiePicture14", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Off", callbackDRS, "1");
        btnObject[TITLE_15_LEFT] = ButtonCtrl("tetiePicture15", "position-abs wth-50 top-15 hig-85", "position-abs left-10 top-50", "&lt;", callbackPictures, "15");
        btnObject[TITLE_16_LEFT] = ButtonCtrl("tetiePicture16", "position-abs wth-25 hig-30 top-50 left-20 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "Off", callBackGammaLevel, "1");
        btnObject[TITLE_17_LEFT] = ButtonCtrl("tetiePicture17", "position-abs wth-25 hig-30 top-50 left-45 border-left-radius set-contrast-img-fff", "position-abs left-30 top-25", "On", callBackCOMP, "1");


        btnObject[TITLE_3_MAIN] = ButtonCtrl("tetiePicture3", "position-abs wth-25 hig-30 top-25 left-45 border-1", "position-abs left-30 top-25", "AWB A", callbackWbMode, "2");
        btnObject[TITLE_3_MAIN_B] = ButtonCtrl("tetiePicture3", "position-abs wth-25 hig-30 top-55 left-45 border-1", "position-abs left-30 top-25", "5600K", callbackWbMode, "5");
        btnObject[TITLE_7_MAIN] = ButtonCtrl("tetiePicture7", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Low", callbackDetail, "2");
        btnObject[TITLE_10_MAIN] = ButtonCtrl("tetiePicture10", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Low", callbackToneMode, "2");
        btnObject[TITLE_11_MAIN] = ButtonCtrl("tetiePicture11", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Low", callbackHDR, "2");
        btnObject[TITLE_12_MAIN] = ButtonCtrl("tetiePicture12", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Low", callbackDNR, "2");
        btnObject[TITLE_14_MAIN] = ButtonCtrl("tetiePicture14", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Low", callbackDRS, "2");
        btnObject[TITLE_16_MAIN] = ButtonCtrl("tetiePicture16", "position-abs wth-25 hig-30 top-50 left-45 border-1", "position-abs left-30 top-25", "Mid", callBackGammaLevel, "2");

        btnObject[TITLE_1_RIGHT] = ButtonCtrl("tetiePicture1", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "2", null);
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetiePicture2", "position-abs wth-25 hig-30 top-50 left-70 border-radius", "position-abs left-30 top-25", "実行", callbackContrastMode);
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetiePicture3", "position-abs wth-25 hig-30 top-25 left-70 border-right-top-radius", "position-abs left-30 top-25", "AWB B", callbackWbMode, "3");
        btnObject[TITLE_3_RIGHT_B] = ButtonCtrl("tetiePicture3", "position-abs wth-25 hig-30 top-55 left-70 border-right-bottom-radius", "position-abs left-30 top-25", "VAR", callbackWbMode, "6");
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetiePicture4", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "3200K", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetiePicture5", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "-30", null);
        btnObject[TITLE_6_RIGHT] = ButtonCtrl("tetiePicture6", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "-30", null);
        btnObject[TITLE_7_RIGHT] = ButtonCtrl("tetiePicture7", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callbackDetail, "3");
        btnObject[TITLE_8_RIGHT] = ButtonCtrl("tetiePicture8", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "18", null);
        btnObject[TITLE_9_RIGHT] = ButtonCtrl("tetiePicture9", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "9", null);
        btnObject[TITLE_10_RIGHT] = ButtonCtrl("tetiePicture10", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callbackToneMode, "3");
        btnObject[TITLE_11_RIGHT] = ButtonCtrl("tetiePicture11", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callbackHDR, "3");
        btnObject[TITLE_12_RIGHT] = ButtonCtrl("tetiePicture12", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callbackDNR, "3");
        btnObject[TITLE_13_RIGHT] = ButtonCtrl("tetiePicture13", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "0", null);
        btnObject[TITLE_14_RIGHT] = ButtonCtrl("tetiePicture14", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callbackDRS, "3");
        btnObject[TITLE_15_RIGHT] = ButtonCtrl("tetiePicture15", "position-abs wth-50 top-15 left-50 hig-85", "position-abs right-10 top-50", "Normal", null);
        btnObject[TITLE_16_RIGHT] = ButtonCtrl("tetiePicture16", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "High", callBackGammaLevel, "3");
        btnObject[TITLE_17_RIGHT] = ButtonCtrl("tetiePicture17", "position-abs wth-25 hig-30 top-50 left-70 border-right-radius", "position-abs left-30 top-25", "Off", callBackCOMP, "2");
    }

    function callbackReturn(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetImageManual_1").show();
            $("#jqmLayerPortrait").removeClass("index998");
            $("#jqmLayerSetPicture").hide();
        }
    }

    function callbackContrastMode(e) {
        if (e == Button.TOUCHSTART) {

        }
    }

    function callbackWbMode(e, p) {
        if (e == Button.TOUCHSTART) {
            switch (p) {
                case "1":
                    btnObject[TITLE_3_LEFT].aClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_LEFT_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT_B].rClass("set-contrast-img-fff");
                    break;
                case "2":
                    btnObject[TITLE_3_LEFT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN].aClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_LEFT_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT_B].rClass("set-contrast-img-fff");
                    break;
                case "3":
                    btnObject[TITLE_3_LEFT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT].aClass("set-contrast-img-fff");
                    btnObject[TITLE_3_LEFT_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT_B].rClass("set-contrast-img-fff");
                    break;
                case "4":
                    btnObject[TITLE_3_LEFT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_LEFT_B].aClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT_B].rClass("set-contrast-img-fff");
                    break;
                case "5":
                    btnObject[TITLE_3_LEFT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_LEFT_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN_B].aClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT_B].rClass("set-contrast-img-fff");
                    break;
                case "6":
                    btnObject[TITLE_3_LEFT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_LEFT_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_MAIN_B].rClass("set-contrast-img-fff");
                    btnObject[TITLE_3_RIGHT_B].aClass("set-contrast-img-fff");
                    break;
                default:
                    break;
            }
        }
    }

    function callbackDetail(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_7_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_7_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_7_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_7_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_7_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_7_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_7_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_7_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_7_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackPictures(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].aClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    if (chromaLevel) {
                        chromaLevelInit();
                        chromaLevel = false;
                    } else {
                        $("#chromaLevel").show();
                    }
                }
                break;
            case "4":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].aClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            case "5":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].aClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            case "6":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].aClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            case "8":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].aClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            case "9":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].aClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            case "13":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].aClass("set-contrast-img-fff");
                    btnObject[TITLE_15].rClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            case "15":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1].rClass("set-contrast-img-fff");
                    btnObject[TITLE_4].rClass("set-contrast-img-fff");
                    btnObject[TITLE_5].rClass("set-contrast-img-fff");
                    btnObject[TITLE_6].rClass("set-contrast-img-fff");
                    btnObject[TITLE_8].rClass("set-contrast-img-fff");
                    btnObject[TITLE_9].rClass("set-contrast-img-fff");
                    btnObject[TITLE_13].rClass("set-contrast-img-fff");
                    btnObject[TITLE_15].aClass("set-contrast-img-fff");
                    $("#chromaLevel").hide();
                }
                break;
            default:
                break;
        }
    }

    function chromaLevelInit() {
        btnObject[CHROMA_LEVEL] = divAppend("jqmLayerSetPicture", "chromaLevel", "wth-25 hig-60 left-1 top-15 position-rel");
        btnObject[CHROMA_LEVEL_VALUE] = divAppend("chromaLevel", "", "position-abs wth-30 top-40 font-value-2 text-c color-fff");
        btnObject[CHROMA_LEVEL_VALUE].append($('<p>2</p>'));
        btnObject[CHROMA_LEVEL_UP] = ImgButtonCtrl("chromaLevel", "/css/mobile/parts/ImageCommonAdd.png", "position-abs wth-30 top-11", null);
        btnObject[CHROMA_LEVEL_DOWN] = ImgButtonCtrl("chromaLevel", "/css/mobile/parts/ImageCommonSubtract.png", "position-abs wth-30 top-60", null);
        btnObject[CHROMA_LEVEL_SLIDER] = ImgButtonCtrl("chromaLevel", "/css/mobile/parts/ContrastLevelSilder.png", "position-abs wth-6 hig-70 top-10 left-55", null);
        btnObject[CHROMA_LEVEL_MOVE] = ImgButtonCtrl("chromaLevel", "/css/mobile/parts/ContrastLevelMove.png", "position-abs hig-8 left-41", null, "chromaLevelMove");
        chromaLevelMove("chromaLevelMove");
    }

    function chromaLevelMove(id1) {
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

    function callbackToneMode(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_10_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_10_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_10_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_10_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_10_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_10_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_10_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_10_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_10_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackHDR(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_11_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_11_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_11_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_11_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_11_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_11_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_11_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_11_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_11_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackDNR(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_12_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_12_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_12_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_12_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_12_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_12_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_12_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_12_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_12_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callbackDRS(e, p) {
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

    function callBackGammaLevel(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_16_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_16_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_16_RIGHT].rClass("set-contrast-img-fff");
            } else if (p == "2") {
                btnObject[TITLE_16_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_16_MAIN].aClass("set-contrast-img-fff");
                btnObject[TITLE_16_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_16_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_16_MAIN].rClass("set-contrast-img-fff");
                btnObject[TITLE_16_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    function callBackCOMP(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[TITLE_17_LEFT].aClass("set-contrast-img-fff");
                btnObject[TITLE_17_RIGHT].rClass("set-contrast-img-fff");
            } else {
                btnObject[TITLE_17_LEFT].rClass("set-contrast-img-fff");
                btnObject[TITLE_17_RIGHT].aClass("set-contrast-img-fff");
            }
        }
    }

    return {
        build: build
    }
}