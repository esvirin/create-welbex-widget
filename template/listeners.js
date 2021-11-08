define([
  "./functionsForStyles.js",
  "./apiCalls.js",
  "./templates.js",
  "./statesManager.js",
  "./renders.js",
  "./Components.js",
  "./constants.js",
], function (
  functionsForStyles,
  apiCalls,
  templates,
  statesManager,
  renders,
  Components,
  constants
) {
  const { WIDGET_CODE } = constants;
  const {
    underlineCurrentSettingPage,
    movePaymentItemFrame,
    removeLoader,
  } = functionsForStyles;
  const { getPaymentUrl, getPayment, getTariffs } = apiCalls;
  const { loaderTemplate } = templates;
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

  const { renderContentInSettings, renderModal } = renders;

  async function onBuyBtnClick(e, selectedTariffId) {
    const buyBtn = document.querySelector(".payment__buy-btn");
    const buyBtnSettingsPage = document.querySelector(
      ".welbex-settings__payment-page__payment__buy-btn.payment__buy-btn"
    );
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
    currentTariff = selectedTariffId ? selectedTariffId : currentTariff;
    e.target.style.display = "none";
    e.target.insertAdjacentHTML("afterend", loaderTemplate());
    const paymentData = await getPaymentUrl(
      tariffs.data.find(
        (tariff) => parseInt(tariff.id) === parseInt(currentTariff)
      ).id,
      widgetId(),
      accountId()
    );
    const invId = paymentData.data.invId;
    const tempLink = document.createElement("a");
    tempLink.href = paymentData.data.url;
    tempLink.target = "_blank";
    tempLink.click();
    tempLink.remove();
    e.target.style.display = "flex";
    e.target.nextElementSibling.style.display = "none";
    buyBtnSettingsPage.addEventListener("click", (e) =>
      onBuyBtnClick(e, currentTariff)
    );
    buyBtn.addEventListener("click", (e) => onBuyBtnClick(e, currentTariff));
    setTimeout(() => {
      const updatingLicenceStatus = setInterval(async () => {
        const payment = await getPayment(invId);
        const paymentStatus = payment.data[0].status;
        if (paymentStatus === "Completed") {
          renderModal(
            '<h1 style="color: green">Оплата прошла успешно. Лицензия выдана</h1>'
          );
          await updateLicenceStatus();
          renderContentInSettings(
            `<div style="color: green">Ваша лицензия действительна до ${formatDate(
              new Date(licenceStatus().data.date_end)
            )}</div>` + '<div class="payment"></div>'
          );
          clearInterval(updatingLicenceStatus);
        } else if (paymentStatus === "Failed") {
          buyBtn.style.display = "block";
          renderModal('<h1 style="color: red">Ошибка оплаты</h1>');
          clearInterval(updatingLicenceStatus);
          buyBtnSettingsPage.addEventListener("click", (e) =>
            onBuyBtnClick(e, currentTariff)
          );
          buyBtn.addEventListener("click", (e) =>
            onBuyBtnClick(e, currentTariff)
          );
        }
      }, 5000);
    }, 15000);
  }
  async function onPaymentItemClick(e, advancedSettingsPagesContent) {
    const pageContainer = document.querySelector(`[data-page="payment"]`);
    const item = e.target.closest(
      ".welbex-settings__payment-page__payment__tariffs__item"
    );
    if (item) {
      const currentTariffId = item.getAttribute("data-id");
      pageContainer.innerHTML = await advancedSettingsPagesContent.payment(
        currentTariffId
      );
      // позиционирование рамки
      movePaymentItemFrame(true);
      const buyBtn = document.querySelector(
        ".welbex-settings__payment-page__payment__buy-btn.payment__buy-btn"
      );
      buyBtn.addEventListener("click", (e) =>
        onBuyBtnClick(e, currentTariffId)
      );
    }
  }
  async function onSettingsNav(e, advancedSettingsPagesContent) {
    const paymentPageCurrentItemFrame = document.querySelector(
      ".welbex__payment-tariffs__current-frame"
    );
    if (e.target.dataset.nav) {
      const btn = e.target;
      //если клик в ту же кнопку
      if (btn.classList.contains("--active")) {
        return;
      }

      const pageName = btn.dataset.nav;
      const underlineCurrentSubMenuPage = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__submenu-nav--underline`
      );
      const currentSubMenuBtn = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__submenu-btn.--active`
      );
      const currentMenuBtn = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__menu-btn.--active`
      );
      const currentPage = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__page.--active`
      );
      const adSettingsBody = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__body`
      );
      const initialSubMenuBtn = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__submenu-btn`
      );
      const subMenuBlock = document.querySelector(
        `.${WIDGET_CODE} .welbex_ad_settings__submenu-wrapper`
      );

      //если переходим со страницы оплаты - удаление рамки-анимации
      paymentPageCurrentItemFrame.style.display = "none";

      //меняем положение декоративного underline
      if (btn.dataset.withsubmenu) {
        currentMenuBtn.classList.remove("--active");
      } else {
        currentSubMenuBtn.classList.remove("--active");
      }
      btn.classList.add("--active");

      //если на странице нету подменю
      if (btn.dataset.withsubmenu === "false") {
        underlineCurrentSubMenuPage.style.display = "none";
        subMenuBlock.style.display = "none";
        currentSubMenuBtn.classList.remove("--active");
        initialSubMenuBtn.classList.add("--active");
      } else {
        underlineCurrentSubMenuPage.style.display = "block";
        subMenuBlock.style.display = "block";
      }
      underlineCurrentSettingPage();

      //меняем содержание страниц
      currentPage.innerHTML = "";
      currentPage.classList.remove("--active");
      const pageContainer = document.querySelector(
        `.${WIDGET_CODE} [data-page="${pageName}"]`
      );
      pageContainer.innerHTML = Components.LoaderComp("welbex__main-loader");
      const newContent = await advancedSettingsPagesContent[pageName]();
      pageContainer.innerHTML = newContent;
      pageContainer.classList.add("--active");

      //если переходим на страницу оплаты
      if (btn.dataset.nav === "payment") {
        const buyBtn = document.querySelector(
          ".welbex-settings__payment-page__payment__buy-btn.payment__buy-btn"
        );
        buyBtn.addEventListener("click", onBuyBtnClick);
        paymentPageCurrentItemFrame.style.display = "block";
        //позиционирование рамки - возвращаем в исходное положение
        movePaymentItemFrame(true);
      }
    }
  }

  return {
    onBuyBtnClick,
    onPaymentItemClick,
    onSettingsNav,
  };
});
