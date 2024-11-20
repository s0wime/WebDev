"use strict";

const btnCalculateMinMax = document.querySelector(".btn--calculate-min-max");
const calculateTextEl = document.querySelector(".calculate-text");
const maxResultEl = document.querySelector(".calculate-max-result");
const minResultEl = document.querySelector(".calculate-min-result");

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
    maxNumber = currentNumber > maxNumber ? currentNumber : maxNumber;
    minNumber = currentNumber < minNumber ? currentNumber : minNumber;
  }

  maxResultEl.textContent = maxNumber;
  minResultEl.textContent = minNumber;
  calculateTextEl.classList.remove("hidden");
});

swapContent();
rectAreaResultEl.textContent = calcRectArea(8, 5);
