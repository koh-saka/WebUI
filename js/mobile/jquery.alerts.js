// jQuery Alert Dialogs Plugin
//
// Version 1.0
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// This is an altered version form Aurélien Malisart <aurelien.malisart@gmail.com>
//
// Visit http://github.com/aurels/jquery.alerts
// Visit http://abeautifulsite.net/notebook/87 for more information
//
(function ($) {

    $.alerts = {
        // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .01,                // transparency level of overlay
        overlayColor: '#FFF',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;OK&nbsp;',         // text for the OK button (not used anymore in this version)
        cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button (not used anymore in this version)
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods

        alert: function (message, ok, callback,isShowIcon) {
            $.alerts._show(message, null, ok, null, 'alert', function (result) {
                if (callback) callback(result);
            },isShowIcon);
        },

        confirm: function (message, ok, cancel, callback) {
            $.alerts._show(message, null, ok, cancel, 'confirm', function (result) {
                if (callback) callback(result);
            },true);
        },

        confirmIcon: function (message, ok, cancel, callback) {
            $.alerts._show(message, null, ok, cancel, 'confirmIcon', function (result) {
                if (callback) callback(result);
            },true);
        },

        prompt: function (message, value, ok, cancel, callback) {
            $.alerts._show(message, value, ok, cancel, 'prompt', function (result) {
                if (callback) callback(result);
            },true);
        },

        // confirmErr: function(message, ok, cancel, callback) {
        //     $.alerts._show(message, null, ok, cancel, 'confirmErr', function(result) {
        //         if( callback ) callback(result);
        //     });
        // },

        // Private methods

        _show: function (msg, value, ok, cancel, type, callback,isShowIcon) {

            $.alerts._hide();
            $.alerts._overlay('show');

            if(type == "confirmIcon"){
                $("BODY").append(
                    '<div id="popup_container">' +
                    '<div id="popup_content">' +
                    '<div id="popup_message"><img id="popup_pic" class="alertPic" src="/css/pc/parts/setup_dialog_alert.png"><span class="popup_message_all"><p id="popup_message_inner"></p></span></div>' +
                    '</div>' +
                    '</div>');
            }else {
                $("BODY").append(
                    '<div id="popup_container">' +
                    '<div id="popup_content">' +
                    '<div id="popup_message"><span class="popup_message_all"><img id="popup_pic" class="alertPic" src="/css/pc/parts/setup_dialog_alert.png"><p id="popup_message_inner"></p></span></div>' +
                    '</div>' +
                    '</div>');
            }


            if ($.alerts.dialogClass) $("#popup_container").addClass($.alerts.dialogClass);

            // IE6 Fix
            // var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';

            $("#popup_container").css({
                // position: pos,
                position: 'absolute',
                zIndex: 99999,
                padding: 0,
                margin: 0,
				color:"white"
            });

            $("#popup_content").addClass(type);
            $("#popup_message_inner").text(msg);
            $("#popup_message_inner").html($("#popup_message_inner").text().replace(/\n/g, '<br />'));

            if(window.orientation==180 || window.orientation==0){
                $("#popup_container").css({
                    minWidth: "45%",
                    maxWidth: "70%"
                });
            }
            else{
                var deviceWidth = document.documentElement.clientWidth;
                if(deviceWidth <= 812){
                    $("#popup_container").css({
                        minWidth: "45%",
                        maxWidth: "45%"
                    });
                } else {
                    $("#popup_container").css({
                        minWidth: "45%",
                        maxWidth: "50%"
                    });
                }
            }

            $.alerts._reposition();
            $.alerts._maintainPosition(true);

            switch (type) {
                case 'alert':
                    $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + ok + '" id="popup_sure" /></div>');
                    $("#popup_sure").on('touchstart',function(e) {
                        $.alerts._hide();
                        callback(true);
                    });
                    $("#popup_sure").focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $("#popup_sure").trigger('click');
                    });

                    if(!isShowIcon){
                        $("#popup_pic").hide();
                    }else{
                        $("#popup_pic").show();
                    }
                    break;
                case 'confirm':
                    $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + ok + '" id="popup_ok" /> <input type="button" value="' + cancel + '" id="popup_cancel" /></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        if (callback) callback(true);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(false);
                    });
                    // $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    $("#popup_pic").hide();
                    break;
                case 'prompt':
                    $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + ok + '" id="popup_ok" /> <input type="button" value="' + cancel + '" id="popup_cancel" /></div>');
                    $("#popup_prompt").width($("#popup_message").width());
                    $("#popup_ok").click(function () {
                        var val = $("#popup_prompt").val();
                        $.alerts._hide();
                        if (callback) callback(val);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(null);
                    });
                    $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    if (value) $("#popup_prompt").val(value);
                    $("#popup_prompt").focus().select();
                    break;
                case 'confirmIcon':
                    $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + ok + '" id="popup_ok" /> <input type="button" value="' + cancel + '" id="popup_cancel" /></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        if (callback) callback(true);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(false);
                    });
                    // $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    // $("#popup_pic").hide();
                    $("#popup_pic").attr("src","/css/pc/parts/btn_settings_normal.png");
                    $("#popup_pic").attr("class","alertPicIcon");
                    break;
                // case 'confirmErr':
                //    $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + ok + '" id="popup_ok" /> <input type="button" value="' + cancel + '" id="popup_cancel" /></div>');
                //    $("#popup_ok").click( function() {
                //        $.alerts._hide();
                //        if( callback ) callback(true);
                //    });
                //    $("#popup_cancel").click( function() {
                //        $.alerts._hide();
                //        if( callback ) callback(false);
                //    });
                //    // $("#popup_ok").focus();
                //    $("#popup_ok, #popup_cancel").keypress( function(e) {
                //        if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                //        if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
                //    });
                //    $("#popup_pic").addClass("alertPic");
                // break;
            }

            // Make draggable
            // if( $.alerts.draggable ) {
            // 				try {
            // 					//$("#popup_container").draggable({ handle: $("#popup_title") });
            // 					//$("#popup_title").css({ cursor: 'move' });
            // 				} catch(e) { /* requires jQuery UI draggables */ }
            // 			}
        },

        _hide: function () {
            $("#popup_container").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.alerts._overlay('hide');
                    $("BODY").append('<div id="popup_overlay"></div>');
                    $("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        // SF200->#2810のマージ(対応方法がSF200と違う)
                        width: $(document).width(),
                        height: $(document).height(),
                        background: $.alerts.overlayColor,
                        opacity: $.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {

            var top = (Size.TOP + Size.HEIGHT  / 2 - ($("#popup_container").outerHeight() / 2));
            var left = (Size.LEFT + Size.WIDTH / 2 - ($("#popup_container").outerWidth() / 2));

            if($("#camera_controller_gui").css('display') == undefined || $("#camera_controller_gui").css('display') == "none"){
                if(window.orientation==180 || window.orientation==0){
                    $("#popup_container").css({
                        top: top + 'px',
                        left: left + 'px'
                    });
                } else {
                    var deviceWidth = document.documentElement.clientWidth;
                    if(deviceWidth <= 812){
                        left = left+50;
                    }

                    $("#popup_container").css({
                        top: top + 'px',
                        left: left + 'px'
                    });
                }

            }else{
                if($("#camera_controller_gui").css('display') == "none" && $("#setup_preset_form_inner").css('display') == "none"){

                    $("#popup_container").css({
                        top: top + 'px',
                        left: left + 'px'
                    });
                }else{
                    $("#popup_container").css({
                        top: top + 'px',
                        right: 50 + 'px'
                    });

                }
            }

            $("#popup_overlay").height($(document).height());
        },

        _maintainPosition: function (status) {
            if ($.alerts.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', function () {
                            $.alerts._reposition();
                        });
                        break;
                    case false:
                        $(window).unbind('resize');
                        break;
                }
            }
        }

    };

    // Shortuct functions
    jAlert = function (message, ok, callback) {
        $.alerts.alert(message, ok, callback,true);
    };

    jConfirm = function (message, ok, cancel, callback) {
        $.alerts.confirm(message, ok, cancel, callback);
    };

    jConfirmIcon = function (message, ok, cancel, callback) {
        $.alerts.confirmIcon(message, ok, cancel, callback);
    };

    jPrompt = function (message, value, ok, cancel, callback) {
        $.alerts.prompt(message, value, ok, cancel, callback);
    };

    jStrAlert=function (message, ok, callback,isShowIcon) {
        $.alerts.alert(message, ok, callback,isShowIcon);
    }
    // jConfirmErr = function(message, ok, cancel, callback) {
    //     $.alerts.confirmErr(message, ok, cancel, callback);
    // };

})(jQuery);