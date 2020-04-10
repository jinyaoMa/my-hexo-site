class Color {
  constructor(r, g, b) {
    this.R = Math.round(Math.abs(r % 256));
    this.G = Math.round(Math.abs(g % 256));
    this.B = Math.round(Math.abs(b % 256));
  }
  setAlpha(a) {
    this.A = Math.round(Math.abs(a % 256 / 255));
  }
  localeCompare(that) {
    return this.toString().localeCompare(that.toString());
  }
  toString() {
    return `#${(this.R << 16 | this.G << 8 | this.B).toString(16)}`;
  }
}

function findTargetColors(colors) {
  if (colors.length < 16) {
    return colors.sort();
  } else {
    let newColors = [];
    for (let i = 0; i < colors.length; i += 1) {
      // get average for every pair of colors
      let left = colors[i];
      let right = colors[++i];
      if (right) {
        newColors.push(new Color(
          (left.R + right.R) / 2,
          (left.G + right.G) / 2,
          (left.B + right.B) / 2
        ));
      } else {
        newColors.push(left);
      }
    }
    return findTargetColors(newColors);
  }
}

function getImageColors(imgObj) {
  let canvas = document.createElement('canvas');
  canvas.width = imgObj.naturalWidth;
  canvas.height = imgObj.naturalHeight;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(imgObj, 0, 0);
  let imgDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let imageData = imgDataObj.data;

  let colors = [];
  for (let i = 0; i < imageData.length; i += 1) {
    // every 3 r/g/b values are filled into colors and every alpha value was skiped by the loop
    let r = imageData[i++];
    let g = imageData[i++];
    let b = imageData[i++];
    let a = imageData[i];
    if (a > 0) { // remove transparent colors
      colors.push(new Color(r, g, b));
    }
  }

  return findTargetColors(colors);
}

function getImage(data, callback) {
  let img = document.createElement('img');
  img.onload = e => {
    typeof callback === 'function' && callback(img);
  };
  img.src = data;
}

function setupInputFile() {
  let file = document.querySelector('#file');
  let img = document.querySelector('#input');
  let placeholder = document.querySelector('#placeholder');
  let output = document.querySelector('#output');
  file.onchange = e => {
    if (file.files.length) {
      let infile = file.files[0];
      if (infile.type.startsWith('image/')) {
        let reader = new FileReader();
        reader.readAsDataURL(infile);
        reader.onload = e => {
          img.style.backgroundColor = 'black';
          img.style.backgroundImage = `url(${reader.result})`;
          placeholder.style.opacity = 0;
          getImage(reader.result, imgObj => {
            file.disabled = true;
            output.innerHTML = '';
            let imgColors = getImageColors(imgObj);
            imgColors.forEach(color => {
              let div = document.createElement('div');
              let spanColor = document.createElement('span');
              let spanName = document.createElement('span');
              div.className = 'colors';
              spanColor.className = 'colors-color';
              spanName.className = 'colors-name';
              spanColor.style.background = spanName.innerText = color.toString();
              div.appendChild(spanColor);
              div.appendChild(spanName);
              output.appendChild(div);
            });
            file.disabled = false;
          });
        }
      } else {
        img.style.backgroundColor = 'white';
        img.style.backgroundImage = 'none';
        placeholder.style.opacity = 1;
      }
    } else {
      img.style.backgroundColor = 'white';
      img.style.backgroundImage = 'none';
      placeholder.style.opacity = 1;
    }
  };
}

function main() {
  setupInputFile();
}

main();