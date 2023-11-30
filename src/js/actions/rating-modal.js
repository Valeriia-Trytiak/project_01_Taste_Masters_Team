import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { rateRecipeById } from '/js/API/rating-api';

export function openRatingModal() {
  const modalRating = document.querySelector('.modal-rating-js');
  modalRating.classList.remove('visually-hidden');
}

// Use an async function to initialize the rating modal
export async function initializeRating(cardId) {
  const stars = document.querySelectorAll('.rating-star-svg');
  let currentRating = document.querySelector('.rating-result');
  const userEmailInput = document.querySelector('.rating-form-input');
  const sendButton = document.querySelector('.rating-send');
  const closeButton = document.querySelector('.close-rating');
  const modalRating = document.querySelector('.modal-rating-js');
  let userRating = 0.0;
  let userEmail = '';

  function closeModal() {
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
  });

  userEmailInput.addEventListener('input', function () {
    userEmail = this.value;
    if (userRating > 0 && isValidEmail(userEmail)) {
      sendButton.removeAttribute('disabled');
    } else {
      sendButton.setAttribute('disabled', true);
    }
  });

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
          Notify.failure('Error submitting rating. Please try again later.');
        });
    }
  });
}
