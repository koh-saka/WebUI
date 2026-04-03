// cparam.jsを再利用する。
// _cparam_Cgi_NoData_sendRequset, _cparam_awCmd_sendRequsetはcparam.jsで定義されているが、
// webWorkerPaint内ではjQueryの使用ができないので、cparam.jsでの関数定義を解除し、webWorkerPaint内で再定義したものを利用する。
importScripts("/js/include/cparam.js");
_cparam_Cgi_NoData_sendRequset = null;
_cparam_awCmd_sendRequset = null;

let brightnessObj = {};
let pictureObj = {};
let matrixObj = {};
let gammaKneeObj = {};
let detailObj = {};
let brightnessObjCopy = null;
let pictureObjCopy = null;
let matrixObjCopy = null;
let gammaKneeObjCopy = null;
let detailObjCopy = null;
let isFirst = true;
let procTime = {"Brightness" : null, "Picture" : null, "Matrix" : null, "GammaKnee" : null, "Detail" : null};
let nowTab = "Brightness";
let nowTabProcTime = null;
let timerID = null;
self.onmessage = function (data) {
    // 現在のタブを変更する。
    nowTab = data.data.nowTab;
    nowTabProcTime = procTime[nowTab];
}

function firstPaintDataGetProc() {
    // 初回に実行する処理
    let retArray = {"Brightness" : null, "Picture" : null, "Matrix" : null, "GammaKnee" : null, "Detail" : null};
    
    // 最初に開くタブのデータを取得して返す。
    retArray.Brightness = getBrightness();
    retArray.GammaKnee = getGammaKnee();
    postMessage(retArray);
    
    // 残りのデータを取得して返す。
    retArray = {"Brightness" : null, "Picture" : null, "Matrix" : null, "GammaKnee" : null, "Detail" : null};
    retArray.Picture = getPicture();
    retArray.Matrix = getMatrix();
    retArray.Detail = getDetail();
    postMessage(retArray);
    
    // 1秒後にデータ取得
    timerID = setTimeout(paintDataGetIntervalProc, 1000);
}

function getBrightness() {

    // Brightnessタブデータ取得処理
    brightnessObj = {};
    brightnessObj.PictureLevel = cparam_get_pictureLevel();
    brightnessObj.PeakRatio = cparam_get_PeakRatio();
    brightnessObj.IrisAutoSpeed = cparam_get_irisAutoSpeed();
    brightnessObj.IrisMode = cparam_get_irismode();
    brightnessObj.IrisAutoWindow = cparam_get_irisAutoWindow();
    brightnessObj.Agc = cparam_get_agc();
    brightnessObj.AgcMaxGain = cparam_get_AGCMaxGain();
    brightnessObj.FrameMixSw = cparam_get_frameMixSw();
    brightnessObj.IrisClose = cparam_get_irisClose();
    brightnessObj.AutoShutter = cparam_get_autoShutter();
    brightnessObj.ELCLimit = cparam_get_ELCLimit();
    brightnessObj.Gain = cparam_get_gain();
    brightnessObj.FrameMix = cparam_get_framMix();
    brightnessObj.DayNight = cparam_get_dayNight();
    brightnessObj.ShutterSw = cparam_get_shutterSw();
    brightnessObj.ShutterMode = cparam_get_shutterMode();
    brightnessObj.ShutterStepVal = cparam_get_stepVAL();
    brightnessObj.ShutterSyncVal = cparam_get_synchroVAL();
    
    if (JSON.stringify(brightnessObjCopy) != JSON.stringify(brightnessObj)) {
        // データが異なる場合は送信対象としてデータを保存。
        brightnessObjCopy = JSON.parse(JSON.stringify(brightnessObj));
    } else {
        // 同じデータの場合はデータ送信対象外
        brightnessObj = null;
    }
    
    return brightnessObj;
}

