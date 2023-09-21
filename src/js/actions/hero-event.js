export function markupHeroSlide(arr) {
  return arr
    .map(
      ({ cook, topic }) => `
                <div class="swiper-slide hero-rigth">
    <div class="hero-event">
        <div class="hero-block-chief">
            <picture>
                <source srcset="${cook.imgWebpUrl}" type="image/webp" />
                <img class="hero-block-cook-img" src="${cook.imgUrl}" alt="${cook.name} " />
            </picture>
        </div>
        <div class="hero-preview">
            <div class="hero-block-prewiew">
                <picture>
                    <source srcset="${topic.previewWebpUrl}" type="image/webp" />
                    <img class="hero-block-prewiew-img" src="${topic.previewUrl}" alt="${topic.name} " />
                </picture>
                <p class="hero-block-prewiew-title">${topic.name}</p>
                <p class="hero-block-prewiew-text">${topic.area}</p>
            </div>
        </div>
        <div class="hero-block-dish">
            <picture>
                <source srcset="${topic.imgWebpUrl}" type="image/webp" />
                <img class="hero-block-dish-img" src="${topic.imgUrl}" alt="${topic.name} " />
            </picture>
        </div>
    </div>
</div>`
    )
    .join('');
}
