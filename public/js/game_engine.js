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
			zoom: 0.1,
			selector: '.initStarmap',
			init: function() {
				self = GAME_ENGINE.modules.starmap;
				$.post( '/api/starmap/loadstarmap', function(data) {
					self.starmapData = data.data;
					self.draw();
				});
			},
			draw: function() {
				var canvas=document.getElementById('mainarea');
				var ctx=canvas.getContext('2d');
				ctx.fillStyle='#FFFFFF';
				for (var i = 0; i < self.starmapData.length; i++) {
					var x = self.starmapData[i].x * self.zoom;
					var y = self.starmapData[i].y * self.zoom;
					ctx.fillRect(x,y,2,2);			
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