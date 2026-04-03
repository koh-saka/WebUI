/**
 *
 * setup =>イメージ調整初期化
 * */
var SetImageAdjustment = setImageAdjustment();

function setImageAdjustment() {

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
    var TITLE_HEAD_LEFT = 6;
    var TITLE_HEAD_RIGHT = 7;
    var TITLE_1_LEFT = 17;
    var TITLE_2_LEFT = 18;
    var TITLE_2_RIGHT = 19;
    var TITLE_3_LEFT = 20;
    var TITLE_3_RIGHT = 21;
    var TITLE_4_LEFT = 22;
    var TITLE_4_RIGHT = 23;
    var TITLE_5_LEFT = 24;
    var TITLE_5_RIGHT = 25;

    var manual_1 = true;

    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setImageAdjustmentTitle").height(titleHig);
        $("#setImageAdjustmentMain").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setImageAdjustmentTitle", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;", callbackTitle);
        btnObject[TITLE_HEAD_LEFT].append($('<img src="/admin/parts/setup_set.png" class="position-abs hig-30 top-35 left-10" alt="">'));
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setImageAdjustmentTitle", "position-abs left-50 wth-50 hig-100", "position-abs top-37", "イメージ調整", null);
        btnObject[TITLE_1] = divAppend("setImageAdjustmentMain", "tetieAdjustment1", "wth-100 position-rel border-bottom-1 back-color-404040", divHeight);
        btnObject[TITLE_2] = divAppend("setImageAdjustmentMain", "tetieAdjustment2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setImageAdjustmentMain", "tetieAdjustment3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setImageAdjustmentMain", "tetieAdjustment4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_5] = divAppend("setImageAdjustmentMain", "tetieAdjustment5", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieAdjustment1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "シーンファイル", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieAdjustment2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "Full Auto", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieAdjustment3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "マニュアル1", null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieAdjustment4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "マニュアル2", null);
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetieAdjustment5", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "マニュアル3", null);
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetieAdjustment2", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", null);
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetieAdjustment3", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackmanual_1);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieAdjustment4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetieAdjustment5", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", null);
    }

    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetPage").hide();
            $("#jqmLayerSetImageAdjustment").hide();
            $("#jqmLayerSet").show();
        }
    }

    function callbackmanual_1(e) {
        if (e == Button.TOUCHSTART) {
            if (manual_1) {
                $("#jqmLayerSetImageAdjustment").hide();
                $("#jqmLayerSetImageManual_1").show();
                SetImageManual_1.build();
                manual_1 = false;
            } else {
                $("#jqmLayerSetImageAdjustment").hide();
                $("#jqmLayerSetImageManual_1").show();
            }
        }
    }

    return {
        build: build
    }
}


var SetImageManual_1 = setImageManual_1();

