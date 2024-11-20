"use strict";

const btnCalculateMinMax = document.querySelector(".btn--calculate-min-max");
const calculateTextEl = document.querySelector(".calculate-text");
const maxResultEl = document.querySelector(".calculate-max-result");
const minResultEl = document.querySelector(".calculate-min-result");
const calculationFormEL = document.querySelector(".form");
const formErrorEl = document.querySelector(".form-error");

const headingHeaderEl = document.querySelector(".heading-header");
const headingFooterEl = document.querySelector(".heading-footer");

const rectAreaResultEl = document.querySelector(".rect-area-result");

function swapContent() {
  const temp = headingHeaderEl.textContent;
  headingHeaderEl.textContent = headingFooterEl.textContent;
  headingFooterEl.textContent = temp;
}

function calcRectArea(side1, side2) {
  return `${side1} * ${side2} = ${side1 * side2}`;
}

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return false;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function askAboutCookies() {
  if (!getCookie("minMaxResult")) {
    return;
  }

  const numbersString = getCookie("minMaxResult");
  const numbers = numbersString.split(" ");

  if (
    prompt(`Your previous min number: ${numbers[0]}, max number: ${numbers[1]}
    Enter '+' to save these cookies or '-' to delete.`) === "-"
  ) {
    deleteCookie("minMaxResult");
    return;
  }

  handleCookiesPresence();
}

function handleCookiesPresence() {
  alert("Cookies are present, you should reload the page!");
  calculationFormEL.classList.add("hidden");
  formErrorEl.classList.remove("hidden");
}

btnCalculateMinMax.addEventListener("click", function () {
  const currentNumber = Number(
    document.querySelector(`.input-number--${0}`).value
  );
  let maxNumber = currentNumber;
  let minNumber = currentNumber;

  for (let i = 1; i < 10; i++) {
    const currentNumber = Number(
      document.querySelector(`.input-number--${i}`).value
    );
    console.log(currentNumber);
    minNumber = currentNumber < minNumber ? currentNumber : minNumber;
    maxNumber = currentNumber > maxNumber ? currentNumber : maxNumber;
  }

  minResultEl.textContent = minNumber;
  maxResultEl.textContent = maxNumber;
  alert(`Minimum number: ${minNumber}; Maximum number: ${maxNumber};`);
  calculateTextEl.classList.remove("hidden");

  setCookie("minMaxResult", `${minNumber} ${maxNumber}`);
});

askAboutCookies();
swapContent();
rectAreaResultEl.textContent = calcRectArea(8, 5);
