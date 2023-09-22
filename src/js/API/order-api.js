import axios from 'axios';

export async function addNewOrder(userName, phone, email, comment) {
  try {
    const { data } = await axios.post(
      'https://tasty-treats-backend.p.goit.global/api/orders/add',
      JSON.stringify({
        name: userName,
        phone: phone,
        email: email,
        comment: comment,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
