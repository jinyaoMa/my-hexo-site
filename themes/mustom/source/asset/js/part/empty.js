import part from "../common/part.js";

let tag = 'empty';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    callback && callback(element);
  });
};

const getHeight = o => {
  if (element) {
    return element.offsetHeight;
  } else {
    return 0;
  }
};

const setHeight = h => {
  if (!element || isNaN(h)) return;
  element.style.height = h + 'px';
};

export default {
  tag,
  init,
  setHeight,
  getHeight
};