import { makeDOM } from '../utils/dom.js';
import { getProductList } from './productList.js';

const MAX_PRICE = Number.MAX_VALUE;

const $priceMinFilter = document.getElementById('price-min-filter');
const $priceMaxFilter = document.getElementById('price-max-filter');
const $discountFilter = document.getElementById('discount-filter');
const $filterButton = document.getElementsByClassName('product-filter-con')[0]?.lastElementChild;

const convertNumber = (originalPrice) => {
  const formatString = String(originalPrice).replace('원', '').replace(',', '');
  const formatNumber = Number(formatString);
  return isNaN(formatNumber) ? 0 : formatNumber;
};

const formatPrice = (e) => {
  const value = e.target.value;
  const result = Number(value);

  if (isNaN(result)) {
    alert('숫자를 입력해주세요.');
    e.target.value = '';
    return;
  }

  e.target.value = `${result.toLocaleString()}원`;
};

const convertPercent = (originalValue) => {
  const formatString = String(originalValue).replace('%', '');
  const formatNumber = Number(formatString);
  return isNaN(formatNumber) ? 0 : formatNumber;
};

export const filterBtnEvent = (productList) => {
  $filterButton.onclick = () => {
    const maxPrice = convertNumber($priceMaxFilter.value) || MAX_PRICE;
    const minPrice = convertNumber($priceMinFilter.value) || 0;
    const discountRate = convertPercent($discountFilter.value) || 0;

    const newProductList = productList.filter((productInfo) => {
      const { discountPrice, discountPercent } = productInfo;
      return (
        discountPrice >= minPrice && discountPrice <= maxPrice && discountRate <= discountPercent
      );
    });

    const $section = document.getElementsByTagName('section')[0];
    const $productListCon = document.getElementsByClassName('product-list-con')[0];
    $section.removeChild($productListCon);

    if (newProductList.length > 0) {
      const productListDOM = getProductList(newProductList);
      $section.appendChild(productListDOM);
    } else {
      const emptyProductListDOM = makeDOM('div', {
        className: 'product-list-con empty',
        innerHTML: '조건에 해당하는 상품이 없습니다.',
      });
      $section.appendChild(emptyProductListDOM);
    }
  };
};

export const setFilterEvent = () => {
  // 필터 DOM들이 이벤트 핸들러를 구현

  // 필터 입력창 > 사용자가 클릭 > 숫자
  // 필터 입력창 이외의 부분 > 사용자가 클릭 > 입력창에서 벗어남 > 원 / % 가 붙은 format 형태

  $priceMinFilter.onfocus = (e) => {
    e.target.value = convertNumber(e.target.value);
  };
  $priceMinFilter.onblur = formatPrice;

  $priceMaxFilter.onfocus = (e) => {
    e.target.value = convertNumber(e.target.value);
  };
  $priceMaxFilter.onblur = formatPrice;

  $discountFilter.onfocus = (e) => {
    e.target.value = convertPercent(e.target.value);
  };
  $discountFilter.onblur = (e) => {
    const value = e.target.value;
    const result = Number(value);

    if (isNaN(result)) {
      alert('숫자를 입력해주세요.');
      e.target.value = '';
      return '';
    }

    if (result > 100 || result < 0) {
      alert('0 이상 100 이하의 숫자를 입력해주세요.');
      e.target.value = '';
      return;
    }

    e.target.value = `${result}%`;
  };
};
