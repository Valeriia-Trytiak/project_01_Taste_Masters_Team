// Створення опцій
export function createOptionArea(arr) {
  return arr
    .map(({ name }) => {
      return `<option value="${name}">${name}</option>;`;
    })
    .join('');
}

export function createOptionIngr(arr) {
  return arr
    .map(({ _id, name }) => {
      return `<option value="${_id}">${name}</option>;`;
    })
    .join('');
}
