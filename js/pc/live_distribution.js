/**
 * @fileOverview Setup画面:usermng制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var liveDistribution = liveDistribution();

/**
 * setup画面:usermng制御に関わる画面クラス
 * @class Settings画面:usermng制御に関わる画面クラス
 * @return {function} build 構築処理
 * @return {function} rebuild 再構築処理
 * @return {function} show 表示処理
 * @return {function} hide 非表示処理
 * @constructor
 */

function liveDistribution() {

    /**
     * div定義
     * @type string
     */
    var div = "liveDistributionForm";
    /**
     * ボタンオブジェクト
     * @type btnObject[]
     */
    var btnObject = [];
    /**
     * ボタンオブジェクト
     * @type btnObject[]
     */
    var txtObject = [];
    /**
     * btn_user_authボタンオブジェクト(インデックス値)
     *  @type object
     */
    var BTN_OK = 0;
    /**
     * btn_host_authボタンオブジェクト(インデックス値)
     *  @type object
     */

    var BTN_CANCEL = 1;
    /**
     * ボタンオブジェクト(インデックス値)
     * @type {number}
     */
    var TXT_SERVER = 0;
    /**
     * ボタンオブジェクト(インデックス値)
     * @type {number}
     */
    var TXT_SERVER_URL = 1;
    /**
     * ボタンオブジェクト(インデックス値)
     * @type {number}
     */
    var TXT_STREAM_KEY = 2;

    /**
     * User設定画面構築処理
     */
    function build() {

        btnObject[BTN_OK] = ButtonCtrl(div, "btn_ok", NPTZ_WORDING.wID_0039, callbackControl, BTN_OK);
        btnObject[BTN_CANCEL] = ButtonCtrl(div, "btn_cancel", NPTZ_WORDING.wID_0040, callbackControl, BTN_CANCEL);
        //TXT_SERVER
        txtObject[TXT_SERVER] = TextCtrl(div, 'txt_server', NPTZ_WORDING.wID_0170);
        //TXT_SERVER_URL
        txtObject[TXT_SERVER_URL] = TextCtrl(div, 'txt_server_rul', NPTZ_WORDING.wID_0171);
        //TXT_STREAM_KEY
        txtObject[TXT_STREAM_KEY] = TextCtrl(div, 'txt_stream_key', NPTZ_WORDING.wID_0172);

        $('#div_distribution').append($('<div id="div_distribution_title">' + 'distribution' + '</div>'));

        for (var i = 0; i < txtObject.length; i++) {
            txtObject[i].show();
        }
        for (var btn in btnObject) {
            btnObject[btn].show();
            btnObject[btn].displayOff();
        }
        for (var txt in txtObject) {
            txtObject[txt].show();
        }

        $('#liveDistributionServer').change(function () {
            if($('#liveDistributionServer').val() == 1){
                $('.txt_stream_key').show();
                $('#liveDistributionStreamKey').show();
            } else if ($('#liveDistributionServer').val() == 2){
                $('.txt_stream_key').hide();
                $('#liveDistributionStreamKey').hide();
            }
        })

    }

    /**
     * ExportSelectボタン押下時の画面表示切替処理
     */
    function callbackControl(mouse, type) {
        if (mouse == Button.MOUSE_DOWN) {
            if (type == BTN_OK) {

            } else if (type == BTN_CANCEL) {
                window.close();
            }
        }
    }


    return {
        build: build
    };

}