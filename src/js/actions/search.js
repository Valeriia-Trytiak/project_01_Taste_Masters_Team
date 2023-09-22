import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'debounce';

import {
  addRating,
  removeCartInLocalStorage,
  heartIsActive,
  addCartInLocalStorage,
} from './cards.js';
import { fetchAllDataFilter } from '/js/API/areas-api.js';
import { serviceAllRecipes } from '/js/API/recipe-api.js';
import {
  serviceAllRecipesSearch,
  serviceAllFilter,
} from '/js/API/filter-api.js';
import { currentCategory } from './category.js';
import {
  createOptionArea,
  createOptionIngr,
} from '/js/markup/markup-option-search.js';
import { createMarkupCard } from '/js/markup/markup-card.js';

const refs = {
  inputSearch: document.querySelector('#search-input'),
  selectTime: document.querySelector('[name= "time"]'),
  selectArea: document.querySelector('[name= "area"]'),
  selectIngred: document.querySelector('[name="ingredients"]'),
  searchForm: document.querySelector('.search-form-js'),
  resetBtn: document.querySelector('.btn-reset-thumb'),
};

window.addEventListener('DOMContentLoaded', () => {
  changeSelectTime();
  changeAllSelectFilter();
});

// refs.inputSearch.addEventListener('input', debounce(onChangeInputSearch, 300));
refs.searchForm.addEventListener('change', debounce(onChangeSelectFilter, 300));
refs.resetBtn.addEventListener('click', onClickResetButton);

//забираю значення з інпуту та роблю запит з подальшою відмальовкою
// function onChangeInputSearch(evt) {
//   const gridBox = document.querySelector('.js-card-list');

//   const valueSearch = evt.target.value.trim();serviceAllRecipes
//   serviceAllRecipesSearch(valueSearch)
//     .then(data => {
//       if (data.totalPages === null) {
//         Notify.failure(
//           'Sorry, there are no recipes matching your search query. Please try again.'
//         );
//       }
//       createMarkupCard(data.results);
//       gridBox.innerHTML = createMarkupCard(data.results);

//       addRating();
//     })
//     .catch(error => {
//       Notify.failure(error.message);
//     });
// }

//Функція пошуку по усіх рецептах
function onChangeSelectFilter() {
  if (refs.inputSearch.value !== '') {
    refs.inputSearch.nextElementSibling.style.fill = 'var(--accent-cl)';
  } else {
    refs.inputSearch.nextElementSibling.style.fill =
      'var(--txt-cl-50-light-theme)';
  }
  const gridBox = document.querySelector('.js-card-list');
  const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];

  const formData = new FormData(refs.searchForm);
  const timeField = formData.get('time');
  const filterParams = {
    category: currentCategory || '',
    search: formData.get('search').trim() || '',
    time: timeField !== null ? timeField.toString() : '',
    area: formData.get('area') || '',
    ingredients: formData.get('ingredients') || '',
  };
  serviceAllFilter(filterParams)
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

// Очищення форми та відмальовка рецептів
function onClickResetButton() {
  refs.searchForm.reset();
  const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];
  const gridBox = document.querySelector('.js-card-list');
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

// Створення селекту часу
function changeSelectTime() {
  if (refs.selectTime) {
    for (let i = 5; i <= 120; i += 5) {
      const option = document.createElement('option');
      option.value = i.toString();
      option.textContent = `${i} min`;
      option.classList.add('filter-time');
      refs.selectTime.appendChild(option);
    }
  }
}

// Створення селектору країни та інгридієнту
function changeAllSelectFilter() {
  fetchAllDataFilter()
    .then(data => {
      createOptionArea(data.areasData);
      createOptionIngr(data.ingredientsData);
      refs.selectArea.insertAdjacentHTML(
        'beforeend',
        createOptionArea(data.areasData)
      );
      refs.selectIngred.insertAdjacentHTML(
        'beforeend',
        createOptionIngr(data.ingredientsData)
      );
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
