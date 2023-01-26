import { MOUSE_CONTROL_SCORE_KEY } from "../constants/localStorage.js";
import { makeDOM } from "../utils/dom.js";
import { handleModalOpen } from "../utils/modal.js";
import {
  endGame,
  getNowTime,
  getResultTime,
  isGameStart,
  setTimer,
  startTimer,
} from "../utils/timer.js";

let gridBoxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const $gameField = document.getElementById("game-field");

export const initMouseControlGame = () => {
  startBoxDOM.innerHTML = "시작";
  endBoxDOM.innerHTML = "끝";
  gridBoxDOMList.forEach((gridBoxDOM) => {
    gridBoxDOM.style.backgroundColor = "transparent";
  });
  endGame();
  setTimer(0);
};

const handleSuccessGame = () => {
  endGame();
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTime(),
  });

  const nowSpendTime = getNowTime();
  const currentSpendTime = localStorage.getItem(MOUSE_CONTROL_SCORE_KEY);
  if (!currentSpendTime || currentSpendTime > nowSpendTime) {
    localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowSpendTime);
  }

  setTimer(0);
};

const handleFailedGame = () => {
  console.log("실패");
  endGame();
  // 실패 모달 구현
  setTimer(0);
};

export const setBoxDOM = ({
  row, // 행이 몇 갠지
  col, // 열이 몇 갠지
  start, // 시작 위치 [row, col]
  end, // 종료 위치 [row, col]
  walls, // 벽의 위치들 [row, col][]...
}) => {
  const $controlBoxContainer = makeDOM("div", {
    id: "control-box-container",
    onmouseleave: () => {
      if (!isGameStart) return;
      handleFailedGame();
    },
  });

  $controlBoxContainer.style.display = "grid";
  $controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
  $controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const {
        type,
        className,
        innerHTML = "",
        onmouseover,
      } = (function () {
        if (i === start[0] && j === start[1]) {
          return {
            type: "start",
            className: "control-box start",
            innerHTML: "시작",
            onmouseover: (e) => {
              startTimer(handleFailedGame);
              e.target.innerHTML = "";
            },
          };
        }

        if (i === end[0] && j === end[1]) {
          return {
            type: "end",
            className: "control-box end",
            innerHTML: "끝",
            onmouseover: (e) => {
              if (!isGameStart) return;
              e.target.innerHTML = "";
              handleSuccessGame();
            },
          };
        }

        for (let wall of walls) {
          if (i === wall[0] && j === wall[1]) {
            return {
              type: "wall",
              className: "control-box wall",
              onmouseover: () => {
                if (!isGameStart) return;
                handleFailedGame();
              },
            };
          }
        }

        return {
          type: "normal",
          className: "control-box",
          onmouseover: (e) => {
            if (!isGameStart) return;
            e.target.style.backgroundColor = "linen";
          },
        };
      })();

      const gridBoxDOM = makeDOM("div", {
        className,
        innerHTML,
        id: `box-${i}-${j}`,
        onmouseover,
      });

      switch (type) {
        case "start":
          startBoxDOM = gridBoxDOM;
          break;
        case "end":
          endBoxDOM = gridBoxDOM;
          break;
        case "wall":
          wallBoxDOMList.push(gridBoxDOM);
          break;
        default:
          gridBoxDOMList.push(gridBoxDOM);
      }

      $controlBoxContainer.appendChild(gridBoxDOM);
    }
  }

  $gameField.appendChild($controlBoxContainer);
};
