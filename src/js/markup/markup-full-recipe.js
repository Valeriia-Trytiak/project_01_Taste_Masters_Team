import sprite from '../../img/icons.svg';

export function createMarkupModal(data) {
  const youtubeLink = data.youtube;

  function getYoutubeVideoId(url) {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  const videoId = getYoutubeVideoId(youtubeLink);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const roundedRating = parseFloat(data.rating).toFixed(1);

  const tagsToRender = data.tags.slice(0, 2);

  const tagsMarkup = tagsToRender
    .map(
      tag => `
        <li class="modal-hashtag-item">#${tag}</li>
      `
    )
    .join('');

  const ingredientsMarkup = data.ingredients
    .map(
      ingredient => `
      <li class="modal-ingredient">
        ${ingredient.name}
        <span class="modal-ing-measure">${ingredient.measure}</span>
      </li>
    `
    )
    .join('');

  const modalCardMarkup = `<iframe
  src="${embedUrl}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  class="iframe-video"
></iframe>
          <h2 class="modal-recipe-name">${data.title}</h2>
          <div class="modal-info">
            <div class="modal-card-stars stars-block-js">
              <p class="modal-stars-rating cards-raiting">${roundedRating}</p>
              <div class="modal-stars rating-wrapper ">
                <svg class="card-stars-icon" data-raiting="one" id="all-stars" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" data-raiting="two" id="all-stars" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" data-raiting="three" id="all-stars" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" data-raiting="four" id="all-stars" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
                <svg class="card-stars-icon" data-raiting="five" id="all-stars" width="18" height="18">
                <use href="${sprite}#star"></use>
                </svg>
              </div>
              <p class="modal-card-time">${data.time} min</p>
            </div>
            <ul class="modal-ingredients-list">${ingredientsMarkup}</ul>
            <ul class="modal-hashtags">${tagsMarkup}</ul>
            <p class="modal-recipe-instructions">${data.instructions}</p>
          </div>
          <div class="modal-button">
                <button class="modal-add-favorite btn">Add to favorite</button>
                <button class="modal-give-rating btn">Give a rating</button>
              </div>
    `;

  return modalCardMarkup;
}
