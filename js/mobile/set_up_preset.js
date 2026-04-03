//セットアップ => プリセットポジション => プリセット
var SetUpPreset = setUpPreset();

function setUpPreset() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    var btnObject = [];
    var BACK = 0;
    var TITLE_1 = 1;
    var TITLE_2 = 2;
    var TITLE_HEAD_LEFT = 6;
    var TITLE_HEAD_RIGHT = 7;
    var TITLE_1_RIGHT = 16;
    var TITLE_1_LEFT = 17;
    var TITLE_2_LEFT = 18;
    var TITLE_2_RIGHT = 19;

    var BASIC = 20;
    var DETAILED = 21;
    var LOCATION_MOVE = 22;
    var REGISTER = 23;
    var DELETE = 24;

    var LIMIT_BACK = 25;
    var LIMIT_BASIC = 26;
    var LIMIT_DETAILED = 27;

    var LIMIT_UP = 28;
    var LIMIT_DOWN = 29;
    var LIMIT_LEFT = 30;
    var LIMIT_RIGHT = 31;
    var LIMIT_MAIN = 32;

    var LimitationFlag = true;
    var PresetFlag = true;

    function build() {
        var titleHig = Size.HEIGHT / 7;
        $("#setPresetTitle").height(titleHig);
        $("#setPresetMain").height((titleHig * 6));
        var divHeight = "height: " + (titleHig - 1) + "px";

        btnObject[TITLE_HEAD_LEFT] = ButtonCtrl("setPresetTitle", "position-abs wth-50 hig-100", "position-abs left-5 top-37", "&lt;", callbackTitle);
        btnObject[TITLE_HEAD_LEFT].append($('<img src="/css/mobile/parts/setup_set.png" class="position-abs hig-30 top-35 left-10" alt="">'));
        btnObject[TITLE_HEAD_RIGHT] = ButtonCtrl("setPresetTitle", "position-abs left-50 wth-50 hig-100", "position-abs top-37", "プリセットポジション", null);

        btnObject[TITLE_1] = divAppend("setPresetMain", "tetiePreset1", "wth-100 position-rel border-bottom-1", divHeight);
        btnObject[TITLE_2] = divAppend("setPresetMain", "tetiePreset2", "wth-100 position-rel border-bottom-1", divHeight);

        btnObject[TITLE_1_LEFT] = ButtonCtrl("tetiePreset1", "position-abs wth-50 hig-100", "position-abs left-10 top-37", "プリセット", null);
        btnObject[TITLE_2_LEFT] = ButtonCtrl("tetiePreset2", "position-abs wth-50 hig-100", "position-abs left-10 top-37", NPTZ_WORDING.wID_0365, null);

        btnObject[TITLE_1_RIGHT] = ButtonCtrl("tetiePreset1", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackPreset);
        btnObject[TITLE_2_RIGHT] = ButtonCtrl("tetiePreset2", "position-abs wth-50 hig-100 right-0", "position-abs right-10 top-37", "&nbsp;&gt;", callbackLimitation);

    }

    function callbackTitle(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLayerSetPage").hide();
            $("#jqmLayerSetPreset").hide();
            $("#jqmLayerSet").show();
        }
    }

    function callbackPreset(e) {
        if (e == Button.TOUCHSTART) {
            if (PresetFlag) {
                $("#jqmLayerSetPage").hide();
                $("#jqmLayerSetPreset").hide();
                $("#jqmTop").hide();
                $("#jqmPresetTop").show();
                $("#jqmPresetBottom").show();
                btnObject[BACK] = ButtonCtrl("jqmPresetTop", "position-abs left-0-5 top-35 wth-8 hig-50 border-radius set-contrast-img", "position-abs left-15 top-30", "&lt;&nbsp;戻る", callbackReturn);
                btnObject[BASIC] = ButtonCtrl("jqmPresetTop", "position-abs right-12 top-35 wth-11 hig-50 border-left-radius set-contrast-img set-contrast-img-fff", "position-abs left-35 top-30", "基本", callbackTab, "1");
                btnObject[DETAILED] = ButtonCtrl("jqmPresetTop", "position-abs right-1 top-35 wth-11 hig-50 border-right-radius set-contrast-img", "position-abs left-35 top-30", "詳細", callbackTab, "2");

                btnObject[LOCATION_MOVE] = ButtonCtrl("jqmPresetBottom", "position-abs top-25 wth-30 hig-50 border-radius set-contrast-img", "position-abs left-15 top-25", "位置移動", null);
                btnObject[REGISTER] = ButtonCtrl("jqmPresetBottom", "position-abs top-25 left-35 wth-30 hig-50 border-radius set-contrast-img", "position-abs left-30 top-25", "登録", null);
                btnObject[DELETE] = ButtonCtrl("jqmPresetBottom", "position-abs top-25 left-70 wth-30 hig-50 border-radius set-contrast-img", "position-abs left-30 top-25", "削除", null);
                PresetFlag = false;
            } else {
                $("#jqmLayerSetPage").hide();
                $("#jqmLayerSetPreset").hide();
                $("#jqmTop").hide();
                $("#jqmPresetTop").show();
                $("#jqmPresetBottom").show();
            }
        }
    }

    function callbackLimitatReturn(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmLimitationTop").hide();
            $("#jqmLimitationLeft").hide();
            $("#jqmTop").show();
            $("#mainLeft").show();
            $("#jqmLayerSetPage").show();
            $("#jqmLayerSetPreset").show();
        }
    }

    function callbackTab(e, p) {
        if (e == Button.TOUCHSTART) {
            if (p == "1") {
                btnObject[BASIC].aClass("set-contrast-img-fff");
                btnObject[DETAILED].rClass("set-contrast-img-fff");
                $("#jqmBottom").show();
                $("#jqmBottomHide").hide();
            } else {
                btnObject[BASIC].rClass("set-contrast-img-fff");
                btnObject[DETAILED].aClass("set-contrast-img-fff");
                var id = LayerFunctionBottom.selectId();
                if (id != null) {
                    $("#jqmBottom").hide();
                    $("#jqmBottomHide").show();
                    $("#jqmBottomHide").empty();
                    PresetBottom.build((Number(id) + 1));
                } else {
                    //nothing
                }
            }
        }
    }

    function callbackLimitation(e) {
        if (e == Button.TOUCHSTART) {
            if (LimitationFlag) {
                $("#jqmLayerSetPage").hide();
                $("#jqmLayerSetPreset").hide();
                $("#jqmTop").hide();
                $("#mainLeft").hide();
                $("#jqmLimitationTop").show();
                $("#jqmLimitationLeft").show();
                btnObject[LIMIT_BACK] = ButtonCtrl("jqmLimitationTop", "position-abs left-0-5 top-35 wth-8 hig-50 border-radius set-contrast-img", "position-abs left-15 top-30", "&lt;&nbsp;戻る", callbackLimitatReturn);
                btnObject[LIMIT_BASIC] = ButtonCtrl("jqmLimitationTop", "position-abs right-12 top-35 wth-11 hig-50 border-left-radius set-contrast-img set-contrast-img-fff", "position-abs left-15 top-30", "Limitaiton", null, "1");
                btnObject[LIMIT_DETAILED] = ButtonCtrl("jqmLimitationTop", "position-abs right-1 top-35 wth-11 hig-50 border-right-radius set-contrast-img", "position-abs left-25 top-30", "Zoom", null, "2");

                btnObject[LIMIT_UP] = ImgButtonCtrl("jqmLimitationLeft", "/css/mobile/parts/limitation_up.png", "position-abs wth-13 left-20 top-5", callbackLimiUp);
                btnObject[LIMIT_DOWN] = ImgButtonCtrl("jqmLimitationLeft", "/css/mobile/parts/limitation_down.png", "position-abs wth-13 left-20 top-53", null);
                btnObject[LIMIT_LEFT] = ImgButtonCtrl("jqmLimitationLeft", "/css/mobile/parts/limitation_left.png", "position-abs wth-13 left-1 top-30", null);
                btnObject[LIMIT_RIGHT] = ImgButtonCtrl("jqmLimitationLeft", "/css/mobile/parts/limitation_right.png", "position-abs wth-13 left-39 top-30", null);
                btnObject[LIMIT_MAIN] = ImgButtonCtrl("jqmLimitationLeft", "/css/mobile/parts/setup_limitationsetting_img_arrow.png", "position-abs wth-18 left-18 top-25", null);

                LimitationFlag = false;
            } else {
                $("#jqmLayerSetPage").hide();
                $("#jqmLayerSetPreset").hide();
                $("#jqmTop").hide();
                $("#mainLeft").hide();
                $("#jqmLimitationTop").show();
                $("#jqmLimitationLeft").show();
            }
        }
    }

    function callbackReturn(e) {
        if (e == Button.TOUCHSTART) {
            $("#jqmBottom").show();
            $("#jqmTop").show();
            $("#jqmBottomHide").hide();
            $("#jqmPresetTop").hide();
            $("#jqmPresetBottom").hide();
            $("#jqmLayerSetPage").show();
            $("#jqmLayerSetPreset").show();
        }
    }

    function callbackLimiUp(e) {
        if (e == Button.TOUCHSTART) {
        }
    }

    return {
        build: build
    }
}

