/**
 * 视频图层初期化方法
 * */
var LayerPortrait = layerPortrait();

function layerPortrait() {

    /**
     * ボタンオブジェクト
     * @type ButtonCtrl[]
     */
    var btnObject = [];

    var IMG_BACK = 0;

    var __sto = setInterval;

    var gBlackTimerInterval_5s;

    function build() {
        //初期化div的位置
        LoadSize("jqmLayerPortrait");
        //初期化图片
        //图片构建
        if($("#liveImage").length == 0) {
            btnObject[IMG_BACK] = ImgButtonCtrl("jqmLayerPortrait", "", "wth-100", callbackTab, "liveImage");
            btnObject[IMG_BACK].height("100%");
            // initLiveView();
            //add by wangpengze 20190122
            var src = InitImg();
            initMobileLiveView();
			//add by yangyang 20180911
            sessionStorage.showButtFlg = 1;
            sessionStorage.callbackFlg = 1;
            sessionStorage.touchIndex = 1;
            LayerFunction.build();
            //startCheckTally();
            $("#jqmLayerAll").hide();
            $("#jqmLayerMenuPT").hide();
            // $("#touchModeDiv").show();
            // $("#tallyBar").show();
            $("#jqmOther").show();
            // $("#" + "jqmLayerMenuPT").css({"margin-top": 0});
            // $("#jqmLayerMenu").hide();

            //黒画確認用5sタイマー
            gBlackTimerInterval_5s = setInterval(startBlackTimerInterval_5s, 5000);

        }else {
            $("#jqmTop").empty();
            $("#jqmMain").empty();
            $("#jqmBottom").empty();
            if(sessionStorage.showButtFlg == 1){
                LayerFunction.build();
            }
        }
        $(window).bind( 'orientationchange', function(e){
            if(operationFlag){
                sentCircleCgi(50,50,false);
            }
            $("#setupDiv").hide();
            if(window.orientation==180||window.orientation==0||window.orientation==90||window.orientation==-90){
                // screenIsChange();
                if($("#jqmLayerAll").css("display") == "block"){
                    sessionStorage.sessionindex = 1;
                } else if($("#jqmLayerMenuPT").css("display") == "block"){
                    sessionStorage.sessionindex = 2;
                } else{
                    sessionStorage.sessionindex = 0;
                }
                sessionStorage.reFlashFlag = 1;
                window.location.reload();

                setTimeout(function () {
                    $("#setupDiv").show();
                    //alert(currentZoomValue);
                },100)
            }
        });

        $("#setupDiv").on("click", function (e) {
            if ((!$("#jqmLayerAll").is(":visible")) && (!$("#jqmLayerMenuPT").is(":visible")))
            {
                //ボタンonclickは、ボタンのレイヤdivのonclickをブロックします。
                //不具合管理 #3686 #5
                //Touch AFボタンを押したら、Full Screenの画面をタップしなくてもOSE:69コマンドを投げている
                if(sessionStorage.callbackFlg == 0)
                {
                    sessionStorage.callbackFlg = 1;
                    return;
                }
                e = e || window.event;
                //Touch P/T とTouchAF全て無効の場合
                if(sessionStorage.touchIndex == 1)
                {
                    // 全て無効の場合、何にもしない
                }
                //Touch P/T有効の場合
                else if(sessionStorage.touchIndex == 2)
                {
                    //ライブ映像の解像度取得
                    var iResol = Setmenu.getResolution();
                    //クリックされた位置のX座標を算出し
                    var offsetX = e.offsetX;
                    //クリックされた位置のY座標を算出し
                    var offsetY = e.offsetY;
                    //映像上をマウスクリックされた場合、参考にクリックされた位置の座標を算出
                    if(cparam_get_UHDCrop() == 0 && cparam_get_bar() != 1 && $(".TITLE_7_SWITCH").is('.off')) {
                        checkoffset(offsetX, offsetY, iResol);
                    }
                }
                //TouchAF有効の場合
                else if(sessionStorage.touchIndex == 3)
                {
                    var x = e.offsetX / parseInt($('#liveImage').width());
                    var y = e.offsetY / parseInt($('#liveImage').height());
                    if(cparam_get_UHDCrop() == 0 && cparam_get_bar() != 1 && $(".TITLE_7_SWITCH").is('.off') && cparam_get_focusMode() != 1){
                        cparam_set_toutchAF(x * 100, y * 100);
                    }

                }
            }

        });

        screenIsChange();
    }

    function initLiveView() {

    }

    function initMobileLiveView() {
        if(gPower == 0){
            var img = document.getElementById("liveImage");
            img.src = "/css/mobile/parts/standby.gif";
        }
    }

    function closeLive(_live) {
        if(document.getElementById("jqmLayerMenu").style.display == "none"){
            _live.timerstart();

        }else{
            _live.timerStop();
            clearInterval(timerCloseLive);
        }

    }
    //图片点击事件 构建下一层
    function callbackTab(e) {
        if (e == Button.TOUCHSTART) {
            // sessionStorage.showButtFlg = 1; //modify by yangyang 20180911
            // LayerFunction.build();
            // startCheckTally();
            // stopCheckTally();
        }
    }

    /**
     * 映像上をマウスクリックされた場合、参考にクリックされた位置の座標を算出
     * @param offsetX
     * @param offsetY
     * @param iResol
     * @private
     */
    function checkoffset(offsetX,offsetY, iResol) {
        //映像上をマウスクリックされた場合、参考にクリックされた位置の座標を算出
        var x = offsetX / parseInt($('#liveImage').width());
        var y = offsetY / parseInt($('#liveImage').height());

        //Ipad映像 とPhone映像が320、640場合、実は映像が不足320、640
        switch (iResol) {
            case 320:
                offsetX = parseInt(x * 320);
                offsetY = parseInt(y * 180);
                break;
            case 640:
                offsetX = parseInt(x * 640);
                offsetY = parseInt(y * 360);
                break;
            case 1280:
                offsetX = parseInt(x * 1280);
                offsetY = parseInt(y * 720);
                break;
            case 1920:
                offsetX = parseInt(x * 1920);
                offsetY = parseInt(y * 1080);
                break;
            case 3840:
                offsetX = parseInt(x * 3840);
                offsetY = parseInt(y * 2160);
                break;
            default:
                break;
        }

        //D-Zoom Magnification
        getDZoomMagnification();
        //send_Cgi_center_clickを呼び出す
        send_Mobile_Cgi_center_click(offsetX,offsetY,iResol);
    }

    function getDZoomMagnification(){
        gD_Zoom_Magnification = cparam_get_dZoomMagnification();
    }

    //5sタイマー
    function startBlackTimerInterval_5s() {
        //黒画確認+getuidからリトライ
        checkBlackView_mobile();
    }
    //get_streaming_status
    //0：配信していない、1：配信している
    function getStreamingStatus_mobile() {
        let result = 0;
        let url = "/cgi-bin/get_streaming_status?UID=" + (StreamInfo.UID);
        //console.log("getStreamingStatus_mobile url=" + url);
        try {
            let ret = cparam_sendRequest(url);
            if (ret.length) {
                if (ret.indexOf("status") != 0) {
                    result = 0;
                    return result;
                }
                let streaming_status = ret.substring("status=".length);
                result = parseInt(streaming_status);
            }
            else {
                //コマンドに対してエラー
                result = 0;
            }
            return result;
        }
        catch (e) {
            return result;
        }
    }
    
    //黒画確認+getuidからリトライ
    function checkBlackView_mobile(){
        //StreamInfo.UIDが有効 !==-1 のとき
        let _now_streaming = true;

        //黒画判定
        if (StreamInfo !== null && StreamInfo.UID && StreamInfo.UID !== -1){
            let streaming_status = getStreamingStatus_mobile();
            //console.log("checkBlackView_mobile StreamInfo.UID ="+ StreamInfo.UID);
            //console.log("checkBlackView_mobile streaming_status ="+ streaming_status);
            if (streaming_status == 0){
                _now_streaming = false;
            }
        }else{
            //UID取れてない=配信していない 
            _now_streaming = false;
        }
        if (_now_streaming == true) return;
    
        //getuidからやり直すので、InitImgを呼ぶ
        InitImg();
    }

    return {
        build: build,
        initLiveView:initLiveView
    }
}

