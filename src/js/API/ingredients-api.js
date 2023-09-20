import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//Запит за інгр
export async function serviceChangeAllIngred() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}
