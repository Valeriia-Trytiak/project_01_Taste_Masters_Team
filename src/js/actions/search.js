import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'debounce';

import { addRating } from './cards.js';
import { fetchAllDataFilter } from '/js/API/areas-api.js';
// import { serviceChangeAllIngred } from '/js/API/ingredients-api.js';
import {
  serviceAllRecipesSearch,
  serviceAllFilter,
} from '/js/API/filter-api.js';
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
};

window.addEventListener('DOMContentLoaded', () => {
  changeSelectTime();
  changeAllSelectFilter();
});

refs.inputSearch.addEventListener('input', debounce(onChangeInputSearch, 300));
refs.searchForm.addEventListener('change', debounce(onChangeSelectFilter, 350));

//забираю значення з інпуту та роблю запит з подальшою відмальовкою
function onChangeInputSearch(evt) {
  const gridBox = document.querySelector('.js-card-list');
  // const ratingList = document.querySelectorAll('.js-rating-stars-list');

  const valueSearch = evt.target.value.trim();
  serviceAllRecipesSearch(valueSearch)
    .then(data => {
      if (data.totalPages === null) {
        Notify.failure(
          'Sorry, there are no recipes matching your search query. Please try again.'
        );
      }
      createMarkupCard(data.results);
      gridBox.innerHTML = createMarkupCard(data.results);

      addRating();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

function onChangeSelectFilter() {
  const formData = new FormData(refs.searchForm);
  const filterParams = {
    // search: formData.get('search'),
    time: formData.get('time').toString(),
    area: formData.get('area'),
    ingredients: formData.get('ingredients'),
  };

  serviceAllFilter(filterParams)
    .then(data => {
      console.log(data.result);
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
      refs.selectArea.innerHTML = createOptionArea(data.areasData);
      refs.selectIngred.innerHTML = createOptionIngr(data.ingredientsData);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

// // Функция для отправки запроса на бекенд
// async function sendRequest(searchParams) {
//   try {
//     const response = await axios.get(
//       'https://tasty-treats-backend.p.goit.global/api/recipes',
//       {
//         params: searchParams,
//       }
//     );
//     // Обработка полученных данных
//     console.log('Response data:', response.data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// // // Функция для обработки изменения значения в поле поиска
// // function handleSearchInputChange(event) {
// //   const searchInput = event.target;
// //   const searchValue = searchInput.value.trim();

// //   // Выполняем запрос, если длина введенного текста больше или равна 3 символам
// //   if (searchValue.length >= 3) {
// //     // Создаем объект параметров запроса
// //     const searchParams = {
// //       search: searchValue,
// //       // Другие параметры запроса, например: category, age, limit, time, area, ingredient
// //     };

// //     // Отправляем запрос на бекенд с использованием debounce для задержки
// //     sendRequest(searchParams);
// //   }
// // }

// serviceAllFilter({
//   search: searchValue,
//   time: selectedTime,
//   area: selectedArea,
//   ingredients: selectedIngredients,
// }) - замість form Data
