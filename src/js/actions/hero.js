import 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js';

const heroSwiper = new Swiper('.js-hero-slider', {
  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: '.hero-swiper-pagination',
    clickable: true,
  },
});
