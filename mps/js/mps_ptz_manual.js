// mps_ptz_manual.js

var MpsPtzManual = (function () {

    var UI_MODE_NORMAL_CONTROL = 'normalControl';
    var UI_MODE_CANVAS_CONTROL = 'canvasControl';

    var SELECTOR_MANUAL_CONTROL = '.mps_manual_control';
    var SELECTOR_CANVAS_CONTROL = '.mps_camera_ptz_ctrl';
    var SELECTOR_CANVAS = '.mps_control_ptz';
    var SELECTOR_LOCK_BUTTON = '.js-ptz-lock-button';

    var CLASS_LOCKED_CONTAINER = 'mps_ptz_locked';
    var CLASS_LOCKED_BUTTON = 'mps_is_locked';
    var CLASS_DISABLED = 'mps_is_disabled';
    var CLASS_HOVER = 'is-hover';
    var CLASS_PRESSED = 'is-active';

    var CLASS_CENTER_BUTTON = 'mps_manual_ctrl_center';

    var centerButtonConfig = {
        manual: 'cc_ptz_joystick_base.png',
        frameAdjust: 'cc_ptz_joystick_base_frame_adjust.png'
    };

    var CANVAS_SIZE_NORMAL = 212;
    var CANVAS_SIZE_EXPANDED = 272;
    var KNOB_SIZE = 50;

    var canvasKnobConfig = {
        manual: 'cc_ptz_joystick_knob_normal.png',
        frameAdjust: 'cc_ptz_joystick_knob_frame_adjust_normal.png'
    };

    var currentDirection = null;
    var isCanvasDragging = false;

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
        ensurePtzState();
        bindEvents();
        resetAllButtons();
        applyUiMode();
        renderLockState();
    }

    function bindEvents() {
        $(document)
            .on('mouseenter', getSelector(), onMouseEnter)
            .on('mouseleave', getSelector(), onMouseLeave)
            .on('mousedown', getSelector(), onMouseDown)
            .on('mouseup', onDocumentMouseUp)
            .on('mouseleave', onDocumentMouseUp)

            // center button: press中だけ canvasControl 表示
            .on('mousedown', '.mps_manual_ctrl_center', startCanvasDrag)
            .on('mousemove', SELECTOR_CANVAS, updateCanvasDrag)
            .on('mouseup', endCanvasDrag)
            .on('mouseleave', endCanvasDrag)

            .on('mouseenter', SELECTOR_LOCK_BUTTON, onLockMouseEnter)
            .on('mouseleave', SELECTOR_LOCK_BUTTON, onLockMouseLeave)
            .on('mousedown', SELECTOR_LOCK_BUTTON, onLockMouseDown)
            .on('click', SELECTOR_LOCK_BUTTON, onLockClick);

        $(window).on('blur', function () {
            onDocumentMouseUp();
            endCanvasDrag();
            clearLockPressedState();
        });
    }

    function getSelector() {
        return Object.keys(buttonMap).map(function (className) {
            return '.' + className;
        }).join(',');
    }

    function getViewMode() {
        return MpsState.ptz && MpsState.ptz.viewMode === 'expanded'
            ? 'expanded'
            : 'normal';
    }

    function isExpandedView() {
        return getViewMode() === 'expanded';
    }

    function getActivePtzContainer() {
        if (isExpandedView()) {
            return $('.mps_ptz_expanded_control');
        }

        return $('.mps_manual_control_container')
            .not('.mps_ptz_expanded_control');
    }

    function getCanvasSize() {
        return isExpandedView()
            ? CANVAS_SIZE_EXPANDED
            : CANVAS_SIZE_NORMAL;
    }

    function getCanvas() {
        return getActivePtzContainer()
            .find(SELECTOR_CANVAS)
            .get(0);
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
        if (isLocked()) {
            return;
        }

        var $button = $(this);
        var config = getButtonConfig($button);

        if (!config || $button.hasClass(CLASS_DISABLED)) {
            return;
        }

        setImage($button, getButtonImage(config, 'hover'));
    }

    function onMouseLeave() {
        var $button = $(this);
        var config = getButtonConfig($button);

        if (!config || $button.hasClass(CLASS_DISABLED)) {
            return;
        }

        if (currentDirection === config.direction) {
            return;
        }

        setImage($button, getButtonImage(config, 'normal'));
    }

    function onMouseDown(e) {
        if (isLocked()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        var $button = $(this);
        var config = getButtonConfig($button);

        if (!config || $button.hasClass(CLASS_DISABLED)) {
            e.preventDefault();
            e.stopPropagation();
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

    function startCanvasDrag(e) {
        e.preventDefault();
        e.stopPropagation();

        if (isLocked()) {
            return;
        }

        isCanvasDragging = true;

        setUiMode(UI_MODE_CANVAS_CONTROL);
        drawCanvasBase();

        console.log('[PTZ canvas] drag start');
    }

    function updateCanvasDrag(e) {
        if (isLocked()) {
            return;
        }

        if (!isCanvasDragging ||
            !MpsState.ptz ||
            MpsState.ptz.uiMode !== UI_MODE_CANVAS_CONTROL) {
            return;
        }

        var pos = getCanvasKnobPosition(e);

        drawCanvas(pos.x, pos.y);

        var vector = getCanvasVector(pos.x, pos.y);

        console.log('[PTZ canvas] vector:', vector);
    }

    function endCanvasDrag() {
        if (!isCanvasDragging) {
            return;
        }

        isCanvasDragging = false;

        drawCanvasBase();
        setUiMode(UI_MODE_NORMAL_CONTROL);

        console.log('[PTZ canvas] drag end');
    }

    function setUiMode(uiMode) {
        if (isLocked() && uiMode === UI_MODE_CANVAS_CONTROL) {
            return;
        }

        if (uiMode !== UI_MODE_NORMAL_CONTROL &&
            uiMode !== UI_MODE_CANVAS_CONTROL) {
            return;
        }

        MpsState.ptz.uiMode = uiMode;
        applyUiMode();
    }

    function applyUiMode() {
        var isCanvas = MpsState.ptz.uiMode === UI_MODE_CANVAS_CONTROL;
        var $container = getActivePtzContainer();

        /*
        * expanded DOM は Step 3 以降で追加する。
        * まだ存在しない場合は normal 側へフォールバックする。
        */
        if (!$container.length) {
            $container = $('.mps_manual_control_container')
                .not('.mps_ptz_expanded_control');
        }

        $container
            .toggleClass('mps_ptz_ui_normal', !isCanvas)
            .toggleClass('mps_ptz_ui_canvas', isCanvas);

        $container.find(SELECTOR_MANUAL_CONTROL).css('visibility', isCanvas ? 'hidden' : 'visible');

        $container.find(SELECTOR_CANVAS_CONTROL).toggle(isCanvas);

        if (isCanvas) {
            drawCanvasBase();
        }
    }

    function resetCenterButton() {
        var $button = $('.' + CLASS_CENTER_BUTTON);

        setImage(
            $button,
            getButtonImage(centerButtonConfig, 'normal')
        );
    }

    function resetAllButtons() {
        $.each(buttonMap, function (className, config) {
            var $button = $('.' + className);

            if ($button.hasClass(CLASS_DISABLED)) {
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

            $button.toggleClass(CLASS_DISABLED, disabled);
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

    function getCanvasBaseImagePath() {
        var mode = MpsState.ptz && MpsState.ptz.mode;

        var fileName = mode === 'frameAdjust'
            ? 'cc_ptz_joystick_base_1_frame_adjust.png'
            : 'cc_ptz_joystick_base_1.png';

        return './css/parts/' + fileName;
    }    

    function getCanvasKnobImagePath() {
        var mode = MpsState.ptz && MpsState.ptz.mode;

        var fileName = mode === 'frameAdjust'
            ? canvasKnobConfig.frameAdjust
            : canvasKnobConfig.manual;

        return './css/parts/' + fileName;
    }

    function getCanvasKnobPosition(e) {
        var canvas = getCanvas();
        var canvasSize = getCanvasSize();

        if (!canvas) {
            return {
                x: canvasSize / 2,
                y: canvasSize / 2
            };
        }

        var rect = canvas.getBoundingClientRect();

        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        return clampKnobToCircle(
            x,
            y,
            canvas.width || canvasSize,
            KNOB_SIZE
        );
    }

    function clampKnobToCircle(x, y, canvasSize, knobSize) {
        var center = canvasSize / 2;
        var maxDistance = (canvasSize - knobSize) / 2;

        var dx = x - center;
        var dy = y - center;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= maxDistance) {
            return { x: x, y: y };
        }

        var scale = maxDistance / distance;

        return {
            x: center + dx * scale,
            y: center + dy * scale
        };
    }    

    function drawCanvasBase() {
        var canvasSize = getCanvasSize();

        drawCanvas(canvasSize / 2, canvasSize / 2);
    }

    function drawCanvas(knobCenterX, knobCenterY) {
        var canvas = getCanvas();

        if (!canvas || !canvas.getContext) {
            return;
        }

        var canvasSize = getCanvasSize();

        /*
        * canvas DOM の width/height 属性が未設定・不一致の場合に備える。
        * normal は 212、expanded は 272。
        */
        if (canvas.width !== canvasSize) {
            canvas.width = canvasSize;
        }

        if (canvas.height !== canvasSize) {
            canvas.height = canvasSize;
        }

        var ctx = canvas.getContext('2d');

        var baseImage = new Image();
        var knobImage = new Image();

        baseImage.onload = function () {
            knobImage.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

                ctx.drawImage(
                    knobImage,
                    knobCenterX - KNOB_SIZE / 2,
                    knobCenterY - KNOB_SIZE / 2,
                    KNOB_SIZE,
                    KNOB_SIZE
                );
            };

            knobImage.src = getCanvasKnobImagePath();
        };

        baseImage.src = getCanvasBaseImagePath();
    }

    function getCanvasVector(x, y) {
        var canvasSize = getCanvasSize();
        var center = canvasSize / 2;

        var dx = x - center;
        var dy = y - center;

        var maxDistance = (canvasSize - KNOB_SIZE) / 2;
        var distance = Math.sqrt(dx * dx + dy * dy);

        var power = maxDistance === 0
            ? 0
            : Math.min(distance / maxDistance, 1);

        return {
            mode: MpsState.ptz.mode,
            viewMode: getViewMode(),
            dx: Math.round(dx),
            dy: Math.round(dy),
            power: Number(power.toFixed(2)),
            direction: getDirectionFromVector(dx, dy)
        };
    }

    function getDirectionFromVector(dx, dy) {
        var threshold = 8;

        if (Math.abs(dx) < threshold &&
            Math.abs(dy) < threshold) {
            return 'center';
        }

        var angle = Math.atan2(dy, dx) * 180 / Math.PI;

        if (angle >= -22.5 && angle < 22.5) {
            return 'right';
        }

        if (angle >= 22.5 && angle < 67.5) {
            return 'downRight';
        }

        if (angle >= 67.5 && angle < 112.5) {
            return 'down';
        }

        if (angle >= 112.5 && angle < 157.5) {
            return 'downLeft';
        }

        if (angle >= 157.5 || angle < -157.5) {
            return 'left';
        }

        if (angle >= -157.5 && angle < -112.5) {
            return 'upLeft';
        }

        if (angle >= -112.5 && angle < -67.5) {
            return 'up';
        }

        return 'upRight';
    }

    function ensurePtzState() {
        if (!MpsState.ptz) {
            MpsState.ptz = {};
        }

        if (!MpsState.ptz.mode) {
            MpsState.ptz.mode = 'manual';
        }

        if (!MpsState.ptz.viewMode) {
            MpsState.ptz.viewMode = 'normal';
        }

        if (typeof MpsState.ptz.locked !== 'boolean') {
            MpsState.ptz.locked = false;
        }

        if (!MpsState.ptz.uiMode) {
            MpsState.ptz.uiMode = UI_MODE_NORMAL_CONTROL;
        }
    }

    function isLocked() {
        return !!(MpsState.ptz && MpsState.ptz.locked);
    }

    function setLocked(locked) {
        ensurePtzState();

        MpsState.ptz.locked = !!locked;

        if (MpsState.ptz.locked) {
            /*
            * 念のため:
            * 仕様上 lock中に canvas表示されることはないが、
            * 将来変更や異常系に備えて normalControl へ戻す。
            */
            isCanvasDragging = false;
            setUiMode(UI_MODE_NORMAL_CONTROL);
        }

        renderLockState();
    }

    function renderLockState() {
        ensurePtzState();

        var locked = MpsState.ptz.locked;

        $('.mps_manual_control_container')
            .toggleClass(CLASS_LOCKED_CONTAINER, locked);

        $(SELECTOR_LOCK_BUTTON)
            .toggleClass(CLASS_LOCKED_BUTTON, locked)
            .removeClass(CLASS_HOVER + ' ' + CLASS_PRESSED);

        syncLockDisabledClass(locked);
    }

    function syncLockDisabledClass(locked) {
        var mode = MpsState.ptz && MpsState.ptz.mode;

        var $targets = $(
            '.mps_manual_control,' +
            '.mps_speed_slider .mps_slider_btn,' +
            '.mps_speed_slider .js-slider,' +
            '.mps_zoom_slider .mps_slider_btn,' +
            '.mps_zoom_slider .js-slider'
        );

        if (mode === 'frameAdjust') {
            $targets = $targets.add('.mps_zoom_auto');
        }

        $targets.toggleClass(CLASS_DISABLED, locked);
    }

    function onLockMouseEnter() {
        var $button = $(this);

        $button.addClass(CLASS_HOVER);
    }

    function onLockMouseLeave() {
        clearLockVisualState($(this));
    }

    function onLockMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).addClass(CLASS_PRESSED);
    }

    function onLockClick(e) {
        e.preventDefault();
        e.stopPropagation();

        setLocked(!isLocked());
    }

    function clearLockVisualState($button) {
        $button.removeClass(CLASS_HOVER + ' ' + CLASS_PRESSED);
    }

    function clearLockPressedState() {
        $(SELECTOR_LOCK_BUTTON).removeClass(CLASS_PRESSED);
    }

    return {
        init: init,
        setDisabled: setDisabled,
        resetAllButtons: resetAllButtons,
        resetCenterButton: resetCenterButton,
        setUiMode: setUiMode,
        applyUiMode: applyUiMode,
        startCanvasDrag: startCanvasDrag,
        updateCanvasDrag: updateCanvasDrag,
        endCanvasDrag: endCanvasDrag,
        setLocked: setLocked,
        renderLockState: renderLockState,
        isLocked: isLocked
    };
})();
