import { fetchRecipeByID } from '/js/API/recipe-id-api';
import { getRecipeIdFromApi } from '/js/API/recipe-id-api';
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
function handlerGetIdCard(evt) {
  const card = evt.target.closest('.card');
  if (card) {
    const cardId = card.dataset.id;
    Loading.standard('Loading...', { svgColor: '#9bb537' });

    fetchRecipeByID(cardId)
      .then(data => {
        const modalMarkup = createMarkupModal(data);
        refs.modalCardCont.innerHTML = modalMarkup;
        fillStars();
        openModal();
        const addToFavorite = document.querySelector('.modal-add-favorite');
        Loading.remove();

        if (addToFavorite) {
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

// function addToLocalStorage() {
//   const elements = {
//     inactiveHearts: document.querySelectorAll('.js-btn-heart-inactive'),
//     activeHearts: document.querySelectorAll('.js-btn-heart-active'),
//   };

//   elements.inactiveHearts.forEach(elem =>
//     elem.addEventListener('click', handlerToggleRecipe)
//   );
//   elements.activeHearts.forEach(elem =>
//     elem.addEventListener('click', handlerToggleRecipe)
//   );

//   function handlerToggleRecipe(evt) {
//     const card = evt.currentTarget.closest('.card');
//     const cardId = card.dataset.id;

//     const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];
//     const existingRecipeIndex = fav.findIndex(item => item.id === cardId);

//     if (existingRecipeIndex !== -1) {
//       // Рецепт уже існує в улюблених
//       fav.splice(existingRecipeIndex, 1);
//       localStorage.setItem('cardsArray', JSON.stringify(fav));

//       // Зміна тексту кнопки та класів
//       evt.currentTarget.textContent = 'Add to favorite';
//       evt.currentTarget.classList.add('js-btn-heart-inactive');
//       evt.currentTarget.classList.remove('js-btn-heart-active');

//       // Відправка повідомлення Notify
//       Notify.success('Recipe removed from favorites');
//     } else {
//       // Рецепту немає в улюблених
//       const arrData = {
//         id: cardId,
//         title: card.querySelector('.card-title').textContent,
//         description: card.querySelector('.card-description').textContent.trim(),
//         preview: card.querySelector('.card-image').getAttribute('src'),
//         rating: card.querySelector('.card-rating').textContent,
//         category: card.querySelector('.card-category').textContent,
//       };

//       fav.push(arrData);
//       localStorage.setItem('cardsArray', JSON.stringify(fav));

//       // Зміна тексту кнопки та класів
//       evt.currentTarget.textContent = 'Remove favorite';
//       evt.currentTarget.classList.remove('js-btn-heart-inactive');
//       evt.currentTarget.classList.add('js-btn-heart-active');

//       // Відправка повідомлення Notify
//       Notify.success('Recipe added to favorites');
//     }
//   }
// }

// function addToLocalStorage(evt) {
//   const addButton = evt.target;
//   const cardId = addButton.getAttribute('id');

//   const recipeData = createRecipeDataFromModal(cardId);

//   // перевірка на вміст
//   const savedData = getSavedDataFromLocalStorage();
//   const existingRecipeIndex = savedData.findIndex(data => data.id === cardId);

//   if (existingRecipeIndex !== -1) {
//     savedData.splice(existingRecipeIndex, 1);

//     Notify.warning(`Recipe removed from local storage: ${recipeData.title}`);
//     addButton.textContent = 'Add to favorite';

//     // Приховуємо кнопку з класом '.js-btn-heart-inactive'
//     hideButtonInactive();
//   } else {
//     savedData.push(recipeData);

//     // Показуємо кнопку з класом '.js-btn-heart-active'
//     showButtonActive();

//     Notify.success(`Recipe added to local storage: ${recipeData.title}`);
//     addButton.textContent = 'Remove favorite';

//     // Приховуємо кнопку з класом '.js-btn-heart-inactive'
//     hideButtonInactive();
//   }
//   saveDataToLocalStorage(savedData);
// }

// function createRecipeDataFromModal(cardId) {
//   const elements = {
//     title: document.querySelector('.modal-recipe-name').textContent,
//     description: document.querySelector('.modal-recipe-instructions')
//       .textContent,
//     preview: document.querySelector('.iframe-video').getAttribute('poster'),
//     rating: document.querySelector('.modal-stars-rating').textContent,
//     category: document.querySelector('.modal-category-js').textContent,
//   };
//   return {
//     id: cardId, // Зміни з cardId на id
//     title: elements.title,
//     description: elements.description,
//     preview: elements.preview,
//     rating: elements.rating,
//     category: elements.category,
//   };
// }

// // Ваша функція showButton та hideButton має бути додана тут
