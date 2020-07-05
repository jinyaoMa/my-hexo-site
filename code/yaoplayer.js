/**
* Based on jQuery, fontawesome
*/
(function (window, document) {
  var _player = function (id, playlist) {
    if (playlist == undefined || playlist == null || playlist.length < 1) {
      /** sample
      playlist = [
        {
          'name': 'Test',
          'singer': 'Tester',
          'lrc': 'Not found',
          'pic': 'https://s.gravatar.com/avatar/91c1b1d830c2daab93ac478c9852c2c8?s=72',
          'url': 'test.mp3'
        }
      ]
      */
      return;
    }

    var audio = document.createElement('audio');

    // Layout		
    var $outer = $('<div></div>').css({
      'position': 'fixed',
      'right': '-208px',
      'top': '56px',
      'box-shadow': '0 0 1px grey',
      'width': '280px',
      'background-color': 'white'
    }).attr('id', id);

    var $coverButton = this.Component.CoverButton();
    var $prevButton = this.Component.ControlButton({
      'icon': '<i class="fas fa-angle-left"></i>'
    });
    var $playButton = this.Component.CustomPlayControlButton();
    var $nextButton = this.Component.ControlButton({
      'icon': '<i class="fas fa-angle-right"></i>'
    });
    var $listButton = this.Component.ControlButton({
      'icon': '<i class="fas fa-list"></i>'
    });
    var $lyricButton = this.Component.ControlButton({
      'icon': '<i class="fas fa-align-center"></i>'
    });
    var $modeButton = this.Component.CustomModeControlButton();
    var $songInfo = this.Component.SongInfo();
    var $progressBar = this.Component.ProgressBar();
    var $progressLabel = this.Component.ProgressLabel();
    var $lyricView = this.Component.LyricView();
    var $volumeButton = this.Component.CustomVolumeControlButton(function (volume) { // interface
      audio.volume = volume;
    });
    var $listView = this.Component.ListView(playlist);
    var $extra = this.Component.InOut();

    // ...

    $outer.append($coverButton);
    $outer.append($songInfo);
    $outer.append($prevButton);
    $outer.append($playButton);
    $outer.append($nextButton);
    $outer.append($listButton);
    $outer.append($lyricButton);
    $outer.append($modeButton);
    $outer.append($volumeButton);
    $outer.append($progressBar);
    $outer.append($progressLabel);
    $outer.append($listView);
    $outer.append($lyricView);
    $outer.append($extra);

    $songInfo.css({
      'position': 'absolute',
      'top': '0',
      'left': '76px',
      'width': '144px'
    })
    $volumeButton.css({
      'position': 'absolute',
      'top': '48px',
      'right': '4px'
    })
    $modeButton.css({
      'position': 'absolute',
      'top': '48px',
      'right': '28px'
    })
    $nextButton.css({
      'position': 'absolute',
      'top': '48px',
      'right': '52px'
    })
    $playButton.css({
      'position': 'absolute',
      'top': '48px',
      'right': '76px'
    })
    $prevButton.css({
      'position': 'absolute',
      'top': '48px',
      'right': '100px'
    })
    $listButton.css({
      'position': 'absolute',
      'top': '0',
      'right': '4px'
    })
    $lyricButton.css({
      'position': 'absolute',
      'top': '0',
      'right': '28px'
    })
    $progressBar.css({
      'position': 'absolute',
      'top': '24px',
      'left': '72px'
    })
    $progressLabel.css({
      'position': 'absolute',
      'top': '48px',
      'left': '76px',
      'width': '72px'
    })
    $listView.css({
      'display': 'none'
    })
    $lyricView.css({
      'display': 'none'
    })

    // Setting
    var currentVolume = 0.69;
    var currentIndex = 0;
    var currentMode = this.Component.MODE_NORMAL;
    var currentPlayState = false;
    var mouseDownTemp = -1;
    var mouseUpTemp = -1;
    var prevStack = [];
    var _player_self = this;

    // Interface		
    $listButton.click(function () {
      $lyricView.hide();
      $listView.slideToggle();
    });
    $lyricButton.click(function () {
      $listView.hide();
      $lyricView.slideToggle();
    });
    $coverButton.click(function () {
      if (audio.paused && audio.readyState >= 3) {
        audio.play();
        audio.autoplay = true;
      } else {
        audio.pause();
        audio.autoplay = false;
      }
    });
    $playButton.click(function () {
      if (audio.paused && audio.readyState >= 3) {
        audio.play();
        audio.autoplay = true;
      } else {
        audio.pause();
        audio.autoplay = false;
      }
    });
    $nextButton.click(function () {
      if (currentMode == _player_self.Component.MODE_NORMAL
        || currentMode == _player_self.Component.MODE_REPEAT) {
        prevStack.push(currentIndex);
        currentIndex += 1;
        if (currentIndex >= playlist.length) {
          currentIndex = 0;
        }
      } else if (currentMode == _player_self.Component.MODE_RANDOM) {
        prevStack.push(currentIndex);
        currentIndex = Math.floor(Math.random() * playlist.length);
      }
      audio.src = playlist[currentIndex].url + '&br=128000';
      audio.load();
    });
    $prevButton.click(function () {
      if (prevStack.length > 0) {
        currentIndex = prevStack.pop();
      } else if (currentMode == _player_self.Component.MODE_NORMAL
        || currentMode == _player_self.Component.MODE_REPEAT) {
        currentIndex -= 1;
        if (currentIndex < 0) {
          currentIndex = playlist.length - 1;
        }
      } else if (currentMode == _player_self.Component.MODE_RANDOM) {
        currentIndex = Math.floor(Math.random() * playlist.length);
      }
      audio.src = playlist[currentIndex].url + '&br=128000';
      audio.load();
    });
    $listView.children('div').click(function () {
      prevStack.push(currentIndex);
      currentIndex = $(this).index();
      audio.src = playlist[currentIndex].url + '&br=128000';
      audio.load();
    });
    $modeButton.click(function () {
      currentMode += 1;
      if (currentMode > 2) {
        currentMode = 0;
      }
      $modeButton.setMode(currentMode);
    });
    $progressBar.mousedown(function (e) {
      mouseDownTemp = e.pageX - e.currentTarget.offsetLeft - e.currentTarget.offsetParent.offsetLeft;
      mouseUpTemp = mouseDownTemp / e.currentTarget.offsetWidth;
      $progressBar.setCurrentProgress(mouseUpTemp);
    });
    $progressBar.mousemove(function (e) {
      mouseUpTemp = (e.pageX - e.currentTarget.offsetLeft - e.currentTarget.offsetParent.offsetLeft) / e.currentTarget.offsetWidth;
      if (mouseDownTemp >= 0) {
        $progressBar.setCurrentProgress(mouseUpTemp);
      }
    });
    $progressBar.mouseup(function (e) {
      if (mouseDownTemp >= 0) {
        audio.currentTime = mouseUpTemp * audio.duration;
        mouseDownTemp = -1;
      }
    });
    $progressBar.mouseleave(function (e) {
      if (mouseDownTemp >= 0) {
        audio.currentTime = mouseUpTemp * audio.duration;
        mouseDownTemp = -1;
      }
    });

    audio.onabort = audio.onerror = function () {
      $songInfo.setSongInfo({
        'name': 'Error',
        'singer': 'Error'
      });
      $coverButton.setCover('https://s.gravatar.com/avatar/91c1b1d830c2daab93ac478c9852c2c8?s=72');
    };
    audio.onpause = function () {
      currentPlayState = false;
      $coverButton.setPlayState(currentPlayState);
      $playButton.setPlayState(currentPlayState);
    };
    audio.onplay = function () {
      currentPlayState = true;
      $coverButton.setPlayState(currentPlayState);
      $playButton.setPlayState(currentPlayState);
    };
    audio.onloadstart = function () {
      $coverButton.setPlayState(currentPlayState);
      $playButton.setPlayState(currentPlayState);

      $listView.setCurrentIndex(currentIndex);
      $songInfo.setSongInfo(playlist[currentIndex]);
      $coverButton.setCover(playlist[currentIndex].pic.replace('http://', 'https://') || 'https://s.gravatar.com/avatar/91c1b1d830c2daab93ac478c9852c2c8?s=72');
      $progressBar.setLoadingProgress(0);
      $progressBar.setCurrentProgress(0);
      $progressLabel.setTimePass(0);
      $progressLabel.setTimeTotal(playlist[currentIndex].time || '??:??');
      setTimeout(function () {
        $.get(playlist[currentIndex].lrc.replace('http://', 'https://'), function (data) {
          $lyricView.setLyric(data.replace(/\[[0-9:\.]+\]/g, '').replace(/\n/g, '<br>'));
        }, 'text');
      }, 1000);
    };
    audio.onprogress = function (e) {
      if (e.target.buffered.length > 0) {
        $progressBar.setLoadingProgress(e.target.buffered.end(0) / e.target.duration);
      }
    };
    audio.ontimeupdate = function (e) {
      if (e.target.currentTime >= 0) {
        if (mouseDownTemp == -1) {
          $progressBar.setCurrentProgress(e.target.currentTime / e.target.duration);
        }
        $progressLabel.setTimePass(Math.floor(e.target.currentTime));
      }
    };
    audio.onended = function () {
      if (currentMode == _player_self.Component.MODE_NORMAL) {
        prevStack.push(currentIndex);
        currentIndex += 1;
        if (currentIndex >= playlist.length) {
          currentIndex = 0;
        }
      } else if (currentMode == _player_self.Component.MODE_REPEAT) {
        audio.load();
        return;
      } else if (currentMode == _player_self.Component.MODE_RANDOM) {
        prevStack.push(currentIndex);
        currentIndex = Math.floor(Math.random() * playlist.length);
      }
      audio.src = playlist[currentIndex].url + '&br=128000';
      audio.load();
    };

    // Extra Initialize
    $coverButton.setPlayState(currentPlayState);
    $coverButton.setCover('https://s.gravatar.com/avatar/91c1b1d830c2daab93ac478c9852c2c8?s=72');
    $playButton.setPlayState(currentPlayState);
    $volumeButton.setVolume(currentVolume);
    $modeButton.setMode(currentMode);
    $songInfo.setSongInfo(playlist[currentIndex]);
    $progressBar.setLoadingProgress(0);
    $progressBar.setCurrentProgress(0);
    $progressLabel.setTimePass(0);
    $progressLabel.setTimeTotal(playlist[currentIndex].time || '??:??');
    $listView.setCurrentIndex(currentIndex);

    audio.src = playlist[currentIndex].url + '&br=128000';
    audio.load();

    // Extra...
    var inOutState = false;
    $extra.mousedown(function () {
      if (inOutState) {
        $outer.animate({ 'right': '-208px' });
        $listView.slideUp();
        $lyricView.slideUp();
        $extra.setIn();
      } else {
        $outer.animate({ 'right': '0' });
        $extra.setOut();
      }
      inOutState = !inOutState;
    });

    return $outer;
  };

  _player.prototype = {
    constructor: _player,
    Component: {
      MODE_NORMAL: 0,
      MODE_REPEAT: 1,
      MODE_RANDOM: 2,
      InOut: function () {
        var $div = $('<div></div>').css({
          'height': '72px',
          'font-size': '16px',
          'user-select': 'none',
          'background-color': '#ffffffaa',
          'position': 'absolute',
          'left': '-16px',
          'top': '0',
          'width': '16px',
          'text-align': 'center',
          'color': 'black'
        });
        var $i = $('<i class="fas fa-angle-left"></i>').css({
          'margin': '28px 0'
        });
        $div.append($i);

        $div.hover(function () {
          $(this).css({
            'background-color': '#102a4baa',
            'color': 'white'
          });
        }, function () {
          $(this).css({
            'background-color': '#ffffffaa',
            'color': 'black'
          });
        });
        $div.setIn = function () {
          $(this).children('i').removeClass('fa-angle-right').addClass('fa-angle-left');
        };
        $div.setOut = function () {
          $(this).children('i').removeClass('fa-angle-left').addClass('fa-angle-right');
        };

        return $div;
      },
      LyricView: function () {
        var $div = $('<div></div>').css({
          'height': '156px',
          'font-size': '14px',
          'border-top': '1px solid lightgrey',
          'user-select': 'text',
          'overflow-y': 'auto',
          'padding': '4px'
        });
        $div.append('<p></p>');

        $div.setLyric = function (html_text) {
          if (html_text.trim() == "") {
            $(this).children('p').html('Not found');
          } else {
            $(this).children('p').html(html_text);
          }
        };

        return $div;
      },
      ListView: function (list) {
        var $div = $('<div></div>').css({
          'height': '156px', // (14 + 6 * 2)px * 6
          'line-height': '100%',
          'font-size': '14px',
          'border-top': '1px solid lightgrey',
          'cursor': 'pointer',
          'user-select': 'none',
          'overflow-y': 'auto'
        });

        list.forEach(function (song, i) {
          var $item = $('<div></div>').css({
            'height': '14px',
            'padding': '6px'
          });
          var $signal = $('<div></div>').css({
            'float': 'left',
            'display': 'inline-block',
            'height': '14px',
            'width': '6px',
            'background-color': 'goldenrod',
            'margin-right': '8px',
            'box-sizing': 'content-box',
            'display': 'none'
          });
          var $index = $('<span></span>').css({
            'float': 'left',
            'margin-right': '8px',
            'box-sizing': 'content-box'
          }).text(i + 1);
          var $title = $('<span></span>').css({
            'float': 'left',
            'box-sizing': 'content-box',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
            'width': '152px', // 228px * 2/3
            'overflow': 'hidden'
          }).text(song.name);
          var $artist = $('<span></span>').css({
            'float': 'right',
            'box-sizing': 'content-box',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
            'width': '76px', // 228px * 1/3
            'overflow': 'hidden',
            'text-align': 'right'
          }).text(song.singer);

          $item.append($signal);
          $item.append($index);
          $item.append($title);
          $item.append($artist);
          $div.append($item);
        });

        $div.children('div').hover(function () {
          $(this).css('background-color', '#eee');
        }, function () {
          $(this).css('background-color', 'transparent');
        });

        $div.setCurrentIndex = function (index) {
          $(this).children('div').css('padding', '6px');
          $(this).children('div').children('div').hide();
          $(this).children('div').eq(index).css('padding', '6px 6px 6px 0');
          $(this).children('div').eq(index).children('div').show();
        };

        return $div;
      },
      ProgressLabel: function () {
        var $div = $('<div></div>').css({
          'height': '12px',
          'line-height': '100%',
          'font-size': '12px',
          'padding': '6px 4px',
          'width': '68px',
          'user-select': 'none'
        });

        var $timePass = $('<span></span>');
        var $timeTotal = $('<span></span>');

        $div.append($timePass);
        $div.append(' / ');
        $div.append($timeTotal);

        $div.setTimeTotal = function (seconds) {
          if (seconds == '??:??') {
            $(this).children('span').eq(1).text('??:??');
            return;
          }
          var min = Math.floor(seconds / 60);
          var sec = seconds % 60;
          if (min < 10) {
            min = '0' + min;
          }
          if (sec < 10) {
            sec = '0' + sec;
          }
          $(this).children('span').eq(1).text(min + ':' + sec);
        };

        $div.setTimePass = function (seconds) {
          var min = Math.floor(seconds / 60);
          var sec = seconds % 60;
          if (min < 10) {
            min = '0' + min;
          }
          if (sec < 10) {
            sec = '0' + sec;
          }
          $(this).children('span').eq(0).text(min + ':' + sec);
        };

        return $div;
      },
      ProgressBar: function () {
        var $div = $('<div></div>').css({
          'width': '200px',
          'height': '16px',
          'padding': '4px',
          'cursor': 'pointer',
          'overflow': 'hidden',
          'user-select': 'none'
        });

        var $progressInner = $('<div></div>').css({
          'width': 'calc(100% - 8px)',
          'height': '4px',
          'margin': '7px 4px',
          'background-color': '#d3d3d3',
          'border-radius': '2px',
          'position': 'relative',
          'pointer-events': 'none'
        });

        var $progressLoading = $('<div></div>').css({
          'min-width': '4px',
          'max-width': 'calc(100% - 8px)',
          'width': 'calc(75% - 8px)',
          'height': '4px',
          'margin': '7px 4px',
          'background-color': '#aaa',
          'border-radius': '2px',
          'position': 'relative',
          'top': '-11px',
          'pointer-events': 'none'
        });

        var $progressCurrent = $('<div></div>').css({
          'min-width': '4px',
          'max-width': 'calc(100% - 8px)',
          'width': 'calc(50% - 8px)',
          'height': '4px',
          'margin': '7px 4px',
          'background-color': '#000',
          'border-radius': '2px',
          'float': 'left',
          'position': 'relative',
          'top': '-29px',
          'pointer-events': 'none'
        });

        var $progressThumb = $('<div></div>').css({
          'width': '4px',
          'height': '4px',
          'border-radius': '50%',
          'border': '4px solid goldenrod',
          'margin': '3px 0',
          'margin-left': '-12px',
          'float': 'left',
          'position': 'relative',
          'top': '-29px',
          'pointer-events': 'none'
        });

        $div.append($progressInner);
        $div.append($progressLoading);
        $div.append($progressCurrent);
        $div.append($progressThumb);

        $div.setCurrentProgress = function (progress) {
          $(this).children('div').eq(2).css('width', progress * 100 + '%');
        };

        $div.setLoadingProgress = function (progress) {
          $(this).children('div').eq(1).css('width', progress * 100 + '%');
        };

        return $div;
      },
      ControlButton: function (options) {
        var $div = $('<div></div>')
          .css({
            'width': '16px',
            'height': '16px',
            'line-height': '100%',
            'font-size': '16px',
            'padding': '4px',
            'opacity': '0.6',
            'display': 'inline-block',
            'text-align': 'center',
            'cursor': 'pointer',
            'vertical-align': 'middle'
          })
          .html(options.icon || '<i class="fas fa-image"></i>')
          .css(options.css || {})
          .hover(function () {
            $(this).css('opacity', '1');
          }, function () {
            $(this).css('opacity', '0.6');
          });

        $div.setIcon = function (icon) {
          $(this).html(icon || '<i class="fas fa-image"></i>');
        };

        return $div;
      },
      CoverButton: function () {
        var $div = $('<div></div>').css({
          'width': '72px',
          'height': '72px',
          'cursor': 'pointer',
          'background-color': 'goldenrod',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'color': 'white'
        });

        $div.html('<i class="far fa-play-circle"></i>');
        $div.children('i').css({
          'line-height': '100%',
          'font-size': '32px',
          'opacity': '0.8',
          'position': 'relative',
          'top': '20px',
          'left': '20px',
          'text-shadow': '0 0 0.1px black'
        });

        $div.hover(function () {
          $(this).children('i').css('opacity', '1');
        }, function () {
          $(this).children('i').css('opacity', '0.8');
        });

        $div.setPlayState = function (state) {
          if (state) {
            $(this).children('i')
              .removeClass('fa-play-circle')
              .addClass('fa-pause-circle')
              .animate({
                'font-size': '20px',
                'top': '48px',
                'left': '48px'
              });
          } else {
            $(this).children('i')
              .removeClass('fa-pause-circle')
              .addClass('fa-play-circle')
              .animate({
                'font-size': '32px',
                'top': '20px',
                'left': '20px'
              });
          }
        };

        $div.setCover = function (cover) {
          $(this).css('background-image', 'url(' + cover + ')');
        };

        return $div;
      },
      SongInfo: function () {
        var $div = $('<div></div>').css({
          'height': '16px',
          'line-height': '100%',
          'padding': '4px',
          'cursor': 'default',
          'user-select': 'text',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          'overflow': 'hidden'
        });

        var $title = $('<span></span>').css({
          'font-size': '16px',
          'color': 'black'
        });
        var $artist = $('<span></span>').css({
          'font-size': '14px',
          'color': 'darkgrey'
        });

        $div.append($title);
        $div.append(' - ');
        $div.append($artist);

        $div.setSongInfo = function (options) {
          if (options.name) {
            $(this).children('span').eq(0).text(options.name);
          }
          if (options.singer) {
            $(this).children('span').eq(1).text(options.singer);
          }
        };

        return $div;
      },
      CustomPlayControlButton: function () {
        var $playButton = this.ControlButton({
          'icon': '<i class="far fa-play-circle"></i>',
          'css': {
            'width': '18px',
            'height': '18px',
            'font-size': '18px',
            'padding': '3px'
          }
        });

        $playButton.setPlayState = function (state) {
          if (state) {
            $(this).children('i')
              .removeClass('fa-play-circle')
              .addClass('fa-pause-circle');
          } else {
            $(this).children('i')
              .removeClass('fa-pause-circle')
              .addClass('fa-play-circle');
          }
        };

        return $playButton;
      },
      CustomVolumeControlButton: function (volumeChangedListener) {
        var $volumeButton = this.ControlButton({
          'icon': '<i class="fas fa-volume-down"></i>'
        }).css('width', '16px');

        var $volumeBar = $('<div></div>').css({
          'width': '6px',
          'height': '48px',
          'border-radius': '8px',
          'box-shadow': '0 0 0 1px',
          'margin': '4px 6px',
          'overflow': 'hidden',
          'margin-right': '-52px',
          'background-color': 'white',
          'z-index': '99999',
          'position': 'fixed'
        });

        var $volumeBarInner = $('<div></div>').css({
          'background-color': 'goldenrod',
          'height': '50%',
          'width': '100%'
        });

        $volumeBar.mousedown(function (e) {
          $(this).children('div').css('height', e.offsetY);
          var volume = e.offsetY / $(this).height();
          $(this).siblings('i').removeClass('fa-volume-off fa-volume-down fa-volume-up');
          if (volume < 0.3) {
            $(this).siblings('i').addClass('fa-volume-off');
          } else if (volume < 0.7) {
            $(this).siblings('i').addClass('fa-volume-down');
          } else {
            $(this).siblings('i').addClass('fa-volume-up');
          }
          if (volumeChangedListener) {
            volumeChangedListener(volume);
          }
        });

        $volumeButton.children('i').click(function () {
          $(this).siblings('div').children('div').css('height', 0);
          $(this).removeClass('fa-volume-down fa-volume-up')
            .addClass('fa-volume-off');
          if (volumeChangedListener) {
            volumeChangedListener(0);
          }
        });

        $volumeButton.hover(function () {
          $(this).children('div').show();
        }, function () {
          $(this).children('div').hide();
        });

        $volumeBar.hide();

        $volumeBar.append($volumeBarInner);
        $volumeButton.append($volumeBar);

        $volumeButton.setVolume = function (volume) {
          $(this).children('div').children('div').css('height', $(this).children('div').height() * volume);
          $(this).siblings('i').removeClass('fa-volume-off fa-volume-down fa-volume-up');
          if (volume < 0.3) {
            $(this).children('i').addClass('fa-volume-off');
          } else if (volume < 0.7) {
            $(this).children('i').addClass('fa-volume-down');
          } else {
            $(this).children('i').addClass('fa-volume-up');
          }
          if (volumeChangedListener) {
            volumeChangedListener(volume);
          }
        };

        return $volumeButton;
      },
      CustomModeControlButton: function () {
        var $modeButton = this.ControlButton({
          'icon': '<i class="fas fa-exchange-alt"></i>'
        });

        var normal = this.MODE_NORMAL;
        var repeat = this.MODE_REPEAT;
        var random = this.MODE_RANDOM;

        $modeButton.setMode = function (mode) {
          if (mode == normal) {
            $(this).children('i')
              .removeClass('fa-redo-alt fa-random')
              .addClass('fa-exchange-alt');
          } else if (mode == repeat) {
            $(this).children('i')
              .removeClass('fa-exchange-alt fa-random')
              .addClass('fa-redo-alt');
          } else if (mode == random) {
            $(this).children('i')
              .removeClass('fa-redo-alt fa-exchange-alt')
              .addClass('fa-random');
          }
        };

        return $modeButton;
      }
    }

  };

  window.YaoPlayer = _player;
})(window, document);