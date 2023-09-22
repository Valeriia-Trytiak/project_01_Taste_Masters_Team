/*Підключення додаткових модулів*/
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

/* імпорт запросів*/
/// секція hero
import { loadHero } from '/js/actions/hero-swiper';
///
import { windowLoad } from '/js/actions/header';
import {} from './js/actions/rating-modal';

import {} from '/js/actions/rating-modal';
import { openMobileMenu } from '/js/actions/header';
import { closeMobileMenu } from '/js/actions/header';
import { handlerMenuLink } from '/js/actions/header';
import { handlerMobMenuLink } from '/js/actions/header';
import {} from '/js/actions/modal-new-order';
import { cardsGenerate, limit } from '/js/actions/cards';
import { initializePagination } from '/js/actions/pagination-home';
import {} from '/js/actions/popular';
import {} from '/js/actions/modal-new-order';
import {} from '/js/actions/search';
import {} from '/js/actions/full-recipe.js';
import {} from '/js/actions/category.js';

handlerMenuLink();
handlerMobMenuLink();
cardsGenerate(1, limit());
loadHero();
initializePagination();
