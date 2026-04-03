/**
 * @fileOverview Setup画面:Signals制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var signalsOutput = signals_output();
var signalsReturn = signals_return();
var signalsIpSignal = signals_ip_signal();

function signals_output() {
    /**
     * 構築フラグ
     * @type boolean
     */
    let buildFlag_Signals = false;
    var selectObject = [];
    var txtObject = [];
    var radioModeButtonGroup = [];
    /**
     * label定義
     * @type number
     */
    //select
    const TXT_12G_FORMAT_SELECT = 0;
    const TXT_SIGNALS_OUTPUT_ITEM = 1;
    const TXT_HDR_OUTPUT_SELECT  = 2;
    const TXT_VLOG_OUTPUT_SELECT = 3;
    const TXT_12G_SDI_OUT_SFP = 4;
    const TXT_CHAR_SELECT = 5;
    const TXT_3G_SDI_SELECT = 6;
    const TXT_3G_SDI_OUT1 = 7;
    const TXT_3G_SDI_OUT2 = 8;

    const TXT_3G_OUT1_FORMAT_SELECT = 9;
    const TXT_3G_OUT1_SIGNALS_OUTPUT_ITEM = 10;
    const TXT_3G_OUT1_HDR_OUTPUT_SELECT  = 11;
    const TXT_3G_OUT1_VLOG_OUTPUT_SELECT = 12;
    const TXT_3G_OUT1_CHAR_SELECT = 13;
    //const TXT_3G_OUT1_MONITOR_ASSIST_SELECT = 14;
    const TXT_3G_OUT1_3G_SDI_SELECT = 15;

    const TXT_3G_OUT2_FORMAT_SELECT = 16;
    const TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM = 17;
    const TXT_3G_OUT2_HDR_OUTPUT_SELECT  = 18;
    const TXT_3G_OUT2_VLOG_OUTPUT_SELECT = 19;
    const TXT_3G_OUT2_CHAR_SELECT = 20;
    //const TXT_3G_OUT2_MONITOR_ASSIST_SELECT = 21;
    const TXT_3G_OUT2_3G_SDI_SELECT = 22;
    const TXT_HDMI_SELECT = 23;
    const TXT_HDMI_FORMAT_SELECT = 24;
    const TXT_HDMI_HDR_OUTPUT_SELECT  = 25;
    const TXT_HDMI_VLOG_OUTPUT_SELECT = 26;
   const TXT_HDMI_VIDEO_SAMPLING_SELECT = 27;
   const TXT_HDMI_CHAR_SELECT = 28;
   const TXT_3G_OUT2_OUTPUT_SELECT = 29;


    const INPUT_Signals_CLOUD_URL = 0;
    const INPUT_Signals_USER_ID = 1
    const INPUT_Signals_PASSWORD = 2;
    let txtSignalsObject = [];
    let txtSignalsInputObject = [];
    let nowfreq = null;
    let sFormat = "";
    let uhdCropRadioDate;
    let modeRadioButtonGroup;
    let Signals_set_button;
    var myScroll;
    var buildScrollSuccessFlg = true;

    /**
     * Audio画面構築処理
     */
    function buildSignals() {
        if (!buildFlag_Signals) {
            nowfreq = GetFreqMode();
            sFormat = cparam_get_format();
            uhdCropRadioDate = cparam_get_UHDCrop();
            buildFlag_Signals = true;
            if(!isUE163){
                txtObject[TXT_12G_SDI_OUT_SFP] = TextCtrl('setup_output_labels', 'txt_12g_sdi_out_sfp', NPTZ_WORDING.wID_0635);
            }else{
                txtObject[TXT_12G_SDI_OUT_SFP] = TextCtrl('setup_output_labels', 'txt_12g_sdi_out_sfp', NPTZ_WORDING.wID_0635_UE163);
            }
            txtObject[TXT_12G_FORMAT_SELECT] = TextCtrl('setup_output_labels', 'txt_format_select', NPTZ_WORDING.wID_0631);
            txtObject[TXT_SIGNALS_OUTPUT_ITEM] = TextCtrl('setup_output_labels', 'txt_output_item', NPTZ_WORDING.wID_0632);
            txtObject[TXT_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdr_output_select', NPTZ_WORDING.wID_0633);
            txtObject[TXT_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdr_vlog_output_select', NPTZ_WORDING.wID_0634);
            txtObject[TXT_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_char_select', NPTZ_WORDING.wID_0636);
            txtObject[TXT_3G_SDI_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_sdi_select', NPTZ_WORDING.wID_0637);
            // txtObject[TXT_3G_SDI_OUT1] = TextCtrl('setup_output_labels', 'txt_3g_sdi_out1', NPTZ_WORDING.wID_0638);
            selectObject[TXT_12G_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "select_setting_output_format", "setup_output_fomat_select", "setup_output_fomat_select",callbackSet12GFormatSelect);
            refresh12GSDISFPFormat(selectObject[TXT_12G_FORMAT_SELECT]);
            radioModeButtonGroup[TXT_SIGNALS_OUTPUT_ITEM] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_output_item", RADIO_GROUP.rID_0074, get12GOutputItem(), set12GOutputItem);
            radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdr_ouput_select", RADIO_GROUP.rID_0075, get12GHDROutputSelect(), set12GHDROutputSelect);
            radioModeButtonGroup[TXT_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_vlog_ouput_select", RADIO_GROUP.rID_0076, get12GVLogOutputSelect(), set12GVLogOutputSelect);
            radioModeButtonGroup[TXT_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_char_select", RADIO_GROUP.rID_0001, get12GCharOutputSelect(), set12GCharOutputSelect);
            radioModeButtonGroup[TXT_3G_SDI_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_sdi_select", RADIO_GROUP.rID_0077, get12G3GSDIOutputSelect(), set12G3GSDIOutputSelect);
            
            // 3g out1
            txtObject[TXT_3G_OUT1_FORMAT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out1_format_select', NPTZ_WORDING.wID_0631);
            txtObject[TXT_3G_OUT1_SIGNALS_OUTPUT_ITEM] = TextCtrl('setup_output_labels', 'txt_3g_out1_output_item', NPTZ_WORDING.wID_0632);
            txtObject[TXT_3G_OUT1_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out1_hdr_output_select', NPTZ_WORDING.wID_0633);
            txtObject[TXT_3G_OUT1_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out1_hdr_vlog_output_select', NPTZ_WORDING.wID_0634);
            txtObject[TXT_3G_OUT1_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out1_char_select', NPTZ_WORDING.wID_0636);
            //txtObject[TXT_3G_OUT1_MONITOR_ASSIST_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out1_monitor_assist_select', NPTZ_WORDING.wID_0641);

            txtObject[TXT_3G_OUT1_3G_SDI_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out1_3g_sdi_select', NPTZ_WORDING.wID_0637);
            txtObject[TXT_3G_SDI_OUT1] = TextCtrl('setup_output_labels', 'txt_3g_sdi_out1', NPTZ_WORDING.wID_0638);
            selectObject[TXT_3G_OUT1_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "setup_output_3g_out1_fomat_select", "setup_output_3g_out1_fomat_select", "setup_output_3g_out1_fomat_select",callbackSet3GOutput1Select);
            refresh3GOutput1Format(selectObject[TXT_3G_OUT1_FORMAT_SELECT]);
            radioModeButtonGroup[TXT_3G_OUT1_SIGNALS_OUTPUT_ITEM] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out1_output_item", RADIO_GROUP.rID_0074, get3GOut1OutputItem(), set3GOut1OutputItem);
            radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out1_hdr_ouput_select", RADIO_GROUP.rID_0075, get3GOut1HDROutputSelect(), set3GOut1HDROutputSelect);
            radioModeButtonGroup[TXT_3G_OUT1_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out1_vlog_ouput_select", RADIO_GROUP.rID_0076, get3GOut1VlogOutputSelect(), set3GOut1VlogOutputSelect);
            //radioModeButtonGroup[TXT_3G_OUT1_MONITOR_ASSIST_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out1_monitor_assist_select", RADIO_GROUP.rID_0001, getOutputItem(), setOutputItem);
            radioModeButtonGroup[TXT_3G_OUT1_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out1_char_select", RADIO_GROUP.rID_0001, get3GOut1Char(), set3GOut1Char);
            radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out1_3g_sdi_select", RADIO_GROUP.rID_0077, get3GOut1SDI(), set3GOut1SDI);

            // 3g out2
            txtObject[TXT_3G_SDI_OUT2] = TextCtrl('setup_output_labels', 'txt_3g_sdi_out2', NPTZ_WORDING.wID_0640);
            txtObject[TXT_3G_OUT2_FORMAT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_format_select', NPTZ_WORDING.wID_0631);
            selectObject[TXT_3G_OUT2_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "setup_output_3g_out2_fomat_select", "setup_output_3g_out2_fomat_select", "setup_output_3g_out2_fomat_select",callbackSet3GOutput2Select);
            refresh3GOutput2Format(selectObject[TXT_3G_OUT2_FORMAT_SELECT]);
            if(!isUE163){
                txtObject[TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM] = TextCtrl('setup_output_labels', 'txt_3g_out2_output_item', NPTZ_WORDING.wID_0632);
                txtObject[TXT_3G_OUT2_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_output_select',NPTZ_WORDING.wiD_0881);
                txtObject[TXT_3G_OUT2_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_hdr_output_select', NPTZ_WORDING.wID_0633);
                txtObject[TXT_3G_OUT2_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_hdr_vlog_output_select', NPTZ_WORDING.wID_0634);
                txtObject[TXT_3G_OUT2_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_char_select', NPTZ_WORDING.wID_0636);
                //txtObject[TXT_3G_OUT2_MONITOR_ASSIST_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_monitor_assist_select', NPTZ_WORDING.wID_0641);
                txtObject[TXT_3G_OUT2_3G_SDI_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_3g_sdi_select', NPTZ_WORDING.wID_0637);
                radioModeButtonGroup[TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_output_item", RADIO_GROUP.rID_0074, get3GOut2OutputItem(), set3GOut2OutputItem);
                radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_ouput_select",RADIO_GROUP.rID_0102, get3GOut2OutputSelect(), set3GOut2OutputSelect);
                radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_hdr_ouput_select", RADIO_GROUP.rID_0075, get3GOut2HDROutputSelect(), set3GOut2HDROutputSelect);
                radioModeButtonGroup[TXT_3G_OUT2_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_vlog_ouput_select", RADIO_GROUP.rID_0076, get3GOut2VlogOutputSelect(), set3GOut2VlogOutputSelect);
                radioModeButtonGroup[TXT_3G_OUT2_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_char_select", RADIO_GROUP.rID_0001, get3GOut2Char(), set3GOut2Char);
                //radioModeButtonGroup[TXT_3G_OUT2_MONITOR_ASSIST_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_monitor_assist_select", RADIO_GROUP.rID_0001, getOutputItem(), setOutputItem);
                radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_3g_sdi_select", RADIO_GROUP.rID_0077, get3GOut2SDI(), set3GOut2SDI);

                txtObject[TXT_HDMI_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi', NPTZ_WORDING.wID_0642);
                txtObject[TXT_HDMI_FORMAT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_format_select', NPTZ_WORDING.wID_0631);
                txtObject[TXT_HDMI_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_hdr_output_select', NPTZ_WORDING.wID_0633);
                txtObject[TXT_HDMI_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_hdr_vlog_output_select', NPTZ_WORDING.wID_0634);
                txtObject[TXT_HDMI_VIDEO_SAMPLING_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_video_sampling_select', NPTZ_WORDING.wID_0643);
                txtObject[TXT_HDMI_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_char_select', NPTZ_WORDING.wID_0636);
                selectObject[TXT_HDMI_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "setup_output_hdmi_fomat_select", "setup_output_hdmi_fomat_select", "setup_output_hdmi_fomat_select",callbackSetHDMISelect);
                refreshHDMIFormat(selectObject[TXT_HDMI_FORMAT_SELECT]);
                radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_hdr_ouput_select", RADIO_GROUP.rID_0075, getHDMIHDROutputSelect(), setHDMIHDROutputSelect);
                radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_vlog_ouput_select", RADIO_GROUP.rID_0076,getHDMIVlogOutputSelect(), setHDMIVlogOutputSelect);
                radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_video_sampling_select", RADIO_GROUP.rID_0078, getHDMIVideoSamplingSelect(), setHDMIVideoSamplingSelect);
                radioModeButtonGroup[TXT_HDMI_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_char_select", RADIO_GROUP.rID_0001, getHDMIChar(), setHDMIChar);
            }else{
                txtObject[TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM] = TextCtrl('setup_output_labels', 'txt_3g_out2_output_item isUE163', NPTZ_WORDING.wID_0632);
                txtObject[TXT_3G_OUT2_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_hdr_output_select isUE163', NPTZ_WORDING.wID_0633);
                txtObject[TXT_3G_OUT2_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_hdr_vlog_output_select isUE163', NPTZ_WORDING.wID_0634);
                txtObject[TXT_3G_OUT2_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_char_select isUE163', NPTZ_WORDING.wID_0636);
                //txtObject[TXT_3G_OUT2_MONITOR_ASSIST_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_monitor_assist_select', NPTZ_WORDING.wID_0641);
                txtObject[TXT_3G_OUT2_3G_SDI_SELECT] = TextCtrl('setup_output_labels', 'txt_3g_out2_3g_sdi_select isUE163', NPTZ_WORDING.wID_0637);
                // txtObject[TXT_3G_SDI_OUT2] = TextCtrl('setup_output_labels', 'txt_3g_sdi_out2', NPTZ_WORDING.wID_0640);
                // selectObject[TXT_3G_OUT2_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "setup_output_3g_out2_fomat_select", "setup_output_3g_out2_fomat_select", "setup_output_3g_out2_fomat_select",callbackSet3GOutput2Select);
                // refresh3GOutput2Format(selectObject[TXT_3G_OUT2_FORMAT_SELECT]);
                radioModeButtonGroup[TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_output_item", RADIO_GROUP.rID_0074, get3GOut2OutputItem(), set3GOut2OutputItem, null,"isUE163");
                // radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_ouput_select",RADIO_GROUP.rID_0102, get3GOut2OutputSelect(), set3GOut2OutputSelect);
                radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_hdr_ouput_select", RADIO_GROUP.rID_0075, get3GOut2HDROutputSelect(), set3GOut2HDROutputSelect, null,"isUE163");
                radioModeButtonGroup[TXT_3G_OUT2_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_vlog_ouput_select", RADIO_GROUP.rID_0076, get3GOut2VlogOutputSelect(), set3GOut2VlogOutputSelect, null,"isUE163");
                radioModeButtonGroup[TXT_3G_OUT2_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_char_select", RADIO_GROUP.rID_0001, get3GOut2Char(), set3GOut2Char, null,"isUE163");
                //radioModeButtonGroup[TXT_3G_OUT2_MONITOR_ASSIST_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_monitor_assist_select", RADIO_GROUP.rID_0001, getOutputItem(), setOutputItem);
                radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_3g_out2_3g_sdi_select", RADIO_GROUP.rID_0077, get3GOut2SDI(), set3GOut2SDI, null,"isUE163");

                txtObject[TXT_HDMI_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi isUE163', NPTZ_WORDING.wID_0642);
                txtObject[TXT_HDMI_FORMAT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_format_select isUE163', NPTZ_WORDING.wID_0631);
                txtObject[TXT_HDMI_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_hdr_output_select isUE163', NPTZ_WORDING.wID_0633);
                txtObject[TXT_HDMI_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_hdr_vlog_output_select isUE163', NPTZ_WORDING.wID_0634);
                txtObject[TXT_HDMI_VIDEO_SAMPLING_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_video_sampling_select isUE163', NPTZ_WORDING.wID_0643);
                txtObject[TXT_HDMI_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_char_select isUE163', NPTZ_WORDING.wID_0636);
                selectObject[TXT_HDMI_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "setup_output_hdmi_fomat_select", "setup_output_hdmi_fomat_select", "setup_output_hdmi_fomat_select isUE163",callbackSetHDMISelect);
                refreshHDMIFormat(selectObject[TXT_HDMI_FORMAT_SELECT]);
                radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_hdr_ouput_select", RADIO_GROUP.rID_0075, getHDMIHDROutputSelect(), setHDMIHDROutputSelect, null,"isUE163");
                radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_vlog_ouput_select", RADIO_GROUP.rID_0076,getHDMIVlogOutputSelect(), setHDMIVlogOutputSelect, null,"isUE163");
                radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_video_sampling_select", RADIO_GROUP.rID_0078, getHDMIVideoSamplingSelect(), setHDMIVideoSamplingSelect, null,"isUE163");
                radioModeButtonGroup[TXT_HDMI_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_char_select", RADIO_GROUP.rID_0001, getHDMIChar(), setHDMIChar, null,"isUE163");
            }

            // txtObject[TXT_HDMI_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi', NPTZ_WORDING.wID_0642);
            // txtObject[TXT_HDMI_FORMAT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_format_select', NPTZ_WORDING.wID_0631);
            // txtObject[TXT_HDMI_HDR_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_hdr_output_select', NPTZ_WORDING.wID_0633);
            // txtObject[TXT_HDMI_VLOG_OUTPUT_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_hdr_vlog_output_select', NPTZ_WORDING.wID_0634);
            // txtObject[TXT_HDMI_VIDEO_SAMPLING_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_video_sampling_select', NPTZ_WORDING.wID_0643);
            // txtObject[TXT_HDMI_CHAR_SELECT] = TextCtrl('setup_output_labels', 'txt_hdmi_char_select', NPTZ_WORDING.wID_0636);
            // selectObject[TXT_HDMI_FORMAT_SELECT] = SelectCtrl("setup_signal_output_inner", "setup_output_hdmi_fomat_select", "setup_output_hdmi_fomat_select", "setup_output_hdmi_fomat_select",callbackSetHDMISelect);
            // refreshHDMIFormat(selectObject[TXT_HDMI_FORMAT_SELECT]);
            // radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_hdr_ouput_select", RADIO_GROUP.rID_0075, getHDMIHDROutputSelect(), setHDMIHDROutputSelect);
            // radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_vlog_ouput_select", RADIO_GROUP.rID_0076,getHDMIVlogOutputSelect(), setHDMIVlogOutputSelect);
            // radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_video_sampling_select", RADIO_GROUP.rID_0078, getHDMIVideoSamplingSelect(), setHDMIVideoSamplingSelect);
            // radioModeButtonGroup[TXT_HDMI_CHAR_SELECT] = RadioButtonGroupCtrl("setup_signal_output_inner", "setting_hdmi_char_select", RADIO_GROUP.rID_0001, getHDMIChar(), setHDMIChar);

            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine0 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine1 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine3 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine4 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine5 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine6 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine7 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine8 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine9 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine10 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine11 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine12 systemDivInnerLine_signals_output"></div>'));
            //$('#setup_signal_output_inner').append($('<div class="systemDivInnerLine13 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine14 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine15 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine16 systemDivInnerLine_signals_output"></div>'));
            // if (!isUE163) {
              $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine17 systemDivInnerLine_signals_output"></div>'));
            // }
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine18 systemDivInnerLine_signals_output"></div>'));
            if (!isUE163) {
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine19 systemDivInnerLine_signals_output"></div>'));
            }else{
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine19_ue163 systemDivInnerLine_signals_output"></div>'));  
            }
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine20 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine21 systemDivInnerLine_signals_output"></div>'));
            if (!isUE163) {
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine22 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine23 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine24 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine25 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine26 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine27 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine28 systemDivInnerLine_signals_output"></div>'));
            }else{
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine23_ue163 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine24_ue163 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine25_ue163 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine26_ue163 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine27_ue163 systemDivInnerLine_signals_output"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine28_ue163 systemDivInnerLine_signals_output"></div>'));
            }
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine23 systemDivInnerLine_signals_output"></div>'));
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine24 systemDivInnerLine_signals_output"></div>'));
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine25 systemDivInnerLine_signals_output"></div>'));
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine26 systemDivInnerLine_signals_output"></div>'));
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine27 systemDivInnerLine_signals_output"></div>'));
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine28 systemDivInnerLine_signals_output"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_12gsdi vertical_line_common"></div>'));
            $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_3gsdi1 vertical_line_common"></div>'));
            if(!isUE163){
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_3gsdi2 vertical_line_common"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_hdmi vertical_line_common"></div>'));
            }else{
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_3gsdi2_ue163 vertical_line_common"></div>'));
                $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_hdmi_ue163 vertical_line_common"></div>'));
            }
            // $('#setup_signal_output_inner').append($('<div class="systemDivInnerLine2_ver_hdmi vertical_line_common"></div>'));

            for (let select in selectObject) {
                selectObject[select].show();
                selectObject[select].displayOff();
            }
            for (let text in txtObject) {
                txtObject[text].show();
            }
            for (let text in txtSignalsObject) {
                txtSignalsObject[text].show();
            }
            for (let text in txtSignalsInputObject) {
                txtSignalsInputObject[text].show();
                txtSignalsInputObject[text].displayOff();
            }
            initData();
            
        } else {
            rebuild();
        }

        buildMyScroll();
    }

    function initData(){
        //12g
        selectObject[TXT_12G_FORMAT_SELECT].val(cparam_get12GFormatSelect());
        radioModeButtonGroup[TXT_SIGNALS_OUTPUT_ITEM].setSelectedValue(cparam_get_12GOutPutItem());
        radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT].setSelectedValue(cparam_get_12GHDROutput());
        radioModeButtonGroup[TXT_VLOG_OUTPUT_SELECT].setSelectedValue(cparam_get_12GVLogOutput());
        radioModeButtonGroup[TXT_CHAR_SELECT].setSelectedValue(cparam_get_12GCharOutput());
        radioModeButtonGroup[TXT_3G_SDI_SELECT].setSelectedValue(cparam_get_12G3GSDIOutput());
        // 3g out1
        selectObject[TXT_3G_OUT1_FORMAT_SELECT].val(cparam_get3GOutput1FormatSelect());
        radioModeButtonGroup[TXT_3G_OUT1_SIGNALS_OUTPUT_ITEM].setSelectedValue(cparam_get_3GOut1OutputItem());
        radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT].setSelectedValue(cparam_get_3GOut1HDROutput());
        radioModeButtonGroup[TXT_3G_OUT1_VLOG_OUTPUT_SELECT].setSelectedValue(get3GOut1VlogOutputSelect());
        radioModeButtonGroup[TXT_3G_OUT1_CHAR_SELECT].setSelectedValue(get3GOut1Char());
        radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT].setSelectedValue(get3GOut1SDI());
        //3g out2
        selectObject[TXT_3G_OUT2_FORMAT_SELECT].val(cparam_get3GOutput2FormatSelect());
        radioModeButtonGroup[TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM].setSelectedValue(get3GOut2OutputItem());
        if(!isUE163){
            radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].setSelectedValue(get3GOut2OutputSelect());
        }
        radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT].setSelectedValue(get3GOut2HDROutputSelect());
        radioModeButtonGroup[TXT_3G_OUT2_VLOG_OUTPUT_SELECT].setSelectedValue(get3GOut2VlogOutputSelect());
        radioModeButtonGroup[TXT_3G_OUT2_CHAR_SELECT].setSelectedValue(get3GOut2Char());
        radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT].setSelectedValue(get3GOut2SDI());
        //hdmi
        selectObject[TXT_HDMI_FORMAT_SELECT].val(cparam_getHDMIFormatSelect());
        samplingControl();
        radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT].setSelectedValue(getHDMIHDROutputSelect());
        radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT].setSelectedValue(getHDMIVlogOutputSelect());
        radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT].setSelectedValue(getHDMIVideoSamplingSelect());
        radioModeButtonGroup[TXT_HDMI_CHAR_SELECT].setSelectedValue(getHDMIChar());

        
        if(cparam_get_v_log() == 0)
        {
            radioModeButtonGroup[TXT_VLOG_OUTPUT_SELECT].setDisable("0,1");
            radioModeButtonGroup[TXT_3G_OUT1_VLOG_OUTPUT_SELECT].setDisable("0,1");
            radioModeButtonGroup[TXT_3G_OUT2_VLOG_OUTPUT_SELECT].setDisable("0,1");
            radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT].setDisable("0,1");
        }else{
            radioModeButtonGroup[TXT_VLOG_OUTPUT_SELECT].setEnable("0,1");
            radioModeButtonGroup[TXT_3G_OUT1_VLOG_OUTPUT_SELECT].setEnable("0,1");
            radioModeButtonGroup[TXT_3G_OUT2_VLOG_OUTPUT_SELECT].setEnable("0,1");
            radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT].setEnable("0,1");
        }

        if(cparam_get_hdr() == 0)
        {
            radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT].setDisable("0,1,2");
            radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT].setDisable("0,1,2");
            radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT].setDisable("0,1,2");
            radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT].setDisable("0,1,2");
        }else{
            if(cparam_get_gamut() == 0){
            radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT].setDisable("1");
            radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT].setDisable("1");
            radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT].setDisable("1");
            radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT].setDisable("1");
            radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT].setEnable("0,2");
            radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT].setEnable("0,2");
            radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT].setEnable("0,2");
            radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT].setEnable("0,2");
            }else{
            radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT].setEnable("0,1,2");
            radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT].setEnable("0,1,2");
            radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT].setEnable("0,1,2");
            radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT].setEnable("0,1,2");
            }
        } 
        if (selectObject[TXT_12G_FORMAT_SELECT].get() == "10" || selectObject[TXT_12G_FORMAT_SELECT].get() == "11" || selectObject[TXT_12G_FORMAT_SELECT].get() == "20") {
            radioModeButtonGroup[TXT_3G_SDI_SELECT].setEnable("0,1");
        } else {
            radioModeButtonGroup[TXT_3G_SDI_SELECT].setDisable("0,1");
        }  
        if (selectObject[TXT_3G_OUT1_FORMAT_SELECT].get() == "10" || selectObject[TXT_3G_OUT1_FORMAT_SELECT].get() == "11"|| selectObject[TXT_12G_FORMAT_SELECT].get() == "20") {
            radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT].setEnable("0,1");
        } else {
            radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT].setDisable("0,1");
        } 
        if (selectObject[TXT_3G_OUT2_FORMAT_SELECT].get() == "10" || selectObject[TXT_3G_OUT2_FORMAT_SELECT].get() == "11"|| selectObject[TXT_12G_FORMAT_SELECT].get() == "20") {
            radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT].setEnable("0,1");
        } else {
            radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT].setDisable("0,1");
        } 
        
        if(uhdCropRadioDate == 2 || cparam_get_SFPMode() == 0 || 
        (cparam_get_format() == "01" || cparam_get_format() == "02") ||
        cparam_get_moip_active_status() == "NG"){
            if (!isUE163) {
                radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].setDisable("0,1");
            }
        } else {
            if (!isUE163) {
                radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].setEnable("0,1");
            }
        } 
        
    }
    function callbackSet12GFormatSelect(){
        cparam_set12GFormatSelect( selectObject[TXT_12G_FORMAT_SELECT].get());
        if (selectObject[TXT_12G_FORMAT_SELECT].get() == "10" || selectObject[TXT_12G_FORMAT_SELECT].get() == "11" || selectObject[TXT_12G_FORMAT_SELECT].get() == "20") {
            radioModeButtonGroup[TXT_3G_SDI_SELECT].setEnable("0,1");
        } else {
            radioModeButtonGroup[TXT_3G_SDI_SELECT].setDisable("0,1");
        }
    }
    function callbackSet3GOutput1Select(){
        cparam_set3GOutput1FormatSelect( selectObject[TXT_3G_OUT1_FORMAT_SELECT].get());
        if (selectObject[TXT_3G_OUT1_FORMAT_SELECT].get() == "10" || selectObject[TXT_3G_OUT1_FORMAT_SELECT].get() == "11"|| selectObject[TXT_12G_FORMAT_SELECT].get() == "20") {
            radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT].setEnable("0,1");
        } else {
            radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT].setDisable("0,1");
        }
    }
    function callbackSet3GOutput2Select(){
        cparam_set3GOutput2FormatSelect( selectObject[TXT_3G_OUT2_FORMAT_SELECT].get());
        if (selectObject[TXT_3G_OUT2_FORMAT_SELECT].get() == "10" || selectObject[TXT_3G_OUT2_FORMAT_SELECT].get() == "11"|| selectObject[TXT_12G_FORMAT_SELECT].get() == "20") {
            radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT].setEnable("0,1");
            if(!isUE163){
                //radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].setEnable("0,1");
            }
        } else {
            radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT].setDisable("0,1");
            if(!isUE163){
                //radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].setDisable("0,1");
            }
        }
    }

    function callbackSetHDMISelect(){
        cparam_setHDMIFormatSelect( selectObject[TXT_HDMI_FORMAT_SELECT].get());
        samplingControl();

    }
    function samplingControl(){
        if(selectObject[TXT_HDMI_FORMAT_SELECT].get()=="1A" || selectObject[TXT_HDMI_FORMAT_SELECT].get()=='19' || selectObject[TXT_HDMI_FORMAT_SELECT].get()=='1F'){
            radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT].displayOff();
        }else{
            radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT].displayDisabled();
        }
    }

    function get12GOutputItem(){
        return cparam_get_12GOutPutItem();
    }
    function set12GOutputItem(){
        return cparam_set_12GOutPutItem(radioModeButtonGroup[TXT_SIGNALS_OUTPUT_ITEM].getSelectedValue());
    }

    function get12GHDROutputSelect(){
        return cparam_get_12GHDROutput();
    }
    function set12GHDROutputSelect(){
        return cparam_set_12GHDROutput(radioModeButtonGroup[TXT_HDR_OUTPUT_SELECT].getSelectedValue());
    }

    function get12GVLogOutputSelect(){
        return cparam_get_12GVLogOutput();
    }
    function set12GVLogOutputSelect(){
        return cparam_set_12GVLogOutput(radioModeButtonGroup[TXT_VLOG_OUTPUT_SELECT].getSelectedValue());
    }

    function get12GCharOutputSelect(){
        return cparam_get_12GCharOutput();
    }
    function set12GCharOutputSelect(){
        var setValue = radioModeButtonGroup[TXT_CHAR_SELECT].getSelectedValue();
        return cparam_set_12GCharOutput(setValue);
    }

    function get12G3GSDIOutputSelect(){
        return cparam_get_12G3GSDIOutput();
    }
    function set12G3GSDIOutputSelect(){
        return cparam_set_12G3GSDIOutput(radioModeButtonGroup[TXT_3G_SDI_SELECT].getSelectedValue());
    }
    function get3GOut1HDROutputSelect(){
        return cparam_get_3GOut1HDROutput();
    }
    function set3GOut1HDROutputSelect(){
        return cparam_set_3GOut1HDROutput(radioModeButtonGroup[TXT_3G_OUT1_HDR_OUTPUT_SELECT].getSelectedValue());
    }
    function get3GOut2HDROutputSelect(){
        return cparam_get_3GOut2HDROutput();
    }
    function set3GOut2HDROutputSelect(){
        return cparam_set_3GOut2HDROutput(radioModeButtonGroup[TXT_3G_OUT2_HDR_OUTPUT_SELECT].getSelectedValue());
    }
    function getHDMIHDROutputSelect(){
        return cparam_get_HDMIHDROutput();
    }
    function setHDMIHDROutputSelect(){
        return cparam_set_HDMIHDROutput(radioModeButtonGroup[TXT_HDMI_HDR_OUTPUT_SELECT].getSelectedValue());
    }
    function get3GOut1VlogOutputSelect(){
        return cparam_get_3GOut1VlogOutput();
    }
    function set3GOut1VlogOutputSelect(){
        return cparam_set_3GOut1VlogOutput(radioModeButtonGroup[TXT_3G_OUT1_VLOG_OUTPUT_SELECT].getSelectedValue());
    }
    function get3GOut2VlogOutputSelect(){
        return cparam_get_3GOut2VlogOutput();
    }
    function set3GOut2VlogOutputSelect(){
        return cparam_set_3GOut2VlogOutput(radioModeButtonGroup[TXT_3G_OUT2_VLOG_OUTPUT_SELECT].getSelectedValue());
    }
    function getHDMIVlogOutputSelect(){
        return cparam_get_HDMIVlogOutput();
    }
    function setHDMIVlogOutputSelect(){
        return cparam_set_HDMIVlogOutput(radioModeButtonGroup[TXT_HDMI_VLOG_OUTPUT_SELECT].getSelectedValue());
    }
    function getHDMIVideoSamplingSelect(){
        return cparam_get_HDMIVideoSampling();
    }
    function setHDMIVideoSamplingSelect(){
        return cparam_set_HDMIVideoSampling(radioModeButtonGroup[TXT_HDMI_VIDEO_SAMPLING_SELECT].getSelectedValue());
    }
    function get3GOut1OutputItem(){
        return cparam_get_3GOut1OutputItem();
    }
    function set3GOut1OutputItem(){
        return cparam_set_3GOut1OutputItem(radioModeButtonGroup[TXT_3G_OUT1_SIGNALS_OUTPUT_ITEM].getSelectedValue());
    }
    function get3GOut2OutputItem(){
        return cparam_get_3GOut2OutputItem();
    }
    function set3GOut2OutputItem(){
        return cparam_set_3GOut2OutputItem(radioModeButtonGroup[TXT_3G_OUT2_SIGNALS_OUTPUT_ITEM].getSelectedValue());
    }
    function get3GOut1Char(){
        var ret = cparam_get_3GOut1Char();
        return ret;
    }
    function set3GOut1Char(){
        var setValue = radioModeButtonGroup[TXT_3G_OUT1_CHAR_SELECT].getSelectedValue();
        return cparam_set_3GOut1Char(setValue);
    }
    function get3GOut2Char(){
        var ret = cparam_get_3GOut2Char();
        return ret;
    }
    function set3GOut2Char() {
        var setValue = radioModeButtonGroup[TXT_3G_OUT2_CHAR_SELECT].getSelectedValue();
        return cparam_set_3GOut2Char(setValue);
    }
    function get3GOut1SDI(){
        return cparam_get_3GOut1SDI();
    }
    function set3GOut1SDI(){
        return cparam_set_3GOut1SDI(radioModeButtonGroup[TXT_3G_OUT1_3G_SDI_SELECT].getSelectedValue());
    }
    function get3GOut2SDI(){
        return cparam_get_3GOut2SDI();
    }
    function set3GOut2SDI(){
        return cparam_set_3GOut2SDI(radioModeButtonGroup[TXT_3G_OUT2_3G_SDI_SELECT].getSelectedValue());
    }
    function getHDMIChar(){
        var ret = cparam_get_HDMIChar();
        return ret;
    }
    function setHDMIChar() {
        var setValue = radioModeButtonGroup[TXT_HDMI_CHAR_SELECT].getSelectedValue();
        return cparam_set_HDMIChar(setValue);
    }
    function getOutputItem(){

    }
    function setOutputItem(){

    }
    function get3GOut2OutputSelect(){
        return cparam_get_3GOut2OutputSelect();
    }
    function set3GOut2OutputSelect(){
        var setValue = radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].getSelectedValue();
        window.jConfirm(MSG_STATUS.mID_0114, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
            if(confirm){
                setValue = cparam_set_3GOut2OutputSelect(setValue);
            }else{
                setValue = get3GOut2OutputSelect();
                radioModeButtonGroup[TXT_3G_OUT2_OUTPUT_SELECT].setSelectedValue(setValue);
            }
        });
        return setValue;
    }
    function refreshHDMIFormat(targetObject){
        let select_system_hdmi_value = [];
        let select_system_hdmi_text = [];
        if (nowfreq == 0) {
            switch (sFormat) {
                case "19":
                    if(uhdCropRadioDate == 2){
                        select_system_hdmi_value = ["01","19"];
                        select_system_hdmi_text = ["720/59.94p","2160/59.94p"];
                    }
                    // else if(uhdCropRadioDate == 1){
                    //     select_system_hdmi_value = ["10"];
                    //     select_system_hdmi_text = ["1080/59.94p"];
                    // }
                    else{
                        select_system_hdmi_value = ["10","19"];
                        select_system_hdmi_text = ["1080/59.94p","2160/59.94p"];
                    }
                    break;
                case "17":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_hdmi_value = ["14"];
                    //     select_system_hdmi_text = ["1080/29.97p"];
                    // }else{
                        select_system_hdmi_value = ["14","17"];
                        select_system_hdmi_text = ["1080/29.97p","2160/29.97p"];
                    // }
                    break;
                case "26":
                    select_system_hdmi_value = ["26"];
                    select_system_hdmi_text = ["1080/119.88p"];
                    break;
                case "10":
                    select_system_hdmi_value = ["10","04"];
                    select_system_hdmi_text = ["1080/59.94p","1080/59.94i"];
                    break;
                // case "04":
                //     select_system_hdmi_value = ["04"];
                //     select_system_hdmi_text = ["1080/59.94i"];
                //     break;
                case "14":
                    select_system_hdmi_value = ["14"];
                    select_system_hdmi_text = ["1080/29.97p"];
                    break;
                // case "07":
                //     select_system_hdmi_value = ["14"];
                //     select_system_hdmi_text = ["1080/29.97p"];
                //     break;
                // case "16":
                //     select_system_hdmi_value = ["16"];
                //     select_system_hdmi_text = ["1080/23.98p(59.94p)"];
                //     break;
                case "01":
                    select_system_hdmi_value = ["01"];
                    select_system_hdmi_text = ["720/59.94p"];
                    break;
            }
        } else if (nowfreq == 1) {
            switch (sFormat) {
                case "1A":
                    if(uhdCropRadioDate == 2){
                        select_system_hdmi_value = ["02","1A"];
                        select_system_hdmi_text = ["720/50p","2160/50p"];
                    }
                    // else if(uhdCropRadioDate == 1){
                    //     select_system_hdmi_value = ["11"];
                    //     select_system_hdmi_text = ["1080/50p"];
                    // }
                    else{
                        select_system_hdmi_value = ["11","1A"];
                        select_system_hdmi_text = ["1080/50p","2160/50p"];
                    }
                    break;
                case "18":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_hdmi_value = ["15"];
                    //     select_system_hdmi_text = ["1080/25p"];
                    // }else{
                        select_system_hdmi_value = ["15","18"];
                        select_system_hdmi_text = ["1080/25p","2160/25p"];
                    // }
                    break;
                case "27":
                    select_system_hdmi_value = ["27"];
                    select_system_hdmi_text = ["1080/100p"];
                    break;
                case "11":
                    select_system_hdmi_value = ["11","05"];
                    select_system_hdmi_text = ["1080/50p","1080/50i"];
                    break;
                // case "05":
                //     select_system_hdmi_value = ["05"];
                //     select_system_hdmi_text = ["1080/50i"];
                //     break;
                case "15":
                    select_system_hdmi_value = ["15"];
                    select_system_hdmi_text = ["1080/25p"];
                    break;
                // case "08":
                //     select_system_hdmi_value = ["15"];
                //     select_system_hdmi_text = ["1080/25p"];
                //     break;
                case "02":
                    select_system_hdmi_value = ["02"];
                    select_system_hdmi_text = ["720/50p"];
                    break;
            }
        } else if (nowfreq == 2) {
            switch (sFormat) {
                case "21":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_hdmi_value = ["22"];
                    //     select_system_hdmi_text = ["1080/24p"];
                    // }else{
                        select_system_hdmi_value = ["21","22"];
                        select_system_hdmi_text = ["2160/24p","1080/24p"];
                    // }
                    break;
                case "22":
                    select_system_hdmi_value = ["22"];
                    select_system_hdmi_text = ["1080/24p"];
                    break;
            }
        } else if (nowfreq == 3) {
            switch (sFormat) {
                case "1B":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_hdmi_value = ["23"];
                    //     select_system_hdmi_text = ["1080/23.98p"];
                    // }else{
                        select_system_hdmi_value = ["1B","23"];
                        select_system_hdmi_text = ['2160/23.98p',"1080/23.98p"];
                    // }
                    break;
                case "23":
                    select_system_hdmi_value = ["23"];
                    select_system_hdmi_text = ["1080/23.98p"];
                    break;
                // case "0A":
                //     select_system_hdmi_value = ["23"];
                //     select_system_hdmi_text = ["1080/23.98p"];
                //     break;
            }
        } else if (nowfreq == 4) {
            switch(sFormat){
                case "20":
                    select_system_hdmi_value = ["20"];
                    select_system_hdmi_text = ['1080/60p'];
                    break;
                case "1F":
                    select_system_hdmi_value = ["1F","20"];
                    select_system_hdmi_text = ['2160/60p','1080/60p'];
                    break;
            }
        }
        targetObject.appendOptions(select_system_hdmi_value, select_system_hdmi_text);
    }
    function refresh3GOutput2Format(targetObject){
        let select_system_3g_format_value = [];
        let select_system_3g_format_text = [];
        if (nowfreq == 0) {
            switch (sFormat) {
                case "19":
                    if(uhdCropRadioDate == 2){
                        select_system_3g_format_value = ["01"];
                        select_system_3g_format_text = ["720/59.94p"];
                    }else{
                        select_system_3g_format_value = ["10", "04"];
                        select_system_3g_format_text = ["1080/59.94p", "1080/59.94i"];
                    }
                    break;
                case "17":
                    select_system_3g_format_value = ["14"];
                    select_system_3g_format_text = ["1080/29.97p"];
                    break;
                case "26":
                    select_system_3g_format_value = ["10"];
                    select_system_3g_format_text = ["1080/59.94p"];//(2nd Frame)
                    break;
                case "10":
                    select_system_3g_format_value = ["10", "04"];
                    select_system_3g_format_text = ["1080/59.94p", "1080/59.94i"];
                    break;
                // case "04":
                //     select_system_3g_format_value = ["04"];
                //     select_system_3g_format_text = ["1080/59.94i"];
                //     break;
                case "14":
                    select_system_3g_format_value = ["14"];
                    select_system_3g_format_text = ["1080/29.97p"];
                    break;
                // case "07":
                //     select_system_3g_format_value = ["07"];
                //     select_system_3g_format_text = ["1080/29.97PsF"];
                //     break;
                // case "16":
                //     select_system_3g_format_value = ["16"];
                //     select_system_3g_format_text = ["1080/23.98p(59.94i)"];
                //     break;
                case "01":
                    select_system_3g_format_value = ["01"];
                    select_system_3g_format_text = ["720/59.94p"];
                    break;
            }
        } else if (nowfreq == 1) {
            switch (sFormat) {
                case "1A":
                    if(uhdCropRadioDate == 2){
                        select_system_3g_format_value = ["02"];
                        select_system_3g_format_text = ["720/50p"];
                    }else{
                        select_system_3g_format_value = ["11", "05"];
                        select_system_3g_format_text = ["1080/50p", "1080/50i"];
                    }
                    break;
                case "18":
                    select_system_3g_format_value = ["15"];
                    select_system_3g_format_text = ["1080/25p"];
                    break;
                case "27":
                    select_system_3g_format_value = ["11"];
                    select_system_3g_format_text = ["1080/50p"];//(2nd Frame)
                    break;
                case "11":
                    let fps = cparam_get_fps();
                    if (fps == '3') { // FPS=25 (only change format name)
                        select_system_3g_format_value = ["11", "08"];
                        select_system_3g_format_text = ["1080/50p","1080/25PsF"];
                    } else {
                        select_system_3g_format_value = ["11", "05"];
                        select_system_3g_format_text = ["1080/50p", "1080/50i"];
                    }
                    break;
                // case "05":
                //     select_system_3g_format_value = ["05"];
                //     select_system_3g_format_text = ["1080/50i"];
                //     break;
                case "15":
                    select_system_3g_format_value = ["15"];
                    select_system_3g_format_text = ["1080/25p"];
                    break;
                // case "08":
                //     select_system_3g_format_value = ["08"];
                //     select_system_3g_format_text = ["1080/25PsF"];
                //     break;
                case "02":
                    select_system_3g_format_value = ["02"];
                    select_system_3g_format_text = ["720/50p"];
                    break;
            }
        } else if (nowfreq == 2) {
            switch (sFormat) {
                case "21":
                    select_system_3g_format_value = ["22"];
                    select_system_3g_format_text = ["1080/24p"];
                    break;
                case "22":
                    select_system_3g_format_value = ["22"];
                    select_system_3g_format_text = ["1080/24p"];
                    break;
            }
        } else if (nowfreq == 3) {
            switch (sFormat) {
                case "1B":
                    select_system_3g_format_value = ["23"];
                    select_system_3g_format_text = ['1080/23.98p'];
                    break;
                case "23":
                    select_system_3g_format_value = ["23"];
                    select_system_3g_format_text = ["1080/23.98p"];
                    break;
                // case "0A":
                //     select_system_3g_format_value = ["0A"];
                //     select_system_3g_format_text = ["1080/23.98PsF"];
                //     break;
            }
        } else if (nowfreq == 4) {
            select_system_3g_format_value.push(
                "20"
            );
            select_system_3g_format_text.push(
                '1080/60p'
            );
        }
        targetObject.appendOptions(select_system_3g_format_value, select_system_3g_format_text);
    }
    function refresh3GOutput1Format(targetObject){
        let select_system_3g_format_value = [];
        let select_system_3g_format_text = [];
        if (nowfreq == 0) {
            switch (sFormat) {
                case "19":
                    if(uhdCropRadioDate == 2){
                        select_system_3g_format_value = ["01"];
                        select_system_3g_format_text = ["720/59.94p"];
                    }else{
                        select_system_3g_format_value = ["10", "04"];
                        select_system_3g_format_text = ["1080/59.94p", "1080/59.94i"];
                    }
                    break;
                case "17":
                    select_system_3g_format_value = ["14"];
                    select_system_3g_format_text = ["1080/29.97p"];
                    break;
                case "26":
                    select_system_3g_format_value = ["10"];
                    select_system_3g_format_text = ["1080/59.94p"];//(1st Frame)
                    break;
                case "10":
                    select_system_3g_format_value = ["10", "04"];
                    select_system_3g_format_text = ["1080/59.94p", "1080/59.94i"];
                    break;
                // case "04":
                //     select_system_3g_format_value = ["04"];
                //     select_system_3g_format_text = ["1080/59.94i"];
                //     break;
                case "14":
                    select_system_3g_format_value = ["14"];
                    select_system_3g_format_text = ["1080/29.97p"];
                    break;
                // case "07":
                //     select_system_3g_format_value = ["07"];
                //     select_system_3g_format_text = ["1080/29.97PsF"];
                //     break;
                // case "16":
                //     select_system_3g_format_value = ["16"];
                //     select_system_3g_format_text = ["1080/23.98p(59.94i)"];
                //     break;
                case "01":
                    select_system_3g_format_value = ["01"];
                    select_system_3g_format_text = ["720/59.94p"];
                    break;
            }
        } else if (nowfreq == 1) {
            switch (sFormat) {
                case "1A":
                    if(uhdCropRadioDate == 2){
                        select_system_3g_format_value = ["02"];
                        select_system_3g_format_text = ["720/50p"];
                    }else{
                        select_system_3g_format_value = ["11", "05"];
                        select_system_3g_format_text = ["1080/50p", "1080/50i"];
                    }
                    break;
                case "18":
                    select_system_3g_format_value = ["15"];
                    select_system_3g_format_text = ["1080/25p"];
                    break;
                case "27":
                    select_system_3g_format_value = ["11"];
                    select_system_3g_format_text = ["1080/50p"];//(1st Frame)
                    break;
                case "11":
                    let fps = cparam_get_fps();
                    if (fps == '3') { // FPS=25 (only change format name)
                        select_system_3g_format_value = ["11", "08"];
                        select_system_3g_format_text = ["1080/50p","1080/25PsF"];
                    } else {
                        select_system_3g_format_value = ["11", "05"];
                        select_system_3g_format_text = ["1080/50p", "1080/50i"];
                    }
                    break;
                // case "05":
                //     select_system_3g_format_value = ["05"];
                //     select_system_3g_format_text = ["1080/50i"];
                //     break;
                case "15":
                    select_system_3g_format_value = ["15"];
                    select_system_3g_format_text = ["1080/25p"];
                    break;
                // case "08":
                //     select_system_3g_format_value = ["08"];
                //     select_system_3g_format_text = ["1080/25PsF"];
                //     break;
                case "02":
                    select_system_3g_format_value = ["02"];
                    select_system_3g_format_text = ["720/50p"];
                    break;
            }
        } else if (nowfreq == 2) {
            switch (sFormat) {
                case "21":
                    select_system_3g_format_value = ["22"];
                    select_system_3g_format_text = ["1080/24p"];
                    break;
                case "22":
                    select_system_3g_format_value = ["22"];
                    select_system_3g_format_text = ["1080/24p"];
                    break;
            }
        } else if (nowfreq == 3) {
            switch (sFormat) {
                case "1B":
                    select_system_3g_format_value = ["23"];
                    select_system_3g_format_text = ['1080/23.98p'];
                    break;
                case "23":
                    select_system_3g_format_value = ["23"];
                    select_system_3g_format_text = ["1080/23.98p"];
                    break;
                // case "0A":
                //     select_system_3g_format_value = ["0A"];
                //     select_system_3g_format_text = ["1080/23.98PsF"];
                //     break;
            }
        } else if (nowfreq == 4) {
            select_system_3g_format_value.push(
                "20"
            );
            select_system_3g_format_text.push(
                '1080/60p'
            );
        }
        targetObject.appendOptions(select_system_3g_format_value, select_system_3g_format_text);
    }
    function refresh12GSDISFPFormat(targetObject){
        let select_system_12g_format_value = [];
        let select_system_12g_format_text = [];
        if (nowfreq == 0) {
            switch (sFormat) {
                case "19":
                    if(uhdCropRadioDate == 2){
                        select_system_12g_format_value = ["01","19"];
                        select_system_12g_format_text = ["720/59.94p","2160/59.94p"];
                    }
                    // else if(uhdCropRadioDate == 1){
                    //     select_system_12g_format_value = ["10"];
                    //     select_system_12g_format_text = ["1080/59.94p"];
                    // }
                    else{
                        select_system_12g_format_value = ["10","19"];
                        select_system_12g_format_text = ["1080/59.94p","2160/59.94p"];
                    }

                    break;
                case "17":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_12g_format_value = ["14"];
                    //     select_system_12g_format_text = ["1080/29.97p"];
                    // }else{
                        select_system_12g_format_value = ["14","17"];
                        select_system_12g_format_text = ["1080/29.97p","2160/29.97p"];
                    // }
                    break;
                case "26":
                    select_system_12g_format_value = ["10"];
                    select_system_12g_format_text = ["1080/59.94p"];
                    break;
                case "10":
                    select_system_12g_format_value = ["10","04"];
                    select_system_12g_format_text = ["1080/59.94p","1080/59.94i"];
                    break;
                // case "04":
                //     select_system_12g_format_value = ["04"];
                //     select_system_12g_format_text = ["1080/59.94i"];
                //     break;
                case "14":
                    select_system_12g_format_value = ["14"];
                    select_system_12g_format_text = ["1080/29.97p"];
                    break;
                // case "07":
                //     select_system_12g_format_value = ["07"];
                //     select_system_12g_format_text = ["1080/29.97PsF"];
                //     break;
                // case "16":
                //     select_system_12g_format_value = ["16"];
                //     select_system_12g_format_text = ["1080/23.98p(59.94i)"];
                //     break;
                case "01":
                    select_system_12g_format_value = ["01"];
                    select_system_12g_format_text = ["720/59.94p"];
                    break;
            }
        } else if (nowfreq == 1) {
            switch (sFormat) {
                case "1A":

                    if(uhdCropRadioDate == 2){
                        select_system_12g_format_value = ["02","1A"];
                        select_system_12g_format_text = ["720/50p","2160/50p"];
                    }
                    // else if(uhdCropRadioDate == 1){
                    //     select_system_12g_format_value = ["11"];
                    //     select_system_12g_format_text = ["1080/50p"];
                    // }
                    else{
                        select_system_12g_format_value = ["11","1A"];
                        select_system_12g_format_text = ["1080/50p","2160/50p"];
                    }
                    break;
                case "18":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_12g_format_value = ["15"];
                    //     select_system_12g_format_text = ["1080/25p"];
                    // }else{
                        select_system_12g_format_value = ["15","18"];
                    select_system_12g_format_text = ["1080/25p", "2160/25p"];
                    // }
                    break;
                case "27":
                    select_system_12g_format_value = ["11"];
                    select_system_12g_format_text = ["1080/50p"];
                    break;
                case "11":
                    let fps = cparam_get_fps();
                    if (fps == '3') { // FPS=25 (only change format name)
                        select_system_12g_format_value = ["11","08"];
                        select_system_12g_format_text = ["1080/50p","1080/25PsF"];
                    } else {
                        select_system_12g_format_value = ["11","05"];
                        select_system_12g_format_text = ["1080/50p","1080/50i"];
                    }
                    break;
                // case "05":
                //     select_system_12g_format_value = ["05"];
                //     select_system_12g_format_text = ["1080/50i"];
                //     break;
                case "15":
                    select_system_12g_format_value = ["15"];
                    select_system_12g_format_text = ["1080/25p"];
                    break;
                // case "08":
                //     select_system_12g_format_value = ["08"];
                //     select_system_12g_format_text = ["1080/25PsF"];
                //     break;
                case "02":
                    select_system_12g_format_value = ["02"];
                    select_system_12g_format_text = ["720/50p"];
                    break;
            }
        } else if (nowfreq == 2) {
            switch (sFormat) {
                case "21":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_12g_format_value = ["22"];
                    //     select_system_12g_format_text = ["1080/24p"];
                    // }else{
                        select_system_12g_format_value = ["21","22"];
                        select_system_12g_format_text = ['2160/24p',"1080/24p"];
                    // }
                    break;
                case "22":
                    select_system_12g_format_value = ["22"];
                    select_system_12g_format_text = ["1080/24p"];
                    break;
            }
        } else if (nowfreq == 3) {
            switch (sFormat) {
                case "1B":
                    // if(uhdCropRadioDate == 1){
                    //     select_system_12g_format_value = ["23"];
                    //     select_system_12g_format_text = ["1080/23.98p"];
                    // }else{
                        select_system_12g_format_value = ["1B","23"];
                        select_system_12g_format_text = ['2160/23.98p',"1080/23.98p"];
                    // }
                    break;
                case "23":
                    select_system_12g_format_value = ["23"];
                    select_system_12g_format_text = ["1080/23.98p"];
                    break;
                // case "0A":
                //     select_system_12g_format_value = ["0A"];
                //     select_system_12g_format_text = ["1080/23.98PsF"];
                //     break;
            }
        } else if (nowfreq == 4) {
            switch(sFormat){
                case "20":
                    select_system_12g_format_value = ["20"];
                    select_system_12g_format_text = ['1080/60p'];
                    break;
                case "1F":
                    select_system_12g_format_value = ["1F","20"];
                    select_system_12g_format_text = ['2160/60p','1080/60p'];
                    break;
            }
        }
        targetObject.appendOptions(select_system_12g_format_value, select_system_12g_format_text);
    }

    function destroyMyScroll(){
        if(myScroll!=null){
            myScroll.destroy();
            myScroll = null;
        }
    }
    function buildMyScroll(){
        if(buildScrollSuccessFlg) {
            buildScrollSuccessFlg = false;
            setTimeout(function () {
                myScroll = new IScroll('#setup_signal_output_scroll_div', {
                    preventDefault: false,
                    click: false,
                    tap: true,
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: false,
                    useTransform: false
                });
                buildScrollSuccessFlg = true;
            }, 300)
        }
    }

    function GetFreqMode()
    {
        return cparam_get_frequency();
    }
    function getSignalsStaus(){
        const url = "/cgi-bin/get_Signals_info";
        const obj = {};
        let ret = cparam_sendRequest(url);
        obj.mode = "";
        obj.url = "";
        obj.id = "";
        obj.pass = "";

        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("mode=") == 0) obj.mode = ret[i].substring("mode=".length);
                else if (ret[i].indexOf("url=") == 0) obj.url = ret[i].substring("url=".length);
                else if (ret[i].indexOf("id=") == 0) obj.id = ret[i].substring("id=".length);
                else if (ret[i].indexOf("pass=") == 0) obj.pass = ret[i].substring("pass=".length);
            }

            delete ret;
        }
        return obj;
    }

    /**
     * 画面再構築処理
     */
    function rebuild() {
        // const Signals = getSignalsStaus();
        // // modeRadioButtonGroup.setSelectedValue(Signals.mode);
        // txtSignalsInputObject[INPUT_Signals_CLOUD_URL].set(Signals.url);
        // txtSignalsInputObject[INPUT_Signals_USER_ID].set(Signals.id);
        // txtSignalsInputObject[INPUT_Signals_PASSWORD].set(Signals.pass);
        nowfreq = GetFreqMode();
        sFormat = cparam_get_format();
        uhdCropRadioDate = cparam_get_UHDCrop();
        refresh12GSDISFPFormat(selectObject[TXT_12G_FORMAT_SELECT]);
        refresh3GOutput1Format(selectObject[TXT_3G_OUT1_FORMAT_SELECT]);
        refresh3GOutput2Format(selectObject[TXT_3G_OUT2_FORMAT_SELECT]);
        refreshHDMIFormat(selectObject[TXT_HDMI_FORMAT_SELECT]);
        initData();       
        destroyMyScroll();
        buildMyScroll();
    }

    function callbackMode(){

    }
    function getNDIHXSettingData() {
        const data = {};
        data['mode'] = modeRadioButtonGroup.getSelectedValue();
        data['url'] = txtSignalsInputObject[INPUT_Signals_CLOUD_URL].get();
        data['id'] = txtSignalsInputObject[INPUT_Signals_USER_ID].get();
        data['pass'] = txtSignalsInputObject[INPUT_Signals_PASSWORD].get();
        return data;
    }
    function callbackSignalsSetButton(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            if(txtSignalsInputObject[INPUT_Signals_PASSWORD].get().length<8){
                jAlert(MSG_STATUS.mID_0095, NPTZ_WORDING.wID_0039);
                return;
            }
            $("#dialog_setup").show();
            $.ajax({
                type: "get",
                url: '/cgi-bin/set_Signals_info',
                data: getNDIHXSettingData(),
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
        }
    }

    return {
        build: buildSignals,
        rebuild: rebuild,
        destroyMyScroll:destroyMyScroll,
        buildMyScroll:buildMyScroll
    };
}

