//セットアップ=>ビデオオーバーIP
var SetVideoIp = setVideoIp();

function setVideoIp() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */

    // region
    var btnObject = [];
    var TITLE_1 = 1;
    var TITLE_2 = 2;
    var TITLE_3 = 3;
    var TITLE_4 = 4;
    var TITLE_5 = 5;
    var TITLE_6 = 6;
    var TITLE_7 = 7;
    var TITLE_HEAD_LEFT = 14;
    var TITLE_HEAD_RIGHT = 15;
    var TITLE_1_LEFT = 16;
    var TITLE_1_RIGHT = 17;
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

    var h264_1 = true;
    var h264_2 = true;
    var h264_3 = true;
// endregion
    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setVideoIpTitle").height(titleHig);
        $("#setVideoIpMain").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        //头部固定行
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setVideoIpTitle", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;", callbackTitle);
        btnObject[TITLE_HEAD_LEFT].append($('<img src="/css/mobile/parts/setup_set.png" class="position-abs hig-30 top-35 left-10" alt="">'));
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setVideoIpTitle", "position-abs left-50 wth-50 hig-100", "position-abs top-37", "ビデオ オーバーIP", null);
        //每一行构建一行div作为容器
        btnObject[TITLE_1] = divAppend("setVideoIpMain", "tetieVideoIp1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setVideoIpMain", "tetieVideoIp2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setVideoIpMain", "tetieVideoIp3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setVideoIpMain", "tetieVideoIp4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_5] = divAppend("setVideoIpMain", "tetieVideoIp5", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_6] = divAppend("setVideoIpMain", "tetieVideoIp6", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_7] = divAppend("setVideoIpMain", "tetieVideoIp7", "wth-100 position-rel border-bottom-1", divHeight);
        //每行的左部分文字
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieVideoIp1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "ライブ画面初期表示", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieVideoIp2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0085, null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieVideoIp3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0086, null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieVideoIp4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0087, null);
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetieVideoIp5", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0089, null);
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetieVideoIp6", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0090, null);
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetieVideoIp7", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0091, null);
        //每行的右部分触摸的功能
        btnObject[TITLE_1_RIGHT] = ButtonCtrl("tetieVideoIp1", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "ストリーム H.264&nbsp;&gt;", null);
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetieVideoIp2", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "送信 : On 640x360 30fps ノーマル&nbsp;&gt;", null);
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetieVideoIp3", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "送信 : On 640x360 30fps ノーマル&nbsp;&gt;", null);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieVideoIp4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "送信 : On 640x360 30fps ノーマル&nbsp;&gt;", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetieVideoIp5", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "送信 : On インターネット : Off 1280x720 …&nbsp;&gt;", callbackH264_1);
        btnObject[TITLE_6_RIGHT] = ButtonCtrl("tetieVideoIp6", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "送信 : On インターネット : Off 1280x720 …&nbsp;&gt;", callbackH264_2);
        btnObject[TITLE_7_RIGHT] = ButtonCtrl("tetieVideoIp7", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "送信 : On インターネット : Off 1280x720 …&nbsp;&gt;", callbackH264_3);
    }
    //返回键
    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetPage").hide();
            $("#jqmLayerSetVideoIp").hide();
            $("#jqmLayerSet").show();
        }
    }
    //H.264(1)行的下一层处理
    function callbackH264_1(e) {
        if (e == Button.TOUCHSTART) {
            if (h264_1) {
                $("#jqmLayerSetVideoIp").hide();
                $("#jqmLayerSetVideoIpH264_1").show();
                SetVideoIpH264_1.build();
                h264_1 = false;
            } else {
                $("#jqmLayerSetVideoIp").hide();
                $("#jqmLayerSetVideoIpH264_1").show();
            }


        }
    }
    //H.264(1)行的下一层处理
    function callbackH264_2(e) {
        if (e == Button.TOUCHSTART) {
            if (h264_2) {
                $("#jqmLayerSetVideoIp").hide();
                $("#jqmLayerSetVideoIpH264_2").show();
                SetVideoIpH264_2.build();
                h264_2 = false;
            } else {
                $("#jqmLayerSetVideoIp").hide();
                $("#jqmLayerSetVideoIpH264_2").show();
            }


        }
    }
    //H.264(1)行的下一层处理
    function callbackH264_3(e) {
        if (e == Button.TOUCHSTART) {
            if (h264_3) {
                $("#jqmLayerSetVideoIp").hide();
                $("#jqmLayerSetVideoIpH264_3").show();
                SetVideoIpH264_3.build();
                h264_3 = false;
            } else {
                $("#jqmLayerSetVideoIp").hide();
                $("#jqmLayerSetVideoIpH264_3").show();
            }


        }
    }

    return {
        build: build
    }
}
//セットアップ=>ビデオオーバーIP=>H.264(1)
var SetVideoIpH264_1 = setVideoIpH264_1();

