var MpsState = {
    sliders: {
        iris: {
            min: 0,
            max: 100,
            value: 50
        },
        ptzSpeed: {
            min: 0,
            max: 100,
            value: 50
        },
        ptzZoom: {
            min: 0,
            max: 100,
            value: 50
        },
        ptzFocus: {
            min: 0,
            max: 100,
            value: 50
        },
        panTiltSpeed: {
            min: -2,
            max: 2,
            value: 0
        },
        autoZoomSpeed: {
            min: -2,
            max: 2,
            value: 0
        },
        sensitivity: {
            min: -2,
            max: 2,
            value: 0
        }
    },
    drag: {
        active: false,
        key: null
    },
    tabs: {
        trackAdjust: 'autoFraming',
        assist: 'trackingControl'
    },
    ptz: {
        mode: 'manual',             // manusl / frameAdjust
        uiMode: 'normalControl',    // normalControl / canvasControl
        viewMode: 'normal',         // normal /expanded
        locked: false
    },
    toggles: {
        autoFramingEnable: false
    },
    autoButtons: {
        focus: {
            normal: false
        },
        zoom: {
            normal: true
        },
        iris: {
            normal: false,
            expanded: false
        }
    }
};