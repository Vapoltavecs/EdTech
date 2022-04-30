const cookieModal = document.querySelector(".cookie-modal");
const cookieModalBtn = cookieModal.querySelector(".cookie-modal__btn");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__menu-mobile");
const infoBtns = document.querySelectorAll(".team__info");

document.addEventListener("DOMContentLoaded", () => {
  const animate = (target, direction, duration = 300) =>
    target.animate(
      [
        { transfrom: "translateX(-50%) translateY(100%)", opacity: 0 },
        { transfrom: "translateX(-50%) translateY(0%)", opacity: 1 },
      ],
      { duration, direction, fill: "forwards" }
    );
  setTimeout(() => {
    cookieModal.classList.add("active");
    animate(cookieModal);
  }, 6000);
  cookieModalBtn.addEventListener("click", () => {
    animate(cookieModal, "reverse", 500).addEventListener("finish", () =>
      cookieModal.classList.remove("active")
    );
  });
  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
  });
  const scrollToAnchor = (e) => {
    const { target } = e;
    const { href } = target;
    if (href) {
      const isAnchor = href.indexOf("#");
      if (isAnchor !== -1) {
        console.log(href);
        e.preventDefault();
        const id = href.substring(isAnchor + 1);
        const elem = document.getElementById(id);
        window.scrollTo({
          behavior: "smooth",
          top: elem.getBoundingClientRect().top + 300 + document.body.scrollTop,
        });
      }
    }
  };
  window.addEventListener("click", scrollToAnchor);
});

class Slider {
  constructor(params, selector) {
    this.keyframes = params.effects;
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll(".team__slide");

    this.prevEl = document.querySelectorAll(".team__prev");

    this.nextEl = document.querySelectorAll(".team__next");
    this._currentSlide = 0;
  }

  next() {
    const prevSlide = this.slides[this._currentSlide];
    if (this._currentSlide >= this.slides.length - 1) this._currentSlide = -1;
    this._currentSlide++;
    const currentSlide = this.slides[this._currentSlide];

    currentSlide.classList.add("active");
    this.toggleAnim(currentSlide, prevSlide).addEventListener("finish", () =>
      prevSlide.classList.remove("active")
    );
  }
  prev() {
    const prevSlide = this.slides[this._currentSlide];
    if (this._currentSlide <= 0) this._currentSlide = this.slides.length;
    this._currentSlide--;
    const currentSlide = this.slides[this._currentSlide];

    currentSlide.classList.add("active");
    this.togglePrevAnim(prevSlide, currentSlide).addEventListener(
      "finish",
      () => prevSlide.classList.remove("active")
    );
  }
  toggleAnim(show, hide, direction) {
    const showKeyframes = [{ left: "100%" }, { left: "0%" }];
    const hideKeyframes = [
      { left: "0%" },
      { left: "10%", offset: 0.1 },
      { left: "-100%" },
    ];
    const options = {
      duration: 500,
      direction,
      fill: "forwards",
    };
    show.animate(this.keyframes || showKeyframes, {
      ...options,
      easing: "ease-in-out",
    });
    return hide.animate(hideKeyframes, { ...options });
  }
  togglePrevAnim(show, hide, direction) {
    const showKeyframes = [
      { left: "0%" },
      { left: "-10%", offset: 0.1 },
      { left: "100%" },
    ];
    const hideKeyframes = [{ left: "-100%" }, { left: "0%" }];
    const options = {
      duration: 500,
      direction,
      fill: "forwards",
    };
    show.animate(this.keyframes || showKeyframes, {
      ...options,
      easing: "ease-in-out",
    });
    return hide.animate(hideKeyframes, { ...options });
  }
  init() {
    this.slides[0].classList.add("active");

    this.nextEl?.forEach((el) =>
      el.addEventListener("click", this.next.bind(this))
    );
    this.prevEl?.forEach((el) =>
      el.addEventListener("click", this.prev.bind(this))
    );
  }
}

const slider = new Slider({}, ".team__slider");
slider.init();

infoBtns.forEach((el) => {
  el.addEventListener("click", (e) => {
    const modal = el.querySelector(".team__modal");
    modal.classList.toggle("active");
    modal.animate(
      [
        { transfrom: "translateY(30%)", opacity: 0 },
        { transfrom: "translateY(0%)", opacity: 1 },
      ],
      {
        duration: 300,
        fill: "forwards",
      }
    );
  });
});
