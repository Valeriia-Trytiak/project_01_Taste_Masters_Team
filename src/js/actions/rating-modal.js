import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { rateRecipeById } from '/js/API/rating-api';
import { fetchRecipeByID } from '/js/API/recipe-id-api';

let giveRatingModalBtn;

async function getElementByIdAsync(id) {
  return new Promise((resolve) => {
    const checkElement = () => {
      const element = document.getElementById(id);
      if (element) {
        resolve(element);
      } else {
        requestAnimationFrame(checkElement);
      }
    };
    checkElement();
  });
}

// Use an async function to initialize the rating modal
async function initializeRating() {
  giveRatingModalBtn = await getElementByIdAsync('give_rating');

  if (!giveRatingModalBtn) {
    // The element with ID 'give_rating' was not found in the DOM
    console.error('giveRatingModalBtn not found in the DOM');
  } else {
    // Add a click event listener to open the rating modal when the button is clicked
    giveRatingModalBtn.addEventListener('click', function () {
      // Check if the full recipe modal is open
      if (isFullRecipeModalOpen()) {
        openRatingModal(); // Open the rating modal
      }
    });
  }

  const stars = document.querySelectorAll('.rating-star-svg');
  const currentRating = document.querySelector('.rating-result');
  const userEmailInput = document.querySelector('.rating-form-input');
  const sendButton = document.querySelector('.rating-send');
  const closeButton = document.querySelector('.close-rating');
  const modalRating = document.querySelector('.modal-overlay');

  let userRating = 0.0;
  let userEmail = '';
  let recipeId = null;
  
  // Function to check if the full recipe modal is open
  function isFullRecipeModalOpen() {
    const fullRecipeModal = document.querySelector('.modal-backdrop.is-open-modal');
    return fullRecipeModal !== null;
  }

  // Function to open the rating modal
  function openRatingModal() {
    const modalRating = document.querySelector('.modal-overlay');
    modalRating.classList.add('rating-is-open');
  }

  function closeModal() {
    modalRating.style.visibility = 'hidden'; // Change visibility to "hidden"
    modalRating.style.display = 'none';
    modalRating.classList.remove('rating-is-open');
  }

  closeButton.addEventListener('click', closeModal);

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalRating.classList.contains('rating-is-open')) {
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

  fetchRecipeByID()
    .then(id => {
      recipeId = id;
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong. Please try again later.');
    });

  sendButton.addEventListener('click', function () {
    if (isValidEmail(userEmail) && recipeId !== null) {
      rateRecipeById(recipeId, userRating, userEmail)
        .then(() => {
          Notify.success('Rating submitted successfully!');
          userEmailInput.value = '';
          userRating = 0.0;
          currentRating.textContent = userRating.toFixed(1);
          updateStarColors(-1);
          sendButton.setAttribute('disabled', true);
          closeModal();
        })
        .catch(error => {
          Notify.failure('Error submitting rating. Please try again later.');
        });
    } else {
      Notify.failure('Please enter a valid email and ensure the recipe ID is available.');
    }
  });

  userEmailInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isValidEmail(userEmail) && recipeId !== null) {
        rateRecipeById(recipeId, userRating, userEmail)
          .then(() => {
            Notify.success('Rating submitted successfully!');
            userEmailInput.value = '';
            userRating = 0.0;
            currentRating.textContent = userRating.toFixed(1);
            updateStarColors(-1);
            sendButton.setAttribute('disabled', true);
            closeModal();
          })
          .catch(error => {
            Notify.failure('Error submitting rating. Please try again later.');
          });
      } else {
        Notify.failure('Please enter a valid email and ensure the recipe ID is available.');
      }
    }
  });
}