function signals_return() {
    /**
     * 構築フラグ
     * @type boolean
     */
    let buildFlag_Signals = false;

    let returnInputObject = [];

    /**
     * label定義
     * @type number
     */
    const TXT_RETURN1_ID = 0;
    const BTN_SET = 0;

    let txtSignalsObject = [];
    let btnObject = [];

    /**
     * Audio画面構築処理
     */
    function buildSignals() {
        if (!buildFlag_Signals) {
            buildFlag_Signals = true;
            //  mode
            txtSignalsObject[TXT_RETURN1_ID] = TextCtrl('setup_return_labels', 'txt_return1_id', NPTZ_WORDING.wID_0639);
            returnInputObject[TXT_RETURN1_ID] = InputCtrl('setup_return_main', 'return', 'return', 'setup_signal_return_id1_input',  '', null, '', '', '',5);

            btnObject[BTN_SET] = ButtonCtrl("setup_return_main", 'btn_return_set', NPTZ_WORDING.wID_0141, callbackSet);
 
            $('#setup_return_main').append($('<div class="systemDivInnerLine0"></div>'));
            $('#setup_return_main').append($('<div class="systemDivInnerLine1"></div>'));

            for (let text in txtSignalsObject) {
                txtSignalsObject[text].show();
            }
            for (let text in returnInputObject) {
                returnInputObject[text].show();
            }
            for (let btn in btnObject) {
                btnObject[btn].show();
                btnObject[btn].displayOff();
            }

            getSignalsReturn1Id();

            returnInputObject[TXT_RETURN1_ID].getInputObject().keyup(function (e) {
                var inputStr = returnInputObject[TXT_RETURN1_ID].get();
                var repVal = inputStr.replace(/[^a-zA-Z0-9 \!\#\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\[\]\_\~\$\@\|]/g,'');

                if (inputStr.length > repVal.length || inputStr == '') {
                    returnInputObject[TXT_RETURN1_ID].val(repVal);
                }
            });
        } else {
            rebuild();
        }
    }

    function callbackSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            var idStr = returnInputObject[TXT_RETURN1_ID].get();
            cparam_set_return1Id(Platform.a2hex(idStr));
        }
    }

    function getSignalsReturn1Id() {
        var id = cparam_get_return1Id();
        var idStrArray = id.split(':');

        var str = '';
        if (idStrArray.length > 1) {
            var idStr = idStrArray[2];
            str = Platform.hex2a(idStr);
        }

        returnInputObject[TXT_RETURN1_ID].val(str);
    }

    /**
     * 画面再構築処理
     */
    function rebuild() {
        getSignalsReturn1Id();
    }

    return {
        build: buildSignals,
        rebuild: rebuild
    };
}

