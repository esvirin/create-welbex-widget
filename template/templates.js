export default function () {
	return {
		licenceIsExpiredTemplate: () => {
			return '<div class="licence-status" style="background-color: red">Лицензия истекла</div>'
		},
		getTestLicenceTemplate: () => {
			return '<div class="licence-status" style="background-color: green; cursor: pointer">Получить тестовую лицензию</button></div>'
		},
		buyingLicenceTemplate: (tariffs, currentTariffId) => {
			const formatDate = new Intl.DateTimeFormat('ru-RU').format
			const currentTariff = tariffs.find(tariff => parseInt(tariff.id) === parseInt(currentTariffId))
			return `
				<div class="payment__tariffs">
					${tariffs
						.map((tariff, index) => {
							return `
							<div id="payment__tariffs__item" data-index="${index}" class="payment__tariffs__item ${
								parseInt(tariff.id) === parseInt(currentTariffId) && 'payment__tariffs__item--current'
							}" data-id="${tariff.id}">
								<div class="payment__tariffs__item__title">${tariff.title}</div>
								<div class="payment__tariffs__item__description">${tariff.description}</div>
								<div class="payment__tariffs__item__price">${tariff.price}  &#x20bd;</div>
							</div>							
						`
						})
				.join('')}
						
				</div>
				<div class="payment__info">
					<div class="payment__info__date">До ${formatDate(
						new Date(Date.now() + currentTariff.duration * 1000)
					)}</div>
					<div class="payment__info__price">${currentTariff.price} руб.</div>
					<div class="payment__buy-btn">Оплатить онлайн</div>
				</div>
				
			` 
		},
		loaderTemplate: () => `
			<div class="gd-widget-body__loader-wrapper">
				<div id="amocrm-spinner" style="both:clear;">
					<span style="width: 20px;height: 20px;margin: 0 auto;display: block;position: static;" class="pipeline_leads__load_more__spinner spinner-icon spinner-icon-abs-center">
					</span>
				</div>
			</div>
        `
	}
}
