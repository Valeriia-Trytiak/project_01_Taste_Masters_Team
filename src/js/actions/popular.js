import { fetchPopular } from '/js/API/popular-api';
import { createPopularMarkup } from '/js/markup/markup-popular-recipe';
import {
  openModal,
  fillStars,
  addToLocalStorage,
} from '/js/actions/full-recipe';
import { fetchRecipeByID } from '/js/API/recipe-id-api';
import { createMarkupModal } from '/js/markup/markup-full-recipe.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const popularList = document.querySelector('.popular-recipes-list');
const modalCardCont = document.querySelector('.modal-card-markup');

function createPopularList() {
  fetchPopular()
    .then(data => {
      popularList.innerHTML = createPopularMarkup(data);
    })
    .catch(error => {
      console.log(error.message);
    });
}

createPopularList();

popularList.addEventListener('click', handlerGetIdCard);

function handlerGetIdCard(evt) {
  const card = evt.target.closest('.popular-recipe-item');
  const cardId = card.dataset.id;

  Loading.standard('Loading...', { svgColor: '#9bb537' });
  fetchRecipeByID(cardId)
    .then(data => {
      const modalMarkup = createMarkupModal(data);
      modalCardCont.innerHTML = modalMarkup;
      fillStars();
      const addToFavorite = document.querySelector('.modal-add-favorite');
      Loading.remove();

      if (addToFavorite) {
        openModal();
        addToFavorite.addEventListener('click', addToLocalStorage);
      }
    })
    .catch(error => {
      console.error('Error fetching or rendering data:', error);
      Notify.failure(error.message);
    });
}
