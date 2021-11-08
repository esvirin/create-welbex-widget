define([], function () {
  function MainSettingsCaption(mainSettingsCaptionText) {
    return `<div class="welbex_ad_settings__caption-wrapper"><h2 class="welbex_ad_settings__caption">${mainSettingsCaptionText}</h2></div>`;
  }

  function MenuButtonMain(navAttrName, ifPageHasSubmenu = true) {
    return `<button type="button" data-nav="${navAttrName}" data-withsubmenu="${ifPageHasSubmenu}" data-active="menu-main" class="welbex_ad_settings__menu-btn welbex_ad_settings__nav"><svg data-nav="${navAttrName}" class="welbex_ad_settings__menu-btn-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24996 5.03337H22.75C22.9592 5.03337 23.1333 5.20747 23.1333 5.41671V20.5834C23.1333 20.7926 22.9592 20.9667 22.75 20.9667H3.24996C3.04073 20.9667 2.86663 20.7926 2.86663 20.5834V5.41671C2.86663 5.20747 3.04073 5.03337 3.24996 5.03337Z" stroke-width="1.4"/><rect x="8" y="5" width="1" height="15"/><rect x="16" y="5" width="1" height="15"/></svg><span class="welbex_ad_settings__menu-btn-text">Основное</span></button>`;
  }

  function MenuButtonPayment(ifPageHasSubmenu = false) {
    return `<button type="button" class="welbex_ad_settings__menu-btn" data-nav="payment" data-withsubmenu="${ifPageHasSubmenu}" data-active="menu-payment"><svg data-nav="payment" class="welbex_ad_settings__menu-btn-icon icon-payment" width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.3993 6.34965H23.7133V2.5638C23.7133 1.15017 22.6039 4.94045e-05 21.2403 4.94045e-05H20.4114C20.8284 0.403091 21.245 6.28077e-05 20.4114 4.94045e-05C15.8689 2.90178e-05 21.6194 0.0301194 15.7032 0.00010641L20.4114 4.94045e-05C11.4876 0 13.4265 4.94045e-05 5.32371 0L3.96535 4.94045e-05H2.47293C1.10934 4.94045e-05 0 1.15017 0 2.5638V16.4363C0 17.8499 1.10934 19 2.47293 19H21.2404C22.6039 19 23.7134 17.8499 23.7134 16.4363V12.6504H24.3994C24.7311 12.6504 25 12.3716 25 12.0278V6.97231C24.9999 6.62841 24.731 6.34965 24.3993 6.34965ZM22.5121 16.4363C22.5121 17.1633 21.9416 17.7547 21.2404 17.7547H2.47293C1.77171 17.7547 1.20124 17.1633 1.20124 16.4363V2.5638C1.20124 1.83678 1.77171 1.24537 2.47293 1.24537H21.2404C21.9416 1.24537 22.5121 1.83678 22.5121 2.5638V6.34965H20.1669C18.4913 6.34965 17.128 7.7629 17.128 9.50006C17.128 11.2372 18.4913 12.6505 20.1669 12.6505H22.5121V16.4363ZM23.7987 11.4051H20.1669C19.1536 11.4051 18.3292 10.5504 18.3292 9.5C18.3292 8.44957 19.1536 7.5949 20.1669 7.5949H23.7987V11.4051Z" fill="#97ADCA"/></svg><span class="welbex_ad_settings__menu-btn-text">Оплата</span></button>`;
  }

  function MenuButtonHelp(navAttrName, ifPageHasSubmenu = false) {
    return `<button type="button" data-withsubmenu="${ifPageHasSubmenu}" data-active="menu-help" data-nav="${navAttrName}" class="welbex_ad_settings__menu-btn welbex_ad_settings__nav "><svg data-nav="${navAttrName}"  class="welbex_ad_settings__menu-btn-icon icon-help" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.50002 18.8001H6.21007L6.00505 19.0051L2.86669 22.1435V4.33341C2.86669 3.52835 3.52829 2.86675 4.33335 2.86675H21.6667C22.4718 2.86675 23.1334 3.52835 23.1334 4.33341V17.3334C23.1334 18.1385 22.4718 18.8001 21.6667 18.8001H6.50002Z" stroke-width="1.4"/>
    </svg><span class="welbex_ad_settings__menu-btn-text">Чат поддержки</span></button>`;
  }

  function MenuButtonUsers(navAttrName, ifPageHasSubmenu = false) {
    return `<button type="button" class="welbex_ad_settings__menu-btn welbex_ad_settings__nav " data-withsubmenu="${ifPageHasSubmenu}" data-active="menu-users" data-nav="${navAttrName}"><svg data-nav="${navAttrName}"  class="welbex_ad_settings__menu-btn-icon icon-users" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.64447 7.94447C8.64447 5.53788 10.5934 3.58892 13 3.58892C15.4066 3.58892 17.3556 5.53788 17.3556 7.94447C17.3556 10.3511 15.4066 12.3 13 12.3C10.5934 12.3 8.64447 10.3511 8.64447 7.94447ZM3.58892 19.3195C3.58892 18.7361 3.8756 18.1733 4.46899 17.6256C5.06713 17.0736 5.92906 16.5855 6.93931 16.1808C8.96095 15.3709 11.4002 14.9639 13 14.9639C14.5998 14.9639 17.0391 15.3709 19.0607 16.1808C20.071 16.5855 20.9329 17.0736 21.5311 17.6256C22.1245 18.1733 22.4111 18.7361 22.4111 19.3195V22.4111H3.58892V19.3195Z" stroke-width="1.4"/>
    </svg><span class="welbex_ad_settings__menu-btn-text">Пользователи</span></button>`;
  }

  function MenuNavigationList(...buttons) {
    return `<ul class="welbex_ad_settings__menu-list">${buttons
      .map(
        (button) => `<li class="welbex_ad_settings__menu-item">${button}</li>`
      )
      .join("")}</ul>`;
  }

  function SubscriptionInfo(subscriptionDate) {
    return `<div class="welbex_ad_settings__menu-subscription">
						<p class="welbex_ad_settings__menu-subscription-text">Действует подписка до ${subscriptionDate}</p>
					</div>`;
  }

  function SubmenuButton(navAttrName, text) {
    return `<button type="button" data-active="submenu-${navAttrName}" data-nav="${navAttrName}" class="welbex_ad_settings__submenu-btn  welbex_ad_settings__nav">
            <span data-nav="${navAttrName}" class="welbex_ad_settings__submenu-btn-text">${text}</span>
          </button>`;
  }

  function SubmenuNavigationList(...buttons) {
    return `<ul class="welbex_ad_settings__submenu-list">${buttons
      .map(
        (button) =>
          `<li class="welbex_ad_settings__submenu-item">${button}</li>`
      )
      .join("")}</ul>`;
  }

  function SettingsBlockWithCaption(title, content, additionalClass) {
    return `	<div class="welbex_ad_settings__settings-block-wrapper ${
      additionalClass ? additionalClass : ""
    }">
            <h3 class="welbex_ad_settings__body-title">${title}</h3>
            <div class="welbex_ad_settings__settings-box-wrapper">
              ${content}
            </div>
					</div>`;
  }

  function SettingsBlockWrapper(content, additionalClass) {
    return `	<div class="welbex_ad_settings__settings-block-wrapper ${
      additionalClass ? additionalClass : ""
    }">
            <div class="welbex_ad_settings__settings-box-wrapper ">
              ${content}
            </div>
					</div>`;
  }

  function DeleteButtonIcon(buttonClass) {
    return `<button type="button" class="${buttonClass}"><svg width="16" height="19" viewBox="0 0 20 24" fill="#F26E6E" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.72 5H0C0 4.46957 0.210714 3.96086 0.585786 3.58579C0.960859 3.21071 1.46957 3 2 3H18C18.5304 3 19.0391 3.21071 19.4142 3.58579C19.7893 3.96086 20 4.46957 20 5H17.72ZM6 1C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L13 0C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1V2H6V1ZM8 7L9 20H7L6 7H8ZM12 7H14L13 20H11L12 7ZM3.91 20.421L4.12 22H15.95L16.16 20.421L17.49 7H19.76L18 22C18 22.5304 17.7893 23.0391 17.4142 23.4142C17.0391 23.7893 16.5304 24 16 24H4C3.46957 24 2.96086 23.7893 2.58579 23.4142C2.21071 23.0391 2 22.5304 2 22L0.23 7H2.57L3.91 20.421Z" fill="#F26E6E"/>
    </svg></button>`;
  }

  function SelectIconDown(classForPositioning) {
    return `<svg class="${classForPositioning}" width="14" height="14" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8L0.669872 0.5L9.33013 0.5L5 8Z" fill="#97ADCA"/></svg>`;
  }

  function DpPipelineSpinner() {
    return `<div id="amocrm-spinner" class="dp__synch_deals_settings--spinner" style="position: absolute; top: 0; left: 0; width: 100%; max-width: 418px; height: 100%; background-color: #ffffff; box-shadow: 0px -10px 21px rgb(133 146 170 / 6%), 0px -2px 7px rgb(133 146 170 / 6%), 0px -1px 2px rgb(133 146 170 / 6%), 0px 10px 21px rgb(133 146 170 / 6%), 0px 2px 7px rgb(133 146 170 / 6%), 0px 0px 2px rgb(133 146 170 / 6%); display: flex; justify-content: center; align-items: center;"><span style="width: 20px;height: 20px;margin: 0 auto;display: block;position: static;" class="pipeline_leads__load_more__spinner spinner-icon spinner-icon-abs-center"></span></div>`;
  }

  function PaymentPageContainer() {
    return `<div class="welbex_ad_settings__page-payment-wrapper">
							<div data-page="payment" class="welbex_ad_settings__page"></div>
							<div class="welbex__payment-tariffs__current-frame ad_settings"></div>
						</div>`;
  }

  function AnimationNavUnderlining(withSubmenu = true) {
    return `<div class="welbex_ad_settings__menu-nav--underline"></div>
    ${
      withSubmenu
        ? `<div class="welbex_ad_settings__submenu-nav--underline"></div>`
        : ""
    }`;
  }

  function LoaderComp(className = "", styles) {
    return `<div id="${className}" class="${className}" style="${styles}"><span style="margin: 0 auto;display: block;position: static;" class="pipeline_leads__load_more__spinner spinner-icon spinner-icon-abs-center"></span></div>`;
  }

  return {
    MenuButtonMain,
    MenuButtonPayment,
    MenuButtonHelp,
    MenuButtonUsers,
    MainSettingsCaption,
    MenuNavigationList,
    SubscriptionInfo,
    SubmenuButton,
    SubmenuNavigationList,
    SettingsBlockWithCaption,
    SettingsBlockWrapper,
    DeleteButtonIcon,
    SelectIconDown,
    DpPipelineSpinner,
    PaymentPageContainer,
    AnimationNavUnderlining,
    LoaderComp,
  };
});
