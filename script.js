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
let scrollTimer;

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

/**
** infinite-scrolling :-
 Duplicating slides :- attaches the cloned first slide as the last in the series of slides
*/
const firstSlideClone = slides[0].cloneNode(true);
firstSlideClone.setAttribute("aria-hidden", "true");
slideWrapper.append(firstSlideClone);

// cloned last slide as the first in the series of slides : -
const lastSlideClone = slides[total_Slides - 1].cloneNode(true);
lastSlideClone.setAttribute("aria-hidden", "true");
slideWrapper.prepend(lastSlideClone);

const rewindScroll = () => {
  slideWrapper.classList.remove("smooth-scroll");
  setTimeout(() => {
    slideWrapper.scrollTo(
      (slideWidth + spaceBtwSlides) * total_slidesCloned,
      0
    );
    slideWrapper.classList.add("smooth-scroll");
  }, 100);
};

const forwardScroll = () => {
  slideWrapper.classList.remove("smooth-scroll");
  setTimeout(() => {
    slideWrapper.scrollTo(
      (slideWidth + spaceBtwSlides) * (total_Slides - 1 + total_slidesCloned),
      0
    );
    slideWrapper.classList.add("smooth-scroll");
  }, 100);
};

/**
 * used setTimeout() and clearTimeout() so that don't run the code 
 for the instant scrolling while the user keeps scrolling the carousel.

 * Then, when the carousel is scrolled forward to reveal about half of the 
 cloned first slide, the rewindScrolls() gets executed. Similarly, when the carousel 
 is scrolled backward to reveal about half of the cloned last slide, the forwardScroll() gets executed.

 */
slideWrapper.addEventListener("scroll", () => {
  navdots.forEach((navdot) => {
    navdot.classList.remove("is-active");
    navdot.setAttribute("aria-disabled", "false");
  });

  // to cancel if scroll continues
  if (scrollTimer) clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    if (
      slideWrapper.scrollLeft <
      (slideWidth + spaceBtwSlides) * (total_slidesCloned - 1 / 2)
    ) {
      forwardScroll();
    }

    if (
      slideWrapper.scrollLeft >
      (slideWidth + spaceBtwSlides) * (total_slidesCloned - 1 / 2)
    ) {
      rewindScroll();
    }
  }, 1000);
});

handleNavDotPositionSlide(0);
markNavdot(0);
slideWrapper.classList.add("smooth-scroll");

//carousel autoplay :-
// executing this function repeatedly,implemented the autoplaying feaeture.
const nextSlide = () => {
  handleNavDotPositionSlide(index_of_CurrentSlide() + 1);
};

const pauseTimer = 1500;
let intervalTime;

// it starts autoplaying the carousel.
const playCarouselSlide = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  clearInterval(intervalTime);
  slideWrapper.setAttribute("aria-live", "off");
  intervalTime = setInterval(nextSlide, pauseTimer);
};

const stopCarouselSlide = () => {
  clearInterval(intervalTime);
  slideWrapper.setAttribute("aria-live", "polite");
};

// Intersection Observer
// start autoplay is when the carousel fully enters into the user’s viewport.
const observer = new IntersectionObserver(callback, { threshold: 0.99 });

function callback() {
  enteries.forEach((entry) => {
    if (entry.isIntersecting) {
      playCarouselSlide();
    } else {
      stopCarouselSlide();
    }
  });
}

/*
* Togging autoplay for mouse users :-
used pointerenter and pointerleave event listeners and attach them to the carousel container.
 */
carouselContainer.addEventListener("pointerenter", () => {
  stopCarouselSlide();
});

carouselContainer.addEventListener("pointerleave", () => {
  playCarouselSlide();
});
