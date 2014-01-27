var GAME_ENGINE = {

	init: function() {
		var canvas=document.getElementById('mainarea');
		var ctx=canvas.getContext('2d');
		ctx.fillStyle='#FFFFFF';
		for (var i = 0; i < 200; i++) {
			var x = Math.floor((Math.random()*1024)+1);
			var y = Math.floor((Math.random()*800)+1);
			ctx.fillRect(x,y,2,2);			
		}
	}
}

GAME_ENGINE.init();