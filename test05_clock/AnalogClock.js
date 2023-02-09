import { makeDOM } from '../util/makeDOM.js';

const makeMinutes = ($container) => {
  for (let i = 1; i < 13; i++) {
    const timeDOM = makeDOM('div', {
      className: 'time',
      innerHTML: '|',
    });
    timeDOM.classList.add(`time${i}`);
    $container.appendChild(timeDOM);
  }
};

const AnalogClock = ($container) => {
  const $handHour = makeDOM('div', {
    className: 'hand hour',
  });

  const $handMinute = makeDOM('div', {
    className: 'hand minute',
  });

  const $handSecond = makeDOM('div', {
    className: 'hand second',
  });

  $container.appendChild($handHour);
  $container.appendChild($handMinute);
  $container.appendChild($handSecond);

  makeMinutes($container);

  // 시, 분, 초 설정정
  const setClock = () => {
    const currentTime = new Date();

    const second = currentTime.getSeconds();
    const degS = second * (360 / 60);
    $handSecond.style.transform = `rotate(${degS}deg)`;

    const min = currentTime.getMinutes();
    const degM = min * (360 / 60);
    $handMinute.style.transform = `rotate(${degM}deg)`;

    const hour = currentTime.getHours();
    const degH = hour * (360 / 12) + min * (360 / 12 / 60);
    $handHour.style.transform = `rotate(${degH}deg)`;
  };

  setInterval(setClock, 1000);
  setClock();
};

export default AnalogClock;
