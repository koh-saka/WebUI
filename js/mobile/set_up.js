/**
 * setup 初期化
 * */
var SetUp = setUp();

function setUp() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    var btnObject = [];
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
    var TITLE_HEAD_LEFT = 14;
    var TITLE_HEAD_RIGHT = 15;
    var TITLE_HEAD_RIGHT_IMG = 16;
    var TITLE_1_LEFT = 17;
    var TITLE_2_LEFT = 18;
    var TITLE_2_RIGHT = 19;
    var TITLE_3_LEFT = 20;
    var TITLE_3_RIGHT = 21;
    var TITLE_4_LEFT = 22;
    var TITLE_4_RIGHT = 23;
    var TITLE_5_LEFT = 24;
    var TITLE_5_RIGHT = 25;
    var TITLE_6_LEFT = 26;
    var TITLE_6_RIGHT = 27;
    var TITLE_7_LEFT = 28;
    var TITLE_7_RIGHT = 29;
    var TITLE_8_LEFT = 30;
    var TITLE_8_RIGHT = 31;
    var TITLE_9_LEFT = 32;
    var TITLE_9_RIGHT = 33;
    var TITLE_10_LEFT = 34;
    var TITLE_10_RIGHT = 35;
    var TITLE_11_LEFT = 36;
    var TITLE_11_RIGHT = 37;
    var TITLE_12_LEFT = 38;
    var TITLE_12_RIGHT = 39;

    var title_3_value = "Off";
    var title_4_value = "AW-UE70";
    var title_7_value = "H.264";
    var title_8_value = "Off";

    var videoFlag = true;
    var imageAdjustmentFlag = true;
    var presetFlag = true;

    function build() {
        //初期化setup和子画面 jqmLayerSet存放的是setup主菜单
        // 子菜单放在jqmLayerSetPage里构建
        LoadSize("jqmLayerSet");
        LoadSize("jqmLayerSetPage");
        //一夜七行每行的高度
        var titleHig = Size.HEIGHT / 7;
        $("#setTitle").height(titleHig);
        $("#setMain").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setTitle", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;&nbsp;ライブ", callbackTitle);
        btnObject[TITLE_HEAD_RIGHT] = divAppend("setTitle", "titleHeadRight", "position-abs left-50 wth-50 hig-100");
        btnObject[TITLE_HEAD_RIGHT_IMG] = ImgButtonCtrl("titleHeadRight", "/css/mobile/parts/setup_set.png", "position-abs hig-30 top-35", null);
        btnObject[TITLE_1] = divAppend("setMain", "tetie1", "wth-100 position-rel border-bottom-1 back-color-404040", divHeight);
        btnObject[TITLE_2] = divAppend("setMain", "tetie2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setMain", "tetie3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setMain", "tetie4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_5] = divAppend("setMain", "tetie5", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_6] = divAppend("setMain", "tetie6", "wth-100 position-rel border-bottom-1 back-color-404040", divHeight);
        btnObject[TITLE_7] = divAppend("setMain", "tetie7", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_8] = divAppend("setMain", "tetie8", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_9] = divAppend("setMain", "tetie9", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_10] = divAppend("setMain", "tetie10", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_11] = divAppend("setMain", "tetie11", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_12] = divAppend("setMain", "tetie12", "wth-100 position-rel border-bottom-1 back-color-404040", divHeight);
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetie1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "ベーシック", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetie2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "プライオリティモード", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetie3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "日付設定", null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetie4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "ライブ画面", null);
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetie5", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "SDメモリーカード", null);
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetie6", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージ / オーディオ", null);
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetie7", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "ビデオ オーバーIP", null);
        btnObject[TITLE_8_LEFT] = ButtonCtrl("tetie8", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "オーディオ", null);
        btnObject[TITLE_9_LEFT] = ButtonCtrl("tetie9", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージ調整", null);
        btnObject[TITLE_10_LEFT] = ButtonCtrl("tetie10", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "プリセットポジション", null);
        btnObject[TITLE_11_LEFT] = ButtonCtrl("tetie11", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "システム", null);
        btnObject[TITLE_12_LEFT] = ButtonCtrl("tetie12", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "ユーザーマネージメント", null);
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetie2", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "" + NPTZ_WORDING.wID_0216 + "&nbsp;&gt;", null);
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetie3", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "表示: " + title_3_value + "&nbsp;&gt;", null);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetie4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "カメラ名称 : " + title_4_value + "&nbsp;&gt;", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetie5", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", null);
        btnObject[TITLE_7_RIGHT] = ButtonCtrl("tetie7", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "ストリーム :" + title_7_value + "&nbsp;&gt;", callbackVideoIp);
        btnObject[TITLE_8_RIGHT] = ButtonCtrl("tetie8", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "" + title_8_value + "&nbsp;&gt;", null);
        btnObject[TITLE_9_RIGHT] = ButtonCtrl("tetie9", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackImageAdjustment);
        btnObject[TITLE_10_RIGHT] = ButtonCtrl("tetie10", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackPresetPosition);
        btnObject[TITLE_11_RIGHT] = ButtonCtrl("tetie11", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", null);
    }

    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSet").hide();
        }
    }

    function callbackVideoIp(e) {
        if (e == Button.TOUCHSTART) {
            if (videoFlag) {
                $("#jqmLayerSet").hide();
                $("#jqmLayerSetPage").show();
                $("#jqmLayerSetVideoIp").show();
                SetVideoIp.build();
                videoFlag = false;
            } else {
                $("#jqmLayerSet").hide();
                $("#jqmLayerSetPage").show();
                $("#jqmLayerSetVideoIp").show();
            }
        }
    }

    function callbackImageAdjustment(e) {
        if (e == Button.TOUCHSTART) {
            if (imageAdjustmentFlag) {
                $("#jqmLayerSet").hide();
                $("#jqmLayerSetPage").show();
                $("#jqmLayerSetImageAdjustment").show();
                SetImageAdjustment.build();
                imageAdjustmentFlag = false;
            } else {
                $("#jqmLayerSet").hide();
                $("#jqmLayerSetPage").show();
                $("#jqmLayerSetImageAdjustment").show();
            }
        }
    }

    function callbackPresetPosition(e) {
        if (e == Button.TOUCHSTART) {
            if (presetFlag) {
                $("#jqmLayerSet").hide();
                $("#jqmLayerSetPage").show();
                $("#jqmLayerSetPreset").show();
                SetUpPreset.build();
                presetFlag = false;
            } else {
                $("#jqmLayerSet").hide();
                $("#jqmLayerSetPage").show();
                $("#jqmLayerSetPreset").show();
            }
        }
    }


    return {
        build: build
    }
}