function getPicture() {

    // Pictureタブデータ取得処理
    pictureObj = {};
    pictureObj.ATW = cparam_get_atw();
    pictureObj.WhiteBalanceMode = cparam_get_whiteBalanceMode();
    pictureObj.WBalVar = cparam_get_ColorTemperature();
    pictureObj.ATWSpeedValue = cparam_get_ATWSpeed();
    pictureObj.ATWTargetR = cparam_get_ATWTargetR();
    pictureObj.ATWTargetB = cparam_get_ATWTargetB();
    pictureObj.ColorTemperatureSetting = cparam_get_ColorTemperatureSetting();
    pictureObj.ColorTempBch = cparam_get_ColorTempBch();
    pictureObj.ColorRGainBch = cparam_get_Color_RGainBch();
    pictureObj.ColorGGainBch = cparam_get_Color_GGainBch();
    pictureObj.ColorBGainBch = cparam_get_Color_BGainBch();
    pictureObj.ShocklessWbSw = cparam_get_shocklessWbSw();
    pictureObj.PedestalOffset = cparam_get_pedestalOffset();
    pictureObj.ChromaLevelSwitch = cparam_get_ChromaLevelSwitch();
    pictureObj.AWBGainOffset = cparam_get_AWBGainOffset();
    pictureObj.ShocklessWbSwSpeed = cparam_get_ShocklessWbSwSpeed();
    pictureObj.MasterPedestal = cparam_get_masterPedestal();
    pictureObj.RPedestal = cparam_get_RPedestal();
    pictureObj.BPedestal = cparam_get_BPedestal();
    pictureObj.GPedestal = cparam_get_GPedestal();
    pictureObj.ChromaLevel = cparam_get_chromaLevel();
    pictureObj.RGain = cparam_get_Color_RGain();
    pictureObj.BGain = cparam_get_Color_BGain();
    pictureObj.GAxis = cparam_get_Color_GAxis();
    pictureObj.PresetRGain = cparam_get_Color_PresetRGain();
    pictureObj.PresetGGain = cparam_get_Color_PresetGGain();
    pictureObj.PresetBGain = cparam_get_Color_PresetBGain();
    pictureObj.PresetRGainAch = cparam_get_Color_PresetRGainAch();
    pictureObj.PresetGGainAch = cparam_get_Color_PresetGGainAch();
    pictureObj.PresetBGainAch = cparam_get_Color_PresetBGainAch();
    pictureObj.PresetRGainBch = cparam_get_Color_PresetRGainBch();
    pictureObj.PresetGGainBch = cparam_get_Color_PresetGGainBch();
    pictureObj.PresetBGainBch = cparam_get_Color_PresetBGainBch();
    pictureObj.GainOffsetBch = cparam_get_gainOffsetBch();
    pictureObj.MasterFlare = cparam_get_Color_MasterFlare();
    pictureObj.RFlare = cparam_get_Color_RFlare();
    pictureObj.GFlare = cparam_get_Color_GFlare();
    pictureObj.BFlare = cparam_get_Color_BFlare();
    pictureObj.DnrLevel = cparam_get_DnrLevel();
    pictureObj.MasterBlackGamma = cparam_get_MasterBlackGamma();
    pictureObj.RBlackGamma = cparam_get_RBlackGamma();
    pictureObj.BBlackGamma = cparam_get_BBlackGamma();
    pictureObj.HLGKneePoint = cparam_get_HLGKneePoint();
    pictureObj.HLGKneeSlope = cparam_get_HLGKneeSlope();
    pictureObj.PictureGain = cparam_get_PictureGain();
    pictureObj.PicturePoint = cparam_get_PicturePoint();
    pictureObj.PictureSlope = cparam_get_PictureSlope();
    pictureObj.PictureBlackOffset = cparam_get_PictureBlackOffset();
    pictureObj.GainRelControlSwitch = cparam_get_gGainRelControlSwitch();
    pictureObj.Flare = cparam_get_flare();
    pictureObj.DNR = cparam_get_DNR();
    pictureObj.HlgMode = cparam_get_hlgMode();
    pictureObj.SdrConvertMode = cparam_get_sdrConvertMode();
    pictureObj.BlackGammaSw = cparam_get_blackGammaSw();
    pictureObj.HLGKneeSW = cparam_get_HLGKneeSW();
    pictureObj.VLogMode = cparam_get_v_log();
    pictureObj.BGainValue = cparam_get_BGain();
    pictureObj.LevelDepend = cparam_get_levelDepend();
    pictureObj.SkinDetailValue = cparam_get_skinDetail();
    pictureObj.MasterDetail = cparam_get_masterDetail();
    pictureObj.HDRMode = cparam_get_hdr();
    pictureObj.VLogPaintSw = cparam_get_v_log_paint_sw();
    
    if (JSON.stringify(pictureObjCopy) != JSON.stringify(pictureObj)) {
        // データが異なる場合は送信対象としてデータを保存。
        pictureObjCopy = JSON.parse(JSON.stringify(pictureObj));
    } else {
        // 同じデータの場合はデータ送信対象外
        pictureObj = null;
    }
    
    return pictureObj;
}

