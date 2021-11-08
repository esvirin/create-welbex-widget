define([
  "./apiCalls.js",
  "./templates.js",
  "./constants.js",
  "./utils.js",
  "./statesManager.js",
  "./statesUpdaters.js",
  "./renders.js",
  "./amoApi.js",
  "./Components.js",
  "./listeners.js",
  "./functionsForStyles.js",
], function (
  apiCalls,
  templates,
  constants,
  utils,
  statesManager,
  statesUpdaters,
  renders,
  amoApi,
  Components,
  listeners,
  functionsForStyles
) {
  return function () {
    const self = this;
    const { WIDGET_CODE } = constants;
    const {
      createLicence,
      getTariffs,
      getPaymentUrl,
      getPayment,
      updateInstallation,
      getWidgetInfo,
    } = apiCalls;
    const {
      buyingLicenceTemplate,
      loaderTemplate,
      buyingLicenceTemplateSettingPage,
      adSettingsTemplate,
    } = templates;
    const {
      widgetId,
      accountId,
      licenceStatus,
      firstInit,
      installationInfo,
      widgetInfo,
      widgetSettings,
      widgetParams,
    } = statesManager;
    const {
      updateAccountId,
      updateWidgetId,
      updateLicenceStatus,
      updateInstallationInfo,
    } = statesUpdaters;
    const { formatDate } = utils;
    const {
      renderContentInSettings,
      renderModal,
      renderPaymentBlock,
      renderCommentOfferModal,
    } = renders;
    const {
      underlineCurrentSettingPage,
      movePaymentItemFrame,
      removeLoader,
    } = functionsForStyles;

    let finishWidgetInit;
    //оплата
    self.renderSettingsPaymentBlock = async function () {
      const tariffs = await getTariffs(widgetId());
      if (!tariffs) {
        renderModal('<h1 style="color: red">Ошибка</h1>');
        return;
      }
      const hasSelectOption = tariffs.data.find(
        (tariff) => tariff.selected_by_default
      );
      let currentTariff = hasSelectOption
        ? hasSelectOption.id
        : tariffs.data[0].id;
      renderPaymentBlock(buyingLicenceTemplate(tariffs.data, currentTariff));
      const paymentWrapper = document.querySelector(".payment");
      const isMoreTariffs = tariffs.data.length > 4;
      paymentWrapper.insertAdjacentHTML(
        "afterend",
        `<div class="welbex__payment-tariffs__current-frame ${
          isMoreTariffs && "--moreTariffs"
        }"></div>`
      );
      const buyBtn = document.querySelector(".payment__buy-btn");
      buyBtn.addEventListener("click", (e) =>
        listeners.onBuyBtnClick(e, currentTariff)
      );

      paymentWrapper.addEventListener("click", (e) => {
        const item = e.target.closest(".payment__tariffs__item");
        if (item) {
          currentTariff = item.getAttribute("data-id");
          renderPaymentBlock(
            buyingLicenceTemplate(tariffs.data, currentTariff)
          );
          movePaymentItemFrame();
          const buyBtn = document.querySelector(".payment__buy-btn");
          buyBtn.addEventListener("click", (e) =>
            listeners.onBuyBtnClick(e, currentTariff)
          );
        }
      });
    };

    //обновление данных
    self.firstInit = async function () {
      if (firstInit()) {
        const settings = self.get_settings();
        widgetInfo(await getWidgetInfo(settings.oauth_client_uuid));

        await updateWidgetId(self.params.widget_code);
        await updateAccountId();
        await updateLicenceStatus();

        await updateInstallationInfo(
          settings.oauth_client_uuid,
          settings.phoneNumber,
          settings.name
        );

        firstInit(false);
      }
    };

    //страница настроек
    self.loadAdvancedSettings = async function () {
      const advancedSettingsBody = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__body`
      );
      if (advancedSettingsBody) {
        advancedSettingsBody.innerHTML = Components.LoaderComp(
          "welbex__main-loader"
        );
      }
      const navButtonsListRef = document.querySelectorAll(
        `.${WIDGET_CODE} .welbex_ad_settings__nav`
      );
      // Добавляем контейнеры для страниц
      advancedSettingsBody.insertAdjacentHTML(
        "beforeend",
        [...navButtonsListRef]
          .map(
            ({ dataset: { nav, withsubmenu } }) =>
              `<div class="welbex_ad_settings__page" data-page="${nav}" data-withsubnav="${
                withsubmenu || false
              }"></div>`
          )
          .join("") + Components.PaymentPageContainer()
      );
      const firstPageContainer = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__page`
      );
      const firstPageName = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__nav`
      ).dataset.nav;
      //добавляем декоративный underline
      document
        .querySelector(`.${WIDGET_CODE} .welbex_ad_settings__menu-btn`)
        .classList.add("--active");
      const submenuBtn = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__submenu-btn`
      );
      if (submenuBtn) {
        submenuBtn.classList.add("--active");
        document
          .querySelector('.welbex_ad_settings__page[data-withsubnav="true"]')
          .classList.add("--active");
      }
      firstPageContainer.classList.add("--active");
      underlineCurrentSettingPage();
      const content = await self.advancedSettingsPagesContent[firstPageName]();
      firstPageContainer.innerHTML = content;
      removeLoader();
    };

    //если нужно обновить страницу после внесенных пользователем изменений
    self.loadPage = async function (pageName) {
      document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__page.--active`
      ).innerHTML = Components.LoaderComp("welbex__main-loader");
      document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__page.--active`
      ).innerHTML = await self.advancedSettingsPagesContent[pageName]();
    };

    self.advancedSettingsPagesContent = {
      main: async function () {
        //асинхронная загрузка данных
        return `
          <h3 style="margin-bottom: 20px">Main settings page</h3>
          `;
      },
      instruction: async function () {
        return Components.SettingsBlockWrapper(
          '<h3 style="margin-bottom: 20px">instruction page</h3>'
        );
      },
      payment: async function (selectedTariffId) {
        const tariffs = await getTariffs(widgetId());
        if (!tariffs) {
          renderModal('<h1 style="color: red">Ошибка</h1>');
          return;
        }
        const hasSelectOption = tariffs.data.find(
          (tariff) => tariff.selected_by_default
        );
        let currentTariffId = hasSelectOption
          ? hasSelectOption.id
          : tariffs.data[0].id;
        currentTariffId = selectedTariffId ? selectedTariffId : currentTariffId;
        const isLicenceExpired = licenceStatus().expired;
        const subscriptionDate = licenceStatus().data
          ? formatDate(new Date(licenceStatus().data.date_end))
          : "";

        return buyingLicenceTemplateSettingPage(
          tariffs.data,
          currentTariffId,
          licenceStatus().data,
          subscriptionDate,
          isLicenceExpired,
          widgetParams().test
        );
      },
      help: async function () {
        return Components.SettingsBlockWrapper(
          '<h3 style="margin-bottom: 20px">help page</h3>'
        );
      },
      users: async function () {
        return Components.SettingsBlockWrapper(
          '<h3 style="margin-bottom: 20px">users page</h3>'
        );
      },
    };

    this.callbacks = {
      settings: async function () {
        const isInstalling = self.params.widget_active === "N";

        const settingsArea = document.querySelector(
          ".widget_settings_block__fields"
        );
        if (!document.querySelector(".widget-content-wrapper")) {
          settingsArea.insertAdjacentHTML(
            "afterbegin",
            '<div class="widget-content-wrapper"></div>'
          );
        }
        if (widgetParams().test) {
          renderContentInSettings(
            `<div style="color: green">Данный виджет использует тестовый режим</div>`
          );
          return true;
        }
        if (!isInstalling) {
          await updateLicenceStatus();
          if (licenceStatus().exist) {
            renderContentInSettings(
              `<div style="color: green">Ваша лицензия действительна до ${formatDate(
                new Date(licenceStatus().data.date_end)
              )}</div>` + '<div class="payment"></div>'
            );
          } else {
            if (licenceStatus().expired) {
              renderContentInSettings(
                '<div style="color: red">Ваша лицензия истекла</div>' +
                  '<div class="payment"></div>'
              );
            } else {
              renderContentInSettings(
                '<div style="color: red">Для использования виджета приобретите или получите тестовую лицензию</div>' +
                  '<div class="payment"></div>'
              );
            }
          }
          await self.renderSettingsPaymentBlock();
          movePaymentItemFrame();
        }
        return true;
      },
      init: function () {
        const head = document.querySelector("head");
        const settings = self.get_settings();
        head.insertAdjacentHTML(
          "beforeend",
          `<link href="${settings.path}/index.css?v=${settings.version}" type="text/css" rel="stylesheet">`
        );
        if (widgetParams().test || licenceStatus().exist) {
          console.log("init");
        }
        return true;
      },
      bind_actions: async function () {
        await new Promise((resolve) => (finishWidgetInit = resolve));
        if (widgetParams().test || licenceStatus().exist) {
          //навигация
          document.removeEventListener("click", (e) =>
            listeners.onSettingsNav(e, self.advancedSettingsPagesContent)
          );
          document.addEventListener("click", (e) =>
            listeners.onSettingsNav(e, self.advancedSettingsPagesContent)
          );

          //страница оплаты
          document.removeEventListener("click", (e) =>
            listeners.onPaymentItemClick(e, self.advancedSettingsPagesContent)
          );
          document.addEventListener("click", (e) =>
            listeners.onPaymentItemClick(e, self.advancedSettingsPagesContent)
          );
        }
        return true;
      },
      render: async function () {
        if (firstInit()) {
          const settings = self.get_settings();
          widgetSettings(settings);
          widgetInfo(await getWidgetInfo(settings.oauth_client_uuid));

          await updateWidgetId(self.params.widget_code);
          await updateAccountId();
          await updateLicenceStatus();

          await updateInstallationInfo();

          if (!Object.keys(installationInfo())) {
            renderModal(
              `<h1 style="color: red">Ошибка виджета ${
                widgetInfo().name
              }. Ссылка для перенаправравления в настройках виджета указана неверно. Для корректной работы виджеты смените ее на https://devcore.kindcode.ru/installation/hook</h1>`
            );
          }

          finishWidgetInit();
          firstInit(false);
        }
        if (widgetParams().test || licenceStatus().exist) {
          if (window.location.pathname === "/settings/widgets/") {
            if (licenceStatus().data.test && installationInfo().date) {
              const intialDate = new Date(installationInfo().date).getTime();
              const dateAfter3Days = intialDate + 1000 * 60 * 60 * 24 * 3;
              const dateAfter6Days = intialDate + 1000 * 60 * 60 * 24 * 6;

              const date7DaysBefore = Date.now() - 1000 * 60 * 60 * 24 * 7;

              if (date7DaysBefore < intialDate) {
                let shouldBeShown;
                let message;
                if (
                  Date.now() > dateAfter3Days &&
                  Date.now() < dateAfter6Days
                ) {
                  shouldBeShown = !localStorage.getItem(
                    `welbex_widget:${widgetId()}:firstCommentOffer`
                  );
                  message =
                    "в маркетплейсе amoCRM и получите дополнительно 14 дней бесплатной работы виджета";

                  localStorage.setItem(
                    `welbex_widget:${widgetId()}:firstCommentOffer`,
                    "true"
                  );
                } else if (Date.now() > dateAfter6Days) {
                  shouldBeShown = !localStorage.getItem(
                    `welbex_widget:${widgetId()}:secondCommentOffer`
                  );
                  message =
                    "подходит к концу, оставьте отзыв в маркетплейсе amoCRM и получите дополнительно 14 дней бесплатной работы виджета";

                  localStorage.setItem(
                    `welbex_widget:${widgetId()}:secondCommentOffer`,
                    "true"
                  );
                }

                if (shouldBeShown) {
                  renderCommentOfferModal(message);
                }
              }
            }
          }
          const widgetCode = self.get_settings().widget_code;
          const advancedSettingsRoot = document.querySelector(
            "#list_page_holder"
          );
          if (
            advancedSettingsRoot !== null &&
            advancedSettingsRoot.firstElementChild?.firstElementChild?.id.slice(
              10
            ) === widgetCode
          ) {
            advancedSettingsRoot.innerHTML = Components.LoaderComp(
              "welbex__main-loader"
            );
            const tariffs = await getTariffs(widgetId());
            if (!tariffs) {
              renderModal('<h1 style="color: red">Ошибка</h1>');
              return;
            }
            const subscriptionDate = licenceStatus().data
              ? formatDate(new Date(licenceStatus().data.date_end))
              : "";
            advancedSettingsRoot.innerHTML = adSettingsTemplate(
              subscriptionDate
            );
            self.loadAdvancedSettings();
          }
        }
        return true;
      },
      dpSettings: function () {},
      advancedSettings: async function () {
        await self.firstInit();
        if (widgetParams().test || licenceStatus().exist) {
          const advancedSettingsRoot = document.querySelector(
            "#list_page_holder"
          );
          advancedSettingsRoot.innerHTML = Components.LoaderComp(
            "welbex__main-loader"
          );
          const tariffs = await getTariffs(widgetId());
          if (!tariffs) {
            renderModal('<h1 style="color: red">Ошибка</h1>');
            return;
          }
          const subscriptionDate = licenceStatus().data
            ? formatDate(new Date(licenceStatus().data.date_end))
            : "";
          if (!document.querySelector(".welbex_ad_settings")) {
            advancedSettingsRoot.innerHTML = adSettingsTemplate(
              subscriptionDate
            );
          }
          self.loadAdvancedSettings();
        } else {
          $("#list_page_holder").html(
            '<div style="color: red">Для использования виджета приобретите или получите тестовую лицензию</div>'
          );
        }
      },
      destroy: function () {},
      contacts: {
        selected: function () {},
      },
      onSalesbotDesignerSave: function () {},
      leads: {
        selected: function () {},
      },
      todo: {
        selected: function () {},
      },
      onSave: async function ({ active }) {
        const isInstalling = self.params.widget_active === "N";
        const isUninstalling = active === "N";

        if (isInstalling) {
          if (!licenceStatus().exist) {
            const licenceInfo = await createLicence(
              widgetId(),
              accountId(),
              true
            );
            if (licenceInfo.errors) {
              renderModal(
                '<h1 style="color: red">Ошибка получения тестовой лицензии</h1>'
              );
              return true;
            }

            licenceStatus({
              exist: true,
              expired: false,
              data: licenceInfo.data,
            });
          }

          // амо меняет данное свойство только после перезагрузки страницы, поэтому пришлось сделать такой костыль
          self.params.widget_active = "Y";
          this.settings();
        } else if (isUninstalling) {
          if (installationInfo()) {
            await updateInstallation(installationInfo().id, {
              is_installed: false,
            });
          }
          // очищаем настройки
          renderContentInSettings("");
        }

        return true;
      },
      onAddAsSource: function (pipeline_id) {},
    };
    return this;
  };
});
