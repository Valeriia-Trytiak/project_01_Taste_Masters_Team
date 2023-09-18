// import axios from 'axios';

// class TastyTreatsAPI {
//   #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

//   async fetchTreats(apiPath, {
//     page = 1,
//     limit = 6,
//     category = null,
//     time = null,
//     area = null,
//     ingredient = null,
//     title = null,
//   } = {}) {
//     try {
//       const response = await axios.get(`${this.#BASE_URL}${apiPath}`, {
//         params: {
//           page,
//           limit,
//           category,
//           time,
//           area,
//           ingredient,
//           title,
//         },
//       });

//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error('Request failed with status ' + response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       return [];
//     }
//   }
// }

// const tastyTreatsApi = new TastyTreatsAPI();

// export async function getRecipeIdFromApi(apiPath, options = {}) {
//   try {
//     const { data } = await tastyTreatsApi.fetchTreats(apiPath, options);
//     return data;
//   } catch (error) {
//     Notiflix.Notify.failure(error.message);
//     return [];
//   }
// }
import axios from 'axios';

async function getRecipeIdFromApi(
    perPage,
    currentPage = '1',
    category = null,
    time = null,
    area = null,
    ingredient = null,
    title = null) {
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

export { getRecipeIdFromApi };

