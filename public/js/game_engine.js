var GAME_ENGINE = {
	init: function() {

		$(document).ready(function() {
			for (var key in GAME_ENGINE.modules) {
				var obj = GAME_ENGINE.modules[key];
				var selector = obj.selector;
				if (selector !== '') {
					var dom_obj = $.find(obj.selector);
					if (dom_obj.length > 0) {
						obj.init();
					}
				}
			}
		});
		//GAME_ENGINE.modules.register.init();
	},
	modules: {
		starmap: {
			self: null,
			starmapData: null,
			zoom: 0.05,
			x_scroll: 0,
			y_scroll: 0,
			selector: '.initStarmap',
			init: function() {
				self = GAME_ENGINE.modules.starmap;
				$.post( '/api/starmap/loadstarmap', { id: '52f85b2829c9de5c0d61b9df' }, function(res) {
					self.starmapData = res.data;
					self.draw();
				});

				$('#map_zoomin').click(function() {
					//self.zoom += 0.005;
					self.zoom *= 1.1;
					self.x_scroll -= 25;
					self.y_scroll -= 25;
					self.draw();
				});

				$('#map_zoomout').click(function() {
					//self.zoom -= 0.005;
					self.zoom /= 1.1;
					self.x_scroll += 25;
					self.y_scroll += 25;
					self.draw();
				});

				$('.map_move').click(function(e) {
					switch ($(e.target).attr('id')) {
						case 'up':
							self.y_scroll+=10;
						break;

						case 'down':
							self.y_scroll-=10;
						break;

						case 'left':
							self.x_scroll+=10;
						break;

						case 'right':
							self.x_scroll-=10;
						break;
					}
					self.draw();
				});

			},
			draw: function() {
				var canvas=document.getElementById('mainarea');
				var ctx=canvas.getContext('2d');
				ctx.fillStyle='#FFFFFF';
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < self.starmapData.length; i++) {
					var x = self.starmapData[i].x * self.zoom + self.x_scroll;
					var y = self.starmapData[i].y * self.zoom + self.y_scroll;
			      	var radius = 1;

					ctx.beginPath();
					ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
					ctx.fillStyle = self.starmapData[i].color;
					ctx.fill();
					ctx.lineWidth = 0;
					ctx.strokeStyle = self.starmapData[i].color;
					ctx.stroke();

					ctx.fillStyle = "white";
					ctx.font = "12px Verdana";
					ctx.fillText(self.starmapData[i].name, x + 5, y + 3);

					//ctx.fillRect(x,y,2,2);			
				}

			}
		},
		register: {
			selector: '.initRegister',
			init: function() {
				$('#register').submit(function(e) {
					e.preventDefault();
				});
				$('#registersubmit').click(function(e) {
					$.post('/api/user/register', $('#register').serialize(), function(data) {
						console.log(data.error);
						if (typeof data.error !== 'undefined') {
							$('.errorMessage').slideDown(200, function() {
								setTimeout(function() {$('.errorMessage').hide(200)}, 3000);
							});
						} else {
							$('.signupContainer').replaceWith(data.tpl);
						}
					});
				});
			}
		}
	}
}

GAME_ENGINE.init();