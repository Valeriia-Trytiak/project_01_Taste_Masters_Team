import { fetchPopular } from '../API/popular-api';

const popularList = document.querySelector('.popular-recipes-list');

function createPopularList() {
  fetchPopular()
    .then(data => {
      popularList.innerHTML = createPopularMarkup(data);
    })
    .catch(error => {
      console.log(error.message);
    });
}

createPopularList();

// Функція створення розмітки (винести в папку Markup)
function createPopularMarkup(arr) {
  return arr
    .map(
      ({ _id, title, description, preview }) =>
        `<li class="popular-recipe-item" data-id="${_id}">
        <div class="popular-recipe-img-wrapper">
          <img
            src="${preview}"
            alt="popular recipe"
            class="popular-recipe-img"
            loading="lazy"
          />
        </div>
        <div class="popular-recipe-info">
                <h4 class="popular-recipe-title">${title}</h4>
          <p class="popular-recipe-text">
            ${description}
          </p>
        </div>
      </li>`
    )
    .join('');
}
