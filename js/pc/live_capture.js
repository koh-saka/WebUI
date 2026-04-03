/**
 * @fileOverview Setup画面:usermng制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var liveCapture = liveCapture();

/**
 * setup画面:capture制御に関わる画面クラス
 * @class Settings画面:usermng制御に関わる画面クラス
 * @return {function} capture 構築処理
 * @return {function} rebuild 再構築処理
 * @constructor
 */

function liveCapture() {

    /**
     * div定義
     * @type string
     */
    var div = "div_btn";
    /**
     * ボタンオブジェクト
     * @type btnObject[]
     */
    var btnObject = [];
    /**
     * btn_user_authボタンオブジェクト(インデックス値)
     *  @type object
     */
    var BTN_CAPTURE_SAVE = 0;
    /**
     * btn_host_authボタンオブジェクト(インデックス値)
     *  @type object
     */
    var BTN_CAPTURE_PRINT = 1;
    /**
     * btn_host_authボタンオブジェクト(インデックス値)
     *  @type object
     */
    var BTN_CAPTURE_CLOSE = 2;

    /**
     * User設定画面構築処理
     */
    function build() {

        btnObject[BTN_CAPTURE_SAVE] = ButtonCtrl(div, "btn_capture_save", NPTZ_WORDING.wID_0425, callbackControl, BTN_CAPTURE_SAVE);
        btnObject[BTN_CAPTURE_PRINT] = ButtonCtrl(div, "btn_capture_print", NPTZ_WORDING.wID_0426, callbackControl, BTN_CAPTURE_PRINT);
        btnObject[BTN_CAPTURE_CLOSE] = ButtonCtrl(div, "btn_capture_close", NPTZ_WORDING.wID_0427, callbackControl, BTN_CAPTURE_CLOSE);

        for (var btn in btnObject) {
            btnObject[btn].show();
            btnObject[btn].displayOff();
        }
        btnObject[BTN_CAPTURE_SAVE].hide();
        btnObject[BTN_CAPTURE_PRINT].hide();

        var name,value;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?");
        str=str.substr(num+1);

        $("#img")[0].src = "/cgi-bin/view.cgi?action=snapshot&resolution="+str;
    }

    /**
     * ExportSelectボタン押下時の画面表示切替処理
     */
    function callbackControl(mouse, type) {
        if (mouse == Button.MOUSE_UP) {
            if (type == BTN_CAPTURE_SAVE) {

            } else if (type == BTN_CAPTURE_PRINT) {

            } else if (type == BTN_CAPTURE_CLOSE) {
                window.close();
            }
        }
    }

    return {
        build: build
    };
}