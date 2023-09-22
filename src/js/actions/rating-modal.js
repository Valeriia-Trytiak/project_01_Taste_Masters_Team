import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { rateRecipeById } from '/js/API/rating-api';

let userRating = 0.0;
let cardId;

export function openRatingModal(cardId) {
  const modalRating = document.querySelector('.modal-rating-js');
  modalRating.classList.remove('visually-hidden');

  console.log('Card ID:', cardId);
}
// Wrap your code inside an event listener function
document.addEventListener('click', function (evt) {
  const cardBtn = evt.target.closest('.card-btn');
  if (cardBtn) {
    const card = cardBtn.closest('.card');
    const cardId = card.dataset.id;

const stars = document.querySelectorAll('.rating-star-svg');
const currentRating = document.querySelector('.rating-result');
const userEmailInput = document.querySelector('.rating-form-input');
const sendRatingButton = document.querySelector('.rating-send');
const closeButton = document.querySelector('.close-rating');
const modalRating = document.querySelector('.modal-rating-js');
let userEmail = '';

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
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    currentRating.textContent = userRating.toFixed(1);
    updateStarColors(index);
  });
});

console.log(userEmailInput); 

function submitRating() {
  userEmail = event.target.value.trim(); // Use event.target to access the input element

  if (isValidEmail(userEmail) && cardId !== null) {
    const currentRating = userRating;
    console.log(cardId);
    console.log(typeof currentRating);
    rateRecipeById(cardId, userRating, userEmail)
      .then(() => {
        Notify.success('Rating submitted successfully!');
        userEmailInput.value = '';
        userRating = 0.0;
        currentRating.textContent = userRating.toFixed(1);
        updateStarColors(-1);
        closeModal();
      })
      .catch(error => {
        Notify.failure('Error submitting rating. Please try again later.');
      });
  } else {
    Notify.failure(
      'Please enter a valid email.'
    );
  }
}

userEmailInput.addEventListener('input', function (event) {

  if (event.key === 'Enter') {
    event.preventDefault();
    submitRating();
  }
});

sendRatingButton.addEventListener('click', function () {
  if (userRating === 0) {
    Notify.failure('Please, rate the recipe!');
  } else {
  submitRating();
  }
});
}
});
 