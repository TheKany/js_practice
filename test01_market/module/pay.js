import { getCartInfo } from './cartToggleBtn.js';

const $originalPrice = document.getElementById('original-price');
const $discountPrice = document.getElementById('discount-price');
const $deliveryPrice = document.getElementById('delivery-price');
const $totalPrice = document.getElementById('total-price');

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

export const setPayInfo = () => {
  // 1. 장바구니에서 물품 정보 얻어오기
  // 2. 물품 정보들을 순회하면서 가격정보 계산
  // 3. DOM.innerHTML 할당
  const cartInfoList = getCartInfo();

  let deliveryPrice = 0;
  let totalPrice = 0;

  const { originalPrice, discountPrice } = cartInfoList.reduce(
    (prev, curr) => ({
      originalPrice: prev.originalPrice + curr.originalPrice,
      discountPrice: prev.discountPrice + (curr.originalPrice - curr.discountPrice),
    }),
    {
      originalPrice: 0,
      discountPrice: 0,
    }
  );

  const payPrice = originalPrice + discountPrice;
  if (payPrice >= DELIVERY_FREE_PRICE) {
    deliveryPrice = 0;
  } else {
    deliveryPrice = DELIVERY_PRICE;
  }

  totalPrice = payPrice + deliveryPrice;

  $originalPrice.innerHTML = `${originalPrice.toLocaleString()}원`;
  $discountPrice.innerHTML = discountPrice ? `-${discountPrice.toLocaleString()}원` : '0원';
  $deliveryPrice.innerHTML = deliveryPrice ? `${deliveryPrice.toLocaleString()}원` : '0원';
  $totalPrice.innerHTML = `${totalPrice.toLocaleString()}원`;
};
