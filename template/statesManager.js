export default function () {
    const states = {}

    function createState(name, initialValue) {
        let value = initialValue
	    states[name] = (setter) =>
	        setter ? (typeof setter === 'function' ? (value = setter(value)) : (value = setter)) : value
    }

    createState('widgetId', null)
    createState('accountId', null)
    createState('licenceStatus', { exist: false, expired: false, data: null })
    createState('firstInit', true)
    createState('installationInfo', null)
    createState('widgetInfo', {})
    createState('widgetSettings', {})
    createState('widgetParams', null)
    return states
}
