import { countUp } from './utils/countUp.js';
import { setTabMenu } from './module/tabMenu.js';
import { setSelectButton, setSelectCards, setResultContainer } from './module/selectCard.js';
import { setMbtiSection } from './module/mbtiSection.js';
import { setShareURL } from './module/urlShare.js';

const data = {
  participate: 1000,
};

const $participate = document.getElementById('participate-number');
countUp($participate, data.participate, 5);

setTabMenu();

setSelectCards();
setSelectButton();

setResultContainer();

setMbtiSection();

setShareURL();