function setImageManual_1() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    var btnObject = [];
    var TITLE_1 = 1;
    var TITLE_2 = 2;
    var TITLE_3 = 3;
    var TITLE_4 = 4;
    var TITLE_HEAD_LEFT = 6;
    var TITLE_HEAD_MAIN = 7;
    var TITLE_HEAD_RIGHT = 8;

    var TITLE_1_RIGHT = 16;
    var TITLE_1_LEFT = 17;
    var TITLE_2_LEFT = 18;
    var TITLE_2_RIGHT = 19;
    var TITLE_3_LEFT = 20;
    var TITLE_3_RIGHT_1 = 21;
    var TITLE_3_RIGHT_2 = 22;
    var TITLE_3_RIGHT_3 = 23;
    var TITLE_3_RIGHT_4 = 24;
    var TITLE_4_RIGHT = 25;

    var divHeight = 0;

    var userFlag = true;
    var contrastFlag = true;
    var pictureFlag = true;
    var userInitFlag= true;

    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setImageManual_1_Title").height(titleHig);
        $("#setImageManual_1_Main").height((titleHig * 6));
        divHeight = "height: " + (titleHig - 1) + "px";
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setImageManual_1_Title", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;&nbsp;イメージ調整", callbackTitle);
        btnObject[TITLE_HEAD_MAIN] = ButtonCtrl("setImageManual_1_Title", "position-abs left-50 wth-35 hig-100", "position-abs top-37", "マニュアル1", null);
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setImageManual_1_Title", "position-abs left-90 wth-8 hig-40 top-30 border-radius", "position-abs top-20 left-20", "セット", null);
        btnObject[TITLE_1] = divAppend("setImageManual_1_Main", "tetieManual_1_1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setImageManual_1_Main", "tetieManual_1_2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setImageManual_1_Main", "tetieManual_1_3", "wth-100 position-rel border-bottom-1", divHeight);

        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieManual_1_1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "コントラスト", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieManual_1_2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "ピクチャー", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieManual_1_3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "カラーマトリックス", null);

        btnObject[TITLE_1_RIGHT] = ButtonCtrl("tetieManual_1_1", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackContrast, "1");
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetieManual_1_2", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackContrast, "2");

        btnObject[TITLE_3_RIGHT_1] = ButtonCtrl("tetieManual_1_3", "position-abs left-66 wth-8 hig-40 top-30 border-left-radius back-color-fff-left-radius", "position-abs top-20 left-10", "ノーマル", callbackColorMatrix, "1");
        btnObject[TITLE_3_RIGHT_2] = ButtonCtrl("tetieManual_1_3", "position-abs left-74 wth-8 hig-40 top-30 border-1", "position-abs top-20 left-30", "EBU", callbackColorMatrix, "2");
        btnObject[TITLE_3_RIGHT_3] = ButtonCtrl("tetieManual_1_3", "position-abs left-82 wth-8 hig-40 top-30 border-1", "position-abs top-20 left-20", "NTSC", callbackColorMatrix, "3");
        btnObject[TITLE_3_RIGHT_4] = ButtonCtrl("tetieManual_1_3", "position-abs left-90 wth-8 hig-40 top-30 border-right-radius", "position-abs top-20 left-10", "ユーザー", callbackColorMatrix, "4");
    }

    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetImageManual_1").hide();
            $("#jqmLayerSetImageAdjustment").show();
        }
    }

    function callbackColorMatrix(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_3_RIGHT_1].aClass("back-color-fff-left-radius");
                    btnObject[TITLE_3_RIGHT_2].rClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_3].rClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_4].rClass("back-color-fff-right-radius");
                    if (!userFlag) {
                        $("#tetieManual_1_4").hide();
                    }
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_3_RIGHT_1].rClass("back-color-fff-left-radius");
                    btnObject[TITLE_3_RIGHT_2].aClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_3].rClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_4].rClass("back-color-fff-right-radius");
                    if (!userFlag) {
                        $("#tetieManual_1_4").hide();
                    }
                }
                break;
            case "3":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_3_RIGHT_1].rClass("back-color-fff-left-radius");
                    btnObject[TITLE_3_RIGHT_2].rClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_3].aClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_4].rClass("back-color-fff-right-radius");
                    if (!userFlag) {
                        $("#tetieManual_1_4").hide();
                    }
                }
                break;
            case "4":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_3_RIGHT_1].rClass("back-color-fff-left-radius");
                    btnObject[TITLE_3_RIGHT_2].rClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_3].rClass("back-color-fff");
                    btnObject[TITLE_3_RIGHT_4].aClass("back-color-fff-right-radius");
                    if (userFlag) {
                        addUser();
                        userFlag = false;
                    } else {
                        $("#tetieManual_1_4").show();
                    }
                }
                break;
            default:
                break;
        }
    }

    function addUser() {
        btnObject[TITLE_4] = divAppend("setImageManual_1_Main", "tetieManual_1_4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieManual_1_4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "ユーザー&nbsp;&gt;", callbackUser);
    }

    function callbackContrast(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    if (contrastFlag) {
                        $("#jqmLayerSetImageManual_1").hide();
                        $("#jqmLayerPortrait").addClass("index998");
                        $("#jqmLayerSetContrast").show();
                        SetContrast.build();
                        contrastFlag = false;
                    } else {
                        $("#jqmLayerSetImageManual_1").hide();
                        $("#jqmLayerPortrait").addClass("index998");
                        $("#jqmLayerSetContrast").show();
                    }
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    if (pictureFlag) {
                        $("#jqmLayerSetImageManual_1").hide();
                        $("#jqmLayerPortrait").addClass("index998");
                        $("#jqmLayerSetPicture").show();
                        SetPicture.build();
                        pictureFlag = false;
                    } else {
                        $("#jqmLayerSetImageManual_1").hide();
                        $("#jqmLayerPortrait").addClass("index998");
                        $("#jqmLayerSetPicture").show();
                    }
                }
                break;
            default:
                break;
        }

    }

    function callbackUser(e) {
        if (e == Button.TOUCHSTART) {
            if (userInitFlag) {
                $("#jqmLayerSetImageManual_1").hide();
                $("#jqmLayerPortrait").addClass("index998");
                $("#jqmLayerSetUser").show();
                SetUser.build();
                userInitFlag = false;
            } else {
                $("#jqmLayerSetImageManual_1").hide();
                $("#jqmLayerPortrait").addClass("index998");
                $("#jqmLayerSetUser").show();
            }
        }
    }

    return {
        build: build
    }
}
