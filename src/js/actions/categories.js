import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'debounce';

import {
  addRating,
  removeCartInLocalStorage,
  heartIsActive,
  addCartInLocalStorage,
} from './cards.js';
import { serviceAllRecipes } from '/js/API/recipe-api';
import { createMarkupCard } from '/js/markup/markup-card';
import { fetchRecipesByCategory } from '/js/API/categories-api'; 

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.btn-dishes');
    const allCategoriesButton = document.querySelector('.all-categories-active');
    const gridBox = document.querySelector('.js-card-list');
    const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];
  
    // Function to load all recipes
    async function loadAllRecipes(perPage) { // Add 'perPage' as an argument
        try {
          const recipes = await serviceAllRecipes(perPage);// Fetch all recipes
          console.log('API Response:', recipes);
          updateGridWithRecipes(recipes);
        } catch (error) {
          console.error('Error fetching all recipes:', error);
          Notify.failure(error.message);
        }
      }

    // Function to update the grid with recipes
  function updateGridWithRecipes(recipes) {
    if (recipes.length > 0) {
      const markup = createMarkupCard(recipes);
      gridBox.innerHTML = markup;

      // Add rating, check for heart activation, and manage cart
      addRating();
      heartIsActive(gridBox, favoritesArr);
      addCartInLocalStorage();
      removeCartInLocalStorage();
    } else {
      // Handle case where no recipes were found
      console.log('No recipes found or invalid data.');
    }
  }
   // Add a click event listener to the "All Categories" button
   allCategoriesButton.addEventListener('click', () => {
    loadAllRecipes(9); // Specify 'perPage' value
  });

// Function to load recipes by category
async function loadRecipesByCategory(category) {
    try {
      const recipes = await fetchRecipesByCategory(category, 9); // Fetch recipes for the specified category
      updateGridWithRecipes(recipes);
    } catch (error) {
      console.error(`Error fetching recipes in category "${category}":`, error);
      Notify.failure(error.message);
    }
  }
  
  // Add click event listeners to each category button
  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.textContent.trim(); // Get the category text
      loadRecipesByCategory(category); // Load recipes for the selected category
    });
  });

  // Load all recipes on page load
  loadAllRecipes(9);
});
