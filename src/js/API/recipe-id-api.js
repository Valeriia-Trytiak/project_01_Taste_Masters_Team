import axios from 'axios';

export async function fetchRecipeByID(id) {
  try {
    const resp = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
    );
    console.log(response);
    return resp.data;
  } catch (error) {
    throw error;
  }
}
