import axios from 'axios';

export async function fetchPopular() {
  try {
    const resp = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/recipes/popular'
    );

    return resp.data;
  } catch (error) {
    throw error;
  }
}
