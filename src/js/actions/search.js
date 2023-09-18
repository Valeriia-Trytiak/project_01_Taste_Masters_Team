import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import debounce from 'debounce';

// new SlimSelect({
//   select: '#selectElement',
// });

const refs = {
  inputSearch: document.querySelector('#search-input'),
  filterTime: document.querySelector('[name="time"]'),
  filterArea: document.querySelector('[name= "area"]'),
  filterInred: document.querySelector('[name="ingredients"]'),
};

// Створення селекту часу
function changeSelectTime() {
  for (let i = 5; i <= 120; i += 5) {
    let optionText = i + ' min';
    let option = new Option(optionText, i.toString());
    refs.filterTime.appendChild(option);
  }
}
changeSelectTime();
changeSelectAreas();
// Створення селектору країни
function changeSelectAreas() {
  serviceChangeAllAreas()
    .then(data => {
      data.map(function (area) {
        return area.name;
      });
    })
    .catch(error => {
      console.error(error);
    });
}

// axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api/areas';

async function serviceChangeAllAreas() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/areas'
    );
    console.log(response);
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

// async function fetchRecipesWithFilters() {
//   const params = new URLSearchParams({
//     area,
//     ingredient,
//   });
//   try {
//     const response = await axios.get(`?${params}`);
//     console.log(response);

//     const { data } = response;

//     if (data && data.result) {
//       const { time, area, ingredient } = data.result;

//       console.log('Time:', time);
//       console.log('Area:', area);
//       console.log('Ingredient:', ingredient);

//       // Возвращаем значения ключей
//       return { time, area, ingredient };
//     } else {
//       console.error('Response format is not as expected.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error; // Обработайте ошибку по вашему усмотрению
//   }
// }

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
