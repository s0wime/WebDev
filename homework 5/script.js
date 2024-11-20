"use strict";

const btnCalculateMax = document.querySelector(".btn--calculate-max");
const calculateTextEl = document.querySelector(".calculate-text");
const maxResultEl = document.querySelector(".calculate-max-result");

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

swapContent();
rectAreaResultEl.textContent = calcRectArea(8, 5);
