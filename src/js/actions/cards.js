import { serviceAllRecipes } from '/js/API/filter-api';
import { createMarkupCard } from '/js/markup/markup-card'; 
import { Notify } from 'notiflix';

export async function cardsGenerate(currentPage, perPage) {
  const gridBox = document.querySelector('.js-card-list');

  const response = await serviceAllRecipes(perPage, currentPage);

  gridBox.innerHTML = createMarkupCard(response.data.results);

  const ratingList = document.querySelectorAll('.js-rating-stars-list');

  ratingList.forEach((elem) => {
    const ratingNum = Math.round(elem.previousElementSibling.textContent);

    for (let i = 0; i < ratingNum; i++) {
      elem.children[i].style.fill = 'rgb(238, 161, 12)';
    }
  });
}
