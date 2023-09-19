import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import { debounce } from 'debounce';

import { serviceChangeAllAreas } from '/js/API/areas-api.js';
import { serviceChangeAllIngred } from '/js/API/ingredients-api.js';
import { serviceAllRecipesSearch } from '/js/API/filter-api.js';
import { createOption } from '/js/markup/markup-option-search.js';
import { createMarkupCard } from '/js/markup/markup-card.js';

// new SlimSelect({
//   select: '#selectElement',
// });

const refs = {
  inputSearch: document.querySelector('#search-input'),
  filterTime: document.querySelector('[name="time"]'),
  filterArea: document.querySelector('[name= "area"]'),
  filterIngred: document.querySelector('[name="ingredients"]'),
  searchForm: document.querySelector('.search-form-js'),
};
console.dir(refs.searchForm);
//контейнер для зберігання карток з секції
const gridBox = document.querySelector('.js-card-list');
//список зірок рейтингу
const ratingList = document.querySelectorAll('.js-rating-stars-list');

refs.inputSearch.addEventListener('input', debounce(onChangeInputSearch, 300));
refs.searchForm.addEventListener('change', onChangeSelectFilter);

//забираю значення з інпуту та роблю запит з подальшою відмальовкою
function onChangeInputSearch(evt) {
  const valueSearch = evt.target.value.trim();
  serviceAllRecipesSearch(valueSearch)
    .then(data => {
      console.log(data.totalPages);
      if (data.totalPages === null) {
        Notify.failure(
          'Sorry, there are no recipes matching your search query. Please try again.'
        );
      }
      createMarkupCard(data.results);

      // ratingList.forEach(elem => {
      //   const ratingNum = Math.round(elem.previousElementSibling.textContent);

      //   for (let i = 0; i < ratingNum; i++) {
      //     elem.children[i].style.fill = 'rgb(238, 161, 12)';
      //   }
      // });
      gridBox.innerHTML = createMarkupCard(data.results);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

function onChangeSelectFilter(evt) {
  console.log(evt.target.value);
}

// Створення селекту часу
function changeSelectTime() {
  for (let i = 5; i <= 120; i += 5) {
    let optionText = i + ' min';
    let option = new Option(optionText, i.toString(), false, true);
    refs.filterTime.appendChild(option);
  }
}
changeSelectTime();
changeSelectAreas();
changeSelectIngred();

// Створення селектору країни
function changeSelectAreas() {
  serviceChangeAllAreas()
    .then(data => {
      createOption(data);
      refs.filterArea.innerHTML = createOption(data);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

// Створення селектору інгридієнту
function changeSelectIngred() {
  serviceChangeAllIngred()
    .then(data => {
      createOption(data);
      refs.filterIngred.innerHTML = createOption(data);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

// Функция для отправки запроса на бекенд
async function sendRequest(searchParams) {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/recipes',
      {
        params: searchParams,
      }
    );
    // Обработка полученных данных
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
// // Функция для обработки изменения значения в поле поиска
// function handleSearchInputChange(event) {
//   const searchInput = event.target;
//   const searchValue = searchInput.value.trim();

//   // Выполняем запрос, если длина введенного текста больше или равна 3 символам
//   if (searchValue.length >= 3) {
//     // Создаем объект параметров запроса
//     const searchParams = {
//       search: searchValue,
//       // Другие параметры запроса, например: category, age, limit, time, area, ingredient
//     };

//     // Отправляем запрос на бекенд с использованием debounce для задержки
//     sendRequest(searchParams);
//   }
// }
