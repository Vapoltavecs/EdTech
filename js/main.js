const cookieModal = document.querySelector(".cookie-modal");
const cookieModalBtn = cookieModal.querySelector(".cookie-modal__btn");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__menu-mobile");

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
