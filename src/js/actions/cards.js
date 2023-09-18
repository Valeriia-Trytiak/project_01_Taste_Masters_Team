import { serviceAllRecipes } from '../API/filter-api';
import { createMarkupCard } from '../markup/markup-card';
import { Notify } from 'notiflix';

export function cardsGenerate() {
  const grisBox = document.querySelector('.js-card-list');

  const elemToPage = getComputedStyle(grisBox).getPropertyValue(
    '--limiter-cards-on-page'
  );

  serviceAllRecipes(elemToPage)
    .then(res => {
      grisBox.insertAdjacentHTML(
        'beforeend',
        createMarkupCard(res.data.results)
      );

      const ratingList = document.querySelectorAll('.js-rating-stars-list');

      ratingList.forEach(elem => {
        const ratingNum = Math.round(elem.previousElementSibling.textContent);

        for (let i = 0; i < ratingNum; i++) {
          elem.children[i].style.fill = 'rgb(238, 161, 12)';
        }
      });
    })
    .catch(err => Notify.failure(err.message));
}
