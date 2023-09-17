
import axios from 'axios';

export async function submitForm(userName, phone, email, comment) {
    try {
        const {data} = await axios.post('https://tasty-treats-backend.p.goit.global/api/orders', JSON.stringify( {
            name: userName,
            phone: phone,
            email: email,
            comment: comment
          }), {
            headers: {
                'Content-Type': 'application/json'
            }
          }
        )
       console.log(data);
    } catch (error) {
      throw error;
    }
  }