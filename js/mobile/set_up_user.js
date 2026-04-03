//セットアップ => イメージ / ポジション => イメージ調整 => シーン：マニュアル1 => ピクチュア
var SetUser = setUser();

function setUser() {

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

    var TOP_1 = 5;
    var TOP_2 = 6;
    var TOP_3 = 7;
    var TOP_4 = 8;

    var TOP_1_LEFT = 9;
    var TOP_2_LEFT = 10;
    var TOP_3_LEFT = 11;
    var TOP_4_LEFT = 12;

    var TOP_1_RIGHT = 13;
    var TOP_2_RIGHT = 14;
    var TOP_3_RIGHT = 15;
    var TOP_4_RIGHT = 16;

    var MAIN_1 = 17;
    var MAIN_2 = 18;
    var MAIN_3 = 19;
    var MAIN_4 = 20;
    var MAIN_5 = 21;
    var MAIN_6 = 22;
    var MAIN_7 = 23;
    var MAIN_8 = 24;

    var MAIN_1_TOP = 25;
    var MAIN_2_TOP = 26;
    var MAIN_3_TOP = 27;
    var MAIN_4_TOP = 28;
    var MAIN_5_TOP = 29;
    var MAIN_6_TOP = 30;
    var MAIN_7_TOP = 31;
    var MAIN_8_TOP = 32;

    var MAIN_1_LEFT = 33;
    var MAIN_2_LEFT = 34;
    var MAIN_3_LEFT = 35;
    var MAIN_4_LEFT = 36;
    var MAIN_5_LEFT = 37;
    var MAIN_6_LEFT = 38;
    var MAIN_7_LEFT = 39;
    var MAIN_8_LEFT = 40;

    var MAIN_1_RIGHT = 41;
    var MAIN_2_RIGHT = 42;
    var MAIN_3_RIGHT = 43;
    var MAIN_4_RIGHT = 44;
    var MAIN_5_RIGHT = 45;
    var MAIN_6_RIGHT = 46;
    var MAIN_7_RIGHT = 47;
    var MAIN_8_RIGHT = 48;


    function build() {
        var titleHig = Size.HEIGHT / 4;
        var divHeight = "height: " + (titleHig - 1) + "px";

        btnObject[BACK] = ButtonCtrl("jqmLayerSetUser", "position-abs left-1 top-2 wth-10 hig-10 border-radius set-contrast-img", "position-abs left-20 top-30", "&lt;&nbsp;戻る", callbackReturn);
        btnObject[TITLE_1] = divAppend("setUser_Main", "titleUser1", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_2] = divAppend("setUser_Main", "titleUser2", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_3] = divAppend("setUser_Main", "titleUser3", "wth-100 right-0 position-rel border-top-1", divHeight);
        btnObject[TITLE_4] = divAppend("setUser_Main", "titleUser4", "wth-100 right-0 position-rel border-top-1", divHeight);

        btnObject[TOP_1] = divAppend("titleUser1", "titleUserTop1", "position-abs wth-100 hig-20 border-bottom-1");
        btnObject[TOP_2] = divAppend("titleUser2", "titleUserTop2", "position-abs wth-100 hig-20 border-bottom-1");
        btnObject[TOP_3] = divAppend("titleUser3", "titleUserTop3", "position-abs wth-100 hig-20 border-bottom-1");
        btnObject[TOP_4] = divAppend("titleUser4", "titleUserTop4", "position-abs wth-100 hig-20 border-bottom-1");

        btnObject[TOP_1_LEFT] = divAppend("titleUserTop1", "", "position-abs wth-8 hig-80 top-10 left-5 back-color-3300FF");
        btnObject[TOP_2_LEFT] = divAppend("titleUserTop2", "", "position-abs wth-8 hig-80 top-10 left-5 back-color-7308FF");
        btnObject[TOP_3_LEFT] = divAppend("titleUserTop3", "", "position-abs wth-8 hig-80 top-10 left-5 back-color-E03DFF");
        btnObject[TOP_4_LEFT] = divAppend("titleUserTop4", "", "position-abs wth-8 hig-80 top-10 left-5 back-color-FD23E0");

        btnObject[TOP_1_RIGHT] = ButtonCtrl("titleUserTop1", "position-abs wth-80 hig-100 left-15", "position-abs top-15", NPTZ_WORDING.wID_0355, null);
        btnObject[TOP_2_RIGHT] = ButtonCtrl("titleUserTop2", "position-abs wth-80 hig-100 left-15", "position-abs top-15", "B_B_Mg", null);
        btnObject[TOP_3_RIGHT] = ButtonCtrl("titleUserTop3", "position-abs wth-80 hig-100 left-15", "position-abs top-15", "B_Mg_Mg", null);
        btnObject[TOP_4_RIGHT] = ButtonCtrl("titleUserTop4", "position-abs wth-80 hig-100 left-15", "position-abs top-15", NPTZ_WORDING.wID_0342, null);

        btnObject[MAIN_1] = divAppend("titleUser1", "titleUserLeft1", "position-abs wth-50 hig-80 top-20 border-right-1");
        btnObject[MAIN_2] = divAppend("titleUser2", "titleUserLeft2", "position-abs wth-50 hig-80 top-20 border-right-1");
        btnObject[MAIN_3] = divAppend("titleUser3", "titleUserLeft3", "position-abs wth-50 hig-80 top-20 border-right-1");
        btnObject[MAIN_4] = divAppend("titleUser4", "titleUserLeft4", "position-abs wth-50 hig-80 top-20 border-right-1");
        btnObject[MAIN_5] = divAppend("titleUser1", "titleUserRight1", "position-abs wth-50 hig-80 top-20 left-50");
        btnObject[MAIN_6] = divAppend("titleUser2", "titleUserRight2", "position-abs wth-50 hig-80 top-20 left-50");
        btnObject[MAIN_7] = divAppend("titleUser3", "titleUserRight3", "position-abs wth-50 hig-80 top-20 left-50");
        btnObject[MAIN_8] = divAppend("titleUser4", "titleUserRight4", "position-abs wth-50 hig-80 top-20 left-50");


        btnObject[MAIN_1_TOP] = ButtonCtrl("titleUserLeft1", "position-abs wth-100 hig-20", "position-abs left-30 top-10", NPTZ_WORDING.wID_0340, null);
        btnObject[MAIN_2_TOP] = ButtonCtrl("titleUserLeft2", "position-abs wth-100 hig-20", "position-abs left-30 top-10", NPTZ_WORDING.wID_0340, null);
        btnObject[MAIN_3_TOP] = ButtonCtrl("titleUserLeft3", "position-abs wth-100 hig-20", "position-abs left-30 top-10", NPTZ_WORDING.wID_0340, null);
        btnObject[MAIN_4_TOP] = ButtonCtrl("titleUserLeft4", "position-abs wth-100 hig-20", "position-abs left-30 top-10", NPTZ_WORDING.wID_0340, null);
        btnObject[MAIN_5_TOP] = ButtonCtrl("titleUserRight1", "position-abs wth-100 hig-20", "position-abs left-20 top-10", NPTZ_WORDING.wID_0339, null);
        btnObject[MAIN_6_TOP] = ButtonCtrl("titleUserRight2", "position-abs wth-100 hig-20", "position-abs left-20 top-10", NPTZ_WORDING.wID_0339, null);
        btnObject[MAIN_7_TOP] = ButtonCtrl("titleUserRight3", "position-abs wth-100 hig-20", "position-abs left-20 top-10", NPTZ_WORDING.wID_0339, null);
        btnObject[MAIN_8_TOP] = ButtonCtrl("titleUserRight4", "position-abs wth-100 hig-20", "position-abs left-20 top-10", NPTZ_WORDING.wID_0339, null);

        btnObject[MAIN_1_LEFT] = ButtonCtrl("titleUserLeft1", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "1");
        btnObject[MAIN_2_LEFT] = ButtonCtrl("titleUserLeft2", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "2");
        btnObject[MAIN_3_LEFT] = ButtonCtrl("titleUserLeft3", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "3");
        btnObject[MAIN_4_LEFT] = ButtonCtrl("titleUserLeft4", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "4");
        btnObject[MAIN_5_LEFT] = ButtonCtrl("titleUserRight1", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "5");
        btnObject[MAIN_6_LEFT] = ButtonCtrl("titleUserRight2", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "6");
        btnObject[MAIN_7_LEFT] = ButtonCtrl("titleUserRight3", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "7");
        btnObject[MAIN_8_LEFT] = ButtonCtrl("titleUserRight4", "position-abs wth-50 hig-80 top-20", "position-abs left-10 top-40", "&lt;", callBackUserChoose, "8");

        btnObject[MAIN_1_RIGHT] = ButtonCtrl("titleUserLeft1", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_2_RIGHT] = ButtonCtrl("titleUserLeft2", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_3_RIGHT] = ButtonCtrl("titleUserLeft3", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_4_RIGHT] = ButtonCtrl("titleUserLeft4", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_5_RIGHT] = ButtonCtrl("titleUserRight1", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_6_RIGHT] = ButtonCtrl("titleUserRight2", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_7_RIGHT] = ButtonCtrl("titleUserRight3", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);
        btnObject[MAIN_8_RIGHT] = ButtonCtrl("titleUserRight4", "position-abs wth-50 hig-80 left-50 top-20", "position-abs top-40", "0", null);

    }

    //返回键的处理
    function callbackReturn(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetImageManual_1").show();
            $("#jqmLayerPortrait").removeClass("index998");
            $("#jqmLayerSetUser").hide();
        }
    }

    //每个“<”的触摸事件
    function callBackUserChoose(e, p) {
        if (e == Button.TOUCHSTART) {
            switch (p) {
                case "1":
                    btnObject[MAIN_1].aClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "2":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].aClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "3":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].aClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "4":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].aClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "5":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].aClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "6":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].aClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "7":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].aClass("set-contrast-img-fff");
                    btnObject[MAIN_8].rClass("set-contrast-img-fff");
                    break;
                case "8":
                    btnObject[MAIN_1].rClass("set-contrast-img-fff");
                    btnObject[MAIN_2].rClass("set-contrast-img-fff");
                    btnObject[MAIN_3].rClass("set-contrast-img-fff");
                    btnObject[MAIN_4].rClass("set-contrast-img-fff");
                    btnObject[MAIN_5].rClass("set-contrast-img-fff");
                    btnObject[MAIN_6].rClass("set-contrast-img-fff");
                    btnObject[MAIN_7].rClass("set-contrast-img-fff");
                    btnObject[MAIN_8].aClass("set-contrast-img-fff");
                    break;
                default:
                    break;
            }
        }
    }

    return {
        build: build
    }
}