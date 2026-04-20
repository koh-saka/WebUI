var MpsState = {
    sliders: {
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
    handle: {
        panTiltSpeed: {
            hover: false
        },
        autoZoomSpeed: {
            hover: false
        },
        sensitivity: {
            hover: false
        }
    },
    tabs: {
        trackAdjust: 'autoFraming',
        assist: 'trackingControl'
    },
    toggles: {
        autoFramingEnable: false
    }
};