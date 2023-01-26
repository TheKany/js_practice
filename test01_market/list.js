import { fetchModule } from './module/fetch.js';
import { filterBtnEvent, setFilterEvent } from './module/productFilter.js';
import { getProductList } from './module/productList.js';

const sectionInfoList = await fetchModule();

const productList = sectionInfoList.reduce((prev, curr) => [...prev, ...curr.productList], []);

const $section = document.getElementsByTagName('section')[0];
const productListDOM = getProductList(productList);

$section.appendChild(productListDOM);

setFilterEvent();
filterBtnEvent(productList);
