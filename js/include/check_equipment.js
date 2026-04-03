/**
 * onload処理<br>
 * Platformクラスのstartを実行<br>
 */
var bEnableOpenLivePage = false;
function onload() {
    var sUA = window.navigator.userAgent.toLowerCase();
    if ((sUA.indexOf('iphone') != -1) || (sUA.indexOf('ipod') != -1) ||
        (sUA.indexOf('ipad') != -1) || (sUA.indexOf('android') != -1)) {
        location.replace("./mobile/live/index.html");
    } else {
        isInternetExplorer();
    }
}
function IsIE()
{
    var userAgent = window.navigator.userAgent.toLowerCase();
    var bwInfo;
    bwInfo = ( (userAgent.indexOf("MSIE") >= 0) || (userAgent.indexOf("trident") >= 0) );
    if ( bwInfo != false )
    {
        return true;
    }
    else
    {
        return false;
    }
}
function isInternetExplorer() {
    var bRet = false;
    if (IsIE()) {
        try {
            CheckInstallActiveX();
            location.replace("/live/index.html");
        } catch (e) {
            bRet = confirm(MSG_STATUS.mID_0036);
            if (bRet) {
                cparam_cgi_iaxcIso();
                location.replace("/live/index.html");
            } else {

            }
        }
    } else {
        location.replace("/live/index.html");
    }
}

function cparam_cgi_iaxcIso() {
    var type = "GET";
    var url = "/cgi-bin/iaxc_iso";
    _cparam_Cgi_NoData_sendRequset(type, url);
}

function _cparam_Cgi_NoData_sendRequset(type, uri) {
    var retValue = null;
    $.ajax({
        type: type,
        url: uri,
        async: false,
        timeout: 5 * 1000,
        success: function (data) {
            if(data) {
                retValue = data;
            }
        },
        error: function () {
        }
    });
    return retValue;
}

function CheckInstallActiveX() {
// ActiveXがインストールされている(使用できる)かどうかをチェックするだけ
    document.WebVideo.SetMenuItem(1, "Dummy");
}