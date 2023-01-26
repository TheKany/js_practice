import { TOUCH_NUMBER_SCORE_KEY } from './constants/localStorage.js';
import { handleModalClose, handleModalOpen } from './utils/modal.js';
import { endGame, getNowTime, getResultTime, setTimer, startTimer } from './utils/timer.js';

const $numberButton = document.querySelectorAll('.number-button');
const maxNumId = $numberButton.length;
let currentNumId = 1;

const handleSuccessGame = () => {
  endGame();
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTime(),
  });

  const nowSpendTime = getNowTime();
  const currentSpendTime = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);
  if (!currentSpendTime || currentSpendTime > nowSpendTime) {
    localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowSpendTime);
  }
  setTimer(0);
};

const handleFailedGame = () => {
  endGame();
  handleModalOpen({
    isSuccess: false,
  });
  setTimer(0);
};

const setButtonDOM = () => {
  /**
   * 1. HTML 상에서 domList를 받아옴
   * 2. 순회하면서 dom의 위치를 랜덤으로 조정
   * 3. dom 클릭시 핸들러 등록
   */
  $numberButton.forEach((item) => {
    item.style.display = 'block';
    item.style.top = `${Math.floor(Math.random() * 100 * 0.9)}%`;
    item.style.left = `${Math.floor(Math.random() * 100 * 0.9)}%`;
    item.style.margin = '10';
    item.style.border = '1px solid black';
    item.style.backgroundcolor = 'blue';

    item.onclick = (e) => {
      const numId = Number(e.target.innerHTML);

      if (isNaN(numId)) return;
      if (numId !== currentNumId) return;

      e.target.style.display = 'none';

      if (numId === maxNumId) {
        handleSuccessGame();
        return;
      }

      if (numId === 1) {
        startTimer(handleFailedGame);
      }

      currentNumId++;
    };
  });

  /**
   * 1. 클릭한 숫자 찾아오기
   * 2. 숫자가 현재 클릭되어야하는 순서가 맞는 지 판단
   *    ㄴ 맞다면 해당 numberButton을 없앰
   *    ㄴ 아니라면 무시
   * 3. 1을 클릭할 경우 타이머 시작
   * 4. 10을 클릭할 경우 타이머 종료
   * 5.
   */
};

const initializeTouchNumberGame = () => {
  setTimer(0);
  endGame();
  setButtonDOM();
  currentNumId = 1;
};

const initialize = () => {
  const [$headerRetryButton, $modalRetryButton] = document.querySelectorAll('.retry-button');

  $headerRetryButton.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };

  $modalRetryButton.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };
};

setButtonDOM();
initialize();
