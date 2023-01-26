// 1. 장바구니에 있는 물품 정보 가져오기
// 2. 물품 정보 - productList와 연결
// 3. section 아래에 cart-pay-container 앞에 삽입하기

import { CART_COOKIE_KEY } from './constants/cart.js';
import { getCartInfo } from './module/cartToggleBtn.js';
import { setPayInfo } from './module/pay.js';
import { getProductList } from './module/productList.js';
import { makeDOM } from './utils/dom.js';

const sectionDOM = document.getElementsByTagName('section')[0];
const cartPayContainerDOM = document.getElementById('cart-pay-container');

const cartInfo = getCartInfo();

const reloadPage = () => location.reload();

if (cartInfo.length < 1) {
  const noticeDOM = makeDOM('div', {
    className: 'product-list-con',
    innerHTML: '장바구니에 상품이 없습니다.',
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo, reloadPage);
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM);
}

const cartAllDeleteBtn = document.getElementById('remove-all-button');
cartAllDeleteBtn.onclick = () => {
  localStorage.removeItem(CART_COOKIE_KEY);
  location.reload();
};

setPayInfo();
