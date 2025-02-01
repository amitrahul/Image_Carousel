const carouselContainer = document.querySelector(".carousel");
const slideWrapper = document.querySelector(".carousel__slides");
const slides = document.querySelectorAll(".carousel__slide");
const navdotWrapper = document.querySelector(".carousel__navdots");
const navdots = document.querySelectorAll(".carousel__navdots button");

const total_Slides = slides.length;
const total_slidesCloned = 1;
let slideWidth = slides[0].offsetWidth;
let spaceBtwSlides = Number(
  window
    .getComputedStyle(slideWrapper)
    .getPropertyValue("grid-column-gap")
    .slice(0, -2)
);

/*
 * computes the index of the slide currently shown from how much the slide wrapper is scrolled
 */
function index_of_CurrentSlide() {
  return Math.round(
    slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides) - total_slidesCloned
  );
}

/*
  * This is handling Nav dot click functionality.
 -> clicking each navigation dot will reveal its corresponding slide.
 */
function handleNavDotPositionSlide(index) {
  slideWrapper.scrollTo(
    (slideWidth + spaceBtwSlides) * (index + total_slidesCloned),
    0
  );
}

for (let i = 0; i < total_Slides; i++) {
  navdots[i].addEventListener("click", () => handleNavDotPositionSlide(i));
}
// for provding smooth behaviour, for infinitely-scrolling.
slideWrapper.classList.add("smooth-scroll");

/*
 * it applies the ".is-active" class to a navigation dot with the given index.
 */
function markNavdot(index) {
  navdots[index].classList.add("is-active");
  navdots[index].setAttribute("aria-disabled", "true");
}

/*
 * it runs markNavdot() for the one corresponding to the currently shown slide.
 */

function updateNavdot() {
  const c = index_slideCurrent();
  if (c < 0 || c >= total_Slides) return;
  markNavdot(c);
}

/*
 * reset navdot and mark it.
Every time the user scrolls the carousel, the scroll event fires, 
removing the is-active class from all the navigation dots and marking 
the one that corresponds to the current slide.
 */
slideWrapper.addEventListener("scroll", () => {
  navdots.forEach((navdot) => {
    navdot.classList.remove("is-active");
    navdot.setAttribute("aria-disabled", "false");
  });

  updateNavdot();
});

// mark the first navigation dot upon the page loading.
markNavdot(0);
slideWrapper.classList.add("smooth-scroll");

// for Responsive design
window.addEventListener("resize", () => {
  slideWidth = slides[0].offsetWidth;
  spaceBtwSlides = Number(
    window
      .getComputedStyle(slideWrapper)
      .getPropertyValue("grid-column-gap")
      .slice(0, -2)
  );
});
