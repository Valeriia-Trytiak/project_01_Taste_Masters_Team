import axios from 'axios';

// Function to fetch the rating from the API
export async function fetchRating(recipeId) {
  try {
    // Replace 'your-api-url-here' with the actual API endpoint
    const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${Id}/rating`;
    const response = await axios.get(apiUrl);
    return response.data.rating;
  } catch (error) {
    throw error;
  }
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