function setVideoIpH264_1() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    //region
    var btnObject = [];
    var TITLE_1 = 1;
    var TITLE_2 = 2;
    var TITLE_3 = 3;
    var TITLE_4 = 4;
    var TITLE_5 = 5;
    var TITLE_6 = 6;
    var TITLE_7 = 7;

    var TITLE_1_RIGHT_DIV = 8;
    var TITLE_1_RIGHT_IMG = 9;
    var TITLE_2_RIGHT_DIV = 10;
    var TITLE_2_RIGHT_IMG = 11;
    var TITLE_7_RIGHT_DIV = 12;
    var TITLE_7_RIGHT_IMG = 13;

    var TITLE_HEAD_LEFT = 14;
    var TITLE_HEAD_RIGHT = 15;
    var TITLE_1_LEFT = 16;
    var TITLE_1_RIGHT = 17;
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

    var img_1_flag = true;
    var img_2_flag = true;
    var img_7_flag = true;

    var img_size = true;
    //endregion
    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setVideoIpH264_1Title").height(titleHig);
        $("#setVideoIpH264_1Main").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        //头部固定行
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setVideoIpH264_1Title", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;&nbsp;ビデオ オーバーIP", callbackTitle);
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setVideoIpH264_1Title", "position-abs left-50 wth-50 hig-100", "position-abs top-37", NPTZ_WORDING.wID_0089, null);
       //每行的构建的div容器
        btnObject[TITLE_1] = divAppend("setVideoIpH264_1Main", "tetieH264_1_1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setVideoIpH264_1Main", "tetieH264_1_2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setVideoIpH264_1Main", "tetieH264_1_3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setVideoIpH264_1Main", "tetieH264_1_4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_5] = divAppend("setVideoIpH264_1Main", "tetieH264_1_5", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_6] = divAppend("setVideoIpH264_1Main", "tetieH264_1_6", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_7] = divAppend("setVideoIpH264_1Main", "tetieH264_1_7", "wth-100 position-rel border-bottom-1", divHeight);
        //每行左部分文字构建
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieH264_1_1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "送信", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieH264_1_2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "インターネット", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieH264_1_3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージサイズ", null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieH264_1_4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "優先", null);
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetieH264_1_5", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "フレームレート", null);
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetieH264_1_6", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "最大ビットレート", null);
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetieH264_1_7", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージクオリティ", null);
        //每行右部分方法构建
        btnObject[TITLE_1_RIGHT] = divAppend("tetieH264_1_1", "tetieH264_1_1_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_DIV] = divAppend("tetieH264_1_1_div", "tetieH264_1_1_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_IMG] = ImgButtonCtrl("tetieH264_1_1_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "1");
        btnObject[TITLE_2_RIGHT] = divAppend("tetieH264_1_2", "tetieH264_1_2_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_DIV] = divAppend("tetieH264_1_2_div", "tetieH264_1_2_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_IMG] = ImgButtonCtrl("tetieH264_1_2_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "2");
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetieH264_1_3", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "1920 x 1080&nbsp;&gt;", callbackImageSize);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieH264_1_4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "フレームレート&nbsp;&gt;", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetieH264_1_5", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "30fps&nbsp;&gt;", null);
        btnObject[TITLE_6_RIGHT] = ButtonCtrl("tetieH264_1_6", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "最大  : 14336kbps  -  最小 : 14336kbps&nbsp;&gt;", null);
        btnObject[TITLE_7_RIGHT] = divAppend("tetieH264_1_7", "tetieH264_1_7_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_7_RIGHT_DIV] = divAppend("tetieH264_1_7_div", "tetieH264_1_7_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_7_RIGHT_IMG] = ImgButtonCtrl("tetieH264_1_7_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "7");
    }
    //返回键
    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetVideoIp").show();
            $("#jqmLayerSetVideoIpH264_1").hide();
        }
    }
    //on/off按钮的处理 分别是1,2,7,行
    function callbackImgConvert(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    if (img_1_flag) {
                        btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_1_flag = false;
                    } else {
                        btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_1_flag = true;
                    }
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    if (img_2_flag) {
                        btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_2_flag = false;
                    } else {
                        btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_2_flag = true;
                    }
                }
                break;
            case "7":
                if (e == Button.TOUCHSTART) {
                    if (img_7_flag) {
                        btnObject[TITLE_7_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_7_flag = false;
                    } else {
                        btnObject[TITLE_7_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_7_flag = true;
                    }
                }
                break;
            default:
                break;
        }
    }

    //イメージサイズ的处理
    function callbackImageSize(e) {
        if (e == Button.TOUCHSTART) {
            if (img_size) {
                $("#jqmLayerSetVideoIpH264_1").hide();
                $("#jqmLayerSetVideoImageSize").show();
                SetVideoImageSize.build(1);
                img_size = false;
            } else {
                $("#jqmLayerSetVideoIpH264_1").hide();
                $("#jqmLayerSetVideoImageSize").show();
            }
        }
    }

    return {
        build: build
    }
}
//セットアップ=>ビデオオーバーIP=>H.264(1)
var SetVideoIpH264_2 = setVideoIpH264_2();

