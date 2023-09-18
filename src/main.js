/*Підключення додаткових модулів*/
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Swiper from 'swiper/bundle';
import { debounce } from 'debounce';
import 'swiper/css/bundle';

/* імпорт запросів*/
// import {} from './js/events-api';
// import {} from '/js/API/order-api';
// import {} from './js/categories-api';
// import {} from './js/filter-api';
// import {} from './js/recipe-api';
// import {} from './js/areas-api';
// import {} from './js/ingredients-api';
// import {} from './js/popular-api';

import { setupRating } from '/js/actions/rating-modal';
import { openMobileMenu } from '/js/actions/header';
import { closeMobileMenu } from '/js/actions/header';
import { cardsGenerate } from '/js/actions/cards';
import { initializePagination } from '/js/actions/pagination-home';
import {} from '/js/actions/popular';
import {} from '/js/actions/modal-new-order';
import {} from '/js/actions/search';

setupRating();
cardsGenerate();
initializePagination();