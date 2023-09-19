/*Підключення додаткових модулів*/
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

/* імпорт запросів*/
/// секція hero
import { loadHero } from '/js/actions/hero-swiper';
///
// import {} from './js/order-api';
// import {} from './js/events-api';
// import {} from '/js/API/order-api';
// import {} from './js/categories-api';
// import {} from './js/filter-api';
// import {} from './js/recipe-api';
// import {} from './js/areas-api';
// import {} from './js/ingredients-api';
// import {} from './js/popular-api';

import {} from './js/actions/rating-modal';

import { setupRating } from '/js/actions/rating-modal';
import { openMobileMenu } from '/js/actions/header';
import { closeMobileMenu } from '/js/actions/header';
import { windowLoad } from '/js/actions/header';

setupRating();
import {} from '/js/actions/modal-new-order';
import { cardsGenerate } from '/js/actions/cards';
import { initializePagination } from '/js/actions/pagination-home';
import {} from '/js/actions/popular';
import {} from '/js/actions/modal-new-order';
import {} from '/js/actions/search';

setupRating();
cardsGenerate();
loadHero();
initializePagination();

