import { fetchRecipeByCategory } from '/js/API/categories-api';

const categoryList = document.querySelector('.categories-list');
const btnAllCategories = document.querySelector('.categories-btn')

categoryList.addEventListener('click', getCategoryName);

export function getCategoryName(evt) {
  if (!evt.target.classList.contains('btn-dishes')) {
    return;
  }

btnAllCategories.classList.remove('all-categories-active')
  const category = evt.target.textContent;

  fetchRecipeByCategory(category).then(data => {
    const categoryName = data.results[0].category;
    return categoryName
  });
}
