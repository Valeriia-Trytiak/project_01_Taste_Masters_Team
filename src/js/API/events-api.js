export function getEvents(slide) {
  fetch('https://tasty-treats-backend.p.goit.global/api/events')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const slides = data.map(
        ({
          cook: { imgWebpUrl: cookImgWebp, imgUrl: cookImgUrl },
          topic: {
            imgWebpUrl: topicImgWebp,
            imgUrl: topicImgUrl,
            previewWebpUrl,
            previewUrl,
            name,
            area,
          },
        }) => {
          return `
                       <div class="chef">
                            <picture>
                                <source srcset="${cookImgWebp}" type="img/webp" />
                                <source srcset="${cookImgUrl}" type="img/png" />
                                <img class="chef-image" src="${cookImgUrl}" alt="">
                            </picture>
                        </div>
                        <div class="hero-preview">
                            <picture>
                                <source srcset="${previewWebpUrl}" type="img/webp" />
                                <source srcset="${previewUrl}" type="img/png" />
                                <img class="preview-image" src="${previewUrl}" alt="">
                            </picture>
                            <h2 class="hero-swiper-title">${name}</h2>
                            <p class="hero-swiper-desc">${area}</p>
                        </div>
                        <div class="hero-dish">
                            <picture>
                                <source srcset="${topicImgWebp}" type="img/webp" />
                                <source srcset="${topicImgUrl}" type="img/png" />
                                <img class="dish-image" src="${topicImgUrl}" alt="">
                            </picture>
                        </div>
                    `;
        }
      );

      slide.insertAdjacentHTML('beforeend', slides.join(''));
    })
    .catch(error => {
      console.error('Виникла проблема з операцією запиту:', error);
    });
}

getEvents(document.querySelector('.hero-swiper-slide'));

const heroSwiper = new Swiper('.js-hero-slider', {
  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: '.hero-swiper-pagination',
    clickable: true,
  },
});
