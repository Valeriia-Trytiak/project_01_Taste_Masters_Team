import axios from 'axios';

//Запит за країнами
export async function serviceChangeAllAreas() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/areas'
    );
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

// async function serviceSerch(searchValue) {
//   const params = new URLSearchParams({
//     category: `${currentCategori}`,
//   });
//   try {
//     const response = await axios.get(`?${params}`);
//     if (response.data.total === 0) {
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     return response.data;
//   } catch (error) {
//     throw error;
//     Notify.failure(error.message);
//   }
// }
