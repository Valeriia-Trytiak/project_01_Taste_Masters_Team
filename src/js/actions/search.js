import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import debounce from 'lodash/debounce';

// new SlimSelect({
//   select: '#selectElement',
// });

axios.defaults.baseURL =
  'https://tasty-treats-backend.p.goit.global/api/recipes';

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

export { serviceSerchFilter };

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
