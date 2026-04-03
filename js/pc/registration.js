/**
 * @fileOverview Login画面の定義クラス
 *
 * @author Panasonic Corporation
 */

/**
 * Login画面のインスタンス
 * @type Registration
 */
var registration = Registration();
$(function init() {
    registration.build();
});

/**
 * 画面制御の基本処理を管理するクラス
 * @class 画面制御の基本処理を管理するクラス
 * @constructor
 */
function Registration() {
    /**
     * 構築済みフラグ
     * @type boolean
     */
    var buildFlag = false;


    /**
     * ボタンオブジェクト
     * @type userModeObject[]
     */
    var userModeObject = [];
    /**
     * ボタンオブジェクト
     * @type btnObject[]
     */
    var btnObject = [];
    /**
     * ボタンオブジェクト
     * @type regUserObject[]
     */
    var regUserObject = [];

    var USER_MODE_ADD_USER = 0;
    var TXT_ADD_USER_NAME = 0;
    var TXT_ADD_USER_PASSWORD = 1;
    var TXT_ADD_USER_PASSWORD_RETRY = 2;
    /**
     * ボタンオブジェクト
     * @type regUserWarningObject[]
     */
    var regUserWarningObject = [];
    var TXT_REG_USER_WARNING_TITLE = 0;
    var TXT_REG_USER_WARNING_RECOMMENDED = 1;
    var TXT_REG_USER_WARNING_RECOMMENDED_DETAIL = 2;
    /**
     * btn_reg_setボタンオブジェクト(インデックス値)
     *  @type object
     */
    var BTN_REG_SET = 0;
    var BTN_REG_CONTINUE = 1;
    var BTN_REG_BACK = 2;
    var divRegMask;

    /**
     * Login画面の構築処理
     */
    function build() {
        if (!buildFlag) {
            buildFlag = true;
            var regDiv = 'adminRegistrationMain';
            var warningDiv = 'registrationWarning';
            userModeObject[USER_MODE_ADD_USER] = TextCtrl(regDiv, "registration_admin_title", NPTZ_WORDING.wID_0060);
            //reg user area
            regUserObject[TXT_ADD_USER_NAME] = TextCtrl(regDiv, "txt_reg_user_name", NPTZ_WORDING.wID_0061);
            LineCtrl(regDiv, 'horizontal', 90, 19, 900).show();
            regUserObject[TXT_ADD_USER_PASSWORD] = TextCtrl(regDiv, "txt_reg_user_password", NPTZ_WORDING.wID_0062);
            LineCtrl(regDiv, 'horizontal', 140, 19, 900).show();
            regUserObject[TXT_ADD_USER_PASSWORD_RETRY] = TextCtrl(regDiv, "txt_reg_user_repassword", NPTZ_WORDING.wID_0063);
            LineCtrl(regDiv, 'horizontal', 190, 19, 900).show();
            btnObject[BTN_REG_SET] = ButtonCtrl(regDiv, "btn_reg_admin_set", NPTZ_WORDING.wID_0141, callbackRegUser);
            regUserWarningObject[TXT_REG_USER_WARNING_TITLE] = TextCtrl(warningDiv, "txt_reg_warning_title", NPTZ_WORDING.wID_0064);
            regUserWarningObject[TXT_REG_USER_WARNING_RECOMMENDED] = TextCtrl(warningDiv, "txt_reg_warning_recommend", NPTZ_WORDING.wID_0065);
            regUserWarningObject[TXT_REG_USER_WARNING_RECOMMENDED_DETAIL] = TextCtrl(warningDiv, "txt_reg_warning_recommend_detail", NPTZ_WORDING.wID_0066);
            btnObject[BTN_REG_CONTINUE] = ButtonCtrl(warningDiv, "btn_reg_admin_continue", NPTZ_WORDING.wID_0429, callbackRegContinue);
            btnObject[BTN_REG_BACK] = ButtonCtrl(warningDiv, "btn_reg_admin_back", NPTZ_WORDING.wID_0430, callbackRegBack);

            var reload = document.getElementById("reConnect");
            reload.onclick = function () {
                reloadMain();
            };
            divRegMask = document.getElementById("registration_mask");

            for (var i = 0; i < userModeObject.length; i++) {
                userModeObject[i].show();
            }
            for (var i = 0; i < regUserObject.length; i++) {
                regUserObject[i].show();
            }
            for (var i = 0; i < btnObject.length; i++) {
                btnObject[i].show();
                btnObject[i].displayOff();
            }
            for (var i = 0; i < regUserWarningObject.length; i++) {
                regUserWarningObject[i].show();
            }
            $('#adminRegistrationMain').show();
            $('#registrationWarning').hide();
            $('#registration_complete').hide();
        }
    }

    function callbackRegUser(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            // 入力チェック
            var errMsg = checkInput(
                $("#reg_user_name").val(),
                $("#reg_user_password").val(),
                $("#reg_user_repassword").val()
            );
            if (errMsg) {
                jAlert(errMsg, NPTZ_WORDING.wID_0039);
                return;
            } else if (!checkWarning($("#reg_user_password").val())) {
                divRegMask.style.visibility = "visible";
                $('#registrationWarning').show();
            } else {
                registerAndShowComplete();
            }
        }
    }
	function callbackToMain(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $('#base').show();
            $('#adminRegistration').hide();
            divRegMask.style.visibility = "hidden";
            displayBaseHeaderTab.build();
        }
    }

    function callbackRegContinue(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            registerAndShowComplete();
        }
    }

    function registerAndShowComplete() {
        $('#registrationWarning').hide();
        $('#adminRegistrationMain').hide();
        $('#registrationTitle').html('Administrator registration completed.');
        $('#registration_complete').show();
        divRegMask.style.visibility = "hidden";
        $.ajax({
            type: "post",
            url: "/cgi-bin/user.cgi",
            data: getAddUserData(),
            success: function (data) {
                setTimeout(function () {
                    $("#dialog_setup").hide();
                }, 500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function () {
                    $("#dialog_setup").hide();
                }, 500);
            }
        });
        setTimeout(reloadMain, 10000);
    }

    function callbackRegBack(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $('#adminRegistrationMain').show();
            $('#registrationWarning').hide();
            $('#registration_complete').hide();
            divRegMask.style.visibility = "hidden";
        }
    }

    function reloadMain() {
        $('#registration_complete').hide();
        $('#base').show();
        window.location.href = '/live/index.html';
    }

    function getAddUserData() {
        var data = {};
        data['name'] = $("#reg_user_name").val();
        data['password'] = $("#reg_user_password").val();
        data['repassword'] = $("#reg_user_repassword").val();
        data['access_level'] = '1';
        return data;
    }

    /**
     * 入力文字列のチェック処理
     * @param {string} login 入力ホスト名
     * @param {string} password 入力ポートNo
     * @param {string} passwordRetype 入力説明文
     * @returns {string} チェック結果に対応するメッセージ、チェックOK時はNULLを返却する。
     */
    function checkInput(login, password, passwordRetype) {

        // エラーメッセージ変数、定義値
        var errMsg = '';

        // 空白チェック
        if (!login.match(/\S/g)) {
            errMsg += MSG_STATUS.mID_0078;
            return errMsg;
        }

        // 文字以外を使用
        //不具合管理 #6193 ユーザー登録アカウント画面のUser Nameに#が含まれていたら警告画面を表示するように対応をお願いいたします。
        var checkRegx = /[^a-zA-Z0-9!$%'()*+,-.\/?@\[\]\{\}\=^_`~]/g;
        if (login.match(checkRegx)) {
            errMsg += MSG_STATUS.mID_0079;
            return errMsg;
        }
        // ------------------- Passwordチェック ------------------- //
        var checkPass = /[^a-zA-Z0-9!#$%'()*+,-.\/?@\[\]^_`~]/g;
        if (!password.match(/\S/g)) {
            errMsg += MSG_STATUS.mID_0080;
            return errMsg;
        }
        // 文字以外を使用
        if (password.match(checkPass)) {
            errMsg += MSG_STATUS.mID_0079;
            return errMsg;
        }

        // if (!passwordRetype.match(/\S/g)) {
        //     errMsg += MSG_STATUS.mID_0081;
        //     return errMsg;
        // }
        //
        // // 文字以外を使用
        // if (password.match(checkRegx)) {
        //     errMsg += MSG_STATUS.mID_0079;
        //     return errMsg;
        // }

        if (password != passwordRetype) {
            errMsg += MSG_STATUS.mID_0082;
            return errMsg;
        } else if( password.length <  4 || passwordRetype.length <  4) {
            errMsg += MSG_STATUS.mID_0083;
            return errMsg;
        }

        return errMsg;
    }

    function checkWarning(password) {
        var regex = new RegExp("^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,32}$");
        return regex.test(password);
    }

    return {
        build: build,

        show: function () {
            // 現状処理無し
        }
    };
}
