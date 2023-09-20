import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { rateRecipeById } from '/js/API/rating-api';
import { fetchRecipeByID } from '/js/API/recipe-id-api';

export function setupRating() {
  const stars = document.querySelectorAll('.rating-star-svg');
  const currentRating = document.querySelector('.rating-result');
  const userEmailInput = document.querySelector('.rating-form-input');
  const sendButton = document.querySelector('.rating-send');
  const closeButton = document.querySelector('.close-rating');
  const modalRating = document.querySelector('.modal-overlay');
 // const giveRatingButton = document.getElementById('give_rating');

  let userRating = 0.0;
  let userEmail = ''; // Store the user's email
  let recipeId = null; // Initialize to null

  // Function to open the modal and add the class
  function openModal() {
    modalRating.style.display = 'block'; // Display the modal
    modalRating.classList.add('rating-is-open'); // Add the class
  }

  // Event listener for clicking on the "give_rating" button
  //giveRatingButton.addEventListener('click', function () {
   // openModal(); // Open the modal when the button is clicked
  //});

  // Function to close the modal
  function closeModal() {
    modalRating.style.display = 'none';
    modalRating.classList.remove('rating-is-open'); // Remove the class
  }

  // Event listener for clicking on the close button
  closeButton.addEventListener('click', closeModal);

  // Event listener for pressing the escape key
// Event listener for pressing the escape key
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modalRating.classList.contains('rating-is-open')) {
    closeModal();
  }
});

  // Function to validate email using a simple regex pattern
  function isValidEmail(email) {
    const emailPattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    return emailPattern.test(email);
  }

  // Function to update star colors based on the selected rating
  function updateStarColors(selectedStarIndex) {
    stars.forEach((star, index) => {
      if (index <= selectedStarIndex) {
        star.style.fill = 'rgb(238, 161, 12)';
      } else {
        star.style.fill = 'rgb(217, 217, 217)';
      }
    });
  }

  // Event listener for clicking on stars to rate
  stars.forEach((star, index) => {
    star.addEventListener('click', function () {
      userRating = index + 1; // Rating is the index + 1
      currentRating.textContent = userRating.toFixed(1);
      // Update star colors up to the selected one
      updateStarColors(index);
      // Enable the Send button when a rating is selected and a valid email is entered
      if (isValidEmail(userEmail)) {
        sendButton.removeAttribute('disabled');
      }
    });
  });

  // Event listener for input changes in the email field
  userEmailInput.addEventListener('input', function () {
    userEmail = this.value;
    // Enable the Send button only if a rating is selected and a valid email is entered
    if (userRating > 0 && isValidEmail(userEmail)) {
      sendButton.removeAttribute('disabled');
    } else {
      sendButton.setAttribute('disabled', true);
    }
  });

  // Fetch the recipe ID dynamically
  fetchRecipeByID()
    .then(id => {
      recipeId = id; // Set the recipeId when it's fetched
    })
    .catch(error => {
      // Handle error fetching the recipe ID
      Notify.failure('Oops! Something went wrong. Please try again later.');
    });

  // Event listener for clicking on the Send button
  sendButton.addEventListener('click', function () {
    if (isValidEmail(userEmail) && recipeId !== null) { // Check if recipeId is not null
      // Send the userRating to the API using the rateRecipeById function
      rateRecipeById(recipeId, userRating, userEmail)
        .then(() => {
          // Handle success using Notiflix
          Notify.success('Rating submitted successfully!');
          // Reset form state
          userEmailInput.value = '';
          userRating = 0.0;
          currentRating.textContent = userRating.toFixed(1);
          updateStarColors(-1);
          sendButton.setAttribute('disabled', true);
          closeModal(); // Close the modal after successful submission
        })
        .catch(error => {
          // Handle error using Notiflix
          Notify.failure('Error submitting rating. Please try again later.');
        });
    } else {
      // Handle invalid email address or missing recipe ID using Notiflix
      Notify.failure('Please enter a valid email and ensure the recipe ID is available.');
    }
  });

  // Event listener for pressing Enter key in the email field
  userEmailInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      if (isValidEmail(userEmail) && recipeId !== null) { // Check if recipeId is not null
        // Send the userRating to the API using the rateRecipeById function
        rateRecipeById(recipeId, userRating, userEmail)
          .then(() => {
            // Handle success using Notiflix
            Notify.success('Rating submitted successfully!');
            // Reset form state
            userEmailInput.value = '';
            userRating = 0.0;
            currentRating.textContent = userRating.toFixed(1);
            updateStarColors(-1);
            sendButton.setAttribute('disabled', true);
            closeModal(); // Close the modal after successful submission
          })
          .catch(error => {
            // Handle error using Notiflix
            Notify.failure('Error submitting rating. Please try again later.');
          });
      } else {
        // Handle invalid email address or missing recipe ID using Notiflix
        Notify.failure('Please enter a valid email and ensure the recipe ID is available.');
      }
    }
  });
}
