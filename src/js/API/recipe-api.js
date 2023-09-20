import axios from 'axios';
import { Notify } from 'notiflix';

export async function serviceAllRecipes() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}
