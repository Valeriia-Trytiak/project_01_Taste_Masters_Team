import { Notify } from 'notiflix';
import { submitForm } from 'js/API/order-api';

const cartBtn = document.querySelector('.order-icon');
const closeModalBtn = document.querySelector('.modal-close-btn');
const modalWindow = document.querySelector('.modal-overlay');
const form = document.querySelector('.form');

cartBtn.addEventListener('click', handlerClick);
closeModalBtn.addEventListener('click', closeModal);
form.addEventListener('submit', onSubmit);

// open modal
function handlerClick() {
  modalWindow.classList.remove('visually-hidden');
}

// close modal
function closeModal() {
  modalWindow.classList.add('visually-hidden');
}

// function submit data of form
function onSubmit(evt) {
  evt.preventDefault();

  const userName = evt.currentTarget.elements.modal_name.value;
  const phone = evt.currentTarget.elements.modal_phone.value;
  const email = evt.currentTarget.elements.modal_email.value;
  const comment = evt.currentTarget.elements.modal_comment.value;

  if (userName == '' || phone == '' || email == '') {
    Notify.failure('Ensure you input a value in both fields!');
  } else {
    submitForm(userName, phone, email, comment)
      .then(() => {
        Notify.success('This form has been successfully submitted!');
        evt.currentTarget.reset();
        closeModal();
      })
      .catch(error => {
        Notify.failure('Oops! Something went wrong. Please try again later.');
      });
  }
}

export { handlerClick, closeModal };
