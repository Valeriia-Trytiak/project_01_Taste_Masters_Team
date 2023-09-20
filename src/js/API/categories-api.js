import axios from "axios";
import { Notify } from 'notiflix';

export async function fetchCategories() {
    try {
      const response = await axios.get(
        'https://tasty-treats-backend.p.goit.global/api/categories'
      );
      console.log('API Response:', response.data); // Log the response to inspect it
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }