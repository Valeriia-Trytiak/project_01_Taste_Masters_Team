import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import { debounce } from 'debounce';

import { serviceChangeAllAreas } from '/js/API/areas-api.js';
import { serviceChangeAllIngred } from '/js/API/ingredients-api.js';
import { createOption } from '/js/markup/markup-option-search.js';

// new SlimSelect({
//   select: '#selectElement',
// });

const refs = {
  inputSearch: document.querySelector('#search-input'),
  filterTime: document.querySelector('[name="time"]'),
  filterArea: document.querySelector('[name= "area"]'),
  filterIngred: document.querySelector('[name="ingredients"]'),
};

refs.inputSearch.addEventListener('input', onChangeInputSearch);

function onChangeInputSearch(evt) {
  const valueSearch = evt.currentTarget.value.trim();
  serviceSerch(valueSearch);
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

// fetchRecipesWithFilters();
// async function serviceSelectParams() {}

// async function serviceSerchFilter(currentCategori, searchValue) {
//   const params = new URLSearchParams({
//     category: `${currentCategori}`,
//   });
//   try {
//     const response = await axios.get(`?${params}`);
//     if (response.data.total === 0) {
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     return response.data;
//   } catch (error) {
//     throw error;
//     Notify.failure(error.message);
//   }
// }

// export { serviceSerchFilter };

// import axios from 'axios';
// import debounce from 'lodash/debounce';

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
// // Добавляем обработчик события ввода текста с debounce
// const searchInput = document.getElementById('search-input');
// searchInput.addEventListener('input', debounce(handleSearchInputChange, 300));
