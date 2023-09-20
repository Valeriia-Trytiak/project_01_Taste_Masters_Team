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

// Function to fetch recipes by category
  async function serviceAllRecipesCategory(category) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const params = new URLSearchParams({
    category: category,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error; 
}
  }
  
//запит пошуку по ключовому слову по категоріях
// async function serviceRecipesSearch(searchParams) {
//   const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
//   const params = new URLSearchParams({
//     title:
//     category:
//     area:
//     ingredient:
//     time:
//   });
//   try {
//     const response = await axios.get(`${BASE_URL}?${params}`
//     );
//     console.log('Response data:', response.data);
//   }catch (error) {
//     Notify.failure(error.message);
//   }
// }
export { serviceAllRecipes, serviceAllRecipesSearch, serviceAllRecipesCategory};
