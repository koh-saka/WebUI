// mps_ptz_manual.js

var MpsPtzManual = (function () {

    var CENTER_BUTTON_CLASS = 'mps_manual_ctrl_center';

    var centerButtonConfig = {
        manual: 'cc_ptz_joystick_base.png',
        frameAdjust: 'cc_ptz_joystick_base_frame_adjust.png'
    };

    var currentDirection = null;

    var buttonMap = {
        mps_manual_control_up: {
            direction: 'up',
            manual: 'btn_cameraController_ptz_up_normal.png',
            frameAdjust: 'btn_cameraController_ptz_up_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_up_onmouse.png',
            active: 'btn_cameraController_ptz_up_click.png',
            disabled: 'btn_cameraController_ptz_up_disable.png'
        },
        mps_manual_control_top_right: {
            direction: 'upRight',
            manual: 'btn_cameraController_ptz_upperRight_normal.png',
            frameAdjust: 'btn_cameraController_ptz_upperRight_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_upperRight_onmouse.png',
            active: 'btn_cameraController_ptz_upperRight_click.png',
            disabled: 'btn_cameraController_ptz_upperRight_disable.png'
        },
        mps_manual_control_right: {
            direction: 'right',
            manual: 'btn_cameraController_ptz_right_normal.png',
            frameAdjust: 'btn_cameraController_ptz_right_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_right_onmouse.png',
            active: 'btn_cameraController_ptz_right_click.png',
            disabled: 'btn_cameraController_ptz_right_disable.png'
        },
        mps_manual_control_bottom_right: {
            direction: 'downRight',
            manual: 'btn_cameraController_ptz_lowerRight_normal.png',
            frameAdjust: 'btn_cameraController_ptz_lowerRight_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_lowerRight_onmouse.png',
            active: 'btn_cameraController_ptz_lowerRight_click.png',
            disabled: 'btn_cameraController_ptz_lowerRight_disable.png'
        },
        mps_manual_control_down: {
            direction: 'down',
            manual: 'btn_cameraController_ptz_down_normal.png',
            frameAdjust: 'btn_cameraController_ptz_down_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_down_onmouse.png',
            active: 'btn_cameraController_ptz_down_click.png',
            disabled: 'btn_cameraController_ptz_down_disable.png'
        },
        mps_manual_control_bottom_left: {
            direction: 'downLeft',
            manual: 'btn_cameraController_ptz_lowerLeft_normal.png',
            frameAdjust: 'btn_cameraController_ptz_lowerLeft_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_lowerLeft_onmouse.png',
            active: 'btn_cameraController_ptz_lowerLeft_click.png',
            disabled: 'btn_cameraController_ptz_lowerLeft_disable.png'
        },
        mps_manual_control_left: {
            direction: 'left',
            manual: 'btn_cameraController_ptz_left_normal.png',
            frameAdjust: 'btn_cameraController_ptz_left_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_left_onmouse.png',
            active: 'btn_cameraController_ptz_left_click.png',
            disabled: 'btn_cameraController_ptz_left_disable.png'
        },
        mps_manual_control_top_left: {
            direction: 'upLeft',
            manual: 'btn_cameraController_ptz_upperLeft_normal.png',
            frameAdjust: 'btn_cameraController_ptz_upperLeft_frame_adjust_normal.png',
            hover: 'btn_cameraController_ptz_upperLeft_onmouse.png',
            active: 'btn_cameraController_ptz_upperLeft_click.png',
            disabled: 'btn_cameraController_ptz_upperLeft_disable.png'
        }
    };

    function init() {
        bindEvents();
    }

    function bindEvents() {
        $(document)
            .on('mouseenter', getSelector(), onMouseEnter)
            .on('mouseleave', getSelector(), onMouseLeave)
            .on('mousedown', getSelector(), onMouseDown)
            .on('mouseup', onDocumentMouseUp)
            .on('mouseleave', onDocumentMouseUp);
    }

    function getSelector() {
        return Object.keys(buttonMap).map(function (className) {
            return '.' + className;
        }).join(',');
    }

    function getButtonConfig($button) {
        var classList = ($button.attr('class') || '').split(/\s+/);

        for (var i = 0; i < classList.length; i++) {
            if (buttonMap[classList[i]]) {
                return buttonMap[classList[i]];
            }
        }

        return null;
    }

    function getButtonImage(config, state) {
        if (state === 'disabled') {
            return config.disabled;
        }

        if (state === 'hover') {
            return config.hover;
        }

        if (state === 'active') {
            return config.active;
        }

        var mode = MpsState.ptz && MpsState.ptz.mode;

        if (mode === 'frameAdjust') {
            return config.frameAdjust;
        }

        return config.manual;
    }

    function setImage($button, fileName) {
        $button.css('background-image', 'url("./css/parts/' + fileName + '")');
    }

    function onMouseEnter() {
        var $button = $(this);
        var config = getButtonConfig($button);

        if (!config || $button.hasClass('mps_is_disabled')) {
            return;
        }

        setImage($button, getButtonImage(config, 'hover'));
    }

    function onMouseLeave() {
        var $button = $(this);
        var config = getButtonConfig($button);

        if (!config || $button.hasClass('mps_is_disabled')) {
            return;
        }

        if (currentDirection === config.direction) {
            return;
        }

        setImage($button, getButtonImage(config, 'normal'));
    }

    function onMouseDown(event) {
        event.preventDefault();

        var $button = $(this);
        var config = getButtonConfig($button);

        if (!config || $button.hasClass('mps_is_disabled')) {
            return;
        }

        currentDirection = config.direction;
        setImage($button, getButtonImage(config, 'active'));

        startPtzMove(config.direction);
    }

    function onDocumentMouseUp() {
        if (!currentDirection) {
            return;
        }

        resetAllButtons();
        stopPtzMove();

        currentDirection = null;
    }

    function resetCenterButton() {
        var $button = $('.' + CENTER_BUTTON_CLASS);

        setImage(
            $button,
            getButtonImage(centerButtonConfig, 'normal')
        );
    }

    function resetAllButtons() {
        $.each(buttonMap, function (className, config) {
            var $button = $('.' + className);

            if ($button.hasClass('mps_is_disabled')) {
                setImage($button, getButtonImage(config, 'disabled'));
            } else {
                setImage($button, getButtonImage(config, 'normal'));
            }
        });

        resetCenterButton();
    }

    function setDisabled(disabled) {
        $.each(buttonMap, function (className, config) {
            var $button = $('.' + className);

            $button.toggleClass('mps_is_disabled', disabled);
            setImage($button, getButtonImage(config, disabled ? 'disabled' : 'normal'));
        });

        if (disabled) {
            currentDirection = null;
            stopPtzMove();
        }
    }

    function startPtzMove(direction) {
        console.log('PTZ start:', direction);
        // TODO: CGI command start
    }

    function stopPtzMove() {
        console.log('PTZ stop');
        // TODO: CGI command stop
    }

    return {
        init: init,
        setDisabled: setDisabled,
        resetAllButtons: resetAllButtons,
        resetCenterButton: resetCenterButton
    };
})();
