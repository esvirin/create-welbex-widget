define([], function () {
  function underlineCurrentSettingPage () {
    //анимация - подчеркивание текущей страницы
    //главное меню
    const menuButton = document.querySelector('.welbex_ad_settings__menu-btn.--active')
    const underlineCurrentMenuPage = document.querySelector('.welbex_ad_settings__menu-nav--underline')
    const { x: menuButtonXPosition, bottom: menuButtonBottomPos, width: menuButtonWidth } = menuButton.getBoundingClientRect()
    const { width: leftMenuWidth } = document.getElementById('left_menu').getBoundingClientRect()
    const { x: sidebarX, width: sidebarWidth } = document.getElementById('sidebar').getBoundingClientRect()
    const sidebarWidthIfHidden = sidebarX > 0 ? sidebarWidth : 0
    underlineCurrentMenuPage.style.left = menuButtonXPosition - leftMenuWidth - sidebarWidthIfHidden + 'px'
    underlineCurrentMenuPage.style.width = menuButtonWidth + 'px'
    underlineCurrentMenuPage.style.top = menuButtonBottomPos + 'px'
    //подменю
    const subMenuButton = document.querySelector('.welbex_ad_settings__submenu-btn.--active')
    if (subMenuButton) {
      const underlineCurrentSubMenuPage = document.querySelector('.welbex_ad_settings__submenu-nav--underline')
      const { x: subMenuButtonXPosition, bottom: subMenuButtonBottomPos, width: subMenuButtonWidth } = subMenuButton.getBoundingClientRect()
      underlineCurrentSubMenuPage.style.left = subMenuButtonXPosition - leftMenuWidth - sidebarWidthIfHidden + 'px'
      underlineCurrentSubMenuPage.style.width = subMenuButtonWidth + 'px'
      underlineCurrentSubMenuPage.style.top = subMenuButtonBottomPos + 'px'
    }
  }

 function movePaymentItemFrame(settingsPage = false) {
    const paymentPageCurrentItemFrame = document.querySelector('.welbex__payment-tariffs__current-frame')
    const { x: currentItemXPosition } = document.querySelector('.payment__tariffs__item--current').getBoundingClientRect()
    const { width: leftMenuWidth } = document.getElementById('left_menu').getBoundingClientRect()
    const { x: sidebarX, width: sidebarWidth } = document.getElementById('sidebar').getBoundingClientRect()
    const sidebarWidthIfHidden = sidebarX > 0 ? sidebarWidth : 0
    const minusLeftMenu = settingsPage ? (50 + leftMenuWidth + sidebarWidthIfHidden) : 0
    let minusModalPos = 0
    if (!settingsPage) {
      const widgetSettings = document.querySelector('.widget-settings')
      const { x } = widgetSettings.getBoundingClientRect()
      minusModalPos = 285 + x 
    }
    paymentPageCurrentItemFrame.style.transform = `translate(${currentItemXPosition - minusLeftMenu - minusModalPos}px)`
  }

  function removeLoader() {
    if (document.querySelector('#welbex__main-loader')) {
      document.querySelector('#welbex__main-loader').remove()
    }
  }
  return {
    underlineCurrentSettingPage,
    movePaymentItemFrame,
    removeLoader
  }
})
