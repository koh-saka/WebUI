
var currentZoomValue;
var objVOIP = cparam_getVideoOverIpInfo();
var StreamInfo = null;
var timeId;
var gLock;
/*
 * 初期自动计算
 * 返回值宽度、高度、居顶、居左
 */
var baz;
var Size;
/**
 * onload処理
 */
function onload() {
   setTimeout(function(){
        Size = getSize();
        if($("#registrationDiv").length > 0) {
            setTimeout(registration.build(), 100);
        } else {
            setTimeout(LayerPortrait.build(), 100);
        }

        $('body').css({'position':'fixed',"width":"100%"});
        document.addEventListener('gesturestart', function (event) {
            event.preventDefault();
        });
    }, 100);
    // document.addEventListener('touchstart',function (event) {
    //     if(event.touches.length>1){
    //         event.preventDefault();
    //     }
    // });
    // var lastTouchEnd=0;
    // document.addEventListener('touchend',function (event) {
    //     var now=(new Date()).getTime();
    //     if(now-lastTouchEnd<=300){
    //         event.preventDefault();
    //     }
    //     lastTouchEnd=now;
    // },false);
    // document.addEventListener('touchmove',function (event) {
    //         event.preventDefault();
    // },{ passive: false });
    // if((document.documentElement.scrollHeight <= document.documentElement.clientHeight) && (window.orientation==90||window.orientation==-90)) {
    //     bodyTag = document.getElementsByTagName('body')[0];
    //     bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    //     // bodyTag.style.width = document.documentElement.clientWidth / screen.width * screen.width*0.96 + 'px';
    //
    // }
    // else {
    //     $('body').css({'position':'fixed',"width":"100%"});
    // }
    // setTimeout(function() {
    //     window.scrollTo(0, 1)
    // }, 0);

   
}
/**
 * onresizeload処理
 */
function onresizeload() {
    // var result = true;
    // baz();
    // do
    // {
    //     baz();
    //
    //     //if(Math.floor(Size.WIDTH) === Math.floor($(window).width())){
    //         result = false;
    //     //}
    // }
    // while (result);

    //底层图像build
    //if(Math.floor(Size.WIDTH) === Math.floor($(window).width()))
    //{
        //onload();
    //}
    //document.getElementById('bodyArea').scrollTop = 0;
    //$("#setupDiv").hide();
    //screenIsChange();
}
/**
 * mainViewStopLive
 */
function mobileViewStopLive() {
    $.get("/cgi-bin/jpeg?connect=stop&UID=" + (StreamInfo.UID));
}
function windowsZoomControl(W, H) {
    var zoomVal;
    var MIN_ZOOM_VAL = 10;
    if (!W && !H) {
        return;
    }
    // if ((window.outerWidth != W) || (window.outerHeight != H)) {
    //     var wVal = parseInt(100 * (window.innerWidth / W));
    //     var hVal = parseInt(100 * (window.innerHeight / H));
    //     zoomVal = (wVal > hVal) ? hVal : wVal;
    //     zoomVal = (zoomVal < MIN_ZOOM_VAL) ? MIN_ZOOM_VAL : zoomVal;
    // } else {
        zoomVal = 100;
    // }

    $('body').css("transform-origin", "0 0");
    $('body').css("transform", "scale(" + zoomVal / 100 + ") ");// + "translate(" + window.innerWidth * 0.5 + "px)");
    currentZoomValue = zoomVal / 100;
}

function screenIsChange(){

    setTimeout(function(){
        var divWidth =  $("#jqmLayerPortrait").width();
        var divHeight = $("#jqmLayerPortrait").height();
        windowsZoomControl(divWidth,divHeight);
        var isHeight = ($(window).height()-$("#jqmLayerPortrait").height()*currentZoomValue)/2;
        var isWidth = ($(window).width()-$("#jqmLayerPortrait").width()*currentZoomValue)/2;
        var isTop = isHeight;
        var isLeft = isWidth;
        if(isTop<0){
            isTop = 0;
        }
        if(isLeft<0){
            isLeft = 0;
        }
        var aa = $("#jqmLayerPortrait").height();


        setTimeout(function () {
            $("#setupDiv").show();
            if(sessionStorage.sessionindex == 1){
                $("#jqmLayerAll").show();
            }else if(sessionStorage.sessionindex == 2){
                $("#jqmLayerMenuPT").show();
                $("#jqmOther").hide();
                // $("#tallyBar").hide();
                // $("#touchModeDiv").hide();
            }
            sessionStorage.sessionindex = 0;
        },100)
        //$("#setupDiv,#jqmLayerAll").show();
        // $("#jqmLayerAll").show();

        // $("#setupDiv").css({"top":0+"px","left":0+"px"});
        $("#setupDiv").css({"top":isTop/currentZoomValue+"px","left":isLeft/currentZoomValue+"px"});
        $("#register").css({"top":isTop/currentZoomValue+"px","left":isLeft/currentZoomValue+"px"});


    },300)
}

/*
*每层的居中位置计算
* id：需要计算的div
 */
function LoadSize(id) {

    $("#" + id).width(Size.WIDTH);
    $("#" + id).height(Size.HEIGHT);
    //margin left width
    //$("#" + id).css({"margin-left": Size.LEFT});
    //margin top height
    //$("#" + id).css({"margin-top": Size.TOP});
}

/*
 * 画面解像度の計算
 */
function initScreen() {
    // var deviceWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize  = 6 * (Size.WIDTH / 340) + "px";
}

var giSendTimeCheckTally;
var giRecvTimeCheckTally;
var gTallyTimerID;
/**
 * start check tally
 */
// function startCheckTally() {
//     setTimeout(function(){
//         gTallyTimerID = setInterval("checkTally();", 1000);
//     },200)
// }

/**
 * stop check tally
 */
function stopCheckTally() {
    clearTimeout(gTallyTimerID);
}

/**
 * Detect timeout every 5 seconds
 */