function getMatrix() {

    // Matrixタブデータ取得処理
    matrixObj = {};
    matrixObj.GetMatrixValue = cparam_get_matrix();
    matrixObj.getPresetMatrixValue = cparam_get_matrixType();
    matrixObj.getlinearMatrixValue = cparam_get_linearMatrix();
    matrixObj.getlinearTableValue = cparam_get_linearTable();
    matrixObj.getcolorCorrectValue = cparam_get_colorCorrect();
    matrixObj.getcolorCorrectABValue = cparam_get_colorCorrectAB();
    matrixObj.getMatrixRGValue = cparam_get_matrixRG();
    matrixObj.getMatrixRGPhaseValue = cparam_get_matrixRGRight();
    matrixObj.getMatrixRBPhaseValue = cparam_get_matrixRB();
    matrixObj.getMatrixRBRightValue = cparam_get_matrixRBRight();
    matrixObj.getMatrixGRValue = cparam_get_matrixGR();
    matrixObj.getMatrixGRRightValue = cparam_get_matrixGRRight();
    matrixObj.getMatrixGBValue = cparam_get_matrixGB();
    matrixObj.getMatrixGBRightValue = cparam_get_matrixGBRight();
    matrixObj.getMatrixBRValue = cparam_get_matrixBR();
    matrixObj.getMatrixBRRightValue = cparam_get_matrixBRRight();
    matrixObj.getMatrixBGValue = cparam_get_matrixBG();
    matrixObj.getMatrixBGRightValue = cparam_get_matrixBGRight();
    matrixObj.getColorRSaturationValue = cparam_get_rSaturation();
    matrixObj.getColorRPhaseValue = cparam_get_rPhase();
    matrixObj.getColorRYlSaturationValue = cparam_get_rYiSaturation();
    matrixObj.getColorRYlPhaseValue = cparam_get_rYiPhase();
    matrixObj.getColorYlSaturationValue = cparam_get_yiSaturation();
    matrixObj.getColorYlPhaseValue = cparam_get_yiPhase();
    matrixObj.getColorYlGSaturationValue = cparam_get_yigSaturation();
    matrixObj.getColorYlGPhaseValue = cparam_get_yigPhase();
    matrixObj.getColorGSaturationValue = cparam_get_gSaturation();
    matrixObj.getColorGPhaseValue = cparam_get_gPhase();
    matrixObj.getColorGCySaturationValue = cparam_get_gCySaturation();
    matrixObj.getColorGCyPhaseValue = cparam_get_gCyPhase();
    matrixObj.getColorCySaturationValue = cparam_get_cySaturation();
    matrixObj.getColorCyPhaseValue = cparam_get_cyPhase();
    matrixObj.getColorCyBSaturationValue = cparam_get_cyBSaturation();
    matrixObj.getColorCyBPhaseValue = cparam_get_cyBPhase();
    matrixObj.getColorBSaturationValue = cparam_get_bSaturation();
    matrixObj.getColorBPhaseValue = cparam_get_bPhase();
    matrixObj.getColorBMGSaturationValue = cparam_get_bMgSaturation();
    matrixObj.getColorBMGPhaseValue = cparam_get_bMgPhase();
    matrixObj.getColorMGSaturationValue = cparam_get_mgSauration();
    matrixObj.getColorMGPhaseValue = cparam_get_mgPhase();
    matrixObj.getColorMGRSaturationValue = cparam_get_mgRSaturation();
    matrixObj.getColorMGRPhaseValue = cparam_get_mgRPhase();
    
    if (JSON.stringify(matrixObjCopy) != JSON.stringify(matrixObj)) {
        // データが異なる場合は送信対象としてデータを保存。
        matrixObjCopy = JSON.parse(JSON.stringify(matrixObj));
    } else {
        // 同じデータの場合はデータ送信対象外
        matrixObj = null;
    }
    
    return matrixObj;
}

