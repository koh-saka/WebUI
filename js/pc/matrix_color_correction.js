/**
     * settingMatrix:settingMatrix制御に関わる画面クラス
     * @class settingMatrix画面:settingMatrix制御に関わる画面クラス
     * @return {{build: buildSettingMatrix, rebuild: rebuild}} build 構築�E琁E
     * @return {function} rebuild 再構築�E琁E
     * @constructor
     */
var settingMatrix = settingMatrix();
function DispState() {
    settingMatrix.build()
}
function settingMatrix() {
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildFlag_settingMatrix = false;
    /**
     * label定義
     * @type number
     */
    var TXT_IMAGE_ADJUST_MATRIX_LINEAR_MATRIX = 0;
    var MATRIX_COLOR_CORRECTION = 1;
    var TXT_IMAGE_ADJUST_MATRIX_R_G = 2;
    var TXT_IMAGE_ADJUST_MATRIX_R_B = 3;
    var TXT_IMAGE_ADJUST_MATRIX_G_R = 4;
    var TXT_IMAGE_ADJUST_MATRIX_G_B = 5;
    var TXT_IMAGE_ADJUST_MATRIX_B_R = 6;
    var TXT_IMAGE_ADJUST_MATRIX_B_G = 7;
    var TXT_IMAGE_ADJUST_PRESET_MATRIX = 8;
    var TXT_IMAGE_ADJUST_MATRIX = 9;
    var TXT_IMAGE_ADJUST_LINEAR_MATRIX = 10;
    var TXT_IMAGE_ADJUST_LINEAR_TABLE = 11;
    var TXT_IMAGE_ADJUST_COLOR_CORRECT = 12;
    var TXT_IMAGE_ADJUST_COLOR_CORRECT_AB = 13;
    var TXT_IMAGE_ADJUST_MATRIX_B_MG = 14;
    var TXT_IMAGE_ADJUST_MATRIX_MG = 15;
    var TXT_IMAGE_ADJUST_MATRIX_MG_R = 16;
    var TXT_IMAGE_ADJUST_MATRIX_R = 17;
    var TXT_IMAGE_ADJUST_MATRIX_R_Yl = 19;
    var TXT_IMAGE_ADJUST_MATRIX_Yl = 21;
    var TXT_IMAGE_ADJUST_MATRIX_Yl_G = 23;
    var TXT_IMAGE_ADJUST_MATRIX_G = 24;
    var TXT_IMAGE_ADJUST_MATRIX_G_Cy = 25;
    var TXT_IMAGE_ADJUST_MATRIX_Cy = 26;
    var TXT_IMAGE_ADJUST_MATRIX_Cy_B = 27;
    var TXT_IMAGE_ADJUST_MATRIX_B = 28;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation = 29;
    var TXT_IMAGE_ADJUST_MATRIX_Phase = 30;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_s = 31;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_p = 32;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_a = 33;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_h = 34;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_t = 35;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_a = 36;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_u = 37;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_s = 38;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_r = 39;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_e = 40;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_i = 41;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_ph = 42;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_o = 43;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_se = 44;
    var TXT_IMAGE_ADJUST_MATRIX_Saturation_Sat = 45;
    var TXT_IMAGE_ADJUST_MATRIX_Phase_Pha = 46;
    var TXT_IMAGE_MATRIX_Saturation_o = 47;
    var TXT_IMAGE_MATRIX_Phase = 48;
    var TXT_IMAGE_MATRIX_S = 49;
    var TXT_IMAGE_MATRIX_P = 50;
    var TXT_IMAGE_MATRIX_Sa = 51;
    var TXT_IMAGE_MATRIX_h = 52;
    var TXT_IMAGE_MATRIX_Sat = 53;
    var TXT_IMAGE_MATRIX_a = 54;
    var TXT_IMAGE_MATRIX_u = 55;
    var TXT_IMAGE_MATRIX_s = 56;
    var TXT_IMAGE_ADJUST_MATRIX_CORRECTION_COLOR = 61;
    var TXT_IMAGE_ADJUST_MATRIX_CORRECTION_SATURATION = 62;
    var TXT_IMAGE_ADJUST_MATRIX_CORRECTION_PHASE = 63;
    var TXT_IMAGE_ADJUST_MATRIX_COLORCORRECTION_COLOR = 64;
    var TXT_IMAGE_ADJUST_MATRIX_COLORCORRECTION_SATURATION = 65;
    var TXT_IMAGE_ADJUST_MATRIX_COLORCORRECTION_PHASE = 66;

    var sliderMatrix_R_G;
    var sliderMatrix_R_G_phase;
    var sliderMatrix_R_B;
    var sliderMatrix_R_B_phase;
    var sliderMatrix_G_R;
    var sliderMatrix_G_R_phase;
    var sliderMatrix_G_B;
    var sliderMatrix_G_B_phase;
    var sliderMatrix_B_R;
    var sliderMatrix_B_R_phase;
    var sliderMatrix_B_G;
    var sliderMatrix_B_G_phase;
    var sliderMatrix_B_MG_saturation;
    var sliderMatrix_B_MG_phase;
    var sliderMatrix_Mg_saturation;
    var sliderMatrix_Mg_phase;
    var sliderMatrix_Mg_R_saturation;
    var sliderMatrix_Mg_R_phase;
    var sliderMatrix_R_saturation;
    var sliderMatrix_R_phase;
    var sliderMatrix_R_Yl_saturation;
    var sliderMatrix_R_Yl_phase;
    var sliderMatrix_Yl_saturation;
    var sliderMatrix_Yl_phase;
    var sliderMatrix_Yl_G_saturation;
    var sliderMatrix_Yl_G_phase;
    var sliderMatrix_G_saturation;
    var sliderMatrix_G_phase;
    var sliderMatrix_G_Cy_saturation;
    var sliderMatrix_G_Cy_phase;
    var sliderMatrix_Cy_saturation;
    var sliderMatrix_Cy_phase;
    var sliderMatrix_Cy_B_saturation;
    var sliderMatrix_Cy_B_phase;
    var sliderMatrix_B_saturation;
    var sliderMatrix_B_phase;

    var txtMatrixObject = [];

    var presetMatrixRadioButtonGroup;
    var matrixRadioButtonGroup;
    var linearMatrixRadioButtonGroup;
    var linearTableRadioButtonGroup;
    var colorCorrectRadioButtonGroup;
    var colorCorrectABRadioButtonGroup;



    var selectImageAdjustMatrixType;
    var myScroll = null;
    var buildScrollSuccessFlg = true;
    var TAB_LINEAR_MATRIX = 0;
    var TAB_COLOR_CORRECTION = 1;
    var btnObject = [];

    var canvasItems = {};

    function getPolygon() {
        var retOjects = {}
        retOjects = {
            pointR: { x: 0x7EB - 0x800, y: 0x860 - 0x800 }
            , pointG: { x: 0x7B6 - 0x800, y: 0x7A9 - 0x800 }
            , pointB: { x: 0x860 - 0x800, y: 0x7F7 - 0x800 }
            , pointCY: { x: 0x815 - 0x800, y: 0x7A0 - 0x800 }
            , pointMG: { x: 0x84A - 0x800, y: 0x857 - 0x800 }
            , pointYL: { x: 0x7A0 - 0x800, y: 0x809 - 0x800 }
        };
        return retOjects;
    }

    var canRefresh = true;
    function getCoordinatesDate() {
        var ret;
        ret = request_matrix();
        var retOject = {};
        var division = ret.split(':')
        retOject = {
            pointR: { x: parseInt(division[0], 16) - 0x800, y: parseInt(division[1], 16) - 0x800 }
            , pointG: { x: parseInt(division[2], 16) - 0x800, y: parseInt(division[3], 16) - 0x800 }
            , pointB: { x: parseInt(division[4], 16) - 0x800, y: parseInt(division[5], 16) - 0x800 }
            , pointCY: { x: parseInt(division[6], 16) - 0x800, y: parseInt(division[7], 16) - 0x800 }
            , pointMG: { x: parseInt(division[8], 16) - 0x800, y: parseInt(division[9], 16) - 0x800 }
            , pointYL: { x: parseInt(division[10], 16) - 0x800, y: parseInt(division[11], 16) - 0x800 }
        };
        return retOject;
    }


    function settingRadar() {
        var radar = getCoordinatesDate()
        var polygon = getPolygon()
        var ratio = 510 / 265;
        var canvas = document.getElementById("radarCanvas");
        var ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(398, 146);
        ctx.rotate = getRad(180);
        ctx.scale(1, -1);
        ctx.beginPath();
        ctx.arc(0, 0, 50 / ratio, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'rgba(134, 134, 134, 1)'
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(0, 0, 100 / ratio, 0, 2 * Math.PI, true)
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(0, 0, 150 / ratio, 0, 2 * Math.PI, true)
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(0, 0, 200 / ratio, 0, 2 * Math.PI, true)
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(0, 0, 250 / ratio, 0, 2 * Math.PI, true)
        ctx.stroke();
        ctx.closePath();
        // 圆形边框宽度
        ctx.lineWidth = '1'
        // 边框颜色
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(134, 134, 134, 1)';
        ctx.lineWidth = '2';
        ctx.moveTo(polygon.pointR.x / ratio, polygon.pointR.y / ratio);
        ctx.lineTo(polygon.pointMG.x / ratio, polygon.pointMG.y / ratio);
        ctx.lineTo(polygon.pointB.x / ratio, polygon.pointB.y / ratio);
        ctx.lineTo(polygon.pointCY.x / ratio, polygon.pointCY.y / ratio);
        ctx.lineTo(polygon.pointG.x / ratio, polygon.pointG.y / ratio);
        ctx.lineTo(polygon.pointYL.x / ratio, polygon.pointYL.y / ratio);
        ctx.lineTo(polygon.pointR.x / ratio, polygon.pointR.y / ratio);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(244, 244, 244, 1)';
        ctx.lineWidth = '2';
        ctx.moveTo(radar.pointR.x / ratio, radar.pointR.y / ratio);
        ctx.lineTo(radar.pointMG.x / ratio, radar.pointMG.y / ratio);
        ctx.lineTo(radar.pointB.x / ratio, radar.pointB.y / ratio);
        ctx.lineTo(radar.pointCY.x / ratio, radar.pointCY.y / ratio);
        ctx.lineTo(radar.pointG.x / ratio, radar.pointG.y / ratio);
        ctx.lineTo(radar.pointYL.x / ratio, radar.pointYL.y / ratio);
        ctx.lineTo(radar.pointR.x / ratio, radar.pointR.y / ratio);


        function getRad(degree) {
            return degree / 180 * Math.PI;
        }
        rotateText(ctx, "R", '#FF0000', radar.pointR.x / ratio, radar.pointR.y / ratio);
        rotateText(ctx, "YL", '#FFFF00', radar.pointYL.x / ratio, radar.pointYL.y / ratio);
        rotateText(ctx, "G", '#00FF00', radar.pointG.x / ratio, radar.pointG.y / ratio);
        rotateText(ctx, "Cy", '#00FFFF', radar.pointCY.x / ratio, radar.pointCY.y / ratio);
        rotateText(ctx, "B", '#5252FF', radar.pointB.x / ratio, radar.pointB.y / ratio);
        rotateText(ctx, "Mg", '#FF00FF', radar.pointMG.x / ratio, radar.pointMG.y / ratio);
        ctx.closePath();
        ctx.stroke();


        ctx.restore();
        function rotateText(ctx, text, color, x, y) {
            ctx.save();
            ctx.translate(x, y)
            ctx.font = "bold 15px Arial";
            ctx.rotate = (getRad(180))
            ctx.scale(1, -1)
            ctx.fillStyle = color;
            ctx.fillText(text, 0, 0);
            ctx.restore();
        }
    }

    function linearMatrix() {
        setInterval(settingRadar, 1000)
    }

    function buildSettingMatrix() {
        if (myScroll != null) {
            myScroll.destroy();
            myScroll = null;
        }
        if (!buildFlag_settingMatrix) {
            buildFlag_settingMatrix = true;
            // Image adjust button
            btnObject[TAB_LINEAR_MATRIX] = MenuButtonCtrl('setup_imageAdjust_matrix_form_header', 'setup_imageAdjust_control_matrix_linear_btn', NPTZ_WORDING.wID_0895, callbackTABMatrixControl, TAB_LINEAR_MATRIX, MenuButtonType.TABLEFT);
            btnObject[TAB_COLOR_CORRECTION] = MenuButtonCtrl('setup_imageAdjust_matrix_form_header', 'setup_imageAdjust_control_color_correction_btn', NPTZ_WORDING.wID_0896, callbackTABMatrixControl, TAB_COLOR_CORRECTION, MenuButtonType.TABRIGHT);
            for (var text in btnObject) {
                btnObject[text].show();
                btnObject[text].displayOff();
            }

            $('#setup_imageAdjust_detail_matrix_linearMatrix_main').show();
            $('#setup_imageAdjust_detail_matrix_colorCorrection_main').hide();
            btnObject[TAB_LINEAR_MATRIX].displayOn();

            // PRESET MATRIX
            txtMatrixObject[TXT_IMAGE_ADJUST_PRESET_MATRIX] = TextCtrl('setup_imageAdjust_matrix_control_form', 'setup_imageadjust_preset_matrix_label', NPTZ_WORDING.wiD_0899);
            presetMatrixRadioButtonGroup = RadioButtonGroupCtrl('setup_imageAdjust_matrix_control_form', "setup_imageAdjust_preset_matrix_", RADIO_GROUP.rID_0106, getPresetMatrixValue(), callbackpresetMatrix);
            LineCtrl('setup_imageAdjust_matrix_control_form', 'horizontal', 73, 0, "", "setup_imageadjust_preset_matrix_label", "97");
            LineCtrl('setup_imageAdjust_matrix_control_form', 'vertical', 320, 37, 220, "setup_imageadjust_preset_matrix_label1");

            // ADJUST_MATRIX
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX] = TextCtrl('setup_imageAdjust_matrix_control_form', 'setup_imageadjust_matrix_label', NPTZ_WORDING.wiD_0900);
            matrixRadioButtonGroup = RadioButtonGroupCtrl('setup_imageAdjust_matrix_control_form', "setup_imageadjust_matrix_", RADIO_GROUP.rID_0095, getmatrixValue(), callbackmatrix);
            LineCtrl('setup_imageAdjust_matrix_control_form', 'horizontal', 209, 0, "", "setup_imageadjust_matrix_label", "97");

            // LINEAR_MATRIX
            txtMatrixObject[TXT_IMAGE_ADJUST_LINEAR_MATRIX] = TextCtrl('setup_imageAdjust_matrix_control_form', 'setup_imageadjust_linear_matrix_label', NPTZ_WORDING.wiD_0901);
            linearMatrixRadioButtonGroup = RadioButtonGroupCtrl('setup_imageAdjust_matrix_control_form', "setup_imageadjust_linear_matrix_", RADIO_GROUP.rID_0095, getlinearMatrixValue(), callbacklinearMatrix);
            LineCtrl('setup_imageAdjust_matrix_control_form', 'horizontal', 277, 0, "", "setup_imageadjust_linear_matrix_label", "97");

            //LINEAR_TABLE
            txtMatrixObject[TXT_IMAGE_ADJUST_LINEAR_TABLE] = TextCtrl('setup_imageAdjust_matrix_control_form', 'setup_imageadjust_linear_table_label', NPTZ_WORDING.wID_0902);
            linearTableRadioButtonGroup = RadioButtonGroupCtrl('setup_imageAdjust_matrix_control_form', "setup_imageadjust_linear_table_", RADIO_GROUP.rID_0093, getlinearTableValue(), callbacklinearTable);
            LineCtrl('setup_imageAdjust_matrix_control_form', 'horizontal', 277, 0, "", "setup_imageadjust_linear_table_label", "4");

            // COLOR_CORRECT
            txtMatrixObject[TXT_IMAGE_ADJUST_COLOR_CORRECT] = TextCtrl('setup_imageAdjust_matrix_control_form', 'setup_imageadjust_color_correct_label', NPTZ_WORDING.wiD_0903);
            colorCorrectRadioButtonGroup = RadioButtonGroupCtrl('setup_imageAdjust_matrix_control_form', "setup_imageadjust_color_correct_", RADIO_GROUP.rID_0095, getcolorCorrectValue(), callbackcolorCorrect);
            LineCtrl('setup_imageAdjust_matrix_control_form', 'horizontal', 373, 54, "", "setup_imageadjust_color_correct_label", "97");
            LineCtrl('setup_imageAdjust_matrix_control_form', 'vertical', 320, 37, 220, "setup_imageadjust_color_correct_label1");

            // COLOR_CORRECT_AB
            txtMatrixObject[TXT_IMAGE_ADJUST_COLOR_CORRECT_AB] = TextCtrl('setup_imageAdjust_matrix_control_form', 'setup_imageadjust_color_correct_ab_label', NPTZ_WORDING.wiD_0904);
            colorCorrectABRadioButtonGroup = RadioButtonGroupCtrl('setup_imageAdjust_matrix_control_form', "setup_imageadjust_color_correct_ab_", RADIO_GROUP.rID_0093, getcolorCorrectABValue(), callbackcolorCorrectAB);
            LineCtrl('setup_imageAdjust_matrix_control_form', 'horizontal', 1025, 0, "", "setup_imageadjust_color_correct_ab_label", "4");

            // liqiang change
            ImgCtrl('dragCanvas', "../img/COLOR CORRECTION_grid.png", 199, 28, "", 361, 361);
            ImgCtrl('dragCanvas', "../img/R.png", 353, 28, 53, 82, "R", 374, 22);
            ImgCtrl('dragCanvas', "../img/MG_R.png", 406, 39, 86, 97, "MG_R", 472, 44);
            ImgCtrl('dragCanvas', "../img/MG.png", 452, 96, 96, 86, "MG", 540, 117);
            ImgCtrl('dragCanvas', "../img/B_MG.png", 479, 182, 81, 52, "B_MG", 565, 212);
            ImgCtrl('dragCanvas', "../img/B.png", 452, 235, 96, 86, "B", 545, 306);
            ImgCtrl('dragCanvas', "../img/CY_B.png", 406, 281, 86, 96, "CY_B", 476, 377);
            ImgCtrl('dragCanvas', "../img/CY.png", 353, 308, 52, 81, "CY", 369, 408);
            ImgCtrl('dragCanvas', "../img/G_CY.png", 267, 281, 86, 96, "G_CY", 236, 383);
            ImgCtrl('dragCanvas', "../img/G.png", 210, 235, 96, 86, "G", 199, 306);
            ImgCtrl('dragCanvas', "../img/YE_G.png", 199, 182, 81, 52, "YE_G", 135, 212);
            ImgCtrl('dragCanvas', "../img/YE.png", 210, 96, 96, 86, "YE", 190, 117);
            ImgCtrl('dragCanvas', "../img/R_YE.png", 267, 39, 86, 96, "R_YE", 233, 43);

            // // Linear Matrix label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_LINEAR_MATRIX] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_title', 'setup_imageAdjust_detail_matrix_linearMatrix_label', NPTZ_WORDING.wID_0894);

            // Linear radar
            // txtMatrixObject[] = 
            //Color Correction label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_CORRECTION_COLOR] = TextCtrl('setup_imageAdjust_detail_matrix_Correction_title', 'setup_imageAdjust_detail_matrix_Correction_color_label', NPTZ_WORDING.wID_0337);
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_CORRECTION_SATURATION] = TextCtrl('setup_imageAdjust_detail_matrix_Correction_title', 'setup_imageAdjust_detail_matrix_Correction_saturation_label', NPTZ_WORDING.wID_0897);
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_CORRECTION_PHASE] = TextCtrl('setup_imageAdjust_detail_matrix_Correction_title', 'setup_imageAdjust_detail_matrix_Correction_phase_label', NPTZ_WORDING.wID_0898);


            // R-G label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_R_G] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_label', 'setup_imageAdjust_matrix_R_G_label', NPTZ_WORDING.wID_0330);
            // R-G slider
            sliderMatrix_R_G = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_R_G_slider', 31, -31, getMatrixRGValue(), callbackMatrixRG, null, null, null, null, null, null, null, null, null, true);
            // R-G slider phase
            sliderMatrix_R_G_phase = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_R_G_right_slider', 31, -31, getMatrixRGPhaseValue(), callbackMatrixRGRight, null, null, null, null, null, null, null, null, null, true);
            LineCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'horizontal', 68, 19, 760, "setup_imageAdjust_matrix_R_G_label", "92");

            // R-B label
            txtMatrixObject[
                TXT_IMAGE_ADJUST_MATRIX_R_B] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_label', 'setup_imageAdjust_matrix_R_B_label', NPTZ_WORDING.wID_0331);
            // R-B slider
            sliderMatrix_R_B = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_R_B_slider', 31, -31, getMatrixRBPhaseValue(), callbackMatrixRB, null, null, null, null, null, null, null, null, null, true);
            // R-B slider phase
            sliderMatrix_R_B_phase = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_R_B_right_slider', 31, -31, getMatrixRBRightValue(), callbackMatrixRBRight, null, null, null, null, null, null, null, null, null, true);
            LineCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'horizontal', 136, 19, 760, "setup_imageAdjust_matrix_R_B_label", "92");

            // G-R label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_G_R] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_label', 'setup_imageAdjust_matrix_G_R_label', NPTZ_WORDING.wID_0332);
            // G-R slider
            sliderMatrix_G_R = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_G_R_slider', 31, -31, getMatrixGRValue(), callbackMatrixGR, null, null, null, null, null, null, null, null, null, true);
            // G-R slider phase
            sliderMatrix_G_R_phase = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_G_R_right_slider', 31, -31, getMatrixGRRightValue(), callbackMatrixGRRight, null, null, null, null, null, null, null, null, null, true);
            LineCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'horizontal', 204, 19, 760, "setup_imageAdjust_matrix_G_R_label", "92");

            // G-B label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_G_B] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_label', 'setup_imageAdjust_matrix_G_B_label', NPTZ_WORDING.wID_0333);
            // G-B slider
            sliderMatrix_G_B = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_G_B_slider', 31, -31, getMatrixGBValue(), callbackMatrixGB, null, null, null, null, null, null, null, null, null, true);
            // G-B slider phase
            sliderMatrix_G_B_phase = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_G_B_right_slider', 31, -31, getMatrixGBRightValue(), callbackMatrixGBRight, null, null, null, null, null, null, null, null, null, true);
            LineCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'horizontal', 272, 19, 760, "setup_imageAdjust_matrix_G_B_label", "92");

            // B-R label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_B_R] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_label', 'setup_imageAdjust_matrix_B_R_label', NPTZ_WORDING.wID_0334);
            // B-R slider
            sliderMatrix_B_R = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_B_R_slider', 31, -31, getMatrixBRValue(), callbackMatrixBR, null, null, null, null, null, null, null, null, null, true);
            // B-R slider phase
            sliderMatrix_B_R_phase = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_B_R_right_slider', 31, -31, getMatrixBRRightValue(), callbackMatrixBRRight, null, null, null, null, null, null, null, null, null, true);
            LineCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'horizontal', 340, 19, 760, "setup_imageAdjust_matrix_B_R_label", "92");

            // B-G label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_B_G] = TextCtrl('setup_imageAdjust_detail_matrix_linearMatrix_label', 'setup_imageAdjust_matrix_B_G_label', NPTZ_WORDING.wID_0335);
            // B-G slider
            sliderMatrix_B_G = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_B_G_slider', 31, -31, getMatrixBGValue(), callbackMatrixBG, null, null, null, null, null, null, null, null, null, true);
            // B-G slider phase
            sliderMatrix_B_G_phase = SliderCtrl('setup_imageAdjust_detail_matrix_linearMatrix_form', 'setup_imageAdjust_matrix_B_G_right_slider', 31, -31, getMatrixBGRightValue(), callbackMatrixBGRight, null, null, null, null, null, null, null, null, null, true);

            // radar
            linearMatrix();

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_COLORCORRECTION_COLOR] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_title', 'setup_imageAdjust_detail_matrix_colorCorrection_color_label', NPTZ_WORDING.wID_0337);
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_COLORCORRECTION_SATURATION] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_title', 'setup_imageAdjust_detail_matrix_colorCorrection_saturation_label', NPTZ_WORDING.wID_0340);
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_COLORCORRECTION_PHASE] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_title', 'setup_imageAdjust_detail_matrix_colorCorrection_phase_label', NPTZ_WORDING.wID_0339);


            // R label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_R] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_R_label', NPTZ_WORDING.wID_0345);
            // R Saturation slider
            sliderMatrix_R_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_R_saturation_slider', 126, -127, getMatrixRSaturationValue(), callbackMatrixRSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // R phase slider
            sliderMatrix_R_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_R_phase_slider', 126, -127, getMatrixRPhaseValue(), callbackMatrixRPhase, null, null, null, null, null, null, null, null, 'R_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 340, 19, 760, "setup_imageAdjust_matrix_R_label", "92");

            // R_YE
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_R_Yl] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_R_Yl_label', NPTZ_WORDING.wID_0347);
            // R_YE Saturation slider
            sliderMatrix_R_Yl_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_R_Yl_saturation_slider', 126, -127, getMatrixRYlSaturationValue(), callbackMatrixRYlSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // R_YE phase slider
            sliderMatrix_R_Yl_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_R_Yl_phase_slider', 126, -127, getMatrixRYlPhaseValue(), callbackMatrixRYlPhase, null, null, null, null, null, null, null, null, 'R_YE_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 476, 19, 760, "setup_imageAdjust_matrix_R_Yl_label", "92");

            // Yl
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Yl] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_Yl_label', NPTZ_WORDING.wID_0349);
            // Yl Saturation slider
            sliderMatrix_Yl_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Yl_saturation_slider', 126, -127, getMatrixYlSaturationValue(), callbackMatrixYlSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // Yl phase slider
            sliderMatrix_Yl_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Yl_phase_slider', 126, -127, getMatrixYlPhaseValue(), callbackMatrixYlPhase, null, null, null, null, null, null, null, null, 'YE_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 612, 19, 760, "setup_imageAdjust_matrix_Yl_label", "92");

            // Yl_G
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Yl_G] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_Yl_G_label', NPTZ_WORDING.wID_0351);
            // Yl_G Saturation slider
            sliderMatrix_Yl_G_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Yl_G_saturation_slider', 126, -127, getMatrixYlGSaturationValue(), callbackMatrixYlGSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // Yl_G phase slider
            sliderMatrix_Yl_G_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Yl_G_phase_slider', 126, -127, getMatrixYlGPhaseValue(), callbackMatrixYlGPhase, null, null, null, null, null, null, null, null, 'YE_G_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 748, 19, 760, "setup_imageAdjust_matrix_Yl_G_label", "92");

            // G
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_G] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_G_label', NPTZ_WORDING.wID_0544);
            // G Saturation slider
            sliderMatrix_G_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_G_saturation_slider', 126, -127, getMatrixGSaturationValue(), callbackMatrixGSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // G phase slider
            sliderMatrix_G_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_G_phase_slider', 126, -127, getMatrixGPhaseValue(), callbackMatrixGPhase, null, null, null, null, null, null, null, null, 'G_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 816, 19, 760, "setup_imageAdjust_matrix_G_label", "92");

            // G_Cy
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_G_Cy] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_G_Cy_label', NPTZ_WORDING.wID_0352);
            // G_Cy Saturation slider
            sliderMatrix_G_Cy_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_G_Cy_saturation_slider', 126, -127, getMatrixGCySaturationValue(), callbackMatrixGCySaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // G_Cy phase slider
            sliderMatrix_G_Cy_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_G_Cy_phase_slider', 126, -127, getMatrixGCyPhaseValue(), callbackMatrixGCyPhase, null, null, null, null, null, null, null, null, 'G_CY_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 884, 19, 760, "setup_imageAdjust_matrix_G_Cy_label", "92");

            // CY
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Cy] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_Cy_label', NPTZ_WORDING.wID_0353);
            // Cy Saturation slider
            sliderMatrix_Cy_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Cy_saturation_slider', 126, -127, getMatrixCySaturationValue(), callbackMatrixCySaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // Cy phase slider
            sliderMatrix_Cy_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Cy_phase_slider', 126, -127, getMatrixCyPhaseValue(), callbackMatrixCyPhase, null, null, null, null, null, null, null, null, 'CY_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 952, 19, 760, "setup_imageAdjust_matrix_Cy_label", "92");

            // Cy_B
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Cy_B] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_Cy_B_label', NPTZ_WORDING.wID_0354);
            // Cy_B Saturation slider
            sliderMatrix_Cy_B_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Cy_B_saturation_slider', 126, -127, getMatrixCyBSaturationValue(), callbackMatrixCyBSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // Cy_B phase slider
            sliderMatrix_Cy_B_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Cy_B_phase_slider', 126, -127, getMatrixCyBPhaseValue(), callbackMatrixCyBPhase, null, null, null, null, null, null, null, null, 'CY_B_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 1020, 19, 760, "setup_imageAdjust_matrix_Cy_B_label", "92");

            // B
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_B] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_B_label', NPTZ_WORDING.wID_0355);
            // B Saturation slider
            sliderMatrix_B_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_B_saturation_slider', 126, -127, getMatrixBSaturationValue(), callbackMatrixBSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // B phase slider
            sliderMatrix_B_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_B_phase_slider', 126, -127, getMatrixBPhaseValue(), callbackMatrixBPhase, null, null, null, null, null, null, null, null, 'B_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 1088, 19, 760, "setup_imageAdjust_matrix_B_label", "92");

            // B_MG label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_B_MG] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_B_MG_label', NPTZ_WORDING.wID_0341);
            // B_MG Saturation slider
            sliderMatrix_B_MG_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_B_MG_saturation_slider', 126, -127, getMatrixBMGSaturationValue(), callbackMatrixBMGSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // B_MG phase slider
            sliderMatrix_B_MG_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_B_MG_phase_slider', 126, -127, getMatrixBMGPhaseValue(), callbackMatrixBMGPhase, null, null, null, null, null, null, null, null, 'B_MG_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 69, 19, 760, "setup_imageAdjust_matrix_B_MG_label", "92");

            // Mg label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_MG] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_Mg_label', NPTZ_WORDING.wID_0342);
            // Mg Saturation slider
            sliderMatrix_Mg_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Mg_saturation_slider', 126, -127, getMatrixMGSaturationValue(), callbackMatrixMGSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // Mg phase slider
            sliderMatrix_Mg_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Mg_phase_slider', 126, -127, getMatrixMGPhaseValue(), callbackMatrixMGPhase, null, null, null, null, null, null, null, null, 'MG_slider', true);
            LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 138, 19, 760, "setup_imageAdjust_matrix_Mg_label", "92");

            // Mg_R label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_MG_R] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_Mg_R_label', NPTZ_WORDING.wID_0343);
            // Mg_R Saturation slider
            sliderMatrix_Mg_R_saturation = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Mg_R_saturation_slider', 126, -127, getMatrixMGRSaturationValue(), callbackMatrixMGRSaturation, null, null, null, null, null, null, null, null, 'SATURATION_slider', true);
            // Mg_R phase slider
            sliderMatrix_Mg_R_phase = SliderCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'setup_imageAdjust_matrix_Mg_R_phase_slider', 126, -127, getMatrixMGRPhaseValue(), callbackMatrixMGRPhase, null, null, null, null, null, null, null, null, 'MG_R_slider', true);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 206, 19, 760, "setup_imageAdjust_matrix_Mg_R_label", "92");


            // Saturation label
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_n_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_n_label", "76");
            //Phase
            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_n_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_n_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_s] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_s_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_s_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_p] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_p_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_p_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_a] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_a_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_a_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_h] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_h_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_h_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_t] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_t_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_t_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_a] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_a_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_a_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_u] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_u_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_u_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_s] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_s_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_s_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_r] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_r_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_r_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_e] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_e_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_e_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_i] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_i_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_i_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_ph] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_ph_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_ph_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_o] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_o_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_o_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_se] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_se_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_se_label", "76");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Saturation_Sat] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Saturation_Sat_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Saturation_Sat_label");

            txtMatrixObject[TXT_IMAGE_ADJUST_MATRIX_Phase_Pha] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_Phase_Pha_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_Phase_Pha_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_Saturation_o] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_Phase] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust");

            txtMatrixObject[TXT_IMAGE_MATRIX_S] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail");

            txtMatrixObject[TXT_IMAGE_MATRIX_P] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix");

            txtMatrixObject[TXT_IMAGE_MATRIX_Sa] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_colorCorrection_Saturation_o_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_colorCorrection_Saturation_o_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_h] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_Phase_se_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_Phase_se_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_Sat] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_colorCorrection_Saturation_o_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_colorCorrection_Saturation_o_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_a] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_detail_matrix_colorCorrection_Phase_se_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_detail_matrix_colorCorrection_Phase_se_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_u] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_matrix_colorCorrection_Saturation_o_label', NPTZ_WORDING.wID_0339);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_matrix_colorCorrection_Saturation_o_label");

            txtMatrixObject[TXT_IMAGE_MATRIX_s] = TextCtrl('setup_imageAdjust_detail_matrix_colorCorrection_label', 'setup_imageAdjust_detail_matrix_colorCorrection_P_label', NPTZ_WORDING.wID_0340);
            // LineCtrl('setup_imageAdjust_detail_matrix_colorCorrection_form', 'horizontal', 0, 19, 760, "setup_imageAdjust_detail_matrix_colorCorrection_P_label");

            for (var text in txtMatrixObject) {
                txtMatrixObject[text].show();
            }
            initStatus();
            initCanvas();
        } else {
            rebuild();
        }
        if (buildScrollSuccessFlg) {
            buildScrollSuccessFlg = false;
            // setTimeout(function () {
            //     myScroll = new IScroll('#setup_imageAdjust_detail_matrix_main', {
            //         preventDefault: false,
            //         click: false,
            //         tap: true,
            //         scrollbars: true,
            //         mouseWheel: true,
            //         interactiveScrollbars: true,
            //         shrinkScrollbars: 'scale',
            //         fadeScrollbars: false,
            //         useTransform: false
            //     });
            //     buildScrollSuccessFlg = true;
            // }, 700)
            getMatrixWebWorker();
        }
        if(localStorage.activeTab == TAB_LINEAR_MATRIX){
            callbackTABMatrixControl(Button.MOUSE_DOWN,TAB_LINEAR_MATRIX)
        }else{
            callbackTABMatrixControl(Button.MOUSE_DOWN,TAB_COLOR_CORRECTION)

        }
    }

    function getMatrixWebWorker() {
            if (typeof (worker) == "undefined") {
                worker = new Worker("/js/pc/matrixWebWorker.js");
                worker.onmessage = function (event) {
                    canRefresh = localStorage.canPopRefresh == 'true' ? true : false;
                    if(event.data.MatrixButtonFlg){
                        var linearMatrixValue = event.data.getlinearMatrixValue;
                        var linearTableValue = event.data.getlinearTableValue;
                        var colorCorrectValue = event.data.getcolorCorrectValue;
                        var colorCorrectABValue = event.data.getcolorCorrectABValue;
                        if (linearMatrixValue == "0") {
                            disableLinearMatrix();
                        } else {
                            enableLinearMatrix();
                        }
                        linearTableRadioButtonGroup.setSelectedValue(linearTableValue);
                        colorCorrectRadioButtonGroup.setSelectedValue(colorCorrectValue)
                        callbackcolorCorrect();
                        colorCorrectABRadioButtonGroup.setSelectedValue(colorCorrectABValue);
                    } else if (event.data.MatrixFlg && canRefresh) {
                        var MatrixRGValue = event.data.getMatrixRGValue;
                        var MatrixRGphaseValue = event.data.getMatrixRGPhaseValue;
                        var MatrixRBValue = event.data.getMatrixRBPhaseValue;
                        var MatrixRBphaseValue = event.data.getMatrixRBRightValue;
                        var MatrixGRValue = event.data.getMatrixGRValue;
                        var MatrixGRphaseValue = event.data.getMatrixGRRightValue;
                        var MatrixGBValue = event.data.getMatrixGBValue;
                        var MatrixGBphaseValue = event.data.getMatrixGBRightValue;
                        var MatrixBRValue = event.data.getMatrixBRValue;
                        var MatrixBRphaseValue = event.data.getMatrixBRRightValue;
                        var MatrixBGValue = event.data.getMatrixBGValue;
                        var MatrixBGphaseValue = event.data.getMatrixBGRightValue;
    
                        sliderMatrix_R_G.setValue(MatrixRGValue);
                        sliderMatrix_R_G_phase.setValue(MatrixRGphaseValue);
                        sliderMatrix_R_B.setValue(MatrixRBValue);
                        sliderMatrix_R_B_phase.setValue(MatrixRBphaseValue);
                        sliderMatrix_G_R.setValue(MatrixGRValue);
                        sliderMatrix_G_R_phase.setValue(MatrixGRphaseValue);
                        sliderMatrix_G_B.setValue(MatrixGBValue);
                        sliderMatrix_G_B_phase.setValue(MatrixGBphaseValue);
                        sliderMatrix_B_R.setValue(MatrixBRValue);
                        sliderMatrix_B_R_phase.setValue(MatrixBRphaseValue);
                        sliderMatrix_B_G.setValue(MatrixBGValue);
                        sliderMatrix_B_G_phase.setValue(MatrixBGphaseValue);
                    } else if (event.data.MatrixColorFlg  && canRefresh) {
                        var ColorRSaturationValue = event.data.getColorRSaturationValue;
                        var ColorRPhaseValue = event.data.getColorRPhaseValue;
                        var ColorRYlSaturationValue = event.data.getColorRYlSaturationValue;
                        var ColorRYlPhaseValue = event.data.getColorRYlPhaseValue;
                        var ColorYlSaturationValue = event.data.getColorYlSaturationValue;
                        var ColorYlPhaseValue = event.data.getColorYlPhaseValue;
                        var ColorYlGSaturationValue = event.data.getColorYlGSaturationValue;
                        var ColorYlGPhaseValue = event.data.getColorYlGPhaseValue;
                        var ColorGSaturationValue = event.data.getColorGSaturationValue;
                        var ColorGPhaseValue = event.data.getColorGPhaseValue;
                        var ColorGCySaturationValue = event.data.getColorGCySaturationValue;
                        var ColorGCyPhaseValue = event.data.getColorGCyPhaseValue;
                        var ColorCySaturationValue = event.data.getColorCySaturationValue;
                        var ColorCyPhaseValue = event.data.getColorCyPhaseValue;
                        var ColorCyBSaturationValue = event.data.getColorCyBSaturationValue;
                        var ColorCyBPhaseValue = event.data.getColorCyBPhaseValue;
                        var ColorBSaturationValue = event.data.getColorBSaturationValue;
                        var ColorBPhaseValue = event.data.getColorBPhaseValue;
                        var ColorBMGSaturationValue = event.data.getColorBMGSaturationValue;
                        var ColorBMGPhaseValue = event.data.getColorBMGPhaseValue;
                        var ColorMGSaturationValue = event.data.getColorMGSaturationValue;
                        var ColorMGPhaseValue = event.data.getColorMGPhaseValue;
                        var ColorMGRSaturationValue = event.data.getColorMGRSaturationValue;
                        var ColorMGRPhaseValue = event.data.getColorMGRPhaseValue;
    
                        sliderMatrix_R_saturation.setValue(ColorRSaturationValue);
                        canvasItems['R'].setCurrentY(ColorRSaturationValue);
                        sliderMatrix_R_phase.setValue(ColorRPhaseValue);
                        canvasItems['R'].setCurrentX(ColorRPhaseValue);
                        sliderMatrix_R_Yl_saturation.setValue(ColorRYlSaturationValue);
                        canvasItems['R_YE'].setCurrentY(ColorRYlSaturationValue)
                        sliderMatrix_R_Yl_phase.setValue(ColorRYlPhaseValue);
                        canvasItems['R_YE'].setCurrentX(ColorRYlPhaseValue);
                        sliderMatrix_Yl_saturation.setValue(ColorYlSaturationValue);
                        canvasItems['YE'].setCurrentY(ColorYlSaturationValue);
                        sliderMatrix_Yl_phase.setValue(ColorYlPhaseValue);
                        canvasItems['YE'].setCurrentX(ColorYlPhaseValue);
                        sliderMatrix_Yl_G_saturation.setValue(ColorYlGSaturationValue);
                        canvasItems['YE_G'].setCurrentY(ColorYlGSaturationValue);
                        sliderMatrix_Yl_G_phase.setValue(ColorYlGPhaseValue);
                        canvasItems['YE_G'].setCurrentX(ColorYlGPhaseValue);
                        sliderMatrix_G_saturation.setValue(ColorGSaturationValue);
                        canvasItems['G'].setCurrentY(ColorGSaturationValue);
                        sliderMatrix_G_phase.setValue(ColorGPhaseValue);
                        canvasItems['G'].setCurrentX(ColorGPhaseValue);
                        sliderMatrix_G_Cy_saturation.setValue(ColorGCySaturationValue);
                        canvasItems['G_CY'].setCurrentY(ColorGCySaturationValue);
                        sliderMatrix_G_Cy_phase.setValue(ColorGCyPhaseValue);
                        canvasItems['G_CY'].setCurrentX(ColorGCyPhaseValue);
                        sliderMatrix_Cy_saturation.setValue(ColorCySaturationValue);
                        canvasItems['CY'].setCurrentY(ColorCySaturationValue);
                        sliderMatrix_Cy_phase.setValue(ColorCyPhaseValue);
                        canvasItems['CY'].setCurrentX(ColorCyPhaseValue);
                        sliderMatrix_Cy_B_saturation.setValue(ColorCyBSaturationValue);
                        canvasItems['CY_B'].setCurrentY(ColorCyBSaturationValue);
                        sliderMatrix_Cy_B_phase.setValue(ColorCyBPhaseValue);
                        canvasItems['CY_B'].setCurrentX(ColorCyBPhaseValue);
                        sliderMatrix_B_saturation.setValue(ColorBSaturationValue);
                        canvasItems['B'].setCurrentY(ColorBSaturationValue);
                        sliderMatrix_B_phase.setValue(ColorBPhaseValue);
                        canvasItems['B'].setCurrentX(ColorBPhaseValue);
                        sliderMatrix_B_MG_saturation.setValue(ColorBMGSaturationValue);
                        canvasItems['B_MG'].setCurrentY(ColorBMGSaturationValue);
                        sliderMatrix_B_MG_phase.setValue(ColorBMGPhaseValue);
                        canvasItems['B_MG'].setCurrentX(ColorBMGPhaseValue);
                        sliderMatrix_Mg_saturation.setValue(ColorMGSaturationValue);
                        canvasItems['MG'].setCurrentY(ColorMGSaturationValue);
                        sliderMatrix_Mg_phase.setValue(ColorMGPhaseValue);
                        canvasItems['MG'].setCurrentX(ColorMGPhaseValue);
                        sliderMatrix_Mg_R_saturation.setValue(ColorMGRSaturationValue);
                        canvasItems['MG_R'].setCurrentY(ColorMGRSaturationValue);
                        sliderMatrix_Mg_R_phase.setValue(ColorMGRPhaseValue);
                        canvasItems['MG_R'].setCurrentX(ColorMGRPhaseValue);
                    };
                }
            }
    }

    function initStatus() {
        if (cparam_get_v_log() == 1 && cparam_get_v_log_paint_sw() == 0) {
            presetMatrixRadioButtonGroup.setDisable("0,1,2,3,4");
            matrixRadioButtonGroup.setDisable("0,1");
            linearMatrixRadioButtonGroup.setDisable("0,1");
            linearTableRadioButtonGroup.setDisable("0,1");
            colorCorrectRadioButtonGroup.setDisable("0,1");
            colorCorrectABRadioButtonGroup.setDisable("0,1");
            disableLinearMatrix();
            disableColorCorrection();
        } else {
            presetMatrixRadioButtonGroup.setEnable("0,1,2,3,4");
            matrixRadioButtonGroup.setEnable("0,1");
            linearMatrixRadioButtonGroup.setEnable("0,1");
            linearTableRadioButtonGroup.setEnable("0,1");
            colorCorrectRadioButtonGroup.setEnable("0,1");
            colorCorrectABRadioButtonGroup.setEnable("0,1");
            if (linearMatrixRadioButtonGroup.getSelectedValue() == "1") {
                enableLinearMatrix();
            } else {
                disableLinearMatrix();
            }
            if (colorCorrectRadioButtonGroup.getSelectedValue() == "1") {
                enableColorCorrection();
            } else {
                disableColorCorrection();
            }
        }
    }
    function rebuild() {
        sliderMatrix_R_G.setValue(getMatrixRGValue());
        sliderMatrix_R_G_phase.setValue(getMatrixRGPhaseValue());
        sliderMatrix_R_B.setValue(getMatrixRBPhaseValue());
        sliderMatrix_R_B_phase.setValue(getMatrixRBRightValue());
        sliderMatrix_G_R.setValue(getMatrixGRValue());
        sliderMatrix_G_R_phase.setValue(getMatrixGRRightValue());
        sliderMatrix_G_B.setValue(getMatrixGBValue());
        sliderMatrix_G_B_phase.setValue(getMatrixGBRightValue());
        sliderMatrix_B_R.setValue(getMatrixBRValue());
        sliderMatrix_B_R_phase.setValue(getMatrixBRRightValue());
        sliderMatrix_B_G.setValue(getMatrixBGValue());
        sliderMatrix_B_G_phase.setValue(getMatrixBGRightValue());
        sliderMatrix_B_MG_saturation.setValue(getMatrixBMGSaturationValue());
        sliderMatrix_B_MG_phase.setValue(getMatrixBMGPhaseValue());
        sliderMatrix_Mg_saturation.setValue(getMatrixMGSaturationValue());
        sliderMatrix_Mg_phase.setValue(getMatrixMGPhaseValue());
        sliderMatrix_Mg_R_saturation.setValue(getMatrixMGRSaturationValue());
        sliderMatrix_Mg_R_phase.setValue(getMatrixMGRPhaseValue());
        sliderMatrix_R_saturation.setValue(getMatrixRSaturationValue());
        sliderMatrix_R_phase.setValue(getMatrixRPhaseValue());
        sliderMatrix_R_Yl_saturation.setValue(getMatrixRYlSaturationValue());
        sliderMatrix_R_Yl_phase.setValue(getMatrixRYlPhaseValue());
        sliderMatrix_Yl_saturation.setValue(getMatrixYlSaturationValue());
        sliderMatrix_Yl_phase.setValue(getMatrixYlPhaseValue());
        sliderMatrix_Yl_G_saturation.setValue(getMatrixYlGSaturationValue());
        sliderMatrix_Yl_G_phase.setValue(getMatrixYlGPhaseValue());
        sliderMatrix_G_saturation.setValue(getMatrixGSaturationValue());
        sliderMatrix_G_phase.setValue(getMatrixGPhaseValue());
        sliderMatrix_G_Cy_saturation.setValue(getMatrixGCySaturationValue());
        sliderMatrix_G_Cy_phase.setValue(getMatrixGCyPhaseValue());
        sliderMatrix_Cy_saturation.setValue(getMatrixCySaturationValue());
        sliderMatrix_Cy_phase.setValue(getMatrixCyPhaseValue());
        sliderMatrix_Cy_B_saturation.setValue(getMatrixCyBSaturationValue());
        sliderMatrix_Cy_B_phase.setValue(getMatrixCyBPhaseValue());
        sliderMatrix_B_saturation.setValue(getMatrixBSaturationValue());
        sliderMatrix_B_phase.setValue(getMatrixBPhaseValue());
        presetMatrixRadioButtonGroup.setSelectedValue(getPresetMatrixValue());
        matrixRadioButtonGroup.setSelectedValue(getmatrixValue());
        linearMatrixRadioButtonGroup.setSelectedValue(getlinearMatrixValue());
        linearTableRadioButtonGroup.setSelectedValue(getlinearTableValue());
        colorCorrectRadioButtonGroup.setSelectedValue(getcolorCorrectValue());
        colorCorrectABRadioButtonGroup.setSelectedValue(getcolorCorrectABValue());
        initStatus();
    }
    function disableLinearMatrix() {
        // R-G slider 
        sliderMatrix_R_G.setDisable();
        // R-G slider phase
        sliderMatrix_R_G_phase.setDisable();
        // R-B slider
        sliderMatrix_R_B.setDisable();
        // R-B slider phase
        sliderMatrix_R_B_phase.setDisable();
        // G-R slider
        sliderMatrix_G_R.setDisable();
        // G-R slider phase
        sliderMatrix_G_R_phase.setDisable();
        // G-B slider
        sliderMatrix_G_B.setDisable();
        // G-B slider phase
        sliderMatrix_G_B_phase.setDisable();
        // B-R slider
        sliderMatrix_B_R.setDisable();
        // B-R slider phase
        sliderMatrix_B_R_phase.setDisable();
        // B-G slider
        sliderMatrix_B_G.setDisable();
        // B-G slider phase
        sliderMatrix_B_G_phase.setDisable();
    }
    function enableLinearMatrix() {
        // R-G slider 
        sliderMatrix_R_G.setEnable();
        // R-G slider phase
        sliderMatrix_R_G_phase.setEnable();
        // R-B slider
        sliderMatrix_R_B.setEnable();
        // R-B slider phase
        sliderMatrix_R_B_phase.setEnable();
        // G-R slider
        sliderMatrix_G_R.setEnable();
        // G-R slider phase
        sliderMatrix_G_R_phase.setEnable();
        // G-B slider
        sliderMatrix_G_B.setEnable();
        // G-B slider phase
        sliderMatrix_G_B_phase.setEnable();
        // B-R slider
        sliderMatrix_B_R.setEnable();
        // B-R slider phase
        sliderMatrix_B_R_phase.setEnable();
        // B-G slider
        sliderMatrix_B_G.setEnable();
        // B-G slider phase
        sliderMatrix_B_G_phase.setEnable();
    }
    function disableColorCorrection() {
        removeAllBorder();
        // R Saturation slider
        sliderMatrix_R_saturation.setDisable();
        // R phase slider
        sliderMatrix_R_phase.setDisable();
        // R_YE Saturation slider
        sliderMatrix_R_Yl_saturation.setDisable();
        // R_YE phase slider
        sliderMatrix_R_Yl_phase.setDisable();
        // Yl Saturation slider
        sliderMatrix_Yl_saturation.setDisable();
        // Yl phase slider
        sliderMatrix_Yl_phase.setDisable();
        // Yl_G Saturation slider
        sliderMatrix_Yl_G_saturation.setDisable();
        // Yl_G phase slider
        sliderMatrix_Yl_G_phase.setDisable();
        // G Saturation slider
        sliderMatrix_G_saturation.setDisable();
        // G phase slider
        sliderMatrix_G_phase.setDisable();
        // G_Cy Saturation slider
        sliderMatrix_G_Cy_saturation.setDisable();
        // G_Cy phase slider
        sliderMatrix_G_Cy_phase.setDisable();
        // Cy Saturation slider
        sliderMatrix_Cy_saturation.setDisable();
        // Cy phase slider
        sliderMatrix_Cy_phase.setDisable();
        // Cy_B Saturation slider
        sliderMatrix_Cy_B_saturation.setDisable();
        // Cy_B phase slider
        sliderMatrix_Cy_B_phase.setDisable();
        // B Saturation slider
        sliderMatrix_B_saturation.setDisable();
        // B phase slider
        sliderMatrix_B_phase.setDisable();
        // B_MG Saturation slider
        sliderMatrix_B_MG_saturation.setDisable();
        // B_MG phase slider
        sliderMatrix_B_MG_phase.setDisable();
        // Mg Saturation slider
        sliderMatrix_Mg_saturation.setDisable();
        // Mg phase slider
        sliderMatrix_Mg_phase.setDisable();
        // Mg_R Saturation slider
        sliderMatrix_Mg_R_saturation.setDisable();
        // Mg_R phase slider
        sliderMatrix_Mg_R_phase.setDisable();
        $("#setup_imageAdjust_matrix_img_div_cover").show();
    }
    function enableColorCorrection() {
        // R Saturation slider
        sliderMatrix_R_saturation.setEnable();
        // R phase slider
        sliderMatrix_R_phase.setEnable();
        // R_YE Saturation slider
        sliderMatrix_R_Yl_saturation.setEnable();
        // R_YE phase slider
        sliderMatrix_R_Yl_phase.setEnable();
        // Yl Saturation slider
        sliderMatrix_Yl_saturation.setEnable();
        // Yl phase slider
        sliderMatrix_Yl_phase.setEnable();
        // Yl_G Saturation slider
        sliderMatrix_Yl_G_saturation.setEnable();
        // Yl_G phase slider
        sliderMatrix_Yl_G_phase.setEnable();
        // G Saturation slider
        sliderMatrix_G_saturation.setEnable();
        // G phase slider
        sliderMatrix_G_phase.setEnable();
        // G_Cy Saturation slider
        sliderMatrix_G_Cy_saturation.setEnable();
        // G_Cy phase slider
        sliderMatrix_G_Cy_phase.setEnable();
        // Cy Saturation slider
        sliderMatrix_Cy_saturation.setEnable();
        // Cy phase slider
        sliderMatrix_Cy_phase.setEnable();
        // Cy_B Saturation slider
        sliderMatrix_Cy_B_saturation.setEnable();
        // Cy_B phase slider
        sliderMatrix_Cy_B_phase.setEnable();
        // B Saturation slider
        sliderMatrix_B_saturation.setEnable();
        // B phase slider
        sliderMatrix_B_phase.setEnable();
        // B_MG Saturation slider
        sliderMatrix_B_MG_saturation.setEnable();
        // B_MG phase slider
        sliderMatrix_B_MG_phase.setEnable();
        // Mg Saturation slider
        sliderMatrix_Mg_saturation.setEnable();
        // Mg phase slider
        sliderMatrix_Mg_phase.setEnable();
        // Mg_R Saturation slider
        sliderMatrix_Mg_R_saturation.setEnable();
        // Mg_R phase slider
        sliderMatrix_Mg_R_phase.setEnable();
        $("#setup_imageAdjust_matrix_img_div_cover").hide();
    }
    function callbackTABMatrixControl(mouse, type) {
        if (mouse == Button.MOUSE_DOWN) {
            $('#setup_imageAdjust_detail_matrix_linearMatrix_main').hide();
            $('#setup_imageAdjust_detail_matrix_colorCorrection_main').hide();
            switch (type) {
                case TAB_LINEAR_MATRIX:
                    $('#setup_imageAdjust_detail_matrix_linearMatrix_main').show();
                    $('.div_detail_matrix_form_with_live').removeClass('matrix').addClass('matrix');
                    btnObject[TAB_LINEAR_MATRIX].displayOn();
                    break;
                case TAB_COLOR_CORRECTION:
                    $('#setup_imageAdjust_detail_matrix_colorCorrection_main').show(100, function () {
                        $(".div_drag_R").find("img").css("display", "block");
                        $(".div_drag_R").find("p").css("display", "block");
                    });
                    $('.div_detail_matrix_form_with_live').removeClass('matrix')
                    btnObject[TAB_COLOR_CORRECTION].displayOn();
                    break;
            }
        }
    }

    function setCanRefresh(){
        localStorage.canMainRefresh = "true"
        localStorage.canPopRefresh = "false"
    }


    function changeMatixStatus() {
        if (true || selectImageAdjustMatrixType.get() == '3') {
            $('#setup_imageAdjust_detail_matrix_main').show();
            $('.setup_imageAdjust_matrixSettings_title_label').show();
            sliderMatrix_R_G.setEnable();
            sliderMatrix_R_B.setEnable();
            sliderMatrix_G_R.setEnable();
            sliderMatrix_G_B.setEnable();
            sliderMatrix_B_R.setEnable();
            sliderMatrix_B_G.setEnable();
            sliderMatrix_B_MG_saturation.setEnable();
            sliderMatrix_B_MG_phase.setEnable();
            sliderMatrix_Mg_saturation.setEnable();
            sliderMatrix_Mg_phase.setEnable();
            sliderMatrix_Mg_R_saturation.setEnable();
            sliderMatrix_Mg_R_phase.setEnable();
            sliderMatrix_R_saturation.setEnable();
            sliderMatrix_R_phase.setEnable();
            sliderMatrix_R_Yl_saturation.setEnable();
            sliderMatrix_R_Yl_phase.setEnable();
            sliderMatrix_Yl_saturation.setEnable();
            sliderMatrix_Yl_phase.setEnable();
            sliderMatrix_Yl_G_saturation.setEnable();
            sliderMatrix_Yl_G_phase.setEnable();
            sliderMatrix_G_saturation.setEnable();
            sliderMatrix_G_phase.setEnable();
            sliderMatrix_G_Cy_saturation.setEnable();
            sliderMatrix_G_Cy_phase.setEnable();
            sliderMatrix_Cy_saturation.setEnable();
            sliderMatrix_Cy_phase.setEnable();
            sliderMatrix_Cy_B_saturation.setEnable();
            sliderMatrix_Cy_B_phase.setEnable();
            sliderMatrix_B_saturation.setEnable();
            sliderMatrix_B_phase.setEnable();
        } else {
        }
    }

    function getPresetMatrixValue() {
        return cparam_get_matrixType();
    }

    /**
     * ??
     */
    function callbackpresetMatrix() {
        cparam_set_matrixType(presetMatrixRadioButtonGroup.getSelectedValue());
    }

    function getmatrixValue() {
        return cparam_get_matrix();
    }

    /**
     * ??
     */
    function callbackmatrix() {
        cparam_set_matrix(matrixRadioButtonGroup.getSelectedValue());
    }

    function getlinearMatrixValue() {
        return cparam_get_linearMatrix();
    }

    /**
     * ??
     */
    function callbacklinearMatrix() {
        cparam_set_linearMatrix(linearMatrixRadioButtonGroup.getSelectedValue());
        if (linearMatrixRadioButtonGroup.getSelectedValue() == "0") {
            disableLinearMatrix();
        } else {
            enableLinearMatrix();
        }
    }

    function getlinearTableValue() {
        return cparam_get_linearTable();
    }

    /**
     * ??
     */
    function callbacklinearTable() {
        cparam_set_linearTable(linearTableRadioButtonGroup.getSelectedValue());
    }

    function getcolorCorrectValue() {
        return cparam_get_colorCorrect();
    }

    /**
     * ??
     */
    function callbackcolorCorrect() {
        // cparam_set_colorCorrect(colorCorrectRadioButtonGroup.getSelectedValue());
        if (colorCorrectRadioButtonGroup.getSelectedValue() == "0") {
            disableColorCorrection();
        } else {
            enableColorCorrection();
        }
    }

    function getcolorCorrectABValue() {
        return cparam_get_colorCorrectAB();
    }

    /**
     * ??
     */
    function callbackcolorCorrectAB() {
        cparam_set_colorCorrectAB(colorCorrectABRadioButtonGroup.getSelectedValue());
    }

    /**
    *
    */
    function getMatrixRGValue() {
        return cparam_get_matrixRG();
    }
    /**
     *
     */
    function callbackMatrixRG() {
        setCanRefresh();
        cparam_set_matrixRG(sliderMatrix_R_G.getValue());
    }

    /**
     *
     */
    function getMatrixRGPhaseValue() {
        return cparam_get_matrixRGRight();

    }

    /**
     *
     */
    function callbackMatrixRGRight() {
        setCanRefresh();
        cparam_set_matrixRGRight(sliderMatrix_R_G_phase.getValue());

    }

    /**
     *
     */
    function getMatrixRBPhaseValue() {
        return cparam_get_matrixRB();
    }

    /**
     *
     */
    function callbackMatrixRB() {
        setCanRefresh();
        cparam_set_matrixRB(sliderMatrix_R_B.getValue());
    }


    /**
     *
     */
    function getMatrixRBRightValue() {
        return cparam_get_matrixRBRight();
    }

    /**
     *
     */
    function callbackMatrixRBRight() {
        setCanRefresh();
        cparam_set_matrixRBRight(sliderMatrix_R_B_phase.getValue());

    }

    /**
     *
     */
    function getMatrixGRValue() {
        return cparam_get_matrixGR();
    }

    /**
     *
     */
    function callbackMatrixGR() {
        setCanRefresh();
        cparam_set_matrixGR(sliderMatrix_G_R.getValue());

    }

    /**
     *
     */
    function getMatrixGRRightValue() {
        return cparam_get_matrixGRRight();
    }

    /**
     *
     */
    function callbackMatrixGRRight() {
        setCanRefresh();
        cparam_set_matrixGRRight(sliderMatrix_G_R_phase.getValue());
    }

    /**
     *
     */
    function getMatrixGBValue() {
        return cparam_get_matrixGB();
    }

    /**
     *
     */
    function callbackMatrixGB() {
        setCanRefresh();
        cparam_set_matrixGB(sliderMatrix_G_B.getValue());
    }


    /**
     *
     */
    function getMatrixGBRightValue() {
        return cparam_get_matrixGBRight();
    }

    /**
     *
     */
    function callbackMatrixGBRight() {
        setCanRefresh();
        cparam_set_matrixGBRight(sliderMatrix_G_B_phase.getValue());
    }

    /**
     *
     */
    function getMatrixBRValue() {
        return cparam_get_matrixBR();
    }

    /**
     *
     */
    function callbackMatrixBR() {
        setCanRefresh();
        cparam_set_matrixBR(sliderMatrix_B_R.getValue());
    }


    /**
     *
     */
    function getMatrixBRRightValue() {
        return cparam_get_matrixBRRight();
    }

    /**
     *
     */
    function callbackMatrixBRRight() {
        setCanRefresh();
        cparam_set_matrixBRRight(sliderMatrix_B_R_phase.getValue());
    }

    /**
     *
     */
    function getMatrixBGValue() {
        return cparam_get_matrixBG();
    }

    /**
     *
     */
    function callbackMatrixBG() {
        setCanRefresh();
        cparam_set_matrixBG(sliderMatrix_B_G.getValue());
    }

    /**
     *
     */
    function getMatrixBGRightValue() {
        return cparam_get_matrixBGRight();
    }

    /**
     *
     */
    function callbackMatrixBGRight() {
        setCanRefresh();
        cparam_set_matrixBGRight(sliderMatrix_B_G_phase.getValue());
    }

    /**
     *
     */
    function getMatrixBMGSaturationValue() {
        return cparam_get_bMgSaturation();
    }

    /**
     *
     */
    function callbackMatrixBMGSaturation() {
        setCanRefresh();
        canvasItems['B_MG'].setCurrentY(sliderMatrix_B_MG_saturation.getValue())
        cparam_set_bMgSaturation(sliderMatrix_B_MG_saturation.getValue());
    }


    /**
     *
     */
    function getMatrixBMGPhaseValue() {
        return cparam_get_bMgPhase();
    }

    /**
     *
     */
    function callbackMatrixBMGPhase() {
        setCanRefresh();
        canvasItems['B_MG'].setCurrentX(sliderMatrix_B_MG_phase.getValue())
        cparam_set_bMgPhase(sliderMatrix_B_MG_phase.getValue());
    }

    /**
     *
     */
    function getMatrixMGSaturationValue() {
        return cparam_get_mgSauration();
    }

    /**
     *
     */
    function callbackMatrixMGSaturation() {
        setCanRefresh();
        canvasItems['MG'].setCurrentY(sliderMatrix_Mg_saturation.getValue())
        cparam_set_mgSauration(sliderMatrix_Mg_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixMGPhaseValue() {
        return cparam_get_mgPhase();
    }

    /**
     *
     */
    function callbackMatrixMGPhase() {
        setCanRefresh();
        canvasItems['MG'].setCurrentX(sliderMatrix_Mg_phase.getValue())
        cparam_set_mgPhase(sliderMatrix_Mg_phase.getValue());
    }

    /**
     *
     */
    function getMatrixMGRSaturationValue() {
        return cparam_get_mgRSaturation();
    }

    /**
     *
     */
    function callbackMatrixMGRSaturation() {
        setCanRefresh();
        canvasItems['MG_R'].setCurrentY(sliderMatrix_Mg_R_saturation.getValue())
        cparam_set_mgRSaturation(sliderMatrix_Mg_R_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixMGRPhaseValue() {
        return cparam_get_mgRPhase();
    }

    /**
     *
     */
    function callbackMatrixMGRPhase() {
        setCanRefresh();
        canvasItems['MG_R'].setCurrentX(sliderMatrix_Mg_R_phase.getValue())
        cparam_set_mgRPhase(sliderMatrix_Mg_R_phase.getValue());
    }

    /**
     *
     */
    function getMatrixRSaturationValue() {
        return cparam_get_rSaturation();
    }

    /**
     *
     */
    function callbackMatrixRSaturation() {
        setCanRefresh();
        canvasItems['R'].setCurrentY(sliderMatrix_R_saturation.getValue())
        cparam_set_rSaturation(sliderMatrix_R_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixRPhaseValue() {
        return cparam_get_rPhase();
    }

    /**
     *
     */
    function callbackMatrixRPhase() {
        setCanRefresh();
        canvasItems['R'].setCurrentX(sliderMatrix_R_phase.getValue())
        cparam_set_rPhase(sliderMatrix_R_phase.getValue());
    }

    /**
     *
     */
    function getMatrixRYlSaturationValue() {
        return cparam_get_rYiSaturation();
    }

    /**
     *
     */
    function callbackMatrixRYlSaturation() {
        setCanRefresh();
        canvasItems['R_YE'].setCurrentY(sliderMatrix_R_Yl_saturation.getValue())
        cparam_set_rYiSaturation(sliderMatrix_R_Yl_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixRYlPhaseValue() {
        return cparam_get_rYiPhase();
    }

    /**
     *
     */
    function callbackMatrixRYlPhase() {
        setCanRefresh();
        canvasItems['R_YE'].setCurrentX(sliderMatrix_R_Yl_phase.getValue())
        cparam_set_rYiPhase(sliderMatrix_R_Yl_phase.getValue());
    }


    /**
     *
     */
    function getMatrixYlSaturationValue() {
        return cparam_get_yiSaturation();
    }

    /**
     *
     */
    function callbackMatrixYlSaturation() {
        setCanRefresh();
        canvasItems['YE'].setCurrentY(sliderMatrix_Yl_saturation.getValue())
        cparam_set_yiSaturation(sliderMatrix_Yl_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixYlPhaseValue() {
        return cparam_get_yiPhase();
    }

    /**
     *
     */
    function callbackMatrixYlPhase() {
        setCanRefresh();
        canvasItems['YE'].setCurrentX(sliderMatrix_Yl_phase.getValue())
        cparam_set_yiPhase(sliderMatrix_Yl_phase.getValue());
    }


    /**
     *
     */
    function getMatrixYlGSaturationValue() {
        return cparam_get_yigSaturation();
    }

    /**
     *
     */
    function callbackMatrixYlGSaturation() {
        setCanRefresh();
        canvasItems['YE_G'].setCurrentY(sliderMatrix_Yl_G_saturation.getValue())
        cparam_set_yigSaturation(sliderMatrix_Yl_G_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixYlGPhaseValue() {
        return cparam_get_yigPhase();
    }

    /**
     *
     */
    function callbackMatrixYlGPhase() {
        setCanRefresh();
        canvasItems['YE_G'].setCurrentX(sliderMatrix_Yl_G_phase.getValue())
        cparam_set_yigPhase(sliderMatrix_Yl_G_phase.getValue());
    }


    /**
     *
     */
    function getMatrixGSaturationValue() {
        return cparam_get_gSaturation();
    }

    /**
     *
     */
    function callbackMatrixGSaturation() {
        setCanRefresh();
        canvasItems['G'].setCurrentY(sliderMatrix_G_saturation.getValue())
        cparam_set_gSaturation(sliderMatrix_G_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixGPhaseValue() {
        return cparam_get_gPhase();
    }

    /**
     *
     */
    function callbackMatrixGPhase() {
        setCanRefresh();
        canvasItems['G'].setCurrentX(sliderMatrix_G_phase.getValue())
        cparam_set_gPhase(sliderMatrix_G_phase.getValue());
    }


    /**
     *
     */
    function getMatrixGCySaturationValue() {
        return cparam_get_gCySaturation();
    }

    /**
     *
     */
    function callbackMatrixGCySaturation() {
        setCanRefresh();
        canvasItems['G_CY'].setCurrentY(sliderMatrix_G_Cy_saturation.getValue())
        cparam_set_gCySaturation(sliderMatrix_G_Cy_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixGCyPhaseValue() {
        return cparam_get_gCyPhase();
    }

    /**
     *
     */
    function callbackMatrixGCyPhase() {
        setCanRefresh();
        canvasItems['G_CY'].setCurrentX(sliderMatrix_G_Cy_phase.getValue())
        cparam_set_gCyPhase(sliderMatrix_G_Cy_phase.getValue());
    }


    /**
     *
     */
    function getMatrixCySaturationValue() {
        return cparam_get_cySaturation();
    }

    /**
     *
     */
    function callbackMatrixCySaturation() {
        setCanRefresh();
        canvasItems['CY'].setCurrentY(sliderMatrix_Cy_saturation.getValue())
        cparam_set_cySaturation(sliderMatrix_Cy_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixCyPhaseValue() {
        return cparam_get_cyPhase();
    }

    /**
     *
     */
    function callbackMatrixCyPhase() {
        setCanRefresh();
        canvasItems['CY'].setCurrentX(sliderMatrix_Cy_phase.getValue())
        cparam_set_cyPhase(sliderMatrix_Cy_phase.getValue());
    }


    /**
     *
     */
    function getMatrixCyBSaturationValue() {
        return cparam_get_cyBSaturation();
    }

    /**
     *
     */
    function callbackMatrixCyBSaturation() {
        setCanRefresh();
        canvasItems['CY_B'].setCurrentY(sliderMatrix_Cy_B_saturation.getValue())
        cparam_set_cyBSaturation(sliderMatrix_Cy_B_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixCyBPhaseValue() {
        return cparam_get_cyBPhase();
    }

    /**
     *
     */
    function callbackMatrixCyBPhase() {
        setCanRefresh();
        canvasItems['CY_B'].setCurrentX(sliderMatrix_Cy_B_phase.getValue())
        cparam_set_cyBPhase(sliderMatrix_Cy_B_phase.getValue());
    }

    /**
     *
     */
    function getMatrixBSaturationValue() {
        return cparam_get_bSaturation();
    }

    /**
     *
     */
    function callbackMatrixBSaturation() {
        setCanRefresh();
        canvasItems['B'].setCurrentY(sliderMatrix_B_saturation.getValue())
        cparam_set_bSaturation(sliderMatrix_B_saturation.getValue());
    }

    /**
     *
     */
    function getMatrixBPhaseValue() {
        return cparam_get_bPhase();
    }

    /**
     *
     */
    function callbackMatrixBPhase() {
        setCanRefresh();
        canvasItems['B'].setCurrentX(sliderMatrix_B_phase.getValue())
        cparam_set_bPhase(sliderMatrix_B_phase.getValue());
    }

    // liqiang add
    // スライダーの情報
    function getDragInfo(dragNm) {
        var res = {};
        if (dragNm == "R") {
            // 角度
            // 座標X
            res.objX = sliderMatrix_R_phase;
            // 座標Y
            res.objY = sliderMatrix_R_saturation;
            // スライダー(div)のスライド幅
            // スライダー(div)のスライド高
        } else if (dragNm == "R_YE") {
            res.objX = sliderMatrix_R_Yl_phase;
            res.objY = sliderMatrix_R_Yl_saturation;
        } else if (dragNm == "YE") {
            res.objX = sliderMatrix_Yl_phase;
            res.objY = sliderMatrix_Yl_saturation;
        } else if (dragNm == "YE_G") {
            res.objX = sliderMatrix_Yl_G_phase;
            res.objY = sliderMatrix_Yl_G_saturation;
        } else if (dragNm == "G") {
            res.objX = sliderMatrix_G_phase;
            res.objY = sliderMatrix_G_saturation;
        } else if (dragNm == "G_CY") {
            res.objX = sliderMatrix_G_Cy_phase;
            res.objY = sliderMatrix_G_Cy_saturation;
        } else if (dragNm == "CY") {
            res.objX = sliderMatrix_Cy_phase;
            res.objY = sliderMatrix_Cy_saturation;
        } else if (dragNm == "CY_B") {
            res.objX = sliderMatrix_Cy_B_phase;
            res.objY = sliderMatrix_Cy_B_saturation;
        } else if (dragNm == "B") {
            res.objX = sliderMatrix_B_phase;
            res.objY = sliderMatrix_B_saturation;
        } else if (dragNm == "B_MG") {
            res.objX = sliderMatrix_B_MG_phase;
            res.objY = sliderMatrix_B_MG_saturation;
        } else if (dragNm == "MG") {
            res.objX = sliderMatrix_Mg_phase;
            res.objY = sliderMatrix_Mg_saturation;
        } else if (dragNm == "MG_R") {
            res.objX = sliderMatrix_Mg_R_phase;
            res.objY = sliderMatrix_Mg_R_saturation;
        }
        return res;
    }

    function removeAllBorder() {
        $('.dragDiv').removeClass('on');
    }

    function addOneBorder(element) {
        $(element).addClass('on');
    }

    function callCGI(dragNm) {
        if (dragNm == "R") {
            callbackMatrixRPhase();
            callbackMatrixRSaturation();
        } else if (dragNm == "R_YE") {
            callbackMatrixRYlPhase();
            callbackMatrixRYlSaturation();
        } else if (dragNm == "YE") {
            callbackMatrixYlPhase();
            callbackMatrixYlSaturation();
        } else if (dragNm == "YE_G") {
            callbackMatrixYlGPhase();
            callbackMatrixYlGSaturation();
        } else if (dragNm == "G") {
            callbackMatrixGPhase();
            callbackMatrixGSaturation();
        } else if (dragNm == "G_CY") {
            callbackMatrixGCyPhase();
            callbackMatrixGCySaturation();
        } else if (dragNm == "CY") {
            callbackMatrixCyPhase();
            callbackMatrixCySaturation();
        } else if (dragNm == "CY_B") {
            callbackMatrixCyBPhase();
            callbackMatrixCyBSaturation();
        } else if (dragNm == "B") {
            callbackMatrixBPhase();
            callbackMatrixBSaturation();
        } else if (dragNm == "B_MG") {
            callbackMatrixBMGPhase();
            callbackMatrixBMGSaturation();
        } else if (dragNm == "MG") {
            callbackMatrixMGPhase();
            callbackMatrixMGSaturation();
        } else if (dragNm == "MG_R") {
            callbackMatrixMGRPhase();
            callbackMatrixMGRSaturation();
        }
    }

    function initCanvas() {

        canvasItems = {};
        $('.dragDiv').find('canvas').each(function (index, element) {
            canvasItems[$(element).attr('name')] = canvasItem(element);
        })
    }

    function canvasItem(element) {

        var canvas = document.getElementById($(element).attr('id'));
        var ctx = canvas.getContext('2d');
        var dragNm = $(element).attr('name')
        var dragInfo = getDragInfo(dragNm);
        var isDrawing = false;
        var isSelected = false;
        var harfW = (canvas.width - 2) / 2.0;
        var harfH = (canvas.height - 2) / 2.0;
        var canvasWNoBorder = canvas.width - 2;
        var canvasHNoBorder = canvas.height - 2;
        var dataX = 0;
        var dataY = 0;

        var currentX = Math.round(dragInfo.objX.getValue() / (254 / canvasWNoBorder)) + harfW;
        var currentY = Math.round((dragInfo.objY.getValue() * -1) / (254 / canvasHNoBorder)) + harfH;

        drawCycle(currentX, currentY);

        $(element).on('mousedown', function (e) {
            var vLogAndPaint = cparam_get_v_log() == 1 && cparam_get_v_log_paint_sw() == 0;
            var colorCorrect = colorCorrectRadioButtonGroup.getSelectedValue() == "1";
            if (vLogAndPaint || colorCorrect) {
                if (isSelected) {
                    if (!isDrawing && pointInsideCircle([e.offsetX, e.offsetY], [currentX, currentY], 7)) {
                        isDrawing = true
                    }

                    removeAllBorder();
                    addOneBorder($(this).parent());
                    // clearCanvas();
                    if (isDrawing) {
                        clearCanvas();
                        drawCycle(e.offsetX, e.offsetY);
                    }
                } else {
                    setIsSelected(true)
                    removeAllBorder();
                    addOneBorder($(this).parent());
                }

            }
        })
        $('body').on('mouseup', function (e) {
            if (isDrawing) {
                isDrawing = false
            }
        })

        $($(element).parent()).blur(function (e) {
            canvasItems[dragNm].setIsSelected(false)
            $(this).removeClass('on')
            e.stopPropagation();
        })

        $(element).on('mousemove', function (e) {
            if (isDrawing) {
                if ((e.offsetX > 0 && e.offsetX < canvas.width) && (e.offsetY > 0 && e.offsetY < canvas.height)) {
                    clearCanvas();

                    dataX = Math.round(((e.offsetX - 1) - harfW) * (254 / canvasWNoBorder));
                    dataY = Math.round(((e.offsetY - 1) - harfH) * (254 / canvasHNoBorder)) * -1;

                    currentX = e.offsetX;
                    currentY = e.offsetY;

                    if (dataX == 127) {
                        dataX -= 1
                    }
                    if (dataY == 127) {
                        dataY -= 1
                    }
                    drawCycle(e.offsetX, e.offsetY);
                    dragInfo.objX.setValue(dataX);
                    dragInfo.objY.setValue(dataY);
                    callCGI(dragNm)
                }
            }
        })

        function drawCycle(x, y) {
            ctx.beginPath();
            ctx.fillStyle = "#f9f9f9";
            ctx.arc(x, y, 7, 0, 2 * Math.PI);
            ctx.strokeStyle = "#000000";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "#FF0000";
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.strokeStyle = "#FF0000";
            ctx.fill();
            ctx.stroke();
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        /** 
         *  判断一个点是否在圆的内部 
         *  @param point  测试点坐标 
         *  @param circle 圆心坐标 
         *  @param r 圆半径 
         *  返回true为真，false为假 
         *  */
        function pointInsideCircle(point, circle, r) {
            if (r === 0) return false
            var dx = circle[0] - point[0]
            var dy = circle[1] - point[1]
            return dx * dx + dy * dy <= r * r
        }

        function setIsSelected(flag) {
            isSelected = flag
        }
        return {
            setCurrentX: function (x) {
                currentX = Math.round(x / (254 / canvasWNoBorder)) + harfW;
                clearCanvas();
                drawCycle(currentX, currentY)
            },
            setCurrentY: function (y) {
                currentY = Math.round(-1 * y / (254 / canvasHNoBorder)) + harfH;
                clearCanvas();
                drawCycle(currentX, currentY)
            },
            setIsSelected: setIsSelected
        }
    }

    return {
        build: function () {
            return buildSettingMatrix();
        },
    }
}

// liqiang add
// check: スライダーが有効な領域にあるかどうか
function dragWidHgtMaxChk(ui, dragInfo, dragNm) {
    // divの角度
    var angle = dragInfo.angle;
    // マウスの位置
    var new_position_left = ui.position.left + 3;
    var new_position_top = ui.position.top + 3;
    var point = { x: new_position_left, y: new_position_top };

    // 座標の順序，左上，右上，右下，左下，最初のポイントに戻ります
    var polygon;
    if (angle == 90 || angle == 270) {
        polygon = [{ x: 0, y: 0 }, { x: 82, y: 0 }, { x: 82, y: 53 }, { x: 0, y: 53 }, { x: 0, y: 0 }];
    } else if (angle == 0 || angle == 180) {
        polygon = [{ x: 0, y: 0 }, { x: 53, y: 0 }, { x: 53, y: 82 }, { x: 0, y: 83 }, { x: 0, y: 0 }];
    } else if (angle >= 0 && angle < 90) {
        // 既知の角度と斜辺，直角辺を求める
        var bevelSide01 = 0;
        var bevelSide02 = 0;
        if (dragNm == 'R' || dragNm == 'MG_R' || dragNm == 'MG' || dragNm == 'G_CY' || dragNm == 'G') {
            bevelSide01 = 82;
            bevelSide02 = 53;
        } else if (dragNm == 'B' || dragNm == 'CY_B' || dragNm == 'YE' || dragNm == 'R_YE') {
            bevelSide01 = 53;
            bevelSide02 = 83;
        }

        var hypotenuse01 = hypotenuse(bevelSide01, angle);
        var hypotenuse02 = hypotenuse(bevelSide02, angle);

        // 座標の順序，左上，右上，右下，左下，最初のポイントに戻ります
        polygon = [{ x: hypotenuse01[0], y: 0 }, { x: 82, y: hypotenuse02[0] }, { x: hypotenuse01[0], y: 93 }, { x: 0, y: hypotenuse01[1] }, { x: hypotenuse01[0], y: 0 }];
    } else if (angle > 90) {
    }

    pts = queryPtInPolygon(point, polygon); //pts は、ポリゴンと交差するポイントのコレクションです，奇数の説明がポリゴンの範囲内であると判断します
    return pts;
}

// 既知の角度と斜辺，直角辺を求める
function hypotenuse(long, angle) {
    //ラジアンを取得します
    var radian = 2 * Math.PI / 360 * angle;
    return {
        0: Math.sin(radian) * long,// 隣
        1: Math.cos(radian) * long// エッジに対して
    };
}

// ポイントがポリゴンの範囲内にあるかどうかを判断します
function queryPtInPolygon(point, polygon) {
    var p1, p2, p3, p4;
    p1 = point;
    p2 = { x: 1000000000000, y: point.y };
    var count = 0;
    // 各エッジとレイを比較します
    for (var i = 0; i < polygon.length - 1; i++) {
        p3 = polygon[i];
        p4 = polygon[i + 1];
        if (checkCross(p1, p2, p3, p4) == true) {
            count++;
        }
    }
    p3 = polygon[polygon.length - 1];
    p4 = polygon[0];
    if (checkCross(p1, p2, p3, p4) == true) {
        count++;
    }
    return (count % 2 == 0) ? false : true;
}
// 2 つのセグメントが交差しているかどうかを確認します
function checkCross(p1, p2, p3, p4) {
    var v1 = { x: p1.x - p3.x, y: p1.y - p3.y },
        v2 = { x: p2.x - p3.x, y: p2.y - p3.y },
        v3 = { x: p4.x - p3.x, y: p4.y - p3.y },
        v = crossMul(v1, v3) * crossMul(v2, v3);
    v1 = { x: p3.x - p1.x, y: p3.y - p1.y };
    v2 = { x: p4.x - p1.x, y: p4.y - p1.y };
    v3 = { x: p2.x - p1.x, y: p2.y - p1.y };
    return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false;
}
// ベクトルフォーク乗算を計算します
function crossMul(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}