// function checkTimeoutTallyRequest() {
//     var iCurrentTime;
//     if (( giRecvTimeCheckTally - giSendTimeCheckTally ) < 0) {
//         iCurrentTime = ( new Date() ).getTime();
//         if (( iCurrentTime - giSendTimeCheckTally ) > 30000) {
//             checkTally();
//         } else {
//         }
//     } else {
//     }
//     gTallyTimerID = setTimeout("checkTimeoutTallyRequest();", 5000);
// }

/**
 * check tally and update tally state
 * @returns {boolean}
 */
function checkTally() {
    updateTallyState();
}

/**
 * update tally state
 */
let last_tally_state = "";
function updateTallyState() {

    const tally_state = reqCgiObj.tally_state;
    if(tally_state == last_tally_state)return;
    last_tally_state = tally_state;
    const r_tally_state = parseInt(tally_state.substring(0,1));
    const r_tally_command = parseInt(tally_state.substring(1,2));
    const r_tally_wired = parseInt(tally_state.substring(2,3));

    const g_tally_state = parseInt(tally_state.substring(3,4));
    const g_tally_command = parseInt(tally_state.substring(4,5));
    const g_tally_wired = parseInt(tally_state.substring(5,6));
    
    var y_tally_state = parseInt(tally_state.substring(6,7));
    var y_tally_command = parseInt(tally_state.substring(7,8));
    var y_tally_wired = parseInt(tally_state.substring(8,9));
    
    // if((r_tally_state == 0 && g_tally_state == 0)) {
    // 	$("#jqmtopTallyColor1").hide();
    //     $("#jqmtopTallyColor2").hide();
    // }else if((r_tally_command == 1 || r_tally_wired ==1) && (g_tally_command == 1 || g_tally_wired == 1)){
    // 	$("#jqmtopTallyColor1").show();
    //     $("#jqmtopTallyColor2").show();
    //     $("#jqmtopTallyColor2").css('background-color','red');
    //     $("#jqmtopTallyColor1").css('background-color','green');
    // }else if((r_tally_command == 1 || r_tally_wired ==1) && (g_tally_command == 0 || g_tally_wired == 0)){
    // 	$("#jqmtopTallyColor2").hide();
    //     $("#jqmtopTallyColor1").show();
    //     $("#jqmtopTallyColor1").css('background-color','red');
    // }else if((r_tally_command == 0 || r_tally_wired ==0) && (g_tally_command == 1 || g_tally_wired == 1)){
    // 	$("#jqmtopTallyColor2").hide();
    //     $("#jqmtopTallyColor1").show();
    //     $("#jqmtopTallyColor1").css('background-color','green');
    // }
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

function getSize () {
    var operatingAreaWidth = 0;
    var operatingAreaHeight = 0;
    var offLeft = 0;
    var offTop = 0;
    //get explorer width
    var explorerWidth = $(window).width();
    //get explorer height
    var explorerHeight = $(window).height();
    //find the height with the same width
    var offHeight = (explorerWidth * 9) / 16;
    //find the width with the same height
    var offWidth = (explorerHeight * 16) / 9;
    //The width is smaller than the browser width
    if (offWidth < explorerWidth) {

        offLeft = (explorerWidth - offWidth) / 2;
        operatingAreaWidth = offWidth;
        operatingAreaHeight = explorerHeight;
    } else if (offWidth > explorerWidth) {

        offTop = (explorerHeight - offHeight) / 2;
        operatingAreaWidth = explorerWidth;
        operatingAreaHeight = offHeight;
    } else {
        operatingAreaWidth = explorerWidth;
        operatingAreaHeight = explorerHeight;
    }

    baz = function () {
        operatingAreaWidth = 0;
        operatingAreaHeight = 0;
        offLeft = 0;
        offTop = 0;
        explorerWidth = $(window).width();
        //get explorer height
        explorerHeight = $(window).height();
        //find the height with the same width
        offHeight = (explorerWidth * 9) / 16;
        //find the width with the same height
        offWidth = (explorerHeight * 16) / 9;
        //The width is smaller than the browser width
        if (offWidth < explorerWidth) {

            offLeft = Math.round((explorerWidth - offWidth) / 2);
            operatingAreaWidth = Math.round(offWidth);
            operatingAreaHeight = Math.round(explorerHeight);
        } else if (offWidth > explorerWidth) {

            offTop = Math.round((explorerHeight - offHeight) / 2);
            operatingAreaWidth = Math.round(explorerWidth);
            operatingAreaHeight = Math.round(offHeight);
        } else {
            operatingAreaWidth = Math.round(explorerWidth);
            operatingAreaHeight = Math.round(explorerHeight);
        }
        Size.WIDTH = operatingAreaWidth;
        Size.HEIGHT = operatingAreaHeight;
        Size.TOP = offTop;
        Size.LEFT = offLeft;
    }
    return {
        WIDTH: operatingAreaWidth,
        HEIGHT: operatingAreaHeight,
        TOP: offTop,
        LEFT: offLeft
    };
};

var Button = (function () {
    return {
        TOUCHSTART: 0,
        TOUCHMOVE: 1,
        TOUCHEND: 2,
        STATUS_OFF: 0,
        STATUS_ON: 1,
        STATUS_DISABLED: 2,
        STATUS_OVER: 3,
        STATUS_ON_DISABLED: 4,
        MOUSE_UP: 0,
        MOUSE_DOWN: 1,
        MOUSE_OVER: 2,
        MOUSE_OUT: 3,
        CLICK_LEFT: 1,
        CLICK_MIDDLE: 2,
        CLICK_RIGHT: 3
    };
}());
/**
 * div初期化构建
 * id：需要添加的父层
 * name：div的id
 * clas：div的样式
 * sty:div自定义样式 可以为空
 * */
function divAppend(id, name, clas, sty) {
    var buttonObject = $('<div id="' + name + '" class="' + clas + '" style="' + sty + '"></div>');
    $('#' + id).append(buttonObject);
    return {
        show: function () {
            buttonObject.show();
        },
        hide: function () {
            buttonObject.hide();
        },
        append: function (a) {
            buttonObject.append(a);
        },
        aClass: function (b) {
            buttonObject.addClass(b);
        },
        rClass: function (c) {
            buttonObject.removeClass(c);
        },
    };
}


/**
 * テキストエリア制御クラス
 * @class テキストエリア制御クラス
 * @param {string} div  追加対象となる画面構成要素のID
 * @param {string} name CSSクラス名称
 * @param {string} str  画面に表示する文字
 * @param {number} x    画面に表示する文字のx座標(オプション)
 * @param {number} y    画面に表示する文字のy座標(オプション)
 * @param {string} titleTxt マウスカーソル時のポップアップテキスト
 * @return {function} show 表示処理
 * @return {function} hide 非表示処理
 * @return {function} remove 除外処理
 * @return {function} set 表示する文字の変更処理
 * @return {function} setWithTitle 表示する文字の変更処理(タイトル付)
 * @constructor
 */
function TextCtrl(div, name, str, x, y, titleTxt) {
    /**
     * CSS設定対象ID
     * @type string
     */
    var dName = div;

    /**
     * CSSクラス名称
     * @type string
     */
    var pName = name;

    /**
     * 画面に表示する文字
     * @type string
     */
    var sStr = str;

    /**
     * 画面に表示する文字のx座標
     * @type number
     */
    var pX = x;

    /**
     * 画面に表示する文字のy座標
     * @type number
     */
    var pY = y;

    /**
     * マウスカーソル時のポップアップテキスト
     * @type string
     */
    var title = titleTxt;

    /**
     * テキストオブジェクト本体
     * @type object
     */
    var buttonObject = null;

    /**
     * 表示フラグ
     * @type boolean
     */
    var showFlag = false;

    /**
     * テキストボタンオブジェクト設定
     */
    function updateButton() {
        if (title) {
            if(pName == "txt_show_title") {
                buttonObject = $('<div class="' + pName + '"><p class="p_title">' + sStr + '</p></div>');
            }
            else {
                buttonObject = $('<div class="' + pName + '" title="' + title + '"><p>' + sStr + '</p></div>');
            }
        } else {
                buttonObject = $('<div class="' + pName + '"><p>' + sStr + '</p></div>');
        }
        if (pX != undefined && pY != undefined) {
            button.css({
                top: pY + 'px',
                left: pX + 'px'
            });
        }
        $('#' + dName).append(buttonObject);
    }

    updateButton();
    buttonObject.hide();

    return {
        show: function () {
            buttonObject.show();
            showFlag = true;
        },
        hide: function () {
            buttonObject.hide();
            showFlag = false;
        },
        remove: function () {
            buttonObject.remove();
            showFlag = false;
        },
        // switch: function(name) {
        //     if (buttonObject != null) {
        //         buttonObject.remove();
        //     }
        //     pName = name;
        //     updateButton();
        //     if (!showFlag) {
        //         buttonObject.hide();
        //     }
        // },
        set: function (str) {
            if (buttonObject != null) {
                buttonObject.remove();
            }
            sStr = str;
            updateButton();
            if (!showFlag) {
                buttonObject.hide();
            }
        },
        setWithTitle: function (pStr, tStr) {
            if (buttonObject != null) {
                buttonObject.remove();
            }
            sStr = pStr;
            title = tStr;
            updateButton();
            if (!showFlag) {
                buttonObject.hide();
            }
        },
        getTextObject: function () {
            return buttonObject;
        }
    };
}

/**
 * div伪装成button
 * @param div 父层div的id
 * @param name div的样式
 * @param spanClass div中span标签的样式
 * @param str  div中span标签的值
 * @returns {{show: show, hide: hide, append: append, rClass: rClass, aClass: aClass}}
 * @constructor
 */
function ButCtrl(div, name, spanClass, str, callback, param) {
    /**
     *
     * @type object
     */
    var buttonObject = $('<div class="' + name + '"><span class="' + spanClass + '">' + str + '</span></div>');

    $('#' + div).append(buttonObject);

    setEvent(callback, param);
    function setEvent(callback, param) {
        if (callback != null) {
            buttonObject.bind('touchstart', function () {
                callback(Button.TOUCHSTART, param);
            });
            buttonObject.bind('touchend', function () {
                callback(Button.TOUCHEND, param);
            });
            buttonObject.bind('touchmove', function () {
                callback(Button.TOUCHMOVE, param);
            });
        }
    }
    return {
        show: function () {
            buttonObject.show();
        },
        hide: function () {
            buttonObject.hide();
        },
        append: function (a) {
            buttonObject.append(a);
        },
        rClass: function (b) {
            buttonObject.removeClass(b);
        },
        aClass: function (c) {
            buttonObject.addClass(c);
        },
        set: function (str) {
            buttonObject.children("span").html(str);
        },
    };
}

/**
 * div伪装成button
 * @param div 父层div的id
 * @param name div的样式
 * @param spanClass div中span标签的样式
 * @param str  div中span标签的值
 * @param callback div的方法
 * @param param 方法的参数 可以为空
 * @returns {{show: show, hide: hide, append: append, rClass: rClass, aClass: aClass}}
 * @constructor
 */
function BtnCtrl(div, name, spanClass, str, callback, param,id) {
    /**
     * ボタンオブジェクト本体
     * @type object
     */
    var buttonObject ;

    if(spanClass == "menuBtnText2"){
        buttonObject = $('<div id = "'+ id +'" class="' + name + '"><span class="menuBtnText2">' + str + '</span></div>');
    }
    else {
        buttonObject = $('<div id = "'+ id +'" class="' + name + '"><span class="menuBtnText">' + str + '</span></div>');
    }
    /**
     * ボタン状態
     * @type number
     */
    var buttonStatus = Button.STATUS_DISABLED;
    /**
     * ボタンマウスオーバー表示禁止フラグ
     * @type boolean
     */
    var hoverDisableFlag = false;

    /**
     * 表示フラグ
     * @type boolean
     */
    var showFlag = false;
    var touchFlag = true;
    $('#' + div).append(buttonObject);

    /**
     * 画面に表示するボタンの状態設定
     */
    function displayButton() {
        if (buttonStatus == Button.STATUS_OFF) {
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off');
        } else if (buttonStatus == Button.STATUS_DISABLED) {
            buttonObject.removeClass('on');
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('disable');
        } else {
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off');
        }
    }

    setEvent(callback, param);

    /**
     * ボタン押下時イベントハンドラ登録
     * @param {function} callback 発生イベントに対するコールバック
     * @param {object} param コールバックパラメータ
     */
    function setEvent(callback, param) {
        if (callback != null) {
            buttonObject.bind('touchstart', function () {
                // 無効表示の際には何もしない。
                if (buttonStatus == Button.STATUS_DISABLED || buttonStatus == Button.STATUS_ON_DISABLED) {
                    return;
                }
                touchFlag = false;
                callback(Button.TOUCHSTART, param);
            });
            buttonObject.bind('touchend', function () {
                callback(Button.TOUCHEND, param);
            });
            buttonObject.bind('touchmove', function () {
                callback(Button.TOUCHMOVE, param);
            });
            buttonObject.mousedown(function (event) {
                if (!touchFlag) {
                    touchFlag = true;
                    return;
                }
                // 無効表示の際には何もしない。
                if (buttonStatus == Button.STATUS_DISABLED || buttonStatus == Button.STATUS_ON_DISABLED) {
                    return;
                }

                // 左クリックのみ実行
                if (event.which == Button.CLICK_LEFT) {
                    callback(Button.MOUSE_DOWN, param);
                }
            });
        }
    }

    return {
        show: function () {
            showFlag = true;
            displayButton();
            buttonObject.show();
        },
        hide: function () {
            buttonStatus = Button.STATUS_DISABLED;
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on');
            buttonObject.removeClass('on_hover');
            buttonObject.removeClass('off_hover');
            buttonObject.hide();
        },
        append: function (a) {
            buttonObject.append(a);
        },
        rClass: function (b) {
            buttonObject.removeClass(b);
        },
        aClass: function (c) {
            buttonObject.addClass(c);
        },
        getStatus: function () {
            return buttonStatus;
        },
        setStatus: function (Status) {
            buttonStatus = Status;
        },
        displayOn: function () {
            buttonStatus = Button.STATUS_ON;
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.removeClass('off_hover');
            buttonObject.addClass('on');
            buttonObject.children().removeClass("off");
            buttonObject.children().addClass("on")
        },
        displayOff: function () {
            buttonStatus = Button.STATUS_OFF;
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.removeClass('off_hover');
            buttonObject.addClass('off');
            buttonObject.children().removeClass("on");
            buttonObject.children().addClass("off")
        },
        displayDisabled: function () {
            buttonStatus = Button.STATUS_DISABLED;
            buttonObject.removeClass('on');
            buttonObject.removeClass('off');
            buttonObject.removeClass('on_hover');
            buttonObject.removeClass('off_hover');
            buttonObject.addClass('disable');
        },
        displayOnHover: function () {
            buttonObject.removeClass('on');
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('off_hover');
            buttonObject.addClass('on_hover');

        },
        displayOffHover: function () {
            buttonObject.removeClass('on');
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off_hover');

        },
        val: function (value) {
            buttonObject.val(value);
        },
        remove: function () {
            buttonObject.remove();
        },
        hoverDisable: function () {
            hoverDisableFlag = true;
        },
        hoverEnable: function () {
            hoverDisableFlag = false;
        },
        set: function (str) {
            buttonObject[0].innerHTML = '<p>' + str + '</p>';
        },
        get: function () {
            return buttonObject[0].innerText;
        },
        getButtonObject: function () {
            return buttonObject;
        }

    };
}
/**
 * ボタン制御クラス
 * @class ボタン制御クラス
 * @param {string} div 追加対象となる画面構成要素のID
 * @param {string} name CSSクラス名
 * @param {string} str ボタン内のテキスト文字
 * @param {function} callback コールバック関数
 * @param {object} param コールバック関数に対する引数(オプション)
 * @param {number} x 表示位置のX座標(オプション)
 * @param {number} y 表示位置のY座標(オプション)
 * @return {function} show ボタン表示
 * @return {function} hide ボタン非表示
 * @return {number} getStatus ボタン状態取得
 * @return {function} displayOn ボタン表示状態更新(ON)
 * @return {function} displayOff ボタン表示状態更新(OFF)
 * @return {function} displayDisabled ボタン表示状態更新(Disabled)
 * @return {function} val ボタン表示テキスト変更
 * @return {function} remove ボタン削除
 * @return {function} hoverDisable ボタンマウスオーバー表示禁止状態設定
 * @return {function} hoverEnable ボタンマウスオーバー表示許可状態設定
 * @return {function} set ボタン表示テキスト変更(Pタグ付)
 * @return {function} get ボタン表示テキスト取得
 * @constructor
 */
function ButtonCtrl(div, name, str, callback, param, x, y) {
    /**
     * ボタンオブジェクト本体
     * @type object
     */
    var buttonObject = $('<div class="' + name + '"><p>' + str + '</p></div>');

    /**
     * ボタン状態
     * @type number
     */
    var buttonStatus = Button.STATUS_DISABLED;

    /**
     * 表示フラグ
     * @type boolean
     */
    var showFlag = false;

    /**
     * ボタンマウスオーバー表示禁止フラグ
     * @type boolean
     */
    var hoverDisableFlag = false;

    var touchFlag = true;

    var touchMovaeFlag = false;

    if (x != undefined && y != undefined) {
        buttonObject.css({
            top: y + 'px',
            left: x + 'px'
        });
    }
    $('#' + div).append(buttonObject);
    buttonObject.hide();

    setEvent(callback, param);

    /**
     * 画面に表示するボタンの状態設定
     */
    function displayButton() {
        if (buttonStatus == Button.STATUS_OFF) {
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off');
        } else if (buttonStatus == Button.STATUS_DISABLED) {
            buttonObject.removeClass('on');
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('disable');
        } else {
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off');
        }
    }


    /**
     * ボタン押下時イベントハンドラ登録
     * @param {function} callback 発生イベントに対するコールバック
     * @param {object} param コールバックパラメータ
     */
    function setEvent(callback, param) {
        if (callback != null) {
            buttonObject.bind('touchstart', function () {
                // 無効表示の際には何もしない。
                if (buttonStatus == Button.STATUS_DISABLED || buttonStatus == Button.STATUS_ON_DISABLED) {
                    return;
                }
                touchFlag = false;
                callback(Button.TOUCHSTART, param);
            });
            buttonObject.bind('touchend', function () {
                callback(Button.TOUCHEND, param);
            });
            buttonObject.bind('touchmove', function () {
                callback(Button.TOUCHMOVE, param);
            });
            buttonObject.mousedown(function (event) {
                if (!touchFlag) {
                    touchFlag = true;
                    return;
                }
                // 無効表示の際には何もしない。
                if (buttonStatus == Button.STATUS_DISABLED || buttonStatus == Button.STATUS_ON_DISABLED) {
                    return;
                }

                // 左クリックのみ実行
                if (event.which == Button.CLICK_LEFT) {
                    callback(Button.MOUSE_DOWN, param);
                }
            });
        }
    }

    return {
        show: function () {
            showFlag = true;
            displayButton();
            buttonObject.show();
        },
        srcConvert: function (srcName) {
            buttonObject[0].src = srcName;
        },
        hide: function () {
            buttonStatus = Button.STATUS_DISABLED;
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on');
            buttonObject.removeClass('on_hover');
            buttonObject.removeClass('off_hover');
            buttonObject.hide();
        },
        append: function (a) {
            buttonObject.append(a);
        },
        rClass: function (b) {
            buttonObject.removeClass(b);
        },
        aClass: function (c) {
            buttonObject.addClass(c);
        },
        getStatus: function () {
            return buttonStatus;
        },
        setStatus: function (Status) {
            buttonStatus = Status;
        },
        displayOn: function () {
            buttonStatus = Button.STATUS_ON;
                buttonObject.removeClass('off');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('on_hover');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('on');
                buttonObject.children().removeClass("off");
                buttonObject.children().addClass("on")
        },
        displayOff: function () {
            buttonStatus = Button.STATUS_OFF;
                buttonObject.removeClass('on');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('on_hover');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('off');
                buttonObject.children().removeClass("on");
                buttonObject.children().addClass("off")
        },
        displayDisabled: function () {
            buttonStatus = Button.STATUS_DISABLED;
                buttonObject.removeClass('on');
                buttonObject.removeClass('off');
                buttonObject.removeClass('on_hover');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('disable');
        },
        displayOnHover: function () {
                buttonObject.removeClass('on');
                buttonObject.removeClass('off');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('on_hover');

        },
        displayOffHover: function () {
                buttonObject.removeClass('on');
                buttonObject.removeClass('off');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('on_hover');
                buttonObject.addClass('off_hover');

        },
        val: function (value) {
            buttonObject.val(value);
        },
        remove: function () {
            buttonObject.remove();
        },
        hoverDisable: function () {
            hoverDisableFlag = true;
        },
        hoverEnable: function () {
            hoverDisableFlag = false;
        },
        set: function (str) {
            buttonObject[0].innerHTML = '<p>' + str + '</p>';
        },
        get: function () {
            return buttonObject[0].innerText;
        },
        getButtonObject: function () {
            return buttonObject;
        }

    };
}
/*
*图片按钮的构建
* div：图像按钮添加的div层
* src：图片按钮额路径
* name：图片按钮的样式
* callback：图片按钮点击的方法处理 可以为空但必须以null占位
* id：图片按钮的id 可以为空
* alt：图片按钮的占位 可以为空
* param：图片按钮方法的参数 可以为空
*/
function ImgButtonCtrl(div, src, name, callback, id, alt, param) {

    var buttonObject = $('<img id="' + id + '" src="' + src + '" class="' + name + '" alt="' + alt + '">');
    var idTemp = "";

    if (id)
    {
        idTemp = id.toString().split("_")[0];
    }

    if((id == "irisDraggableMove") || (id == "focusDraggableMove")
            || (id == "zoomDraggableMove") || (id == "speedDraggableMove")
                    ||(idTemp == "swiperSlideImg") || (id == "joystickCore"))
    {
        buttonObject.attr("ondragstart","return false");
    }

    /**
     * 表示フラグ
     * @type boolean
     */
    var showFlag = false;

    /**
     * ボタン状態
     * @type number
     */
    var buttonStatus = Button.STATUS_DISABLED;

    /**
     * ボタンマウスオーバー表示禁止フラグ
     * @type boolean
     */
    var hoverDisableFlag = false;

    var touchFlag = true;


    $('#' + div).append(buttonObject);


    setEvent(callback, param);


    /**
     * 画面に表示するボタンの状態設定
     */
    function displayButton() {
        if (buttonStatus == Button.STATUS_OFF) {
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off');
        } else if (buttonStatus == Button.STATUS_DISABLED) {
            buttonObject.removeClass('on');
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('disable');
        } else {
            buttonObject.removeClass('on');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on_hover');
            buttonObject.addClass('off');
        }
    }


    function setEvent(callback, param) {
        if (callback != null) {
            buttonObject.bind('touchstart', function () {
                callback(Button.TOUCHSTART, param);
            });
            buttonObject.bind('touchend', function () {
                callback(Button.TOUCHEND, param);
            });
            buttonObject.bind('touchmove', function () {
                callback(Button.TOUCHMOVE, param);
            });
        }
    }

    return {
        show: function () {
            showFlag = true;
            displayButton();
            buttonObject.show();
        },
        hide: function () {
            buttonStatus = Button.STATUS_DISABLED;
            showFlag = false;
            buttonObject.removeClass('off');
            buttonObject.removeClass('disable');
            buttonObject.removeClass('on');
            buttonObject.removeClass('on_hover');
            buttonObject.removeClass('off_hover');
            buttonObject.hide();
        },
        srcConvert: function (srcName) {
            buttonObject[0].src = srcName;
        },
        width: function (wth) {
            buttonObject[0].style.width = wth;
        },
        height: function (hig) {
            buttonObject[0].style.height = hig;
        },
        addCss: function (cssName) {
            buttonObject[0].css(cssName);
        },
        append: function (a) {
            buttonObject.append(a);
        },
        getStatus: function () {
            return buttonStatus;
        },
        setStatus: function (Status) {
            buttonStatus = Status;
        },
        displayOn: function () {
            if (showFlag) {
                buttonStatus = Button.STATUS_ON;
                buttonObject.removeClass('off');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('on_hover');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('on');
            }
        },
        displayOff: function () {
            if (showFlag) {
                buttonStatus = Button.STATUS_OFF;
                buttonObject.removeClass('on');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('on_hover');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('off');
            }
        },
        displayDisabled: function () {
            if (showFlag) {
                buttonStatus = Button.STATUS_DISABLED;
                buttonObject.removeClass('on');
                buttonObject.removeClass('off');
                buttonObject.removeClass('on_hover');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('disable');
            }
        },
        displayOnHover: function () {
            if (showFlag) {
                buttonObject.removeClass('on');
                buttonObject.removeClass('off');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('off_hover');
                buttonObject.addClass('on_hover');
            }
        },
        displayOffHover: function () {
            if (showFlag) {
                buttonObject.removeClass('on');
                buttonObject.removeClass('off');
                buttonObject.removeClass('disable');
                buttonObject.removeClass('on_hover');
                buttonObject.addClass('off_hover');
            }
        },
        val: function (value) {
            buttonObject.val(value);
        },
        remove: function () {
            buttonObject.remove();
        },
        hoverDisable: function () {
            hoverDisableFlag = true;
        },
        hoverEnable: function () {
            hoverDisableFlag = false;
        },
        set: function (str) {
            buttonObject[0].innerHTML = '<p>' + str + '</p>';
        },
        get: function () {
            return buttonObject[0].innerText;
        },
        getButtonObject: function () {
            return buttonObject;
        }

    };
}
/*
*图像初期化
*/
function InitImg() {
    var gResolution = "0";
    var gFramerate = "0";
    var stream = "_1";

    if (objVOIP.jpeg_transmit1 == 1) {
        gResolution = objVOIP.resol_stream1;
        gFramerate = objVOIP.jpeg_interval1;
    }
    else if (objVOIP.jpeg_transmit2 == 1) {
        gResolution = objVOIP.resol_stream2;
        gFramerate = objVOIP.jpeg_interval2;
    }
    else if (objVOIP.jpeg_transmit3 == 1) {
        gResolution = objVOIP.resol_stream3;
        gFramerate = objVOIP.jpeg_interval3;
    }
    else {
        gResolution = 0;
        gFramerate = 0;
    }

    if(objVOIP.sStream == "jpeg_2" ){
        stream = "_2";
    }else if(objVOIP.sStream == "jpeg_3" ){
        stream = "_3";
    }else{
        stream = "";
    }
    initMainView(stream,gFramerate,gResolution);
}

function initMainView(stream,gFramerate,gResolution){
    if(timeId!=null){
        clearInterval(timeId);
    }
    setTimeout(function(){
        if(cparam_get_powerOnStandby() == 1){
            setStreamInfo("/cgi-bin/getuid?FILE=1&vcodec=jpeg" + stream + "&quality=1");
            var url ="/cgi-bin/jpeg?connect=start&framerate=" + gFramerate + "&resolution=" + gResolution + "&quality=1&UID=" + StreamInfo.UID;
            timeId = setInterval(function(){
                var url ="/cgi-bin/keep_alive?mode=jpeg&protocol=http&UID=" + StreamInfo.UID;
                $.get(url);
            },30000);
            document.getElementById( "liveImage" ).src = url;

        }
        else{
            var img = document.getElementById("liveImage");
            img.src = "/css/mobile/parts/standby.gif";
        }

    },300);
}
/**
 * Set Stream Info
 * @param url
 * @returns {boolean}
 * @private
 */
function setStreamInfo(url) {
    try {
        var ret = cparam_sendRequest(url);
        var result = '0';
        if (ret.length) {
            if (ret.indexOf("Internet Mode") == 0) {
                StreamInfo = null;
                result = '99';
                return result;
            }else if (ret.indexOf("Access Limit") == 0) {
                StreamInfo = null;
                result = '90';
                return result;
            }
            StreamInfo = eval("(" + ret.replace('\n', '', 'g') + ")");

            if (StreamInfo.UID == -1) {
                return false;
            }
        }
        else {
            StreamInfo = null;
            return true;
        }
        return true;
    }
    catch (e) {
        return false;
    }
}
/*
*zoom、speed等滑动杆的拖拽
* id1：滑动杆上的圆点
* id2：滑动杆底部红色进度
*/
function draggable(id1, id2) {

    var sdy = 0, mdy = 0, vdy = 0;
    //button init top
    var pointTop = Size.HEIGHT * 0.19 + (Size.HEIGHT * 0.63 * 0.75 * 0.05) + Size.TOP;
    //button init height
    var point = Size.WIDTH * 0.5 * 0.16 * 0.5;
    $("#" + id1).height(point);
    //Slider height
    var totalHeight = Size.HEIGHT * 0.63 * 0.75 * 0.9;
    $("#" + id1).on({
        touchstart: function (e) {

            var a = e.currentTarget.className;
            if(a.indexOf("disable") != -1){
                return ;
            }
            $("#" + id1).attr("src","/css/mobile/parts/slider_knob_pressed.png");
            var touch = e.originalEvent.targetTouches[0];
            sdy = touch.pageY;
            vdy = sdy - pointTop;
        },
        touchmove: function (e) {
            var a = e.currentTarget.className;
            if(a.indexOf("disable") != -1){
                return ;
            }
            e.preventDefault();
            var touch = e.originalEvent.targetTouches[0];
            var stringText = "";
            mdy = touch.pageY;
            var top = vdy + (mdy - sdy);
            if (top < 0) {
                $("#" + id1).css({"top": "0"});
                $("#" + id2).css({"top": "0", "height": "100%"});
                stringText += "1";
            } else if (top > (totalHeight - point)) {
                $("#" + id1).css({"top": (totalHeight - point)/totalHeight*100 + "%"});
                $("#" + id2).css({"height": "0"});
                stringText += "2";
            } else {
                $("#" + id1).css({"top": top});
                $("#" + id2).css({"top": top/totalHeight*100 + "%", "height": (totalHeight - top)/totalHeight*100 + "%"});
                stringText += "3";
                // stringText += totalHeight - top;
            }
        // setTimeout(function(){
        //     alert(id1 + "---" + id2 + "----" + stringText);
        // },2850);

            // alert(stringText);
        },
        touchend: function (e) {
            var a = e.currentTarget.className;
            if(a.indexOf("disable") != -1){
                return ;
            }
            $("#" + id1).attr("src","/css/mobile/parts/slider_knob_normal.png");
            // var a = e.currentTarget.className;
            // if(a.indexOf("disable") != -1){
            //     return ;
            // }
        },
    });


}

/*
 * Touch flag
 * @type boolean
 */
var ptzTouchFlag = false;

/*
 * Touch outer picture size : d = 2r
 * @type number
 */
var ptzTouchMMCjosize = null;

/*
 * Touch inner picture size
 * @type number
 */
var ptzTouchMMCjisize = null;

/*
 * Touch div center point x value
 * @type number
 */
var ptzTouchMMCcenterX = null;

/*
 * Touch div center point y value
 * @type number
 */
var ptzTouchMMCcenterY = null;

/*
* Joystick position Calculation
* id1：Joystick Bottom Image
* id2：Small dots on a rocker
*/
function joystick(id, id2) {
    var joystickWidth = $("#" + id).width();
    var mainLeftWidth = $("#mainLeft").width();
    var centerX = joystickWidth / 2;
    var centerY = joystickWidth / 2;
    var joystickX = $("#" + id).offset().left/currentZoomValue;
    var joystickY = $("#" + id).offset().top/currentZoomValue;
    var a = joystickX + centerX;
    var b = joystickY + centerX;
    var joystickCoreWidth = $("#" + id2).width();
    var touchX = joystickCoreWidth / 2;
    var touchY = joystickCoreWidth / 2;
    var joystickCoreX = $("#" + id2).offset().left/currentZoomValue;
    var joystickCoreY = $("#" + id2).offset().top/currentZoomValue;
    var initTop = (joystickY - joystickCoreY) + (centerY - touchY);
    var initLeft = (joystickX - joystickCoreX) + (centerX - touchX);
    $("#" + id2).css({"top": initTop, "left": initLeft});


    // var afterX = $("#"+id2).offset().left;
    // var afterY =$("#"+id2).offset().top;

    ptzTouchMMCjosize = joystickWidth; //outer picture size : d = 2r
    ptzTouchMMCjisize = joystickWidth * 0.05; //inner picture size : d = 2r
    ptzTouchMMCcenterX = centerX; //center position : x
    ptzTouchMMCcenterY = centerY; //center position : y

    //不具合管理 #3717 修正
    // document.addEventListener('touchend', doTouch, false);
    // document.addEventListener('touchmove', doTouch, false);
    try{
        if(gPower == 1) {
            document.getElementById('positionBtn').addEventListener('touchend', doTouch, false);
            document.getElementById('positionBtn').addEventListener('touchmove', doTouch, false);
        }
    }catch (e){}

    function doTouch(e) {
        switch (e.type) {
            case "touchend":
                if($(".leftUp").hasClass("disable")||
                    $(".Up").hasClass("disable")||
                    $(".rightUp").hasClass("disable")||
                    $(".left").hasClass("disable")||
                    $(".right").hasClass("disable")||
                    $(".leftDown").hasClass("disable")||
                    $(".down").hasClass("disable")||
                    $(".rightDown").hasClass("disable")||
                    $(".center").hasClass("disable")){
                    return;
                }
                operationFlag = false
                $("#positionBtn").show();
                $("#TouchDiv").addClass("vhide");
                $("#" + id2).css({"top": initTop, "left": initLeft});
                ptzTouchFlag = false;

                sentCircleCgi(50,50,false);
                break;
            case "touchmove":
                operationFlag = true;
                if(($(".TITLE_7_SWITCH").is('.on')) || ($("#positionBtn").is(':visible'))){
                    return;
                }
                e.preventDefault();
                ptzTouchFlag = true;
                var touch = e.targetTouches[0];

                var dx = touch.pageX ;//+  ($("#jqmLayerPortrait").height()-$("#jqmLayerPortrait").height()*currentZoomValue) /currentZoomValue / 2;
                var dy = touch.pageY ;
                
                var leftHeight = Size.LEFT;
                var topHeight = Size.TOP;

                if (Math.sqrt(Math.pow(dx - a - leftHeight, 2) + Math.pow(dy - b - topHeight, 2)) <= (centerX - touchX)) {
                     var left = dx - joystickX + joystickWidth - touchX - leftHeight;
                     var top = dy - joystickY - touchY - topHeight + (joystickY - joystickCoreY);
                    $("#" + id2).css({"top": top, "left": left});
                     // alert(parseInt($("#setupDiv").css("top")) + "  " + parseInt($("#setupDiv").css("left")) + "   " + Size.LEFT + "  " + Size.WIDTH + "  " + "  " +left + "  " +  dx + "  "  + joystickX + "  "  + joystickWidth + "  "  + touchX + "  "  + leftHeight);
                } else {
                    var x = dx - joystickX -(joystickWidth/2) - leftHeight;
                    var y = dy - joystickY - (joystickWidth/2) - topHeight;
                    var r =(joystickWidth - joystickCoreWidth)/2;
                    var left = x;
                    var top = y;
                    var ans = GetPoint(0, 0, r, 0, 0, x, y);
                    if (Math.sqrt((ans[0] - x) * (ans[0] - x) + (ans[1] - y) * (ans[1] - y)) < Math.sqrt((ans[2] - x) * (ans[2] - x) + (ans[3] - y) * (ans[3] - y))) {
                        left = ans[0] ;
                        top = ans[1] ;
                    } else {
                        left = ans[2] ;
                        top = ans[3] ;
                    }
                    left = left + (joystickX - mainLeftWidth) + (centerX - touchX );
                    top = top + centerY - touchY + (joystickY - joystickCoreY);
                    $("#" + id2).css({"top": top, "left": left});
                }

                controlPtzMoveMouse(dx,dy);
                break;
        }
    }

    $("#" + id).on({
        touchstart: function (e) {
            e.preventDefault();
        },
        touchmove: function (e) {
            e.preventDefault();
        },
        touchend: function (e) {
        },
    });
    var tx, ty, mx, my;
    $("#" + id2).on({
        touchstart: function (e) {
            e.preventDefault();
            var touch = e.originalEvent.targetTouches[0];
            tx = touch.pageX;
            ty = touch.pageY;

            ptzTouchFlag = true;
            controlPtzMoveMouse(tx,ty);
        },
        touchmove: function (e) {
            e.preventDefault();
            var touch = e.originalEvent.targetTouches[0];
            mx = touch.pageX;
            my = touch.pageY;
            if (Math.sqrt(Math.pow(mx - a, 2) + Math.pow(my - b, 2)) <= centerX) {
                var left = mx - joystickX + joystickWidth - touchX;
                var top = my - joystickY - touchY;
                $("#" + id2).css({"top": top, "left": left});
            } else {
                $("#" + id2).css({"top": initTop, "left": initLeft});
            }

            controlPtzMoveMouse(mx,my);
        },
        touchend: function (e) {
            $("#positionBtn").show();
            $("#TouchDiv").addClass("vhide");
            $("#" + id2).css({"top": initTop, "left": initLeft});

            ptzTouchFlag = false;
            sentCircleCgi(50,50,false);
        },
    });
}

function controlPtzMoveMouse(clientXValue,clientYValue) {
    if (ptzTouchFlag) {
        controlPtzCgi(ptzTouchMMCjosize, ptzTouchMMCjisize, ptzTouchMMCcenterX, ptzTouchMMCcenterY, false,clientXValue,clientYValue);
    }
}

function controlPtzCgi(ptzMMCjosize, ptzMMCjisize, ptzMMCcenterX, ptzMMCcenterY,flg,clientXValue,clientYValue) {
    var eid = "joystick";
    // ptzMMCjosize/98   (1-49,51-99)
    var boxClientX = document.getElementById(eid).getBoundingClientRect().left;   // X(0,0)
    var boxClientY = document.getElementById(eid).getBoundingClientRect().top;

    var cgiX = 50; // stop cgi
    var cgiY = 50; // stop cgi

    if (Math.sqrt(Math.pow(clientXValue - boxClientX - ptzMMCjosize / 2, 2) + Math.pow(clientYValue - boxClientY - ptzMMCjosize / 2, 2)) <= ptzMMCjosize / 2 - ptzMMCjisize / 2) {
        cgiX += Number((clientXValue - ptzMMCcenterX - boxClientX) / ptzMMCjosize * 98);
        cgiY -= Number((clientYValue - ptzMMCcenterY - boxClientY) / ptzMMCjosize * 98);
    } else {
        var x = clientXValue - boxClientX,
            y = clientYValue - boxClientY,
            r = ptzMMCjosize / 2 - ptzMMCjisize / 2;

        var ans = GetPoint(ptzMMCcenterX, ptzMMCcenterY, r, ptzMMCcenterX, ptzMMCcenterY, x, y);

        if (Math.sqrt((ans[0] - x) * (ans[0] - x) + (ans[1] - y) * (ans[1] - y)) < Math.sqrt((ans[2] - x) * (ans[2] - x) + (ans[3] - y) * (ans[3] - y))) {
            cgiX += Number((ans[0] - ptzMMCcenterX) / ptzMMCjosize * 98);
            cgiY += Number((ptzMMCjosize - ans[1] - ptzMMCcenterY) / ptzMMCjosize * 98);
        } else {
            cgiX += Number((ans[2] - ptzMMCcenterX) / ptzMMCjosize * 98);
            cgiY += Number((ptzMMCjosize - ans[3] - ptzMMCcenterY) / ptzMMCjosize * 98);
        }
    }

    sentCircleCgi(cgiX, cgiY, flg);
}

/**
 * When mouse out,get the point.
 */
function GetPoint(cx, cy, r, stx, sty, edx, edy) {
    var k = (edy - sty) / (edx - stx);
    var b = edy - k * edx;

    var x1, y1, x2, y2;
    var c = cx * cx + (b - cy) * (b - cy) - r * r;
    var a = (1 + k * k);
    var b1 = (2 * cx - 2 * k * (b - cy));

    var tmp = Math.sqrt(b1 * b1 - 4 * a * c);

    x1 = (b1 + tmp) / (2 * a);
    y1 = k * x1 + b;

    x2 = (b1 - tmp) / (2 * a);
    y2 = k * x2 + b;

    return [x1, y1, x2, y2];
}

function sentCircleCgi(cgiX,cgiY,flg) {
    cgiX = Math.round(cgiX);
    cgiY = Math.round(cgiY);

    if(flg){
        cparam_set_CropHVPositionSpeedContro(cgiX, cgiY);
    }else{
        cparam_set_panTiltSpeedControl(cgiX, cgiY);
    }
}

/**
 * cgi命令的发送共通
 * @param ctrl
 * @constructor
 */
function DirectCtrl(ctrl) {
    var httpObj = createXMLHttpRequest();
    if (httpObj) {
        var sUrlSub = ( "aw_ptz?cmd=%23" + ctrl );
        httpObj.open("GET", "/cgi-bin/" + sUrlSub + "&res=1&page=" + ( ( new Date() ).getTime() ), true);
        httpObj.send(null);
    }
}
/**
 * 通信发送
 * */
function sendAuto(ctrl) {
    httpObj = createXMLHttpRequest();
    if (httpObj) {
        httpObj.open("GET", ctrl, true);
        httpObj.send(null);
    }
}

/*
 *通信的构建
 */
function createXMLHttpRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                return null;
            }
        }
    } else {
        return null;
    }
}