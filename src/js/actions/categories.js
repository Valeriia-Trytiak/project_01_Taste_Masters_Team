import { Notify } from 'notiflix';
import { fetchCategories } from '/js/API/categories-api';
import { cardsGenerate } from '/js/actions/cards';
import { serviceAllRecipesCategory, serviceAllRecipes } from '/js/API/filter-api';

// Function to fetch recipes by category
async function fetchRecipesByCategory(category) {
    try {
      if (category.toLowerCase() === 'all categories') {
        // If 'All Categories' is selected, fetch all recipes without specifying a category
        const recipesData = await serviceAllRecipes(calculatePerPage(), '1');
        const recipes = recipesData.results;
        cardsGenerate('1', calculatePerPage(), recipes);
      } else {
        // Fetch recipes by the selected category
        const recipesData = await serviceAllRecipesCategory(category);
        const recipes = recipesData.results;
        const currentPage = '1';
        const perPage = calculatePerPage();
        cardsGenerate(currentPage, perPage, recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      // Notify an error
      Notify.failure('Error loading recipes by category');
    }
  }

// Function to calculate the number of recipes per page
function calculatePerPage() {
  const gridBox = document.querySelector('.js-card-list');
  const elemToPage = getComputedStyle(gridBox).getPropertyValue('--limiter-cards-on-page');
  return parseInt(elemToPage) || 6; // Default to 6 if custom property is not set
}

// Function to populate the categories section
export async function populateCategoriesSection() {
  const buttonContainer = document.querySelector('.button-container');

  try {
    // Fetch categories from the API
    const categories = await fetchCategories();

    if (!Array.isArray(categories) || categories.length === 0) {
      // Handle the case where categories are empty or not an array
      console.error('Categories data is invalid:', categories);
      Notify.failure('Error loading categories');
      return;
    }

     // Find the "All categories" button by class name
     const allCategoriesButton = document.querySelector('.all-categories-active');

// Add a click event listener to the "All categories" button
allCategoriesButton.addEventListener('click', () => {
    // Handle the click on "All categories"
    // Add the 'active' class to the button and remove it from other category buttons
    allCategoriesButton.classList.add('active');
    const categoryButtons = document.querySelectorAll('.btn-dishes');
    categoryButtons.forEach((button) => {
      if (button !== allCategoriesButton) {
        button.classList.remove('active');
      }
    });

     // Fetch and display recipes for 'All Categories'
     fetchRecipesByCategory('All Categories');
    });

    // Create buttons for each category
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.textContent = category.name; // Use 'name' property
      button.classList.add('btn-dishes');
       button.addEventListener('click', () => {
        // Handle the click on a specific category button
        // Add the 'active' class to the button and remove it from other category buttons
        button.classList.add('active');
        const categoryButtons = document.querySelectorAll('.btn-dishes');
        categoryButtons.forEach((btn) => {
          if (btn !== button) {
            btn.classList.remove('active');
          }
        });

        // Fetch and display recipes for the selected category
        fetchRecipesByCategory(category.name);
      });

      // Append the button to the button container
      buttonContainer.appendChild(button);
    });
  } catch (error) {
    console.error('Error fetching and populating categories:', error);
    // Notify an error
    Notify.failure('Error loading categories');
  }
}
