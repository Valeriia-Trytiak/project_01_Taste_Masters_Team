import axios from 'axios';

export async function fetchRecipeByID(cardId) {
  try {
    const resp = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${cardId}`
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecipeIdFromApi(
  perPage,
  currentPage = '1',
  category = null,
  time = null,
  area = null,
  ingredient = null,
  title = null
) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  const params = new URLSearchParams({
    page: currentPage,
    limit: perPage,
    category,
    time,
    area,
    ingredient,
    title,
  });

  return await axios.get(`${BASE_URL}?${params}`);
}
