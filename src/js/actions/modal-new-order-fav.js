import { Notify } from 'notiflix';
import { addNewOrder } from '/js/API/order-api';

const cartBtn = document.querySelector('.order-btn');
const cartBtnMobile = document.querySelector('.order-btn-mob');
const closeModalBtn = document.querySelector('.modal-close-btn');
const modalWindow = document.querySelector('.modal-overlay');
const form = document.querySelector('.form');

cartBtn.addEventListener('click', openModalNewOrder);
cartBtnMobile.addEventListener('click', openModalNewOrder);
closeModalBtn.addEventListener('click', closeModalNewOrder);
form.addEventListener('submit', onSubmitNewOrder);

// open modal
function openModalNewOrder() {
  modalWindow.classList.remove('visually-hidden');
}

// close modal
function closeModalNewOrder() {
  modalWindow.classList.add('visually-hidden');
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
