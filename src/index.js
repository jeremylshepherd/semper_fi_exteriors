// import './styles.css';
const _$ = el => document.querySelector(el);
const _$All = el => document.querySelectorAll(el);

const App = _$("#app");
const Hero = _$(".hero");
const Nav = _$("nav");
const faithful = _$("#faithful");
const _right = _$("#_right");
const root = document.documentElement;
const cta = _$(".cta-btn");
function getViewPort() {
  return Math.max(root.clientWidth, window.innerWidth || 0);
}

let w = getViewPort();

const downContainer = _$(".down-container");
const downButton = _$(".fa-angle-down");
const sect1 = _$(".sect-1");
const galleryImages = _$All(".gallery-img");
const heroOptions = {
  rootMargin: "-360px 0px 0px 0px"
};

// if backdrop blur is not supportted opacity is adjust to match nav menu
if (!CSS.supports("backdrop-filter", "blur()")) {
  root.style.setProperty("--nav-bg", "rgba(255, 255, 255, 0.95)");
}

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

// const vp = `<div id="modal" style="display:flex;align-items:center;justify-content:center;position: fixed; top:0;bottom:0;left:0;right:0;background-color:rgba(255, 255, 255, 0.25);color:black"><h1>${w}</h1></div>`;
// App.innerHTML += vp;

// window.addEventListener('resize', e => {
//   _$('#modal h1').innerText = getViewPort();
// });

heroObserver.observe(Hero);
