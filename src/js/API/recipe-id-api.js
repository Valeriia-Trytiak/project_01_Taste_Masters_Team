import axios from 'axios';

export async function fetchRecipeByID(id) {
  try {
    const resp = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/recipes/{id}'
    );
    return resp.data;
  } catch (error) {
    console.error('Error:', error);
  }
}
