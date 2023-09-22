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

    const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];

    addRating();
    heartIsActive(gridBox, favoritesArr);
    addCartInLocalStorage();
    removeCartInLocalStorage();

    // Update the rating stars based on data
    const ratingList = document.querySelectorAll('.js-rating-stars-list');

    ratingList.forEach(elem => {
      const ratingNum = Math.round(elem.previousElementSibling.textContent);

      for (let i = 0; i < ratingNum; i++) {
        elem.children[i].style.fill = 'rgb(238, 161, 12)';
      }
    });
  } catch (error) {
    // Handle Axios request error (e.g., network issue)
    Notify.failure(
      'Error: Unable to load recipes. Please check your network connection.'
    );
  }
}

export function addRating() {
  const ratingList = document.querySelectorAll('.js-rating-stars-list');

  ratingList.forEach(elem => {
    const ratingNum = Math.round(elem.previousElementSibling.textContent);

    for (let i = 0; i < ratingNum; i++) {
      elem.children[i].style.fill = 'rgb(238, 161, 12)';
    }
  });
}

export function addCartInLocalStorage() {
  const inactiveHearts = document.querySelectorAll('.js-btn-heart-inactive');

  inactiveHearts.forEach(elem =>
    elem.addEventListener('click', handlerAddRecipe)
  );

  function handlerAddRecipe(evt) {
    evt.currentTarget.classList.add('visually-hidden');
    evt.currentTarget.nextElementSibling.classList.remove('visually-hidden');

    const arrData = {
      _id: evt.currentTarget.parentNode.parentNode.dataset.id,
      title:
        evt.currentTarget.nextElementSibling.nextElementSibling.textContent,
      description:
        evt.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling.textContent.trim(),
      preview:
        evt.currentTarget.parentNode.parentNode.firstElementChild.getAttribute(
          'src'
        ),
      rating:
        evt.currentTarget.parentNode.lastElementChild.firstElementChild
          .firstElementChild.textContent,
      category: evt.currentTarget.parentNode.previousElementSibling.textContent,
    };

    const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];

    if (fav.find(item => item._id === arrData._id)) {
      return Notify.success('The recipe is already in your favorites');
    }

    fav.push(arrData);
    localStorage.setItem('cardsArray', JSON.stringify(fav));
  }
}

export function removeCartInLocalStorage() {
  const activeHearts = document.querySelectorAll('.js-btn-heart-active');

  activeHearts.forEach(elem =>
    elem.addEventListener('click', handlerRemoveRecipe)
  );

  function handlerRemoveRecipe(evt) {
    evt.currentTarget.classList.add('visually-hidden');
    evt.currentTarget.previousElementSibling.classList.remove(
      'visually-hidden'
    );

    const cardId = evt.currentTarget.parentNode.parentNode.dataset.id;
    const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];

    if (!fav.find(item => item._id === cardId)) {
      return Notify.warning(
        'The recipe has already been removed from favorites'
      );
    }

    fav.splice(fav.indexOf(fav.find(item => item.id === cardId)), 1);
    localStorage.setItem('cardsArray', JSON.stringify(fav));
  }
}

export function heartIsActive(listBox, localArr) {
  [...listBox.children].map(elem => {
    localArr.map(({ _id }) => {
      if (_id === elem.dataset.id) {
        elem.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
          'visually-hidden'
        );
        elem.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.classList.remove(
          'visually-hidden'
        );
      }
    });
  });
}

export function limit() {
  const gridBox = document.querySelector('.js-card-list');
  const elemToPage = getComputedStyle(gridBox).getPropertyValue(
    '--limiter-cards-on-page'
  );
  return elemToPage;
}
