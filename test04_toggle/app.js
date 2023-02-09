const $body = document.querySelector("body");
const $toggle = document.querySelector(".toggle.bx.bx-right-arrow-circle");
const $nav = document.querySelector("nav");

const isOpen = localStorage.getItem("isOpen");

window.onload = () => {
  $body.style.visibility = "visible";

  if (isOpen == "open") {
    $nav.classList.add("active");
  }
};

$toggle.addEventListener("click", () => {
  if (isOpen === "open") {
    localStorage.removeItem("isOpen");
    $body.classList.remove("preload");
    $nav.classList.remove("active");
  } else {
    localStorage.setItem("isOpen", "open");
    $body.classList.remove("preload");
    $nav.classList.add("active");
  }
});
