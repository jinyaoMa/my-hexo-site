---
layout: page
name: test
title: 测试 / Test
---

<div id="test">

<script src="/code/yao2048.js"></script>
<script>
var _2048 = new Yao2048(document.querySelector('#test'));
_2048.show();
</script>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script src="/code/yaoplayer.js"></script>
<script>
$.get('https://v1.itooi.cn/netease/songList', {
	'id': 998389130
}, function(json){
	if (json.data != undefined && json.data != null &&
		json.data.tracks != undefined && json.data.tracks != null) {
		$('#test').append(new YaoPlayer('YaoPlayer', json.data.tracks.map(song => {
      return {
        'name': song.name,
        'singer': song.artists.map(artist => artist.name).join(', '),
        'lrc': 'Not found',
        'pic': song.album.picUrl,
        'url': `https://v1.itooi.cn/netease/url?id=${song.id}&quality=128`
      };
    })));
	}
}, 'json');
</script>

</div>
