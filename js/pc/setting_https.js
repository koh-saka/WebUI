/**
 * @fileOverview Setup画面:settingHttps制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var settinghttps = settingHttps();

/**
 * setup画面:Https制御に関わる画面クラス
 * @class Settings画面:Https制御に関わる画面クラス
 * @constructor
 */

function settingHttps() {

    var giRsaLength;

    var _mac_disp = cparams.macadr.replace(/:/g, "-");

    /**
     * User設定画面構築処理
     */
    function build() {
        cparam_updateHttpInfo();
        cparam_updateInformation();
    }

    function getGiRsaLength(){
        return giRsaLength;
    }

    function CreateWindowOpen(iParam) {
        var name = "";
        var openurl = "";
        var style = "menubar=no,toolbar=no,status=no,resizable=no,width=700,height=560,top=104,left=162";
        if (iParam == 1) {
            name = "https_signe" + _mac_disp.replace(/-/g, "");
            openurl = "/live/crtkey_create_disp.html";
        }
        else if (iParam == 2) {
            name = "https_signe" + _mac_disp.replace(/-/g, "");
            openurl = "/live/self_signed_create_disp.html";
            settingNetworkAdvanced.getAdvanceHttpsBtnStatus();
        }
        else if (iParam == 3) {
            setTimeout("CreateCaSignedOpen()", 1000);
        }
        else if (iParam == 4) {
            name = "setup_network_crtkey_change";
            openurl = "/live/setup_network_crtkey_change.html";
            style = "menubar=no,toolbar=no,status=no,resizable=no,width=600,height=300,top=104,left=162";
        }
        else if (iParam == 5) {
            name = "setup_network_crtkey_history";
            openurl = "/live/setup_network_crtkey_history.html";
            style = "menubar=no,toolbar=no,status=no,resizable=no,width=720,height=360,top=104,left=162"
        }
        if (iParam != 3) {
            objWindow = window.open(openurl, name, style);
        }

    }

    function updateHttpsBtnStatus(){
        settingNetworkAdvanced.getAdvanceHttpsBtnStatus();
    }

    function CreateCaSignedOpen() {
        var name = "https_signe" + _mac_disp.replace(/-/g, "");
        var openurl = "/live/ca_signed_create_disp.html";
        var style = "menubar=no,toolbar=no,status=no,resizable=no,width=700,height=560,top=104,left=162";
        objWindow = window.open(openurl, name, style);
    }

    function alert(){
        jAlert("error:status 0!!!",NPTZ_WORDING.wID_0039);
    }
    return {
        build: build,
        CreateWindowOpen: CreateWindowOpen,
        giRsaLength: getGiRsaLength,
        CreateCaSignedOpen:CreateCaSignedOpen,
        alert:alert,
        updateHttpsBtnStatus:updateHttpsBtnStatus
    };
}