function setVideoIpH264_2() {

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

    var TITLE_1_RIGHT_DIV = 8;
    var TITLE_1_RIGHT_IMG = 9;
    var TITLE_2_RIGHT_DIV = 10;
    var TITLE_2_RIGHT_IMG = 11;
    var TITLE_7_RIGHT_DIV = 12;
    var TITLE_7_RIGHT_IMG = 13;

    var TITLE_HEAD_LEFT = 14;
    var TITLE_HEAD_RIGHT = 15;
    var TITLE_1_LEFT = 16;
    var TITLE_1_RIGHT = 17;
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

    var img_1_flag = true;
    var img_2_flag = true;
    var img_7_flag = true;

    var img_size = true;

    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setVideoIpH264_2Title").height(titleHig);
        $("#setVideoIpH264_2Main").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        //头部固定行
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setVideoIpH264_2Title", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;&nbsp;ビデオ オーバーIP", callbackTitle);
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setVideoIpH264_2Title", "position-abs left-50 wth-50 hig-100", "position-abs top-37", NPTZ_WORDING.wID_0090, null);
        //每行的构建的div容器
        btnObject[TITLE_1] = divAppend("setVideoIpH264_2Main", "tetieH264_2_1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setVideoIpH264_2Main", "tetieH264_2_2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setVideoIpH264_2Main", "tetieH264_2_3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setVideoIpH264_2Main", "tetieH264_2_4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_5] = divAppend("setVideoIpH264_2Main", "tetieH264_2_5", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_6] = divAppend("setVideoIpH264_2Main", "tetieH264_2_6", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_7] = divAppend("setVideoIpH264_2Main", "tetieH264_2_7", "wth-100 position-rel border-bottom-1", divHeight);
        //每行左部分文字构建
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieH264_2_1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "送信", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieH264_2_2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "インターネット", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieH264_2_3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージサイズ", null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieH264_2_4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "優先", null);
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetieH264_2_5", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "フレームレート", null);
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetieH264_2_6", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "最大ビットレート", null);
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetieH264_2_7", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージクオリティ", null);
        //每行右部分方法构建
        btnObject[TITLE_1_RIGHT] = divAppend("tetieH264_2_1", "tetieH264_2_1_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_DIV] = divAppend("tetieH264_2_1_div", "tetieH264_2_1_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_IMG] = ImgButtonCtrl("tetieH264_2_1_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "1");
        btnObject[TITLE_2_RIGHT] = divAppend("tetieH264_2_2", "tetieH264_2_2_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_DIV] = divAppend("tetieH264_2_2_div", "tetieH264_2_2_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_IMG] = ImgButtonCtrl("tetieH264_2_2_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "2");
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetieH264_2_3", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "1920 x 1080&nbsp;&gt;", callbackImageSize);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieH264_2_4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "フレームレート&nbsp;&gt;", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetieH264_2_5", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "30fps&nbsp;&gt;", null);
        btnObject[TITLE_6_RIGHT] = ButtonCtrl("tetieH264_2_6", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "最大  : 14336kbps  -  最小 : 14336kbps&nbsp;&gt;", null);
        btnObject[TITLE_7_RIGHT] = divAppend("tetieH264_2_7", "tetieH264_2_7_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_7_RIGHT_DIV] = divAppend("tetieH264_2_7_div", "tetieH264_2_7_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_7_RIGHT_IMG] = ImgButtonCtrl("tetieH264_2_7_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "7");
    }
    //返回键
    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetVideoIp").show();
            $("#jqmLayerSetVideoIpH264_2").hide();
        }
    }
    //on/off按钮的处理 分别是1,2,7,行
    function callbackImgConvert(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    if (img_1_flag) {
                        btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_1_flag = false;
                    } else {
                        btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_1_flag = true;
                    }
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    if (img_2_flag) {
                        btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_2_flag = false;
                    } else {
                        btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_2_flag = true;
                    }
                }
                break;
            case "7":
                if (e == Button.TOUCHSTART) {
                    if (img_7_flag) {
                        btnObject[TITLE_7_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_7_flag = false;
                    } else {
                        btnObject[TITLE_7_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_7_flag = true;
                    }
                }
                break;
            default:
                break;
        }
    }

    //イメージサイズ的处理
    function callbackImageSize(e) {
        if (e == Button.TOUCHSTART) {
            if (img_size) {
                $("#jqmLayerSetVideoIpH264_2").hide();
                $("#jqmLayerSetVideoImageSize").show();
                //SetVideoImageSize.build();
                img_size = false;
            } else {
                $("#jqmLayerSetVideoIpH264_2").hide();
                $("#jqmLayerSetVideoImageSize").show();
            }
        }
    }

    return {
        build: build
    }
}
//セットアップ=>ビデオオーバーIP=>H.264(1)
var SetVideoIpH264_3 = setVideoIpH264_3();

