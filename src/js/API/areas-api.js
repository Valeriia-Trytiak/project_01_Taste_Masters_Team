import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Запит за країнами
async function serviceChangeAllAreas() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/areas'
    );
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

//Запит за інгр
async function serviceChangeAllIngred() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

//відправка обох запитів
export async function fetchAllDataFilter() {
  try {
    const areasPromise = axios.get(
      'https://tasty-treats-backend.p.goit.global/api/areas'
    );
    const ingredientsPromise = axios.get(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );

    const [areasResponse, ingredientsResponse] = await axios.all([
      areasPromise,
      ingredientsPromise,
    ]);

    const areasData = areasResponse.data;
    const ingredientsData = ingredientsResponse.data;

    return { areasData, ingredientsData };
  } catch (error) {
    console.error(error);
    Notify.failure(error.message);
  }
}
