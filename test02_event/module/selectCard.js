import { appendChildren, makeDOM } from '../utils/dom.js';
import { SELECT_RESULT_KEY } from '../constants/result.js';

// JSOM => fetch: 서버에서 내려준다고 가정하거나, 데이터 양이 너무 많아서 코드에 작성하기 부담스러운 경우

const cardInfoList = [
  {
    id: 1,
    imgSrc: './public/assets/나쵸.jpeg',
    name: '나쵸',
    description: '나쵸',
  },
  {
    id: 2,
    imgSrc: './public/assets/초코꼬북칩.jpeg',
    name: '초코꼬북칩',
    description: '초코꼬북칩',
  },
  {
    id: 3,
    imgSrc: './public/assets/허니버터칩.jpeg',
    name: '허니버터칩',
    description: '허니버터칩',
  },
  {
    id: 4,
    imgSrc: './public/assets/홈런볼.jpeg',
    name: '홈런볼',
    description: '홈런볼',
  },
];

const $snackCardList = document.getElementsByClassName('snack-card-list')[0];
const $participateButton = document.getElementsByClassName('participate-button')[0];
const [$notYetContainer, $resultContainer] = document.getElementsByClassName('result-container');
const [, $resultImg, $resultName, $resultDescription, $reSelectButton] = $resultContainer.children;

const getSelectedCard = () => {
  return document.getElementsByClassName('select')[0];
};

const getCardID = (id) => {
  return document.getElementById(`select-${id}`);
};

const handleSelectCard = (cardId) => {
  // 선택된 카드를 표시하는 함수
  const originalSelectedCard = getSelectedCard();
  originalSelectedCard?.classList.remove('select');

  const newSelectedCard = getCardID(cardId);
  newSelectedCard?.classList.add('select');
};

const getSelectCardDOM = ({ id, imgSrc, name, description }) => {
  const snackCardDOM = makeDOM('button', {
    id: `select-${id}`,
    className: 'snack-card',
    onclick: () => handleSelectCard(id),
  });

  const imgDOM = makeDOM('img', {
    src: imgSrc,
    alt: name,
  });

  const descriptionContainerDOM = makeDOM('div', {
    className: 'snack-description',
  });

  const nameDOM = makeDOM('div', {
    innerHTML: name,
  });

  const descriptionDOM = makeDOM('div', {
    innerHTML: description,
  });

  appendChildren(descriptionContainerDOM, [nameDOM, descriptionDOM]);
  appendChildren(snackCardDOM, [imgDOM, descriptionContainerDOM]);

  return snackCardDOM;
};

export const setSelectCards = () => {
  // 기존의 snackCardList의 자식요소들을 받아온 뒤 순회하면서 없애주기
  const originalSnackCards = Object.assign([], $snackCardList.children);
  originalSnackCards.forEach((snackCard) => snackCard.remove());

  cardInfoList.forEach((cardInfo) => {
    const selectCardDOM = getSelectCardDOM(cardInfo);
    $snackCardList.appendChild(selectCardDOM);
  });

  // localStorage에서 이미 선택되어져 있는 과자id 가져와서 표시
  const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
  if (!cardId || isNaN(cardId)) return;

  handleSelectCard(cardId);
};

export const setSelectButton = () => {
  // 1. 버튼 DOM을 받아오기(participate-button)
  // 2. DOM에 onclick 이벤트 핸들러 등록
  //  ㄴ 1) 선택된 카드의 id를 찾기
  //  ㄴ 2) localStorage에 해당 id를 저장
  //  ㄴ 1번에서 선택된 카드의 id가 없다면, alert()
  $participateButton.onclick = () => {
    const selectedCard = getSelectedCard();
    if (!selectedCard) {
      alert('선택된 카드가 없습니다.');
      return;
    }
    const cartID = selectedCard.id.split('-')[1];
    localStorage.setItem(SELECT_RESULT_KEY, cartID);
    setResultContainer();
  };
};

const initialize = () => {
  // 과자 선택 초기화
  // 1. localStorage의 선택된 cardId를 삭제
  // 2. selectCard의 DOM을 다시 구성
  // 3. resultContainer의 DOM을 다시 구성

  localStorage.removeItem(SELECT_RESULT_KEY);
  setSelectCards();
  setResultContainer();

  // 다시 영역으로 돌아가는 기능
  const $selectSection = document.getElementById('participate-section');
  const scrollTargetY = $selectSection.offsetTop;

  window.scroll({
    top: scrollTargetY,
    left: 0,
    behavior: 'smooth',
  });
};

export const setResultContainer = () => {
  // result 구역에 선택된 과자를 노출시키는 함수
  // 과자 버튼 클릭 시, 페이지 랜딩 시 동작

  // 1. 선택된 아이디를 localStorage로부터 받아오기
  // 2. 선택된 아이디가 저장되어 있다면, notYetContainer를 없애고, resultContainer를 보여주기
  // 3. cardInfoList에서 선택된 카드의 정보를 찾아서 그 정보를 resultContainer에 연결시키기

  const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

  const isSelected = !!selectedId;
  if (!isSelected) {
    $notYetContainer.style.display = 'block';
    $resultContainer.style.display = 'none';
    return;
  }

  $notYetContainer.style.display = 'none';
  $resultContainer.style.display = 'flex';

  const cardInfo = cardInfoList.find((info) => info.id === selectedId);

  $resultImg.src = cardInfo.imgSrc;
  $resultImg.alt = cardInfo.name;
  $resultName.innerHTML = cardInfo.name;
  $resultDescription.innerHTML = cardInfo.description;

  // 다시하기 버튼 구현
  $reSelectButton.onclick = initialize;
};
