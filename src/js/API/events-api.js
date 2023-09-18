import axios from 'axios';

export async function getEvents() {
  const response = await axios.get(
    'https://tasty-treats-backend.p.goit.global/api/events'
  );

  return response.data;
}
