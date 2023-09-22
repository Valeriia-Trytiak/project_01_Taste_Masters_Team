import axios from 'axios';

// Function to fetch the rating for a specific recipe by its ID
export async function fetchRatingById(recipeId) {
  try {
    const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}/rating`;
    const response = await axios.get(apiUrl);
    return response.data.rating;
  } catch (error) {
    throw error;
  }
}
// Function to submit a rating for a specific recipe by its ID
export async function rateRecipeById(cardId, currentRating, userEmail) {
  try {
    const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${cardId}/rating`;
    const response = await axios.patch(apiUrl, {
      rate: currentRating,
      email: userEmail,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
