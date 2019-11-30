const _$ = el => document.querySelector(el); //My own jQuery super-lite function
const _$All = el => document.querySelectorAll(el);

const App = _$("#app");
const Hero = _$(".hero");
const Nav = _$("nav");
const faithful = _$("#faithful");
const _right = _$("#_right");
const root = document.documentElement;
const cta = _$(".cta-btn");

const downContainer = _$(".down-container");
const downButton = _$(".fa-angle-down");
const sect1 = _$(".sect-1");
const galleryImages = _$All(".gallery-slide");
const galleryRightButton = _$(".gallery__btn--right");
const galleryLeftButton = _$(".gallery__btn--left");
const galleryContainer = _$(".gallery-container");
const heroOptions = {
  rootMargin: "-360px 0px 0px 0px"
};

// if backdrop blur is not supportted opacity is adjust to match nav menu
if (!CSS.supports("backdrop-filter", "blur()")) {
  root.style.setProperty("--nav-bg", "rgba(255, 255, 255, 0.95)");
}

galleryImages[0].classList.add("current-slide");

function setSlideWidths() {
  let slideWidth = galleryImages[0].getBoundingClientRect().width;
  galleryImages.forEach((img, i) => {
    let current = img.style.left;
    img.style.left = `${slideWidth * i}px`;
  });
}

//Initialize Slide widths
setSlideWidths();

window.addEventListener("resize", () => {
  console.log("window-resized");
  setSlideWidths();
  galleryContainer.style.transform = `translateX(-${
    _$(".current-slide").style.left
  })`;
});

galleryImages[0].classList.add("current-slide");

function moveSlide(container, pos, current, pending) {
  container.style.transform = `translateX(-${pos})`;
  current.classList.remove("current-slide");
  pending.classList.add("current-slide");
}

function animateRight() {
  let current = _$(".current-slide");
  let nextSlide = current.nextElementSibling;
  if (!nextSlide) {
    nextSlide = galleryContainer.children[0];
  }
  let amountToMove = nextSlide.style.left;
  moveSlide(galleryContainer, amountToMove, current, nextSlide);
}

function animateLeft() {
  let current = _$(".current-slide");
  let previousSlide = current.previousElementSibling;
  if (!previousSlide) {
    previousSlide =
      galleryContainer.children[galleryContainer.children.length - 1];
  }
  let amountToMove = previousSlide.style.left;
  moveSlide(galleryContainer, amountToMove, current, previousSlide);
}

galleryRightButton.addEventListener("click", () => {
  animateRight();
});

galleryLeftButton.addEventListener("click", () => {
  animateLeft();
});

//To animate the navbar on scroll and the slogan animation
const heroObserver = new IntersectionObserver((entries, heroObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      Nav.classList.add("scrolling");
      downContainer.classList.add("hidden");
      downButton.classList.add("hidden");
      cta.classList.add("visible");
      faithful.classList.remove("fade1");
      _right.classList.remove("fade2");
    } else {
      Nav.classList.remove("scrolling");
      downContainer.classList.remove("hidden");
      downButton.classList.remove("hidden");
      cta.classList.remove("visible");
      faithful.classList.add("fade1");
      _right.classList.add("fade2");
    }
  });
}, heroOptions);

heroObserver.observe(Hero);
