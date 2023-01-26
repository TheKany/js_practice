import { makeDOM } from '../utils/dom.js';
import { CART_COOKIE_KEY } from '../constants/cart.js';

export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
const isInCart = ({ id }) => {
  // 현재 해당 상품이 장바구니 안에 있는지를 판단하여 결과를 반환
  const originalCartInfo = getCartInfo();
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === id);
};

const addCartInfo = (productInfo) => {
  // 장바구니에 해당 물품의 정보를 저장
  const originalCartInfo = getCartInfo();
  if (originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !== -1) return;

  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify([...originalCartInfo, productInfo]));
};

const removeCartInfo = ({ id }) => {
  // 장바구니에서 해당 물품의 정보를 삭제
  const originalCartInfo = getCartInfo();
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);

  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

export const getCartToggleBtn = (productInfo, removeCartCallback) => {
  let inCart = isInCart(productInfo);
  /* .product-card .product-image-con .cart-toggle-btn */
  const cartToggleBtn = makeDOM('button', {
    className: 'cart-toggle-btn',
    type: 'button',
    onclick: () => {
      if (inCart) {
        if (!confirm(`[${productInfo.name}]을 장바구니에서 삭제할까요?`)) return;

        removeCartInfo(productInfo);
        cartImage.src = 'public/assets/cart.png';
        removeCartCallback?.();
      } else {
        addCartInfo(productInfo);
        cartImage.src = 'public/assets/cartDisabled.png';

        const result = confirm('장바구니에 담았습니다. 장바구니 페이지로 이동할까요?');
        if (result) {
          location.href = '/test01_market/cart.html';
        }
      }

      inCart = !inCart;
    },
  });

  /* .product-card .product-image-con .cart-toggle-btn img */
  const cartImage = makeDOM('img', {
    className: 'cart-image',
    src: inCart ? 'public/assets/cartDisabled.png' : 'public/assets/cart.png',
  });

  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
