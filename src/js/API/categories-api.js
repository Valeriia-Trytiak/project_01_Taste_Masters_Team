import axios from 'axios';

import { serviceAllRecipes } from '/js/API/filter-api';

async function fetchRecipesByCategory(category, perPage, currentPage = '1') {
    const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: perPage,
        category, // Include the category parameter in the request
      });
  
      const response = await axios.get(`${BASE_URL}?${params}`);
      if (response.status !== 200) {
        // Handle API error responses (e.g., server-side issues)
        throw new Error('Unable to load recipes from the API.');
      }
  
      return response.data.results; // Assuming the API response contains a "results" property with an array of recipes
    } catch (error) {
      throw new Error(`Error fetching recipes: ${error.message}`);
    }
  }
  
export { fetchRecipesByCategory };