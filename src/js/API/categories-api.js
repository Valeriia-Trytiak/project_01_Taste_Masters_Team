import axios from 'axios';

export async function fetchRecipeByCategory(categoryName) {
  try {
    const resp = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?category=${categoryName}`
    );
   return resp.data
  } catch (error) {
    throw error;
  }
}
