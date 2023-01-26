const $urlShareButton = document.getElementById('url-share-button');

export const setShareURL = () => {
  $urlShareButton.onclick = () => {
    navigator.clipboard.writeText(location.href);
  };
};
