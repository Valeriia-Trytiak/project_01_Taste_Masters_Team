import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function serviceAllRecipes(perPage = 6, currentPage = '1') {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  // Ensure that the perPage parameter is defined and has a valid value
  if (typeof perPage !== 'number' || isNaN(perPage) || perPage <= 0) {
    throw new Error('Invalid perPage parameter');
  }
  
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
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}
//запит пошуку по ключовому слову по всіх рецептах та фільтрах
async function serviceAllFilter(
  {
    search,
    time: currentTimeFilter,
    area: currentAreaFilter,
    ingredients: currentIngrFilter,
  },
  currentPage = '1'
) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const params = {
    page: currentPage,
  };

  if (search !== null && search !== undefined) {
    params.title = search;
  }

  if (currentAreaFilter !== null && currentAreaFilter !== undefined) {
    params.area = currentAreaFilter;
  }

  if (currentIngrFilter !== null && currentIngrFilter !== undefined) {
    params.ingredient = currentIngrFilter;
  }

  if (currentTimeFilter !== null && currentTimeFilter !== undefined) {
    params.time = currentTimeFilter;
  }
  try {
    const queryParams = new URLSearchParams(params);
    const response = await axios.get(`${BASE_URL}?${queryParams}`);
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

export { serviceAllRecipes, serviceAllRecipesSearch, serviceAllFilter };
