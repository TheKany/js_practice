import { makeDOM } from '../utils/dom.js';
import { getProductCard } from './productCard.js';

export const getProductList = (productInfoList, removeCartCallback) => {
  if (productInfoList == null && Array.isArray(productInfoList)) return;

  const productListCon = makeDOM('div', {
    className: 'product-list-con',
  });

  productInfoList.forEach((productInfo) => {
    productListCon.appendChild(
      getProductCard(
        {
          ...productInfo,
        },
        removeCartCallback
      )
    );
  });

  return productListCon;
};
