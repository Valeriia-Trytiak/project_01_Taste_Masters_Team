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

export { serviceAllRecipes, serviceAllRecipesSearch };
