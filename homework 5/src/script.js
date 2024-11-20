"use strict";

const btnCalculateMinMax = document.querySelector(".btn--calculate-min-max");
const checkBoxBoldText = document.getElementById("bold-text-checkbox");
const rectAreaResultEl = document.querySelector(".rect-area-result");
const maxResultEl = document.querySelector(".calculate-max-result");
const minResultEl = document.querySelector(".calculate-min-result");
const calculateTextEl = document.querySelector(".calculate-text");
const headingHeaderEl = document.querySelector(".heading-header");
const headingFooterEl = document.querySelector(".heading-footer");
const boldTextBoxEl = document.querySelector(".bold-text-box");
const calculationFormEL = document.querySelector(".form");
const formErrorEl = document.querySelector(".form-error");

const asideTableInputEl = document.querySelector(".aside-table-input");
const asideTableEl = document.querySelector(".aside-table");
const btnSaveTable = document.querySelector(".btn--save-table");
const btnLoadTable = document.querySelector(".btn--load-table");

function loadTable() {
  const localStorageInfo = localStorage.getItem("tableValues");

  if (!localStorageInfo) {
    return;
  }

  const tableValues = JSON.parse(localStorageInfo);

  for (let i = 0; i < tableValues.length; i++) {
    addRow(tableValues[i]);
  }
}

function saveTable() {
  const cells = document.querySelectorAll(".aside-table-cell");
  const values = [];

  for (let i = 0; i < cells.length; i++) {
    values.push(cells[i].textContent);
  }

  localStorage.setItem("tableValues", JSON.stringify(values));
}

function editCell(cell) {
  const currentText = cell.textContent.trim();
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.onblur = function () {
    cell.textContent = input.value.trim() || currentText;
  };

  cell.innerHTML = "";
  cell.appendChild(input);

  input.focus();
}

function addRow(value) {
  if (!value) {
    return;
  }

  const newRow = asideTableEl.insertRow(asideTableEl.rows.length - 1);
  const newCell = newRow.insertCell(0);
  newCell.classList.add("aside-table-cell");
  newCell.textContent = value;
  newCell.setAttribute("onclick", "editCell(this)");
}

function addRowFromInput() {
  if (asideTableInputEl.value.trim() !== "") {
    const newRow = asideTableEl.insertRow(asideTableEl.rows.length - 1);
    const newCell = newRow.insertCell(0);
    newCell.classList.add("aside-table-cell");
    newCell.textContent = asideTableInputEl.value.trim();
    newCell.setAttribute("onclick", "editCell(this)");
  }

  asideTableInputEl.value = "";
}

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

function setBoldText() {
  const boldTextValue = localStorage.getItem("boldText");
  if (boldTextValue) {
    boldTextBoxEl.style.fontWeight = boldTextValue;
  }
}

btnLoadTable.addEventListener("click", function () {
  loadTable();
});

btnSaveTable.addEventListener("click", function () {
  saveTable();
});

boldTextBoxEl.addEventListener("focus", function () {
  if (checkBoxBoldText.checked) {
    boldTextBoxEl.style.fontWeight = "700";
    localStorage.setItem("boldText", "700");
  }
});

boldTextBoxEl.addEventListener("blur", function (e) {
  if (e.rangeOffset === 0) {
    return;
  }
  boldTextBoxEl.style.fontWeight = "400";
  localStorage.setItem("boldText", "400");
});

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
setBoldText();
swapContent();
rectAreaResultEl.textContent = calcRectArea(8, 5);
