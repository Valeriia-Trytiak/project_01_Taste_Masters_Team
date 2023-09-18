import { serviceAllRecipes } from '/js/API/filter-api';
import { createMarkupCard } from '/js/markup/markup-card';
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

      const favoritesArr = JSON.parse(localStorage.getItem('cardsArray')) || [];

      [...grisBox.children].map(elem => {
        favoritesArr.map(({id}) => {
          if (id === elem.dataset.id) {
            elem.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
              'visually-hidden'
            );
            elem.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.classList.remove(
              'visually-hidden'
            );
          }
        })
      })

      addRating();
      addCartInLocalStorage();
    })
    .catch(err => Notify.failure(err.message));
}

function addRating() {
  const ratingList = document.querySelectorAll('.js-rating-stars-list');

  ratingList.forEach(elem => {
    const ratingNum = Math.round(elem.previousElementSibling.textContent);

    for (let i = 0; i < ratingNum; i++) {
      elem.children[i].style.fill = 'rgb(238, 161, 12)';
    }
  });
}

function addCartInLocalStorage() {
  const elements = {
    inactiveHearts: document.querySelectorAll('.js-btn-heart-inactive'),
    activeHearts: document.querySelectorAll('.js-btn-heart-active'),
  };

  elements.inactiveHearts.forEach(elem =>
    elem.addEventListener('click', handlerAddRecipe)
  );
  elements.activeHearts.forEach(elem =>
    elem.addEventListener('click', handlerRemoveRecipe)
  );

  function handlerAddRecipe(evt) {
    evt.currentTarget.classList.add('visually-hidden');
    evt.currentTarget.nextElementSibling.classList.remove('visually-hidden');
    
    const arrData = {
      id: evt.currentTarget.parentNode.parentNode.dataset.id,
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
    fav.push(arrData);
    localStorage.setItem('cardsArray', JSON.stringify(fav));
  }

  function handlerRemoveRecipe(evt) {
    evt.currentTarget.classList.add('visually-hidden');
    evt.currentTarget.previousElementSibling.classList.remove(
      'visually-hidden'
    );

    const cardId = evt.currentTarget.parentNode.parentNode.dataset.id;

    const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];
    fav.splice(fav.indexOf(fav.find(item => item.id === cardId)), 1);
    localStorage.setItem('cardsArray', JSON.stringify(fav));
  }
}