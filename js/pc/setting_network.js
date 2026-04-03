/**
 * @fileOverview Setup画面:usermng制御に関わる画面クラス
 *
 * @author Panasonic Corporation
 */

var settingnetwork = SettingNetwork();
var f = document.all;

/**
 * setup画面:Network制御に関わる画面クラス
 * @class Settings画面:Network制御に関わる画面クラス
 * @return {function} build 構築処理
 * @constructor
 */

function SettingNetwork() {
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildFlag = false;
    var giErrNum;
    var gbAct = false;
    var gsIp1 = cparams["ip1"];
    var gsIp2 = cparams["ip2"];
    var gsIp3 = cparams["ip3"];
    var gsIp4 = cparams["ip4"];
    var gsMask1 = cparams["nm1"];
    var gsMask2 = cparams["nm2"];
    var gsMask3 = cparams["nm3"];
    var gsMask4 = cparams["nm4"];
    var gsGate1 = cparams["gw1"];
    var gsGate2 = cparams["gw2"];
    var gsGate3 = cparams["gw3"];
    var gsGate4 = cparams["gw4"];
    var gsHttpPort = cparams["httpport"];
    var gsDns = cparams["dns_env"];

    var giIPv4Chg = [0, 16777216, 65536, 256, 1];
    var gulIpAddr = 0;
    var gulSubnet = 0;
    var gulGateway = 0;
    var gulDns = 0;

    var objNetWork = {};
    var objLan0NetWork = {};
    var objLan0ActiveNetWork = {};
    var objLan1NetWork = {};
    var objLan1ActiveNetWork = {};
    var objUsbNetWork = {};
    var objUsbActiveNetWork = {};
    var recom_set_disable = false;
    /**
     * button[]
     * @type menuNetworkObject[]
     */
     let menuNetworkObject = [];
    /**
     * 構築フラグ
     * @type boolean
     */
    var buildNetworkFlag = false;
    /**
     * labelオブジェクト
     * @type txtNetworkObject[]
     */
    var txtNetworkObject = [];
    var txtNetworkLanObject = [];
    var txtNetworkUsbObject = [];
    // var txtStatusObject = [];
    var txtNetworkStatusObject = [];
    var txtStatusValueObject = [];
    var txtNetworkStatusValueObject = [];
    /**
     * label定義 : IPv4 network
     * @type number
     */
    var SETUP_NETWORK_IPV4_NETWORK_LABEL = 0;
    /**
     * label定義 : DHCP
     * @type number
     */
    var SETUP_NETWORK_DHCP_LABEL = 1;
    /**
     * label定義 : IP address(IPv4)
     * @type number
     */
    var SETUP_NETWORK_IPV4_ADDRESS_LABEL = 2;
    /**
     * label定義 : Subnet mask
     * @type number
     */
    var SETUP_NETWORK_SUBNET_MASK_LABEL = 3;
    /**
     * label定義 : Default gateway
     * @type number
     */
    var SETUP_NETWORK_DEFAULT_GATEWAY_LABEL = 4;
    /**
     * label定義 : DNS
     * @type number
     */
    var SETUP_NETWORK_DNS_LABEL = 5;
    /**
     * label定義 : Primary server address
     * @type number
     */
    var SETUP_NETWORK_PRIMARY_SERVER_LABEL = 6;
    /**
     * label定義 : Secondary server address
     * @type number
     */
    var SETUP_NETWORK_SECONDARY_SERVER_LABEL = 7;
    /**
     * label定義 : IPv6 network
     * @type number
     */
    var SETUP_NETWORK_IPV6_NETWORK_LABEL = 8;
    /**
     * label定義 : Manual
     * @type number
     */
    var SETUP_NETWORK_MANUAL_LABEL = 9;

    /**
     * label定義 : IP address(IPv6)
     * @type number
     */
    var SETUP_NETWORK_IPV6_ADDRESS_LABEL = 10;
    /**
     * label定義 : Default gateway
     * @type number
     */
    var SETUP_NETWORK_DEFAULT_GATEWAY2_LABEL = 11;
    /**
     * label定義 : DHCPv6
     * @type number
     */
    var SETUP_NETWORK_DHCPV6_LABEL = 12;
    /**
     * label定義 : DNS
     * @type number
     */
    var SETUP_NETWORK_DNS2_LABEL = 13;
    /**
     * label定義 : Primary server address
     * @type number
     */
    var SETUP_NETWORK_PRIMARY_SERVER2_LABEL = 14;
    /**
     * label定義 : Secondary server address
     * @type number
     */
    var SETUP_NETWORK_SECONDARY_SERVER2_LABEL = 15;
    /**
     * label定義 : Common
     * @type number
     */
    var SETUP_NETWORK_COMMON_LABEL = 16;
    /**
     * label定義 : HTTP port
     * @type number
     */
    var SETUP_NETWORK_HTTP_PORT_LABEL = 17;
    /**
     * label定義 : Max RTP packet size
     * @type number
     */
    var SETUP_NETWORK_MAX_RTP_LABEL = 18;
    /**
     * label定義 : HTTP max segment size(MSS)
     * @type number
     */
    var SETUP_NETWORK_HTTP_MAX_LABEL = 19;
    /**
     * label定義 :Easy IP Setup accommodate period
     * @type number
     */
    var SETUP_NETWORK_EASY_IP_LABEL = 21;
    /**
     * label定義 :Recommended network setting for internet
     * @type number
     */
    var SETUP_NETWORK_RECOMMENDED_NETWORK_LABEL = 22;
    /**
     * label定義 : (1-65535)
     * @type number
     */
    var SETUP_NETWORK_HTTP_PORT_AREA_LABEL = 23;
    /**
     * label定義 : SETUP_NETWORK_HTTP_PORT_AREA_LABEL
     * @type number
     */
    var SETUP_NETWORK_HTTP_CHECK_ACTIVE_NETWORK_SETTING_LABEL = 24;

    var SETUP_NETWORK_DOMAIN_LABEL = 25;

    var SETUP_NETWORK_METRIC_LABEL = 26;
    var SETUP_NETWORK_METRIC_DURING_LABEL = 27;

    /**
     * radio group
     * @type radioNetworkButtonGroup[]
     */
    var radioNetworkButtonGroup = [];
    var radioSfpPlusButtonGroup = [];
    var radioUsbButtonGroup = [];
    /**
     * radio:dhcp定義 :Recommended network setting for internet
     */
    var SETUP_NETWORK_DHCP = 0;
    /**
     * radio:dns manual
     */
    var SETUP_NETWORK_DNS_MANUAL = 1;
    /**
     * radio:ipv6 manual
     */
    var SETUP_NETWORK_IPV6_MANUAL = 2;
    /**
     * radio:ipv6 DHCPv6
     */
    var SETUP_NETWORK_IPV6_DHCPV6 = 3;
    /**
     * radio:Max RTP packet size
     */
    var SETUP_NETWORK_MAX_RTP = 4;
    /**
     * radio:Easy IP Setup accommodate period
     */
    var SETUP_NETWORK_EASY_IP = 5;

    /**
     * input[] : text
     * @type inputNetworkObject[]
     */
    var inputNetworkObject = [];
    var inputSfpPlusObject = [];
    /**
     * input : IP address(IPv4)
     */
    var SETUP_NETWORK_IPV4_INPUT = 0;
    /**
     * input : Subnet mask
     */
    var SETUP_NETWORK_NETMASK_INPUT = 1;
    /**
     * input : Default gateway(IPv4)
     */
    var SETUP_NETWORK_GATEWAY_INPUT = 2;
    /**
     * input : Primary server address(IPv4)
     */
    var SETUP_NETWORK_PRI_SERVER_INPUT = 3;
    /**
     * input : Secondary server address(IPv4)
     */
    var SETUP_NETWORK_SEC_SERVER_INPUT = 4;
    /**
     * input : IP address(IPv6)
     */
    var SETUP_NETWORK_IPV6_INPUT = 5;
    /**
     * input : Default gateway(IPv6)
     */
    var SETUP_NETWORK_GATEWAY2_INPUT = 6;
    /**
     * input : Primary server address(IPv6)
     */
    var SETUP_NETWORK_PRI_SERVER2_INPUT = 7;
    /**
     * input : Secondary server address(IPv6)
     */
    var SETUP_NETWORK_SEC_SERVER2_INPUT = 8;
    /**
     * input : HTTP port
     */
    var SETUP_NETWORK_HTTP_PORT_INPUT = 9;

    var SETUP_NETWORK_DOMAIN_INPUT = 10;
    var SETUP_NETWORK_METRIC_INPUT = 11;
    var SETUP_NETWORK_LAN_METRIC_INPUT = 12;
    var SETUP_NETWORK_USB_METRIC_INPUT = 13;

    var SETUP_NETWORK_USB_IPV4_INPUT =14;
    var SETUP_NETWORK_USB_NETMASK_INPUT =15;
    var SETUP_NETWORK_USB_GATEWAY_INPUT =16;
    var SETUP_NETWORK_USB_IPV6_INPUT =17;
    var SETUP_NETWORK_USB_GATEWAY2_INPUT = 18;

    /**
     * select[]
     * @type selectNetworkObject[]
     */
    var selectNetworkObject = [];
    /**
     * select : HTTP max segment size(MSS)
     */
    var SETUP_NETWORK_HTTP_MAX_SELECT = 0;
    /**
     * select : Bandwidth control (bitrate)
     */
    var SETUP_NETWORK_BANDWIDTH_SELECT = 1;

    /**
     * button[]
     * @type btnNetworkObject[]
     */
    var btnNetworkObject = [];
    /**
     * button : set
     */
    var SETUP_NETWORK_SET_BUTTON = 0;
    var SETUP_NETWORK_SFP_PLUS_SET_BUTTON = 1;
    var SETUP_NETWORK_USB_SET_BUTTON = 2;
    var SETUP_NETWORK_DNS_SET_BUTTON = 3;
    var SETUP_NETWORK_DOMAIN_SET_BUTTON = 4;
    var SETUP_NETWORK_COMMON_SET_BUTTON = 5;
    var setup_network_lan_labels;
    var setup_network_lan_form;
    var setup_network_lan_labels_part;
    var setup_network_lan_form_part;

    var setup_network_sfp_plus_labels;
    var setup_network_sfp_plus_form;
    var setup_network_sfp_plus_labels_part;
    var setup_network_sfp_plus_form_part;

    var setup_network_dns_labels;
    var setup_network_dns_form;
    var setup_network_dns_labels_part;
    var setup_network_dns_form_part;

    var SETUP_NETWORK_TITLE = 24;

    const SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON = 0;
    const SETUP_NETWORK_MENU_LAN_BUTTON = 1;
    const SETUP_NETWORK_MENU_SFP_PLUS_BUTTON = 2;
    const SETUP_NETWORK_MENU_USB_BUTTON = 3;
    const SETUP_NETWORK_MENU_DNS_BUTTON = 4;
    const SETUP_NETWORK_MENU_DOMAIN_BUTTON = 5;
    const SETUP_NETWORK_MENU_COMMON_BUTTON = 6;
    //setting status 
    const statusTitleObject = [];
    const statusValueObject = [];
    const SETUP_NETWORK_STATUS_LAN = 0;
    const SETUP_NETWORK_STATUS_LAN_IPV4 = 1;
    const SETUP_NETWORK_STATUS_LAN_IPV4_ADDRESS = 2;
    const SETUP_NETWORK_STATUS_LAN_IPV4_SUBSET_MASK = 3;
    const SETUP_NETWORK_STATUS_LAN_IPV4_DEFAULT_GATEWAY = 4;
    const SETUP_NETWORK_STATUS_LAN_IPV6 = 5;
    const SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS1 = 6;
    const SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS2 = 7;
    const SETUP_NETWORK_STATUS_LAN_IPV6_DEFAULT_GATEWAY = 8;
    const SETUP_NETWORK_STATUS_SFP_PLUS = 9;
    const SETUP_NETWORK_STATUS_SFP_PLUS_IPV4 = 10;
    const SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_ADDRESS = 11;
    const SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_SUBSET_MASK = 12;
    const SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_DEFAULT_GATEWAY = 13;
    // const SETUP_NETWORK_STATUS_SFP_PLUS_IPV6 = 14;
    // const SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS1 = 15;
    // const SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS2 = 16;
    // const SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_DEFAULT_GATEWAY = 17;
    const SETUP_NETWORK_STATUS_USB = 14;
    const SETUP_NETWORK_STATUS_USB_IPV4 = 15;
    const SETUP_NETWORK_STATUS_USB_IPV4_ADDRESS = 16;
    const SETUP_NETWORK_STATUS_USB_IPV4_SUBSET_MASK = 17;
    const SETUP_NETWORK_STATUS_USB_IPV4_DEFAULT_GATEWAY = 18;
    const SETUP_NETWORK_STATUS_USB_IPV6 = 19;
    const SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS1 = 20;
    const SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS2 = 21;
    const SETUP_NETWORK_STATUS_USB_IPV6_DEFAULT_GATEWAY = 22;
    const SETUP_NETWORK_STATUS_DNS1 = 23
    const SETUP_NETWORK_STATUS_DNS = 24;
    const SETUP_NETWORK_STATUS_DNS_PRI_SERVER_ADDRESS = 25;
    const SETUP_NETWORK_STATUS_DNS_SEC_SERVER_ADDRESS = 26;

    /**
     * Network画面構築処理
     * @type number
     */
    function buildNetwork() {
        if (!buildNetworkFlag) {
            var setup_network_menu = "setup_network_menu";
            menuNetworkObject[SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_setting_status_button", NPTZ_WORDING.wID_0077, callbackNetworkMenuSettingStatus,'',MenuButtonCtrl.SINGLE);
            menuNetworkObject[SETUP_NETWORK_MENU_LAN_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_lan_button", NPTZ_WORDING.wID_0670, callbackNetworkMenuLan, '', MenuButtonType.TOP);
            //if(!isUE163){
                menuNetworkObject[SETUP_NETWORK_MENU_SFP_PLUS_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_sfp_plus_button", NPTZ_WORDING.wID_0671, callbackNetworkSfpPlus, '', MenuButtonType.MIDDLE);
            //}

            if (!isUE163) {
                menuNetworkObject[SETUP_NETWORK_MENU_USB_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_usb_button", NPTZ_WORDING.wID_0672, callbackNetworkMenuUsb, '', MenuButtonType.MIDDLE);
                menuNetworkObject[SETUP_NETWORK_MENU_DNS_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_dns_button", NPTZ_WORDING.wID_0673, callbackNetworkMenuDns, '', MenuButtonType.MIDDLE);
                menuNetworkObject[SETUP_NETWORK_MENU_DOMAIN_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_domain_button", NPTZ_WORDING.wID_0674, callbackNetworkMenuDomain, '', MenuButtonType.MIDDLE);
                menuNetworkObject[SETUP_NETWORK_MENU_COMMON_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_common_button", NPTZ_WORDING.wID_0675, callbackNetworkMenuCommon, '', MenuButtonType.BOTTOM);
            } else {
                menuNetworkObject[SETUP_NETWORK_MENU_USB_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_usb_button isUE163", NPTZ_WORDING.wID_0672, callbackNetworkMenuUsb, '', MenuButtonType.MIDDLE);
                menuNetworkObject[SETUP_NETWORK_MENU_DNS_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_dns_button isUE163", NPTZ_WORDING.wID_0673, callbackNetworkMenuDns, '', MenuButtonType.MIDDLE);
                menuNetworkObject[SETUP_NETWORK_MENU_DOMAIN_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_domain_button isUE163", NPTZ_WORDING.wID_0674, callbackNetworkMenuDomain, '', MenuButtonType.MIDDLE);
                menuNetworkObject[SETUP_NETWORK_MENU_COMMON_BUTTON] = MenuButtonCtrl(setup_network_menu, "setup_network_menu_common_button isUE163", NPTZ_WORDING.wID_0675, callbackNetworkMenuCommon, '', MenuButtonType.BOTTOM);
                $('#setup_network_menu').append($('<div class="MenuButtonDivideLine setup_network_menu_sfp_plus_button_Line"></div>'));
            }

            for (var btn in menuNetworkObject) {
                if(isUE163 && btn == SETUP_NETWORK_MENU_SFP_PLUS_BUTTON){
                    continue;
                }
                menuNetworkObject[btn].show();
                menuNetworkObject[btn].displayOff();
            }
            //setting status
            buildNetworkStatus();

			$(".setup_network_menu_setting_status_button").addClass("setup_menu_single_btn_class");
			initSettingNetworkStatusEle();	
            cparam_updateHttpInfo();
            cparam_updateInformation();

            buildNetworkFlag = true;
            setup_network_lan_labels = "setup_network_lan_labels";
            setup_network_lan_form = "setup_network_lan_form";
            setup_network_lan_labels_part = "setup_network_lan_labels_part";
            setup_network_lan_form_part = "setup_network_lan_form_part";

            setup_network_sfp_plus_labels = "setup_network_sfp_plus_labels";
            setup_network_sfp_plus_form = "setup_network_sfp_plus_form";
            setup_network_sfp_plus_labels_part = "setup_network_sfp_plus_labels_part";
            setup_network_sfp_plus_form_part = "setup_network_sfp_plus_form_part";

            setup_network_usb_labels = "setup_network_usb_labels";
            setup_network_usb_form = "setup_network_usb_form";
            setup_network_usb_labels_part = "setup_network_usb_labels_part";
            setup_network_usb_form_part = "setup_network_usb_form_part";

            setup_network_dns_labels = "setup_network_dns_labels";
            setup_network_dns_form = "setup_network_dns_form";
            setup_network_dns_labels_part = "setup_network_dns_labels_part";
            setup_network_dns_form_part = "setup_network_dns_form_part";
          
            txtNetworkLanObject[SETUP_NETWORK_TITLE] = TextCtrl("setup_network_main", "setup_network_title", NPTZ_WORDING.wID_0108);
            txtNetworkLanObject[SETUP_NETWORK_IPV4_NETWORK_LABEL] = TextCtrl(setup_network_lan_labels, 'setup_network_ipv4_network_label', NPTZ_WORDING.wID_0109);
            txtNetworkLanObject[SETUP_NETWORK_DHCP_LABEL] = TextCtrl(setup_network_lan_labels, 'setup_network_dhcp_label', NPTZ_WORDING.wID_0110);
            txtNetworkLanObject[SETUP_NETWORK_IPV4_ADDRESS_LABEL] = TextCtrl(setup_network_lan_labels, 'setup_network_ipv4_address_label', NPTZ_WORDING.wID_0111);
            txtNetworkLanObject[SETUP_NETWORK_SUBNET_MASK_LABEL] = TextCtrl(setup_network_lan_labels, 'setup_network_subnet_mask_label', NPTZ_WORDING.wID_0112);
            txtNetworkLanObject[SETUP_NETWORK_DEFAULT_GATEWAY_LABEL] = TextCtrl(setup_network_lan_labels, 'setup_network_default_gateway_label', NPTZ_WORDING.wID_0113);

            txtNetworkLanObject[SETUP_NETWORK_IPV6_NETWORK_LABEL] = TextCtrl(setup_network_lan_labels_part, 'setup_network_ipv6_network_label', NPTZ_WORDING.wID_0117);
            txtNetworkLanObject[SETUP_NETWORK_MANUAL_LABEL] = TextCtrl(setup_network_lan_labels_part, 'setup_network_manual_label', NPTZ_WORDING.wID_0118);
            txtNetworkLanObject[SETUP_NETWORK_IPV6_ADDRESS_LABEL] = TextCtrl(setup_network_lan_labels_part, 'setup_network_ipv6_address_label', NPTZ_WORDING.wID_0119);
            txtNetworkLanObject[SETUP_NETWORK_DEFAULT_GATEWAY2_LABEL] = TextCtrl(setup_network_lan_labels_part, 'setup_network_default_gateway2_label', NPTZ_WORDING.wID_0113);
            txtNetworkLanObject[SETUP_NETWORK_DHCPV6_LABEL] = TextCtrl(setup_network_lan_labels_part, 'setup_network_dhcpv6_label', NPTZ_WORDING.wID_0120);
            
            txtNetworkLanObject[SETUP_NETWORK_METRIC_LABEL] = TextCtrl(setup_network_lan_labels_part, 'setup_network_metric_label', NPTZ_WORDING.wID_0698);
            txtNetworkLanObject[SETUP_NETWORK_METRIC_DURING_LABEL] = TextCtrl(setup_network_lan_form_part, 'setup_network_lan_metric_during_label', NPTZ_WORDING.wID_0699);

            // sfp+
            txtNetworkObject[SETUP_NETWORK_IPV4_NETWORK_LABEL] = TextCtrl(setup_network_sfp_plus_labels, 'setup_network_ipv4_network_label', NPTZ_WORDING.wID_0109);
            txtNetworkObject[SETUP_NETWORK_DHCP_LABEL] = TextCtrl(setup_network_sfp_plus_labels, 'setup_network_dhcp_label', NPTZ_WORDING.wID_0110);
            txtNetworkObject[SETUP_NETWORK_IPV4_ADDRESS_LABEL] = TextCtrl(setup_network_sfp_plus_labels, 'setup_network_ipv4_address_label', NPTZ_WORDING.wID_0111);
            txtNetworkObject[SETUP_NETWORK_SUBNET_MASK_LABEL] = TextCtrl(setup_network_sfp_plus_labels, 'setup_network_subnet_mask_label', NPTZ_WORDING.wID_0112);
            txtNetworkObject[SETUP_NETWORK_DEFAULT_GATEWAY_LABEL] = TextCtrl(setup_network_sfp_plus_labels, 'setup_network_default_gateway_label', NPTZ_WORDING.wID_0113);
            // txtNetworkObject[SETUP_NETWORK_DNS_LABEL] = TextCtrl(setup_network_sfp_plus_labels, 'setup_network_dns_label', NPTZ_WORDING.wID_0114);
           
            // txtNetworkObject[SETUP_NETWORK_IPV6_NETWORK_LABEL] = TextCtrl(setup_network_sfp_plus_labels_part, 'setup_network_ipv6_network_label', NPTZ_WORDING.wID_0117);
            // txtNetworkObject[SETUP_NETWORK_MANUAL_LABEL] = TextCtrl(setup_network_sfp_plus_labels_part, 'setup_network_manual_label', NPTZ_WORDING.wID_0118);
            // txtNetworkObject[SETUP_NETWORK_IPV6_ADDRESS_LABEL] = TextCtrl(setup_network_sfp_plus_labels_part, 'setup_network_ipv6_address_label', NPTZ_WORDING.wID_0119);
            // txtNetworkObject[SETUP_NETWORK_DEFAULT_GATEWAY2_LABEL] = TextCtrl(setup_network_sfp_plus_labels_part, 'setup_network_default_gateway2_label', NPTZ_WORDING.wID_0113);
            // txtNetworkObject[SETUP_NETWORK_DHCPV6_LABEL] = TextCtrl(setup_network_sfp_plus_labels_part, 'setup_network_dhcpv6_label', NPTZ_WORDING.wID_0120);
            txtNetworkObject[SETUP_NETWORK_METRIC_LABEL] = TextCtrl(setup_network_sfp_plus_labels_part, 'setup_network_sfp_metric_label', NPTZ_WORDING.wID_0698);
            txtNetworkObject[SETUP_NETWORK_METRIC_DURING_LABEL] = TextCtrl(setup_network_sfp_plus_form_part, 'setup_network_sfp_plus_metric_during_label', NPTZ_WORDING.wID_0699);
           // usb
            txtNetworkUsbObject[SETUP_NETWORK_IPV4_NETWORK_LABEL] = TextCtrl(setup_network_usb_labels, 'setup_network_ipv4_network_label', NPTZ_WORDING.wID_0109);
            txtNetworkUsbObject[SETUP_NETWORK_DHCP_LABEL] = TextCtrl(setup_network_usb_labels, 'setup_network_dhcp_label', NPTZ_WORDING.wID_0110);
            

            txtNetworkUsbObject[SETUP_NETWORK_IPV4_ADDRESS_LABEL] = TextCtrl(setup_network_usb_labels, 'setup_network_ipv4_address_label', NPTZ_WORDING.wID_0111);
            txtNetworkUsbObject[SETUP_NETWORK_SUBNET_MASK_LABEL] = TextCtrl(setup_network_usb_labels, 'setup_network_subnet_mask_label', NPTZ_WORDING.wID_0112);
            txtNetworkUsbObject[SETUP_NETWORK_DEFAULT_GATEWAY_LABEL] = TextCtrl(setup_network_usb_labels, 'setup_network_default_gateway_label', NPTZ_WORDING.wID_0113);

            txtNetworkUsbObject[SETUP_NETWORK_IPV6_NETWORK_LABEL] = TextCtrl(setup_network_usb_labels_part, 'setup_network_ipv6_network_label', NPTZ_WORDING.wID_0117);
            txtNetworkUsbObject[SETUP_NETWORK_MANUAL_LABEL] = TextCtrl(setup_network_usb_labels_part, 'setup_network_manual_label', NPTZ_WORDING.wID_0118);
            txtNetworkUsbObject[SETUP_NETWORK_IPV6_ADDRESS_LABEL] = TextCtrl(setup_network_usb_labels_part, 'setup_network_ipv6_address_label', NPTZ_WORDING.wID_0119);
            txtNetworkUsbObject[SETUP_NETWORK_DEFAULT_GATEWAY2_LABEL] = TextCtrl(setup_network_usb_labels_part, 'setup_network_default_gateway2_label', NPTZ_WORDING.wID_0113);
            txtNetworkUsbObject[SETUP_NETWORK_DHCPV6_LABEL] = TextCtrl(setup_network_usb_labels_part, 'setup_network_dhcpv6_label', NPTZ_WORDING.wID_0120);


            txtNetworkUsbObject[SETUP_NETWORK_METRIC_LABEL] = TextCtrl(setup_network_usb_labels, 'setup_network_usb_metric_label', NPTZ_WORDING.wID_0698);
            txtNetworkUsbObject[SETUP_NETWORK_METRIC_DURING_LABEL] = TextCtrl(setup_network_usb_form, 'setup_network_usb_metric_during_label', NPTZ_WORDING.wID_0699);
            // dns
            txtNetworkObject[SETUP_NETWORK_DNS_LABEL] = TextCtrl(setup_network_dns_labels, 'setup_network_dns_label', NPTZ_WORDING.wID_0114);
            txtNetworkObject[SETUP_NETWORK_PRIMARY_SERVER_LABEL] = TextCtrl(setup_network_dns_labels, 'setup_network_primary_server_label', NPTZ_WORDING.wID_0115);
            txtNetworkObject[SETUP_NETWORK_SECONDARY_SERVER_LABEL] = TextCtrl(setup_network_dns_labels, 'setup_network_secondary_server_label', NPTZ_WORDING.wID_0116);

            // domain
            txtNetworkObject[SETUP_NETWORK_DOMAIN_LABEL] = TextCtrl("setup_network_domain_labels_part", 'setup_network_domain_label', NPTZ_WORDING.wID_0674);
            // common
            txtNetworkObject[SETUP_NETWORK_COMMON_LABEL] = TextCtrl("setup_network_common_labels_part", 'setup_network_common_label', NPTZ_WORDING.wID_0121);
            txtNetworkObject[SETUP_NETWORK_HTTP_PORT_LABEL] = TextCtrl("setup_network_common_labels_part", 'setup_network_http_port_label', NPTZ_WORDING.wID_0122);
            txtNetworkObject[SETUP_NETWORK_MAX_RTP_LABEL] = TextCtrl("setup_network_common_labels_part", 'setup_network_max_rtp_label', NPTZ_WORDING.wID_0123);
            txtNetworkObject[SETUP_NETWORK_HTTP_MAX_LABEL] = TextCtrl("setup_network_common_labels_part", 'setup_network_http_max_label', NPTZ_WORDING.wID_0124);
            txtNetworkObject[SETUP_NETWORK_EASY_IP_LABEL] = TextCtrl("setup_network_common_labels_part", 'setup_network_easy_ip_label', NPTZ_WORDING.wID_0125);
            txtNetworkObject[SETUP_NETWORK_HTTP_PORT_AREA_LABEL] = TextCtrl("setup_network_common_form_part", 'setup_network_http_port_area_label', NPTZ_WORDING.wID_0127);

            for (var txt in txtNetworkLanObject) {
                txtNetworkLanObject[txt].show();
            }
            for (var txt in txtNetworkObject) {
                txtNetworkObject[txt].show();
            }
            for (var txt in txtNetworkUsbObject) {
                txtNetworkUsbObject[txt].show();
            }
            // lan
            radioNetworkButtonGroup[SETUP_NETWORK_DHCP] = RadioButtonGroupCtrl(setup_network_lan_form, "setup_network_dhcp", RADIO_GROUP.rID_0001, '1', callbackSetupNetworkDhcp);
            radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL] = RadioButtonGroupCtrl(setup_network_lan_form_part, "setup_network_ipv6_manual", RADIO_GROUP.rID_0047, '0', callbackSetupNetworkIpv6Manual);
            radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6] = RadioButtonGroupCtrl(setup_network_lan_form_part, "setup_network_ipv6_dhcpv6", RADIO_GROUP.rID_0001, '1', callbackSetupNetworkIpv6Dhcpv6);
            inputNetworkObject[SETUP_NETWORK_IPV4_INPUT] = InputCtrl(setup_network_lan_form, 'IP_addr_lan', 'IP_addr_lan', 'setup_network_ipv4_input', '');
            inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT] = InputCtrl(setup_network_lan_form, 'netmask_lan', 'netmask_lan', 'setup_network_netmask_input', '');
            inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT] = InputCtrl(setup_network_lan_form, 'gateway_lan', 'gateway_lan', 'setup_network_gateway_input', '');
            inputNetworkObject[SETUP_NETWORK_IPV6_INPUT] = InputCtrl(setup_network_lan_form_part, 'IPv6_addr_lan', 'IPv6_addr_lan', 'setup_network_ipv6_input', '');
            inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT] = InputCtrl(setup_network_lan_form_part, 'IPv6_gateway_lan', 'IPv6_gateway_lan', 'setup_network_gateway2_input', '');
            inputNetworkObject[SETUP_NETWORK_LAN_METRIC_INPUT] = InputCtrl(setup_network_lan_form_part, 'metric_lan', 'metric_lan', 'setup_network_lan_metric_input',  '');
            inputNetworkObject[SETUP_NETWORK_LAN_METRIC_INPUT].getInputObject().keypress(function(event) {
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            }); 
            //sfp+
            radioSfpPlusButtonGroup[SETUP_NETWORK_DHCP] = RadioButtonGroupCtrl(setup_network_sfp_plus_form, "setup_network_dhcp", RADIO_GROUP.rID_0001, '1', callbackSetupNetworkSfpPlusDhcp);
            // radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL] = RadioButtonGroupCtrl(setup_network_sfp_plus_form_part, "setup_network_ipv6_manual", RADIO_GROUP.rID_0047, '0', callbackSetupNetworkSfpIpv6Manual);
            // radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_DHCPV6] = RadioButtonGroupCtrl(setup_network_sfp_plus_form_part, "setup_network_ipv6_dhcpv6", RADIO_GROUP.rID_0001, '1', callbackSetupNetworkIpv6Dhcpv6);

            inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT] = InputCtrl(setup_network_sfp_plus_form, 'IP_addr', 'IP_addr', 'setup_network_ipv4_input', '');
            inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT] = InputCtrl(setup_network_sfp_plus_form, 'netmask', 'netmask', 'setup_network_netmask_input', '');
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT] = InputCtrl(setup_network_sfp_plus_form, 'gateway', 'gateway', 'setup_network_gateway_input', '');
 
            // inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT] = InputCtrl(setup_network_sfp_plus_form_part, 'IPv6_addr', 'ip6_addr', 'setup_network_ipv6_input', '');
            // inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT] = InputCtrl(setup_network_sfp_plus_form_part, 'IPv6_gateway', 'ip6_gateway', 'setup_network_gateway2_input', '');
            inputSfpPlusObject[SETUP_NETWORK_METRIC_INPUT] = InputCtrl(setup_network_sfp_plus_form_part, 'metric_sfp_plus', 'metric_sfp_plus', 'setup_network_spf_plus_metric_input',  '');
            inputSfpPlusObject[SETUP_NETWORK_METRIC_INPUT].getInputObject().keypress(function(event) {
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            });  
            // usb
            radioUsbButtonGroup[SETUP_NETWORK_DHCP] = RadioButtonGroupCtrl(setup_network_usb_form, "setup_network_dhcp", RADIO_GROUP.rID_0001, '1', callbackSetupNetworkUsbDhcp);
            
            
            radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL] = RadioButtonGroupCtrl(setup_network_usb_form_part, "setup_network_ipv6_manual", RADIO_GROUP.rID_0047, '0', callbackSetupNetworkUsbIpv6Manual);
            radioUsbButtonGroup[SETUP_NETWORK_IPV6_DHCPV6] = RadioButtonGroupCtrl(setup_network_usb_form_part, "setup_network_ipv6_dhcpv6", RADIO_GROUP.rID_0001, '1', callbackSetupNetworkUsbIpv6Dhcpv6);
            inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT] = InputCtrl(setup_network_usb_form, 'IP_addr_usb', 'IP_addr_usb', 'setup_network_ipv4_input', '');
            inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT] = InputCtrl(setup_network_usb_form, 'netmask_usb', 'netmask_usb', 'setup_network_netmask_input', '');
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT] = InputCtrl(setup_network_usb_form, 'gateway_usb', 'gateway_usb', 'setup_network_gateway_input', '');
            inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT] = InputCtrl(setup_network_usb_form_part, 'IPv6_addr_usb', 'IPv6_addr_usb', 'setup_network_ipv6_input', '');
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT] = InputCtrl(setup_network_usb_form_part, 'IPv6_gateway_usb', 'IPv6_gateway_usb', 'setup_network_gateway2_input', '');
            

            inputNetworkObject[SETUP_NETWORK_USB_METRIC_INPUT] = InputCtrl(setup_network_usb_form, 'metric_usb', 'metric_usb', 'setup_network_usb_metric_input',  '');
            inputNetworkObject[SETUP_NETWORK_USB_METRIC_INPUT].getInputObject().keypress(function(event) {
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            });
            // radioUsbButtonGroup[SETUP_NETWORK_DHCP].displayDisabled();
            //dns
            radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL] = RadioButtonGroupCtrl(setup_network_dns_form, "setup_network_dns_manual", RADIO_GROUP.rID_0048, 'auto', callbackSetupNetworkDnsManual);
            inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT] = InputCtrl(setup_network_dns_form, 'pri_server', 'pri_server', 'setup_network_pri_server_input', '');
            inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT] = InputCtrl(setup_network_dns_form, 'sec_server', 'sec_server', 'setup_network_sec_server_input', '');

            // domain
            inputNetworkObject[SETUP_NETWORK_DOMAIN_INPUT] = InputCtrl("setup_network_domain_form", 'sec_server', 'sec_server', 'setup_network_domain_input', '');

            // common
            inputNetworkObject[SETUP_NETWORK_HTTP_PORT_INPUT] = InputCtrl("setup_network_common_form_part", 'port', 'port', 'setup_network_http_port_input',  '', null, '', '', '',5);
             // port 数字以外入力できない
            inputNetworkObject[SETUP_NETWORK_HTTP_PORT_INPUT].getInputObject().keypress(function(event) {
                var e = event.which?event.which:window.event.keyCode;
                if (e < 48 || e > 57) {
                    return false;
                }
            });           
            radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP] = RadioButtonGroupCtrl("setup_network_common_form_part", "setup_network_max_rtp", RADIO_GROUP.rID_0046, '1500', callbackSetupNetworkMaxRtp);
            radioNetworkButtonGroup[SETUP_NETWORK_EASY_IP] = RadioButtonGroupCtrl("setup_network_common_form_part", "setup_network_easy_ip", RADIO_GROUP.rID_0045, '20', callbackSetupNetworkEasyIp);
            selectNetworkObject[SETUP_NETWORK_HTTP_MAX_SELECT] = SelectCtrl("setup_network_common_form_part", "mss", "mss", "setup_network_http_max_select");
            for (var select in selectNetworkObject) {
                selectNetworkObject[select].show();
                selectNetworkObject[select].displayOff();
            }

            // inputNetworkObject[SETUP_NETWORK_PRI_SERVER2_INPUT] = InputCtrl(setup_network_lan_form_part, 'IPv6_pri_server', 'ip6_pri_server', 'setup_network_pri_server2_input', '');
            // inputNetworkObject[SETUP_NETWORK_SEC_SERVER2_INPUT] = InputCtrl(setup_network_lan_form_part, 'IPv6_sec_server', 'ip6_sec_server', 'setup_network_sec_server2_input', '');


            for (var input in inputNetworkObject) {
                inputNetworkObject[input].show();
                inputNetworkObject[input].displayOff();
            }
            for (var input in inputSfpPlusObject) {
                inputSfpPlusObject[input].show();
                inputSfpPlusObject[input].displayOff();
            }
            btnNetworkObject[SETUP_NETWORK_SET_BUTTON] = ButtonCtrl("setup_network_btn_set_area", "setup_network_set_button", NPTZ_WORDING.wID_0141, callbackNetworkLanDoSet);
            btnNetworkObject[SETUP_NETWORK_SFP_PLUS_SET_BUTTON] = ButtonCtrl("setup_network_sfp_plus_btn_set_area", "setup_network_set_button", NPTZ_WORDING.wID_0141, callbackNetworkSfpPlusDoSet);
            btnNetworkObject[SETUP_NETWORK_USB_SET_BUTTON] = ButtonCtrl("setup_network_usb_btn_set_area", "setup_network_set_button", NPTZ_WORDING.wID_0141, callbackNetworkUsbDoSet);
            btnNetworkObject[SETUP_NETWORK_DNS_SET_BUTTON] = ButtonCtrl("setup_network_dns_btn_set_area", "setup_network_set_button", NPTZ_WORDING.wID_0141, callbackNetworkDnsDoSet);
            btnNetworkObject[SETUP_NETWORK_DOMAIN_SET_BUTTON] = ButtonCtrl("setup_network_domain_btn_set_area", "setup_network_set_button", NPTZ_WORDING.wID_0141, callbackNetworkDomainDoSet);
            btnNetworkObject[SETUP_NETWORK_COMMON_SET_BUTTON] = ButtonCtrl("setup_network_common_btn_set_area", "setup_network_set_button", NPTZ_WORDING.wID_0141, callbackNetworkCommonDoSet);

             for (let btn in btnNetworkObject) {
                btnNetworkObject[btn].show();
                btnNetworkObject[btn].displayOff();
            }

            LineCtrl("setup_network_lan_inner", "vertical", 57, 37, 191,"setup_network_ipv4_network_label");
            LineCtrl("setup_network_dns_inner", "vertical", 301, 58, 85,"setup_network_dns_label");
            LineCtrl("setup_network_lan_inner", "vertical", 455, 37, 191,"setup_network_ipv6_network_label");
            // LineCtrl("setup_network_lan_inner", "vertical", 699, 58, 85,"setup_network_dns2_label");
            LineCtrl("setup_network_common_inner", "vertical", 853, 37, 297,"setup_network_common_label");
            LineCtrl("setup_network_lan_inner", "horizontal", 97, 50, 1518,"setup_network_dhcp_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 150, 50, 1518,"setup_network_ipv4_address_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 203, 50, 1518,"setup_network_subnet_mask_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 256, 50, 1518,"setup_network_default_gateway_label","96");
            LineCtrl("setup_network_dns_inner", "horizontal", 341, 71, 1497,"setup_network_primary_server_label","95");
            LineCtrl("setup_network_dns_inner", "horizontal", 402, 20, 1547,"setup_network_secondary_server_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 495, 50, 1518,"setup_network_manual_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 548, 50, 1518,"setup_network_ipv6_address_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 601, 50, 1518,"setup_network_default_gateway2_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 654, 50, 1518,"setup_network_dhcpv6_label","96");
            LineCtrl("setup_network_lan_inner", "horizontal", 654, 50, 1518,"setup_network_metric_label","96");

            LineCtrl("setup_network_sfp_plus_inner", "vertical", 57, 37, 191,"setup_network_ipv4_network_label");
            // LineCtrl("setup_network_sfp_plus_inner", "vertical", 455, 37, 191,"setup_network_ipv6_network_label");
            // LineCtrl("setup_network_lan_inner", "vertical", 699, 58, 85,"setup_network_dns2_label");
            LineCtrl("setup_network_common_inner", "vertical", 853, 37, 297,"setup_network_common_label");
            LineCtrl("setup_network_sfp_plus_inner", "horizontal", 97, 50, 1518,"setup_network_dhcp_label","96");
            LineCtrl("setup_network_sfp_plus_inner", "horizontal", 150, 50, 1518,"setup_network_ipv4_address_label","96");
            LineCtrl("setup_network_sfp_plus_inner", "horizontal", 203, 50, 1518,"setup_network_subnet_mask_label","96");
            LineCtrl("setup_network_sfp_plus_inner", "horizontal", 256, 50, 1518,"setup_network_default_gateway_label","96");
            //LineCtrl("setup_network_sfp_plus_inner", "horizontal", 341, 71, 1497,"setup_network_primary_server_label","95");
            // LineCtrl("setup_network_sfp_plus_inner", "horizontal", 402, 20, 1547,"setup_network_secondary_server_label","96");
            // LineCtrl("setup_network_sfp_plus_inner", "horizontal", 495, 50, 1518,"setup_network_manual_label","96");
            // LineCtrl("setup_network_sfp_plus_inner", "horizontal", 548, 50, 1518,"setup_network_ipv6_address_label","96");
            // LineCtrl("setup_network_sfp_plus_inner", "horizontal", 601, 50, 1518,"setup_network_default_gateway2_label","96");
            // LineCtrl("setup_network_sfp_plus_inner", "horizontal", 654, 50, 1518,"setup_network_dhcpv6_label","96");
            LineCtrl("setup_network_sfp_plus_inner", "horizontal", 654, 50, 1518,"setup_network_sfp_metric_label","96");
            // LineCtrl("setup_network_lan_inner", "horizontal", 739, 71, 1497,"setup_network_primary_server2_label","95");
            LineCtrl("setup_network_domain_inner", "horizontal", 800, 20, 1547,"setup_network_domain_label","96");
            LineCtrl("setup_network_common_inner", "horizontal", 893, 50, 1518,"setup_network_http_port_label","96");
            LineCtrl("setup_network_common_inner", "horizontal", 946, 50, 1518,"setup_network_max_rtp_label","96");
            LineCtrl("setup_network_common_inner", "horizontal", 999, 50, 1518,"setup_network_http_max_label","96");
            LineCtrl("setup_network_common_inner", "horizontal", 1052, 50, 1518,"setup_network_easy_ip_label","96");
            // LineCtrl("setup_network_common_inner", "horizontal", 1135, 50, 1518,"setup_network_recommended_network_label","96");
            LineCtrl("setup_network_usb_inner", "vertical", 57, 37, 191,"setup_network_ipv4_network_usb_label");
            LineCtrl("setup_network_usb_inner", "horizontal", 97, 50, 1518,"setup_network_dhcp_label","96");

            // LineCtrl("setup_network_usb_inner", "horizontal", 150, 50, 1518,"setup_network_ipv4_address_label","96");
            // LineCtrl("setup_network_usb_inner", "horizontal", 203, 50, 1518,"setup_network_subnet_mask_label","96");
            // LineCtrl("setup_network_usb_inner", "horizontal", 256, 50, 1518,"setup_network_default_gateway_label","96");
           
            LineCtrl("setup_network_usb_inner", "vertical", 455, 37, 191,"setup_network_ipv6_network_label");
            LineCtrl("setup_network_usb_inner", "horizontal", 150, 50, 1518,"setup_network_ipv4_address_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 203, 50, 1518,"setup_network_subnet_mask_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 256, 50, 1518,"setup_network_default_gateway_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 495, 50, 1518,"setup_network_manual_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 548, 50, 1518,"setup_network_ipv6_address_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 601, 50, 1518,"setup_network_default_gateway2_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 654, 50, 1518,"setup_network_dhcpv6_label","96");
            LineCtrl("setup_network_usb_inner", "horizontal", 97, 50, 1518,"setup_network_usb_metric_label","96");
            setSetupNetworkValueToEle();
            SFPModeControlMenu();
        } else {
            rebuildNetwork();
        }
    }

    function SFPModeControlMenu() {
        var is12GOutput = cparam_get_SFPMode();

        if(is12GOutput == 0) {
            menuNetworkObject[SETUP_NETWORK_MENU_SFP_PLUS_BUTTON].displayDisabled();
        } else {
            menuNetworkObject[SETUP_NETWORK_MENU_SFP_PLUS_BUTTON].displayOff();
        }
    }

    function buildNetworkStatus(){
        var mainDiv ="setup_network_setting_status_inner_main";
        var titleDiv = "setup_network_setting_status_inner_main_labels";
        var valueDiv = "setup_network_setting_status_inner_main_values";
        statusTitleObject[SETUP_NETWORK_STATUS_LAN] = TextCtrl(titleDiv, 'setup_network_status_lan_title', NPTZ_WORDING.wID_0670);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV4] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv4_title', NPTZ_WORDING.wID_0677);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV4_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv4_address_title', NPTZ_WORDING.wID_0474);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV4_SUBSET_MASK] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv4_subset_mask_title', NPTZ_WORDING.wID_0112);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV4_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv4_default_gateway_title', NPTZ_WORDING.wID_0113);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV6] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv6_title', NPTZ_WORDING.wID_0678);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS1] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv6_address1_title', NPTZ_WORDING.wID_0679);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS2] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv6_address2_title', NPTZ_WORDING.wID_0680);
        statusTitleObject[SETUP_NETWORK_STATUS_LAN_IPV6_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_lan_ipv6_default_gateway_title', NPTZ_WORDING.wID_0113);
        statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_title', NPTZ_WORDING.wID_0671);
        statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv4_title', NPTZ_WORDING.wID_0677);
        statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv4_address_title', NPTZ_WORDING.wID_0474);
        statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_SUBSET_MASK] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv4_subset_mask_title', NPTZ_WORDING.wID_0112);
        statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv4_default_gateway_title', NPTZ_WORDING.wID_0113);
        // statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv6_title', NPTZ_WORDING.wID_0678);
        // statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS1] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv6_address1_title', NPTZ_WORDING.wID_0679);
        // statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS2] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv6_address2_title', NPTZ_WORDING.wID_0680);
        // statusTitleObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_sfp_plus_ipv6_default_gateway_title', NPTZ_WORDING.wID_0113);
        if (!isUE163) {
            statusTitleObject[SETUP_NETWORK_STATUS_USB] = TextCtrl(titleDiv, 'setup_network_status_usb_title', NPTZ_WORDING.wID_0672);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_title', NPTZ_WORDING.wID_0677);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_address_title', NPTZ_WORDING.wID_0474);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4_SUBSET_MASK] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_subset_mask_title', NPTZ_WORDING.wID_0112);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_default_gateway_title', NPTZ_WORDING.wID_0113);
            
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_title', NPTZ_WORDING.wID_0678);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS1] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_address1_title', NPTZ_WORDING.wID_0679);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS2] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_address2_title', NPTZ_WORDING.wID_0680);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_default_gateway_title', NPTZ_WORDING.wID_0113);
            
            statusTitleObject[SETUP_NETWORK_STATUS_DNS1] = TextCtrl(titleDiv, 'setup_network_status_dns1_title', NPTZ_WORDING.wID_0673);
            statusTitleObject[SETUP_NETWORK_STATUS_DNS] = TextCtrl(titleDiv, 'setup_network_status_dns_title', NPTZ_WORDING.wID_0673);
            statusTitleObject[SETUP_NETWORK_STATUS_DNS_PRI_SERVER_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_dns_pri_server_address_title', NPTZ_WORDING.wID_0115);
            statusTitleObject[SETUP_NETWORK_STATUS_DNS_SEC_SERVER_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_dns_sec_server_address_title', NPTZ_WORDING.wID_0116);
        } else {
            statusTitleObject[SETUP_NETWORK_STATUS_USB] = TextCtrl(titleDiv, 'setup_network_status_usb_title isUE163', NPTZ_WORDING.wID_0672);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_title isUE163', NPTZ_WORDING.wID_0677);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_address_title isUE163', NPTZ_WORDING.wID_0474);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4_SUBSET_MASK] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_subset_mask_title isUE163', NPTZ_WORDING.wID_0112);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV4_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv4_default_gateway_title isUE163', NPTZ_WORDING.wID_0113);

            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_title isUE163', NPTZ_WORDING.wID_0678);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS1] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_address1_title isUE163', NPTZ_WORDING.wID_0679);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS2] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_address2_title isUE163', NPTZ_WORDING.wID_0680);
            statusTitleObject[SETUP_NETWORK_STATUS_USB_IPV6_DEFAULT_GATEWAY] = TextCtrl(titleDiv, 'setup_network_status_usb_ipv6_default_gateway_title isUE163', NPTZ_WORDING.wID_0113);
            
            statusTitleObject[SETUP_NETWORK_STATUS_DNS1] = TextCtrl(titleDiv, 'setup_network_status_dns1_title isUE163', NPTZ_WORDING.wID_0673);
            statusTitleObject[SETUP_NETWORK_STATUS_DNS] = TextCtrl(titleDiv, 'setup_network_status_dns_title isUE163', NPTZ_WORDING.wID_0673);
            statusTitleObject[SETUP_NETWORK_STATUS_DNS_PRI_SERVER_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_dns_pri_server_address_title isUE163', NPTZ_WORDING.wID_0115);
            statusTitleObject[SETUP_NETWORK_STATUS_DNS_SEC_SERVER_ADDRESS] = TextCtrl(titleDiv, 'setup_network_status_dns_sec_server_address_title isUE163', NPTZ_WORDING.wID_0116);
        }

        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV4_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_lan_ipv4_address_value', NPTZ_WORDING.wID_0474);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV4_SUBSET_MASK] = TextCtrl(valueDiv, 'setup_network_status_lan_ipv4_subset_mask_value', NPTZ_WORDING.wID_0112);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV4_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_lan_ipv4_default_gateway_value', NPTZ_WORDING.wID_0113);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS1] = TextCtrl(valueDiv, 'setup_network_status_lan_ipv6_address1_value', NPTZ_WORDING.wID_0679);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS2] = TextCtrl(valueDiv, 'setup_network_status_lan_ipv6_address2_value', NPTZ_WORDING.wID_0680);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV6_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_lan_ipv6_default_gateway_value', NPTZ_WORDING.wID_0113);
        statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_sfp_plus_ipv4_address_value', NPTZ_WORDING.wID_0474);
        statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_SUBSET_MASK] = TextCtrl(valueDiv, 'setup_network_status_sfp_plus_ipv4_subset_mask_value', NPTZ_WORDING.wID_0112);
        statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_sfp_plus_ipv4_default_gateway_value', NPTZ_WORDING.wID_0113);
        // statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS1] = TextCtrl(valueDiv, 'setup_network_status_sfp_plus_ipv6_address1_value', NPTZ_WORDING.wID_0679);
        // statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS2] = TextCtrl(valueDiv, 'setup_network_status_sfp_plus_ipv6_address2_value', NPTZ_WORDING.wID_0680);
        // statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_sfp_plus_ipv6_default_gateway_value', NPTZ_WORDING.wID_0113);
        if (!isUE163) {
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv4_address_value', NPTZ_WORDING.wID_0474);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_SUBSET_MASK] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv4_subset_mask_value', NPTZ_WORDING.wID_0112);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv4_default_gateway_value', NPTZ_WORDING.wID_0113);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS1] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv6_address1_value', NPTZ_WORDING.wID_0679);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS2] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv6_address2_value', NPTZ_WORDING.wID_0680);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv6_default_gateway_value', NPTZ_WORDING.wID_0113);
            statusValueObject[SETUP_NETWORK_STATUS_DNS_PRI_SERVER_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_dns_pri_server_address_value', NPTZ_WORDING.wID_0115);
            statusValueObject[SETUP_NETWORK_STATUS_DNS_SEC_SERVER_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_dns_sec_server_address_value', NPTZ_WORDING.wID_0116);
        } else {
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv4_address_value isUE163', NPTZ_WORDING.wID_0474);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_SUBSET_MASK] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv4_subset_mask_value isUE163', NPTZ_WORDING.wID_0112);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv4_default_gateway_value isUE163', NPTZ_WORDING.wID_0113);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS1] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv6_address1_value isUE163', NPTZ_WORDING.wID_0679);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS2] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv6_address2_value isUE163', NPTZ_WORDING.wID_0680);
            statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_DEFAULT_GATEWAY] = TextCtrl(valueDiv, 'setup_network_status_usb_ipv6_default_gateway_value isUE163', NPTZ_WORDING.wID_0113);
            statusValueObject[SETUP_NETWORK_STATUS_DNS_PRI_SERVER_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_dns_pri_server_address_value isUE163 isUE163', NPTZ_WORDING.wID_0115);
            statusValueObject[SETUP_NETWORK_STATUS_DNS_SEC_SERVER_ADDRESS] = TextCtrl(valueDiv, 'setup_network_status_dns_sec_server_address_value isUE163 isUE163', NPTZ_WORDING.wID_0116);
        }

        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv4_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv4_address_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv4_subset_mask_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv4_default_gateway_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv6_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv6_address1_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv6_address2_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_lan_ipv6_default_gateway_title", "96");

        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_sfp_plus_ipv4_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_sfp_plus_ipv4_address_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_sfp_plus_ipv4_subset_mask_title", "96");
        LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_sfp_plus_ipv4_default_gateway_title", "96");

        // LineCtrl(mainDiv, "horizontal", 97, 50, 1518,"setup_network_status_sfp_plus_ipv6_title","96");          
        // LineCtrl(mainDiv, "horizontal", 97, 50, 1518,"setup_network_status_sfp_plus_ipv6_address_title","96");   
        // LineCtrl(mainDiv, "horizontal", 97, 50, 1518,"setup_network_status_sfp_plus_ipv6_subset_mask_title","96");  
        // LineCtrl(mainDiv, "horizontal", 97, 50, 1518,"setup_network_status_sfp_plus_ipv6_default_gateway_title","96"); 

        if (!isUE163) {
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_address_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_subset_mask_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_default_gateway_title", "96");

            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_address1_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_address2_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_default_gateway_title", "96");

            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_dns_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_dns_pri_server_address_title", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_dns_sec_server_address_title", "96");
        } else {
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_address_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_subset_mask_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv4_default_gateway_title_isUE163", "96");

            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_address1_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_address2_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_usb_ipv6_default_gateway_title_isUE163", "96");

            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_dns_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_dns_pri_server_address_title_isUE163", "96");
            LineCtrl(mainDiv, "horizontal", 97, 50, 1518, "setup_network_status_dns_sec_server_address_title_isUE163", "96");
        }
        
        for (var txt in statusTitleObject) {
            if (isUE163 && txt >= SETUP_NETWORK_STATUS_SFP_PLUS && txt <= SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_DEFAULT_GATEWAY) {
                continue;
            }

            statusTitleObject[txt].show();
        }
        for (var txt in statusValueObject) {
            if (isUE163 && txt >= SETUP_NETWORK_STATUS_SFP_PLUS && txt <= SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_DEFAULT_GATEWAY) {
                continue;
            }

            statusValueObject[txt].show();
        }

    }

    /**
     * Network画面構築処理
     */
    function rebuildNetwork() {
        setSetupNetworkValueToEle();
		initSettingNetworkStatusEle();
        SFPModeControlMenu();
    }
    /**
     * callbackNetworkMenuSettingStatusボタン押下時の画面表示切替処理
     */
    function callbackNetworkMenuSettingStatus(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").show();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").hide();
            $("#setup_network_usb_inner").hide();
            $("#setup_network_dns_inner").hide();
            $("#setup_network_domain_inner").hide();
            $("#setup_network_common_inner").hide();
            menuNetworkObject[SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON].displayOn();
            rebuildNetwork();
        }
    }
    function initSettingNetworkStatusEle() {
        $("#setup_network_setting_status_inner").show();
        $("#setup_network_lan_inner").hide();
        $("#setup_network_sfp_plus_inner").hide();
        $("#setup_network_usb_inner").hide();
        $("#setup_network_dns_inner").hide();
        $("#setup_network_domain_inner").hide();
        $("#setup_network_common_inner").hide();
        menuNetworkObject[SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON].displayOn();
    }   
    /**
     * callbackAdvancedMenuNtpボタン押下時の画面表示切替処理
     */
     function callbackNetworkMenuLan(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").hide();
            $("#setup_network_lan_inner").show();
            $("#setup_network_sfp_plus_inner").hide();
            $("#setup_network_usb_inner").hide();
            $("#setup_network_dns_inner").hide();
            $("#setup_network_domain_inner").hide();
            $("#setup_network_common_inner").hide();
            // menuNetworkObject[SETUP_NETWORK_MENU_SETTING_STATUS_BUTTON].displayOff();
            // menuNetworkObject[SETUP_NETWORK_MENU_LAN_BUTTON].displayOn();
            // setSetupAdvancedNtpValueToEle();
            objLan0NetWork = getLan0Network();
  
            // radio
            setSetupNetworkValueToRadio();
            // setSetupNetworkSfpValueToRadio();
            // input
            setSetupNetworkValueToInput();
        }
    }
    function callbackNetworkSfpPlus(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").hide();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").show();
            $("#setup_network_usb_inner").hide();
            $("#setup_network_dns_inner").hide();
            $("#setup_network_domain_inner").hide();
            $("#setup_network_common_inner").hide();
            objLan1NetWork = getLan1Network();
  
            // radio
            setSetupNetworkSfpValueToRadio();
            // input
            setSetupNetworkSfpValueToInput();
        }
    }
    function callbackNetworkMenuUsb(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").hide();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").hide();
            $("#setup_network_usb_inner").show();
            $("#setup_network_dns_inner").hide();
            $("#setup_network_domain_inner").hide();
            $("#setup_network_common_inner").hide();
            objUsbNetWork = getUsbNetwork();
            // radio
            setSetupNetworkUsbValueToRadio();
             // input
            setSetupNetworkUsbValueToInput();
        }
    }
    function callbackNetworkMenuDns(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").hide();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").hide();
            $("#setup_network_usb_inner").hide();
            $("#setup_network_dns_inner").show();
            $("#setup_network_domain_inner").hide();
            $("#setup_network_common_inner").hide();
            //setSetupAdvancedNtpValueToEle();
            objLan0NetWork = getLan0Network();
            setSetupNetworkDnsToInput();
        }
    }
    function callbackNetworkMenuDomain(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").hide();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").hide();
            $("#setup_network_usb_inner").hide();
            $("#setup_network_dns_inner").hide();
            $("#setup_network_domain_inner").show();
            $("#setup_network_common_inner").hide();
            // setSetupAdvancedNtpValueToEle();
            objLan0NetWork = getLan0Network();
            setSetupNetworkDomainToInput();
        }
    }
    function callbackNetworkMenuCommon(mouse){
        if (mouse == Button.MOUSE_DOWN) {
            $("#setup_network_setting_status_inner").hide();
            $("#setup_network_lan_inner").hide();
            $("#setup_network_sfp_plus_inner").hide();
            $("#setup_network_usb_inner").hide();
            $("#setup_network_dns_inner").hide();
            $("#setup_network_domain_inner").hide();
            $("#setup_network_common_inner").show();
            // setSetupAdvancedNtpValueToEle();
            objLan0NetWork = getLan0Network();
            setSetupNetworkCommonToInput();
        }
    }
    function setSetupNetworkValueToEle() {
        objLan0ActiveNetWork = getLan0ActiveNetwork();
        objLan1ActiveNetWork = getLan1ActiveNetwork();
        objUsbActiveNetWork = getUsbActiveNetwork();
        setLan0ValueToStatus();
        setLan1ValueToStatus();
        setUsbValueToStatus();
        // select
        setSetupNetworkHttpMaxToSelect();
        // other
        ChangeDhcp();
        ChangeUsbDhcp();
        ChangeSfpPlusDhcp();
        ChangeDns();
        ChangeIPv6Manual();
        // ChangeIPv6SfpManual();
    }
    function setLan0ValueToStatus(){
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV4_ADDRESS].set(objLan0ActiveNetWork.ip4_addr);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV4_SUBSET_MASK].set(objLan0ActiveNetWork.ip4_netmask);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV4_DEFAULT_GATEWAY].set(objLan0ActiveNetWork.ip4_gateway);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS1].set(objLan0ActiveNetWork.ip6_addr1);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV6_ADDRESS2].set(objLan0ActiveNetWork.ip6_addr2);
        statusValueObject[SETUP_NETWORK_STATUS_LAN_IPV6_DEFAULT_GATEWAY].set(objLan0ActiveNetWork.ip6_gateway);
        statusValueObject[SETUP_NETWORK_STATUS_DNS_PRI_SERVER_ADDRESS].set(objLan0ActiveNetWork.pri_server);
        statusValueObject[SETUP_NETWORK_STATUS_DNS_SEC_SERVER_ADDRESS] .set(objLan0ActiveNetWork.sec_server);
    }
    function setLan1ValueToStatus(){
        statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_ADDRESS].set(objLan1ActiveNetWork.ip4_addr);
        statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_SUBSET_MASK].set(objLan1ActiveNetWork.ip4_netmask);
        statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV4_DEFAULT_GATEWAY].set(objLan1ActiveNetWork.ip4_gateway);
        // statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS1].set(objLan1ActiveNetWork.ip6_addr1);
        // statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_ADDRESS2].set(objLan1ActiveNetWork.ip6_addr2);
        // statusValueObject[SETUP_NETWORK_STATUS_SFP_PLUS_IPV6_DEFAULT_GATEWAY].set(objLan1ActiveNetWork.ip6_gateway);
    }
    function setUsbValueToStatus(){
        statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_ADDRESS].set(objUsbActiveNetWork.ip4_addr);
        statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_SUBSET_MASK].set(objUsbActiveNetWork.ip4_netmask);
        statusValueObject[SETUP_NETWORK_STATUS_USB_IPV4_DEFAULT_GATEWAY].set(objUsbActiveNetWork.ip4_gateway);
        statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS1].set(objUsbActiveNetWork.ip6_addr1);
        statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_ADDRESS2].set(objUsbActiveNetWork.ip6_addr2);
        statusValueObject[SETUP_NETWORK_STATUS_USB_IPV6_DEFAULT_GATEWAY].set(objUsbActiveNetWork.ip6_gateway);
    }

    function setSetupNetworkValueToRadio() {
        radioNetworkButtonGroup[SETUP_NETWORK_DHCP].setSelectedValue(checkRadioValue(objLan0NetWork.ip4_dhcp, "0") ? "0" : "1");
        radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue(checkRadioValue(objLan0NetWork.dns, "manual") ? "manual" : "auto");
        if (objLan0NetWork.hasOwnProperty("ip6_auto")) {
            radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].setSelectedValue(checkRadioValue(objLan0NetWork.ip6_auto, "0") ? "0" : "1");
            radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].setSelectedValue(checkRadioValue(objLan0NetWork.ip6_dhcp, "0") ? "0" : "1");
            radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].setSelectedValue(checkRadioValue(objLan0NetWork.rtp_packet_max, "1500") ? "1500" : "1280");
        }
        else {
            radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].setSelectedValue("0");
            radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].setSelectedValue("1");
            radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].setSelectedValue("1500");
        }
        radioNetworkButtonGroup[SETUP_NETWORK_EASY_IP].setSelectedValue(checkRadioValue(objLan0NetWork.time, "20") ? "20" : 'unlimited');
    }
    function setSetupNetworkSfpValueToRadio() {
        radioSfpPlusButtonGroup[SETUP_NETWORK_DHCP].setSelectedValue(checkRadioValue(objLan1NetWork.ip4_dhcp, "0") ? "0" : "1");
        // if (objLan1NetWork.hasOwnProperty("ip6_auto")) {
        //     radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL].setSelectedValue(checkRadioValue(objLan1NetWork.ip6_auto, "0") ? "0" : "1");
        //     radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].setSelectedValue(checkRadioValue(objLan1NetWork.ip6_dhcp, "0") ? "0" : "1");
        // }
        // else {
        //     radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL].setSelectedValue("0");
        //     radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].setSelectedValue("1");
        // }
    }
    function setSetupNetworkUsbValueToRadio() {
        radioUsbButtonGroup[SETUP_NETWORK_DHCP].setSelectedValue(checkRadioValue(objUsbNetWork.ip4_dhcp, "0") ? "0" : "1");
        // radioUsbButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue(checkRadioValue(objLan0NetWork.dns, "manual") ? "manual" : "auto");
        if (objUsbNetWork.hasOwnProperty("ip6_auto")) {
            radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL].setSelectedValue(checkRadioValue(objUsbNetWork.ip6_auto, "0") ? "0" : "1");
            radioUsbButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].setSelectedValue(checkRadioValue(objUsbNetWork.ip6_dhcp, "0") ? "0" : "1");
            // radioUsbButtonGroup[SETUP_NETWORK_MAX_RTP].setSelectedValue(checkRadioValue(objUsbNetWork.rtp_packet_max, "1500") ? "1500" : "1280");
        }
        else {
            radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL].setSelectedValue("0");
            radioUsbButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].setSelectedValue("1");
            // radioUsbButtonGroup[SETUP_NETWORK_MAX_RTP].setSelectedValue("1500");
        }
        // radioUsbButtonGroup[SETUP_NETWORK_EASY_IP].setSelectedValue(checkRadioValue(objUsbNetWork.time, "20") ? "20" : 'unlimited');
    }
    function checkRadioValue(strValue, targetValue) {
        if (strValue == targetValue) {
            return true;
        } else {
            return false;
        }
    }

    function setSetupNetworkValueToInput() {
        if (objLan0NetWork.ip4_addr && objLan0NetWork.ip4_addr.split('.').length == 4) {
            inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].set(objLan0NetWork.ip4_addr != "" ? objLan0NetWork.ip4_addr : "");
        }
        if (objLan0NetWork.ip4_netmask && objLan0NetWork.ip4_netmask.split('.').length == 4) {
            inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].set(objLan0NetWork.ip4_netmask != "" ? objLan0NetWork.ip4_netmask : "");
        }
        if (objLan0NetWork.ip4_gateway && objLan0NetWork.ip4_gateway.split('.').length == 4) {
            inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].set(objLan0NetWork.ip4_gateway != "" ? objLan0NetWork.ip4_gateway : "");
        }
        if (checkRadioValue(objLan0NetWork.ip4_dhcp, "0")){
            inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].displayOff();
        }else{
            inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].displayDisabled();
        }
        // 20220906 null
        if (objLan0NetWork.pri_server) {
            inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].set(objLan0NetWork.pri_server != "" ? objLan0NetWork.pri_server : "");
        }
        if (objLan0NetWork.sec_server) {
            inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].set(objLan0NetWork.sec_server != "" ? objLan0NetWork.sec_server : "");
        }

        if (objLan0NetWork.hasOwnProperty("ip6_auto")) {
            inputNetworkObject[SETUP_NETWORK_IPV6_INPUT].set(objLan0NetWork.ip6_addr != "" ? objLan0NetWork.ip6_addr : "");
            inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT].set(objLan0NetWork.ip6_gateway != "" ? objLan0NetWork.ip6_gateway : "");
        }
        if (checkRadioValue(objLan0NetWork.ip6_auto, "0")){
            inputNetworkObject[SETUP_NETWORK_IPV6_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT].displayOff();
        }else{
            inputNetworkObject[SETUP_NETWORK_IPV6_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT].displayDisabled();
        }
        inputNetworkObject[SETUP_NETWORK_HTTP_PORT_INPUT].set(objLan0NetWork.port != "" ? objLan0NetWork.port : "80");
        inputNetworkObject[SETUP_NETWORK_LAN_METRIC_INPUT].set(objLan0NetWork.metric);

    }

    function setSetupNetworkDnsToInput() {
        radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue(objLan0NetWork.dns != "" ? objLan0NetWork.dns : "auto");
        ChangeDns();
        if (objLan0NetWork.pri_server) {
            inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].set(objLan0NetWork.pri_server != "" ? objLan0NetWork.pri_server : "");
        }
        if (objLan0NetWork.sec_server) {
            inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].set(objLan0NetWork.sec_server != "" ? objLan0NetWork.sec_server : "");
        }
    }
    function setSetupNetworkDomainToInput(){
        inputNetworkObject[SETUP_NETWORK_DOMAIN_INPUT].set(objLan0NetWork.domain != "" ? objLan0NetWork.domain : "");
    }
    //lijiaming
    function setSetupNetworkCommonToInput(){
        inputNetworkObject[SETUP_NETWORK_HTTP_PORT_INPUT].set(objLan0NetWork.port != "" ? objLan0NetWork.port : "80");
        if (objLan0NetWork.hasOwnProperty("ip6_auto")) {
            radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].setSelectedValue(checkRadioValue(objLan0NetWork.rtp_packet_max, "1500") ? "1500" : "1280");
        }else{
            radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].setSelectedValue("1500");
        }
        radioNetworkButtonGroup[SETUP_NETWORK_EASY_IP].setSelectedValue(checkRadioValue(objLan0NetWork.time, "20") ? "20" : 'unlimited');
        var select_network_http_max_value = [];
        var select_network_http_max_text = [];
        select_network_http_max_value.push(
            1460,
            1280,
            1024
        );
        select_network_http_max_text.push(
            "Unlimited(1460byte)",
            "Limited(1280byte)",
            "Limited(1024byte)"
        );
        selectNetworkObject[SETUP_NETWORK_HTTP_MAX_SELECT].appendOptions(select_network_http_max_value, select_network_http_max_text);
        // if (objNetWork.hasOwnProperty("ip6_auto")) {
            cpage_initSelect(document.getElementById("mss"), objLan0NetWork.mss, 0);
        // }
    }
    function setSetupNetworkSfpValueToInput() {
        if (objLan1NetWork.ip4_addr && objLan1NetWork.ip4_addr.split('.').length == 4) {
            inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].set(objLan1NetWork.ip4_addr != "" ? objLan1NetWork.ip4_addr : "");
        }
        if (objLan1NetWork.ip4_netmask && objLan1NetWork.ip4_netmask.split('.').length == 4) {
            inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].set(objLan1NetWork.ip4_netmask != "" ? objLan1NetWork.ip4_netmask : "");
        }
        if (objLan1NetWork.ip4_gateway && objLan1NetWork.ip4_gateway.split('.').length == 4) {
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].set(objLan1NetWork.ip4_gateway != "" ? objLan1NetWork.ip4_gateway : "");
        }
        if (checkRadioValue(objLan1NetWork.ip4_dhcp, "0")){
            inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].displayOff();
            inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].displayOff();
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].displayOff();
        }else{
            inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].displayDisabled();
            inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].displayDisabled();
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].displayDisabled();
        }
        // if (objLan1NetWork.hasOwnProperty("ip6_auto")) {
        //     inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT].set(objLan1NetWork.ip6_addr != "" ? objLan1NetWork.ip6_addr : "");
        //     inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT].set(objLan1NetWork.ip6_gateway != "" ? objLan1NetWork.ip6_gateway : "");
        // }
        // if (checkRadioValue(objLan1NetWork.ip6_auto, "0")){
        //     inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT].displayOff();
        //     inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT].displayOff();
        // }else{
        //     inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT].displayDisabled();
        //     inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT].displayDisabled();
        // }
        inputSfpPlusObject[SETUP_NETWORK_METRIC_INPUT].set(objLan1NetWork.metric);
    }

    function setSetupNetworkUsbValueToInput() {
        if (objUsbNetWork.ip4_addr && objUsbNetWork.ip4_addr.split('.').length == 4) {
            inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].set(objUsbNetWork.ip4_addr != "" ? objUsbNetWork.ip4_addr : "");
        }
        if (objUsbNetWork.ip4_netmask && objUsbNetWork.ip4_netmask.split('.').length == 4) {
            inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].set(objUsbNetWork.ip4_netmask != "" ? objUsbNetWork.ip4_netmask : "");
        }
        if (objUsbNetWork.ip4_gateway && objUsbNetWork.ip4_gateway.split('.').length == 4) {
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].set(objUsbNetWork.ip4_gateway != "" ? objUsbNetWork.ip4_gateway : "");
        }
        if (checkRadioValue(objUsbNetWork.ip4_dhcp, "0")){
            inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].displayOff();
        }else{
            inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].displayDisabled();
        }
        // 20220906 null
        // if (objUsbNetWork.pri_server) {
        //     inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].set(objUsbNetWork.pri_server != "" ? objUsbNetWork.pri_server : "");
        // }
        // if (objUsbNetWork.sec_server) {
        //     inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].set(objUsbNetWork.sec_server != "" ? objUsbNetWork.sec_server : "");
        // }

        if (objUsbNetWork.hasOwnProperty("ip6_auto")) {
            inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT].set(objUsbNetWork.ip6_addr != "" ? objUsbNetWork.ip6_addr : "");
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT].set(objUsbNetWork.ip6_gateway != "" ? objUsbNetWork.ip6_gateway : "");
        }
        if (checkRadioValue(objUsbNetWork.ip6_auto, "0")){
            inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT].displayOff();
        }else{
            inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT].displayDisabled();
        }
        // inputNetworkObject[SETUP_NETWORK_HTTP_PORT_INPUT].set(objUsbNetWork.port != "" ? objUsbNetWork.port : "80");
        inputNetworkObject[SETUP_NETWORK_USB_METRIC_INPUT].set(objUsbNetWork.metric);
        // data['metric'] = inputNetworkObject[SETUP_NETWORK_USB_METRIC_INPUT].get();
    }

    function setSetupNetworkHttpMaxToSelect() {
        var select_network_http_max_value = [];
        var select_network_http_max_text = [];
        select_network_http_max_value.push(
            1460,
            1280,
            1024
        );
        select_network_http_max_text.push(
            "Unlimited(1460byte)",
            "Limited(1280byte)",
            "Limited(1024byte)"
        );
        selectNetworkObject[SETUP_NETWORK_HTTP_MAX_SELECT].appendOptions(select_network_http_max_value, select_network_http_max_text);
        if (objNetWork.hasOwnProperty("ip6_auto")) {
            cpage_initSelect(document.getElementById("mss"), objLan0NetWork.mss, 0);
        }
    }


    function callbackSetupNetworkDhcp() {
        ChangeDhcp();
    }
    function callbackSetupNetworkSfpPlusDhcp() {
        ChangeSfpPlusDhcp();
    }

    function callbackSetupNetworkUsbDhcp() {
        ChangeUsbDhcp();

    }

    function callbackSetupNetworkDnsManual() {
        ChangeDns();
    }

    function callbackSetupNetworkIpv6Manual() {
        ChangeIPv6Manual();
    }

    function callbackSetupNetworkUsbIpv6Manual() {
        ChangeIPv6UsbManual();
    }

    function callbackSetupNetworkSfpIpv6Manual() {
        ChangeIPv6SfpManual();
    }

    function callbackSetupNetworkIpv6Dhcpv6() {
        ChangeDhcp();
    }

    function callbackSetupNetworkUsbIpv6Dhcpv6() {
        ChangeUsbDhcp();
    }

    function callbackSetupNetworkMaxRtp() {
    }

    function callbackSetupNetworkEasyIp() {
    }

    // function callbackNetworkExecute(mouse) {
    //     if (mouse == Button.MOUSE_DOWN) {
    //         DoSubmit('internet');
    //     }
    // }

    // function callbackNetworkConfirm(mouse) {
    //     if (mouse == Button.MOUSE_DOWN) {
    //         objWindow = window.open('/live/setup_check_active_network_setting.html', 'setup_check_active_network', 'menubar=no,toolbar=no,status=no,resizable=no,width=1150,height=620,top=154,left=362')
    //     }
    // }

    function callbackNetworkLanDoSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoLanSubmit();
        }
    }
    function callbackNetworkSfpPlusDoSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoSfpPlusSubmit();
        }
    }
    function callbackNetworkUsbDoSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoUsbSubmit();
        }
    }
    function callbackNetworkDnsDoSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoDnsSubmit();
        }
    }
    function callbackNetworkDomainDoSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoDomainSubmit();
        }
    }
    function callbackNetworkCommonDoSet(mouse) {
        if (mouse == Button.MOUSE_DOWN) {
            DoCommonSubmit();
        }
    }
    function UpdateNetworkParams() {
        giDhcp = radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue() == "1" ? "1" : "0";
        gsIp1 = $("#IP_addr").val().split(".")[0];
        gsIp2 = $("#IP_addr").val().split(".")[1];
        gsIp3 = $("#IP_addr").val().split(".")[2];
        gsIp4 = $("#IP_addr").val().split(".")[3];
        gsMask1 = $("#netmask").val().split(".")[0];
        gsMask2 = $("#netmask").val().split(".")[1];
        gsMask3 = $("#netmask").val().split(".")[2];
        gsMask4 = $("#netmask").val().split(".")[3];
        gsGate1 = $("#gateway").val().split(".")[0];
        gsGate2 = $("#gateway").val().split(".")[1];
        gsGate3 = $("#gateway").val().split(".")[2];
        gsGate4 = $("#gateway").val().split(".")[3];
        gsHttpPort = parseInt($("#port").val());
        gsDns = radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue() == "auto" ? "auto" : "manual";
    }

    function ChangeDhcp() {
        if (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == "1" || radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue() == "1") {
            radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].displayOff();
            radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue(checkRadioValue(objNetWork.dns, "manual") ? "manual" : "auto");

        }
        else {
            // radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue("manual");
            // radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].displayDisabled();
        }
        // ChangeDns();

        if (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == "1") {
            inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].displayDisabled();
        } else {
            inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].displayOff();
        }
    }

    function ChangeUsbDhcp() {
        // if (radioUsbButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == "1" || radioUsbButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue() == "1") {
        //     radioUsbButtonGroup[SETUP_NETWORK_DNS_MANUAL].displayOff();
        //     radioUsbButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue(checkRadioValue(objNetWork.dns, "manual") ? "manual" : "auto");

        // }
        // else {
            // radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue("manual");
            // radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].displayDisabled();
        // }
       

        if (radioUsbButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == "1") {
            inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].displayDisabled();
        } else {
            inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].displayOff();
        }
        // ChangeDns();
    }

    function ChangeSfpPlusDhcp() {
        // if (radioSfpPlusButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == "1" || radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue() == "1") {
        //     radioSfpPlusButtonGroup[SETUP_NETWORK_DNS_MANUAL].displayOff();
        //     radioSfpPlusButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue(checkRadioValue(objNetWork.dns, "manual") ? "manual" : "auto");

        // }
        // else {
            // radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].setSelectedValue("manual");
            // radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].displayDisabled();
        // }
        // ChangeDns();

        if (radioSfpPlusButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == "1") {
            inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].displayDisabled();
            inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].displayDisabled();
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].displayDisabled();
        } else {
            inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].displayOff();
            inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].displayOff();
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].displayOff();
        }
    }
    function ChangeDns() {
        let bDisabled = false;
        if (radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue() == "auto") {
            bDisabled = true;
        }
        if (bDisabled) {
            inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].displayDisabled();
        } else {
            inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].displayOff();
        }
    }

    function getLanNetworkFormData() {
        var data = {};
        data['interface']="lan0"
        var setup_network_ipv4_input_flag = false;
        var setup_network_netmask_input_flag = false;
        var setup_network_gateway_input_flag = false;
        var setup_network_pri_server_input_flag = false;
        var setup_network_sec_server_input_flag = false;
        data['dhcp'] = radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue();
        if(inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].get()){
            setup_network_ipv4_input_flag = true;
        } else {
            setup_network_ipv4_input_flag = false;
        }
        data['IP_addr1'] = setup_network_ipv4_input_flag ? inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[0] : "";
        data['IP_addr2'] = setup_network_ipv4_input_flag ? inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[1] : "";
        data['IP_addr3'] = setup_network_ipv4_input_flag ? inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[2] : "";
        data['IP_addr4'] = setup_network_ipv4_input_flag ? inputNetworkObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[3] : "";
        if(inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].get()){
            setup_network_netmask_input_flag = true;
        } else {
            setup_network_netmask_input_flag = false;
        }
        data['netmask1'] = setup_network_netmask_input_flag ? inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[0] : "";
        data['netmask2'] = setup_network_netmask_input_flag ? inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[1] : "";
        data['netmask3'] = setup_network_netmask_input_flag ? inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[2] : "";
        data['netmask4'] = setup_network_netmask_input_flag ? inputNetworkObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[3] : "";
        if(inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].get()){
            setup_network_gateway_input_flag = true;
        } else {
            setup_network_gateway_input_flag = false;
        }
        data['gateway1'] = setup_network_gateway_input_flag ? inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[0] : "";
        data['gateway2'] = setup_network_gateway_input_flag ? inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[1] : "";
        data['gateway3'] = setup_network_gateway_input_flag ? inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[2] : "";
        data['gateway4'] = setup_network_gateway_input_flag ? inputNetworkObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[3] : "";
        data['ip6_auto'] = radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue();
        data['ip6_addr'] = inputNetworkObject[SETUP_NETWORK_IPV6_INPUT].get();
        data['ip6_gateway'] = inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT].get();
        data['ip6_dhcp'] = radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue();
        data['metric'] = inputNetworkObject[SETUP_NETWORK_LAN_METRIC_INPUT].get();
        return data;
    }
    function getSfpPlusNetworkFormData() {
        var data = {};
        data['interface']="lan1"
        var setup_network_ipv4_input_flag = false;
        var setup_network_netmask_input_flag = false;
        var setup_network_gateway_input_flag = false;
        var setup_network_pri_server_input_flag = false;
        var setup_network_sec_server_input_flag = false;
        data['dhcp'] =  radioSfpPlusButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue();
        if(inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].get()){
            setup_network_ipv4_input_flag = true;
        } else {
            setup_network_ipv4_input_flag = false;
        }
        data['IP_addr1'] = setup_network_ipv4_input_flag ? inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[0] : "";
        data['IP_addr2'] = setup_network_ipv4_input_flag ? inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[1] : "";
        data['IP_addr3'] = setup_network_ipv4_input_flag ? inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[2] : "";
        data['IP_addr4'] = setup_network_ipv4_input_flag ? inputSfpPlusObject[SETUP_NETWORK_IPV4_INPUT].get().split('.')[3] : "";
        if(inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].get()){
            setup_network_netmask_input_flag = true;
        } else {
            setup_network_netmask_input_flag = false;
        }
        data['netmask1'] = setup_network_netmask_input_flag ? inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[0] : "";
        data['netmask2'] = setup_network_netmask_input_flag ? inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[1] : "";
        data['netmask3'] = setup_network_netmask_input_flag ? inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[2] : "";
        data['netmask4'] = setup_network_netmask_input_flag ? inputSfpPlusObject[SETUP_NETWORK_NETMASK_INPUT].get().split('.')[3] : "";
        if(inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].get()){
            setup_network_gateway_input_flag = true;
        } else {
            setup_network_gateway_input_flag = false;
        }
        data['gateway1'] = setup_network_gateway_input_flag ? inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[0] : "";
        data['gateway2'] = setup_network_gateway_input_flag ? inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[1] : "";
        data['gateway3'] = setup_network_gateway_input_flag ? inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[2] : "";
        data['gateway4'] = setup_network_gateway_input_flag ? inputSfpPlusObject[SETUP_NETWORK_GATEWAY_INPUT].get().split('.')[3] : "";
        // data['ip6_auto'] = radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue();
        // data['ip6_addr'] = inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT].get();
        // data['ip6_gateway'] = inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT].get();
        // data['ip6_dhcp'] = radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue();
        data['metric'] = inputSfpPlusObject[SETUP_NETWORK_METRIC_INPUT].get();
        return data;
    }
    function getUsbNetworkFormData() {
        var data = {};
        data['interface']="usb0"
        data['dhcp'] = radioUsbButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue();

        var setup_network_ipv4_input_flag_usb = false;
        var setup_network_netmask_input_flag_usb = false;
        var setup_network_gateway_input_flag_usb = false;
        var setup_network_pri_server_input_flag = false;
        var setup_network_sec_server_input_flag = false;
        if(inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].get()){
            setup_network_ipv4_input_flag_usb = true;
        } else {
            setup_network_ipv4_input_flag_usb = false;
        }
        data['IP_addr1'] = setup_network_ipv4_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].get().split('.')[0] : "";
        data['IP_addr2'] = setup_network_ipv4_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].get().split('.')[1] : "";
        data['IP_addr3'] = setup_network_ipv4_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].get().split('.')[2] : "";
        data['IP_addr4'] = setup_network_ipv4_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_IPV4_INPUT].get().split('.')[3] : "";
        if(inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].get()){
            setup_network_netmask_input_flag_usb = true;
        } else {
            setup_network_netmask_input_flag_usb = false;
        }
        data['netmask1'] = setup_network_netmask_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].get().split('.')[0] : "";
        data['netmask2'] = setup_network_netmask_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].get().split('.')[1] : "";
        data['netmask3'] = setup_network_netmask_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].get().split('.')[2] : "";
        data['netmask4'] = setup_network_netmask_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_NETMASK_INPUT].get().split('.')[3] : "";
        if(inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].get()){
            setup_network_gateway_input_flag_usb = true;
        } else {
            setup_network_gateway_input_flag_usb = false;
        }
        data['gateway1'] = setup_network_gateway_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].get().split('.')[0] : "";
        data['gateway2'] = setup_network_gateway_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].get().split('.')[1] : "";
        data['gateway3'] = setup_network_gateway_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].get().split('.')[2] : "";
        data['gateway4'] = setup_network_gateway_input_flag_usb ? inputNetworkObject[SETUP_NETWORK_USB_GATEWAY_INPUT].get().split('.')[3] : "";
        data['ip6_auto'] = radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue();
        data['ip6_addr'] = inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT].get();
        data['ip6_gateway'] = inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT].get();
        data['ip6_dhcp'] = radioUsbButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue();
        
        data['metric'] = inputNetworkObject[SETUP_NETWORK_USB_METRIC_INPUT].get();
        return data;
    }
    function getDnsNetworkFormData() {
        var data = {};
        data['interface']="lan0"
        if (inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].get()) {
            setup_network_pri_server_input_flag = true;
        } else {
            setup_network_pri_server_input_flag = false;
        }
        // data['pri_server1'] = setup_network_pri_server_input_flag ? inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].get().split('.')[0] : "";
        // data['pri_server2'] = setup_network_pri_server_input_flag ? inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].get().split('.')[1] : "";
        // data['pri_server3'] = setup_network_pri_server_input_flag ? inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].get().split('.')[2] : "";
        // data['pri_server4'] = setup_network_pri_server_input_flag ? inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].get().split('.')[3] : "";
        data['pri_server'] = setup_network_pri_server_input_flag ? inputNetworkObject[SETUP_NETWORK_PRI_SERVER_INPUT].get() : "";
        if (inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].get()) {
            setup_network_sec_server_input_flag = true;
        } else {
            setup_network_sec_server_input_flag = false;
        }
        // data['sec_server1'] = setup_network_sec_server_input_flag ? inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].get().split('.')[0] : "";
        // data['sec_server2'] = setup_network_sec_server_input_flag ? inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].get().split('.')[1] : "";
        // data['sec_server3'] = setup_network_sec_server_input_flag ? inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].get().split('.')[2] : "";
        // data['sec_server4'] = setup_network_sec_server_input_flag ? inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].get().split('.')[3] : "";
        data['sec_server'] = setup_network_sec_server_input_flag ? inputNetworkObject[SETUP_NETWORK_SEC_SERVER_INPUT].get() : "";
        //data['metric'] = inputNetworkObject[SETUP_NETWORK_USB_METRIC_INPUT].get();
        data['dns'] = radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue();
        return data;
    }
    function getDomainNetworkFormData() {
        var data = {};
        data['interface']="lan0"
        data['domain'] = inputNetworkObject[SETUP_NETWORK_DOMAIN_INPUT].get();
        return data;
    }
    function getCommonNetworkFormData() {
        var data = {};
        data['interface']="lan0"
        data['port'] = inputNetworkObject[SETUP_NETWORK_HTTP_PORT_INPUT].get();
        data['rtp_packet_max'] = radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].getSelectedValue();
        data['mss'] = selectNetworkObject[SETUP_NETWORK_HTTP_MAX_SELECT].get();
        data['time'] = radioNetworkButtonGroup[SETUP_NETWORK_EASY_IP].getSelectedValue();
        return data;
    }
    function DoLanSubmit() {
        if (!gbAct) {
            gbAct = true;
        }
        else {
            return false;
        }

        // if (sIndex == "network") {
        if (!CheckLanForm()) {
            gbAct = false;
            return false;
        }
        // if (SettingChange()) {
            if (jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
                if (confirm) {
                    var networkData = getLanNetworkFormData();
                    $("#dialog_setup").show();
                    $.ajax({
                        type: "post",
                        url: "/cgi-bin/network",
                        data: networkData,
                        success: function (data) {
                            setTimeout(function () {
                                $("#dialog_setup").hide();
                            }, 500);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            setTimeout(function () {
                                $("#dialog_setup").hide();
                                jAlert(MSG_STATUS.mID_0066, NPTZ_WORDING.wID_0039);
                                rebuildNetwork();
                            }, 500);
                        }
                    });
                    // UpdateNetworkParams();
                } else {
                    gbAct = false;
                    return false;
                }
            }));

        gbAct = false;
    }
    function DoSfpPlusSubmit() {
        if (!gbAct) {
            gbAct = true;
        }
        else {
            return false;
        }

        if (!CheckSfpPlusForm()) {
            gbAct = false;
            return false;
        }
        if (jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
            if (confirm) {
                var networkData = getSfpPlusNetworkFormData();
                $("#dialog_setup").show();
                $.ajax({
                    type: "post",
                    url: "/cgi-bin/network",
                    data: networkData,
                    success: function (data) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                        }, 500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                            jAlert(MSG_STATUS.mID_0066, NPTZ_WORDING.wID_0039);
                            rebuildNetwork();
                        }, 500);
                    }
                });
                // UpdateNetworkParams();
            } else {
                gbAct = false;
                return false;
            }
        }));
        gbAct = false;
    }
    function DoUsbSubmit() {
        if (!gbAct) {
            gbAct = true;
        }
        else {
            return false;
        }

        if (!CheckUsbForm()) {
            gbAct = false;
            return false;
        }
        if (jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
            if (confirm) {
                var networkData = getUsbNetworkFormData();
                $("#dialog_setup").show();
                $.ajax({
                    type: "post",
                    url: "/cgi-bin/network",
                    data: networkData,
                    success: function (data) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                        }, 500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                            jAlert(MSG_STATUS.mID_0066, NPTZ_WORDING.wID_0039);
                            rebuildNetwork();
                        }, 500);
                    }
                });
                // UpdateNetworkParams();
            } else {
                gbAct = false;
                return false;
            }
        }));
        gbAct = false;
    }
    function DoDnsSubmit() {
        if (!gbAct) {
            gbAct = true;
        }
        else {
            return false;
        }

        if (!CheckDnsForm()) {
            gbAct = false;
            return false;
        }
        if (jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
            if (confirm) {
                var networkData = getDnsNetworkFormData();
                $("#dialog_setup").show();
                $.ajax({
                    type: "post",
                    url: "/cgi-bin/network",
                    data: networkData,
                    success: function (data) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                        }, 500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                            jAlert(MSG_STATUS.mID_0066, NPTZ_WORDING.wID_0039);
                            rebuildNetwork();
                        }, 500);
                    }
                });
                // UpdateNetworkParams();
            } else {
                gbAct = false;
                return false;
            }
        }));
        gbAct = false;
    }
    function DoDomainSubmit() {
        if (!gbAct) {
            gbAct = true;
        }
        else {
            return false;
        }

        // if (!CheckDnsForm()) {
        //     gbAct = false;
        //     return false;
        // }
        if (jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
            if (confirm) {
                var networkData = getDomainNetworkFormData();
                $("#dialog_setup").show();
                $.ajax({
                    type: "post",
                    url: "/cgi-bin/network",
                    data: networkData,
                    success: function (data) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                        }, 500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                            jAlert(MSG_STATUS.mID_0066, NPTZ_WORDING.wID_0039);
                            rebuildNetwork();
                        }, 500);
                    }
                });
                // UpdateNetworkParams();
            } else {
                gbAct = false;
                return false;
            }
        }));
        gbAct = false;
    }
    function DoCommonSubmit() {
        if (!gbAct) {
            gbAct = true;
        }
        else {
            return false;
        }

        if (!CheckCommonForm()) {
            gbAct = false;
            return false;
        }
        if (jConfirm(MSG_STATUS.mID_0031, NPTZ_WORDING.wID_0039, NPTZ_WORDING.wID_0040, function (confirm) {
            if (confirm) {
                var networkData = getCommonNetworkFormData();
                $("#dialog_setup").show();
                $.ajax({
                    type: "post",
                    url: "/cgi-bin/network",
                    data: networkData,
                    success: function (data) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                        }, 500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () {
                            $("#dialog_setup").hide();
                            jAlert(MSG_STATUS.mID_0066, NPTZ_WORDING.wID_0039);
                            rebuildNetwork();
                        }, 500);
                    }
                });
                // UpdateNetworkParams();
            } else {
                gbAct = false;
                return false;
            }
        }));
        gbAct = false;
    }
    function SettingChange() {
        with (document) {
            var IP_addr = ($("#IP_addr").val() == '' || $("#IP_addr").val() == null) ? ["", "", "", ""] : [$("#IP_addr").val().split(".")[0], $("#IP_addr").val().split(".")[1], $("#IP_addr").val().split(".")[2], $("#IP_addr").val().split(".")[3]];
            var netmask = ($("#netmask").val() == '' || $("#netmask").val() == null) ? ["", "", "", ""] : [$("#netmask").val().split(".")[0], $("#netmask").val().split(".")[1], $("#netmask").val().split(".")[2], $("#netmask").val().split(".")[3]];
            var gateway = ($("#gateway").val() == '' || $("#gateway").val() == null) ? ["", "", "", ""] : [$("#gateway").val().split(".")[0], $("#gateway").val().split(".")[1], $("#gateway").val().split(".")[2], $("#gateway").val().split(".")[3]];
            var port = getElementById("port"); //input
            var pri_server = ($("#pri_server").val() == '' || $("#pri_server").val() == null) ? ["", "", "", ""] : [$("#pri_server").val().split(".")[0], $("#pri_server").val().split(".")[1], $("#pri_server").val().split(".")[2], $("#pri_server").val().split(".")[3]];
            var sec_server = ($("#sec_server").val() == '' || $("#sec_server").val() == null) ? ["", "", "", ""] : [$("#sec_server").val().split(".")[0], $("#sec_server").val().split(".")[1], $("#sec_server").val().split(".")[2], $("#sec_server").val().split(".")[3]];
        }
        if (((objNetWork.ip4_dhcp == 1) && (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '0')) || ((objNetWork.ip4_dhcp == 0) && (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '1'))) return true;
        if (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '0') {
            for (var i = 0; i < 4; i++) {
                if (objNetWork.ip4_addr.split('.')[i] != IP_addr[i]) {
                    return true;
                }
                if (objNetWork.ip4_netmask.split('.')[i] != netmask[i]) {
                    return true;
                }
                if (objNetWork.ip4_gateway.split('.')[i] != gateway[i]) {
                    return true;
                }
            }
        }
        if (objNetWork.port != port.value) return true;
        if (((objNetWork.dns == "auto") && (radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue() == 'manual')) || ((objNetWork.dns == "manual") && (radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue() == 'auto'))) return true;
        // if (radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue() == 'manual') {
        //     var priSerArray = objNetWork.ip4_pri_server.split('.');
        //     var secSerArray = objNetWork.sec_server.split('.');
        //     for (var i = 0; i < priSerArray.length; i++) {
        //         if (priSerArray[i] != pri_server[i]) {
        //             return true;
        //         }
        //     }
        //     for (var j = 0; j < secSerArray.length; j++) {
        //         if (secSerArray[j] != sec_server[j]) {
        //             return true;
        //         }
        //     }
        // }
        //Ipv6 change check
        with (document) {
            var ipv6Addr = getElementById("IPv6_addr");
            var ipv6Gateway = getElementById("IPv6_gateway");
            var ipv6PriSer = getElementById("IPv6_pri_server");
            var ipv6SecSer = getElementById("IPv6_sec_server");
        }
        if (((objNetWork.ip6_auto == 0) && (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == '1'))
            || ((objNetWork.ip6_auto == 1) && (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == '0'))) {
            return true;
        }
        if (ipv6Addr.value != objNetWork.ip6_addr) {
            return true;
        }
        if (ipv6Gateway.value != objNetWork.ip6_gateway) {
            return true;
        }
        if (((objNetWork.ip6_dhcp == 0) && (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue() == '1'))
            || ((objNetWork.ip6_dhcp == 1) && (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_DHCPV6].getSelectedValue() == '0'))) {
            return true;
        }
        if (ipv6PriSer.value != objNetWork.pri_server) {
            return true;
        }
        if (ipv6SecSer.value != objNetWork.sec_server) {
            return true;
        }

        //Common change check
        with (document) {
            var mss = getElementById("mss");
        }
        if (((objNetWork.rtp_packet_max == 1500) && (radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].getSelectedValue() == '1280'))
            || ((objNetWork.rtp_packet_max == 1280) && (radioNetworkButtonGroup[SETUP_NETWORK_MAX_RTP].getSelectedValue() == '1500'))) {
            return true;
        }
        if (mss.value != objNetWork.mss) {
            return true;
        }
        if (((objNetWork.time == 20) && (radioNetworkButtonGroup[SETUP_NETWORK_EASY_IP].getSelectedValue() == 'unlimited'))
            || ((objNetWork.time == "unlimited") && (radioNetworkButtonGroup[SETUP_NETWORK_EASY_IP].getSelectedValue() == '20'))) {
            return true;
        }
        return false;
    }

    function CheckLanForm() {
        gulIpAddr = 0;
        gulSubnet = 0;
        gulGateway = 0;

        with (document) {
            var objIpAddr = ($("#IP_addr_lan").val() == '' || $("#IP_addr_lan").val() == null) ? ["", "", "", ""] : [$("#IP_addr_lan").val().split(".")[0], $("#IP_addr_lan").val().split(".")[1], $("#IP_addr_lan").val().split(".")[2], $("#IP_addr_lan").val().split(".")[3]];
            var objNetMask = ($("#netmask_lan").val() == '' || $("#netmask_lan").val() == null) ? ["", "", "", ""] : [$("#netmask_lan").val().split(".")[0], $("#netmask_lan").val().split(".")[1], $("#netmask_lan").val().split(".")[2], $("#netmask_lan").val().split(".")[3]];
            var objGateway = ($("#gateway_lan").val() == '' || $("#gateway_lan").val() == null) ? ["", "", "", ""] : [$("#gateway_lan").val().split(".")[0], $("#gateway_lan").val().split(".")[1], $("#gateway_lan").val().split(".")[2], $("#gateway_lan").val().split(".")[3]];
        }

        for (var i = 1; i <= 4; i++) {
            gulIpAddr += parseInt(objIpAddr[i - 1] * giIPv4Chg[i]);
            gulSubnet += parseInt(objNetMask[i - 1] * giIPv4Chg[i]);
            gulGateway += parseInt(objGateway[i - 1] * giIPv4Chg[i]);
        }
        if (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '0') {
            // subnetmask
            if (chknet_isIpBlank(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3])) {
                return capi_DispError(eval(document.getElementById("netmask_lan")), MSG_STATUS.mID_0006);
            }
            if ((!chknet_IsIpDigit(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))
                || (!chknet_CheckSubnetRange(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))) {
                return capi_DispError(eval(document.getElementById("netmask")), objErrCode);
            }
            if (!chknet_CheckIPv4Sub(gulSubnet)) return capi_DispError(eval(document.getElementById("netmask_lan")), objErrCode);
            // ip
            if (chknet_isIpBlank(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3])) return capi_DispError(eval(document.getElementById("IP_addr_lan")), MSG_STATUS.mID_0005);
            if ((!chknet_IsIpDigit(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))
                || (!chknet_CheckRange2(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))) {
                return capi_DispError(eval(document.getElementById("IP_addr_lan")), objErrCode);
            }
            if (!chknet_CheckIPv4Addr(gulIpAddr, gulSubnet)) return capi_DispError(eval(document.getElementById("IP_addr_lan")), objErrCode);
            // gateway
            if (chknet_isIpBlank(objGateway[0], objGateway[1], objGateway[2], objGateway[3])) return capi_DispError(eval(document.getElementById("gateway_lan")), MSG_STATUS.mID_0007);
            if (( !chknet_IsIpDigit(objGateway[0], objGateway[1], objGateway[2], objGateway[3]) )
                || ( !chknet_CheckRange2(objGateway[0], objGateway[1], objGateway[2], objGateway[3]))) {
                return capi_DispError(eval(document.getElementById("gateway_lan")), objErrCode);
            }
            if (!chknet_CheckIPv4Dgw(gulIpAddr, gulSubnet, gulGateway)) return capi_DispError(eval(document.getElementById("gateway_lan")), objErrCode);
            if ( ! chknet_CheckIPv4Dgw( gulIpAddr,gulSubnet,gulGateway ))   return capi_DispError( eval( objGateway[giErrNum-1] ), objErrCode );
        }
        //IPv6 check
        if (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
            const objIpv6Addr = document.getElementById("IPv6_addr_lan");
            const objIpv6Gateway = document.getElementById("IPv6_gateway_lan");
            if (objIpv6Addr.value != "") {
                if (!isIPv6(objIpv6Addr.value)) {
                    return capi_DispError(objIpv6Addr, objErrCode);
                }
                if (chknet_IsIPEqual(objIpv6Addr.value, objIpv6Gateway.value)) {
                    return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0027);
                }
            }else{
                return capi_DispError(objIpv6Addr,  MSG_STATUS.mID_0005);
            }
            if (objIpv6Gateway.value != "") {
                if (!isIPv6(objIpv6Gateway.value)) {
                    return capi_DispError(objIpv6Gateway, objErrCode);
                }
            }else{
                return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0007);
            }
        }
        const objMetricLan = document.getElementById("metric_lan");
        // metric check
        if (!capi_isDigit(objMetricLan.value)) {
            return capi_DispError(objMetricLan, MSG_STATUS.mID_0010);
        } else if (!(objMetricLan.value > 99 && objMetricLan.value < 111)) {
            return capi_DispError(objMetricLan, MSG_STATUS.mID_0106);
        }
        return true;
    }
    function CheckSfpPlusForm() {
        gulIpAddr = 0;
        gulSubnet = 0;
        gulGateway = 0;

        with (document) {
            var objIpAddr = ($("#IP_addr").val() == '' || $("#IP_addr").val() == null) ? ["", "", "", ""] : [$("#IP_addr").val().split(".")[0], $("#IP_addr").val().split(".")[1], $("#IP_addr").val().split(".")[2], $("#IP_addr").val().split(".")[3]];
            var objNetMask = ($("#netmask").val() == '' || $("#netmask").val() == null) ? ["", "", "", ""] : [$("#netmask").val().split(".")[0], $("#netmask").val().split(".")[1], $("#netmask").val().split(".")[2], $("#netmask").val().split(".")[3]];
            var objGateway = ($("#gateway").val() == '' || $("#gateway").val() == null) ? ["", "", "", ""] : [$("#gateway").val().split(".")[0], $("#gateway").val().split(".")[1], $("#gateway").val().split(".")[2], $("#gateway").val().split(".")[3]];
        }

        for (var i = 1; i <= 4; i++) {
            gulIpAddr += parseInt(objIpAddr[i - 1] * giIPv4Chg[i]);
            gulSubnet += parseInt(objNetMask[i - 1] * giIPv4Chg[i]);
            gulGateway += parseInt(objGateway[i - 1] * giIPv4Chg[i]);
        }
        if (radioSfpPlusButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '0') {
            // subnetmask
            if (chknet_isIpBlank(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3])) {
                return capi_DispError(eval(document.getElementById("netmask")), MSG_STATUS.mID_0006);
            }
            if ((!chknet_IsIpDigit(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))
                || (!chknet_CheckSubnetRange(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))) {
                return capi_DispError(eval(document.getElementById("netmask")), objErrCode);
            }
            if (!chknet_CheckIPv4Sub(gulSubnet)) return capi_DispError(eval(document.getElementById("netmask")), objErrCode);
            // ip
            if (chknet_isIpBlank(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3])) return capi_DispError(eval(document.getElementById("IP_addr")), MSG_STATUS.mID_0005);
            if ((!chknet_IsIpDigit(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))
                || (!chknet_CheckRange2(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))) {
                return capi_DispError(eval(document.getElementById("IP_addr")), objErrCode);
            }
            if (!chknet_CheckIPv4Addr(gulIpAddr, gulSubnet)) return capi_DispError(eval(document.getElementById("IP_addr")), objErrCode);
            // gateway
            if (chknet_isIpBlank(objGateway[0], objGateway[1], objGateway[2], objGateway[3])) return capi_DispError(eval(document.getElementById("gateway")), MSG_STATUS.mID_0007);
            if (( !chknet_IsIpDigit(objGateway[0], objGateway[1], objGateway[2], objGateway[3]) )
                || ( !chknet_CheckRange2(objGateway[0], objGateway[1], objGateway[2], objGateway[3]))) {
                return capi_DispError(eval(document.getElementById("gateway")), objErrCode);
            }
            if (!chknet_CheckIPv4Dgw(gulIpAddr, gulSubnet, gulGateway)) return capi_DispError(eval(document.getElementById("gateway")), objErrCode);
            if ( ! chknet_CheckIPv4Dgw( gulIpAddr,gulSubnet,gulGateway ))   return capi_DispError( eval( objGateway[giErrNum-1] ), objErrCode );
        }
        //IPv6 check
        // if (radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
        //     const objIpv6Addr = document.getElementById("IPv6_addr");
        //     const objIpv6Gateway = document.getElementById("IPv6_gateway");
        //     if (objIpv6Addr.value != "") {
        //         if (!isIPv6(objIpv6Addr.value)) {
        //             return capi_DispError(objIpv6Addr, objErrCode);
        //         }
        //         if (chknet_IsIPEqual(objIpv6Addr.value, objIpv6Gateway.value)) {
        //             return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0027);
        //         }
        //     }else{
        //         return capi_DispError(objIpv6Addr,  MSG_STATUS.mID_0005);
        //     }
        //     if (objIpv6Gateway.value != "") {
        //         if (!isIPv6(objIpv6Gateway.value)) {
        //             return capi_DispError(objIpv6Gateway, objErrCode);
        //         }
        //     }else{
        //         return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0007);
        //     }
        // }
        const objMetricLan = document.getElementById("metric_sfp_plus");
        // metric check
        if (!capi_isDigit(objMetricLan.value)) {
            return capi_DispError(objMetricLan, MSG_STATUS.mID_0010);
        } else if (!(objMetricLan.value > 99 && objMetricLan.value < 111)) {
            return capi_DispError(objMetricLan, MSG_STATUS.mID_0106);
        }
        return true;
    }
    function CheckUsbForm() {
        
        gulIpAddr = 0;
        gulSubnet = 0;
        gulGateway = 0;

        with (document) {
            var objIpAddr = ($("#IP_addr_usb").val() == '' || $("#IP_addr_usb").val() == null) ? ["", "", "", ""] : [$("#IP_addr_usb").val().split(".")[0], $("#IP_addr_usb").val().split(".")[1], $("#IP_addr_usb").val().split(".")[2], $("#IP_addr_usb").val().split(".")[3]];
            var objNetMask = ($("#netmask_usb").val() == '' || $("#netmask_usb").val() == null) ? ["", "", "", ""] : [$("#netmask_usb").val().split(".")[0], $("#netmask_usb").val().split(".")[1], $("#netmask_usb").val().split(".")[2], $("#netmask_usb").val().split(".")[3]];
            var objGateway = ($("#gateway_usb").val() == '' || $("#gateway_usb").val() == null) ? ["", "", "", ""] : [$("#gateway_usb").val().split(".")[0], $("#gateway_usb").val().split(".")[1], $("#gateway_usb").val().split(".")[2], $("#gateway_usb").val().split(".")[3]];
        }

        for (var i = 1; i <= 4; i++) {
            gulIpAddr += parseInt(objIpAddr[i - 1] * giIPv4Chg[i]);
            gulSubnet += parseInt(objNetMask[i - 1] * giIPv4Chg[i]);
            gulGateway += parseInt(objGateway[i - 1] * giIPv4Chg[i]);
        }
        if (radioUsbButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '0') {
            // subnetmask
            if (chknet_isIpBlank(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3])) {
                return capi_DispError(eval(document.getElementById("netmask_usb")), MSG_STATUS.mID_0006);
            }
            if ((!chknet_IsIpDigit(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))
                || (!chknet_CheckSubnetRange(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))) {
                return capi_DispError(eval(document.getElementById("netmask")), objErrCode);
            }
            if (!chknet_CheckIPv4Sub(gulSubnet)) return capi_DispError(eval(document.getElementById("netmask_usb")), objErrCode);
            // ip
            if (chknet_isIpBlank(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3])) return capi_DispError(eval(document.getElementById("IP_addr_usb")), MSG_STATUS.mID_0005);
            if ((!chknet_IsIpDigit(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))
                || (!chknet_CheckRange2(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))) {
                return capi_DispError(eval(document.getElementById("IP_addr_usb")), objErrCode);
            }
            if (!chknet_CheckIPv4Addr(gulIpAddr, gulSubnet)) return capi_DispError(eval(document.getElementById("IP_addr_usb")), objErrCode);
            // gateway
            if (chknet_isIpBlank(objGateway[0], objGateway[1], objGateway[2], objGateway[3])) return capi_DispError(eval(document.getElementById("gateway_usb")), MSG_STATUS.mID_0007);
            if (( !chknet_IsIpDigit(objGateway[0], objGateway[1], objGateway[2], objGateway[3]) )
                || ( !chknet_CheckRange2(objGateway[0], objGateway[1], objGateway[2], objGateway[3]))) {
                return capi_DispError(eval(document.getElementById("gateway_usb")), objErrCode);
            }
            if (!chknet_CheckIPv4Dgw(gulIpAddr, gulSubnet, gulGateway)) return capi_DispError(eval(document.getElementById("gateway_usb")), objErrCode);
            if ( ! chknet_CheckIPv4Dgw( gulIpAddr,gulSubnet,gulGateway ))   return capi_DispError( eval( objGateway[giErrNum-1] ), objErrCode );
        }
        //IPv6 check
        if (radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
            const objIpv6Addr = document.getElementById("IPv6_addr_usb");
            const objIpv6Gateway = document.getElementById("IPv6_gateway_usb");
            if (objIpv6Addr.value != "") {
                if (!isIPv6(objIpv6Addr.value)) {
                    return capi_DispError(objIpv6Addr, objErrCode);
                }
                if (chknet_IsIPEqual(objIpv6Addr.value, objIpv6Gateway.value)) {
                    return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0027);
                }
            }else{
                return capi_DispError(objIpv6Addr,  MSG_STATUS.mID_0005);
            }
            if (objIpv6Gateway.value != "") {
                if (!isIPv6(objIpv6Gateway.value)) {
                    return capi_DispError(objIpv6Gateway, objErrCode);
                }
            }else{
                return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0007);
            }
        }


        const objMetricLan = document.getElementById("metric_usb");
        // metric check
        if (!capi_isDigit(objMetricLan.value)) {
            return capi_DispError(objMetricLan, MSG_STATUS.mID_0010);
        } else if (!(objMetricLan.value > 99 && objMetricLan.value < 111)) {
            return capi_DispError(objMetricLan, MSG_STATUS.mID_0106);
        }
        return true;
    }
    function CheckDnsForm() {
        gulIpAddr = 0;
        gulSubnet = 0;
        gulGateway = 0;

        with (document) {
            var objPriServer = $("#pri_server").val();
            var objSecServer = $("#sec_server").val();
        }

        var priserver = objPriServer;
        var secserver = objSecServer;

        var sPri = chknet_ipaddr_familly(priserver);
        var sSec = chknet_ipaddr_familly(secserver);

        if ((priserver.length == 3) || priserver == "") {
        }
        else {
            if (sPri != "IPv4") {
                if (!chknet_IsValidIpv6(priserver)) return capi_DispError(document.getElementById("pri_server"), objErrCode);
            }
            else {
                if (!chknet_CheckDnsRange(priserver, gulIpAddr, gulSubnet)) return capi_DispError(document.getElementById("pri_server"), objErrCode);
            }
        }
        if ((secserver.length == 3)  || secserver == "") {
        }
        else {
            if (sSec != "IPv4") {
                if (!chknet_IsValidIpv6(secserver)) return capi_DispError(document.getElementById("sec_server"), objErrCode);
            }
            else {
                if (!chknet_CheckDnsRange(secserver, gulIpAddr, gulSubnet)) return capi_DispError(document.getElementById("sec_server"), objErrCode);
            }
        }
 
        if (sPri == "IPv6") {
            const objIpv6Priser = document.getElementById("pri_server");

            if (objIpv6Priser.value != "") {
                if (!isIPv6(objIpv6Priser.value)) {
                    return capi_DispError(objIpv6Priser, objErrCode);
                }
            }

        }
        if (sSec == "IPv6") {
            const objIpv6Secser = document.getElementById("sec_server");
            if (objIpv6Secser.value != "") {
                if (!isIPv6(objIpv6Secser.value)) {
                    return capi_DispError(objIpv6Secser, objErrCode);
                }
            }
        }

        return true;
    }
    function CheckDomainForm() {
        gulIpAddr = 0;
        gulSubnet = 0;
        gulGateway = 0;

        with (document) {
            var objIpAddr = ($("#IP_addr").val() == '' || $("#IP_addr").val() == null) ? ["", "", "", ""] : [$("#IP_addr").val().split(".")[0], $("#IP_addr").val().split(".")[1], $("#IP_addr").val().split(".")[2], $("#IP_addr").val().split(".")[3]];
            var objNetMask = ($("#netmask").val() == '' || $("#netmask").val() == null) ? ["", "", "", ""] : [$("#netmask").val().split(".")[0], $("#netmask").val().split(".")[1], $("#netmask").val().split(".")[2], $("#netmask").val().split(".")[3]];
            var objGateway = ($("#gateway").val() == '' || $("#gateway").val() == null) ? ["", "", "", ""] : [$("#gateway").val().split(".")[0], $("#gateway").val().split(".")[1], $("#gateway").val().split(".")[2], $("#gateway").val().split(".")[3]];
            // var objPort = getElementById("port"); //input
            // var objPriServer = $("#IPv6_pri_server").val();
            // var objSecServer = $("#IPv6_sec_server").val();
        }

        for (var i = 1; i <= 4; i++) {
            gulIpAddr += parseInt(objIpAddr[i - 1] * giIPv4Chg[i]);
            gulSubnet += parseInt(objNetMask[i - 1] * giIPv4Chg[i]);
            gulGateway += parseInt(objGateway[i - 1] * giIPv4Chg[i]);
        }
        if (radioNetworkButtonGroup[SETUP_NETWORK_DHCP].getSelectedValue() == '0') {
            // subnetmask
            if (chknet_isIpBlank(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3])) {
                return capi_DispError(eval(document.getElementById("netmask")), MSG_STATUS.mID_0006);
            }
            if ((!chknet_IsIpDigit(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))
                || (!chknet_CheckSubnetRange(objNetMask[0], objNetMask[1], objNetMask[2], objNetMask[3]))) {
                return capi_DispError(eval(document.getElementById("netmask")), objErrCode);
            }
            if (!chknet_CheckIPv4Sub(gulSubnet)) return capi_DispError(eval(document.getElementById("netmask")), objErrCode);
            // ip
            if (chknet_isIpBlank(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3])) return capi_DispError(eval(document.getElementById("IP_addr")), MSG_STATUS.mID_0005);
            if ((!chknet_IsIpDigit(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))
                || (!chknet_CheckRange2(objIpAddr[0], objIpAddr[1], objIpAddr[2], objIpAddr[3]))) {
                return capi_DispError(eval(document.getElementById("IP_addr")), objErrCode);
            }
            if (!chknet_CheckIPv4Addr(gulIpAddr, gulSubnet)) return capi_DispError(eval(document.getElementById("IP_addr")), objErrCode);
            // gateway
            if (chknet_isIpBlank(objGateway[0], objGateway[1], objGateway[2], objGateway[3])) return capi_DispError(eval(document.getElementById("gateway")), MSG_STATUS.mID_0007);
            if (( !chknet_IsIpDigit(objGateway[0], objGateway[1], objGateway[2], objGateway[3]) )
                || ( !chknet_CheckRange2(objGateway[0], objGateway[1], objGateway[2], objGateway[3]))) {
                return capi_DispError(eval(document.getElementById("gateway")), objErrCode);
            }
            if (!chknet_CheckIPv4Dgw(gulIpAddr, gulSubnet, gulGateway)) return capi_DispError(eval(document.getElementById("gateway")), objErrCode);
            if ( ! chknet_CheckIPv4Dgw( gulIpAddr,gulSubnet,gulGateway ))   return capi_DispError( eval( objGateway[giErrNum-1] ), objErrCode );
        }

        // if (!chknet_portNo(objPort.value, "HTTP", 1)) return capi_DispError(objPort, objErrCode);
        // if (!chknet_portSysResvdNo(objPort.value)) return capi_DispError(objPort, objErrCode);
        // if (!chknet_portUsedNo(objPort.value, 0, 0, 0, cparams.rtsp_port, cparams.https_port)) return capi_DispError(objPort, objErrCode);

        // if (radioNetworkButtonGroup[SETUP_NETWORK_DNS_MANUAL].getSelectedValue() == 'manual') {
        //     var priserver = objPriServer[0];
        //     var secserver = objSecServer[0];
        //     for (var i = 1; i < 4; i++) {
        //         priserver += "." + objPriServer[i];
        //         secserver += "." + objSecServer[i];
        //     }
        //     var sPri = chknet_ipaddr_familly(priserver);
        //     var sSec = chknet_ipaddr_familly(secserver);
        //
        //     if ((priserver.length == 3)) {
        //     }
        //     else {
        //         if (sPri != "IPv4") {
        //             if (!chknet_IsValidIpv6(priserver)) return capi_DispError(document.getElementById("pri_server"), objErrCode);
        //         }
        //         else {
        //             if (!chknet_CheckDnsRange(priserver, gulIpAddr, gulSubnet)) return capi_DispError(document.getElementById("pri_server"), objErrCode);
        //         }
        //     }
        //     if ((secserver.length == 3)) {
        //     }
        //     else {
        //         if (sSec != "IPv4") {
        //             if (!chknet_IsValidIpv6(secserver)) return capi_DispError(document.getElementById("sec_server"), objErrCode);
        //         }
        //         else {
        //             if (!chknet_CheckDnsRange(secserver, gulIpAddr, gulSubnet)) return capi_DispError(document.getElementById("sec_server"), objErrCode);
        //         }
        //     }
        // }

            // var priserver = objPriServer;
            // var secserver = objSecServer;
            // for (var i = 1; i < 4; i++) {
            //     priserver += "." + objPriServer[i];
            //     secserver += "." + objSecServer[i];
            // }
            // var sPri = chknet_ipaddr_familly(priserver);
            // var sSec = chknet_ipaddr_familly(secserver);

            // if ((priserver.length == 3) || priserver == "") {
            // }
            // else {
            //     if (sPri != "IPv4") {
            //         if (!chknet_IsValidIpv6(priserver)) return capi_DispError(document.getElementById("IPv6_pri_server"), objErrCode);
            //     }
            //     else {
            //         if (!chknet_CheckDnsRange(priserver, gulIpAddr, gulSubnet)) return capi_DispError(document.getElementById("IPv6_pri_server"), objErrCode);
            //     }
            // }
            // if ((secserver.length == 3)  || secserver == "") {
            // }
            // else {
            //     if (sSec != "IPv4") {
            //         if (!chknet_IsValidIpv6(secserver)) return capi_DispError(document.getElementById("IPv6_sec_server"), objErrCode);
            //     }
            //     else {
            //         if (!chknet_CheckDnsRange(secserver, gulIpAddr, gulSubnet)) return capi_DispError(document.getElementById("IPv6_sec_server"), objErrCode);
            //     }
            // }
        //IPv6 check
        if (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
            const objIpv6Addr = document.getElementById("IPv6_addr");
            const objIpv6Gateway = document.getElementById("IPv6_gateway");
            if (objIpv6Addr.value != "") {
                if (!isIPv6(objIpv6Addr.value)) {
                    return capi_DispError(objIpv6Addr, objErrCode);
                }
                if (chknet_IsIPEqual(objIpv6Addr.value, objIpv6Gateway.value)) {
                    return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0027);
                }
            }else{
                return capi_DispError(objIpv6Addr,  MSG_STATUS.mID_0005);
            }
            if (objIpv6Gateway.value != "") {
                if (!isIPv6(objIpv6Gateway.value)) {
                    return capi_DispError(objIpv6Gateway, objErrCode);
                }
            }else{
                return capi_DispError(objIpv6Gateway, MSG_STATUS.mID_0007);
            }
        }
        // if (sPri == "IPv6") {
        //     const objIpv6Priser = document.getElementById("IPv6_pri_server");

        //     if (objIpv6Priser.value != "") {
        //         if (!isIPv6(objIpv6Priser.value)) {
        //             return capi_DispError(objIpv6Priser, objErrCode);
        //         }
        //     }

        // }
        // if (sSec == "IPv6") {
        //     const objIpv6Secser = document.getElementById("IPv6_sec_server");
        //     if (objIpv6Secser.value != "") {
        //         if (!isIPv6(objIpv6Secser.value)) {
        //             return capi_DispError(objIpv6Secser, objErrCode);
        //         }
        //     }
        // }

        return true;
    }
    function CheckCommonForm() {
        with (document) {
             var objPort = getElementById("port"); //input
         }
        if (!chknet_portNo(objPort.value, "HTTP", 1)) return capi_DispError(objPort, objErrCode);
        if (!chknet_portSysResvdNo(objPort.value)) return capi_DispError(objPort, objErrCode);
        if (!chknet_portUsedNo(objPort.value, 0, 0, 0, cparams.rtsp_port, cparams.https_port)) return capi_DispError(objPort, objErrCode);

        return true;
    }
    function chknet_IsIPEqual(strIP, strGW) {
        var ipArray = strIP.split(':');
        var gwArray = strGW.split(':');

        var i = 0;
        var j = 0;
        while (i < ipArray.length || j < gwArray.length) {
            try {
                //filter with "" and "0000" in ip address
                while ((i < ipArray.length) && (ipArray[i] == "" || parseInt(ipArray[i], 16) == 0)) {
                    i++;
                }
                while ((j < gwArray.length) && (gwArray[j] == "" || parseInt(gwArray[j], 16) == 0)) {
                    j++;
                }
                //equal between "fd00:0000" and "fd00:0000:0000:0000"
                if (i == ipArray.length && j == gwArray.length) {
                    return true;
                }
                //not equal between "fd00:0000:0001" and "fd00:0000:0000:0000"
                else if (i == ipArray.length || j == gwArray.length) {
                    return false;
                }
                //compare with hex value
                //equal between "0001" and "1"
                else if (parseInt(ipArray[i], 16) != parseInt(gwArray[j], 16)) {
                    return false;
                }
                //not equal between "fd00:0001:0000" and "fd00:0001"
                i++;
                j++;
                if (!(i == ipArray.length) && (j == gwArray.length)) {
                    return false
                }
            }
            catch (e) {
                return false;
            }
        }
        return true;
    }

    function chknet_CheckSubnetRange(arIP1, arIP2, arIP3, arIP4) {
        var arIP = [];
        var iIndex;
        for (iIndex = 1; iIndex <= 4; iIndex++) {
            arIP[iIndex] = parseInt(eval("arIP" + iIndex));
        }
        for (iIndex = 1; iIndex <= 4; iIndex++) {
            if (( arIP[iIndex] < 0 ) || ( arIP[iIndex] > 255 )) {
                objErrCode = MSG_STATUS.mID_0009;
                giErrNum = iIndex;
                return false;
            }
        }
        if ((( arIP[1] == 127 ) && ( arIP[2] == 0 ) && ( arIP[3] == 0 ) && ( arIP[4] == 1 ))
            || (( arIP[1] == 0 ) && ( arIP[2] == 0 ) && ( arIP[3] == 0 ) && ( arIP[4] == 0 ))) {
            objErrCode = MSG_STATUS.mID_0027;
            giErrNum = 1;
            return false;
        }
        return true;
    }

    function chknet_CheckDnsRange(sDnsAddr, gulIpAddr, gulSubnet) {
        var iIP = [];
        var sSymbol = ".";
        gulDns = 0;
        if (capi_CharCounter(sDnsAddr, sSymbol) != 3) {
            objErrCode = MSG_STATUS.mID_0009;
            return false;
        }
        for (var iIndex = 1; iIndex <= 4; iIndex++) {
            iIP[iIndex] = sDnsAddr.split(sSymbol)[iIndex - 1];
            if (!capi_isDigit(iIP[iIndex])) {
                objErrCode = MSG_STATUS.mID_0009;
                return false;
            }
            if (iIP[iIndex].length == 0) {
                objErrCode = MSG_STATUS.mID_0009;
                return false;
            }
            gulDns += parseInt(iIP[iIndex] * giIPv4Chg[iIndex]);
        }
        if (!chknet_CheckRange2(iIP[1], iIP[2], iIP[3], iIP[4])) {
            return false;
        }
        if (!chknet_CheckIPv4Dns(gulDns, gulIpAddr, gulSubnet)) {
            return false;
        }
        if (iIP[1] == 0) {
            objErrCode = MSG_STATUS.mID_0009;
            return false;
        }
        return true;
    }

    function getLan0ActiveNetwork() {
        var url = "/cgi-bin/get_active_network?interface=lan0";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("ip4_dhcp=") == 0) {
                    result.ip4_dhcp = ret[i].substring("ip4_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_addr=") == 0) {
                    result.ip4_addr = ret[i].substring("ip4_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_netmask=") == 0) {
                    result.ip4_netmask = ret[i].substring("ip4_netmask=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_gateway=") == 0) {
                    result.ip4_gateway = ret[i].substring("ip4_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("dns=") == 0) {
                    result.dns = ret[i].substring("dns=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_auto=") == 0) {
                    result.ip6_auto = ret[i].substring("ip6_auto=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr1=") == 0) {
                    result.ip6_addr1 = ret[i].substring("ip6_addr1=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr2=") == 0) {
                    result.ip6_addr2 = ret[i].substring("ip6_addr2=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_gateway=") == 0) {
                    result.ip6_gateway = ret[i].substring("ip6_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_dhcp=") == 0) {
                    result.ip6_dhcp = ret[i].substring("ip6_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("port=") == 0) {
                    result.port = ret[i].substring("port=".length);
                    continue;
                }
                if (ret[i].indexOf("rtp_packet_max=") == 0) {
                    result.rtp_packet_max = ret[i].substring("rtp_packet_max=".length);
                    continue;
                }
                if (ret[i].indexOf("mss=") == 0) {
                    result.mss = ret[i].substring("mss=".length);
                    continue;
                }
                if (ret[i].indexOf("time=") == 0) {
                    result.time = ret[i].substring("time=".length);
                }
            }
        }
        return result;
    } 
    function getLan0Network() {
        var url = "/cgi-bin/get_network?interface=lan0";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("ip4_dhcp=") == 0) {
                    result.ip4_dhcp = ret[i].substring("ip4_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_addr=") == 0) {
                    result.ip4_addr = ret[i].substring("ip4_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_netmask=") == 0) {
                    result.ip4_netmask = ret[i].substring("ip4_netmask=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_gateway=") == 0) {
                    result.ip4_gateway = ret[i].substring("ip4_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("dns=") == 0) {
                    result.dns = ret[i].substring("dns=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_auto=") == 0) {
                    result.ip6_auto = ret[i].substring("ip6_auto=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr=") == 0) {
                    result.ip6_addr = ret[i].substring("ip6_addr=".length);
                    continue;
                }
                // if (ret[i].indexOf("ip6_addr2=") == 0) {
                //     result.ip6_addr2 = ret[i].substring("ip6_addr2=".length);
                //     continue;
                // }
                if (ret[i].indexOf("ip6_gateway=") == 0) {
                    result.ip6_gateway = ret[i].substring("ip6_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_dhcp=") == 0) {
                    result.ip6_dhcp = ret[i].substring("ip6_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("domain=") == 0) {
                    result.domain = ret[i].substring("domain=".length);
                    continue;
                }
                if (ret[i].indexOf("port=") == 0) {
                    result.port = ret[i].substring("port=".length);
                    continue;
                }
                if (ret[i].indexOf("rtp_packet_max=") == 0) {
                    result.rtp_packet_max = ret[i].substring("rtp_packet_max=".length);
                    continue;
                }
                if (ret[i].indexOf("mss=") == 0) {
                    result.mss = ret[i].substring("mss=".length);
                    continue;
                }
                if (ret[i].indexOf("time=") == 0) {
                    result.time = ret[i].substring("time=".length);
                }
                if (ret[i].indexOf("metric=") == 0) {
                    result.metric = ret[i].substring("metric=".length);
                }
            }
        }
        return result;
    } 
    function getLan1ActiveNetwork() {
        var url = "/cgi-bin/get_active_network?interface=lan1";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("ip4_dhcp=") == 0) {
                    result.ip4_dhcp = ret[i].substring("ip4_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_addr=") == 0) {
                    result.ip4_addr = ret[i].substring("ip4_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_netmask=") == 0) {
                    result.ip4_netmask = ret[i].substring("ip4_netmask=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_gateway=") == 0) {
                    result.ip4_gateway = ret[i].substring("ip4_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("dns=") == 0) {
                    result.dns = ret[i].substring("dns=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_auto=") == 0) {
                    result.ip6_auto = ret[i].substring("ip6_auto=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr1=") == 0) {
                    result.ip6_addr1 = ret[i].substring("ip6_addr1=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr2=") == 0) {
                    result.ip6_addr2 = ret[i].substring("ip6_addr2=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_gateway=") == 0) {
                    result.ip6_gateway = ret[i].substring("ip6_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_dhcp=") == 0) {
                    result.ip6_dhcp = ret[i].substring("ip6_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("port=") == 0) {
                    result.port = ret[i].substring("port=".length);
                    continue;
                }
                if (ret[i].indexOf("rtp_packet_max=") == 0) {
                    result.rtp_packet_max = ret[i].substring("rtp_packet_max=".length);
                    continue;
                }
                if (ret[i].indexOf("mss=") == 0) {
                    result.mss = ret[i].substring("mss=".length);
                    continue;
                }
                if (ret[i].indexOf("time=") == 0) {
                    result.time = ret[i].substring("time=".length);
                }
            }
        }
        return result;
    } 
    function getLan1Network() {
        var url = "/cgi-bin/get_network?interface=lan1";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("ip4_dhcp=") == 0) {
                    result.ip4_dhcp = ret[i].substring("ip4_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_addr=") == 0) {
                    result.ip4_addr = ret[i].substring("ip4_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_netmask=") == 0) {
                    result.ip4_netmask = ret[i].substring("ip4_netmask=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_gateway=") == 0) {
                    result.ip4_gateway = ret[i].substring("ip4_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("dns=") == 0) {
                    result.dns = ret[i].substring("dns=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_auto=") == 0) {
                    result.ip6_auto = ret[i].substring("ip6_auto=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr=") == 0) {
                    result.ip6_addr = ret[i].substring("ip6_addr=".length);
                    continue;
                }
                // if (ret[i].indexOf("ip6_addr2=") == 0) {
                //     result.ip6_addr2 = ret[i].substring("ip6_addr2=".length);
                //     continue;
                // }
                if (ret[i].indexOf("ip6_gateway=") == 0) {
                    result.ip6_gateway = ret[i].substring("ip6_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_dhcp=") == 0) {
                    result.ip6_dhcp = ret[i].substring("ip6_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("port=") == 0) {
                    result.port = ret[i].substring("port=".length);
                    continue;
                }
                if (ret[i].indexOf("rtp_packet_max=") == 0) {
                    result.rtp_packet_max = ret[i].substring("rtp_packet_max=".length);
                    continue;
                }
                if (ret[i].indexOf("mss=") == 0) {
                    result.mss = ret[i].substring("mss=".length);
                    continue;
                }
                if (ret[i].indexOf("time=") == 0) {
                    result.time = ret[i].substring("time=".length);
                }
                if (ret[i].indexOf("metric=") == 0) {
                    result.metric = ret[i].substring("metric=".length);
                }
            }
        }
        return result;
    } 
    function getUsbActiveNetwork() {
        var url = "/cgi-bin/get_active_network?interface=usb0";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("ip4_dhcp=") == 0) {
                    result.ip4_dhcp = ret[i].substring("ip4_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_addr=") == 0) {
                    result.ip4_addr = ret[i].substring("ip4_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_netmask=") == 0) {
                    result.ip4_netmask = ret[i].substring("ip4_netmask=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_gateway=") == 0) {
                    result.ip4_gateway = ret[i].substring("ip4_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("dns=") == 0) {
                    result.dns = ret[i].substring("dns=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_auto=") == 0) {
                    result.ip6_auto = ret[i].substring("ip6_auto=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr1=") == 0) {
                    result.ip6_addr1 = ret[i].substring("ip6_addr1=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr2=") == 0) {
                    result.ip6_addr2 = ret[i].substring("ip6_addr2=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_gateway=") == 0) {
                    result.ip6_gateway = ret[i].substring("ip6_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_dhcp=") == 0) {
                    result.ip6_dhcp = ret[i].substring("ip6_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("port=") == 0) {
                    result.port = ret[i].substring("port=".length);
                    continue;
                }
                if (ret[i].indexOf("rtp_packet_max=") == 0) {
                    result.rtp_packet_max = ret[i].substring("rtp_packet_max=".length);
                    continue;
                }
                if (ret[i].indexOf("mss=") == 0) {
                    result.mss = ret[i].substring("mss=".length);
                    continue;
                }
                if (ret[i].indexOf("time=") == 0) {
                    result.time = ret[i].substring("time=".length);
                }
            }
        }
        return result;
    } 
    function getUsbNetwork() {
        var url = "/cgi-bin/get_network?interface=usb0";
        var ret = cparam_sendRequest(url);
        var result = {};
        if (ret) {
            ret = cparam_getRetArray(ret);

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].indexOf("ip4_dhcp=") == 0) {
                    result.ip4_dhcp = ret[i].substring("ip4_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_addr=") == 0) {
                    result.ip4_addr = ret[i].substring("ip4_addr=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_netmask=") == 0) {
                    result.ip4_netmask = ret[i].substring("ip4_netmask=".length);
                    continue;
                }
                if (ret[i].indexOf("ip4_gateway=") == 0) {
                    result.ip4_gateway = ret[i].substring("ip4_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("dns=") == 0) {
                    result.dns = ret[i].substring("dns=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_auto=") == 0) {
                    result.ip6_auto = ret[i].substring("ip6_auto=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_addr=") == 0) {
                    result.ip6_addr = ret[i].substring("ip6_addr=".length);
                    continue;
                }
                // if (ret[i].indexOf("ip6_addr2=") == 0) {
                //     result.ip6_addr2 = ret[i].substring("ip6_addr2=".length);
                //     continue;
                // }
                if (ret[i].indexOf("ip6_gateway=") == 0) {
                    result.ip6_gateway = ret[i].substring("ip6_gateway=".length);
                    continue;
                }
                if (ret[i].indexOf("ip6_dhcp=") == 0) {
                    result.ip6_dhcp = ret[i].substring("ip6_dhcp=".length);
                    continue;
                }
                if (ret[i].indexOf("pri_server=") == 0) {
                    result.pri_server = ret[i].substring("pri_server=".length);
                    continue;
                }
                if (ret[i].indexOf("sec_server=") == 0) {
                    result.sec_server = ret[i].substring("sec_server=".length);
                    continue;
                }
                if (ret[i].indexOf("port=") == 0) {
                    result.port = ret[i].substring("port=".length);
                    continue;
                }
                if (ret[i].indexOf("rtp_packet_max=") == 0) {
                    result.rtp_packet_max = ret[i].substring("rtp_packet_max=".length);
                    continue;
                }
                if (ret[i].indexOf("mss=") == 0) {
                    result.mss = ret[i].substring("mss=".length);
                    continue;
                }
                if (ret[i].indexOf("time=") == 0) {
                    result.time = ret[i].substring("time=".length);
                }
                if (ret[i].indexOf("metric=") == 0) {
                    result.metric = ret[i].substring("metric=".length);
                }
            }
        }
        return result;
    } 

    function ChangeIPv6Manual() {
        if (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
            inputNetworkObject[SETUP_NETWORK_IPV6_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT].displayOff();
        }
        else if (radioNetworkButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "1") {
            inputNetworkObject[SETUP_NETWORK_IPV6_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_GATEWAY2_INPUT].displayDisabled();
        }
    }

    function ChangeIPv6UsbManual() {
        if (radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
            inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT].displayOff();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT].displayOff();
        }
        else if (radioUsbButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "1") {
            inputNetworkObject[SETUP_NETWORK_USB_IPV6_INPUT].displayDisabled();
            inputNetworkObject[SETUP_NETWORK_USB_GATEWAY2_INPUT].displayDisabled();
        }
    }

    function ChangeIPv6SfpManual() {
        if (radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "0") {
            inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT].displayOff();
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT].displayOff();
        }
        else if (radioSfpPlusButtonGroup[SETUP_NETWORK_IPV6_MANUAL].getSelectedValue() == "1") {
            inputSfpPlusObject[SETUP_NETWORK_IPV6_INPUT].displayDisabled();
            inputSfpPlusObject[SETUP_NETWORK_GATEWAY2_INPUT].displayDisabled();
        }
    }
     return {
        buildNetwork: buildNetwork
    };
}

