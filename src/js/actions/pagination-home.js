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
    console.log('API Response:', response.data);
  
    const totalPages = response.data.totalPages;
    console.log('Total Pages:', totalPages);
  
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

    const maxPagesToShow = 3;
    let startPage = currentPage - 1;
    let endPage = currentPage + maxPagesToShow - 2;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxPagesToShow + 1;
    }

    if (startPage < 1) {
      startPage = 1;
    }

    for (let i = 0; i < maxPagesToShow; i++) {
      const pageNumber = startPage + i;
      const button = pageButtons[i];

      if (pageNumber <= totalPages) {
        button.textContent = pageNumber;
        button.style.display = 'inline-block';
      } else {
        button.style.display = 'none';
      }
    }

    dotsBtn.style.display = totalPages > endPage ? 'inline-block' : 'none';
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
    if (currentPage < totalPages) {
      currentPage = Math.min(currentPage + 3, totalPages);
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
