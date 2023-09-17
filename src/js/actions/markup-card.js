export function createMarkupCard(array) {
  const defaults = {
    url: 'https://st2.depositphotos.com/4410397/7644/v/450/depositphotos_76444781-stock-illustration-valentines-day-meal-line-icon.jpg',
    text: 'Not Found',
  };
    
  return array
    .map(
      ({ _id, title, description, preview, rating }) => `
        <li class="card card-sed-item" data-id="${_id}">
         <img
           class="card-img"
           src="${preview || defaults.url}"
           loading="lazy"
           alt="${title || defaults.text}"
         />
         <div class="card-content">
          <button class="btn-heart" type="button">
            <svg width="22" height="22">
              <use href="/img/icons.svg#heart-inactive"></use>
            </svg>
          </button>
          <button class="btn-heart visually-hidden" type="button">
            <svg width="22" height="22">
              <use href="/img/icons.svg#heart-active"></use>
            </svg>
          </button>
          <h3 class="card-title">${title || defaults.text}</h3>
          <p class="card-desc">
            ${description || defaults.text}
          </p>
          <div class="card-rating-area">
            <div class="card-rating-box">
              <p class="rating-num">${rating || 0}</p>
              <ul class="rating-stars-list">
                <li>
                  <svg class="rating-star-icon" width="18" height="18">
                    <use href="/img/icons.svg#star"></use>
                  </svg>
                </li>
                <li>
                  <svg class="rating-star-icon" width="18" height="18">
                    <use href="/img/icons.svg#star"></use>
                  </svg>
                </li>
                <li>
                  <svg class="rating-star-icon" width="18" height="18">
                    <use href="/img/icons.svg#star"></use>
                  </svg>
                </li>
                <li>
                  <svg class="rating-star-icon" width="18" height="18">
                    <use href="/img/icons.svg#star"></use>
                  </svg>
                </li>
                <li>
                  <svg class="rating-star-icon" width="18" height="18">
                    <use href="/img/icons.svg#star"></use>
                  </svg>
                </li>
              </ul>
            </div>
            <button class="card-btn" type="button">See recipe</button>
          </div>
        </div>
      </li>`
    )
    .join('');
}
