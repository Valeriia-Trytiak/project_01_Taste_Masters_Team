import { fetchRecipeByCategory } from '/js/API/categories-api';
import {
  addRating,
  removeCartInLocalStorage,
  heartIsActive,
  addCartInLocalStorage,
} from './cards.js';
import { createMarkupCard } from '/js/markup/markup-card.js';
import { serviceAllRecipes } from '/js/API/recipe-api.js';
// import { onChangeSelectFilter } from '/js/API/search.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const categoryList = document.querySelector('.categories-list');
const btnAllCategories = document.querySelector('.categories-btn');
const gridBox = document.querySelector('.js-card-list');
const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];
// export let currentCategory = '';

categoryList.addEventListener('click', getCategoryName);
btnAllCategories.addEventListener('click', getAllCategoryRecipes);

function getCategoryName(evt) {
  if (!evt.target.classList.contains('btn-dishes')) {
    return;
  }

  const currentCategory = evt.target.textContent;
  fetchRecipesByCategory(currentCategory);
  // onChangeSelectFilter(currentCategory);
}
function getAllCategoryRecipes() {
  fetchAllRecipes();
}

function fetchRecipesByCategory(category) {
  btnAllCategories.classList.remove('all-categories-active');
  fetchRecipeByCategory(category)
    .then(data => {
      if (data.totalPages === null) {
        Notify.failure(
          'Sorry, there are no recipes matching your search query. Please try again.'
        );
      }
      displayRecipes(data.results);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

function fetchAllRecipes() {
  serviceAllRecipes()
    .then(data => {
      displayRecipes(data.results);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

export function displayRecipes(recipes) {
  createMarkupCard(recipes);
  gridBox.innerHTML = createMarkupCard(recipes);

  addRating();
  heartIsActive(gridBox, favoritesArr);
  addCartInLocalStorage();
  removeCartInLocalStorage();
}
