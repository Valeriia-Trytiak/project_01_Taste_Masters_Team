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
