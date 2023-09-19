import axios from 'axios';
import { fetchRecipeByID } from '/js/API/recipe-id-api';
// import { serviceAllRecipes } from '/js/API/recipe-api';
import { createMarkupModal } from '/js/markup/markup-full-recipe.js';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  allCards: document.querySelector('.js-card-list'), //що це? якщо список усіх карток, то там селектор js-card-list
  allCardButtons: document.querySelectorAll('.card-btn'),
  modalCardCont: document.querySelector('.modal-card-markup'), // контейнер для відмальовки модалки
  modalBackdrop: document.querySelector('.modal-backdrop'), //бекдроп модального вікна
  modalButtonClose: document.querySelector('.modal-btn-close'),
  giveRatingModalBtn: document.querySelector('.modal-give-rating'),
  addToFavorite: document.querySelector('.modal-add-favorite'),
  inputStar: document.querySelectorAll('.rating-star'), //зірки у модалці рейтингу
};

// refs.allCardButtons.addEventListener('click', handleCardButtonClick);
refs.allCards.addEventListener('click', handlerGetIdCard);
// refs.addToFavorite.addEventListener('click', addToLocalStorage);

//функція відкриття модального вікна та забору id рецепту
function handlerGetIdCard(evt) {
  console.log(evt.target);
  const card = evt.target.closest('.card');
  Loading.standard('Loading...', { svgColor: '#9bb537' });
  const cardId = card.dataset.id;
  console.log('Clicked card with _id:', cardId);

  fetchRecipeByID(cardId)
    .then(data => {
      const modalMarkup = createMarkupModal(data);
      refs.modalCardCont.innerHTML = modalMarkup;
      // fillStars();
      openModal();
      Loading.remove();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

// Вызываем функцию для инициализации обработчиков клика

// export function handlerGetIdCard(event) {
//   if (event.target.classList.contains('card-btn')) {
//     console.dir(event.target);
// Loading.standard('Loading...', { svgColor: '#9bb537' });

// const buttonId = event.target.getAttribute('id');
// refs.addToFavorite.id = buttonId;
// const dataById = await fetchRecipeByID(buttonId);
// const modalMarkup = createMarkupModal(dataById);
// refs.modalCardCont.innerHTML = modalMarkup;
// fillStars();
// openModal();
// Loading.remove();
//   }
// }

// function fillStars() {
//   const starRatings = document.querySelectorAll('.card_star-rating');
//   starRatings.forEach(starRating => {
//     //Отримую рейтинг(текст контент) з елемента
//     const rating = parseFloat(
//       starRating.querySelector('.cards-raiting').textContent
//     );

//     //Округлюю до цілого числа
//     const roundedRating = Math.round(rating);

//     const stars = starRating.querySelectorAll('#all-stars');

//     // Циклом по кожній зірці замальовую
//     stars.forEach((star, index) => {
//       if (index < roundedRating) {
//         star.classList.add('js-stars');
//       }
//     });
//   });
// }

function openModal() {
  console.log('открітие окна');
  refs.modalButtonClose.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', closeModalOnBackdrop);
  window.addEventListener('keydown', handleKeyDown);
  refs.modalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  refs.modalButtonClose.removeEventListener('click', closeModal);
  refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
  window.removeEventListener('keydown', handleKeyDown);
  refs.modalBackdrop.classList.remove('is-open');
  document.body.style.overflow = 'auto';
  const youtubeIframe = document.querySelector('.iframe-video');
  youtubeIframe.src = '';
}

function closeModalOnBackdrop(event) {
  if (event && event.target === refs.modalBackdrop) {
    refs.modalButtonClose.removeEventListener('click', closeModal);
    refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
    window.removeEventListener('keydown', handleKeyDown);
    refs.modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = 'auto';
    const youtubeIframe = document.querySelector('.iframe-video');
    youtubeIframe.src = '';
  }
}

// async function addToLocalStorage() {
//   const addButtonId = addToFavorite.getAttribute('id');
//   const recipeData = getRecipeIdFromApi(`/recipes/${addButtonId}`);

//   const { category, description, preview, rating, title, _id } = recipeData;

//   const recipeObject = {
//     category,
//     description,
//     preview,
//     rating: rating.toFixed(1),
//     title,
//     _id,
//   };

//   let savedData = localStorage.getItem('localRecipes');
//   savedData = savedData ? JSON.parse(savedData) : [];

//   const existingRecipeIndex = savedData.findIndex(data => data._id === _id);

//   if (existingRecipeIndex !== -1) {
//     savedData.splice(existingRecipeIndex, 1);
//     Notify.warning(`Recipe removed from local storage: ${recipeObject.title}`);
//     addToFavorite.textContent = 'Add to favorite';
//   } else {
//     savedData.push(recipeObject);
//     Notify.success(`Recipe added to local storage: ${recipeObject.title}`);
//     addToFavorite.textContent = 'Remove favorite';
//   }
//   localStorage.setItem('localRecipes', JSON.stringify(savedData));
// }
