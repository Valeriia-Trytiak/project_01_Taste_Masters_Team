import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchRatingById, rateRecipeById } from '/js/API/rating-api';

export function openRatingModal() {
  const modalRating = document.querySelector('.modal-rating-js');
  modalRating.classList.remove('visually-hidden');
}

// async function getElementByIdAsync(id) {
//   return new Promise(resolve => {
//     const checkElement = () => {
//       const element = document.getElementById(id);
//       if (element) {
//         resolve(element);
//       } else {
//         requestAnimationFrame(checkElement);
//       }
//     };
//     checkElement();
//   });
// }
// Use an async function to initialize the rating modal
export async function initializeRating(cardId) {
  console.log(cardId);
  // giveRatingModalBtn = await getElementByIdAsync('#givRating');
  // // Event listener for card buttons
  // document.addEventListener('click', function (evt) {
  //   const cardBtn = evt.target.closest('.card-btn');
  //   if (cardBtn) {
  //     console.log('.card-btn clicked');
  //     // Check if the full recipe modal is open
  //     if (isFullRecipeModalOpen()) {
  //       console.log('Full recipe modal is open');
  //       // Check if the rating button is clicked
  //       if (evt.target.id === 'givRating') {
  //         console.log('givRating button clicked');
  //         // openRatingModal();
  //       }
  //     }
  //   }
  // });
  const stars = document.querySelectorAll('.rating-star-svg');
  let currentRating = document.querySelector('.rating-result');
  const userEmailInput = document.querySelector('.rating-form-input');
  const sendButton = document.querySelector('.rating-send');
  const closeButton = document.querySelector('.close-rating');
  const modalRating = document.querySelector('.modal-rating-js');
  let userRating = 0.0;
  let userEmail = '';
  // let cardId = null;

  // Function to check if the full recipe modal is open
  // function isFullRecipeModalOpen() {
  //   const fullRecipeModal = document.querySelector(
  //     '.modal-backdrop.is-open-modal'
  //   );
  //   return fullRecipeModal !== null;
  // }
  // Function to open the rating modal

  function closeModal() {
    modalRating.style.visibility = 'hidden'; // Change visibility to "hidden"
    modalRating.style.display = 'none';
    modalRating.classList.add('visually-hidden');
  }

  closeButton.addEventListener('click', closeModal);
  window.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      modalRating.classList.contains('rating-is-open')
    ) {
      closeModal();
    }
  });

  function isValidEmail(email) {
    const emailPattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    return emailPattern.test(email);
  }

  function updateStarColors(selectedStarIndex) {
    stars.forEach((star, index) => {
      if (index <= selectedStarIndex) {
        star.style.fill = 'rgb(238, 161, 12)';
      } else {
        star.style.fill = 'rgb(217, 217, 217)';
      }
    });
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', function () {
      userRating = index + 1;
      // const formattedUserRating = formatRating(userRating);
      currentRating.textContent = userRating.toFixed(1);
      updateStarColors(index);
      if (isValidEmail(userEmail)) {
        sendButton.removeAttribute('disabled');
      }
    });
    // function formatRating(userRating) {
    //   // Округляем рейтинг до одной десятой
    //   const roundedRating = userRating.toFixed(1);
    //   return roundedRating;
    // }
  });
  userEmailInput.addEventListener('input', function () {
    userEmail = this.value;
    if (userRating > 0 && isValidEmail(userEmail)) {
      sendButton.removeAttribute('disabled');
    } else {
      sendButton.setAttribute('disabled', true);
    }
  });
  // fetchRatingById(cardId)
  //   .then(id => {
  //     recipeId = id;
  //   })
  //   .catch(error => {
  //     Notify.failure('Oops! Something went wrong. Please try again later.');
  //   });

  sendButton.addEventListener('click', function (event) {
    event.preventDefault();
    const currentRating = userRating;
    if (isValidEmail(userEmail) && cardId !== null) {
      rateRecipeById(cardId, currentRating, userEmail)
        .then(() => {
          Notify.success('Rating submitted successfully!');
          userEmailInput.value = '';
          userRating = 0.0;
          // currentRating = userRating.toFixed(1);
          updateStarColors(-1);
          sendButton.setAttribute('disabled', true);
          closeModal();
        })
        .catch(error => {
          console.log(error);
          // Notify.failure('Error submitting rating. Please try again later.');
        });
    }
  });
  // userEmailInput.addEventListener('keydown', function (event) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     if (isValidEmail(userEmail) && recipeId !== null) {
  //       rateRecipeById(favoriteId, userRating, userEmail)
  //         .then(() => {
  //           Notify.success('Rating submitted successfully!');
  //           userEmailInput.value = '';
  //           userRating = 0.0;
  //           currentRating.textContent = userRating.toFixed(1);
  //           updateStarColors(-1);
  //           sendButton.setAttribute('disabled', true);
  //           closeModal();
  //         })
  //         .catch(error => {
  //           Notify.failure('Error submitting rating. Please try again later.');
  //         });
  //     } else {
  //       Notify.failure(
  //         'Please enter a valid email and ensure the recipe ID is available.'
  //       );
  //     }
  //   }
  // });
}