function getGammaKnee() {

    // GAMMA/KNEEタブデータ取得処理
    gammaKneeObj = {};
    gammaKneeObj.GammaDefaultValue = cparam_get_gamma_qsa_0a();
    gammaKneeObj.GammaModeDefaultValue = cparam_get_gamma_select_mode_qsj_d7();
    gammaKneeObj.BlackGammaDefaultValue = cparam_get_black_gamma_qsa_0b();
    gammaKneeObj.InitialGammaDefaultValue = cparam_get_initial_gamma_qsl_44();
    gammaKneeObj.KneeDefaultValue = cparam_get_knee_qsl_45();
    gammaKneeObj.KneeModeDefaultValue = cparam_get_knee_mode_qsl_46();
    gammaKneeObj.KneeAutoResponeDefaultValue = cparam_get_aKneeResponse();
    gammaKneeObj.WhiteClipDefaultValue = cparam_get_whiteClip_qsa_2e();
    gammaKneeObj.HiColorDefaultValue = cparam_get_hi_color_qsl_49();
    gammaKneeObj.DrsDefaultValue = cparam_get_drs_qsa_0d();
    gammaKneeObj.MasterGammaDefault = cparam_get_gamma();
    gammaKneeObj.RGammaDefault = cparam_get_r_gamma_qsi_35();
    gammaKneeObj.BFammaDefault = cparam_get_b_gamma_qsi_36();
    gammaKneeObj.MasterBlackDefault = cparam_get_blackGamma();
    gammaKneeObj.RBlackGammaDefalut = cparam_get_rBlackGamma_qsa_08();
    gammaKneeObj.BBlackGammaDefault = cparam_get_bBlackGamma_qsa_09();
    gammaKneeObj.BlackGammaRangeDefault = cparam_get_blackGammaRange_qsj_1b();
    gammaKneeObj.KneeMasterPointDefault = cparam_get_kneePoint();
    gammaKneeObj.KneeRPointDefault = cparam_get_kneeRPoint_qsa_22();
    gammaKneeObj.KneeBPointDefault = cparam_get_kneeBPoint_qsa_23();
    gammaKneeObj.KneeMasterSlopeDefault = cparam_get_kneeSlope();
    gammaKneeObj.KneeRSlopeDefault = cparam_get_knee_RSlope_qsa_26();
    gammaKneeObj.KneeBSlopeDefault = cparam_get_knee_BSlope_osa_27();
    gammaKneeObj.MasterWhiteClipDefault = cparam_get_masterWhiteClipLevel_qsa_2a();
    gammaKneeObj.RWhiteClipDefault = cparam_get_RWhiteClipLevel_qsl_47();
    gammaKneeObj.BWhiteClipDefault = cparam_get_BWhiteClipLevel_qsl_48();
    gammaKneeObj.HiColorLevelDefault = cparam_get_HiColorLevel_qsl_4a();
    gammaKneeObj.DrsEffectDefault = cparam_get_drsEffectDepth_qsl_4b();
    
    if (JSON.stringify(gammaKneeObjCopy) != JSON.stringify(gammaKneeObj)) {
        // データが異なる場合は送信対象としてデータを保存。
        gammaKneeObjCopy = JSON.parse(JSON.stringify(gammaKneeObj));
    } else {
        // 同じデータの場合はデータ送信対象外
        gammaKneeObj = null;
    }
    
    return gammaKneeObj;
}

