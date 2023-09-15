import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function initializeRating() {
  const stars = document.querySelectorAll(".rating-star-svg");
  const currentRating = document.querySelector(".rating-result");
  const userEmailInput = document.querySelector(".rating-form-input");
  const sendButton = document.querySelector(".rating-send");
  const closeButton = document.querySelector(".close-rating");
  const modalRating = document.querySelector(".modal-rating");

  // Initialize rating (0.0 by default)
  let userRating = 0.0;
  currentRating.textContent = userRating.toFixed(1);

  // Event listener for clicking on stars to rate
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = parseInt(this.getAttribute("data-rating"));
      userRating = rating;
      currentRating.textContent = userRating.toFixed(1);
      // Add visual feedback (e.g., changing star colors)
      updateStarColors(stars, rating);
    });
  });

  // Event listener for submitting the rating
  sendButton.addEventListener("click", function () {
    // Send the userRating to the API using fetch or another AJAX method
    const email = userEmailInput.value;
    
    console.log('Email entered:', email); // Add this line to log the email address

    if (isValidEmail(email)) {
      // Make an API request to update the rating for the recipe with userRating
      // Replace the API URL with the actual API endpoint
      const apiUrl = "https://tasty-treats-backend.p.goit.global/api/recipes/123/rating";
      fetch(apiUrl, {
        method: "PATCH",
        body: JSON.stringify({ rating: userRating, email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle API response using Notiflix
          Notify.Success("Rating submitted successfully!");
        })
        .catch((error) => {
          // Handle errors using Notiflix
          Notify.Failure("Error submitting rating. Please try again later.");
        });
    } else {
      // Handle invalid email address using Notiflix
      Notify.Failure("Invalid email address. Please enter a valid email.");
    }
  });

  // Event listener for clicking on the close button
  closeButton.addEventListener("click", closeModal);

  // Event listener for pressing the escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Function to close the modal
  function closeModal() {
    modalRating.style.display = "none";
  }

  // Function to update star colors based on the selected rating
  function updateStarColors(stars, rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.fill = "rgb(238, 161, 12)"; // Change star color
      } else {
        star.style.fill = "rgb(217, 217, 217)"; // Reset star color
      }
    });
  }

  // Function to validate email using a simple regex pattern
  function isValidEmail(email) {
    const emailPattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    return emailPattern.test(email);
  }
}
