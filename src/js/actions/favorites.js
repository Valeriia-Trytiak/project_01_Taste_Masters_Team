import { createMarkupFavCateg } from '/js/markup/markup-fav-categories';
import { createMarkupCard } from '/js/markup/markup-card';
import { addRating, heartIsActive } from '/js/actions/cards';

export function favoritesPage() {
  const favElements = {
    hero: document.querySelector('.js-fav-hero-section'),
    categories: document.querySelector('.js-fav-categories-section'),
    allCategBtn: document.querySelector('.js-fav-all-categ-btn'),
    categoriesList: document.querySelector('.js-fav-categories-list'),
    cardsList: document.querySelector('.js-fav-cards-list'),
    plug: document.querySelector('.js-favorites-plug'),
    footer: document.querySelector('.js-fav-footer'),
  };

  createGridItems();

  function createGridItems() {
    favElements.allCategBtn.removeEventListener('click', handlerAllCategories);
    favElements.categoriesList.removeEventListener('click', handlerCategories);

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

    const categoriesArray = storageArray
      .map(({ category }) => category)
      .filter((item, index, array) => array.indexOf(item) === index);

    if (categoriesArray.length === 1) {
      favElements.allCategBtn.style.display = 'none';
      favElements.categoriesList.firstChild.classList.add('categ-btn-active');
      return;
    }

    favElements.allCategBtn.addEventListener('click', handlerAllCategories);
    favElements.categoriesList.addEventListener('click', handlerCategories);
  }

  function handlerRemoveRecipe(evt) {
    const cardId = evt.currentTarget.parentNode.parentNode.dataset.id;

    const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];
    fav.splice(fav.indexOf(fav.find(item => item._id === cardId)), 1);
    localStorage.setItem('cardsArray', JSON.stringify(fav));

    createGridItems();
  }

  function createCategoryGridItems() {
    const activeBtn = [...favElements.categoriesList.children].filter(item =>
      item.classList.contains('categ-btn-active')
    );

    const storageArray = JSON.parse(localStorage.getItem('cardsArray')) || [];
    const oneCategoryArray = storageArray.filter(
      item => item.category === activeBtn[0].textContent
    );

    if (oneCategoryArray.length === 0) {
      handlerAllCategories();
      return;
    }

    favElements.cardsList.innerHTML = createMarkupCard(oneCategoryArray);

    addRating();
    heartIsActive(favElements.cardsList, oneCategoryArray);

    const activeHearts = document.querySelectorAll('.js-btn-heart-active');

    activeHearts.forEach(elem =>
      elem.addEventListener('click', handlerRemoveCategoryRecipe)
    );
  }

  function handlerRemoveCategoryRecipe(evt) {
    const cardId = evt.currentTarget.parentNode.parentNode.dataset.id;

    const fav = JSON.parse(localStorage.getItem('cardsArray')) || [];
    fav.splice(fav.indexOf(fav.find(item => item._id === cardId)), 1);
    localStorage.setItem('cardsArray', JSON.stringify(fav));

    createCategoryGridItems();
  }

  function handlerCategories(evt) {
    if (evt.target.classList.contains('js-fav-categories-list')) {
      return;
    }    

    [...evt.currentTarget.children].map(item =>
      item.classList.remove('categ-btn-active')
    );

    evt.currentTarget.previousElementSibling.classList.remove('categ-btn-active');
    evt.target.classList.add('categ-btn-active');
    
    createCategoryGridItems();
  }

  function handlerAllCategories() {
    favElements.allCategBtn.classList.add('categ-btn-active');

    [...favElements.allCategBtn.nextElementSibling.children].map(item =>
      item.classList.remove('categ-btn-active')
    );

    createGridItems();
  }
}