function getDetail() {

    // DETAILタブデータ取得処理
    detailObj = {};
    detailObj.MasterDetail = cparam_get_DetailmasterDetail();
    detailObj.DetailPeakFrequency = cparam_get_peakFrequency();
    detailObj.DetailCrisp = cparam_get_crisp();
    detailObj.DetailGainPlus = cparam_get_gainPlus();
    detailObj.DetailGainMinus = cparam_get_gainMinus();
    detailObj.DetailClipPlus = cparam_get_detailClipPlus();
    detailObj.DetailClipMinus = cparam_get_detailClipMinus();
    detailObj.DetailKneeApertureLevel = cparam_get_detailKneeApertureLevel();
    detailObj.DetailKnee = cparam_get_detailKnee();
    detailObj.DetailLevelDependent = cparam_get_detailLevelDependent();
    detailObj.DarkDetail = cparam_get_DarkDetail();
    detailObj.ChromaLevel = cparam_get_downconchromaLevel();
    detailObj.DownconMasterDetail = cparam_get_masterDetail();
    detailObj.DownconHDetailLevel = cparam_get_downconHDetailLevel();
    detailObj.DownconVDetailLevel = cparam_get_downconVDetailLevel();
    detailObj.DownconPeakFrequency = cparam_get_downconPeakFrequency();
    detailObj.DownconVDetailFrequency = cparam_get_downconVDetailFrequency();
    detailObj.DownconCrisp = cparam_get_downconCrisp();
    detailObj.DetailDownconClipPlus = cparam_get_detailDownconClipPlus();
    detailObj.DetailDownconClipMinus = cparam_get_detailDownconClipMinus();
    detailObj.DetailDownconKneeApertureLevel = cparam_get_detailDownconKneeApertureLevel();
    detailObj.DetailDownconKnee = cparam_get_detailDownconKnee();
    detailObj.DetailDownconLevelDependent = cparam_get_downconLevelDependent();
    detailObj.DownconDarkDetail = cparam_get_downconDarkDetail();
    detailObj.DownconSkinToneCrisp = cparam_get_downconSkinToneCrisp();
    detailObj.DownconICenter = cparam_get_downconICenter();
    detailObj.DownconIWidth = cparam_get_downconIWidth();
    detailObj.DownconQWidth = cparam_get_downconQWidth();
    detailObj.DownconQPhase = cparam_get_downconQPhase();
    detailObj.SkinToneCrisp = cparam_get_skinToneCrisp();
    detailObj.SkinToneICenter = cparam_get_skinToneICenter();
    detailObj.SkinToneIWidth = cparam_get_skinToneIWidth();
    detailObj.SkinToneQWidth = cparam_get_skinToneQWidth();
    detailObj.SkinToneQPhase = cparam_get_skinToneQPhase();
    detailObj.Detail = cparam_get_detail();
    detailObj.LevelDependent = cparam_get_levelDependentSwitch();
    detailObj.DarkDetailSw = cparam_get_darkDetailSwitch();
    detailObj.DownconDetail = cparam_get_downconDetail();
    detailObj.ChromaLevelSw = cparam_get_downconchromaLevelSwitch();
    detailObj.DownconLevelDependent = cparam_get_downconLevelDependentSwitch();
    detailObj.DownconDarkDetailSw = cparam_get_downconDarkDetailSwitch();
    detailObj.DownconSkinToneDetail = cparam_get_skinToneSwitch();
    detailObj.DownconSkinToneMemorySelect = cparam_get_memorySelectSwitch();
    detailObj.DownconZebra = cparam_get_downconZebra();
    detailObj.DownconZebraEffectMemory = cparam_get_zebraEffectMemory();
    detailObj.DownconSkinToneEffectMemory = cparam_get_skinToneEffectMemory();
    detailObj.SkinToneDetail = cparam_get_skinToneDetail();
    detailObj.SkinToneDetailMemorySelect = cparam_get_skinToneDetailMemorySelectSwitch();
    detailObj.SkinToneZebra = cparam_get_zebra();
    detailObj.SkinToneZebraEffectMemory = cparam_get_toneZebraEffectMemory();
    detailObj.SkinToneEffectMemory = cparam_get_toneEffectMemory();
    
    if (JSON.stringify(detailObjCopy) != JSON.stringify(detailObj)) {
        // データが異なる場合は送信対象としてデータを保存。
        detailObjCopy = JSON.parse(JSON.stringify(detailObj));
    } else {
        // 同じデータの場合はデータ送信対象外
        detailObj = null;
    }
    return detailObj;
}

function getNowTime() {
    // 現在の時刻を取得。
    let dateTime = new Date();
    return dateTime.getTime();
}

