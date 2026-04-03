/**
 * @fileOverview Setup画面:usermng制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var settingNetworkAdvanced = SettingNetworkAdvanced();
var f = document.all;

/**
 * setup画面:Network制御に関わる画面クラス
 * @class Settings画面:Network制御に関わる画面クラス
 * @return {function} build 構築処理
 * @constructor
 */

function SettingNetworkAdvanced() {
     /*********************************************************Advanced*********************************************************/
    /**
     * 構築フラグ
     * @type boolean
     */
    let buildAdvancedFlag = false;
    /**
     * button[]
     * @type btnAdvancedObject[]
     */
    let btnAdvancedObject = [];
    /**
     * Advanced menu button : Setting status
     */
    const SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON = 0;
    /**
     * Advanced menu button : NTP
     */
    const SETUP_ADVANCED_MENU_NTP_BUTTON = 1;
    /**
     * Advanced menu button : UPnP
     */
    const SETUP_ADVANCED_MENU_UPNP_BUTTON = 2;
    /**
     * Advanced menu button : HTTPS
     */
    const SETUP_ADVANCED_MENU_HTTPS_BUTTON = 3;
    /**
     * Advanced menu button : RTSP
     */
    const SETUP_ADVANCED_MENU_RTSP_BUTTON = 4;
    /**
     * Advanced NTP button : Set
     */
    const SETUP_ADVANCED_NTP_SET_BUTTON = 5;
    /**
     * Advanced UPnP button : Set
     */
    const SETUP_ADVANCED_UPNP_SET_BUTTON = 6;
    /**
     * Advanced HTTPS button : CRT key generate
     */
    const SETUP_ADVANCED_HTTPS_CRT_KEY_EXECUTE_BUTTON = 7;
    /**
     * Advanced HTTPS button : Self-signed Certificate - GENERATE
     */
    const SETUP_ADVANCED_HTTPS_GENERATE_EXECUTE_BUTTON = 8;
    /**
     * Advanced HTTPS button : Self-signed Certificate - Information (Confirm)
     */
    const SETUP_ADVANCED_HTTPS_INFORMATION_CONFIRM_BUTTON = 9;
    /**
     * Advanced HTTPS button : Self-signed Certificate - Information (Delete)
     */
    const SETUP_ADVANCED_HTTPS_INFORMATION_DELETE_BUTTON = 10;
    /**
     * Advanced HTTPS button : Generate Certificate Signing Request
     */
    const SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_EXECUTE_BUTTON = 11;
    /**
     * Advanced HTTPS button : CA Certificate install
     */
    const SETUP_ADVANCED_HTTPS_INSTALL_EXECUTE_BUTTON = 12;
    /**
     * Advanced HTTPS button : CA Certificate - Information (Confirm)
     */
    const SETUP_ADVANCED_HTTPS_INFORMATION2_CONFIRM_BUTTON = 13;
    /**
     * Advanced HTTPS button : CA Certificate - Information (Delete)
     */
    const SETUP_ADVANCED_HTTPS_INFORMATION2_DELETE_BUTTON = 14;
    /**
     * Advanced HTTPS button : Set
     */
    const SETUP_ADVANCED_HTTPS_SET_BUTTON = 15;
    /**
     * Advanced HTTPS button : Select
     */
    const SETUP_ADVANCED_HTTPS_INSTALL_SELECT_BUTTON = 16;
    /**
     * Advanced RTSP button : Set
     */
    const SETUP_ADVANCED_RTSP_SET_BUTTON = 17;

    const SETUP_ADVANCED_MENU_RTSP_BUTTON_show = 18;

    const SETUP_ADVANCED_MENU_SNMP_BUTTON_show = 19;
    const SETUP_ADVANCED_SNAP_SET_BUTTON = 20;
    const SETUP_ADVANCED_MENU_TSL_BUTTON_show = 21;
    const SETUP_ADVANCED_MENU_REFERER_BUTTON_show = 22;
    const SETUP_ADVANCED_TSL_SET_BUTTON = 23;
    const SETUP_ADVANCED_MENU_M_DNS = 24;
    const SETUP_ADVANCED_MDNS_SET_BUTTON = 25;
    const SETUP_ADVANCED_MENU_802_1_X = 26;
    const SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT = 27;
    const SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE = 28;
    const SETUP_ADVANCED_MENU_802_1_X_CA_SELECT = 29;
    const SETUP_ADVANCED_MENU_802_1_X_CA_EXECUTE = 30;
    const SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM = 31;
    const SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE = 32;
    const SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_CONFIRM = 33;
    const SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_DELETE = 34;
    const SETUP_ADVANCED_802_SET_BUTTON = 35;
    const SETUP_ADVANCED_MENU_EASYIP = 36;
    const SETUP_ADVANCED_EASYIP_SET_BUTTON = 37;
    /**
     * labelオブジェクト
     * @type txtAdvancedObject[]
     */
    let txtAdvancedObject = [];
    /**
     * label定義(NTP) : Symchronization with NTP
     * @type number
     */
    const SETUP_ADVANCED_NTP_SYMCHRONIZATION_LABEL = 0;
    /**
     * label定義(NTP) : NTP server address setting
     * @type number
     */
    const SETUP_ADVANCED_NTP_ADDRESS_SETTING_LABEL = 1;
    /**
     * label定義(NTP) : NTP server address
     * @type number
     */
    const SETUP_ADVANCED_NTP_ADDRESS_TXT_LABEL = 2;
    /**
     * label定義(NTP) : NTP port
     * @type number
     */
    const SETUP_ADVANCED_NTP_PORT_LABEL = 3;
    /**
     * label定義(NTP) : Time adjustment interval
     * @type number
     */
    const SETUP_ADVANCED_NTP_INTERVAL_LABEL = 4;
    /**
     * label定義(NTP) : NTP port tips (1-65535)
     * @type number
     */
    const SETUP_ADVANCED_NTP_PORT_AREA_LABEL = 5;
    /**
     * label定義(UPnP) : Auto port forwarding
     * @type number
     */
    const SETUP_ADVANCED_UPNP_AUTO_PORT_LABEL = 6;
    /**
     * label定義(HTTPS) : CRT key generate
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_CRT_KEY_LABEL = 7;
    /**
     * label定義(HTTPS) : Self-signed Certificate
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_SELF_SIGNED_LABEL = 8;
    /**
     * label定義(HTTPS) : Generate
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_GENERATE_LABEL = 9;
    /**
     * label定義(HTTPS) : Self-signed Certificate - Information
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_INFORMATION_LABEL = 10;
    /**
     * label定義(HTTPS) : CA Certificate
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_CERTIFICATE_LABEL = 11;
    /**
     * label定義(HTTPS) : Generate Certificate Signing Request
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_LABEL = 12;
    /**
     * label定義(HTTPS) : CA Certificate install
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_INSTALL_LABEL = 13;
    /**
     * label定義(HTTPS) : CA Certificate - Information
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_INFORMATION2_LABEL = 14;
    /**
     * label定義(HTTPS) : Connection
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_CONNECTION_LABEL = 15;
    /**
     * label定義(HTTPS) : HTTPS port
     * @type number
     */
    const SETUP_ADVANCED_HTTPS_PORT_LABEL = 16;
    /**
     * input定義(HTTPS) : (1-65535)
     */
    const SETUP_ADVANCED_HTTPS_PORT_TIPS_LABEL = 17;
    /**
     * input定義(HTTPS) : Not generated
     */
    const SETUP_ADVANCED_HTTPS_NOT_GENERATED_LABEL = 18;
    /**
     * input定義(HTTPS) : Invalid
     */
    const SETUP_ADVANCED_HTTPS_INVALID_LABEL = 19;
    /**
     * input定義(RTSP) : RTSP port
     */
    const SETUP_ADVANCED_RTSP_PORT_LABEL = 20;
    /**
     * input定義(RTSP) : RTSP request URL H.264(1)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL1_LABEL = 21;
    /**
     * input定義(RTSP) : RTSP request URL H.264(2)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL2_LABEL = 22;
    /**
     * input定義(RTSP) : RTSP request URL H.264(3)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL3_LABEL = 23;
    /**
     * input定義(RTSP) : RTSP request URL H.264(4)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL4_LABEL = 24;
    /**
     * input定義(RTSP) : (1-65535)
     */
    const SETUP_ADVANCED_RTSP_PORT_TIPS_LABEL = 25;
    /**
     * input定義(RTSP) : RTSP request URL H.265(1)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL5_LABEL = 26;
    /**
     * input定義(RTSP) : RTSP request URL H.265(1)
     */
    const SETUP_ADVANCED_HTTP_TLS_LABEL = 27;
    /**
     * input定義(RTSP) : RTSP request URL H.265(1)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL6_LABEL = 28;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_SNMP_LABEL = 29;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_SNMP_VERSION_LABEL = 30;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_USER_NAME_LABEL = 31;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_AUTHENTICATION_LABEL = 32;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_ENCRYPTION_METHOD_LABEL = 33;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_PASSWORD_LABEL = 34;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_SYSTEM_NAME_LABEL = 35;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_LOCATION_LABEL = 36;
    /**
     * SNMP
     */
    const SETUP_ADVANCED_CONTACT_LABEL = 37;
    /**
     * TSL
     */
    const SETUP_ADVANCED_TSL_INDEX_NUMBER_LABEL = 38;
    /**
     * TSL
     */
    const SETUP_ADVANCED_TSL_PORT_LABEL = 39;
    /**
     * referer
     */
    const SETUP_ADVANCED_REFERER_LABEL = 40;
    /**
     * referer
     */
    const SETUP_ADVANCED_SNMP_VERSION = 41;
    /**
     * referer
     */
    const TXT_ADVANCED_TSL_INDEX = 42;
    /**
     * referer
     */
    const TXT_ADVANCED_TSL_PORT = 43;
    /**
     * mDNS
     */
    const TXT_ADVANCED_M_DNS = 44;
    /**
     * 802_1X
     */
    const TXT_ADVANCED_802_1X = 45;
    /**
     * 802_1X
     */
    const TXT_ADVANCED_EAP= 46;
    /**
     * TLS
     */
    const TXT_ADVANCED_TLS= 47;
    /**
     * TLS
     */
    const TXT_ADVANCED_P_K_P_U= 48;
    /**
     * TLS
     */
    const TXT_ADVANCED_CLIENT_C_TYPE= 49;
    /**
     * TLS
     */
    const TXT_ADVANCED_P_K_PASSWORD= 50;
    /**
     * TLS
     */
    const TXT_ADVANCED_CLIENT_C_INSTALL= 51;
    /**
     * TLS
     */
    const TXT_ADVANCED_INFORMATION= 52;
    /**
     * PEAP
     */
    const TXT_ADVANCED_PEAP = 53;
    /**
     * PEAP
     */
    const TXT_ADVANCED_PEAP_USER= 54;
    /**
     * PEAP
     */
    const TXT_ADVANCED_PEAP_PASSWORD= 55;
    /**
     * PEAP
     */
    const TXT_ADVANCED_CA_C_INSTALL= 56;
    /**
     * PEAP
     */
    const TXT_ADVANCED_CA_INFORMATION= 57;
    /**
     * PEAP
     */
    const TXT_ADVANCED_EASYIP_PLAIN= 58;
    /**
     * PEAP
     */
    const TXT_ADVANCED_8021x_TLS_USER_NAME =  59;
    /**
     * radio group
     * @type radioAdvancedButtonGroup[]
     */
    let radioAdvancedButtonGroup = [];
    /**
     * radio定義(NTP) : Symchronization with NTP
     */
    const SETUP_ADVANCED_NTP_SYMCHRONIZATION = 0;
    /**
     * radio定義(UPnP) : Auto port forwarding
     */
    const SETUP_ADVANCED_UPNP_AUTO_PORT = 1;
    /**
     * radio定義(SNMP) : SETUP_ADVANCED_SNMP
     */
    const SETUP_ADVANCED_SNMP = 2;
    /**
     * radio定義(SNMP) : SETUP_ADVANCED_AUTHENTICTION
     */
    const SETUP_ADVANCED_AUTHENTICTION = 3;
    /**
     * radio定義(SNMP) : SETUP_ADVANCED_AUTHENTICTION
     */
    const SETUP_ADVANCED_ENCRYPTION_METHOD = 4;
    /**
     * radio定義(SNMP) : SETUP_ADVANCED_REFERER
     */
    const SETUP_ADVANCED_REFERER = 5;
    /**
     * radio定義(SNMP) : 802.1X
     */
    const SETUP_ADVANCED_802_1X = 6;
    /**
     * radio定義(SNMP) : 802.1X
     */
    const SETUP_ADVANCED_EAP = 7;
    /**
     * radio定義(SNMP) : 802.1X
     */
    const SETUP_ADVANCED_CLIENT_TYPE = 8;
    /**
     * radio定義(SNMP) : 802.1X
     */
    const SETUP_ADVANCED_PRIVATE_KEY_USAGE = 9;
    /**
     * radio定義(SNMP) : Plain text usage
     */
    const SETUP_ADVANCED_PLAIN_TEXT_USAGE= 10;
    /**
     * input[] : text
     * @type inputAdvancedObject[]
     */
    let inputAdvancedObject = [];
    /**
     * input[] : text
     * @type inputAdvancedObject[]
     */
    let inputAdvanced802Object = [];
    /**
     * input定義(NTP) : NTP server address
     */
    const SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT = 0;
    /**
     * input定義(NTP) : NTP port
     */
    const SETUP_ADVANCED_NTP_PORT_INPUT = 1;
    /**
     * input定義(HTTPS) : CA Certificate install
     */
    var SETUP_ADVANCED_HTTPS_INSTALL_INPUT = 2;
    /**
     * input定義(HTTPS) : HTTPS port
     */
    const SETUP_ADVANCED_HTTPS_PORT_INPUT = 3;
    /**
     * input定義(RTSP) : RTSP port
     */
    const SETUP_ADVANCED_RTSP_PORT_INPUT = 4;
    /**
     * input定義(RTSP) : RTSP request URL H.264(1)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL1_INPUT = 5;
    /**
     * input定義(RTSP) : RTSP request URL H.264(2)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL2_INPUT = 6;
    /**
     * input定義(RTSP) : RTSP request URL H.264(3)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL3_INPUT = 7;
    /**
     * input定義(RTSP) : RTSP request URL H.264(4)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL4_INPUT = 8;
    /**
     * input定義(RTSP) : RTSP request URL H.265(1)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL5_INPUT = 9;
    /**
     * input定義(RTSP) : RTSP request URL H.265(1)
     */
    const SETUP_ADVANCED_RTSP_REQUEST_URL6_INPUT = 10;
    /**
     * input定義(SNMP)
     */
    const SETUP_ADVANCED_SNMP_USER_NAME_INPUT = 11;
    /**
     * input定義(SNMP)
     */
    const SETUP_ADVANCED_SNMP_PASSWORD_INPUT = 12;
    /**
     * input定義(SNMP)
     */
    const SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT = 13;
    /**
     * input定義(SNMP)
     */
    const SETUP_ADVANCED_SNMP_LOCATION_INPUT = 14;
    /**
     * input定義(SNMP)
     */
    const SETUP_ADVANCED_SNMP_CONTACT_INPUT = 15;
    /**
     * input定義(TSL)
     */
    const SETUP_ADVANCED_TSL_INDEX_INPUT = 16;
    /**
     * input定義(TSL)
     */
    const SETUP_ADVANCED_TSL_PORT_INPUT = 17;
    /**
     * input定義(TSL)
     */
    const SETUP_ADVANCED_M_DNS_INPUT = 18;
    /**
     * input定義(802.1x)
     */
    const SETUP_ADVANCED_PRIVATE_KEY_PASSWORD= 1;
    /**
     * input定義(802.1x)
     */
    const SETUP_ADVANCED_CLIENT_CERTIFICATE_INSTALL= 2;
    /**
     * input定義(802.1x)
     */
    const SETUP_ADVANCED_PEAP_USER= 3;
    /**
     * input定義(802.1x)
     */
    const SETUP_ADVANCED_PEAP_PASSWORD= 4;
    /**
     * input定義(802.1x)
     */
    const SETUP_ADVANCED_CA_CERTITICATE_INSTALL= 5;
    /**
     * input定義(802.1x)
     */
    const SETUP_ADVANCED_TLS_USER_NAME= 6;
    const SETUP_ADVANCED_NTP_TITLE = 24;
    /**
     * select[]
     * @type selectAdvancedObject[]
     */
    var selectAdvancedObject = [];
    /**
     * select定義(NTP) : NTP server address setting
     */
    var SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT = 0;
    /**
     * select定義(NTP) : Time adjustment interval
     */
    var SETUP_ADVANCED_NTP_INTERVAL_SELECT = 1;
    /**
     * select定義(HTTPS) : Connection
     */
    var SETUP_ADVANCED_HTTPS_CONNECTION_SELECT = 2;

    var setup_advanced_https_file = null;
    var setup_advanced_802_1x_file = null;
    var setup_advanced_802_1x_ca_file = null;
    var my_802_1X_Scroll = null;
    var objHttps    ;
    var giSelfSigne ;
    var giCaSigne   ;
    var gsHttpsLive ;
    var giHttpsPort ;
    var giHttpsMode;
    var objCsr      ;
    var giCsr       ;

    var objCrtKey   ;
    var gsCrtKeyTime;
    var giRsaLength ;
    var gsPreKeyTime;
    var giPreRsaLength ;

    var obj802;
    var txtStatusObject = [];
    var txtNetworkStatusObject = [];
    var txtStatusValueObject = [];
    var txtNetworkStatusValueObject = [];

    var PORT_NUMBER = 0;
    var HTTP_STATUS = 1;
    var HTTP_PORT = 2;
    var HTTPS_STATUS = 3;
    var ROUTER_GLOBAL_ADDRESS = 4;
    var _upnp_port1 = 0;
    var _upnp_port2 = 0;
    var _upnp_stat1 = 0;
    var _upnp_stat2 = 0;
    var gsGloAddr = 0;
    var SETUP_ADVANCED_UPNP_TITLE;
    var SETUP_ADVANCED_RTSP_TITLE;
    var SETUP_ADVANCED_HTTPS_TITLE;
    var PORT_NUMBER_VALUE = 0;
    var HTTP_STATUS_VALUE = 1;
    var HTTP_PORT_VALUE = 2;
    var HTTPS_STATUS_VALUE = 3;
    var ROUTER_GLOBAL_ADDRESS_VALUE = 4;
    var selectObject;
    //snmp
    var SETUP_ADVANCED_SNMP_TITLE;
    //tsl
    var SETUP_ADVANCED_TSL_TITLE;
    //referer
    var SETUP_ADVANCED_REFERER_TITLE;
    //mDNS
    var SETUP_ADVANCED_M_DNS_TITLE;
    //
    //802.1X
    var SETUP_ADVANCED_802_1X_TITLE;
    /**
     * Advanced画面構築処理
     * @type number
     */
    function buildAdvanced() {
        if (!buildAdvancedFlag) {
            buildAdvancedFlag = true;
            var setup_advanced_menu = "setup_advanced_menu";
            btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_setting_status_button", NPTZ_WORDING.wID_0077, callbackAdvancedMenuSettingStatus,'',MenuButtonCtrl.SINGLE);
            btnAdvancedObject[SETUP_ADVANCED_MENU_NTP_BUTTON] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_ntp_button", NPTZ_WORDING.wID_0133, callbackAdvancedMenuNtp, '', MenuButtonType.TOP);
            btnAdvancedObject[SETUP_ADVANCED_MENU_UPNP_BUTTON] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_upnp_button", NPTZ_WORDING.wID_0139, callbackAdvancedMenuUpnp, '', MenuButtonType.MIDDLE);
            btnAdvancedObject[SETUP_ADVANCED_MENU_HTTPS_BUTTON] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_https_button", NPTZ_WORDING.wID_0142, callbackAdvancedMenuHttps, '', MenuButtonType.MIDDLE);
            btnAdvancedObject[SETUP_ADVANCED_MENU_RTSP_BUTTON] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_rtsp_button", NPTZ_WORDING.wID_0158, callbackAdvancedMenuRtsp, '', MenuButtonType.MIDDLE);
            btnAdvancedObject[SETUP_ADVANCED_MENU_RTSP_BUTTON_show] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_rtsp_button_show", NPTZ_WORDING.wID_0158, callbackAdvancedMenuRtsp, '', MenuButtonType.MIDDLE);
            btnAdvancedObject[SETUP_ADVANCED_MENU_SNMP_BUTTON_show] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_snmp_button_show", NPTZ_WORDING.wID_0546, callbackAdvancedMenuSNMP, '', MenuButtonType.MIDDLE);
            btnAdvancedObject[SETUP_ADVANCED_MENU_TSL_BUTTON_show] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_tsl_button_show", NPTZ_WORDING.wID_0562, callbackAdvancedMenuTSL, '', MenuButtonType.MIDDLE)
            btnAdvancedObject[SETUP_ADVANCED_MENU_REFERER_BUTTON_show] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_referer_button_show", NPTZ_WORDING.wID_0563, callbackAdvancedMenuReferer, '', MenuButtonType.MIDDLE)
            btnAdvancedObject[SETUP_ADVANCED_MENU_M_DNS] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_m_dns", NPTZ_WORDING.wID_0595, callbackAdvancedMenuMDNS, '', MenuButtonType.MIDDLE)
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_802_1_x", NPTZ_WORDING.wID_0598, callbackAdvancedMenu802_1X, '', MenuButtonType.MIDDLE)
            btnAdvancedObject[SETUP_ADVANCED_MENU_EASYIP] = MenuButtonCtrl(setup_advanced_menu, "setup_advanced_menu_easyip", NPTZ_WORDING.wID_0607, callbackAdvancedMenuEasyIp, '', MenuButtonType.BOTTOM)

            $(".setup_advanced_menu_setting_status_button").addClass("setup_menu_single_btn_class");
            $(".setup_advanced_menu_ntp_button").addClass("setup_menu_top_btn_class");
            $(".setup_advanced_menu_upnp_button").addClass("setup_menu_middle_btn_class");
            $(".setup_advanced_menu_https_button").addClass("setup_menu_middle_btn_class");
            $(".setup_advanced_menu_rtsp_button").addClass("setup_menu_bottom_btn_class");
            $(".setup_advanced_menu_rtsp_button_show").addClass("setup_menu_middle_btn_class");
            $(".setup_advanced_menu_snmp_button_show").addClass("setup_menu_middle_btn_class");
            $(".setup_advanced_menu_tsl_button_show").addClass("setup_menu_middle_btn_class");
            //$(".setup_advanced_menu_referer_button_show").addClass("setup_menu_bottom_btn_class");
            //status
            txtStatusObject[PORT_NUMBER] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_port_number_label', NPTZ_WORDING.wID_0128);
            txtStatusObject[HTTP_STATUS] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_http_status_label', NPTZ_WORDING.wID_0129);
            txtStatusObject[HTTP_PORT] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_http_port_label', NPTZ_WORDING.wID_0130);
            txtStatusObject[HTTPS_STATUS] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_https_status_label',NPTZ_WORDING.wID_0131);
            txtStatusObject[ROUTER_GLOBAL_ADDRESS] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_router_global_address_label_show', NPTZ_WORDING.wID_0132);

            //value
            txtStatusValueObject[PORT_NUMBER_VALUE] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_port_number_label_value', _upnp_port1);
            txtStatusValueObject[HTTP_STATUS_VALUE] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_http_status_label_value', _upnp_stat1);
            txtStatusValueObject[HTTP_PORT_VALUE] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_http_port_label_value', _upnp_port2);
            txtStatusValueObject[HTTPS_STATUS_VALUE] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_https_status_label_value',_upnp_stat2);
            txtStatusValueObject[ROUTER_GLOBAL_ADDRESS_VALUE] = TextCtrl("setup_advanced_setting_status_inner_main", 'setup_status_router_global_address_label_value', gsGloAddr);

            // NTP
            const setup_advanced_ntp_labels = "setup_advanced_ntp_labels";
            const setup_advanced_ntp_form = "setup_advanced_ntp_form";
            const setup_advanced_ntp_inner_main = "setup_advanced_ntp_inner_main";
            txtAdvancedObject[SETUP_ADVANCED_NTP_TITLE] = TextCtrl("setup_advanced_ntp_inner", 'setup_advanced_ntp_inner_title', NPTZ_WORDING.wID_0133);
            txtAdvancedObject[SETUP_ADVANCED_NTP_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_NTP_SYMCHRONIZATION_LABEL] = TextCtrl(setup_advanced_ntp_labels, 'setup_advanced_ntp_symchronization_label', NPTZ_WORDING.wID_0134);
            txtAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_LABEL] = TextCtrl(setup_advanced_ntp_labels, 'setup_advanced_ntp_address_setting_label', NPTZ_WORDING.wID_0135);
            txtAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_LABEL] = TextCtrl(setup_advanced_ntp_labels, 'setup_advanced_ntp_address_txt_label', NPTZ_WORDING.wID_0136);
            txtAdvancedObject[SETUP_ADVANCED_NTP_PORT_LABEL] = TextCtrl(setup_advanced_ntp_labels, 'setup_advanced_ntp_port_label', NPTZ_WORDING.wID_0137);
            txtAdvancedObject[SETUP_ADVANCED_NTP_INTERVAL_LABEL] = TextCtrl(setup_advanced_ntp_labels, 'setup_advanced_ntp_interval_label', NPTZ_WORDING.wID_0138);
            txtAdvancedObject[SETUP_ADVANCED_NTP_PORT_AREA_LABEL] = TextCtrl(setup_advanced_ntp_form, 'setup_advanced_ntp_port_area_label', NPTZ_WORDING.wID_0127);
            radioAdvancedButtonGroup[SETUP_ADVANCED_NTP_SYMCHRONIZATION] = RadioButtonGroupCtrl(setup_advanced_ntp_form, "setup_advanced_ntp_symchronization", RADIO_GROUP.rID_0001, '1', callbackSetupAdvancedNtpSymchronization);
            inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT] = InputCtrl(setup_advanced_ntp_form, '', 'ntp_addr', 'setup_advanced_ntp_address_txt_input', '', '', '', '', '',128);
            inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT] = InputCtrl(setup_advanced_ntp_form, '', 'ntp_port', 'setup_advanced_ntp_port_input', '', null, '', '', '',5);
            selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT] = SelectCtrl(setup_advanced_ntp_form, "", "ntp_addr_dhcp", "setup_advanced_ntp_address_setting_select", NtpServerAddrGet);
            selectAdvancedObject[SETUP_ADVANCED_NTP_INTERVAL_SELECT] = SelectCtrl(setup_advanced_ntp_form, "", "ntp_interval", "setup_advanced_ntp_interval_select");
            btnAdvancedObject[SETUP_ADVANCED_NTP_SET_BUTTON] = ButtonCtrl("setup_advanced_ntp_btn_set_area", "setup_advanced_ntp_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedNtpSet);
            LineCtrl(setup_advanced_ntp_inner_main, "horizontal", 73, 20, 1260,"setup_advanced_ntp_symchronization_label","97.5");
            LineCtrl(setup_advanced_ntp_inner_main, "horizontal", 142, 20, 1260,"setup_advanced_ntp_address_setting_label","97.5");
            LineCtrl(setup_advanced_ntp_inner_main, "horizontal", 211, 20, 1260,"setup_advanced_ntp_address_txt_label","97.5");
            LineCtrl(setup_advanced_ntp_inner_main, "horizontal", 280, 20, 1260,"setup_advanced_ntp_port_label","97.5");
            LineCtrl(setup_advanced_ntp_inner_main, "horizontal", 349, 0, 1300,"setup_advanced_ntp_interval_label","97.5");

            // UPnP
            var setup_advanced_upnp_labels = "setup_advanced_upnp_labels";
            var setup_advanced_upnp_form = "setup_advanced_upnp_form";
            var setup_advanced_upnp_inner_main = "setup_advanced_upnp_inner_main";
            txtAdvancedObject[SETUP_ADVANCED_UPNP_TITLE] = TextCtrl("setup_advanced_upnp_inner", 'setup_advanced_upnp_inner_title', NPTZ_WORDING.wID_0139);
            txtAdvancedObject[SETUP_ADVANCED_UPNP_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_UPNP_AUTO_PORT_LABEL] = TextCtrl(setup_advanced_upnp_labels, 'setup_advanced_upnp_auto_port_label', NPTZ_WORDING.wID_0140);
            radioAdvancedButtonGroup[SETUP_ADVANCED_UPNP_AUTO_PORT] = RadioButtonGroupCtrl(setup_advanced_upnp_form, "setup_advanced_upnp_auto_port", RADIO_GROUP.rID_0001, '1', callbackUpnpAutoPort);
            btnAdvancedObject[SETUP_ADVANCED_UPNP_SET_BUTTON] = ButtonCtrl("setup_advanced_upnp_btn_set_area", "setup_advanced_upnp_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedUpnpSet);
            LineCtrl(setup_advanced_upnp_inner_main, "horizontal", 73, 0, 1300,"setup_advanced_upnp_auto_port_label");

            // HTTPS
            var setup_advanced_https_labels = "setup_advanced_https_labels";
            var setup_advanced_https_form = "setup_advanced_https_form";
            var setup_advanced_https_inner_main = "setup_advanced_https_inner_main";
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_TITLE] = TextCtrl("setup_advanced_https_inner", 'setup_advanced_https_inner_title', NPTZ_WORDING.wID_0142);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_CRT_KEY_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_crt_key_label', NPTZ_WORDING.wID_0143);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_SELF_SIGNED_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_self_signed_label', NPTZ_WORDING.wID_0144);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_GENERATE_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_generate_label', NPTZ_WORDING.wID_0145);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_information_label', NPTZ_WORDING.wID_0146);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_CERTIFICATE_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_certificate_label', NPTZ_WORDING.wID_0147);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_signing_request_label', NPTZ_WORDING.wID_0148);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_install_label', NPTZ_WORDING.wID_0149);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_information2_label', NPTZ_WORDING.wID_0146);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_connection_label', NPTZ_WORDING.wID_0150);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_PORT_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_port_label', NPTZ_WORDING.wID_0151);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_NOT_GENERATED_LABEL] = TextCtrl(setup_advanced_https_form, 'setup_advanced_https_not_generated_label', NPTZ_WORDING.wID_0152);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_INVALID_LABEL] = TextCtrl(setup_advanced_https_form, 'setup_advanced_https_invalid_label', NPTZ_WORDING.wID_0153);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_CRT_KEY_EXECUTE_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_crt_key_execute_button", NPTZ_WORDING.wID_0154, callbackAdvancedHttpsExecute, SETUP_ADVANCED_HTTPS_CRT_KEY_EXECUTE_BUTTON);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_GENERATE_EXECUTE_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_generate_button", NPTZ_WORDING.wID_0154, callbackAdvancedHttpsExecute, SETUP_ADVANCED_HTTPS_GENERATE_EXECUTE_BUTTON);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_CONFIRM_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_information_confirm_button", NPTZ_WORDING.wID_0155, callbackAdvancedHttpsConfirm, SETUP_ADVANCED_HTTPS_INFORMATION_CONFIRM_BUTTON);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_DELETE_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_information_delete_button", NPTZ_WORDING.wID_0156, callbackAdvancedHttpsDelete, SETUP_ADVANCED_HTTPS_INFORMATION_DELETE_BUTTON);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_EXECUTE_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_signing_request_execute_button", NPTZ_WORDING.wID_0154, callbackAdvancedHttpsExecute, SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_EXECUTE_BUTTON);
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_INPUT] = InputCtrl(setup_advanced_https_form, 'setup_advanced_https_install_input', '', 'setup_advanced_https_install_input', '');
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_SELECT_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_install_select_button", NPTZ_WORDING.wID_0157, callbackAdvancedHttpsSelect);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_EXECUTE_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_install_execute_button", NPTZ_WORDING.wID_0154, callbackAdvancedHttpsExecute, SETUP_ADVANCED_HTTPS_INSTALL_EXECUTE_BUTTON);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_CONFIRM_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_information2_confirm_button", NPTZ_WORDING.wID_0155, callbackAdvancedHttpsConfirm, SETUP_ADVANCED_HTTPS_INFORMATION2_CONFIRM_BUTTON);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_DELETE_BUTTON] = ButtonCtrl(setup_advanced_https_form, "setup_advanced_https_information2_delete_button", NPTZ_WORDING.wID_0156, callbackAdvancedHttpsDelete, SETUP_ADVANCED_HTTPS_INFORMATION2_DELETE_BUTTON);
            selectAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_SELECT] = SelectCtrl(setup_advanced_https_form, "", "live", "setup_advanced_https_connection_select");
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_PORT_INPUT] = InputCtrl(setup_advanced_https_form, '', 'https_port', 'setup_advanced_https_port_input', '', null, '', '', '', 5);
            txtAdvancedObject[SETUP_ADVANCED_HTTPS_PORT_TIPS_LABEL] = TextCtrl(setup_advanced_https_form, 'setup_advanced_https_port_tips_label', NPTZ_WORDING.wID_0127);
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_SET_BUTTON] = ButtonCtrl("setup_advanced_https_btn_set_area", "setup_advanced_https_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedHttpsSet);
            setup_advanced_https_file = buildInputFileObject("setup_advance_form_select", "setup_advanced_https_install_input_file", "fileName", "setup_advanced_https_install_input", "setup_advanced_https_install_select_button");

            //NASA by wpz
            txtAdvancedObject[SETUP_ADVANCED_HTTP_TLS_LABEL] = TextCtrl(setup_advanced_https_labels, 'setup_advanced_https_tls_label', NPTZ_WORDING.wID_0481);
            selectObject = SelectCtrl(setup_advanced_https_form, "select_setting_https_tls", "select_setting_https_tls", "select_setting_https_tls");
            var select_setting_https_tls_text = [];
            var select_setting_https_tls_value = [];
            select_setting_https_tls_value.push(
                2,
                0,
                1
            );
            select_setting_https_tls_text.push(
                "TLS1.3",
                "TLS1.2",
                "TLS1.0/1.1/1.2/1.3"
            );
            selectObject.appendOptions(select_setting_https_tls_value, select_setting_https_tls_text);
            selectObject.show();
            selectObject.displayOff();


            LineCtrl(setup_advanced_https_inner_main, "vertical", 126, 37, 85,"setup_advanced_https_self_signed_label");
            LineCtrl(setup_advanced_https_inner_main, "vertical", 300, 37, 138,"setup_advanced_https_certificate_label");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 73, 20, 1260,"setup_advanced_https_crt_key_label","97.5");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 166, 50, 1230,"setup_advanced_https_generate_label","96");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 247, 20, 1260,"setup_advanced_https_information_label","97.5");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 340, 50, 1230,"setup_advanced_https_signing_request_label","96");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 393, 50, 1230,"setup_advanced_https_install_label","96");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 474, 20, 1260,"setup_advanced_https_information2_label","97.5");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 543, 20, 1260,"setup_advanced_https_connection_label","97.5");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 612, 0, 1300,"setup_advanced_https_port_label","97.5");
            LineCtrl(setup_advanced_https_inner_main, "horizontal", 612, 0, 1300,"setup_advanced_https_tls_label","97.5");

            // RTSP
            var setup_advanced_rtsp_labels = "setup_advanced_rtsp_labels";
            var setup_advanced_rtsp_form = "setup_advanced_rtsp_form";
            var setup_advanced_rtsp_inner_main ="setup_advanced_rtsp_inner_main";
            txtAdvancedObject[SETUP_ADVANCED_RTSP_TITLE] = TextCtrl("setup_advanced_rtsp_inner", 'setup_advanced_rtsp_inner_title', NPTZ_WORDING.wID_0158);
            txtAdvancedObject[SETUP_ADVANCED_RTSP_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_RTSP_PORT_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_port_label', NPTZ_WORDING.wID_0159);
            txtAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL1_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_request_url1_label', NPTZ_WORDING.wID_0160);
            txtAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL2_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_request_url2_label', NPTZ_WORDING.wID_0161);
            txtAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL3_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_request_url3_label', NPTZ_WORDING.wID_0162);
            // txtAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL4_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_request_url4_label', NPTZ_WORDING.wID_0163);
            txtAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL5_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_request_url5_label', NPTZ_WORDING.wID_0164);
            txtAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL6_LABEL] = TextCtrl(setup_advanced_rtsp_labels, 'setup_advanced_rtsp_request_url6_label', NPTZ_WORDING.wID_0543);
            inputAdvancedObject[SETUP_ADVANCED_RTSP_PORT_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'rtsp_port', 'setup_advanced_rtsp_port_input', '', null, '', '', '',5);
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL1_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'h264_rtsp_req_uri1', 'setup_advanced_rtsp_request_url1_input', '');
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL2_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'h264_rtsp_req_uri2', 'setup_advanced_rtsp_request_url2_input', '');
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL3_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'h264_rtsp_req_uri3', 'setup_advanced_rtsp_request_url3_input', '');
            // inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL4_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'h264_rtsp_req_uri4', 'setup_advanced_rtsp_request_url4_input', '');
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL5_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'h265_rtsp_req_uri1', 'setup_advanced_rtsp_request_url5_input', '');
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL6_INPUT] = InputCtrl(setup_advanced_rtsp_form, '', 'h265_rtsp_req_uri2', 'setup_advanced_rtsp_request_url6_input', '');
            txtAdvancedObject[SETUP_ADVANCED_RTSP_PORT_TIPS_LABEL] = TextCtrl(setup_advanced_rtsp_form, 'setup_advanced_rtsp_port_tips_label', NPTZ_WORDING.wID_0127);
            btnAdvancedObject[SETUP_ADVANCED_RTSP_SET_BUTTON] = ButtonCtrl("setup_advanced_rtsp_btn_set_area", "setup_advanced_rtsp_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedRtspSet);
            LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 73, 20, 1260,"setup_advanced_rtsp_port_label");
            LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 142, 20, 1260,"setup_advanced_rtsp_request_url1_label");
            LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 211, 20, 1260,"setup_advanced_rtsp_request_url2_label");
            LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 280, 20, 1260,"setup_advanced_rtsp_request_url3_label");
            // LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 349, 20, 1260,"setup_advanced_rtsp_request_url4_label");
            LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 418, 0, 1300,"setup_advanced_rtsp_request_url5_label");
            LineCtrl(setup_advanced_rtsp_inner_main, "horizontal", 418, 0, 1300,"setup_advanced_rtsp_request_url6_label");

            //snmp
            const setup_advanced_snmp_labels = "setup_advanced_snmp_labels";
            const setup_advanced_snmp_form = "setup_advanced_snmp_form";
            const setup_advanced_snmp_inner_main ="setup_advanced_snmp_inner_main";
            txtAdvancedObject[SETUP_ADVANCED_SNMP_TITLE] = TextCtrl("setup_advanced_snmp_inner", 'setup_advanced_snmp_inner_title', NPTZ_WORDING.wID_0546);
            txtAdvancedObject[SETUP_ADVANCED_SNMP_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_SNMP_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_snmp_label', NPTZ_WORDING.wID_0546);
            txtAdvancedObject[SETUP_ADVANCED_SNMP_VERSION_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_snmp_version_label', NPTZ_WORDING.wID_0547);
            txtAdvancedObject[SETUP_ADVANCED_USER_NAME_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_user_name_label', NPTZ_WORDING.wID_0548);
            txtAdvancedObject[SETUP_ADVANCED_AUTHENTICATION_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_authentication_label', NPTZ_WORDING.wID_0549);
            txtAdvancedObject[SETUP_ADVANCED_ENCRYPTION_METHOD_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_encryption_method_label', NPTZ_WORDING.wID_0550);
            txtAdvancedObject[SETUP_ADVANCED_PASSWORD_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_password_label', NPTZ_WORDING.wID_0551);
            txtAdvancedObject[SETUP_ADVANCED_SYSTEM_NAME_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_system_name_label', NPTZ_WORDING.wID_0552);
            txtAdvancedObject[SETUP_ADVANCED_LOCATION_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_location_label', NPTZ_WORDING.wID_0553);
            txtAdvancedObject[SETUP_ADVANCED_CONTACT_LABEL] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_contact_label', NPTZ_WORDING.wID_0554);
            txtAdvancedObject[SETUP_ADVANCED_SNMP_VERSION] = TextCtrl(setup_advanced_snmp_labels, 'setup_advanced_snmp_version', NPTZ_WORDING.wID_0569);

            radioAdvancedButtonGroup[SETUP_ADVANCED_SNMP] = RadioButtonGroupCtrl(setup_advanced_snmp_form, "setup_advanced_snmp", RADIO_GROUP.rID_0001, '1', callbackSnmpMode);
            radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION] = RadioButtonGroupCtrl(setup_advanced_snmp_form, "setup_advanced_authentiction", RADIO_GROUP.rID_0062, '1', callbackUpnpAutoPort);
            radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD] = RadioButtonGroupCtrl(setup_advanced_snmp_form, "setup_advanced_encryption_method", RADIO_GROUP.rID_0063, '1', callbackUpnpAutoPort);
            inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT] = InputCtrl(setup_advanced_snmp_form, '', 'setup_advanced_snmp_user_name_input', 'setup_advanced_snmp_user_name_input', '');
            inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT] = InputCtrl(setup_advanced_snmp_form, '', 'SETUP_ADVANCED_SNMP_PASSWORD_INPUT', 'setup_advanced_snmp_password_input', '');
            inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT] = InputCtrl(setup_advanced_snmp_form, '', 'SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT', 'setup_advanced_snmp_system_name_input', '');
            inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT] = InputCtrl(setup_advanced_snmp_form, '', 'SETUP_ADVANCED_SNMP_LOCATION_INPUT', 'setup_advanced_snmp_location_input', '');
            //4840
            inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT] = InputCtrl(setup_advanced_snmp_form, '', 'SETUP_ADVANCED_SNMP_CONTACT_INPUT', 'setup_advanced_snmp_contact_input', '',null,'','','','255');
            btnAdvancedObject[SETUP_ADVANCED_SNAP_SET_BUTTON] = ButtonCtrl("setup_advanced_snmp_btn_set_area", "setup_advanced_snmp_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedSNMPSet)

            /*snmp line*/
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 73, 20, 1260,"setup_advanced_snmp_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 142, 20, 1260,"setup_advanced_snmp_version_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 211, 20, 1260,"setup_advanced_user_name_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 280, 20, 1260,"setup_advanced_authentication_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 349, 20, 1260,"setup_advanced_encryption_method_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 418, 0, 1300,"setup_advanced_password_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 418, 0, 1300,"setup_advanced_system_name_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 418, 0, 1300,"setup_advanced_location_label");
            LineCtrl(setup_advanced_snmp_inner_main, "horizontal", 418, 0, 1300,"setup_advanced_contact_label");

            /*TSL*/
            txtAdvancedObject[SETUP_ADVANCED_TSL_TITLE] = TextCtrl("setup_advanced_tsl_inner", 'setup_advanced_tsl_inner_title', NPTZ_WORDING.wID_0562);
            txtAdvancedObject[SETUP_ADVANCED_TSL_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_TSL_INDEX_NUMBER_LABEL] = TextCtrl("setup_advanced_tsl_labels", 'setup_advanced_tsl_index_number_label', NPTZ_WORDING.wID_0564);
            txtAdvancedObject[SETUP_ADVANCED_TSL_PORT_LABEL] = TextCtrl("setup_advanced_tsl_labels", 'setup_advanced_tsl_port_label', NPTZ_WORDING.wID_0565);
            txtAdvancedObject[TXT_ADVANCED_TSL_INDEX] = TextCtrl("setup_advanced_tsl_labels", 'txt_advanced_tsl_index', NPTZ_WORDING.wID_0574);
            txtAdvancedObject[TXT_ADVANCED_TSL_PORT] = TextCtrl("setup_advanced_tsl_labels", 'txt_advanced_tsl_port', NPTZ_WORDING.wID_0127);

            inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT] = InputCtrl("setup_advanced_tsl_form", '', 'setup_advanced_tsl_index_input', 'setup_advanced_tsl_index_input', '');
            inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT] = InputCtrl("setup_advanced_tsl_form", '', 'setup_advanced_tsl_port_input', 'setup_advanced_tsl_port_input', '');
            btnAdvancedObject[SETUP_ADVANCED_TSL_SET_BUTTON] = ButtonCtrl("setup_advanced_tsl_btn_set_area", "setup_advanced_tsl_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedTSLSet);
            inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT].getInputObject().keypress(checkPortValue);
            inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT].getInputObject().keypress(checkPortValue);

            LineCtrl("setup_advanced_tsl_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_tsl_index_label");
            LineCtrl("setup_advanced_tsl_inner_main", "horizontal", 142, 20, 1260,"setup_advanced_tsl_port_label");

            /*referer*/
            txtAdvancedObject[SETUP_ADVANCED_REFERER_TITLE] = TextCtrl("setup_advanced_referer_inner", 'setup_advanced_referer_title', NPTZ_WORDING.wID_0563);
            txtAdvancedObject[SETUP_ADVANCED_REFERER_TITLE].show();
            txtAdvancedObject[SETUP_ADVANCED_REFERER_LABEL] = TextCtrl("setup_advanced_referer_labels", 'setup_advanced_referer_label', NPTZ_WORDING.wID_0566);
            radioAdvancedButtonGroup[SETUP_ADVANCED_REFERER] = RadioButtonGroupCtrl("setup_advanced_referer_form", "setup_advanced_referer", RADIO_GROUP.rID_0064, '1', callbackReferer);
            LineCtrl("setup_advanced_referer_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_tsl_index_label");


            /*mDNS*/
            txtAdvancedObject[SETUP_ADVANCED_M_DNS_TITLE] = TextCtrl("setup_advanced_mDNS_inner", 'setup_advanced_mDNS_title', NPTZ_WORDING.wID_0595);
            txtAdvancedObject[SETUP_ADVANCED_M_DNS_TITLE].show();
            txtAdvancedObject[TXT_ADVANCED_M_DNS] = TextCtrl("setup_advanced_mDNS_inner_labels", 'setup_advanced_m_dns_label', NPTZ_WORDING.wID_0596);
            inputAdvancedObject[SETUP_ADVANCED_M_DNS_INPUT] = InputCtrl("setup_advanced_mDNS_inner_form", '', 'setup_advanced_m_dns_input', 'setup_advanced_m_dns_input', '');
            LineCtrl("setup_advanced_mDNS_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_tsl_index_label");
            btnAdvancedObject[SETUP_ADVANCED_MDNS_SET_BUTTON] = ButtonCtrl("setup_advanced_mDNS_btn_set_area", "setup_advanced_upnp_set_button", NPTZ_WORDING.wID_0141, callbackAdvancedMdnsSet);
            inputAdvancedObject[SETUP_ADVANCED_M_DNS_INPUT].show();
            inputAdvancedObject[SETUP_ADVANCED_M_DNS_INPUT].displayOff();

            /*802.1X*/
            txtAdvancedObject[SETUP_ADVANCED_802_1X_TITLE] = TextCtrl("setup_advanced_802_1x_inner", 'setup_advanced_802_1x_title', NPTZ_WORDING.wID_0598);
            txtAdvancedObject[SETUP_ADVANCED_802_1X_TITLE].show();

            txtAdvancedObject[TXT_ADVANCED_802_1X] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_m_dns_label', NPTZ_WORDING.wID_0598);
            radioAdvancedButtonGroup[SETUP_ADVANCED_802_1X] = RadioButtonGroupCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_ntp_symchronization", RADIO_GROUP.rID_0001, '1', callback802_1x);

            /*EAP*/
            txtAdvancedObject[TXT_ADVANCED_EAP] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_eap_label', NPTZ_WORDING.wID_0599);
            radioAdvancedButtonGroup[SETUP_ADVANCED_EAP] = RadioButtonGroupCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_eap", RADIO_GROUP.rID_0070, '1', callbackEapAuthenticationMethod);

            /*TLS*/
            txtAdvancedObject[TXT_ADVANCED_TLS] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_tls_label', NPTZ_WORDING.wID_0600);
            txtAdvancedObject[TXT_ADVANCED_CLIENT_C_TYPE] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_client_label', NPTZ_WORDING.wID_0601);
            txtAdvancedObject[TXT_ADVANCED_P_K_P_U] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_private_label', NPTZ_WORDING.wID_0602);
            txtAdvancedObject[TXT_ADVANCED_P_K_PASSWORD] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_private_password_label', NPTZ_WORDING.wID_0603);
            //802.1X 製品セキュリティセンター指摘追加仕様 2021/09/13


            txtAdvancedObject[TXT_ADVANCED_8021x_TLS_USER_NAME] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_8021_tls_user_name_label', NPTZ_WORDING.wID_0609);
            txtAdvancedObject[TXT_ADVANCED_CLIENT_C_INSTALL] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_client_install_label', NPTZ_WORDING.wID_0604);
            txtAdvancedObject[TXT_ADVANCED_INFORMATION] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_information_label', NPTZ_WORDING.wID_0605);
            radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE] = RadioButtonGroupCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_client_type", RADIO_GROUP.rID_0071, '1', callback802_1x_tls);
            radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE] = RadioButtonGroupCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_private_key_usage", RADIO_GROUP.rID_0041, '1', callback802_1x_tls);
            inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD] = InputCtrl("setup_advanced_802_1x_inner_form", '', 'setup_advanced_private_key_password', 'setup_advanced_private_key_password', '');
            inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME] = InputCtrl("setup_advanced_802_1x_inner_form", '', 'setup_advanced_tls_user_name', 'setup_advanced_tls_user_name', '');

            inputAdvanced802Object[SETUP_ADVANCED_CLIENT_CERTIFICATE_INSTALL] = InputCtrl("setup_advanced_802_1x_inner_form", 'setup_advanced_client_certificate_install_input', 'setup_advanced_client_certificate_install', 'setup_advanced_client_certificate_install', '');

            /*PEAP*/
            txtAdvancedObject[TXT_ADVANCED_PEAP] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_peap_label', NPTZ_WORDING.wID_0606);
            txtAdvancedObject[TXT_ADVANCED_PEAP_USER] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_peap_user_label', NPTZ_WORDING.wID_0061);
            txtAdvancedObject[TXT_ADVANCED_PEAP_PASSWORD] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_peap_password_label', NPTZ_WORDING.wID_0062);
            txtAdvancedObject[TXT_ADVANCED_CA_C_INSTALL] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_cac_install_label', NPTZ_WORDING.wID_0149);
            txtAdvancedObject[TXT_ADVANCED_CA_INFORMATION] = TextCtrl("setup_advanced_802_1x_inner_labels", 'setup_advanced_ca_information_label', NPTZ_WORDING.wID_0605);
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER] = InputCtrl("setup_advanced_802_1x_inner_form", '', 'setup_advanced_peap_user', 'setup_advanced_peap_user', '');
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD] = InputCtrl("setup_advanced_802_1x_inner_form", '', 'setup_advanced_peap_password', 'setup_advanced_peap_password', '');
            inputAdvanced802Object[SETUP_ADVANCED_CA_CERTITICATE_INSTALL] = InputCtrl("setup_advanced_802_1x_inner_form", 'setup_advanced_ca_certiticate_install_input', 'setup_advanced_ca_certiticate_install', 'setup_advanced_ca_certiticate_install', '');


            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_install_select_button", NPTZ_WORDING.wID_0157, callbackAdvanced_802_1x_Btn,SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT,"","","setup_advanced_menu_802_1_x_client_select");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_install_execute_button", NPTZ_WORDING.wID_0154, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE,"","","setup_advanced_menu_802_1_x_client_execute");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CA_SELECT] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_install_select_button", NPTZ_WORDING.wID_0157, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_CA_SELECT,"","","setup_advanced_menu_802_1_x_ca_select");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CA_EXECUTE] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_install_execute_button", NPTZ_WORDING.wID_0154, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_CA_EXECUTE,"","","setup_advanced_menu_802_1_x_ca_execute");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_information_confirm_button", NPTZ_WORDING.wID_0155, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM,"","","setup_advanced_menu_802_1_x_tls_information_confirm");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_information_delete_button", NPTZ_WORDING.wID_0156, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE,"","","setup_advanced_menu_802_1_x_tls_information_delete");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_CONFIRM] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_information_confirm_button", NPTZ_WORDING.wID_0155, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_CONFIRM,"","","setup_advanced_menu_802_1_x_peap_information_confirm");
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_DELETE] = ButtonCtrl("setup_advanced_802_1x_inner_form", "setup_advanced_https_information_delete_button", NPTZ_WORDING.wID_0156, callbackAdvanced_802_1x_Btn, SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_DELETE,"","","setup_advanced_menu_802_1_x_peap_information_delete");
            setup_advanced_802_1x_file = buildInputFileObject("setup_advanced_802_1x_inner_form", "setup_advanced_client_install_input_file", "fileName", "setup_advanced_client_certificate_install_input", "setup_advanced_client_install_input_file");
            setup_advanced_802_1x_ca_file = buildInputFileObject("setup_advanced_802_1x_inner_form", "setup_advanced_ca_install_input_file", "fileName", "setup_advanced_ca_certiticate_install_input", "setup_advanced_client_install_input_file");
            $('#setup_advanced_client_install_input_file').attr('accept', '.pem,.pfx');
            $('#setup_advanced_ca_install_input_file').attr('accept', '.pem,.cer');
            btnAdvancedObject[SETUP_ADVANCED_802_SET_BUTTON] = ButtonCtrl("setup_advanced_802_1x_btn_set_area", "setup_advanced_802_1x_set_button", NPTZ_WORDING.wID_0141, callbackAdvanced802_1xSet);
            /*Easy IP*/
            txtAdvancedObject[SETUP_ADVANCED_802_1X_TITLE] = TextCtrl("setup_advanced_easyip_inner", 'setup_advanced_802_1x_title', NPTZ_WORDING.wID_0607);
            txtAdvancedObject[SETUP_ADVANCED_802_1X_TITLE].show();
            txtAdvancedObject[TXT_ADVANCED_EASYIP_PLAIN] = TextCtrl("setup_advanced_easyip_inner_labels", 'setup_advanced_referer_label', NPTZ_WORDING.wID_0608);
            radioAdvancedButtonGroup[SETUP_ADVANCED_PLAIN_TEXT_USAGE] = RadioButtonGroupCtrl("setup_advanced_easyip_inner_form", "setup_advanced_referer", RADIO_GROUP.rID_0041, '1', callbackEasyIpChange);
            btnAdvancedObject[SETUP_ADVANCED_EASYIP_SET_BUTTON] = ButtonCtrl("setup_advanced_easyip_btn_set_area", "setup_advanced_easyip_set_button", NPTZ_WORDING.wID_0141, callbackEasyIpSetup);

            LineCtrl("setup_advanced_easyip_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_tsl_index_label");

            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_802_1x_label","97.5");
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_eap_label","97.5");
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_private_k_p_usage_label","95.5");
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_private_k_password_label","94.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "vertical", 500, 40, 50,"setup_advanced_private_key_label");
            LineCtrl("setup_advanced_802_1x_inner_main", "vertical", 500, 40, 50,"setup_advanced_tls_label");
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_private_password_label","94")
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_client_install_label","94.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_information_label","94.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "vertical", 73, 20, 1260,"setup_advanced_peap_vertical_label","94.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_tls_user_name_label","94.5")


            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_peap_label","94.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_peap_user_label","94.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_peap_password_label","95.5")
            LineCtrl("setup_advanced_802_1x_inner_main", "horizontal", 73, 20, 1260,"setup_advanced_information1_label","95.5")






            // let file_802_1x_Select = document.getElementById("setup_advanced_menu_802_1_x_client_select");
            // let file_802_1x_Elem = document.getElementById("setup_advanced_client_install_input_file");
            // file_802_1x_Select.addEventListener("click", function (e) {
            //     if (file_802_1x_Elem && btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE].getStatus() != Button.STATUS_DISABLED) {
            //         file_802_1x_Elem.click();
            //     }
            //     e.preventDefault();
            // }, false);
            // let file_802_1x_ca_Select = document.getElementById("setup_advanced_menu_802_1_x_ca_select");
            // let file_802_1x_ca_Elem = document.getElementById("setup_advanced_ca_install_input_file");
            // file_802_1x_ca_Select.addEventListener("click", function (e) {
            //     if (file_802_1x_ca_Elem) {
            //         file_802_1x_ca_Elem.click();
            //     }
            //     e.preventDefault();
            // }, false);

            //20190118 #3803 add with wpz
            let fileSelect = document.getElementsByClassName("setup_advanced_https_install_select_button")[1];
            let fileElem = document.getElementById("setup_advanced_https_install_input_file");
            fileSelect.addEventListener("click", function (e) {
                if (fileElem) {
                    fileElem.click();
                }
                e.preventDefault();
            }, false);


            // port 数字以外入力できない
            inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT].getInputObject().keypress(function(e) {
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            });
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_PORT_INPUT].getInputObject().keypress(function(e) {
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            });
            inputAdvancedObject[SETUP_ADVANCED_RTSP_PORT_INPUT].getInputObject().keypress(function(e){
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            });
            for (var txt in txtStatusObject) {
                txtStatusObject[txt].show();
            }
            for (var btn in btnAdvancedObject) {
                btnAdvancedObject[btn].show();
                btnAdvancedObject[btn].displayOff();
            }
            for (var txt in txtAdvancedObject) {
                txtAdvancedObject[txt].show();
            }
            for (var input in inputAdvancedObject) {
                inputAdvancedObject[input].displayOff();
                inputAdvancedObject[input].show();
            }

            for (var input in inputAdvanced802Object) {
                inputAdvanced802Object[input].show();
                inputAdvanced802Object[input].displayOff();
            }

            for (var select in selectAdvancedObject) {
                selectAdvancedObject[select].show();
                selectAdvancedObject[select].displayOff();
            }
            initSettingStatusEle();
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_PORT_INPUT].displayOff();

            inputAdvancedObject[SETUP_ADVANCED_RTSP_PORT_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL1_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL2_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL3_INPUT].displayOff();
            // inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL4_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL5_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL6_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT].displayOff();



        } else {
            rebuildAdvanced();
        }
        //build_802_1X_Scroll();

        btnAdvancedObject[SETUP_ADVANCED_MENU_UPNP_BUTTON].hide();
        $('.MenuButtonDivideLine.setup_advanced_menu_upnp_button_Line').show();
    }

    function callbackAdvanced802_1xSet(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            $("#dialog_setup").show();
            $.ajax({
                type: "get",
                url: "/cgi-bin/set_802",
                data: getAdvanced802_1x_FormData(),
                success: function (data) {
                    $("#dialog_setup").hide();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#dialog_setup").hide();
                }
            });
        }
    }

    function getAdvanced802_1x_FormData(){
        var data = {};
        data['mode'] = radioAdvancedButtonGroup[SETUP_ADVANCED_802_1X].getSelectedValue();
        data['mode'] = radioAdvancedButtonGroup[SETUP_ADVANCED_802_1X].getSelectedValue();
        data['eap_mode'] = radioAdvancedButtonGroup[SETUP_ADVANCED_EAP].getSelectedValue();
        if(data['eap_mode'] == "tls"){
            data['client_ca_type'] = radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE].getSelectedValue();
            data['pk_usage'] = radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE].getSelectedValue();
            data['pk_pass'] = inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD].get();
            data['tls_name'] = inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME].get();
        }else{
            data['name'] = inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER].get();
            data['password'] = inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD].get();
        }
        return data;
    }

    function callback802_1x_tls(){

    }

    function callback802_1x(){
        init802_1xStatus();
    }

    function init802_1xStatus(){
        if(radioAdvancedButtonGroup[SETUP_ADVANCED_802_1X].getSelectedValue() == "0"){
            radioAdvancedButtonGroup[SETUP_ADVANCED_EAP].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD].displayDisabled();
            radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE].displayDisabled();
            radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_CLIENT_CERTIFICATE_INSTALL].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_CA_CERTITICATE_INSTALL].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_CONFIRM].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_DELETE].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CA_SELECT].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CA_EXECUTE].displayDisabled();

        }else{
            radioAdvancedButtonGroup[SETUP_ADVANCED_EAP].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD].displayOff();
            radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE].displayOff();
            radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_CLIENT_CERTIFICATE_INSTALL].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_CA_CERTITICATE_INSTALL].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_CONFIRM].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_DELETE].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CA_SELECT].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CA_EXECUTE].displayOff();
            initEapAuthenticationStatus();
        }
    }

    function callbackEapAuthenticationMethod(){
        initEapAuthenticationStatus();
    }

    function initEapAuthenticationStatus(){
        if(radioAdvancedButtonGroup[SETUP_ADVANCED_EAP].getSelectedValue() == "tls"){
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD].displayDisabled();
            radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE].displayOff();
            radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_CLIENT_CERTIFICATE_INSTALL].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE].displayOff();
        }else{
            radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE].displayDisabled();
            radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_CLIENT_CERTIFICATE_INSTALL].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE].displayDisabled();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER].displayOff();
            inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD].displayOff();
        }
    }

    //Scroll Bar構築する
    function build_802_1X_Scroll(){
        setTimeout(function () {
            my_802_1X_Scroll = new IScroll('#setup_advanced_802_1x_scroll_div', {
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
            setTimeout(function(){
                if(!Platform.isTouchMode()){
                    destroy_802_1x_Scroll();
                }
            },200)
        }, 1500)
    }
    /**
     * Network画面構築処理
     */
    function rebuildAdvanced() {
        initSettingStatusEle();
    }
    function checkPortValue(event) {
        var e = event.which?event.which:window.event.keyCode;
        if (e < 48 || e > 57) {
            return false;
        }
    }
    function initSettingStatusEle() {
        $("#setup_advanced_setting_status_inner").hide();
        $("#setup_advanced_ntp_inner").show();
        $("#setup_advanced_upnp_inner").hide();
        $("#setup_advanced_https_inner").hide();
        $("#setup_advanced_rtsp_inner").hide();
        $("#setup_advanced_snmp_inner").hide();
        $("#setup_advanced_mDNS_inner").hide();
        $("#setup_advanced_802_1x_inner").hide();
        $("#setup_advanced_easyip_inner").hide();
        //#5187
        $("#setup_advanced_tsl_inner").hide();
        $("#setup_advanced_referer_inner").hide();

        //btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON].displayOn();
        btnAdvancedObject[SETUP_ADVANCED_MENU_NTP_BUTTON].displayOn();
        // getSettingStatusValue();
        setSetupAdvancedNtpValueToEle();
    }
    function initSettingNetworkStatusEle() {
        $("#setup_network_setting_status_inner").show();
        $("#setup_network_lan_inner").hide();
        // $("#setup_advanced_upnp_inner").hide();
        // $("#setup_advanced_https_inner").hide();
        // $("#setup_advanced_rtsp_inner").hide();
        // $("#setup_advanced_snmp_inner").hide();
        // $("#setup_advanced_mDNS_inner").hide();
        // $("#setup_advanced_802_1x_inner").hide();
        // $("#setup_advanced_easyip_inner").hide();
        // //#5187
        // $("#setup_advanced_tsl_inner").hide();
        // $("#setup_advanced_referer_inner").hide();

        menuNetworkObject[SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON].displayOn();
        // getSettingStatusValue();
    }
    function getSettingStatusValue() {
        getUpnpStatus();
        txtStatusValueObject[PORT_NUMBER_VALUE].set(_upnp_port1);
        txtStatusValueObject[HTTP_STATUS_VALUE].set(_upnp_stat1);
        txtStatusValueObject[HTTP_PORT_VALUE].set(_upnp_port2);
        txtStatusValueObject[HTTPS_STATUS_VALUE].set(_upnp_stat2);
        txtStatusValueObject[ROUTER_GLOBAL_ADDRESS_VALUE].set(gsGloAddr);
        for (var txt in txtStatusValueObject) {
            txtStatusValueObject[txt].show();
        }
        var result =getDest();
        if(result == 0 ){
            $(".setup_status_router_global_address_label_show").removeClass("setup_status_router_global_address_label_show").addClass('setup_status_router_global_address_label_show_rtsp');
            $(".setup_status_router_global_address_label_value").removeClass("setup_status_router_global_address_label_value").addClass('setup_status_router_global_address_label_value_rtsp');
            $(".setup_status_router_global_address_label").show();
            $(".setup_status_http_port_label_value").hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_HTTPS_BUTTON].hide();
            txtStatusObject[HTTPS_STATUS].hide();
            txtStatusObject[HTTPS_STATUS_VALUE].hide();
            txtStatusObject[HTTP_PORT].hide();
            txtStatusObject[HTTP_PORT_VALUE].hide();
            $(".setup_advanced_menu_rtsp_button").show();
            btnAdvancedObject[SETUP_ADVANCED_MENU_RTSP_BUTTON_show].hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_SNMP_BUTTON_show].hide();
            $(".setup_https_status_label_value").hide();
            $(".setup_advanced_https_status_label_Line").hide();
            $(".setup_advanced_router_global_label_Line").hide();

        }else{
            txtStatusObject[ROUTER_GLOBAL_ADDRESS].hide();
            txtStatusObject[ROUTER_GLOBAL_ADDRESS_VALUE].hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_RTSP_BUTTON].hide();
            $(".setup_status_router_global_address_label_show").show();
            txtStatusObject[HTTP_STATUS].show();
            txtStatusObject[HTTP_STATUS_VALUE].show();
            txtStatusObject[HTTP_PORT].show();
            txtStatusObject[HTTP_PORT_VALUE].show();
            btnAdvancedObject[SETUP_ADVANCED_MENU_HTTPS_BUTTON].show();
            $(".setup_advanced_menu_rtsp_button_show").show();
            $(".setup_advanced_menu_snmp_button_show").show();
            $(".setup_advanced_https_status_label_Line").show();
            $(".setup_advanced_router_global_label_Line").show();
            $(".setup_https_status_label_value").show();

        }
    }

    function getUpnpStatus() {
        var url = "/cgi-bin/get_status";
        var ret = cparam_sendRequest(url);
        if (ret.length > 0) {
            var resultArray = cparam_getRetArray(ret);
            for (var i = 0; i < resultArray.length; ++i) {
                if (resultArray[i].indexOf("http_port=") == 0) {
                    _upnp_port1 = resultArray[i].substring("http_port=".length);
                } else if (resultArray[i].indexOf("http_status=") == 0) {
                    _upnp_stat1 = resultArray[i].substring("http_status=".length);
                    _upnp_stat1 = _upnp_stat1[0].toUpperCase() + _upnp_stat1.slice(1);
                } else if (resultArray[i].indexOf("https_port=") == 0) {
                    _upnp_port2 = resultArray[i].substring("https_port=".length);
                } else if (resultArray[i].indexOf("https_status=") == 0) {
                    _upnp_stat2 = resultArray[i].substring("https_status=".length);
                    _upnp_stat2 = _upnp_stat2[0].toUpperCase() + _upnp_stat2.slice(1);
                } else if (resultArray[i].indexOf("addr=") == 0) {
                    gsGloAddr = resultArray[i].substring("addr=".length);
                }
            }
        }
    }

    /*
*MCモデル:HTTPS機能非対応
*MCモデル以外:HTTPS機能対応
*/
    function getDest() {
        var url = "/cgi-bin/get_dest";
        var ret = cparam_sendRequest(url);
        var result = "";
        if (ret) {
            if (ret.indexOf("dest=") == 0) {
                result = ret.substring("dest=".length);
            }
        }

        if (result == "MC") {
            return 0;
        }
        else {
            return 1;
        }

    }
    /**
     * callbackNetworkMenuSettingStatusボタン押下時の画面表示切替処理
     */
    function callbackNetworkMenuSettingStatus(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").show();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").hide();
            // $("#setup_advanced_https_inner").hide();
            // $("#setup_advanced_rtsp_inner").hide();
            // $("#setup_advanced_snmp_inner").hide();
            // $("#setup_advanced_tsl_inner").hide();
            // $("#setup_advanced_referer_inner").hide();
            // $("#setup_advanced_mDNS_inner").hide();
            // $("#setup_advanced_802_1x_inner").hide();
            // $("#setup_advanced_easyip_inner").hide();
            menuNetworkObject[SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON].displayOn();
            getSettingStatusValue();
        }
    }
    /**
     * callbackAdvancedMenuSettingStatusボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuSettingStatus(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").show();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON].displayOn();
            // getSettingStatusValue();
        }
    }

    /**
     * callbackAdvancedMenuRtspボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuRtsp(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").show();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON].displayOff();
            setSetupAdvancedRtspValueToEle();
        }
    }

    /**
     * callbackAdvancedMenuSNMPボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuSNMP(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").show();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            setSetupAdvancedSnmpValueToEle();
        }
    }
    /**
     * callbackAdvancedMenuTSLボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuTSL(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_tsl_inner").show();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            getSetupAdvancedTSLValue();
        }
    }
    function getSetupAdvancedTSLValue(){
        let obj = cparam_getTslInfo();
        inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT].val(obj.index);
        inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT].val(obj.port);
    }
    /**
     * callbackAdvancedMenuTSLボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuReferer(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_referer_inner").show();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            const mode = cparam_get_referer_mode();
            radioAdvancedButtonGroup[SETUP_ADVANCED_REFERER].setSelectedValue(mode.mode);
        }
    }
    /**
     * callbackAdvancedMenuTSLボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuMDNS(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_mDNS_inner").show();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            setSetupAdvancedmDNSValueToEle();
        }
    }
    /**
     * callbackAdvancedMenuTSLボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenu802_1X(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").show();
            $("#setup_advanced_easyip_inner").hide();
            if(Platform.isTouchMode()){
                destroy_802_1x_Scroll();
                build_802_1X_Scroll();
            }
            initAdvanced802_1xMenu();
            init802_1xStatus();
            //initEapAuthenticationStatus();
        }
    }
    /**
     * callbackAdvancedMenuTSLボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuEasyIp(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").show();
            const mode = cparam_get_easyip_mode();
            radioAdvancedButtonGroup[SETUP_ADVANCED_PLAIN_TEXT_USAGE].setSelectedValue(mode.mode);
            //initEapAuthenticationStatus();
        }
    }

    function initAdvanced802_1xMenu(){
        obj802 = get802_1x();
        radioAdvancedButtonGroup[SETUP_ADVANCED_802_1X].setSelectedValue(obj802.mode)
        radioAdvancedButtonGroup[SETUP_ADVANCED_EAP].setSelectedValue(obj802.eap_mode)
        radioAdvancedButtonGroup[SETUP_ADVANCED_CLIENT_TYPE].setSelectedValue(obj802.client_ca_type)
        radioAdvancedButtonGroup[SETUP_ADVANCED_PRIVATE_KEY_USAGE].setSelectedValue(obj802.pk_usage)
        inputAdvanced802Object[SETUP_ADVANCED_PRIVATE_KEY_PASSWORD].val(obj802.pk_pass);
        inputAdvanced802Object[SETUP_ADVANCED_TLS_USER_NAME].val(obj802.tls_name);
        inputAdvanced802Object[SETUP_ADVANCED_PEAP_USER].val(obj802.name);
        inputAdvanced802Object[SETUP_ADVANCED_PEAP_PASSWORD].val(obj802.password);
    }

    function setSetupAdvancedSnmpValueToEle(){
        let obj = cparam_getSnmpInfo();
        radioAdvancedButtonGroup[SETUP_ADVANCED_SNMP].setSelectedValue(obj.mode)
        if(obj.mode == 0){
            inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].displayDisabled();

            radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].displayDisabled();
            radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].displayDisabled();
        }else{
            inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].displayOff();

            radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].displayOff();
            radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].displayOff();
        }
        inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].val(obj.name);
        radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].setSelectedValue(obj.auth)
        radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].setSelectedValue(obj.enc)
        inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].val(obj.pass);
        inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].val(obj.system);
        inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].val(obj.location);
        inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].val(obj.contact);
    }

    /**
     * callbackAdvancedMenuNtpボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuNtp(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").show();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_MENU_NTP_BUTTON].displayOn();
            setSetupAdvancedNtpValueToEle();
        }
    }

    /**
     * callbackAdvancedMenuUpnpボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuUpnp(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").show();
            $("#setup_advanced_https_inner").hide();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON].displayOff();
            setSetupAdvancedUpnpValueToEle();
        }
    }

    /**
     * callbackAdvancedMenuHttpsボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMenuHttps(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            objHttps    = getHttps();
            giSelfSigne = selfSignedConvert(objHttps.self_signed_info);
            giCaSigne   = caCertConvert(objHttps.ca_cert_info);
            gsHttpsLive = objHttps.live;
            giHttpsPort = objHttps.https_port;
            giHttpsMode = objHttps.mode;
            objCsr      = getCsr();
            giCsr       = CsrConvert(objCsr.last_modified);
            objCrtKey   = getCrtKey();
            gsCrtKeyTime= objCrtKey.cur_key_last_modified;
            giRsaLength = (gsCrtKeyTime == "not_generated") ? 0 : objCrtKey.cur_key_size;
            gsPreKeyTime= objCrtKey.pre_key_last_modified;
            giPreRsaLength = (gsPreKeyTime == "not_generated") ? 0 : objCrtKey.pre_key_size;
            $("#setup_advanced_setting_status_inner").hide();
            $("#setup_advanced_ntp_inner").hide();
            $("#setup_advanced_upnp_inner").hide();
            $("#setup_advanced_https_inner").show();
            $("#setup_advanced_rtsp_inner").hide();
            $("#setup_advanced_snmp_inner").hide();
            $("#setup_advanced_tsl_inner").hide();
            $("#setup_advanced_referer_inner").hide();
            $("#setup_advanced_mDNS_inner").hide();
            $("#setup_advanced_802_1x_inner").hide();
            $("#setup_advanced_easyip_inner").hide();
            btnAdvancedObject[SETUP_ADVANCED_MENU_SETTING_STATUS_BUTTON].displayOff();
            setSetupAdvancedHttpsValueToEle();
            selectObject.val(objHttps.mode);
        }
    }

    /****************************NTP******************************/

    function setSetupAdvancedNtpValueToEle() {
        var ntpInfo = getNtpTime();
        setupAdvancedNtpAddressSettingToSelect(ntpInfo);
        setupAdvancedNtpIntervalToSelect(ntpInfo);
        setSetupAdvancedNtpValueToInput(ntpInfo);
        setSetupAdvancedNtpValueToRadio(ntpInfo);
        NtpServerAddrGet();
        ChangeNTP();
    }

    function setupAdvancedNtpAddressSettingToSelect(ntpInfo) {
        var select_advanced_ntp_address_value = [];
        var select_advanced_ntp_address_text = [];
        select_advanced_ntp_address_value.push(
            1,
            0
        );
        select_advanced_ntp_address_text.push(
            "Auto",
            "Manual"
        );
        selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].appendOptions(select_advanced_ntp_address_value, select_advanced_ntp_address_text);
        cpage_initSelect(document.getElementsByName("ntp_addr_dhcp")[0], ntpInfo.ntp_addr_dhcp, 1);
    }

    function setupAdvancedNtpIntervalToSelect(ntpInfo) {
        var select_advanced_ntp_interval_value = [];
        var select_advanced_ntp_interval_text = [];

        for (var iIndex = 1; iIndex <= 24; iIndex++) {
            select_advanced_ntp_interval_text[iIndex - 1] = iIndex + "h";
            select_advanced_ntp_interval_value[iIndex - 1] = iIndex;
        }
        selectAdvancedObject[SETUP_ADVANCED_NTP_INTERVAL_SELECT].appendOptions(select_advanced_ntp_interval_value, select_advanced_ntp_interval_text);
        cpage_initSelect(document.getElementsByName("ntp_interval")[0], ntpInfo.ntp_interval, 0);
    }

    function setSetupAdvancedNtpValueToInput(ntpInfo) {
        cpage_initValueNull(document.getElementsByName("ntp_addr")[0], ntpInfo.ntp_addr, "");
        cpage_initValueNull(document.getElementsByName("ntp_port")[0], ntpInfo.ntp_port, "");
    }

    function setSetupAdvancedNtpValueToRadio(ntpInfo) {
        radioAdvancedButtonGroup[SETUP_ADVANCED_NTP_SYMCHRONIZATION].setSelectedValue(checkRadioValue(ntpInfo.time_adjust, "0") ? "0" : "1");
    }

    /**
     * callbackAdvancedNtpSetボタン押下時の画面表示切替処理
     */
    function callbackAdvancedNtpSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            NtpDoSubmit();
        }
    }

    function callbackSetupAdvancedNtpSymchronization() {
        ChangeNTP();
    }

    function NtpServerAddrGet() {
        var bDisabled;
        var iNtpSelect = selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].get();
        if (iNtpSelect == 1) {
            bDisabled = true;
            inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].displayDisabled();
        }
        else {
            bDisabled = false;
            inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].displayOff();
        }
    }

    function ChangeNTP() {
        if (radioAdvancedButtonGroup[SETUP_ADVANCED_NTP_SYMCHRONIZATION].getSelectedValue() == "0") {
            selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT].displayDisabled();
            selectAdvancedObject[SETUP_ADVANCED_NTP_INTERVAL_SELECT].displayDisabled();
        }
        else if (radioAdvancedButtonGroup[SETUP_ADVANCED_NTP_SYMCHRONIZATION].getSelectedValue() == "1") {
            selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].displayOff();
            if (selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].get() == "0") {
                inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].displayOff();
            }
            inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT].displayOff();
            selectAdvancedObject[SETUP_ADVANCED_NTP_INTERVAL_SELECT].displayOff();
        }
    }

    function NtpDoSubmit() {
        if (!CheckNtpForm()) {
            gbAct = false;
            return false;
        }
        $("#dialog_setup").show();
        $.ajax({
            type: "post",
            url: "/cgi-bin/time",
            data: getAdvancedNtpFormData(),
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }

    function getAdvancedNtpFormData() {
        var data = {};
        data['time_adjust'] = radioAdvancedButtonGroup[SETUP_ADVANCED_NTP_SYMCHRONIZATION].getSelectedValue();
        data['ntp_addr_dhcp'] = selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].get();
        data['ntp_addr'] = inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].get();
        data['ntp_port'] = inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT].get();
        data['ntp_interval'] = selectAdvancedObject[SETUP_ADVANCED_NTP_INTERVAL_SELECT].get();
        return data;
    }

    function CheckNtpForm() {
        if (radioAdvancedButtonGroup[SETUP_ADVANCED_NTP_SYMCHRONIZATION].getSelectedValue() == "1") {
            if (selectAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_SETTING_SELECT].get() == "0") {
                if (inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].get().length != 0) {
                    if (!chknet_ServerAddress(inputAdvancedObject[SETUP_ADVANCED_NTP_ADDRESS_TXT_INPUT].get())) {
                        return capi_DispError(document.getElementsByName("ntp_addr")[0], objErrCode);
                    }
                }
            }
            if (inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT].get().length != 0) {
                if (!chknet_portNo(inputAdvancedObject[SETUP_ADVANCED_NTP_PORT_INPUT].get(), NPTZ_WORDING.wID_0133, 1)) {
                    return capi_DispError(document.getElementsByName("ntp_port")[0], objErrCode);
                }
            }
        }
        return true;
    }

    function getNtpTime() {
        var url = "/cgi-bin/get_time";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("time_adjust=") == 0) {
                    result.time_adjust = ret[i].substring("time_adjust=".length);
                    continue;
                }
                if (ret[i].indexOf("ntp_addr_dhcp=") == 0) {
                    result.ntp_addr_dhcp = ret[i].substring("ntp_addr_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ntp_addr=") == 0) {
                    result.ntp_addr = ret[i].substring("ntp_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ntp_port=") == 0) {
                    result.ntp_port = ret[i].substring("ntp_port=".length);
                    continue;
                }
                if (ret[i].indexOf("ntp_interval=") == 0) {
                    result.ntp_interval = ret[i].substring("ntp_interval=".length);
                }
            }
        }
        return result;
    }

    /****************************UPnP******************************/

    function setSetupAdvancedUpnpValueToEle() {
        const upnp = getUpnp();
        setSetupAdvancedUpnpValueToRadio(upnp);
    }
    function setSetupAdvancedmDNSValueToEle() {
        const mDNS = getmDNS();
        inputAdvancedObject[SETUP_ADVANCED_M_DNS_INPUT].val(mDNS.host_name);
    }
    /**
     * callbackAdvancedUpnpSetボタン押下時の画面表示切替処理
     */
    function callbackAdvancedMdnsSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            const name = inputAdvancedObject[SETUP_ADVANCED_M_DNS_INPUT].get();
            var regu = "^[a-zA-Z0-9-\\s]*$";
            var re = new RegExp(regu);
            if (re.test(name)) {
                var data = {};
                data['host_name'] = name;
                $("#dialog_setup").show();
                $.ajax({
                    type: "get",
                    url: "/cgi-bin/set_mdns_host",
                    data: data,
                    success: function (data) {
                        setTimeout(function(){
                            $("#dialog_setup").hide();
                        },500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function(){
                            $("#dialog_setup").hide();
                        },500);
                    }
                });
            }else{
                objErrCode = MSG_STATUS.mID_00102;
                return capi_DispError(inputAdvancedObject[SETUP_ADVANCED_M_DNS_INPUT].getInputObject(), objErrCode);
            }
        }
    }
    /**
     * callbackAdvancedUpnpSetボタン押下時の画面表示切替処理
     */
    function callbackAdvancedUpnpSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            UpnpDoSubmit();
        }
    }

    function UpnpDoSubmit() {
        $("#dialog_setup").show();
        $.ajax({
            type: "post",
            url: "/cgi-bin/upnp",
            data: getAdvancedUpnpFormData(),
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }

    function getAdvancedUpnpFormData() {
        var data = {};
        data['upnp_portmap'] = radioAdvancedButtonGroup[SETUP_ADVANCED_UPNP_AUTO_PORT].getSelectedValue();
        return data;
    }
    
    function callbackUpnpAutoPort() {
        
    }
    function callbackSnmpMode(){
        if(radioAdvancedButtonGroup[SETUP_ADVANCED_SNMP].getSelectedValue() == 0){
            inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].displayDisabled();

            radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].displayDisabled();
            radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].displayDisabled();
        }else{
            inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].displayOff();
            radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].displayOff();
            radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].displayOff();
        }
    }

    function callbackReferer(){
        const mode = radioAdvancedButtonGroup[SETUP_ADVANCED_REFERER].getSelectedValue();
        if(mode == 1){
            jConfirm(MSG_STATUS.mID_0097, NPTZ_WORDING.wID_0001,NPTZ_WORDING.wID_0002, function(confirm) {
                if(confirm) {
                    setAdvancedRefererCheck(mode);
                }else{
                    radioAdvancedButtonGroup[SETUP_ADVANCED_REFERER].setSelectedValue(0)
                }
            })
        }else{
            setAdvancedRefererCheck(mode);
        }

    }
    function callbackEasyIpChange(){

    }

    function callbackEasyIpSetup(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            const mode = radioAdvancedButtonGroup[SETUP_ADVANCED_PLAIN_TEXT_USAGE].getSelectedValue();
            setAdvancedEasyIpSetup(mode);
        }
    }
    function setAdvancedEasyIpSetup(mode){
        $("#dialog_setup").show();
        $.ajax({
            type: "get",
            url: "/cgi-bin/set_iesc_plaintext_mode?mode="+mode,
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }
    function setAdvancedRefererCheck(mode){
        $("#dialog_setup").show();
        $.ajax({
            type: "get",
            url: "/cgi-bin/set_referer_mode",
            data: {"mode":mode},
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }

    function setSetupAdvancedUpnpValueToRadio(upnp) {
        radioAdvancedButtonGroup[SETUP_ADVANCED_UPNP_AUTO_PORT].setSelectedValue(checkRadioValue(upnp.upnp_portmap, "0") ? "0" : "1");
    }

    function getUpnp() {
        var url = "/cgi-bin/get_upnp";
        var ret = cparam_sendRequest(url);
        var result = {};
        result.upnp_portmap = "";
        if (ret) {
            if (ret.indexOf("upnp_portmap=") == 0) {
                result.upnp_portmap = ret.substring("upnp_portmap=".length);
            }
        }
        return result;
    }
    function getmDNS() {
        var url = "/cgi-bin/get_mdns_host";
        var ret = cparam_sendRequest(url);
        var result = {};
        result.host_name = "";
        if (ret) {
            if (ret.indexOf("host_name=") == 0) {
                result.host_name = ret.substring("host_name=".length);
            }
        }
        return result;
    }
    /****************************HTTPS******************************/
    function setSetupAdvancedHttpsValueToEle() {
        getHttpsValue();
        setSetupAdvancedHttpsValueToSelectConnection();
        setSetupAdvancedHttpsValueToInput();
        InitHttpsBtnDisable();
    }

    function setSetupAdvancedHttpsValueToSelectConnection() {
        var select_advanced_https_connection_value = [];
        var select_advanced_https_connection_text = [];
        select_advanced_https_connection_value.push(
            "http",
            "https"
        );
        select_advanced_https_connection_text.push(
            "HTTP",
            "HTTPS"
        );
        selectAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_SELECT].appendOptions(select_advanced_https_connection_value, select_advanced_https_connection_text);
        selectAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_SELECT].val(gsHttpsLive);
    }

    function setSetupAdvancedHttpsValueToInput() {
        cpage_initValueNull(f.https_port, giHttpsPort, "443");
    }

    function getHttpsValue() {
        gsCrtKeyTime = objCrtKey.cur_key_last_modified;
        giRsaLength = (gsCrtKeyTime == "not_generated") ? 0 : objCrtKey.cur_key_size;
        gsPreKeyTime = objCrtKey.pre_key_last_modified;
        giPreRsaLength = (gsPreKeyTime == "not_generated") ? 0 : objCrtKey.pre_key_size;
        SetSelfSigne();
        setFileName();
        SetCaSigne();

        objErrCode = MSG_STATUS.mID_0001;
    }

    function SetSelfSigne() {
        var iSelfSigne = giSelfSigne;
        var sHost = objHttps.self_signed_info;
        var sCharacter = "";
        var sDivChar1 = "";
        var sDivChar2 = "";
        if (iSelfSigne == 0) {
            sCharacter = NPTZ_WORDING.wID_0152;
        }
        else if (iSelfSigne == 1) {
            sCharacter = "Invalid  (Reason: CA Certificate installed)";
        }
        else if (iSelfSigne == 2) {
            if (sHost.length > 19) {
                sDivChar1 = sHost.slice(0, 19);
                if (sHost.length <= 38) {
                    sDivChar2 = sHost.slice(19, 38);
                }
                else {
                    sDivChar2 = sHost.slice(19, 38) + "...";
                }
                sCharacter = sDivChar1 + sDivChar2;
            }
            else {
                sCharacter = sHost;
            }
        }
        else {
            sCharacter = "Expired";
        }
        if (iSelfSigne != 2) {
            if (sCharacter.length > 32) {
                sDivChar1 = sCharacter.slice(0, 32);
                sDivChar2 = sCharacter.slice(32);
                sCharacter = sDivChar1 + sDivChar2;
            }
        }
        txtAdvancedObject[SETUP_ADVANCED_HTTPS_NOT_GENERATED_LABEL].set(sCharacter);
    }

    function setFileName() {
        var sFileName = "";
        var sDivChar;
        var sDivChar1 = "";
        var sDivChar2 = "";
        if (sFileName.length > 33) {
            sDivChar1 = sFileName.slice(0, 33);
            if (sFileName.length <= 66) {
                sDivChar2 = sFileName.slice(33, 66);
            }
            else {
                sDivChar2 = sFileName.slice(33, 65) + "...";
            }
            sDivChar = sDivChar1 + "<br>" + sDivChar2;
        }
        else {
            sDivChar = sFileName;
        }
        inputAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_INPUT].set(sDivChar);
    }

    function SetCaSigne() {
        var iCaSigne = giCaSigne;
        var sHost = objHttps.ca_cert_info;
        var sCharacter = "";
        var sDivChar1 = "";
        var sDivChar2 = "";
        if (iCaSigne == 0) {
            sCharacter = NPTZ_WORDING.wID_0153;
        }
        else if (iCaSigne == 1) {
            sCharacter = NPTZ_WORDING.wID_0153;
        }
        else if (iCaSigne == 2) {
            if (sHost.length > 19) {
                sDivChar1 = sHost.slice(0, 19);
                if (sHost.length <= 38) {
                    sDivChar2 = sHost.slice(19, 38);
                }
                else {
                    sDivChar2 = sHost.slice(19, 38) + "...";
                }
                sCharacter = sDivChar1 + "<br>" + sDivChar2;
            }
            else {
                sCharacter = sHost;
            }
        }
        else {
            sCharacter = "Expired";
        }
        if (iCaSigne != 2) {
            if (sCharacter.length > 32) {
                sDivChar1 = sCharacter.slice(0, 32);
                sDivChar2 = sCharacter.slice(32);
                sCharacter = sDivChar1 + "<br>" + sDivChar2;
            }
        }
        txtAdvancedObject[SETUP_ADVANCED_HTTPS_INVALID_LABEL].set(sCharacter);
    }

    /**
     * callbackAdvancedHttpsExecuteボタン押下時の画面表示切替処理
     */
    function callbackAdvancedHttpsExecute(mouse, num) {
        if (mouse == Button.MOUSE_DOWN) {
            if (num === SETUP_ADVANCED_HTTPS_CRT_KEY_EXECUTE_BUTTON) {
                DoUpdate();
            } else if (num === SETUP_ADVANCED_HTTPS_GENERATE_EXECUTE_BUTTON) {
                DoGene(1);
            } else if (num === SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_EXECUTE_BUTTON) {
                DoGene(2);
            } else if (num === SETUP_ADVANCED_HTTPS_INSTALL_EXECUTE_BUTTON) {
                FileSelectDialog();
            }
        }
    }

    /**
     * callbackAdvancedHttpsConfirmボタン押下時の画面表示切替処理
     */
    function callbackAdvancedHttpsConfirm(mouse, num) {
        if (mouse == Button.MOUSE_DOWN) {
            if (num === SETUP_ADVANCED_HTTPS_INFORMATION_CONFIRM_BUTTON) {
                DoConf(1);
            } else if (num === SETUP_ADVANCED_HTTPS_INFORMATION2_CONFIRM_BUTTON) {
                DoConf(2);
            }

        }
    }

    /**
     * callbackAdvancedHttpsDeleteボタン押下時の画面表示切替処理
     */
    function callbackAdvancedHttpsDelete(mouse, num) {
        if (mouse == Button.MOUSE_DOWN) {
            if (num === SETUP_ADVANCED_HTTPS_INFORMATION_DELETE_BUTTON) {
                DoDelete(1);
            } else if (num === SETUP_ADVANCED_HTTPS_INFORMATION2_DELETE_BUTTON) {
                DoDelete(2);
            }
        }
    }

    function DoDelete(iParam) {
        var iSelfSigne = giSelfSigne;
        var iCaSigne = giCaSigne;

        if ( iParam == 1 ) {
            if ((( iSelfSigne >= 1 ) && ( gsHttpsLive == "http" )) || (( iSelfSigne >= 1 ) && ( gsHttpsLive == "https" ) && ( iCaSigne >= 2 ))) {
            } else {
                return false;
            }
            jConfirm(MSG_STATUS.mID_0059, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                if ( confirm ) {
                    document.getElementById("G").src = "/cgi-bin/https_self_signed?mode=delete";
                    getHttpsStatus();
                }
            });
        }
        else if ( iParam == 2 ) {
            if (( iCaSigne >= 2 ) && ( gsHttpsLive == "http" )) {
            } else {
                return false;
            }
            jConfirm(MSG_STATUS.mID_0053, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                if ( confirm ) {
                    document.getElementById("G").src = "/cgi-bin/https_signed?mode=delete";
                    getHttpsStatus();
                }
            });
        }
    }

    function getHttpsStatus(){
        setTimeout(function(){
            gbAct = true;
            objHttps    = getHttps();
            giSelfSigne = selfSignedConvert(objHttps.self_signed_info);
            giCaSigne   = caCertConvert(objHttps.ca_cert_info);
            gsHttpsLive = objHttps.live;
            giHttpsPort = objHttps.https_port;
            objCsr      = getCsr();
            giCsr       = CsrConvert(objCsr.last_modified);
            objCrtKey   = getCrtKey();
            gsCrtKeyTime= objCrtKey.cur_key_last_modified;
            giRsaLength = (gsCrtKeyTime == "not_generated") ? 0 : objCrtKey.cur_key_size;
            gsPreKeyTime= objCrtKey.pre_key_last_modified;
            giPreRsaLength = (gsPreKeyTime == "not_generated") ? 0 : objCrtKey.pre_key_size;
            setTimeout(function(){
                SetSelfSigne();
                setSetupAdvancedHttpsValueToEle();
                if ("undefined" != typeof(objWindow)) {
                    objWindow.close();
                }
            },500)
        }, 500);
    }

    /**
     * callbackAdvancedHttpsSelectボタン押下時の画面表示切替処理
     */
    function callbackAdvancedHttpsSelect(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            setup_advanced_https_file.click();
        }
    }
    /**
     * callbackAdvancedHttpsSelectボタン押下時の画面表示切替処理
     */
    function callbackAdvanced_802_1x_Btn(mouse,index) {
        if (mouse == Button.MOUSE_DOWN) {
            if(index == SETUP_ADVANCED_MENU_802_1_X_CLIENT_SELECT){
                setup_advanced_802_1x_file.click();
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_CA_SELECT){
                setup_advanced_802_1x_ca_file.click();
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_CLIENT_EXECUTE){
                FileSelect802ClientDialog();
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_CA_EXECUTE){
                FileSelect802CaDialog();
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_CONFIRM){
                go802ConfirmPage("Client");
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_CONFIRM){
                go802ConfirmPage("CA");
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_TLS_INFORMATION_DELETE){
                jConfirm(MSG_STATUS.mID_00102, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                    if ( confirm ) {
                        document.getElementById("G").src = "/cgi-bin/802_cli_signed?mode=delete";
                        //getHttpsStatus();
                    }
                });
            }else if(index == SETUP_ADVANCED_MENU_802_1_X_PEAP_INFORMATION_DELETE){
                jConfirm(MSG_STATUS.mID_0053, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                    if ( confirm ) {
                        document.getElementById("G").src = "/cgi-bin/802_ca_signed?mode=delete";
                        //getHttpsStatus();
                    }
                });
            }

        }
    }

    function go802ConfirmPage(index){
        let openurl
        if(index == "Client"){
            openurl = "/live/setup_network_802_1x_info.html?client";
        }else{
            openurl = "/live/setup_network_802_1x_info.html";
        }

        const name = "https_signed" + _mac_disp.replace(/-/g, "");
        let style;
        if (Platform.isTouchMode()) {
            style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=742,height=880,top=70,left=162";
        }else{
            style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=740,height=370,top=70,left=162";
        }
        objWindow = window.open(openurl, name, style);
        objWindow.focus();
    }

    function getCaSigned() {
        var url = "/cgi-bin/802_client_signed";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("get_info=") == 0) {
                    result.get_info = ret[i].substring("get_info=".length);
                }
                if (ret[i].indexOf("delete=") == 0) {
                    result.delete = ret[i].substring("delete=".length);
                }
            }
        }
        return result;
    }
    /*FileSelectDialog*/
    function FileSelect802ClientDialog() {
        // var obj = getCaSigned();
        // if (iCsr >= 1) {
        // }
        // else {
        //     return false;
        // }
        var objFile = f.fileName[1];
        var gsfileList = objFile.value.split("\\");
        if (!chkfile_installFilename(gsfileList[gsfileList.length - 1])) {
            capi_DispError(objFile, objErrCode);
            gbAct = false;
            return false;
        }
        // if (gsHttpsLive == "https") {
        //     var bRet = jConfirm(MSG_STATUS.mID_0040, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040);
        //     if (!bRet) {
        //         gbAct = false;
        //         return false;
        //     }
        // }
        else {
            //objWindow = window.open('/live/signed_install_disp.html?client', 'name', 'menubar=no,toolbar=no,status=no,resizable=no,width=700,height=560,top=104,left=162');
            // try {
            //     with (document.forms["setup_advance_form_802_client_select"]) {
            //         method = "post";
            //         action = "/cgi-bin/802_cli_install_signed";
            //         target = "FrameHide";
            //         submit();
            //     }
            // }
            // catch (e) {
            //     gbAct = false;
            //     return false;
            // }
            // let option = {
            //     url : "/cgi-bin/802_cli_install_signed",
            //     type : 'POST',
            //     dataType : 'json',
            //     headers: { 'Content-Type': false },
            //     success : function(data) {
            //         console.log('success')

            //     },
            //     error: function(data) {
            //         console.log('error');
            //     }
            // };
            // $("#setup_advance_form_802_client_select").ajaxSubmit(option);

            var formData = new FormData();
            formData.append("fileName",$("#setup_advanced_client_install_input_file")[0].files[0]);
            $("#dialog_setup").show();
            $.ajax({
                url:'/cgi-bin/802_cli_install_signed',
                type:'post',
                data: formData,
                contentType: false,
                processData: false,
                success:function(res){
                    $("#dialog_setup").hide();
                },
                error: function(data) {
                    $("#dialog_setup").hide();
                }
            })
        }
    }

    /*FileSelectDialog*/
    function FileSelect802CaDialog() {
        // var obj = getCaSigned();
        // if (iCsr >= 1) {
        // }
        // else {
        //     return false;
        // }
        var objFile = f.fileName[2];
        var gsfileList = objFile.value.split("\\");
        if (!chkfile_installFilename(gsfileList[gsfileList.length - 1])) {
            capi_DispError(objFile, objErrCode);
            gbAct = false;
            return false;
        }
            // if (gsHttpsLive == "https") {
            //     var bRet = jConfirm(MSG_STATUS.mID_0040, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040);
            //     if (!bRet) {
            //         gbAct = false;
            //         return false;
            //     }
        // }
        else {
            //objWindow = window.open('/live/signed_install_disp.html', 'name', 'menubar=no,toolbar=no,status=no,resizable=no,width=700,height=560,top=104,left=162');
            // var option = {
            //     url : "/cgi-bin/802_ca_install_signed",
            //     type : 'POST',
            //     dataType : 'json',
            //     headers: { 'Content-Type': false },
            //     success : function(data) {
            //         console.log('success')

            //     },
            //     error: function(data) {
            //         console.log('error');
            //     }
            // };
            // $("#setup_advance_form_802_ca_select").ajaxSubmit(option);
            var formData = new FormData();
            formData.append("fileName",$("#setup_advanced_ca_install_input_file")[0].files[0]);
            $("#dialog_setup").show();
            $.ajax({
                url:'/cgi-bin/802_ca_install_signed',
                type:'post',
                data: formData,
                contentType: false,
                processData: false,
                success:function(res){
                    $("#dialog_setup").hide();
                    //jAlert(MSG_STATUS.mID_00103, NPTZ_WORDING.wID_0039);
                },
                error: function(data) {
                    $("#dialog_setup").hide();
                }
            })
            return false;
        }
    }
    function CsrConvert(Csr) {
        var csrIndex = 0;

        if (Csr != "not_generated") {
            // CSR作成済みとして扱う
            csrIndex = 1;
        }
        else {
            csrIndex = 0;
        }
        return csrIndex;
    }
    /**
     * callbackAdvancedHttpSetボタン押下時の画面表示切替処理
     */
    function callbackAdvancedHttpsSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {

            HttpsDoSubmit();
        }
    }

    function HttpsDoSubmit() {
        if (giApf == "1") {
            if (( giHttpsPort != f.https_port.value ) || (gsHttpsLive != f.live.value)) {
                gbAct = false;
                alert("Cannot be setting.\n\"Auto port forwarding\" is selected for \"On\".\nWhen change \"HTTP port\" or \"Connection\", it is necessary to \"Auto port forwarding\" is set to \"Off\".");
                return false;
            }
        }
        if (CheckHttps()) {
            if (SettingChangeHttps()) {
                jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039,NPTZ_WORDING.wID_0040,function(confirm){
                    if ((f.live.selectedIndex == 1) && (gsPriority == 1)) {
                        jConfirm(MSG_STATUS.mID_0041, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                            if (confirm) {
                                return false;
                            }
                        });

                    }
                    if(confirm){
                        $.ajax({
                            type: "post",
                            url: "/cgi-bin/set_https",
                            data: getAdvancedHttpsFormData(),
                            success: function (data) {
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                            }
                        });
                    }
                });
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    function SettingChangeHttps() {
        if ( ((gsHttpsLive == "http") && (f.live.selectedIndex != 0)) ||
            ((gsHttpsLive == "https") && (f.live.selectedIndex != 1)) ||
            ((gsHttpsLive == "dual") && (f.live.selectedIndex != 2)) )  {
            return true;
        }
        if ( giHttpsPort != f.https_port.value || giHttpsMode != f.select_setting_https_tls.value)  {
            return true;
        }
        return false;
    }

    function CheckHttps() {
        if ( ! chknet_portNo( f.https_port.value, "HTTPS", ghttpsmode) ) {
            return capi_DispError( f.https_port, objErrCode );
        }
        if ( ! chknet_portSysResvdNo( f.https_port.value ) ) {
            return capi_DispError( f.https_port, objErrCode );
        }
        if(! chknet_portUsedNo(f.https_port.value, 0, 0, 0, cparams.rtsp_port, cparams.http_port)) {
            return capi_DispError(f.https_port, objErrCode);
        }
        return true;
    }

    function getAdvancedHttpsFormData() {
        var data = {};
        data['live'] = selectAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_SELECT].get();
        data['https_port'] = inputAdvancedObject[SETUP_ADVANCED_HTTPS_PORT_INPUT].get();
        data['https_mode'] = selectObject.get();
        gsHttpsLive = data['live'];
        giHttpsPort = data['https_port'];
        giHttpsMode = data['https_mode'];
        httpsPort = data['https_port'];
        return data;
    }

    var gbAct = false;
    var giApf = "%apf%";
    var ghttpsmode = 1;
    var gsPriority = "%pu_env%";
    var _mac_disp = cparams.macadr.replace(/:/g, "-");
    function DoUpdate() {
        if ("undefined" != typeof(objWindow)) {
            try{
                objWindow.close();
            }catch(e){

            }

        }
        var isTouch = sessionStorage.isTouchMode == 'true' ? true : false;
        if(isTouch){
            objWindow = window.open('/live/setup_network_crtkey_change.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=750,height=500,top=70,left=162');
        }else{
            objWindow = window.open('/live/setup_network_crtkey_change.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=750,height=350,top=70,left=162');
        }
    }

    function DoGene(iParam) {
        var iRsaLength = giRsaLength;
        var iCsrStat = "%csr_sts%";
        var isTouch = sessionStorage.isTouchMode == 'true' ? true : false;
        if (iParam == 1) {
            if (( gsHttpsLive == "https" ) || ( iRsaLength == 0 )) {
                return false;
            }
            else {
            }
            if(isTouch){
                objWindow = window.open('/live/setup_network_self_signed_create.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=730,height=780,top=104,left=162');
            }else{
                objWindow = window.open('/live/setup_network_self_signed_create.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=700,height=530,top=104,left=162');
            }
            getAdvanceHttpsBtnStatus();
        }
        else if (iParam == 2) {
            if (iRsaLength == 0) {
                return false;
            } else {
            }
            if (iCsrStat != 3) {
                if(isTouch){
                    objWindow = window.open('/live/setup_network_ca_signed_create.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=740,height=880,top=70,left=162');
                }else{
                    objWindow = window.open('/live/setup_network_ca_signed_create.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=740,height=570,top=70,left=162');
                }
            }
            else if (window.confirm("Generation of the Certificate Signing Request has been completed. \nRegenerate?\nAfter regenerating, the current CA Certificate may become unavailable.")) {
                if(isTouch){
                    objWindow = window.open('/live/setup_network_ca_signed_create.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=740,height=880,top=70,left=162');
                }else{
                    objWindow = window.open('/live/setup_network_ca_signed_create.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=740,height=570,top=70,left=162');
                }
            }
        }
    }

    function getAdvanceHttpsBtnStatus(){
        setTimeout(function(){
            gbAct = true;
            objHttps    = getHttps();
            giSelfSigne = selfSignedConvert(objHttps.self_signed_info);
            giCaSigne   = caCertConvert(objHttps.ca_cert_info);
            gsHttpsLive = objHttps.live;
            giHttpsPort = objHttps.https_port;
            objCsr      = getCsr();
            giCsr       = CsrConvert(objCsr.last_modified);
            objCrtKey   = getCrtKey();
            gsCrtKeyTime= objCrtKey.cur_key_last_modified;
            giRsaLength = (gsCrtKeyTime == "not_generated") ? 0 : objCrtKey.cur_key_size;
            gsPreKeyTime= objCrtKey.pre_key_last_modified;
            giPreRsaLength = (gsPreKeyTime == "not_generated") ? 0 : objCrtKey.pre_key_size;
            setTimeout(function(){
                SetSelfSigne();
                setSetupAdvancedHttpsValueToEle();
            },1000)
        }, 1000);
    }

    function FileSelectDialog() {
        var iCsr = giCsr;
        if (iCsr >= 1) {
        }
        else {
            return false;
        }
        var objFile = f.fileName[0];
        gsfileList = objFile.value.split("\\");
        if (!chkfile_installFilename(gsfileList[gsfileList.length - 1])) {
            capi_DispError(objFile, objErrCode);
            gbAct = false;
            return false;
        }
        if (gsHttpsLive == "https") {
            var bRet = jConfirm(MSG_STATUS.mID_0040, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040);
            if (!bRet) {
                gbAct = false;
                return false;
            }
        }
        else {
            var name = "https_signe" + _mac_disp.replace(/-/g, "");
            objWindow = window.open('/live/signed_install_disp.html', '_blank', 'menubar=no,toolbar=no,status=no,resizable=no,width=700,height=560,top=104,left=162');
            try {
                with (document.forms["setup_advance_form_select"]) {
                    method = "post";
                    action = "/cgi-bin/https_install_signed";
                    target = "FrameHide";
                    submit();
                }
            }
            catch (e) {
                gbAct = false;
                return false;
            }
        }
    }

    function selfSignedConvert(selfSigned) {
        var signIndex = 0;
        switch (selfSigned) {
            case "not_generated":
                signIndex = 0;
                break;
            case "invalid":
                signIndex = 1;
                break;
            default:
                signIndex = 2;
                break;
        }
        return signIndex;
    }

    function getHttps() {
        var url = "/cgi-bin/get_https";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("live=") == 0) {
                    result.live = ret[i].substring("live=".length);
                    continue;
                }
                if (ret[i].indexOf("https_port=") == 0) {
                    result.https_port = ret[i].substring("https_port=".length);
                    continue;
                }
                if (ret[i].indexOf("self_signed_info=") == 0) {
                    result.self_signed_info = ret[i].substring("self_signed_info=".length);
                    continue;
                }
                if (ret[i].indexOf("ca_cert_info=") == 0) {
                    result.ca_cert_info = ret[i].substring("ca_cert_info=".length);
                }
                if (ret[i].indexOf("mode=") == 0) {
                    result.mode = ret[i].substring("mode=".length);
                }
            }
        }
        return result;
    }
    function get802_1x() {
        var url = "/cgi-bin/get_802";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("mode=") == 0) {
                    result.mode = ret[i].substring("mode=".length);
                    continue;
                }
                if (ret[i].indexOf("eap_mode=") == 0) {
                    result.eap_mode = ret[i].substring("eap_mode=".length);
                    continue;
                }
                if (ret[i].indexOf("client_ca_type=") == 0) {
                    result.client_ca_type = ret[i].substring("client_ca_type=".length);
                    continue;
                }
                if (ret[i].indexOf("pk_usage=") == 0) {
                    result.pk_usage = ret[i].substring("pk_usage=".length);
                }
                if (ret[i].indexOf("pk_pass=") == 0) {
                    result.pk_pass = ret[i].substring("pk_pass=".length);
                }
                if (ret[i].indexOf("name=") == 0) {
                    result.name = ret[i].substring("name=".length);
                }
                if (ret[i].indexOf("password=") == 0) {
                    result.password = ret[i].substring("password=".length);
                }
                if (ret[i].indexOf("tls_name=") == 0) {
                    result.tls_name = ret[i].substring("tls_name=".length);
                }
            }
        }
        return result;
    }
    function caCertConvert(caCert) {
        var caIndex = 0;
        switch (caCert) {
            case "invalid":
                caIndex = 0;
                break;
            case "expired":
                caIndex = 3;
                break;
            default:
                caIndex = 2;
                break;
        }
        return caIndex;
    }

    function getCsr() {
        var url = "/cgi-bin/https_signed?mode=get_info";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("last_modified=") == 0) {
                    result.last_modified = ret[i].substring("last_modified=".length);
                }
            }
        }
        return result;
    }

    function CsrConvert(Csr) {
        var csrIndex = 0;

        if (Csr != "not_generated") {
            // CSR作成済みとして扱う
            csrIndex = 1;
        }
        else {
            csrIndex = 0;
        }
        return csrIndex;
    }

    function getCrtKey() {
        var url = "/cgi-bin/get_crt_key";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("cur_key_size=") == 0) {
                    result.cur_key_size = ret[i].substring("cur_key_size=".length);
                    continue;
                }
                if (ret[i].indexOf("cur_key_last_modified=") == 0) {
                    result.cur_key_last_modified = ret[i].substring("cur_key_last_modified=".length);
                    continue;
                }
                if (ret[i].indexOf("pre_key_size=") == 0) {
                    result.pre_key_size = ret[i].substring("pre_key_size=".length);
                    continue;
                }
                if (ret[i].indexOf("pre_key_last_modified=") == 0) {
                    result.pre_key_last_modified = ret[i].substring("pre_key_last_modified=".length);
                }
            }
        }
        return result;
    }

    function DoConf(iParam) {
        var iCaSigne = giCaSigne;
        var iSelfSigne = giSelfSigne;
        var openurl = "";
        var name = "";
        var style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=830,height=480,top=104,left=162";
        if (iParam == 1) {
            if (iSelfSigne >= 1) {
            }
            else {
                return false;
            }
            openurl = "/live/setup_network_self_signed_info.html";
            name = "https_self_signed" + _mac_disp.replace(/-/g, "");
            if (Platform.isTouchMode()) {
                style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=810,height=870,top=70,left=162";
            }else{
                style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=810,height=430,top=70,left=162";
            }

        }
        else if (iParam == 2) {
            if (iCaSigne != 0) {
            }
            else {
                return false;
            }
            openurl = "/live/setup_network_ca_signed_info.html";
            name = "https_signed" + _mac_disp.replace(/-/g, "");
            if (Platform.isTouchMode()) {
                style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=742,height=880,top=70,left=162";
            }else{
                style = "menubar=no,toolbar=no,scrollbars=no,status=no,resizable=no,width=740,height=370,top=70,left=162";
            }
        }
        objWindow = window.open(openurl, name, style);
        objWindow.focus();
    }

    function InitHttpsBtnDisable() {
        var iSelfSigne = giSelfSigne;
        var iCaSigne = giCaSigne;
        var iRsaLength = giRsaLength;
        var iCsr = giCsr;

        // Self-signed Certificate Generate
        if (( gsHttpsLive == "https" ) || ( iRsaLength == 0 )) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_GENERATE_EXECUTE_BUTTON].displayDisabled();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_GENERATE_EXECUTE_BUTTON].displayOff();
        }

        // Self-signed Certificate Information Config
        if (iSelfSigne >= 1) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_CONFIRM_BUTTON].displayOff();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_CONFIRM_BUTTON].displayDisabled();
        }

        // Self-signed Certificate Information Delete
        if ((( iSelfSigne >= 1 ) && ( gsHttpsLive == "http" )) || (( iSelfSigne >= 1 ) && ( gsHttpsLive == "https" ) && ( iCaSigne >= 2 ))) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_DELETE_BUTTON].displayOff();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION_DELETE_BUTTON].displayDisabled();
        }

        // CA Certificate Generate Certificate Signing Request
        if (iRsaLength == 0) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_EXECUTE_BUTTON].displayDisabled();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_SIGNING_REQUEST_EXECUTE_BUTTON].displayOff();
        }

        // CA Certificate CA Certificate install
        if (iCsr == 1) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_EXECUTE_BUTTON].displayOff();
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_INPUT].displayOff();
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_SELECT_BUTTON].displayOff();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_EXECUTE_BUTTON].displayDisabled();
            inputAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_INPUT].displayDisabled();
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INSTALL_SELECT_BUTTON].displayDisabled();
        }

        // CA Certificate Information Confirm
        if (iCaSigne != 0) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_CONFIRM_BUTTON].displayOff();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_CONFIRM_BUTTON].displayDisabled();
        }

        // CA Certificate Information Delete
        if (( iCaSigne >= 2 ) && ( gsHttpsLive == "http" )) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_DELETE_BUTTON].displayOff();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_INFORMATION2_DELETE_BUTTON].displayDisabled();
        }

        // CRT key generate
        if ((objHttps.self_signed_info == "not_generated" ||objHttps.self_signed_info == "invalid")&&(objHttps.ca_cert_info == "not_generated" || objHttps.ca_cert_info == "invalid")) {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_CRT_KEY_EXECUTE_BUTTON].displayOff();
        }
        else {
            btnAdvancedObject[SETUP_ADVANCED_HTTPS_CRT_KEY_EXECUTE_BUTTON].displayDisabled();
        }

        // Connection
        if (gsHttpsLive == "http") {
            if ((( iSelfSigne == 0 ) && ( iCaSigne <= 1 )) || (iRsaLength == 0)) {
                selectAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_SELECT].displayDisabled();
            }else{
                selectAdvancedObject[SETUP_ADVANCED_HTTPS_CONNECTION_SELECT].displayOff();
            }
        }
    }

    /****************************RTSP******************************/

    function setSetupAdvancedRtspValueToEle() {
        setSetupAdvancedRtspValueToInput();
    }

    function setSetupAdvancedRtspValueToInput() {
        var resquestDate = getRtsp();
        var sRtspPort = checkRtspRequestDate(resquestDate.rtsp_port) ? resquestDate.rtsp_port : "";
        var sRtspReqUri1 = checkRtspRequestDate(resquestDate.h264_rtsp_req_uri1) ? resquestDate.h264_rtsp_req_uri1 : "";
        var sRtspReqUri2 = checkRtspRequestDate(resquestDate.h264_rtsp_req_uri2) ? resquestDate.h264_rtsp_req_uri2 : "";
        var sRtspReqUri3 = checkRtspRequestDate(resquestDate.h264_rtsp_req_uri3) ? resquestDate.h264_rtsp_req_uri3 : "";
        // var sRtspReqUri4 = checkRtspRequestDate(resquestDate.h264_rtsp_req_uri4) ? resquestDate.h264_rtsp_req_uri4 : "";
        var sRtspReqUri5 = checkRtspRequestDate(resquestDate.h265_rtsp_req_uri1) ? resquestDate.h265_rtsp_req_uri1 : "";
        var sRtspReqUri6 = checkRtspRequestDate(resquestDate.h265_rtsp_req_uri2) ? resquestDate.h265_rtsp_req_uri2 : "";
        inputAdvancedObject[SETUP_ADVANCED_RTSP_PORT_INPUT].val(sRtspPort);
        inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL1_INPUT].val(sRtspReqUri1);
        inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL2_INPUT].val(sRtspReqUri2);
        inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL3_INPUT].val(sRtspReqUri3);
        // inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL4_INPUT].val(sRtspReqUri4);
        inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL5_INPUT].val(sRtspReqUri5);
        inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL6_INPUT].val(sRtspReqUri6);
    }

    function checkRtspRequestDate(value) {
        if (value) {
            return true;
        } else {
            return false;
        }
    }

    function getRtsp() {
        const url = "/cgi-bin/get_rtsp";
        let ret = cparam_sendRequest(url);
        let result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);
            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("rtsp_port=") == 0) {
                    result.rtsp_port = ret[i].substring("rtsp_port=".length);
                    continue;
                }
                if (ret[i].indexOf("h264_rtsp_req_uri1=") == 0) {
                    result.h264_rtsp_req_uri1 = ret[i].substring("h264_rtsp_req_uri1=".length);
                    continue;
                }
                if (ret[i].indexOf("h264_rtsp_req_uri2=") == 0) {
                    result.h264_rtsp_req_uri2 = ret[i].substring("h264_rtsp_req_uri2=".length);
                    continue;
                }
                if (ret[i].indexOf("h264_rtsp_req_uri3=") == 0) {
                    result.h264_rtsp_req_uri3 = ret[i].substring("h264_rtsp_req_uri3=".length);
                    continue;
                }
                if (ret[i].indexOf("h264_rtsp_req_uri4=") == 0) {
                    result.h264_rtsp_req_uri4 = ret[i].substring("h264_rtsp_req_uri4=".length);
                    continue;
                }
                if (ret[i].indexOf("h265_rtsp_req_uri1=") == 0) {
                    result.h265_rtsp_req_uri1 = ret[i].substring("h265_rtsp_req_uri1=".length);
                }
                if (ret[i].indexOf("h265_rtsp_req_uri2=") == 0) {
                    result.h265_rtsp_req_uri2= ret[i].substring("h265_rtsp_req_uri2=".length);
                }
            }
        }
        return result;
    }

    function callbackAdvancedRtspSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoRtspSubmit();
        }
    }

    function callbackAdvancedSNMPSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            if (radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].getSelectedValue() == "0" || radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].getSelectedValue() == "0") {
                jConfirm(MSG_STATUS.mID_0110, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function(confirm){
                    if (confirm) {
                        DoSnmpSubmit();
                    } else {
                        return;
                    }
                });
            } else {
                DoSnmpSubmit();
            }
        }
    }
    function callbackAdvancedTSLSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoTSLSubmit();
        }
    }
    function CheckSnmpForm(){
        const checkRegx = /[^a-zA-Z0-9!"#$%'()=\-~^|\\`@\[\]{}*:+;<>,.?/\\_]/g;
        const userNmae = inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].get();
        const passWord = inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].get();
        const systemName =inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].get();
        const location = inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].get();
        const contact = inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].get();


        if (userNmae.length < 1 || passWord <  1 || systemName <  1 || location <  1 || contact <  1) {
            $("#dialog_setup").hide();

            jAlert(MSG_STATUS.mID_0048, NPTZ_WORDING.wID_0039, function(){
                return false;
            });
            return false;
        } else if(userNmae.match(checkRegx) || passWord.match(checkRegx) || systemName.match(checkRegx) || location.match(checkRegx) || contact.match(checkRegx)){
            $("#dialog_setup").hide();
            jAlert(MSG_STATUS.mID_0009, NPTZ_WORDING.wID_0039, function(){
                return false;
            });
            return false;
        }
        return true;

    }
    function getAdvancedSnmpFormData() {
        var data = {};
        //let obj = cparam_getSnmpInfo();
        // if(radioAdvancedButtonGroup[SETUP_ADVANCED_SNMP].getSelectedValue() == 0){
        //
        // }else{
        //
        // }
        data['mode'] = radioAdvancedButtonGroup[SETUP_ADVANCED_SNMP].getSelectedValue();
        data['mode'] = radioAdvancedButtonGroup[SETUP_ADVANCED_SNMP].getSelectedValue();
        data['name'] = inputAdvancedObject[SETUP_ADVANCED_SNMP_USER_NAME_INPUT].get();
        data['auth'] = radioAdvancedButtonGroup[SETUP_ADVANCED_AUTHENTICTION].getSelectedValue()
        data['enc'] = radioAdvancedButtonGroup[SETUP_ADVANCED_ENCRYPTION_METHOD].getSelectedValue()
        data['pass'] = inputAdvancedObject[SETUP_ADVANCED_SNMP_PASSWORD_INPUT].get();
        data['system'] = inputAdvancedObject[SETUP_ADVANCED_SNMP_SYSTEM_NAME_INPUT].get();
        data['location'] = inputAdvancedObject[SETUP_ADVANCED_SNMP_LOCATION_INPUT].get();
        data['contact'] = inputAdvancedObject[SETUP_ADVANCED_SNMP_CONTACT_INPUT].get();
        return data;
    }
    function getAdvancedTSLFormData() {
        var data = {};
        data['index'] = inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT].get();
        data['port'] = inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT].get();
        return data;
    }
    function DoSnmpSubmit() {
        if (!CheckSnmpForm()) {
            gbAct = false;
            return false;
        }
        $("#dialog_setup").show();
        $.ajax({
            type: "get",
            url: "/cgi-bin/set_snmp_info",
            data: getAdvancedSnmpFormData(),
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
                return true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }
    function CheckTslForm(){
        const numb = inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT].get();
        if (!checkIndex(numb)) return capi_DispError(inputAdvancedObject[SETUP_ADVANCED_TSL_INDEX_INPUT].getInputObject(), objErrCode);
        const port = inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT].get();
        if (!checkPort(port)) return capi_DispError(inputAdvancedObject[SETUP_ADVANCED_TSL_PORT_INPUT].getInputObject(), objErrCode);
        return true;

    }
    function checkIndex(sIndex){
        if (sIndex.length == 0) {
            objErrCode = MSG_STATUS.mID_0002;
            return false;
        }
        if (!capi_isDigit(sIndex)) {
            objErrCode = MSG_STATUS.mID_0010;
            return false;
        }
        var iWork = parseInt(sIndex);
        if (( iWork < 1 ) || ( 65534 < iWork )) {
            objErrCode = MSG_STATUS.mID_0009;
            return false;
        }
        return true;
    }
    function checkPort(sPort){
        if (sPort.length == 0) {
            objErrCode = MSG_STATUS.mID_0002;
            return false;
        }
        if (!capi_isDigit(sPort)) {
            objErrCode = MSG_STATUS.mID_0010;
            return false;
        }
        var iWork = parseInt(sPort);
        if (( iWork < 1 ) || ( 65535 < iWork )) {
            objErrCode = MSG_STATUS.mID_0009;
            return false;
        }
        if (!chknet_portReservedNo(sPort, "TSL", 1)) {
            return false;
        }
        return true
    }
    function DoTSLSubmit() {
        if (!CheckTslForm()) {
            gbAct = false;
            return false;
        }
        var paramData = getAdvancedTSLFormData();
        if(paramData.index == '65535'){
            jAlert(MSG_STATUS.mID_0028,NPTZ_WORDING.wID_0039)
            return false;
        }
        $("#dialog_setup").show();
        $.ajax({
            type: "get",
            url: "/cgi-bin/set_tsl_info",
            data: paramData,
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
                return true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }

    function DoRtspSubmit() {
        if (!CheckRtspForm()) {
            gbAct = false;
            return false;
        }
        $("#dialog_setup").show();
        $.ajax({
            type: "post",
            url: "/cgi-bin/set_rtsp",
            data: getAdvancedRtspFormData(),
            success: function (data) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
                return true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function(){
                    $("#dialog_setup").hide();
                },500);
            }
        });
    }

    function getAdvancedRtspFormData() {
        var data = {};
        objVOIP = cparam_getVideoOverIpInfo();
        data['rtsp_port'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_PORT_INPUT].get();
        data['h264_rtsp_mode'] = objVOIP.h264_rtsp_mode_ch1 === "1" ? 1 : 0;
        data['h264_rtsp_mode2'] = objVOIP.h264_rtsp_mode_ch2 === "1" ? 1 : 0;
        data['h264_rtsp_mode3'] = objVOIP.h264_rtsp_mode_ch3 === "1" ? 1 : 0;
        data['h264_rtsp_mode4'] = objVOIP.h264_rtsp_mode_ch4 === "1" ? 1 : 0;
        data['h265_rtsp_mode'] = objVOIP.h265_rtsp_mode_ch1 === "1" ? 1 : 0;
        data['h264_rtsp_req_uri1'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL1_INPUT].get();
        data['h264_rtsp_req_uri2'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL2_INPUT].get();
        data['h264_rtsp_req_uri3'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL3_INPUT].get();
        // data['h264_rtsp_req_uri4'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL4_INPUT].get();
        data['h265_rtsp_req_uri1'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL5_INPUT].get();
        data['h265_rtsp_req_uri2'] = inputAdvancedObject[SETUP_ADVANCED_RTSP_REQUEST_URL6_INPUT].get();
        return data;
    }

    function CheckRtspForm() {
        var f = document.all;
        if (!chknet_portNo(f.rtsp_port.value, NPTZ_WORDING.wID_0158, ghttpsmode)) {
            return capi_DispError(f.rtsp_port, objErrCode);
        }
        if (!chknet_portSysResvdNo(f.rtsp_port.value)) {
            return capi_DispError(f.rtsp_port, objErrCode);
        }
        var sUri1 = String(f.h264_rtsp_req_uri1.value);
        var sUri2 = String(f.h264_rtsp_req_uri2.value);
        var sUri3 = String(f.h264_rtsp_req_uri3.value);
        var sUri4 = String(f.h265_rtsp_req_uri1.value);
        var sUri5 = String(f.h265_rtsp_req_uri2.value);
        sUri1 = sUri1.toLowerCase();
        sUri2 = sUri2.toLowerCase();
        sUri3 = sUri3.toLowerCase();
        sUri4 = sUri4.toLowerCase();
        sUri5 = sUri5.toLowerCase();
        if ((sUri1.substr(0, 1) == "/") ||
            (sUri1.substr(sUri1.length - 1) == "/")) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
        }
        if ((sUri2.substr(0, 1) == "/") ||
            (sUri2.substr(sUri2.length - 1) == "/")) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
        }
        if ((sUri3.substr(0, 1) == "/") ||
            (sUri3.substr(sUri3.length - 1) == "/")) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
        }
        if ((sUri4.substr(0, 1) == "/") ||
            (sUri4.substr(sUri4.length - 1) == "/")) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
        }
        if ((sUri5.substr(0, 1) == "/") ||
            (sUri5.substr(sUri5.length - 1) == "/")) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
        }
        if ((sUri1.length < 1) || (sUri1.length > 255)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
        }
        if ((sUri2.length < 1) || (sUri2.length > 255)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
        }
        if ((sUri3.length < 1) || (sUri3.length > 255)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
        }
        if ((sUri4.length < 1) || (sUri4.length > 255)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
        }
        if ((sUri5.length < 1) || (sUri5.length > 255)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
        }
        var sSymbol = "-/_";
        if (!capi_isAlphaNumSymbol(sUri1, sSymbol)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
        }
        if (!capi_isAlphaNumSymbol(sUri2, sSymbol)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
        }
        if (!capi_isAlphaNumSymbol(sUri3, sSymbol)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
        }
        if (!capi_isAlphaNumSymbol(sUri4, sSymbol)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
        }
        if (!capi_isAlphaNumSymbol(sUri5, sSymbol)) {
            objErrCode = MSG_STATUS.mID_0009;
            return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
        }
        if (sUri1.length < sUri2.length) {
            if (sUri1.match(sUri2)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
            }
        }
        else {
            if (sUri2.match(sUri1)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
            }
        }
        if (sUri1.length < sUri3.length) {
            if (sUri1.match(sUri3)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
            }
        }
        else {
            if (sUri3.match(sUri1)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
            }
        }
        if (sUri1.length < sUri4.length) {
            if (sUri1.match(sUri4)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
            }
        }
        else {
            if (sUri4.match(sUri1)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
            }
        }
        if (sUri1.length < sUri5.length) {
            if (sUri1.match(sUri5)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri1, objErrCode);
            }
        }
        else {
            if (sUri5.match(sUri1)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
            }
        }
        if (sUri2.length < sUri3.length) {
            if (sUri2.match(sUri3)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
            }
        }
        else {
            if (sUri3.match(sUri2)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
            }
        }
        if (sUri2.length < sUri4.length) {
            if (sUri2.match(sUri4)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
            }
        }
        else {
            if (sUri4.match(sUri2)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
            }
        }
        if (sUri2.length < sUri5.length) {
            if (sUri2.match(sUri5)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri2, objErrCode);
            }
        }
        else {
            if (sUri5.match(sUri2)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
            }
        }
        if (sUri3.length < sUri4.length) {
            if (sUri3.match(sUri4)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
            }
        }
        else {
            if (sUri4.match(sUri3)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
            }
        }
        if (sUri3.length < sUri5.length) {
            if (sUri3.match(sUri5)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri3, objErrCode);
            }
        }
        else {
            if (sUri5.match(sUri3)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
            }
        }
        if (sUri4.length < sUri5.length) {
            if (sUri4.match(sUri5)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h264_rtsp_req_uri4, objErrCode);
            }
        }
        else {
            if (sUri5.match(sUri4)) {
                objErrCode = MSG_STATUS.mID_0009;
                return capi_DispError(f.h265_rtsp_req_uri1, objErrCode);
            }
        }
        return true;
    }
    function checkRadioValue(strValue, targetValue) {
        if (strValue == targetValue) {
            return true;
        } else {
            return false;
        }
    }
    function destroy_802_1x_Scroll(){
        if(my_802_1X_Scroll!=null){
            my_802_1X_Scroll.destroy();
            my_802_1X_Scroll = null;
        }
    }
    return {
        buildAdvanced: buildAdvanced,
        getAdvanceHttpsBtnStatus:getAdvanceHttpsBtnStatus,
        callbackAdvancedMenuNtp:callbackAdvancedMenuNtp,
        getHttpsStatus:getHttpsStatus,
        build_802_1X_Scroll:build_802_1X_Scroll,
        destroy_802_1x_Scroll:destroy_802_1x_Scroll
    };
}

