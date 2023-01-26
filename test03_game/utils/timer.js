const MAX_TIME = 10;
const $gameTime = document.getElementsByClassName('game-time')[0];

export let isGameStart = false;
let time = 0;
let timerID = null;

const convertToNum = (num) => {
  const stringNum = `${num}`;

  if (stringNum.length === 1) {
    return `0${stringNum}`;
  } else {
    return stringNum;
  }
};

export const getTimeString = (time) => {
  const hour = Math.floor(time / 3600);
  time = time - hour * 3600;

  const minute = Math.floor(time / 60);
  time = time - minute * 60;

  const second = time;

  return `
  ${convertToNum(hour)}:${convertToNum(minute)}:${convertToNum(second)}`;
};

export const startTimer = (onTimeOver) => {
  isGameStart = true;

  timerID = setInterval(() => {
    time++;
    $gameTime.innerHTML = getTimeString(time);

    if (MAX_TIME < time) {
      onTimeOver?.();
      clearInterval(timerID);
    }
  }, 1000);
};

export const endGame = () => {
  isGameStart = false;
  if (timerID == null) {
    return;
  }

  clearInterval(timerID);
};

export const setTimer = (initTime) => {
  time = initTime;
  $gameTime.innerHTML = getTimeString(time);
};

export const getResultTime = () => {
  return getTimeString(time);
};

export const getNowTime = () => {
  return time;
};
