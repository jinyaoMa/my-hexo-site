class Color {
  constructor(r, g, b) {
    this.R = Math.floor(r);
    this.G = Math.floor(g);
    this.B = Math.floor(b);
  }
  setAlpha(a) {
    this.A = Math.floor(a / 255);
  }
  localeCompare(that) {
    return this.toString().localeCompare(that.toString());
  }
  toString() {
    let r = (this.R < 16 ? '0' : '') + this.R.toString(16);
    let g = (this.G < 16 ? '0' : '') + this.G.toString(16);
    let b = (this.B < 16 ? '0' : '') + this.B.toString(16);
    return `#${r}${g}${b}`;
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
  let loading = document.querySelector('#loading');
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
          loading.classList.add('active');
          output.classList.remove('active');
          getImage(reader.result, imgObj => {
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
            output.classList.add('active');
            loading.classList.remove('active');
          });
        }
      } else {
        img.style.backgroundColor = 'white';
        img.style.backgroundImage = 'none';
        placeholder.style.opacity = 1;
        output.classList.remove('active');
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