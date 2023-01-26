import { ARRROW_SPEED_GAME } from './constants/localStorage.js';
import { makeDOM } from './utils/dom.js';
import { handleModalClose, handleModalOpen } from './utils/modal.js';
import { endGame, getNowTime, getResultTime, setTimer, startTimer } from './utils/timer.js';

const MAX_ARROW = 8;
const MAX_ROUND = 3;

let arrowDOMList = [];
let currentIdx = 0;
let round = 1;

const $arrowField = document.querySelector('#arrow-field');

const clearArrowDOM = () => {
  arrowDOMList.forEach((arrowDOM) => {
    arrowDOM.remove();
  });

  arrowDOMList = [];
};

const setArrowDOM = () => {
  /**
   * 1. 기존에 존재하고 있던 arrowDOM이 있으면 삭제
   * 2. 새로운 DOM을 만들어서 세팅
   * 3. 랜덤으로 왼쪽, 오른쪽을 결정
   */
  clearArrowDOM();

  for (let i = 0; i < MAX_ARROW; i++) {
    const direction = Math.random() < 0.5 ? 'left' : 'right';
    const arrowDOM = makeDOM('span', {
      className: `arrow arrow-${direction}`,
      innerHTML: direction === 'left' ? '&lt;' : '&gt',
    });

    arrowDOMList.push(arrowDOM);
    $arrowField.appendChild(arrowDOM);
  }
};

const handleSuccessGame = () => {
  endGame();
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTime(),
  });

  const nowSpendTime = getNowTime();
  const currentSpendTime = localStorage.getItem(ARRROW_SPEED_GAME);
  if (!currentSpendTime || currentSpendTime > nowSpendTime) {
    localStorage.setItem(ARRROW_SPEED_GAME, nowSpendTime);
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

const setKeyboardEvent = () => {
  const handleCorrect = () => {
    arrowDOMList[currentIdx].style.display = 'none';
    currentIdx++;

    if (currentIdx === MAX_ARROW) {
      if (round === MAX_ROUND) {
        // 게임 종료
        handleSuccessGame();
        return;
      }

      currentIdx = 0;
      setArrowDOM();
      round++;
    }
  };
  window.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.code)) return;

    const isStart = currentIdx === 0 && round === 1;
    if (isStart) {
      startTimer(handleFailedGame);
    }

    const isLeft = arrowDOMList[currentIdx].innerHTML === '&lt;';

    if (isLeft && e.code === 'ArrowLeft') {
      handleCorrect();
    }

    if (!isLeft && e.code === 'ArrowRight') {
      handleCorrect();
    }
  });
};

const onArrowSpeedGameEnd = () => {
  endGame();
  setTimer(0);
  currentIdx = 0;
  round = 1;
  setArrowDOM();
};

const initialize = () => {
  const [$headerRetryButton, $modalRetryButton] = document.querySelectorAll('.retry-button');

  $headerRetryButton.onclick = () => {
    handleModalClose(onArrowSpeedGameEnd);
  };

  $modalRetryButton.onclick = () => {
    handleModalClose(onArrowSpeedGameEnd);
  };
};

setArrowDOM();
setKeyboardEvent();
initialize();