function paintDataGetIntervalProc() {

    // 現在の時刻を取得。
    let nowTime = getNowTime();
    let getTabName = "";
    let nowTabFlg = false;
    
    // データ取得対象タブの決定
    // 表示中タブの取得時間と比較
    if(nowTabProcTime) {
        // 時間が記録されている場合は前回取得あり。
        if((nowTime - nowTabProcTime) >= 3000) {
            // 前回より3秒以上経過の場合は現在のタブのデータを取得
            getTabName = nowTab;
            nowTabFlg = true;
        } else {
            // 前回より3秒以上たっていない場合は、古いタブのデータを取得
            let oldTime = null;
            for(let key in procTime) {
                if(key != nowTab) {
                    // 現在開かれているタブ以外
                    if(procTime[key]) {
                        // 時間記録済みの場合
                        if(oldTime) {
                            // データ取得候補タブの時間保存済み
                            if(oldTime > procTime[key]) {
                                // 古いタブが見つかれば取得候補タブ入れ替え
                                getTabName = key;
                                oldTime = procTime[key];
                            }
                        } else {
                            // 取得候補がない場合は、まずは見つかったタブに設定。
                            getTabName = key;
                            oldTime = procTime[key];
                        }
                    } else {
                        // 時間未記録の場合は、このタブに決定する。（他タブの検索をしない。）
                        getTabName = key;
                        break;
                    }
                }
            }
        }
    } else {
        // 現在のタブが未取得の場合、現在のタブに決定。
        getTabName = nowTab;
        nowTabFlg = true;
    }
    
    // データを取得して返す。
    let retArray = {"Brightness" : null, "Picture" : null, "Matrix" : null, "GammaKnee" : null, "Detail" : null};
    let sendFlg = true;
    switch(getTabName) {
    case "Brightness":
    case "GammaKnee":
        retArray.Brightness = getBrightness();
        retArray.GammaKnee = getGammaKnee();
        sendFlg = retArray.Brightness != null || retArray.GammaKnee != null;
        break;
    case "Picture":
        retArray.Picture = getPicture();
        sendFlg = retArray.Picture != null;
        break;
    case "Matrix":
        retArray.Matrix = getMatrix();
        sendFlg = retArray.Matrix != null;
        break;
    case "Detail":
        retArray.Detail = getDetail();
        sendFlg = retArray.Detail != null;
        break;
    default:
        sendFlg = false;
        break;
    }
    
    // 送信可能な場合はメインスレッドに送信する。
    if(sendFlg) {
        postMessage(retArray);
    }
    
    // 時間を保存する
    procTime[getTabName] = nowTime;
    if(nowTabFlg) {
        // 現在のタブの場合は、現在のタブ取得時刻変数にも記録する。
        nowTabProcTime = nowTime;
    }
    
    // 次のデータ取得をスケジュールする。
    let nextTime = 1000 - (getNowTime() - nowTime);
    if(nextTime < 0) {
        // 取得開始～終了までで処理経過時間が1000msを超えている場合は次のデータ取得を即時実行する。
        nextTime = 0;
    }
    timerID = setTimeout(paintDataGetIntervalProc, nextTime);
}

// コマンドの再定義
_cparam_awCmd_sendRequset = function (reqCmd, respCmd) {

    var retValue = "";

    var uri = _aw_cam + reqCmd + "&res=1";
    if (reqCmd.indexOf("#") == 0) {
        reqCmd = reqCmd.replace("#", '%23');
        uri = _aw_ptz + reqCmd + "&res=1";
    }
    var reqobj = _cparam_createXMLHttpRequest(null);
    if (!reqobj) return;
    try {
        reqobj.open("GET", uri, false);
        try {
            if (typeof reqobj.timeout !== 'undefined') {
                reqobj.timeout = 5 * 1000;
            }
        } catch (e) {
        }
        reqobj.send(null);
        if (reqobj.readyState == 4 && reqobj.status == 200) {
            var data = reqobj.responseText;
            try { //add by yangyang 20180911
                if (data.indexOf(respCmd) == 0) {
                    retValue = data.substring(respCmd.length);
                } else {
                    retValue = data;
                }
            }
            catch (e) {
                retValue = "";
            }
            delete reqobj;
            return retValue;
        } else {
            delete reqobj
            return "";
        }
    }
    catch (e) {
        delete reqobj;
        return "";
    }
}

function _cparam_createXMLHttpRequest(cbFunc) {
    var XMLhttpObject = null;
    try {
        XMLhttpObject = new XMLHttpRequest();
    } catch (e) {
        try {
            XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                return null;
            }
        }
    }
    XMLhttpObject.onreadystatechange = cbFunc;
    return XMLhttpObject;
}

_cparam_Cgi_NoData_sendRequset = function (type, uri) {
    var retValue = "";
    var reqobj = _cparam_createXMLHttpRequest(null);
    if (!reqobj) return;
    try {
        reqobj.open(type, uri, false);
        try {
            if (typeof reqobj.timeout !== 'undefined') {
                reqobj.timeout = 5 * 1000;
            }
        } catch (e) {
        }
        reqobj.send(null);
        if (reqobj.readyState == 4 && reqobj.status == 200) {
            retValue = reqobj.responseText;
            delete reqobj;
            return retValue;
        } else {
            delete reqobj
            return "";
        }
    }
    catch (e) {
        delete reqobj;
        return "";
    }
}

// WebWorkerPaint処理開始
firstPaintDataGetProc();
