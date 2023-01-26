import { appendChildren, makeDOM } from '../utils/dom.js';
import { getProductList } from './productList.js';

export const getProductSection = (sectionName, productInfoList) => {
  const productListSection = makeDOM('div', {
    className: 'product-list-section',
  });

  const sectionTitle = makeDOM('div', {
    className: 'section-title',
  });

  const sectionTitleHighlight = makeDOM('span', {
    className: 'section-title-highlight',
  });

  const setionTitleSpan = makeDOM('span', {
    innerHTML: sectionName,
  });

  appendChildren(sectionTitle, [sectionTitleHighlight, setionTitleSpan]);

  const productListCon = getProductList(productInfoList);

  appendChildren(productListSection, [sectionTitle, productListCon]);

  return productListSection;
};
