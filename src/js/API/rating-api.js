import axios from 'axios';
// Function to submit a rating for a specific recipe by its ID
export async function rateRecipeById(cardId, userRating, userEmail) {
  try {
    const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${cardId}/rating`;
    const response = await axios.patch(apiUrl, { rating: userRating, email: userEmail });
    return response.data;
  } catch (error) {
    throw error;
  }
}
