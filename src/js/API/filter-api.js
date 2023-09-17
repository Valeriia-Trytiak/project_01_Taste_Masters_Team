import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

async function allRecipes(perPage, currentPage = '1') {
    const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
    const params = new URLSearchParams({
      page: currentPage,
      limit: perPage
    });
    
    return await axios.get(`${BASE_URL}?${params}`)
}

export { allRecipes };