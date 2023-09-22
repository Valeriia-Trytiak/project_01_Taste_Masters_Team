import { Notify } from 'notiflix';
import { addNewOrder } from '/js/API/order-api';

const cartBtn = document.querySelector('.order-btn');
const cartBtnMobile = document.querySelector('.order-btn-mob');
const heroBtn = document.querySelector('.hero-btn-js');
const closeModalBtn = document.querySelector('.modal-close-btn');
const modalWindow = document.querySelector('.modal-overlay');
const form = document.querySelector('.form');
const body = document.querySelector('body');


cartBtn.addEventListener('click', openModalNewOrder);
cartBtnMobile.addEventListener('click', openModalNewOrder);
heroBtn.addEventListener('click', openModalNewOrder);
form.addEventListener('submit', onSubmitNewOrder);
window.addEventListener('keydown', handleKeyDown);

// open modal
function openModalNewOrder() {
  modalWindow.classList.remove('visually-hidden');
  closeModalBtn.addEventListener('click', closeModalNewOrder);
  modalWindow.addEventListener('click', closeModalOnBackdropNewOrder);
  body.classList.add('no-scroll');
}

// close modal
function closeModalNewOrder() {
  cartBtn.removeEventListener('click', closeModalNewOrder);
  cartBtnMobile.removeEventListener('click', closeModalNewOrder);
  modalWindow.classList.add('visually-hidden');
  body.classList.remove('no-scroll');
}

//close modal on clicking on backdrop
function closeModalOnBackdropNewOrder(event) {
  if (event && event.target === modalWindow) {
    closeModalBtn.removeEventListener('click', closeModalNewOrder);
    modalWindow.removeEventListener('click', closeModalOnBackdropNewOrder);
    window.removeEventListener('keydown', handleKeyDown);
    modalWindow.classList.add('visually-hidden');
  }
}

//close modal by clicking "Escape"
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeModalNewOrder();
  }
}

// function submit data of form
function onSubmitNewOrder(evt) {
  evt.preventDefault();

  const userName = evt.currentTarget.elements.modal_name.value;
  const phone = evt.currentTarget.elements.modal_phone.value;
  const email = evt.currentTarget.elements.modal_email.value;
  const comment = evt.currentTarget.elements.modal_comment.value;
  const resetForm = evt.currentTarget.reset();

  if (userName == '' || phone == '' || email == '') {
    Notify.failure('Ensure you input a value in both fields!');
  } else {
    addNewOrder(userName, phone, email, comment)
      .then(() => {
        Notify.success('This form has been successfully submitted!');
        resetForm;
        closeModalNewOrder();
      })
      .catch(error => {
        Notify.failure('Oops! Something went wrong. Please try again later.');
      });
  }
}

export { openModalNewOrder, closeModalNewOrder };
