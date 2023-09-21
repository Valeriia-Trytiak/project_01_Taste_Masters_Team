import { fetchRecipeByCategory } from '/js/API/categories-api';
import {
  addRating,
  removeCartInLocalStorage,
  heartIsActive,
  addCartInLocalStorage,
} from './cards.js';
import { createMarkupCard } from '/js/markup/markup-card.js';
import { serviceAllRecipes } from '/js/API/recipe-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnAllCaterogies = document.querySelector('.btn-all-js');
const categoryList = document.querySelector('.categories-list');
const btnAllCategories = document.querySelector('.categories-btn');

const gridBox = document.querySelector('.js-card-list');
const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];

categoryList.addEventListener('click', getCategoryName);
btnAllCaterogies.addEventListener('click', getAllCateroryRecipe);

export function getCategoryName(evt) {
  if (!evt.target.classList.contains('btn-dishes')) {
    return;
  }

  btnAllCategories.classList.remove('all-categories-active');
  const category = evt.target.textContent;

  fetchRecipeByCategory(category)
    .then(data => {
      if (data.totalPages === null) {
        Notify.failure(
          'Sorry, there are no recipes matching your search query. Please try again.'
        );
      }
      createMarkupCard(data.results);
      gridBox.innerHTML = createMarkupCard(data.results);

      addRating();
      heartIsActive(gridBox, favoritesArr);
      addCartInLocalStorage();
      removeCartInLocalStorage();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

function getAllCateroryRecipe() {
  serviceAllRecipes()
    .then(data => {
      createMarkupCard(data.results);
      gridBox.innerHTML = createMarkupCard(data.results);

      addRating();
      heartIsActive(gridBox, favoritesArr);
      addCartInLocalStorage();
      removeCartInLocalStorage();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
