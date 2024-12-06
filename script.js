"use strict";

const slider = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".btn--slider-left");
  const btnRight = document.querySelector(".btn--slider-right");

  let currentSlide = 0;
  const endSlide = slides.length - 1;

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (currentSlide === endSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = endSlide;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
  };

  goToSlide(0);

  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowLeft":
        prevSlide();
        break;
      case "ArrowRight":
        nextSlide();
        break;
      default:
        break;
    }
  });
};

slider();
