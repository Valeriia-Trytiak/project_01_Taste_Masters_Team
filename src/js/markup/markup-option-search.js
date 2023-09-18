// Створення опцій
export function createOption(arr) {
  return arr
    .map(({ _id, name }) => {
      return `<option value="${_id}">${name}</option>;`;
    })
    .join('');
}
