/** mbti 섹션
 * 1. 질문이 표시 yes / no 버튼
 * 2. yes: +1 / NO: +0
 * 3. 버튼을 눌렀을 때 다음 질문이 표시
 * 4. N개의 질문이 끝나면 "잠시 기다려주세요..." 안내문 출력 (3초)
 * 5. 분석된 결과가 result에 뜸
 */

const $mbtiQuestion = document.getElementsByClassName('mbti-question')[0];
const [yesButton, noButton] = document.getElementsByClassName('mbti-select')[0].children;
const [$mbtiSelect, $mbtiContainerPending, $mbtiContainerResult] = document.getElementsByClassName('mbti-container');
const $mbtiResult = document.getElementsByClassName('mbti-result');
const $mbtiDescription = document.getElementsByClassName('mbti-description')[0];
const $mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0];
const mbtiQuestionList = [
  // "친구와의 약속이 취소됐을 때 나는",
  // "예전에 한 번 먹어본 과자에 대해서 나는",
  // "내 최애 과자가 맛없다고 소문이 났을 때 나는",
  // "시험기간에 나는",
  // "사람이 많은 길거리에서 넘어졌을 때 나는",
  // "내 최애 과자에 대해 설명할 때 나는",
  // "친구와 사이좋게 과자를 나눠먹던 중 한 조각이 남았을 때 나는",
  // "휴가 계획을 짤 때 나는",
  // "오랜만에 정말 맛있는 과자를 찾았을 때 나는",
  // "과자를 고를 때 나는",
  // "조별과제를 할 때 나는",
  // "친구가 우리집에 놀러와서 물건을 찾을 때 나는"
  '짠 과자가 단 과자보다 좋다.',
  '봉지 과자가 박스 과자보다 좋다.',
  '과자를 뜯으면 한 번에 다 먹는다.',
];

const getMbtiResult = (resultValue) => {
  switch (resultValue) {
    case 0:
      return {
        title: '과자 어린이 (A 유형)',
        description: '과자 어린이 A유형 설명',
      };
    case 1:
      return {
        title: '과자 초심자 (B 유형)',
        description: '과자 초심자 B유형 설명',
      };
    case 2:
      return {
        title: '과자 중급자 (C 유형)',
        description: '과자 중급자 c유형 설명',
      };
    case 3:
    default:
      return {
        title: '과자 고수 (D 유형)',
        description: '과자 고수 d유형 설명',
      };
  }
};

// mbti 질문 갯수
let currentRound = 0;
let resultValue = 0; // 0 ~ mbtiQuestionList.length
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
  $mbtiContainerPending.style.display = 'block';
  $mbtiSelect.style.display = 'none';

  setTimeout(() => {
    $mbtiContainerPending.style.display = 'none';
    $mbtiContainerResult.style.display = 'block';
  }, 3000);
};

const initialize = () => {
  // 초기화
  currentRound = 0;
  resultValue = 0;
  $mbtiSelect.style.display = 'block';
  $mbtiContainerPending.style.display = 'none';
  $mbtiContainerResult.style.display = 'none';
};

const setResultSection = () => {
  const { title, description } = getMbtiResult(resultValue);
  $mbtiResult.innerHTML = title;
  $mbtiDescription.innerHTML = description;

  $mbtiRetryButton.onclick = initialize;
};

export const setMbtiSection = () => {
  // 질문 표시
  // 버튼이 눌렸을 때 다음 질문으로 넘어감

  if (currentRound === maxRound) {
    // 끝
    setPendingSection();
    setResultSection();
    return;
  }

  $mbtiSelect.style.display = 'block';

  $mbtiQuestion.innerHTML = mbtiQuestionList[currentRound++];
  yesButton.onclick = () => {
    resultValue++;
    setMbtiSection();
  };
  noButton.onclick = () => {
    setMbtiSection();
  };
};
