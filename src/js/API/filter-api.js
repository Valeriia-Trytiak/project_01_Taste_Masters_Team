import axios from 'axios';
import { Notify } from 'notiflix';

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
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}
//запит пошуку по ключовому слову по всіх рецептах та фільтрах
async function serviceAllFilter(
  {
    search,
    // category,
    time: currentTimeFilter,
    area: currentAreaFilter,
    ingredients: currentIngrFilter,
    category: categoryName,
  },
  currentPage = '1'
) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const params = {
    page: currentPage,
  };

  if (categoryName !== null && categoryName !== undefined) {
    params.category = categoryName;
  }
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
