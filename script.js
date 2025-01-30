const carouselContainer = document.querySelector(".carousel");
const slideWrapper = document.querySelector(".carousel__slides");
const slides = document.querySelectorAll(".carousel__slide");
const navdotWrapper = document.querySelector(".carousel__navdots");
const navdots = document.querySelectorAll(".carousel__navdots button");

const n_slides = slides.length;
const n_slidesCloned = 1;
let slideWidth = slides[0].offsetWidth;
let spaceBtwSlides = Number(
  window
    .getComputedStyle(slideWrapper)
    .getPropertyValue("grid-column-gap")
    .slice(0, -2)
);

function index_slideCurrent() {
  return Math.round(
    slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides) - n_slidesCloned
  );
}

function goto(index) {
  slideWrapper.scrollTo(
    (slideWidth + spaceBtwSlides) * (index + n_slidesCloned),
    0
  );
}
for (let i = 0; i < n_slides; i++) {
  navdots[i].addEventListener("click", () => goto(i));
}

slideWrapper.classList.add("smooth-scroll");

function markNavdot(index) {
  navdots[index].classList.add("is-active");
  navdots[index].setAttribute("aria-disabled", "true");
}

function updateNavdot() {
  const c = index_slideCurrent();
  if (c < 0 || c >= n_slides) return;
  markNavdot(c);
}
