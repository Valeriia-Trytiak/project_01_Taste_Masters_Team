import { createMarkupFavCateg } from '/js/markup/markup-fav-categories';
import { createMarkupCard } from '/js/markup/markup-card';
import { addRating, heartIsActive } from '/js/actions/cards';

export function favoritesPage() {
  const favElements = {
    hero: document.querySelector('.js-fav-hero-section'),
    categories: document.querySelector('.js-fav-categories-section'),
    categoriesList: document.querySelector('.js-fav-categories-list'),
    cardsList: document.querySelector('.js-fav-cards-list'),
    plug: document.querySelector('.js-favorites-plug'),
    footer: document.querySelector('.js-fav-footer'),
  };

  createGridItems();
  function handlerRemoveRecipe(evt) {
    const cardId = evt.currentTarget.parentNode.parentNode.dataset.id;

    const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];
    fav.splice(fav.indexOf(fav.find(item => item._id === cardId)), 1);
    localStorage.setItem('cardsArray', JSON.stringify(fav));

    createGridItems();
  }

  function createGridItems() {
    const storageArray = JSON.parse(localStorage.getItem('cardsArray')) || [];

    if (storageArray.length === 0) {
      if (
        getComputedStyle(favElements.hero).getPropertyValue('--visible') ===
        'false'
      ) {
        favElements.hero.style.display = 'none';
      }
      favElements.categories.style.display = 'none';
      favElements.cardsList.style.display = 'none';
        favElements.footer.style.display = 'none';
        favElements.plug.style.display = 'block';
      return;
    }

    favElements.plug.style.display = 'none';

    favElements.categoriesList.innerHTML = createMarkupFavCateg(storageArray);
    favElements.cardsList.innerHTML = createMarkupCard(storageArray);

    addRating();
      heartIsActive(favElements.cardsList, storageArray);
      
      

    const activeHearts = document.querySelectorAll('.js-btn-heart-active');

    activeHearts.forEach(elem =>
      elem.addEventListener('click', handlerRemoveRecipe)
    );
  }
}
