const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const form = document.querySelector('#demo-form');
const successMessage = document.querySelector('#form-success');
const fields = Array.from(form.querySelectorAll('input, textarea'));

function setMenu(open) {
  navLinks.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', function () {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navLinks.addEventListener('click', function (event) {
  if (event.target.closest('a')) setMenu(false);
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 640) setMenu(false);
});

function validateField(field) {
  const error = document.getElementById(field.id + '-error');
  let message = '';

  if (!field.value.trim()) {
    message = 'Please fill in this field.';
  } else if (field.type === 'email' && !field.validity.valid) {
    message = 'Please enter a valid email address.';
  }

  error.textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

fields.forEach(function (field) {
  field.addEventListener('input', function () {
    successMessage.textContent = '';
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  successMessage.textContent = '';
  const results = fields.map(validateField);
  const firstInvalid = results.indexOf(false);

  if (firstInvalid !== -1) {
    fields[firstInvalid].focus();
    return;
  }

  successMessage.textContent = 'Your request looks good. This is a demo, so nothing was sent.';
});
