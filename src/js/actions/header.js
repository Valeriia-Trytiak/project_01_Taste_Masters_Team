const openMobileMenuElement = document.querySelector('.burger-btn');
const closeMobileMenuElement = document.querySelector('.mob-menu-close-btn');
const mobileMenuElement = document.querySelector('.mobile-menu');
const menuLinkHomeElement = document.querySelector('.link-home');
const menuLinkFavElement = document.querySelector('.link-fav');
const mobMenuLinkHomeElement = document.querySelector('.mob-menu-link-home');
const mobMenuLinkFavElement = document.querySelector('.mob-menu-link-fav');

menuLinkFavElement.addEventListener('click', handlerMenuLink);
mobMenuLinkFavElement.addEventListener('click', handlerMobMenuLink);
openMobileMenuElement.addEventListener('click', openMobileMenu);
closeMobileMenuElement.addEventListener('click', closeMobileMenu);

export function openMobileMenu() {
  mobileMenuElement.classList.add('is-open');
  mobileMenuElement.classList.remove('is-hidden');
}

export function closeMobileMenu() {
  mobileMenuElement.classList.remove('is-open');
  mobileMenuElement.classList.add('is-hidden');
}

export function handlerMenuLink() {
  menuLinkFavElement.classList.toggle('current');
  menuLinkHomeElement.classList.toggle('current');
}

export function handlerMobMenuLink() {
  mobMenuLinkFavElement.classList.toggle('active-mob-nav');
  mobMenuLinkHomeElement.classList.toggle('active-mob-nav');
}

handlerMenuLink();
handlerMobMenuLink();

//  =========== change the theme ===========

window.addEventListener('load', windowLoad);

export function windowLoad() {
  const htmlBlock = document.documentElement;

  const saveUserTheme = localStorage.getItem('user-theme');
  const userTheme = 'light';

  const themeButton = document.querySelector('.switch__input');
  const mobileThemeButton = document.querySelector('.switch__input__mob');
  if (themeButton) {
    themeButton.addEventListener('click', function (e) {
      changeTheme(true);
    });
  }
  if (mobileThemeButton) {
    mobileThemeButton.addEventListener('click', function (e) {
      changeTheme(true);
    });
  }

  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
    } else {
      htmlBlock.classList.add(userTheme);
    }
  }

  setThemeClass();

  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains('dark') ? 'dark' : 'light';
    let newTheme;

    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'light';
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
  }
}
