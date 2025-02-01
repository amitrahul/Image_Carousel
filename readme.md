# 🌟 Image Carousel

A simple and accessible image carousel implemented using HTML, CSS, and JavaScript. This carousel allows users to navigate through images using previous/next buttons or by selecting navigation dots.

## 🚀 Features

- Responsive and accessible design
- Supports navigation via buttons and dots
- Smooth slide transitions
- ARIA attributes for better accessibility
- Easy to customize and extend
- Toggling autoplay for window resizing, touch device users, keyboard users, mouse users
- implement lazy loading with loading="lazy" for performance.

### Step-by-Step Implementation

#### 1. Approach :-

##### 1.HTML Structure :

- start with a container div with class "carousel" wraps the entire carousel.
- A div with class "carousel\_\_navdots home-page" section for dot indicators.
- Navigation buttons (.prev, .next) allow users to manually switch slides.
- Each slide has an "img" inside a "div" with class="carousel\_\_slide".
- Navigation dots (button) allow users to jump between slides.
- role="group" tells screen readers that its child elements constitute a single slide as a whole.
- aria-label identifies each slide.
- aria - roledescription="slide" tells screen readers that the "div" element is a slide.
- aria-label tells screen readers that what purpose this group of buttons serves for.

##### 2. CSS for Styling and Animations: :

- Makes the carousel full-width.
- Adds padding to accommodate navigation dots.
- Uses flexbox to arrange slides in a row.
- Implements scroll-snap for smooth scrolling.
- Hides the scrollbar for a clean UI.
- Images scale properly with object-fit: cover.
- Positioned at the bottom for easy navigation.
- Buttons update dynamically using the .is-active class.
- Rounded buttons with hover effects.

##### 3. JavaScript Logic :

- first collect the components of the carousel.
- total_Slides is simply the number of slides in the carousel.
- total_slidesCloned will play a crucial role when we make the carousel infinitely-scrolling.
- slideWidth, is the width of each slide.
- spaceBtwSlides, is the width of whitespace between the pair of slides next to each other.
- index_slideCurrent() computes the index of the slide currently shown from how much the slide wrapper is scrolled.
- attached a click event handler to each navigation dot, handleNavDotPositionSlide function handles scroll the slide to particular position.
- markNavdot function applies the .is-activeclass to a navigation dot with the given index.
- updateNavdot function that runs markNavdot() for the one corresponding to the currently shown slide.
- used a scroll event handler to execute the updateNavdot() function, Every time the user scrolls the carousel, the scroll event fires, removing the is-active class from all the navigation dots and marking the one that corresponds to the current slide.
- for infinite scrolling behaviour attaches the cloned first slide as the last in the series of slides.
- Implemented rewindScroll() function and forwardScroll() function for scrolling the carousel.
- created a function to start autoplaying the carousel with the use of setInterval():
- for autoplay, playCarouselSlide(), stopCarouselSlide() functions has been implemented.
- IntersectionObserver features added for to start autoplay is when the carousel fully enters into the user’s viewport. It doesn’t make sense to autoplay the carousel when it’s not shown entirely to the user, autoplay should stop when part of the carousel goes outside the viewport.
- used pointerenter and pointerleave event listeners and attach them to the carousel container.
- keyboard users autoplay is used focus and blur event listeners.
- touchstart event fires whenever the user touches the carousel, in which case autoplay stops.

### 2. Design Choices

#### Responsiveness

- Used max-width: 800px and width: 80vw for a flexible layout.
- Applied object-fit: cover to ensure images scale properly.
- set the resize event handler to keep slideWidth and spaceBtwSlides updated.

#### Smooth Animations

- Navigation buttons have hover effects to improve UX.
- Dot indicators change color smoothly.
  User Experience Enhancements
- Infinite looping ensures smooth cycling of images.
- Keyboard navigation for accessibility.
- Touch support improves mobile usability.

### 3. Challenges & Solutions

#### 1. Lazy Loading Implementation

- Initially, images loaded all at once, increasing load time.
- Used the IntersectionObserver API to load images only when they are about to be visible.

#### 2. Handling Infinite Looping

- Initially, translating the slides caused a sudden jump when transitioning from the last image to the first.
- Duplicating slides, attaches the cloned first slide as the last in the series of slides and cloned last slide as the first in the series of slides.

#### 3. Preventing Autoplay Conflicts

- The autoplay function was conflicting with manual navigation.
- Stopped autoplay when a user interacts (clicks/swipes) and restarted it after inactivity.

#### 4. Touch Swipe Gestures

- Detecting swipe direction on mobile was challenging.
- add "touchstart" event listner and stop autoplay.

#### 5. Togging autoplay for keyboard users

- used focus and blur event listeners.
- option "true" is necessary to catch the focus/blur event fired by any element inside the carousel container.

### 4. Extra Features Implemented

#### ✅ Lazy Loading

- Improves performance by only loading images when they are about to appear.

#### ✅ Autoplay with Stop on Interaction

- Autoplay runs every 2.5 seconds but stops if the user interacts.

#### ✅ Infinite Loop

- Ensures the transition from last to first slide is seamless.

#### ✅ Touch Swipe for Mobile

- Users can swipe left/right to change slides.
