import { makeDOM } from "../../util/makeDOM.js";

const createStar = ($container) => {
  const starRatingContainerEl = makeDOM("div", {
    className: "star-rating-container",
  });
  $container.appendChild(starRatingContainerEl);

  const $starRatingContainer = $container.querySelector(
    ".star-rating-container"
  );
  const dataMaxRating = $container.getAttribute("data-max-rating");

  for (let i = 0; i < dataMaxRating; i++) {
    const iEl = makeDOM("i", {
      className: "bx bxs-star",
    });

    $starRatingContainer.appendChild(iEl);
  }
};

const onHoverStar = ($container) => {
  const $bxBxsStar = $container.querySelectorAll(".bx.bxs-star");

  // hover
  for (let i = 0; i < $bxBxsStar.length; i++) {
    $bxBxsStar[i].addEventListener("mouseover", () => {
      for (let j = 0; j <= i; j++) {
        $bxBxsStar[j].classList.add("hovered");
      }
    });

    $bxBxsStar[i].addEventListener("mouseout", () => {
      for (let j = 0; j <= i; j++) {
        $bxBxsStar[j].classList.remove("hovered");
      }
    });
  }
};

const onClickStar = ($container) => {
  const $bxBxsStar = $container.querySelectorAll(".bx.bxs-star");

  for (let i = 0; i < $bxBxsStar.length; i++) {
    const ratingChangeEvent = new CustomEvent("rating-change", {
      detail: i + 1,
    });

    $bxBxsStar[i].addEventListener("click", () => {
      for (let j = 0; j <= i; j++) {
        $bxBxsStar[j].classList.add("selected");
        $container.dispatchEvent(ratingChangeEvent);
      }
    });

    $bxBxsStar[i].addEventListener("click", () => {
      for (let j = i + 1; j < $bxBxsStar.length; j++) {
        $bxBxsStar[j].classList.remove("selected");
      }
    });
  }
};

const StarRating = ($container) => {
  const cssFile = document.createElement("link");
  cssFile.rel = "stylesheet";
  cssFile.href = "star-rating/theme.css";
  document.head.appendChild(cssFile);

  createStar($container);
  onHoverStar($container);
  onClickStar($container);
};

export default StarRating;
