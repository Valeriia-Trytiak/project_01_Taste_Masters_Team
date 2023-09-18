import axios from 'axios';
import { Notify } from 'notiflix';
import { cardsGenerate } from '/js/actions/cards';
import { serviceAllRecipes } from '/js/API/filter-api';

export async function initializePagination() {
  let currentPage = 1; // Current page
  const perPage = calculatePerPage(); // Initial perPage value

  // Pagination buttons
  const prevBtns = document.querySelectorAll('.prev-btn');
  const nextBtns = document.querySelectorAll('.next-btn');
  const pageButtons = document.querySelectorAll('.pages-btn');
  const dotsBtn = document.querySelector('.dots-btn');

  async function calculateTotalPages() {
    const response = await serviceAllRecipes(perPage, currentPage);
    const totalResults = response.data.totalResults;
    const totalPages = Math.ceil(totalResults / perPage);
    return totalPages;
  }

  async function updatePage() {
    await cardsGenerate(currentPage, perPage);
    await updatePageButtons();
  }

  async function updatePageButtons() {
    const totalPages = await calculateTotalPages();
  
    prevBtns.forEach((btn) => {
      btn.disabled = currentPage === 1;
    });
  
    nextBtns.forEach((btn) => {
      btn.disabled = currentPage === totalPages;
    });

    // Calculate which page buttons to show
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  if (totalPages <= 3) {
    // If there are 3 or fewer pages, show all page buttons
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 2) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }
  }

  pageButtons.forEach((btn, index) => {
    const pageNumber = startPage + index;
    if (pageNumber <= endPage) {
      btn.textContent = pageNumber;
      btn.style.display = 'inline-block';
    } else {
      btn.style.display = 'none';
    }
  });

  dotsBtn.style.display = currentPage < totalPages - 1 ? 'inline-block' : 'none';
}

  function calculatePerPage() {
    const gridBox = document.querySelector('.js-card-list');
    const elemToPage = getComputedStyle(gridBox).getPropertyValue('--limiter-cards-on-page');
    return parseInt(elemToPage) || 6; // Default to 6 if custom property is not set
  }

  // Event listeners for previous page buttons
  prevBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (currentPage > 1) {
        currentPage--;
        await updatePage();
      }
    });
  });

  // Event listeners for next page buttons
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const totalPages = await calculateTotalPages();
      if (currentPage < totalPages) {
        currentPage++;
        await updatePage();
      }
    });
  });

// Event listener for the "..." (dots) button
dotsBtn.addEventListener('click', async () => {
    const totalPages = await calculateTotalPages();
    if (currentPage <= totalPages - 2) { // Change this line
      currentPage += 3;
      await updatePage();
    }
  });

  // Event listeners for page number buttons
  pageButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pageNumber = parseInt(btn.textContent);
      if (!isNaN(pageNumber) && pageNumber !== currentPage) {
        currentPage = pageNumber;
        await updatePage();
      }
    });
  });

  // Initial load
  await updatePageButtons();
  await updatePage();
}