function setVideoIpH264_3() {

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

    var TITLE_1_RIGHT_DIV = 8;
    var TITLE_1_RIGHT_IMG = 9;
    var TITLE_2_RIGHT_DIV = 10;
    var TITLE_2_RIGHT_IMG = 11;
    var TITLE_7_RIGHT_DIV = 12;
    var TITLE_7_RIGHT_IMG = 13;

    var TITLE_HEAD_LEFT = 14;
    var TITLE_HEAD_RIGHT = 15;
    var TITLE_1_LEFT = 16;
    var TITLE_1_RIGHT = 17;
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

    var img_1_flag = true;
    var img_2_flag = true;
    var img_7_flag = true;

    var img_size = true;

    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setVideoIpH264_3Title").height(titleHig);
        $("#setVideoIpH264_3Main").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        //头部固定行
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setVideoIpH264_3Title", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;&nbsp;ビデオ オーバーIP", callbackTitle);
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setVideoIpH264_3Title", "position-abs left-50 wth-50 hig-100", "position-abs top-37", NPTZ_WORDING.wID_0091, null);
        //每行的构建的div容器
        btnObject[TITLE_1] = divAppend("setVideoIpH264_3Main", "tetieH264_3_1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setVideoIpH264_3Main", "tetieH264_3_2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setVideoIpH264_3Main", "tetieH264_3_3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setVideoIpH264_3Main", "tetieH264_3_4", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_5] = divAppend("setVideoIpH264_3Main", "tetieH264_3_5", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_6] = divAppend("setVideoIpH264_3Main", "tetieH264_3_6", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_7] = divAppend("setVideoIpH264_3Main", "tetieH264_3_7", "wth-100 position-rel border-bottom-1", divHeight);
        //每行左部分文字构建
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieH264_3_1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "送信", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieH264_3_2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "インターネット", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieH264_3_3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージサイズ", null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieH264_3_4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "優先", null);
        btnObject[TITLE_5_LEFT] = ButtonCtrl("tetieH264_3_5", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "フレームレート", null);
        btnObject[TITLE_6_LEFT] = ButtonCtrl("tetieH264_3_6", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "最大ビットレート", null);
        btnObject[TITLE_7_LEFT] = ButtonCtrl("tetieH264_3_7", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "イメージクオリティ", null);
        //每行右部分方法构建
        btnObject[TITLE_1_RIGHT] = divAppend("tetieH264_3_1", "tetieH264_3_1_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_DIV] = divAppend("tetieH264_3_1_div", "tetieH264_3_1_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_IMG] = ImgButtonCtrl("tetieH264_3_1_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "1");
        btnObject[TITLE_2_RIGHT] = divAppend("tetieH264_3_2", "tetieH264_3_2_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_DIV] = divAppend("tetieH264_3_2_div", "tetieH264_3_2_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_IMG] = ImgButtonCtrl("tetieH264_3_2_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "2");
        btnObject[TITLE_3_RIGHT] = ButtonCtrl("tetieH264_3_3", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "1920 x 1080&nbsp;&gt;", callbackImageSize);
        btnObject[TITLE_4_RIGHT] = ButtonCtrl("tetieH264_3_4", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "フレームレート&nbsp;&gt;", null);
        btnObject[TITLE_5_RIGHT] = ButtonCtrl("tetieH264_3_5", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "30fps&nbsp;&gt;", null);
        btnObject[TITLE_6_RIGHT] = ButtonCtrl("tetieH264_3_6", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "最大  : 14336kbps  -  最小 : 14336kbps&nbsp;&gt;", null);
        btnObject[TITLE_7_RIGHT] = divAppend("tetieH264_3_7", "tetieH264_3_7_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_7_RIGHT_DIV] = divAppend("tetieH264_3_7_div", "tetieH264_3_7_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_7_RIGHT_IMG] = ImgButtonCtrl("tetieH264_3_7_img", "/css/mobile/parts/btnOn.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "7");
    }
    //返回键
    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetVideoIp").show();
            $("#jqmLayerSetVideoIpH264_3").hide();
        }
    }
    //on/off按钮的处理 分别是1,2,7,行
    function callbackImgConvert(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    if (img_1_flag) {
                        btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_1_flag = false;
                    } else {
                        btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_1_flag = true;
                    }
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    if (img_2_flag) {
                        btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_2_flag = false;
                    } else {
                        btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_2_flag = true;
                    }
                }
                break;
            case "7":
                if (e == Button.TOUCHSTART) {
                    if (img_7_flag) {
                        btnObject[TITLE_7_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOff.png");
                        img_7_flag = false;
                    } else {
                        btnObject[TITLE_7_RIGHT_IMG].srcConvert("/css/mobile/parts/btnOn.png");
                        img_7_flag = true;
                    }
                }
                break;
            default:
                break;
        }
    }

    //イメージサイズ的处理
    function callbackImageSize(e) {
        if (e == Button.TOUCHSTART) {
            if (img_size) {
                $("#jqmLayerSetVideoIpH264_3").hide();
                $("#jqmLayerSetVideoImageSize").show();
                SetVideoImageSize.build();
                img_size = false;
            } else {
                $("#jqmLayerSetVideoIpH264_3").hide();
                $("#jqmLayerSetVideoImageSize").show();
            }
        }
    }

    return {
        build: build
    }
}
//セットアップ=>ビデオオーバーIP=>H.264(1)=>イメージサイズ
var SetVideoImageSize = setVideoImageSize();

