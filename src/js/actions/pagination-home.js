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

    const totalPages = response.data.totalPages;

    return totalPages;
  }

  async function updatePage() {
    await cardsGenerate(currentPage, perPage);
    await updatePageButtons();
  }

  async function updatePageButtons() {
    const totalPages = await calculateTotalPages();

    prevBtns.forEach(btn => {
      btn.disabled = currentPage === 1;
    });

    // Inside the updatePageButtons function
    nextBtns.forEach(btn => {
      btn.disabled = currentPage === totalPages;
      if (currentPage === totalPages) {
        btn.classList.add('last-page'); // Add the class on the last page
      } else {
        btn.classList.remove('last-page'); // Remove the class on other pages
      }
    });

    document.querySelector('.last-page-btn').disabled =
      currentPage === totalPages;
    if (currentPage === totalPages) {
      document.querySelector('.last-page-btn').classList.add('last-page'); // Add the class on the last page
    } else {
      document.querySelector('.last-page-btn').classList.remove('last-page'); // Remove the class on other pages
    }

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
    const elemToPage = getComputedStyle(gridBox).getPropertyValue(
      '--limiter-cards-on-page'
    );
    return parseInt(elemToPage) || 6; // Default to 6 if custom property is not set
  }

  // Event listeners for previous page button
  prevBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (currentPage > 1) {
        currentPage--;
        await updatePage();

        // Remove the current-page class from all page buttons
        pageButtons.forEach(button => {
          button.classList.remove('current-page');
        });

        // Add the current-page class to the current page button
        document
          .querySelector(`.pages-btn:nth-child(${currentPage})`)
          .classList.add('current-page');

        // Update styles for first-page-btn and prev-btn
        if (currentPage === 1) {
          document.querySelector('.first-page-btn').style.backgroundColor =
            'var(--cl-number-pages)';
          document.querySelector('.first-page-btn').style.borderColor =
            'var(--txt-cl-30-light-theme)';
          prevBtns.forEach(prev => {
            prev.style.backgroundColor = 'var(--cl-number-pages)';
            prev.style.borderColor = 'var(--txt-cl-30-light-theme)';
          });
        } else {
          document.querySelector('.first-page-btn').style.backgroundColor =
            'var(--accent-cl)';
          document.querySelector('.first-page-btn').style.borderColor =
            'var(--accent-cl)';
          prevBtns.forEach(prev => {
            prev.style.backgroundColor = 'var(--accent-cl)';
            prev.style.borderColor = 'var(--accent-cl)';
          });
        }
      }
    });
  });

  // Event listeners for next page button
  nextBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const totalPages = await calculateTotalPages();
      if (currentPage < totalPages) {
        currentPage++;
        await updatePage();

        // Remove the current-page class from all page buttons
        pageButtons.forEach(button => {
          button.classList.remove('current-page');
        });

        // Add the current-page class to the current page button
        document
          .querySelector(`.pages-btn:nth-child(${currentPage})`)
          .classList.add('current-page');

        // Update styles for last-page-btn and next-btn
        if (currentPage === totalPages) {
          document.querySelector('.last-page-btn').style.backgroundColor =
            'var(--cl-number-pages)';
          nextBtns.forEach(next => {
            next.style.backgroundColor = 'var(--cl-number-pages)';
          });
        } else {
          document.querySelector('.last-page-btn').style.backgroundColor =
            'var(--accent-cl)';
          nextBtns.forEach(next => {
            next.style.backgroundColor = 'var(--accent-cl)';
          });
        }
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

  // Event listener for first page button
  document
    .querySelector('.first-page-btn')
    .addEventListener('click', async () => {
      if (currentPage !== 1) {
        // Check if it's not already on the first page
        currentPage = 1;
        await updatePage();

        // Remove the current-page class from all page buttons
        pageButtons.forEach(button => {
          button.classList.remove('current-page');
        });

        // Add the current-page class to the first page button
        document.querySelector('.pages-btn').classList.add('current-page');
      }
    });

  // Event listener for last page button
  document
    .querySelector('.last-page-btn')
    .addEventListener('click', async () => {
      const totalPages = await calculateTotalPages();
      if (currentPage < totalPages) {
        currentPage = totalPages;
        await updatePage();
      }
    });

  // Event listeners for page number buttons
  pageButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const pageNumber = parseInt(btn.textContent);
      if (!isNaN(pageNumber) && pageNumber !== currentPage) {
        currentPage = pageNumber;
        await updatePage();

        // Remove the current-page class from all page buttons
        pageButtons.forEach(button => {
          button.classList.remove('current-page');
        });

        // Add the current-page class to the clicked page button
        btn.classList.add('current-page');
      }
    });
  });

  // Initial load
  document
    .querySelector('.pages-btn:nth-child(1)')
    .classList.add('current-page'); // Add the current-page class to the first page button
  await updatePageButtons();
  await updatePage();
}
