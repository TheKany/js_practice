/*
 * dom: innerHTML이 갱신될 노드
 * target: 목표 숫자
 * second: 총 몇 초가 걸릴지
 * term: 몇 초마다 함수 실행할 지
 * countTerm: 한 term에 몇이 증가해야 하는지
 */

/**
 * target / second => 1초마다 증가할 값
 *
 * target: 900
 * second: 9
 * term: 0.1
 * 1초 => 100 (term / second)
 * term초 => 100 * 0.1 (target / second) * (term / 1000)
 */
export const countUp = (dom, target, second, term = 15) => {
  if (
    !dom ||
    isNaN(Number(target)) ||
    isNaN(Number(second)) ||
    isNaN(Number(term))
  )
    return;

  let nowNum = 0;
  const countTerm = Math.floor((target / second) * (term / 1000));

  const timerID = setInterval(() => {
    if (nowNum >= target) {
      nowNum = target;
      clearInterval(timerID);
      return;
    }

    nowNum += countTerm;
    dom.innerHTML = `${nowNum.toLocaleString()}`;
  }, term);
};
