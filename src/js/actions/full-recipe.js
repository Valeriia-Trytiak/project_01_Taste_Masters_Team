import { fetchRecipeByID } from '/js/API/recipe-id-api';
import { createMarkupModal } from '/js/markup/markup-full-recipe.js';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  allCards: document.querySelector('.js-card-list'),
  modalCardCont: document.querySelector('.modal-card-markup'),
  modalBackdrop: document.querySelector('.modal-backdrop'),
  modalButtonClose: document.querySelector('.modal-btn-close'),
  giveRatingModalBtn: document.querySelector('.modal-give-rating'),
  inputStar: document.querySelectorAll('.rating-star'),
};

refs.allCards.addEventListener('click', handlerGetIdCard);

//функція відкриття модального вікна та забору id рецепту
// function handlerGetIdCard(evt) {
//   const card = evt.target.closest('.card');
//   if (card) {
//     const cardId = card.dataset.id;
//     Loading.standard('Loading...', { svgColor: '#9bb537' });

//     fetchRecipeByID(cardId)
//       .then(data => {
//         const modalMarkup = createMarkupModal(data);
//         refs.modalCardCont.innerHTML = modalMarkup;
//         fillStars();
//         const addToFavorite = document.querySelector('.modal-add-favorite');
//         Loading.remove();

//         if (addToFavorite) {
//           openModal();
//           addToFavorite.addEventListener('click', addToLocalStorage);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching or rendering data:', error);
//         Notify.failure(error.message);
//       });
//   }
// }
function handlerGetIdCard(evt) {
  const cardBtn = evt.target.closest('.card-btn');
  if (cardBtn) {
    const card = cardBtn.closest('.card');
    const cardId = card.dataset.id;
    Loading.standard('Loading...', { svgColor: '#9bb537' });

    fetchRecipeByID(cardId)
      .then(data => {
        const modalMarkup = createMarkupModal(data);
        refs.modalCardCont.innerHTML = modalMarkup;
        fillStars();
        const addToFavorite = document.querySelector('.modal-add-favorite');
        Loading.remove();

        if (addToFavorite) {
          openModal();
          addToFavorite.addEventListener('click', addToLocalStorage);
        }
      })
      .catch(error => {
        console.error('Error fetching or rendering data:', error);
        Notify.failure(error.message);
      });
  }
}

//зірки заливка
function fillStars() {
  const starRatings = document.querySelectorAll('.stars-block-js');
  console.log(starRatings);
  starRatings.forEach(starRating => {
    //Отримую рейтинг(текст контент) з елемента
    const rating = parseFloat(
      starRating.querySelector('.cards-raiting').textContent
    );

    //Округлюю до цілого числа
    const roundedRating = Math.round(rating);

    const stars = starRating.querySelectorAll('#stars-full-modal');

    // Циклом по кожній зірці замальовую
    stars.forEach((star, index) => {
      if (index < roundedRating) {
        star.classList.add('js-stars');
      }
    });
  });
}

//блок кнопок на відкриття та закриття модального вікна
function openModal() {
  refs.modalButtonClose.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', closeModalOnBackdrop);
  window.addEventListener('keydown', handleKeyDown);
  refs.modalBackdrop.classList.add('is-open-modal');
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
  refs.modalBackdrop.classList.remove('is-open-modal');
  document.body.style.overflow = 'auto';
  const youtubeIframe = document.querySelector('.iframe-video');
  youtubeIframe.src = '';
}

function closeModalOnBackdrop(event) {
  if (event && event.target === refs.modalBackdrop) {
    refs.modalButtonClose.removeEventListener('click', closeModal);
    refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
    window.removeEventListener('keydown', handleKeyDown);
    refs.modalBackdrop.classList.remove('is-open-modal');
    document.body.style.overflow = 'auto';
    const youtubeIframe = document.querySelector('.iframe-video');
    youtubeIframe.src = '';
  }
}

// запис та видалення з сховища
function addToLocalStorage(evt) {
  console.log('addToLocalStorage called');
  const addButton = evt.target;
  const cardId = addButton.getAttribute('id');

  const recipeData = createRecipeDataFromModal(cardId);

  // перевірка на вміст
  const savedData = getSavedDataFromLocalStorage();
  const existingRecipe = savedData.findIndex(data => data.id === cardId);

  if (existingRecipe !== -1) {
    savedData.splice(existingRecipe, 1);

    Notify.warning(`Recipe added to favorites`);
    addButton.textContent = 'Add to favorite';

    hideButtonInactive();
  } else {
    savedData.push(recipeData);

    showButtonActive();
    Notify.success(`Recipe removed from favorites`);
    addButton.textContent = 'Remove favorite';
    hideButtonInactive();
  }
  saveDataToLocalStorage(savedData);
}

function createRecipeDataFromModal(cardId) {
  const elements = {
    title: document.querySelector('.modal-recipe-name').textContent,
    description: document.querySelector('.modal-recipe-instructions')
      .textContent,
    preview: document.querySelector('.iframe-video').getAttribute('poster'),
    rating: document.querySelector('.modal-stars-rating').textContent,
    category: document.querySelector('.modal-category-js').textContent,
    cardId: document.querySelector('.modal-add-favorite').getAttribute('id'),
  };
  return {
    id: cardId,
    title: elements.title,
    description: elements.description,
    preview: elements.preview,
    rating: elements.rating,
    category: elements.category,
  };
}

function getSavedDataFromLocalStorage() {
  try {
    let savedData = localStorage.getItem('cardsArray');
    savedData = savedData ? JSON.parse(savedData) : [];
    return savedData;
  } catch (error) {
    Notify.error('Error parsing saved data from localStorage');
    return [];
  }
}
function saveDataToLocalStorage(data) {
  localStorage.setItem('cardsArray', JSON.stringify(data));
}

//серденько
function hideButtonInactive() {
  const button = document.querySelector('.js-btn-heart-inactive');
  if (button) {
    button.classList.add('visually-hidden');
  }
}

function showButtonActive() {
  const button = document.querySelector('.js-btn-heart-active');
  if (button) {
    button.classList.remove('visually-hidden');
  }
}
