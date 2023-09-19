export function createMarkupFavCateg(data) {
  return data
    .map(({ category }) => category)
    .filter((item, index, array) => array.indexOf(item) === index)
    .sort((a, b) => a.localeCompare(b))
    .map(
      item => `<li class="fav-categories-item">
            <button type="button" class="fav-categories-btn">${item}</button>
          </li>`
    )
    .join('');
}
