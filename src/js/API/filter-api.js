import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function serviceAllRecipes(perPage, currentPage = '1') {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const params = new URLSearchParams({
    page: currentPage,
    limit: perPage,
  });

  return await axios.get(`${BASE_URL}?${params}`);
}
//запит пошуку по ключовому слову по всіх рецептах
async function serviceAllRecipesSearch(valueSearch) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const params = new URLSearchParams({
    title: valueSearch,
  });
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log(response);
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}
//запит пошуку по ключовому слову по всіх рецептах та фільтрах
async function serviceAllFilter({
  // search,
  time: currentTimeFilter,
  area: currentAreaFilter,
  ingredients: currentIngrFilter,
}) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const params = {};

  // if (search !== null && search !== undefined) {
  //   params.title = search;
  // }

  if (currentAreaFilter !== null && currentAreaFilter !== undefined) {
    params.area = currentAreaFilter;
  }

  if (currentIngrFilter !== null && currentIngrFilter !== undefined) {
    params.ingredient = currentIngrFilter;
  }

  if (currentTimeFilter !== null && currentTimeFilter !== undefined) {
    params.time = currentTimeFilter;
  }
  console.log(params);
  try {
    const queryParams = new URLSearchParams(params);

    const response = await axios.get(`${BASE_URL}?${queryParams}`);
    console.log('Response data:', response.data);
  } catch (error) {
    Notify.failure(error.message);
  }
}

export { serviceAllRecipes, serviceAllRecipesSearch, serviceAllFilter };

//тестовий запит
// async function serviceAllFilter({ time: currentTimeFilter }) {
//   const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
//   const params = {};

//   if (currentTimeFilter !== null && currentTimeFilter !== undefined) {
//     params.time = currentTimeFilter;
//   }

//   try {
//     // Создайте параметры запроса из объекта params
//     const queryParams = new URLSearchParams(params);

//     const response = await axios.get(`${BASE_URL}?${queryParams}`);
//     console.log('Response data:', response.data);
//   } catch (error) {
//     Notify.failure(error.message);
//   }
// }