//preset和详细切换处理
var PresetBottom = presetBottom();

function presetBottom() {

    var btnObject = [];
    var SWIPER_CONTAINER = 0;
    var ADD_SLIDE = 1;
    var SWIPER_PAGINATION = 2;
    var SWIPER_SLIDE = 3;
    var SWIPER_SLIDE_TITLE = 4;
    var SWIPER_ZOOM = 5;
    var SWIPER_ZOOM = 6;
    var SWIPER_ZOOM = 7;
    var SWIPER_ZOOM = 8;
    var SWIPER_ZOOM = 9;
    var SWIPER_ZOOM = 10;
    var SWIPER_ZOOM = 11;
    var SWIPER_ZOOM = 12;
    var SWIPER_ZOOM = 13;

    function build(id) {
        btnObject[SWIPER_CONTAINER] = divAppend("jqmBottomHide", "swiper2", "swiper-container wth-100 hig-100");
        btnObject[ADD_SLIDE] = divAppend("swiper2", "addPresetSlide", "swiper-wrapper top-5");
        btnObject[SWIPER_PAGINATION] = divAppend("swiper2", "", "swiper-pagination");
        initPresetSwiper(id);
        incloudJs("/js/mobile/preset.init.js");
    }

    function initPresetSwiper(id) {
        btnObject[SWIPER_SLIDE] = divAppend("addPresetSlide", "presetSlide_0", "swiper-slide color-fff text-c");
        btnObject[SWIPER_SLIDE].append($('<span class="position-abs wth-60 hig-20 left-15 back-color-555">' + id + '</span>'));
        btnObject[SWIPER_SLIDE].append($('<img id="presetSlideImg" src="/css/mobile/parts/preset_img.png" class="position-abs wth-60 hig-70 top-20 left-15" alt="">'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_1", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">Zoom</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">4.0</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_2", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">P/T Speed</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">-</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_3", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">IRIS</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">F3.4</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_4", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">GAIN</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">7.8dB</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_5", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">Speed With Zoom Position</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">ON</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_6", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">Focus Adjust With PTZ.</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">Off</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_7", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">Preset Speed Table</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">Fast</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_8", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">Preset Speed</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">4</span>'));

        btnObject[SWIPER_ZOOM] = divAppend("addPresetSlide", "presetSlide_9", "swiper-slide color-fff text-c");
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15">Preset Scope</span>'));
        btnObject[SWIPER_ZOOM].append($('<span class="position-abs wth-60 hig-20 left-15 top-40">Mode A</span>'));

        $("div[id^='presetSlide']").on({
            touchstart: function (e) {
                var id = this.id.split("_")[1];
                for (var i = 0; i < 10; i++) {
                    if (i == id) {
                        $("#presetSlide_" + id).addClass("set-contrast-img-fff");
                    } else {
                        $("#presetSlide_" + i).removeClass("set-contrast-img-fff");
                    }
                }
            }
        });
    }

    function incloudJs(src) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = src;
        oHead.appendChild(oScript);
    }


    return {
        build: build,
    }
}