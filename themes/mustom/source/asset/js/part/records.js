import part from "../common/part.js";

let tag = 'records';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

    if (params && params.data && params.data.length) {
      
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};