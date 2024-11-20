"use strict";

const btnCalculateMax = document.querySelector(".btn--calculate-max");
const calculateTextEl = document.querySelector(".calculate-text");
const maxResultEl = document.querySelector(".calculate-max-result");

btnCalculateMax.addEventListener("click", function () {
  let maxNumber = 0;

  for (let i = 0; i < 10; i++) {
    const currentNumber = Number(
      document.querySelector(`.input-number--${i}`).value
    );
    console.log(currentNumber);
    maxNumber = currentNumber > maxNumber ? currentNumber : maxNumber;
  }

  maxResultEl.textContent = maxNumber;
  calculateTextEl.classList.remove("hidden");
});
