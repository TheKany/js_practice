import { makeDOM, appendChildren } from '../utils/dom.js';
import { getCartToggleBtn } from './cartToggleBtn.js';

export const getProductCard = (productInfo, removeCartCallback) => {
  const { imgSrc, name, discountPercent, discountPrice, originalPrice } = productInfo;

  // ======= product-card ========
  /* .product-card */
  const productCard = makeDOM('div', {
    className: 'product-card',
  });

  // ======= product-image-con ========
  /* .product-card .product-image-con */
  const productImageCon = makeDOM('div', {
    className: 'product-image-con',
  });

  /* .product-card .product-image-con img */
  const productImage = makeDOM('img', {
    src: imgSrc,
    alt: name,
  });

  const cartToggleBtn = getCartToggleBtn(productInfo, removeCartCallback);

  appendChildren(productImageCon, [productImage, cartToggleBtn]);

  // ======= product-description  ========
  /* .product-description */
  const productDescription = makeDOM('div', {
    className: 'product-description',
  });

  /* .product-description .product-name */
  const productName = makeDOM('div', {
    className: 'product-name',
    innerHTML: name,
  });

  /* .product-description .product-price-con */
  const productPriceCon = makeDOM('div', {
    className: 'product-price-con',
  });

  /* .product-description .product-price-con .product-discount-percent */
  const productDiscountPercent = makeDOM('div', {
    className: 'product-discount-percent',
    innerHTML: `${discountPercent}%`,
  });

  /* .product-description .product-price-con .product-price */
  const productPrice = makeDOM('div', {
    className: 'product-price',
    innerHTML: `${discountPrice.toLocaleString()}원`,
  });

  /* .product-description .product-original-price */
  const productOriginalPrice = makeDOM('div', {
    className: 'product-original-price',
    innerHTML: `${originalPrice.toLocaleString()}원`,
  });

  appendChildren(productPriceCon, [productDiscountPercent, productPrice]);
  appendChildren(productDescription, [productName, productPriceCon, productOriginalPrice]);

  appendChildren(productCard, [productImageCon, productDescription]);

  return productCard;
};
