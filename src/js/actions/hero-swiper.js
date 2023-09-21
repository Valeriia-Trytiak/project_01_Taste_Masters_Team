import { getEvents } from '..//../js/API/events-api';
import { markupHeroSlide } from '..//../js/actions/hero-event';

import Swiper from 'swiper/bundle';

const heroSwiperWrapper = document.querySelector('.js-hero-swiper-wrapper');

export async function loadHero() {
  try {
    const events = await getEvents();
    const markupSlide = markupHeroSlide(events);
    heroSwiperWrapper.insertAdjacentHTML('beforeend', markupSlide);

    const heroSwiper = new Swiper('.js-swiper-hero', {
      loop: true,
      autoplay: true,
      slidesPerView: 0.8,
      spaceBetween: 40,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  } catch (err) {
    Notify.failure('Oops! No upcoming events. Please try again later.');
  }
}
