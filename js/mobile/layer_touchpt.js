

var LayerTouchpt = layertouchpt();

function layertouchpt() {
    var btnObject = [];
    var TITLE_TOUCHOFF = 0;
    var TITLE_TOUCHPT = 1;
    var TITLE_TOUCHAF=2;
    function build() {

        LoadSize("jqmLayerMenuPT");
        btnObject[TITLE_TOUCHOFF] = ButtonCtrl("menuTitlept", "TITLE_TOUCH_OFF","OFF", callbackOperation, 0);
        btnObject[TITLE_TOUCHPT] = ButtonCtrl("menuTitlept", "TITLE_TOUCH_PT","Touch P/T", callbackOperation, 1);
        btnObject[TITLE_TOUCHAF] = ButtonCtrl("menuTitlept", "TITLE_TOUCH_AF",NPTZ_WORDING.wID_0414, callbackOperation,2);
        btnObject[TITLE_TOUCHPT].show();
        btnObject[TITLE_TOUCHAF].show();
        btnObject[TITLE_TOUCHOFF].show();

        if(sessionStorage.touchIndex==2){
        btnObject[TITLE_TOUCHPT].displayOn();
        btnObject[TITLE_TOUCHAF].displayOff();
        btnObject[TITLE_TOUCHOFF].displayOff();
        }else if(sessionStorage.touchIndex==3){
            btnObject[TITLE_TOUCHPT].displayOff();
            btnObject[TITLE_TOUCHAF].displayOn();
            btnObject[TITLE_TOUCHOFF].displayOff();
        } else {
            btnObject[TITLE_TOUCHPT].displayOff();
            btnObject[TITLE_TOUCHAF].displayOff();
            btnObject[TITLE_TOUCHOFF].displayOn();
        }
        function callbackOperation(e, index) {
            if ( (e == Button.TOUCHSTART)  || (e == Button.TOUCHEND)) {
                if (index == 1) {
                    if( btnObject[TITLE_TOUCHPT].getStatus() == Button.STATUS_DISABLED){
                        return;
                    }
                     // var iResol = window.parent.menubarCtrl.menubar_GetResolution();
                    btnObject[TITLE_TOUCHPT].displayOn();
                    if(gURCPMode == 0) {
                        btnObject[TITLE_TOUCHAF].displayOff();
                    }
                    btnObject[TITLE_TOUCHOFF].displayOff();
                    $(".txt_Touch_title").find("p").text("Touch P/T");
                    // $("#jqmtopPT").empty();
                    // $("#jqmtopPT").html("Touch P/T");
                } else if (index == 2) {
                    if( btnObject[TITLE_TOUCHAF].getStatus() == Button.STATUS_DISABLED){
                        return;
                    }
                    btnObject[TITLE_TOUCHAF].displayOn();
                    btnObject[TITLE_TOUCHPT].displayOff();
                    btnObject[TITLE_TOUCHOFF].displayOff();
                    $(".txt_Touch_title").find("p").text("Touch AF");
                    // $("#jqmtopPT").empty();
                    // $("#jqmtopPT").html("Touch AF");
                }
                else
                {
                    btnObject[TITLE_TOUCHOFF].displayOn();
                    btnObject[TITLE_TOUCHPT].displayOff();
                    if(gURCPMode == 0){
                        btnObject[TITLE_TOUCHAF].displayOff();
                    }
                    $(".txt_Touch_title").find("p").text("");
                    sessionStorage.touchIndex = 0;
                }
            }
            sessionStorage.touchIndex = index + 1;
            sessionStorage.callbackFlg = 0;
            $("#jqmLayerMenuPT").hide();
            // $("#touchModeDiv").show();
            // $("#tallyBar").show();
            $("#jqmOther").show();
        }


    }

    function updataState() {
        if(sessionStorage.touchIndex==2){
            btnObject[TITLE_TOUCHPT].displayOn();
            btnObject[TITLE_TOUCHAF].displayOff();
            btnObject[TITLE_TOUCHOFF].displayOff();
            $(".txt_Touch_title").find("p").text("Touch P/T");
        }else if(sessionStorage.touchIndex==3){
            btnObject[TITLE_TOUCHAF].displayOn();
            btnObject[TITLE_TOUCHPT].displayOff();
            btnObject[TITLE_TOUCHOFF].displayOff();
            $(".txt_Touch_title").find("p").text("Touch AF");
        } else {
            btnObject[TITLE_TOUCHPT].displayOff();
            btnObject[TITLE_TOUCHAF].displayOff();
            btnObject[TITLE_TOUCHOFF].displayOn();
            $(".txt_Touch_title").find("p").text("");
        }

        let bar = 0;
        if(!reqCgiObj){
            bar = cparam_get_bar();
        }else{
            bar = reqCgiObj.bar;
        }
        if((gURCPMode != 0) || (bar == 1)) {
            btnObject[TITLE_TOUCHAF].displayDisabled();
            btnObject[TITLE_TOUCHPT].displayDisabled();
            $(".txt_Touch_title").find("p").text("");
        } else if (AutoFocus ==1) {
            btnObject[TITLE_TOUCHAF].displayDisabled();
            if(sessionStorage.touchIndex==3) {
                $(".txt_Touch_title").find("p").text("");
            }
        }
    }

    return {
        build: build,
        updataState:updataState
    }
}