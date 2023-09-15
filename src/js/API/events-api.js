function featchEvents() {
  return fetch(`https://tasty-treats-backend.p.goit.global/api/events`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(`eror`);
      }
      return resp.json();
    }
  );
}

const swiperSlide = document.querySelector('.hero-swiper-slide');

function getEvents(slide) {
  const markup = slide.map(
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
      return `<div class="hero-swiper-slide">
                        <div class="chef">
                            <picture>
                                <source srcset="${cookImgWebp}" type="img/webp" />
                                <source srcset="${cookImgUrl}" type="img/png" />
                                <img class="chef-image" src="../img/chief1.png" alt="">
                            </picture>
                        </div>
                        <div class="hero-preview">
                            <picture>
                                <source srcset="${previewWebpUrl}" type="img/webp" />
                                <source srcset="${previewUrl}" type="img/png" />
                                <img class="preview-image" src="../img/preview1.png" alt="">
                            </picture>
                            <h2 class="hero-swiper-title">${name}</h2>
                            <p class="hero-swiper-desc">${area}</p>
                        </div>
                        <div class="hero-dish">
                            <picture>
                                <source srcset="${topicImgWebp}" type="img/webp" />
                                <source srcset="${topicImgUrl}" type="img/png" />
                                <img class="dish-image" src="../img/dish1.png" alt="">
                            </picture>
                        </div>
                    </div>`.join('');
    }
  );
  swiperSlide.insertAdjacentHTML('beforeend', markup);
}

// import Swiper from 'swiper';
// // import Swiper styles
// import 'swiper/css';
// import 'swiper/css';
// import 'swiper/css/pagination';

// // ініцілізація слайдеру

// const hero_slider = new Swiper(`.js-hero-slider`, {
//   direction: 'vertical',
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Default parameters
//   slidesPerView: 1,
//   spaceBetween: 16,
// });
