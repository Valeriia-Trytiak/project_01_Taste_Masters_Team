import axios from 'axios';

// Function to fetch the rating from the API
export async function fetchRating(recipeId) {
  try 
    const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${Id}/rating`;
    const response = await axios.get(apiUrl);
    return response.data.rating;
  } catch (error) {
    throw error;
  }

// Function to initialize the rating
export async function initializeRating(recipeId) {
  try {
    // Fetch the initial rating based on the recipeId
    const initialRating = await fetchRating(recipeId);

    // Initialize the rating here based on the fetched rating
    console.log(`Initialized rating to ${initialRating}`);
    
    // You can also update the UI or do other tasks with the rating data
  } catch (error) {
    console.error("Error initializing rating:", error);
  }
}

// Function to rate a recipe
export async function rateRecipe(recipeId, userRating, userEmail) {
  try {
    const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${Id}/rating`;
    const response = await axios.patch(apiUrl, { rating: userRating, email: userEmail });
    return response.data;
  } catch (error) {
    throw error;
  }
}