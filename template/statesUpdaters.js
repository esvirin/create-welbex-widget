define(['./apiCalls.js', './statesManager.js', './renders.js'], function (apiCalls, statesManager, renders) {
    const {
        createAccount,
        createLicence,
        createLicenceLead,
        getAccount,
        getLicence,
        getWidget,
        createWidget,
        getInstallation,
    } = apiCalls
    const { renderModal } = renders

    const { widgetId, accountId, licenceStatus, firstInit, installationInfo, widgetInfo, widgetParams } = statesManager

    async function updateInstallationInfo() {
        let installation = await getInstallation(accountId(), widgetId())

        if (!installation.data) {
            // так как после прихода хука может быть задержка, ждем 3 секунды и снова проверяем
            await new Promise((resolve) => setTimeout(resolve, 3000))
            installation = await getInstallation(accountId(), widgetId())

            // если и тут ничего не получили, то уже выбрасываем ошибку
            if (!installation.data) {
                installationInfo({})
                return
            }
        }
        installationInfo(installation.data)

        if (!installationInfo().dataStored) {
            const data = widgetInfo()
            const licenceInfo = {
                email: AMOCRM.constant('user').login,
                widget_name: data.name,
                tariff: AMOCRM.constant('account').tariffName,
                licence_end_date: AMOCRM.constant('account').paid_till,
                last_extended: AMOCRM.constant('account').paid_from,
                installation_id: installationInfo().id,
            }
            createLicenceLead(AMOCRM.constant('account').subdomain, licenceInfo)
        }
    }

    async function updateWidgetId(amoWidgetId) {
        let widget = await getWidget(amoWidgetId)
        if (!widget || !widget.data) {
            renderModal(
                '<h1 style="color: red">Ваш виджет не зарегистрирован в базе ядра. Пожалуйста, прочтите инструкцию по работе с ядром</h1>'
            )
            return null
        }
        widgetId((widget.data[0] || widget.data).id)
        widgetParams(widget.data[0] || widget.data || {})
    }

    async function updateAccountId() {
        const amoId = AMOCRM.constant('account').id
        let account = await getAccount(amoId)

        if (!account) {
            renderModal('<h1 style="color: red">Ошибка</h1>')
            return true
        }
        if (!account.data) {
            const domain = AMOCRM.constant('account').subdomain

            account = await createAccount(amoId, domain)

            if (!account) {
                renderModal('<h1 style="color: red">Ошибка</h1>')
                return true
            }
        }
        accountId((account.data[0] || account.data).id)
    }
    async function updateLicenceStatus() {
        const licenseInfo = await getLicence(widgetId(), accountId())

        if (licenseInfo.data) {
            licenceStatus({
                exist: true,
                expired: false,
                data: licenseInfo.data,
            })
        } else if (licenseInfo.msg && licenseInfo.msg.includes('expired')) {
            licenceStatus({ exist: false, expired: true, data: null })
        } else {
            const licenceInfo = await createLicence(widgetId(), accountId(), true)
            licenceStatus({
                exist: true,
                expired: false,
                data: licenceInfo.data,
            })
        }
    }

    async function updateFirstInit() {
        firstInit(false)
    }
    return {
        updateAccountId,
        updateWidgetId,
        updateLicenceStatus,
        updateFirstInit,
        updateInstallationInfo,
    }
})
