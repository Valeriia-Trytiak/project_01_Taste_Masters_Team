const openMobileMenuElement = document.querySelector('.burger-btn');
const closeMobileMenuElement = document.querySelector('.mob-menu-close-btn');
const mobileMenuElement = document.querySelector('.mobile-menu')

openMobileMenuElement.addEventListener('click', openMobileMenu)
closeMobileMenuElement.addEventListener('click', closeMobileMenu)

export function openMobileMenu () {
    mobileMenuElement.classList.add('is-open');
    mobileMenuElement.classList.remove('visually-hidden');
}

export function closeMobileMenu () {
    mobileMenuElement.classList.remove('is-open');
    mobileMenuElement.classList.add('visually-hidden');
}

