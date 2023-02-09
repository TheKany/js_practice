const StarRating = ($container) => {
  const cssFile = document.createElement("link");
  cssFile.rel = "stylesheet";
  cssFile.href = "star-rating/theme.css";
  document.head.appendChild(cssFile);
};

export default StarRating;
