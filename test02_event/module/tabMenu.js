const $anchorToSelect = document.getElementById('anchor-to-select');
const $anchorToResultt = document.getElementById('anchor-to-result');
const $anchorToMbti = document.getElementById('anchor-to-mbti');

const $participateSection = document.getElementById('participate-section');
const $resultSection = document.getElementById('result-section');
const $mbtiSection = document.getElementById('mbti-section');

const windiowScrollHandler = (dom, targetDOM) => {
  dom.onclick = () => {
    const scrollTargetY = targetDOM.offsetTop;
    window.scroll({
      top: scrollTargetY,
      left: 0,
      behavior: 'smooth',
    });
  };
};

export const setTabMenu = () => {
  windiowScrollHandler($anchorToSelect, $participateSection);
  windiowScrollHandler($anchorToResultt, $resultSection);
  windiowScrollHandler($anchorToMbti, $mbtiSection);
};
