export function createPopularMarkup(arr) {
    return arr
      .map(({ _id, title, description, preview }) => {
        return `<li class="popular-recipe-item" data-id="${_id}">
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
        </li>`;
      })
  
      .join('');
  }