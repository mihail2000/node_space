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
			selector: '.initStarmap',
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