function setVideoImageSize() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    var btnObject = [];
    var TITLE_1 = 1;
    var TITLE_2 = 2;
    var TITLE_3 = 3;
    var TITLE_4 = 4;

    var TITLE_1_RIGHT_DIV = 6;
    var TITLE_1_RIGHT_IMG = 7;
    var TITLE_2_RIGHT_DIV = 8;
    var TITLE_2_RIGHT_IMG = 9;
    var TITLE_3_RIGHT_DIV = 10;
    var TITLE_3_RIGHT_IMG = 11;
    var TITLE_4_RIGHT_DIV = 12;
    var TITLE_4_RIGHT_IMG = 13;

    var TITLE_HEAD_LEFT = 14;
    var TITLE_HEAD_RIGHT = 15;
    var TITLE_1_LEFT = 16;
    var TITLE_1_RIGHT = 17;
    var TITLE_2_LEFT = 18;
    var TITLE_2_RIGHT = 19;
    var TITLE_3_LEFT = 20;
    var TITLE_3_RIGHT = 21;
    var TITLE_4_LEFT = 22;
    var TITLE_4_RIGHT = 23;
    var imgConvertIndex = null;

//H264
    function build(index) {
        imgConvertIndex = index;
        var titleHig = Size.HEIGHT / 7;
        $("#setVideoImageSizeTitle").height(titleHig);
        $("#setVideoImageSizeMain").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";
        //标题固定行
        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setVideoImageSizeTitle", "position-abs wth-50 hig-100", "position-abs left-5 top-37", NPTZ_WORDING.wID_0089, callbackTitle);
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setVideoImageSizeTitle", "position-abs left-50 wth-50 hig-100", "position-abs top-37", "イメージサイズ", null);
        //div构建
        btnObject[TITLE_1] = divAppend("setVideoImageSizeMain", "tetieImageSize1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setVideoImageSizeMain", "tetieImageSize2", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_3] = divAppend("setVideoImageSizeMain", "tetieImageSize3", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_4] = divAppend("setVideoImageSizeMain", "tetieImageSize4", "wth-100 position-rel border-bottom-1", divHeight);
        //每行左侧标题
        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetieImageSize1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "3480 x 2160", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetieImageSize2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "1920 x 1080", null);
        btnObject[TITLE_3_LEFT] = ButtonCtrl("tetieImageSize3", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "1280 x 720", null);
        btnObject[TITLE_4_LEFT] = ButtonCtrl("tetieImageSize4", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "640 x 180", null);
        //每行右侧触摸事件
        btnObject[TITLE_1_RIGHT] = divAppend("tetieImageSize1", "tetieImageSize_1_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_DIV] = divAppend("tetieImageSize_1_div", "tetieImageSize_1_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_1_RIGHT_IMG] = ImgButtonCtrl("tetieImageSize_1_img", "/css/mobile/parts/btnUnSelect.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "1");
        btnObject[TITLE_2_RIGHT] = divAppend("tetieImageSize2", "tetieImageSize_2_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_DIV] = divAppend("tetieImageSize_2_div", "tetieImageSize_2_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_2_RIGHT_IMG] = ImgButtonCtrl("tetieImageSize_2_img", "/css/mobile/parts/btnSelect.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "2");
        btnObject[TITLE_3_RIGHT] = divAppend("tetieImageSize3", "tetieImageSize_3_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_3_RIGHT_DIV] = divAppend("tetieImageSize_3_div", "tetieImageSize_3_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_3_RIGHT_IMG] = ImgButtonCtrl("tetieImageSize_3_img", "/css/mobile/parts/btnUnSelect.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "3");
        btnObject[TITLE_4_RIGHT] = divAppend("tetieImageSize4", "tetieImageSize_4_div", "position-abs wth-50 hig-100 right-0");
        btnObject[TITLE_4_RIGHT_DIV] = divAppend("tetieImageSize_4_div", "tetieImageSize_4_img", "position-abs wth-25 hig-100 right-0");
        btnObject[TITLE_4_RIGHT_IMG] = ImgButtonCtrl("tetieImageSize_4_img", "/css/mobile/parts/btnUnSelect.png", "position-abs hig-50 top-25", callbackImgConvert, "", "", "4");


    }
    //标题返回键
    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetVideoImageSize").hide();
            $("#jqmLayerSetVideoIpH264_1").show();
        }
    }
    //单选按钮触摸事件 根据区分改变图片样式
    function callbackImgConvert(e, p) {
        switch (p) {
            case "1":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnSelect.png");
                    btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_3_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_4_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    if(imgConvertIndex==1){

                    }else if(imgConvertIndex==2){

                    }else if(imgConvertIndex==3){

                    }else if(imgConvertIndex==4){

                    }
                }
                break;
            case "2":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnSelect.png");
                    btnObject[TITLE_3_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_4_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    if(imgConvertIndex==1){

                    }else if(imgConvertIndex==2){

                    }else if(imgConvertIndex==3){

                    }else if(imgConvertIndex==4){

                    }
                }
                break;
            case "3":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_3_RIGHT_IMG].srcConvert("/css/mobile/parts/btnSelect.png");
                    btnObject[TITLE_4_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    if(imgConvertIndex==1){

                    }else if(imgConvertIndex==2){

                    }else if(imgConvertIndex==3){

                    }else if(imgConvertIndex==4){

                    }
                }
                break;
            case "4":
                if (e == Button.TOUCHSTART) {
                    btnObject[TITLE_1_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_2_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_3_RIGHT_IMG].srcConvert("/css/mobile/parts/btnUnSelect.png");
                    btnObject[TITLE_4_RIGHT_IMG].srcConvert("/css/mobile/parts/btnSelect.png");
                    if(imgConvertIndex==1){

                    }else if(imgConvertIndex==2){

                    }else if(imgConvertIndex==3){

                    }else if(imgConvertIndex==4){

                    }
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