function signals_ip_signal() {
    /**
     * 構築フラグ
     * @type boolean
     */
    let buildFlag_Signals = false;

    /**
     * label定義
     * @type number
     */
    const TXT_SIGNALS_NDI = 0;
    const TXT_SIGNALS_NDI_FORMAT = 1;
    //const TXT_SIGNALS_NDI_OUTPUT_ITEM = 2;
    //const TXT_SIGNALS_NDI_CHAR = 3;
    const TXT_SIGNALS_IP_CHAR = 5;
    const TXT_SIGNALS_IP_OUTPUT_ITEM = 4;
    const TXT_SIGNALS_IP_H264_H265 = 6;
    // const TXT_SIGNALS_ST_2110 = 7;
    // const TXT_SIGNALS_ST_2110_MOIP_MODE = 8;
    // const TXT_SIGNALS_ST_2110_MAIN_VIDEO_TX = 9;
    // const TXT_SIGNALS_ST_2110_MAIN_VIDEO_TX_FORMAT = 10;
    // const TXT_SIGNALS_ST_2110_MAIN_VIDEO_TX_FORMAT_VALUE = 11;
    // const TXT_SIGNALS_ST_2110_CORP_VIDEO_TX = 12;
    const TXT_SIGNALS_NDI_FORMAT_VALUE = 13;
    // const TXT_SIGNALS_ST_2110_CORP_VIDEO_TX_FORMAT = 14;
    // const TXT_SIGNALS_ST_2110_CORP_VIDEO_TX_FORMAT_VALUE = 15;

    //const INPUT_SIGNALS_NDI_FORMAT = 0;
    //const INPUT_SIGNALS_NDI_OUTPUT_ITEM = 1;
    //const INPUT_SIGNALS_NDI_CHAR = 2;
    const INPUT_SIGNALS_IP_OUTPUT_ITEM = 3;
    const INPUT_SIGNALS_IP_CHAR = 4;
    // const INPUT_SIGNALS_ST_2110_MOIP_MODE = 5;

    // const INPUT_Signals_CLOUD_URL = 0;
    // const INPUT_Signals_USER_ID = 1
    // const INPUT_Signals_PASSWORD = 2;
    let txtSignalsObject = [];
    let txtSignalsInputObject = [];

    let modeRadioButtonGroup = [];
    let Signals_set_button;
    let select_system_format_value = [];
    let select_system_format_text = [];

    /**
     * Audio画面構築処理
     */
    function buildSignals() {
        if (!buildFlag_Signals) {
            buildFlag_Signals = true;

            txtSignalsObject[TXT_SIGNALS_NDI] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ndi', NPTZ_WORDING.wID_0489);
            txtSignalsObject[TXT_SIGNALS_NDI_FORMAT] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ndi_format', NPTZ_WORDING.wID_0649);
            txtSignalsObject[TXT_SIGNALS_NDI_FORMAT_VALUE] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ndi_format_value', '2160/59.94p');
            //txtSignalsObject[TXT_SIGNALS_NDI_OUTPUT_ITEM] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ndi_output_item', NPTZ_WORDING.wID_0632);
            //txtSignalsObject[TXT_SIGNALS_NDI_CHAR] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ndi_char', NPTZ_WORDING.wID_0636);
            txtSignalsObject[TXT_SIGNALS_IP_OUTPUT_ITEM] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ip_output_item', NPTZ_WORDING.wID_0632);
            txtSignalsObject[TXT_SIGNALS_IP_CHAR] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ip_char', NPTZ_WORDING.wID_0636);
            txtSignalsObject[TXT_SIGNALS_IP_H264_H265] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_ip_h264_h265', NPTZ_WORDING.wID_0645);
            // txtSignalsObject[TXT_SIGNALS_ST_2110] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110', NPTZ_WORDING.wID_0646);
            // txtSignalsObject[TXT_SIGNALS_ST_2110_MOIP_MODE] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_moip_mode', NPTZ_WORDING.wID_0647);
            // txtSignalsObject[TXT_SIGNALS_ST_2110_MAIN_VIDEO_TX] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_main_video_tx', NPTZ_WORDING.wID_0648);
            // txtSignalsObject[TXT_SIGNALS_ST_2110_MAIN_VIDEO_TX_FORMAT] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_main_video_tx_format', NPTZ_WORDING.wID_0649);
            // txtSignalsObject[TXT_SIGNALS_ST_2110_MAIN_VIDEO_TX_FORMAT_VALUE] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_main_video_tx_format_value', '2160/59.94p');
            // txtSignalsObject[TXT_SIGNALS_ST_2110_CORP_VIDEO_TX] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_corp_video_tx', NPTZ_WORDING.wID_0650);
            // txtSignalsObject[TXT_SIGNALS_ST_2110_CORP_VIDEO_TX_FORMAT] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_corp_video_tx_format', NPTZ_WORDING.wID_0649);
            // txtSignalsObject[TXT_SIGNALS_ST_2110_CORP_VIDEO_TX_FORMAT_VALUE] = TextCtrl('setup_ip_signal_labels', 'txt_Signals_st_2110_corp_video_tx_format_value', '2160/59.94p');
 
            //modeRadioButtonGroup[INPUT_SIGNALS_NDI_OUTPUT_ITEM] = RadioButtonGroupCtrl("setup_ip_signal_main", "setup_ip_signals_ndi_output_item", RADIO_GROUP.rID_0074, '0', callbackSetSignalsNdiOutputItemSelect);
            //modeRadioButtonGroup[INPUT_SIGNALS_NDI_CHAR] = RadioButtonGroupCtrl("setup_ip_signal_main", "setting_ip_signals_ndi_char_select", RADIO_GROUP.rID_0001, '0', callbackSetSignalsNdiCharSelect);
            modeRadioButtonGroup[INPUT_SIGNALS_IP_OUTPUT_ITEM] = RadioButtonGroupCtrl("setup_ip_signal_main", "setup_ip_signals_ip_item", RADIO_GROUP.rID_0074, '0', callbackSetSignalsIpOutputItemSelect);
            modeRadioButtonGroup[INPUT_SIGNALS_IP_CHAR] = RadioButtonGroupCtrl("setup_ip_signal_main", "setting_ip_signals_ip_char_select", RADIO_GROUP.rID_0001, '0', callbackSetSignalIpCharSelect);
            // modeRadioButtonGroup[INPUT_SIGNALS_ST_2110_MOIP_MODE] = RadioButtonGroupCtrl("setup_ip_signal_main", "setting_ip_signals_st_2110_moip_mode_select", RADIO_GROUP.rID_0001, '0', callbackChar);

 
            for (let text in txtSignalsObject) {
                txtSignalsObject[text].show();
            }
            for (let text in txtSignalsInputObject) {
                txtSignalsInputObject[text].show();
                txtSignalsInputObject[text].displayOff();
            }
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine0 systemDivInnerLine_signals_ip_singal_0"></div>'));
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine1 systemDivInnerLine_signals_ip_singal_1"></div>'));
            //$('#setup_ip_signal_main').append($('<div class="systemDivInnerLine2 systemDivInnerLine_signals_ip_singal_2"></div>'));
            //$('#setup_ip_signal_main').append($('<div class="systemDivInnerLine3 systemDivInnerLine_signals_ip_singal_3"></div>'));
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine4 systemDivInnerLine_signals_ip_singal_4"></div>'));
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine5 systemDivInnerLine_signals_ip_singal_5"></div>'));
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine6 systemDivInnerLine_signals_ip_singal_6"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine7 systemDivInnerLine_signals_ip_singal_7"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine8 systemDivInnerLine_signals_ip_singal_8"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine9 systemDivInnerLine_signals_ip_singal_9"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine10 systemDivInnerLine_signals_ip_singal_10"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine11 systemDivInnerLine_signals_ip_singal_11"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine12 systemDivInnerLine_signals_ip_singal_12"></div>'));
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine2_ver_ndi vertical_line_common"></div>'));
            $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine2_ver_h264 vertical_line_common"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine2_ver_main_video vertical_line_common"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine2_ver_main_video_tx vertical_line_common"></div>'));
            // $('#setup_ip_signal_main').append($('<div class="systemDivInnerLine2_ver_crop_video_tx vertical_line_common"></div>'));

            buildHDMIFormat();
            InitThisPage();
        } else {
            rebuild();
        }
    }

    function callbackSetSignalsNdiOutputItemSelect(){
        //cparam_set_ip_signal_output_item( modeRadioButtonGroup[INPUT_SIGNALS_NDI_OUTPUT_ITEM].getSelectedValue());
    }

    function callbackSetSignalsNdiCharSelect(){
        // var setValue = modeRadioButtonGroup[INPUT_SIGNALS_NDI_CHAR].getSelectedValue() == "1" ? "10" : "00"
        // cparam_set_isignal_ndi_char_item( setValue);
    }

    function callbackSetSignalsIpOutputItemSelect(){
        cparam_set_ip_signal_h264_output_item( modeRadioButtonGroup[INPUT_SIGNALS_IP_OUTPUT_ITEM].getSelectedValue());
    }

    function callbackSetSignalIpCharSelect(){
        var setValue = modeRadioButtonGroup[INPUT_SIGNALS_IP_CHAR].getSelectedValue();
        cparam_set_isignal_ip_char_item( setValue);
    }

    function InitThisPage() {
        var formatStr = cparam_get_ip_signal_ndi_format();
        let index = 0;
        for (let key in select_system_format_value) {
            if(select_system_format_value[key] == formatStr) {
                txtSignalsObject[TXT_SIGNALS_NDI_FORMAT_VALUE].set(select_system_format_text[index]);
            }
            index = index + 1;
        }
        
        //modeRadioButtonGroup[INPUT_SIGNALS_NDI_OUTPUT_ITEM].setSelectedValue(cparam_get_ip_signal_output_item());
        //modeRadioButtonGroup[INPUT_SIGNALS_NDI_CHAR].setSelectedValue(cparam_get_ip_signal_ndi_char_item());
        modeRadioButtonGroup[INPUT_SIGNALS_IP_OUTPUT_ITEM].setSelectedValue(cparam_get_ip_signal_h264_output_item());
        modeRadioButtonGroup[INPUT_SIGNALS_IP_CHAR].setSelectedValue(cparam_get_ip_signal_ip_char_item());
    }

    /**
     * 画面再構築処理
     */
    function rebuild() {
        InitThisPage();
    }

    function buildMyScroll(){
        if(buildScrollSuccessFlg) {
            buildScrollSuccessFlg = false;
            setTimeout(function () {
                myScroll = new IScroll('#setup_signal_output_scroll_div', {
                    preventDefault: false,
                    click: false,
                    tap: true,
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: false,
                    useTransform: false
                });
                buildScrollSuccessFlg = true;
            }, 300)
        }
    }

    function buildHDMIFormat() {
        select_system_format_value.push(
            "19",
            "17",
            "26",
            "10",
            "04",
            "14",
            "01"
        );
        select_system_format_text.push(
            '2160/59.94p',
            '2160/29.97p',
            '1080/119.88p',
            '1080/59.94p',
            '1080/59.94i',
            '1080/29.97p',
            '720/59.94p'
        );

        select_system_format_value.push(
            "1A",
            "18",
            "27",
            "11",
            "05",
            "15",
            "02"
        );
        select_system_format_text.push(
            '2160/50p',
            '2160/25p',
            '1080/100p',
            '1080/50p',
            '1080/50i',
            '1080/25p',
            '720/50p'
        );

        select_system_format_value.push(
            "21",
            "22"
        );
        select_system_format_text.push(
            '2160/24p',
            '1080/24p'
        );

        select_system_format_value.push(
            "1B",
            "23"
        );
        select_system_format_text.push(
            '2160/23.98p',
            '1080/23.98p'
        );

        select_system_format_value.push(
            "20",
            "1F"
        );
        select_system_format_text.push(
            '1080/60p',
            '2160/60p'
        );
    }

    return {
        build: buildSignals,
        rebuild: rebuild
    };
}
