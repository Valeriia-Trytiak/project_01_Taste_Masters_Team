import { serviceAllRecipes } from '/js/API/filter-api';
import { createMarkupCard } from '/js/markup/markup-card';
import { Notify } from 'notiflix';

export async function cardsGenerate(currentPage, perPage) {
  try {
    const gridBox = document.querySelector('.js-card-list');

    // Fetch recipes from the API
    const apiResponse = await serviceAllRecipes(perPage, currentPage);

    if (apiResponse.status !== 200) {
      // Handle API error responses (e.g., server-side issues)
      Notify.failure('Error: Unable to load recipes. Please try again later.');
      return; // Exit the function if there's an error
    }

    // Extract recipe data from the API response
    const recipes = apiResponse.data.results;

    // Generate card markup and populate the grid
    gridBox.innerHTML = createMarkupCard(recipes);

    // Update the rating stars based on data
    const ratingList = document.querySelectorAll('.js-rating-stars-list');

    ratingList.forEach((elem) => {
      const ratingNum = Math.round(elem.previousElementSibling.textContent);

      for (let i = 0; i < ratingNum; i++) {
        elem.children[i].style.fill = 'rgb(238, 161, 12)';
      }
    });
  } catch (error) {
    // Handle Axios request error (e.g., network issue)
    Notify.failure('Error: Unable to load recipes. Please check your network connection.');
  }
}
