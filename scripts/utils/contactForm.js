const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const body = document.getElementById("body");

function displayModal() {
	modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "true");
  body.classList.add("no-scroll");

  const photName = document.querySelector('h1');
  const photName__div = document.querySelector(".photName__div");
  photName__div.innerHTML = photName.textContent;

  const closeButton = document.querySelector(".closeButton");
  closeButton.focus();
  const sendForm = document.querySelector(".sendForm");
  const fname__form = document.getElementById("fname");
  const name__form = document.getElementById("name");
  const email__form = document.getElementById("email");
  const message__form = document.getElementById("message");

  sendForm.addEventListener('click', event => {
    event.preventDefault();
    // Display data entered by user
    console.log(fname__form.value);
    console.log(name__form.value);
    console.log(email__form.value);
    console.log(message__form.value);
    fname__form.value = "";
    name__form.value = "";
    email__form.value = "";
    message__form.value = "";
    modal.style.display = "none";
    document.querySelector(".contact_button").focus();
  })
}

function closeModal() {
  modal.style.display = "none";
  modal.getAttribute("aria-hidden", "true");
  main.getAttribute("aria-hidden", "false");
  body.classList.remove("no-scroll");
  document.querySelector(".contact_button").focus();
}

const closeButton = document.querySelector(".closeButton");
closeButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    closeModal();
    e.preventDefault();
  }
});

// Close modal with esc key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Trap focus inside modal
const  focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'; // all the elements inside modal which we want to make focusable

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal\
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab';

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();


// Validation

const firstName = document.getElementById("fname");
const lastName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

firstName.addEventListener("input", firstValidation);
lastName.addEventListener("input", lastValidation);
email.addEventListener("input", mailValidation);
message.addEventListener("input", messageValidation);

// First Name
function firstValidation() {
  let regexName = /^[A-Za-zÀ-ÿ-']{2,20}$/;
  // console.log(firstName.value);

  if (firstName.value === "") {
    firstName.classList.add("input-error");
    firstName.classList.remove("input-validate");
    firstError.innerHTML = "Veuillez saisir au minimum 2 caractères.";
  } else if (regexName.test(firstName.value) === false) {
    firstName.classList.add("input-error");
    firstName.classList.remove("input-validate");
    firstError.innerHTML = "Format incorrect.";
  } else {
    firstName.classList.remove("input-error");
    firstName.classList.add("input-validate");
    firstError.innerHTML = "";
  }
}

// Last name
function lastValidation() {
  let regexName = /^[A-Za-zÀ-ÿ-']{2,20}$/;
  //console.log(lastName.value);

  if (lastName.value.trim() === "") {
    lastName.classList.add("input-error");
    lastName.classList.remove("input-validate");
    lastError.innerHTML = "Veuillez saisir au minimum 2 caractères.";
  } else if (regexName.test(lastName.value) == false) {
    lastName.classList.add("input-error");
    lastName.classList.remove("input-validate");
    lastError.innerHTML = "Format incorrect";
  } else {
    lastName.classList.remove("input-error");
    lastName.classList.add("input-validate");
    lastError.innerHTML = "";
  }
}

// Email
function mailValidation() {
  //console.log(email.value);
  let regexMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //RFC 5322

  if (email.value.trim() === "") {
    email.classList.add("input-error");
    email.classList.remove("input-validate");
    emailError.innerHTML = "Veuillez saisir votre adresse mail";
  } else if (regexMail.test(email.value) == false) {
    email.classList.add("input-error");
    email.classList.remove("input-validate");
    emailError.innerHTML = "Format incorrect";
  } else {
    email.classList.remove("input-error");
    email.classList.add("input-validate");
    emailError.innerHTML = "";
  }
}

// Message
function messageValidation() {
  //console.log(message.value);

  if (message.value === "") {
    message.classList.add("input-error");
    message.classList.remove("input-validate");
    messageError.innerHTML = "Veuillez saisir votre message";
  } else {
    message.classList.remove("input-error");
    message.classList.add("input-validate");
    messageError.innerHTML = "";
  }
}

