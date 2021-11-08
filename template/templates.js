define(["./Components.js", "./constants.js"], function (Components, constants) {
  const { WIDGET_CODE } = constants;
  return {
    licenceIsExpiredTemplate: () => {
      return '<div class="licence-status" style="background-color: red">Лицензия истекла</div>';
    },
    getTestLicenceTemplate: () => {
      return '<div class="licence-status" style="background-color: green; cursor: pointer">Получить тестовую лицензию</button></div>';
    },
    buyingLicenceTemplate: (tariffs, currentTariffId) => {
      const formatDate = new Intl.DateTimeFormat("ru-RU").format;
      const currentTariff = tariffs.find(
        (tariff) => tariff.id == currentTariffId
      );
      const sortByPrice = (a, b) => a.price - b.price;
      const sortedTariffs = tariffs.sort(sortByPrice);
      const isMoreTariffs = sortedTariffs.length > 4;
      return `
				<div class="payment__tariffs">
					${sortedTariffs
            .map((tariff, index) => {
              return `
							<div id="payment__tariffs__item" data-index="${index}" class="payment__tariffs__item ${
                tariff.id == currentTariffId &&
                "payment__tariffs__item--current"
              }
								${isMoreTariffs && "--moreTariffs"}
							" data-id="${tariff.id}">
								<div class="payment__tariffs__item__title ${
                  isMoreTariffs && "--moreTariffs"
                }">${tariff.title}</div>
								<div class="payment__tariffs__item__description ${
                  isMoreTariffs && "--moreTariffs"
                }">${tariff.description}</div>
								<div class="payment__tariffs__item__price ${
                  isMoreTariffs && "--moreTariffs"
                }">${tariff.price}  &#x20bd;</div>
							</div>							
						`;
            })
            .join("")}
						
				</div>
				<div class="payment__info">
					<div class="payment__info__date">До ${formatDate(
            new Date(Date.now() + currentTariff.duration * 1000)
          )}</div>
					<div class="payment__info__price">${currentTariff.price} руб.</div>
					<div class="payment__buy-btn">Оплатить онлайн</div>
				</div>
				
			`;
    },
    buyingLicenceTemplateSettingPage: (
      tariffs,
      currentTariffId,
      isLicenceTest,
      licenceLimitation,
      isLicenceExpired,
      test
    ) => {
      const currentTariff = tariffs.find(
        (tariff) => tariff.id == currentTariffId
      );
      const sortByPrice = (a, b) => a.price - b.price;
      const sortedTariffs = tariffs.sort(sortByPrice);
      const isMoreTariffs = sortedTariffs.length > 4;
      let template = '<div class="welbex-settings__payment-page">';
      template += test
        ? `<p class="welbex-settings__payment__current-licence-duration">Виджет использует тестовый режим</p>`
        : `<p class="welbex-settings__payment__current-licence-duration"> ${
            isLicenceExpired
              ? `Ваша лицензия истекла ${licenceLimitation}. Требуется продлить для дальнейшего использования`
              : isLicenceTest
              ? `Ваша лицензия находится на тестовом периоде до ${licenceLimitation}`
              : `Ваша лицензия оплачена до ${licenceLimitation}`
          }</p>`;
      template += `<p class="welbex-settings__payment__choose-licence-duration">Выберите длительность лицензии</p> 
					<div class="select-payment-option-wrapper">
					<div class="welbex-settings__payment-page__payment__tariffs ${
            isMoreTariffs && "--moreTariffs"
          }">
					${sortedTariffs
            .map((tariff, index) => {
              return `
							<div data-index="${index}" class="welbex-settings__payment-page__payment__tariffs__item ${
                tariff.id == currentTariffId &&
                "payment__tariffs__item--current"
              }" data-id="${tariff.id}">
								<div class="welbex-settings__payment-page__payment__tariffs__item__title">${
                  tariff.title
                }</div>
								<div class="welbex-settings__payment-page__payment__tariffs__item__description">${
                  tariff.description
                }</div>
								<div class="welbex-settings__payment-page__payment__tariffs__item__price">${
                  tariff.price
                } &#x20bd;</div>
							</div>							
						`;
            })
            .join("")}
						
				</div>
				<div class="welbex-settings__payment-page__payment__info">
					<div class="welbex-settings__payment-page__payment__info__text">Сумма:</div>
					<div class="welbex-settings__payment-page__payment__info__price">${
            currentTariff.price
          } &#x20bd;</div>
					<div class="welbex-settings__payment-page__payment__tariffs__item__description">${
            currentTariff.description
          }</div>
					<div class="welbex-settings__payment-page__payment__buy-btn payment__buy-btn">Оплатить онлайн</div>
				</div>
				</div >
			</div>`;

      return template;
    },
    loaderTemplate: () => `
			<div class="gd-widget-body__loader-wrapper">
				<div id="amocrm-spinner" style="both:clear;">
					<span style="width: 20px;height: 20px;margin: 0 auto;display: block;position: static;" class="pipeline_leads__load_more__spinner spinner-icon spinner-icon-abs-center">
					</span>
				</div>
			</div>
				`,
    adSettingsTemplate: (subscriptionDate) => {
      // ! необходимо добавить название (код) виджета в файл constants.js
      return `
      <div class="${WIDGET_CODE}">
				${Components.AnimationNavUnderlining(true)}
				<div class="welbex_ad_settings">
					${Components.MainSettingsCaption("Виджет")}
					<div class="welbex_ad_settings__menu">
						${Components.MenuNavigationList(
              Components.MenuButtonMain("main"),
              Components.MenuButtonPayment(),
              Components.MenuButtonHelp("help"),
              Components.MenuButtonUsers("users")
            )}
						${Components.SubscriptionInfo(subscriptionDate)}
					</div>
					<div class="welbex_ad_settings__submenu welbex_ad_settings__submenu-wrapper">
						${Components.SubmenuNavigationList(
              Components.SubmenuButton("main", "Настройки"),
              Components.SubmenuButton("instruction", "Инструкция")
            )}
					</div>
					<div class="welbex_ad_settings__body"></div>
        </div>
        </div>
			`;
    },
  };
});
