// lib.js

function isValidColorCode(code) {
  const regex = /^#[0-9A-F]{6}$/i;

  return regex.test(code);
}

function isValidEmail(email) {
  // ...

  return Boolean(email);
}

function isValidPhoneNumber(phone) {
  // ...

  return Boolean(phone);
}
