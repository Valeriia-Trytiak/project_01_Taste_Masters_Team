import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
