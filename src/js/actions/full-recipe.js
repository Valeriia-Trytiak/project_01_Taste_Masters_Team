import axios from 'axios';
import { fetchRecipeByID } from '/js/API/recipe-id-api';
import { getRecipeIdFromApi } from '/js/API/recipe-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  allCards: document.querySelector('.js-card-list'), //що це? якщо список усіх карток, то там селектор js-card-list
  modalCardCont: document.querySelector('.modal-card-markup'), // контейнер для відмальовки модалки
  modalBackdrop: document.querySelector('.modal-backdrop'), //бекдроп модального вікна
  modalButtonClose: document.querySelector('.modal-btn-close'),
  giveRatingModalBtn: document.querySelector('.modal-give-rating'),
  addToFavorite: document.querySelector('.modal-add-favorite'),
  inputStar: document.querySelectorAll('.rating-star'), //зірки у модалці рейтингу
};
console.log(refs.allCards);
refs.allCards.addEventListener('click', handlerGetIdCard);
// refs.addToFavorite.addEventListener('click', addToLocalStorage);

//функція відкриття модального вікна та забору id рецепту
async function handlerGetIdCard(event) {
  if (event.target.classList.contains('card-btn')) {
    Loading.standard('Loading...', { svgColor: '#9bb537' });

    const buttonId = event.target.getAttribute('id');
    refs.addToFavorite.id = buttonId;
    const dataById = await fetchRecipeByID(buttonId);
    const modalMarkup = createMarkupModal(dataById);
    refs.modalCardCont.innerHTML = modalMarkup;
    fillStars();
    openModal();
    Loading.remove();
  }
}

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

// function createMarkupModal(data) {
//   const youtubeLink = data.youtube;

//   function getYoutubeVideoId(url) {
//     const videoIdMatch = url.match(/v=([^&]+)/);
//     return videoIdMatch ? videoIdMatch[1] : '';
//   }

//   const videoId = getYoutubeVideoId(youtubeLink);

//   const embedUrl = `https://www.youtube.com/embed/${videoId}`;

//   const roundedRating = parseFloat(data.rating).toFixed(1);

//   const tagsToRender = data.tags.slice(0, 2);

//   const tagsMarkup = tagsToRender
//     .map(
//       tag => `
//       <li class="modal-hashtag-item">#${tag}</li>
//     `
//     )
//     .join('');

//   const ingredientsMarkup = data.ingredients
//     .map(
//       ingredient => `
//     <li class="modal-ingredient">
//       ${ingredient.name}
//       <span class="modal-ing-measure">${ingredient.measure}</span>
//     </li>
//   `
//     )
//     .join('');

//   const modalCardMarkup = `
//         <iframe
//           src="${embedUrl}"
//           title="YouTube video player"
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowfullscreen
//           class="iframe-video"
//         ></iframe>
//         <h2 class="modal-recipe-name">${data.title}</h2>
//         <div class="modal-info">
//           <div class="modal-card-stars card_star-ratingg">
//             <p class="modal-stars-rating cards-raiting">${roundedRating}</p>
//             <div class="modal-stars rating-wrapper">
//               <svg class="card-stars-icon" data-raiting="one" id="all-stars">
//                 <path
//                   id="Star 1"
//                   d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
//                   sroke="black"
//                 ></path>
//               </svg>
//               <svg class="card-stars-icon" data-raiting="two" id="all-stars">
//                 <path
//                   id="Star 1"
//                   d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
//                   sroke="black"
//                 ></path>
//               </svg>
//               <svg class="card-stars-icon" data-raiting="three" id="all-stars">
//                 <path
//                   id="Star 1"
//                   d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
//                   sroke="black"
//                 ></path>
//               </svg>
//               <svg class="card-stars-icon" data-raiting="four" id="all-stars">
//                 <path
//                   id="Star 1"
//                   d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
//                   sroke="black"
//                 ></path>
//               </svg>
//               <svg class="card-stars-icon" data-raiting="five" id="all-stars">
//                 <path
//                   id="Star 1"
//                   d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
//                   sroke="black"
//                 ></path>
//               </svg>
//             </div>
//             <p class="modal-card-time">${data.time} min</p>
//           </div>
//           <ul class="modal-ingredients-list">${ingredientsMarkup}</ul>
//           <ul class="modal-hashtags">${tagsMarkup}</ul>
//           <p class="modal-recipe-instructions">${data.instructions}</p>
//         </div>
//   `;

//   return modalCardMarkup;
// }

function openModal() {
  console.log(message`открітие окна`);
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
