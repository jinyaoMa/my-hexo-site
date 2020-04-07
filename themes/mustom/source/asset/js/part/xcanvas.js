import part from "../common/part.js";

let tag = 'xcanvas';
let element = null;
let noCanvas = false;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

    if (params && params.noCanvas) {
      element.classList.add('active');
      noCanvas = params.noCanvas;
    }

    element.onclick = e => {
      noCanvas = !noCanvas;
      params && params.onchange && params.onchange(noCanvas);
      if (noCanvas) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    };

    callback && callback(element);
  });
};

export default {
  tag,
  init
};