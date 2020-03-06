/**
* height: 24 + 40 * 4 + 24 = 208
* width: 40 * 4 = 160
*/
(function (window, document) {
  var _2048 = function (parent) {
    var outer = this.Component._dom('div');

    var topView = this.Component._dom('div');
    var gridView = this.Component._dom('div');
    var bottomView = this.Component._dom('div');
    var closeButton = this.Component._dom('div');
    var grids = [];

    for (var i = 0; i < 16; i++) {
      var grid = this.Component.Grid();
      grids.push(grid);
      gridView.appendChild(grid);
    }

    outer.appendChild(topView);
    outer.appendChild(gridView);
    outer.appendChild(bottomView);
    outer.appendChild(closeButton);
    parent.appendChild(outer);

    // ...

    topView.style.cssText = "\
      height: 24px;\
      width: 160px;\
      font-size: 16px;\
      padding: 0 4px;\
      user-select: none;\
      color: goldenrod;\
    ";
    gridView.style.cssText = "\
      height: 160px;\
      width: 160px;\
      display: grid;\
      grid-template-columns: 40px 40px 40px 40px;\
      user-select: none;\
    ";
    bottomView.style.cssText = "\
      height: 16px;\
      width: 160px;\
      color: lightgrey;\
      text-align: center;\
      font-size: 16px;\
      user-select: none;\
      padding: 4px 0;\
    ";
    closeButton.style.cssText = "\
      height: 16px;\
      width: 16px;\
      font-size: 16px;\
      line-height: 100%;\
      position: absolute;\
      top: 0;\
      right: 0;\
      user-select: none;\
      padding: 6px;\
      cursor: pointer;\
    ";
    outer.style.cssText = "\
      height: 208px;\
      width: 160px;\
      position: fixed;\
      top: calc(50% - 104px);\
      left: calc(50% - 80px);\
      background-color: aliceblue;\
      padding: 4px;\
      border-radius: 8px;\
      box-shadow: 0 0 12px 4px;\
      display: none;\
    ";

    bottomView.innerHTML = "Controls: &uarr; &darr; &larr; &rarr;";
    closeButton.innerHTML = "&#9932;";

    // Initialize
    var _self = this;
    var isGameOver = false;
    var points = 0;
    var map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var updatePointsLabel = function (points) {
      topView.innerText = 'Points: ' + points;
    };
    var updatePanel = function () {
      var index = 0;
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          grids[index++].setGrid(map[i][j]);
        }
      }
    };
    var resetGame = function () {
      map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      points = 0;
      points += _self.Function.generateNewGrid(map);
      isGameOver = false;
      topView.style.color = 'goldenrod';
      updatePointsLabel(points);
      updatePanel();
    };

    points += this.Function.generateNewGrid(map); // never gameover/return 0 during initializing
    updatePointsLabel(points);
    updatePanel();

    document.body.onkeydown = function (e) {
      if (outer.style.display != 'none' && isGameOver == false) {
        e.preventDefault();
        var oldMap = _self.Function.copyMap(map);
        if (e.keyCode == 39) { // arrow right
          _self.Function.adjustRight(map);
          points += _self.Function.doRight(map);
          _self.Function.adjustRight(map);
        } else if (e.keyCode == 37) { // arrow left
          _self.Function.adjustLeft(map);
          points += _self.Function.doLeft(map);
          _self.Function.adjustLeft(map);
        } else if (e.keyCode == 38) { // arrow up
          _self.Function.adjustUp(map);
          points += _self.Function.doUp(map);
          _self.Function.adjustUp(map);
        } else if (e.keyCode == 40) { // arrow down
          _self.Function.adjustDown(map);
          points += _self.Function.doDown(map);
          _self.Function.adjustDown(map);
        }
        var movePoint = _self.Function.generateNewGrid(map);
        if (_self.Function.isDifferent(oldMap, map)) { // if it's a valid move
          if (movePoint != 0 && movePoint != -1 && movePoint != -2) { // if not gameover/2048get AND has new grid generated
            points += movePoint;
            updatePointsLabel(points);
            updatePanel();
          }
        } else {
          if (movePoint == -2) {
            isGameOver = true;
            topView.innerText = 'Win: ' + points;
            topView.style.color = 'green';
          } else if (movePoint == 0) {
            isGameOver = true;
            topView.innerText = 'Lost: ' + points;
            topView.style.color = 'red';
          }
        }
      }
    };

    closeButton.onclick = function () {
      outer.style.display = 'none';
      resetGame();
    };

    outer.show = function () {
      this.style.display = 'block';
    };

    return outer;
  };

  _2048.prototype = {
    constructor: _2048,
    Function: {
      isDifferent: function (oldMap, newMap) {
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if (oldMap[i][j] != newMap[i][j]) {
              return true;
            }
          }
        }
        return false;
      },
      copyMap: function (map) {
        var newMap = [[], [], [], []];
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            newMap[i][j] = map[i][j];
          }
        }
        return newMap;
      },
      nextNumber: function () {
        return Math.random() > 0.7 ? 4 : 2;
      },
      countEmptyPosition: function (map) {
        var counter = 0;
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if (map[i][j] == 0) {
              counter += 1;
            }
          }
        }
        return counter;
      },
      has2048: function (map) {
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if (map[i][j] == 2048) {
              return true;
            }
          }
        }
        return false;
      },
      checkGameOver: function (map) {
        if (this.has2048(map)) {
          return -2;
        }
        var numOfEmptyPosition = this.countEmptyPosition(map);
        if (numOfEmptyPosition > 0) {
          return this.nextPosition(numOfEmptyPosition);
        } else {
          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (map[i][j] == map[i][j + 1]) {
                return -1;
              }
              if (map[i][j] == map[i + 1][j]) {
                return -1;
              }
            }
          }
          if (map[3][3] == map[3][2] || map[3][3] == map[2][3]) {
            return -1;
          }
        }
        return 0;
      },
      nextPosition: function (numOfEmptyPosition) {
        return Math.floor(Math.random() * numOfEmptyPosition + 1);
      },
      generateNewGrid: function (map) {
        var point = 0;
        var temp = this.checkGameOver(map);
        if (temp == 0) {
          console.log('gameover');
          point = temp;
        } else if (temp == -1) {
          console.log('no next number');
          point = temp;
        } else if (temp == -2) {
          console.log('2048 get');
          point = temp;
        } else {
          var counter = 0;
          for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
              if (map[i][j] == 0) {
                counter += 1;
                if (counter == temp) {
                  point = this.nextNumber();
                  map[i][j] = point;
                }
              }
            }
          }
        }
        return point; // 0 = gameover, -1 = no need to generate new grid, 2 or 4 = nextNumber(), -2 = 2048 get
      },
      adjustRight: function (map) {
        for (var i = 0; i < 4; i++) {
          for (var j = 3; j > 0; j--) {
            var k = 1;
            while (k < 4 && j - k >= 0 && map[i][j] == 0) {
              map[i][j] = map[i][j - k];
              map[i][j - k] = 0;
              k += 1;
            }
          }
        }
      },
      doRight: function (map) {
        var point = 0;
        for (var i = 0; i < 4; i++) {
          for (var j = 3; j > 0; j--) {
            if (map[i][j] == map[i][j - 1]) {
              map[i][j] = map[i][j] + map[i][j - 1];
              point += map[i][j - 1];
              map[i][j - 1] = 0;
            }
          }
        }
        return point;
      },
      adjustLeft: function (map) {
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 3; j++) {
            var k = 1;
            while (k < 4 && j + k <= 3 && map[i][j] == 0) {
              map[i][j] = map[i][j + k];
              map[i][j + k] = 0;
              k += 1;
            }
          }
        }
      },
      doLeft: function (map) {
        var point = 0;
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 3; j++) {
            if (map[i][j] == map[i][j + 1]) {
              map[i][j] = map[i][j] + map[i][j + 1];
              point += map[i][j + 1];
              map[i][j + 1] = 0;
            }
          }
        }
        return point;
      },
      adjustUp: function (map) {
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 3; j++) {
            var k = 1;
            while (k < 4 && j + k <= 3 && map[j][i] == 0) {
              map[j][i] = map[j + k][i];
              map[j + k][i] = 0;
              k += 1;
            }
          }
        }
      },
      doUp: function (map) {
        var point = 0;
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 3; j++) {
            if (map[j][i] == map[j + 1][i]) {
              map[j][i] = map[j][i] + map[j + 1][i];
              point += map[j + 1][i];
              map[j + 1][i] = 0;
            }
          }
        }
        return point;
      },
      adjustDown: function (map) {
        for (var i = 0; i < 4; i++) {
          for (var j = 3; j > 0; j--) {
            var k = 1;
            while (k < 4 && j - k >= 0 && map[j][i] == 0) {
              map[j][i] = map[j - k][i];
              map[j - k][i] = 0;
              k += 1;
            }
          }
        }
      },
      doDown: function (map) {
        var point = 0;
        for (var i = 0; i < 4; i++) {
          for (var j = 3; j > 0; j--) {
            if (map[j][i] == map[j - 1][i]) {
              map[j][i] = map[j][i] + map[j - 1][i];
              point += map[j - 1][i];
              map[j - 1][i] = 0;
            }
          }
        }
        return point;
      }
    },
    Component: {
      _dom: function (string) {
        return document.createElement(string);
      },
      Grid: function () {
        var div = this._dom('div');
        div.style.cssText = "\
          width: 36px;\
          height: 36px;\
          margin: 2px;\
          font-size: 16px;\
          text-align: center;\
          line-height: 32px;\
          border-radius: 2px;\
          color: white;\
          position: relative;\
          background-color: wheat;\
        ";

        div.setGrid = function (num) {
          if (num == 0) {
            this.style.backgroundColor = 'wheat';
          } else if (num == 2) {
            this.style.backgroundColor = 'powderblue';
          } else if (num == 4) {
            this.style.backgroundColor = 'yellowgreen';
          } else if (num == 8) {
            this.style.backgroundColor = 'turquoise';
          } else if (num == 16) {
            this.style.backgroundColor = 'thistle';
          } else if (num == 32) {
            this.style.backgroundColor = 'tan';
          } else if (num == 64) {
            this.style.backgroundColor = 'steelblue';
          } else if (num == 128) {
            this.style.backgroundColor = 'slategrey';
          } else if (num == 256) {
            this.style.backgroundColor = 'sandybrown';
          } else if (num == 512) {
            this.style.backgroundColor = 'coral';
          } else if (num == 1024) {
            this.style.backgroundColor = 'tomato';
          } else {
            this.style.backgroundColor = 'gold';
          }
          if (num != 0) {
            this.innerText = num;
          } else {
            this.innerText = "";
          }
        };

        return div;
      }
    }
  };

  window.Yao2048 = _2048;
})(window, document);