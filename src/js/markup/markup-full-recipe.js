import sprite from '../../img/icons.svg';

export function createMarkupModal(data) {
  const youtubeLink = data.youtube;

  function getYoutubeVideoId(url) {
    if (!url) {
      return ''; // Перевірка на нульове значення
    }
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  const videoId = getYoutubeVideoId(youtubeLink);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const roundedRating = parseFloat(data.rating).toFixed(1);

  const tagsToRender = data.tags.slice(0, 2);

  const tagsMarkup = tagsToRender
    .filter(tag => tag !== '') // Фільтрую порожні теги
    .map(
      tag => `
        <li class="modal-hashtag-item"><p class="modal-hashtag-text">#${tag}</p></li>
      `
    )
    .join('');

  const ingredientsMarkup = data.ingredients
    .map(
      ingredient => `
      <li class="modal-ingredient modal-ingredient-dark">
       <p class="modal-ingredient-text">${ingredient.name}</p>
        <span class="modal-ing-measure">${ingredient.measure}</span>
      </li>
    `
    )
    .join('');

  const modalCardMarkup = `<iframe
  src="${embedUrl}"
  title="YouTube video player"
  poster="${data.preview}"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  class="iframe-video"
  loading="lazy"></iframe>
          <h2 class="modal-recipe-name">${data.title}</h2>
          <div class="modal-info">
            <div class="modal-card-stars stars-block-js">
              <p class="modal-stars-rating cards-raiting">${roundedRating}</p>
              <div class="modal-stars rating-wrapper">
                <svg class="card-stars-icon" id="stars-full-modal" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" id="stars-full-modal" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" id="stars-full-modal" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" id="stars-full-modal" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" id="stars-full-modal" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
              </div>
              <p class="modal-card-time modal-card-time-dark">${data.time} min</p>
            </div>
            <ul class="modal-ingredients-list">${ingredientsMarkup}</ul>
            <ul class="modal-hashtags"><li class="modal-hashtag-item modal-category-js"><p class="modal-hashtag-text">#${data.category}</p></li>${tagsMarkup}</ul>
            <p class="modal-recipe-instructions">${data.instructions}</p>
          </div>
          <div class="modal-button">
                <button class="modal-add-favorite btn" type="button" id=${data._id}>Add to favorite</button>
                <button class="modal-give-rating btn" type="button" id= "givRating">Give a rating</button>
              </div>
    `;

  return modalCardMarkup;
}
