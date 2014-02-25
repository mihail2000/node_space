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
			zoom: 0,
			visible_area: { x: 0, y: 0, width: 1000, height: 500 },
			target_area: { x: 0, y: 0, width: 1000, height: 500 },
			timer_id: null,
			selector: '.initStarmap',
			init: function() {
				self = GAME_ENGINE.modules.starmap;
				var path = window.location.pathname;
				var separator = path.lastIndexOf('/');
				var gameid = '';
				if (separator > -1) {
					gameid = path.substring(separator + 1);
				}
				$.post( '/api/starmap/loadstarmap', { gameid: gameid }, function(res) {
					self.starmapData = res.data;
					self.draw();
				});

				$('#mainarea').click(function(e) {
					var x = Math.floor((e.pageX-$("#mainarea").offset().left));
					var y = Math.floor((e.pageY-$("#mainarea").offset().top));
					var canvas=document.getElementById('mainarea');

					for (var i = 0; i < self.starmapData.length; i++) {
						var sx = (self.starmapData[i].x - self.visible_area.x) * (canvas.width / self.visible_area.width);
						var sy = (self.starmapData[i].y - self.visible_area.y) * (canvas.height / self.visible_area.height);

						if (Math.abs(sx - x) < 5 && Math.abs(sy-y) < 5) {
							window.location.href="/planet/" + gameid + '/' + self.starmapData[i]._id;
						}
					}
				});

				$('#map_zoomin').click(function() {
					if (self.timer_id !== null) {
						clearInterval(self.timer_id);
						self.timer_id = null;
					}

					if (self.visible_area.width > 100 && self.visible_area.height > 100) {
						self.target_area.width = self.visible_area.width - 100;
						self.target_area.height = self.visible_area.height - 100;
						self.target_area.x = self.visible_area.x + 50;
						self.target_area.y = self.visible_area.y + 50;
						self.animate();
					}
				});

				$('#map_zoomout').click(function() {
					if (self.timer_id !== null) {
						clearInterval(self.timer_id);
						self.timer_id = null;
					}
					self.target_area.width = self.visible_area.width + 100;
					self.target_area.height = self.visible_area.height + 100;
					self.target_area.x = self.visible_area.x - 50;
					self.target_area.y = self.visible_area.y - 50;
					self.animate();
				});

				$('.map_move').click(function(e) {
					if (self.timer_id !== null) {
						clearInterval(self.timer_id);
						self.timer_id = null;
					}

					switch ($(e.target).attr('id')) {
						case 'up':
							self.target_area.y = self.visible_area.y - 50;
						break;

						case 'down':
							self.target_area.y = self.visible_area.y + 50;
						break;

						case 'left':
							self.target_area.x = self.visible_area.x - 50;
						break;

						case 'right':
							self.target_area.x = self.visible_area.x + 50;
						break;
					}

					self.animate();

				});

			},
			animate: function() {
				self.timer_id = setInterval(function() {
					var stopTimer = true;
					if (self.visible_area.x < self.target_area.x) {
						self.visible_area.x+=5;
						stopTimer = false;
					} 

					if (self.visible_area.x > self.target_area.x) {
						self.visible_area.x-=5;
						stopTimer = false;
					}  

					if (self.visible_area.y < self.target_area.y) {
						self.visible_area.y+=5;
						stopTimer = false;
					} 

					if (self.visible_area.y > self.target_area.y) {
						self.visible_area.y-=5;
						stopTimer = false;
					}

					if (self.visible_area.width < self.target_area.width) {
						self.visible_area.width += 10;
						stopTimer = false;
					}

					if (self.visible_area.width > self.target_area.width) {
						self.visible_area.width -= 10;
						stopTimer = false;
					}

					if (self.visible_area.height < self.target_area.height) {
						self.visible_area.height += 10;
						stopTimer = false;
					}

					if (self.visible_area.height > self.target_area.height) {
						self.visible_area.height -= 10;
						stopTimer = false;
					}

					if (stopTimer) {
						clearInterval(self.timer_id);
						self.timer_id = null;
					}

					self.draw();
				}, 10);
			},
			draw: function() {
				var canvas=document.getElementById('mainarea');
				var ctx=canvas.getContext('2d');
				ctx.fillStyle='#FFFFFF';
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < self.starmapData.length; i++) {
					var x = (self.starmapData[i].x - self.visible_area.x) * (canvas.width / self.visible_area.width);
					var y = (self.starmapData[i].y - self.visible_area.y) * (canvas.height / self.visible_area.height);

					var radius = 1;

					ctx.beginPath();
					ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
					ctx.fillStyle = self.starmapData[i].color;
					ctx.fill();
					ctx.lineWidth = 0;
					ctx.strokeStyle = self.starmapData[i].color;
					ctx.stroke();

					ctx.fillStyle = "white";
					ctx.font = "10px Verdana";
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
		},
		login: {
			selector: '.initLogin',
			init: function() {
				$('#login').submit(function(e) {
					e.preventDefault();
				});
				$('#loginsubmit').click(function(e) {
					$.post('/api/user/login', $('#login').serialize(), function(data) {
						if (data.data === null) {
							$('.errorMessage').slideDown(200, function() {
								setTimeout(function() {$('.errorMessage').hide(200)}, 3000);
							});							
						} else {
							window.location.href="/lobby";
						}
					});
				});
			}
		},
		lobby: {
			selector: '.initLobby',
			init: function() {
				self = GAME_ENGINE.modules.lobby;
				$.post('/api/game/gamelist', {}, function(response) {
					for (var i = 0; i < response.data.length; i++) {
						self.addGame(response.data[i]);
					}
				});

				$('#newgame').click(function(e) {
					e.preventDefault();
					$.post('/api/game/newgame', {}, function(response) {
						self.addGame(response.data.game);
					});
				});
			},
			addGame: function(gameData) {
					$('.gamelist').append('<div class="row"><div class="col-md-4"><a href="/game/' + gameData._id + '">' + gameData._id + '</a></div></div>');				
			}
		},
		planet: {
			selector: '.initPlanet',
			init: function() {
				var path = window.location.pathname;
				var separator = path.lastIndexOf('/');
				var starid = '';
				if (separator > -1) {
					starid = path.substring(separator + 1);
				}
				var separator2 = path.lastIndexOf('/', separator - 1);
				if (separator > -1) {
					gameid = path.substring(separator2 + 1, separator);
				}

				if (gameid != null && starid != null) {
					$.post('/api/star/loadstardata', { gameid: gameid, starid : starid } , function(output) {

						var start = 0;

						setInterval(function() {
							start++;
							if (start > 360) {
								start = 0;
							}

							var canvas=document.getElementById('mainarea');
							var ctx=canvas.getContext('2d');
							ctx.fillStyle='#FFFFFF';
							ctx.clearRect(0, 0, canvas.width, canvas.height);

							// Draw the star

							var centerX = 500;
							var centerY = 300;

							ctx.beginPath();
							ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI, false);
							ctx.fillStyle = 'yellow';
							ctx.fill();
							ctx.lineWidth = 0;
							ctx.strokeStyle = 'yellow';
							ctx.stroke();

							for (var i = 0; i < output.data.length; i++) {

								var pos = output.data[i].position;
								var radius = output.data[i].radius;

								var x;
								var y;
								x = centerX + Math.floor(Math.cos( (start + (pos * 45)) * Math.PI / 180) * radius);
								y = centerY + Math.floor(Math.sin( (start + (pos * 45)) * Math.PI / 180) * radius);

/*
								
								switch (pos) {
									case 0:
										origPos = 0;
										//x = centerX;
										//y = centerY - radius;
										break;

									case 1:
										origPos = 45;
//										x = centerX + radius;
//										y = centerY;
										break;

									case 2:
										origPos = 90;
//										x = centerX;
//										y = centerY + radius;
										break;

									case 3:
										origPos = 90 + 45;
										x = centerX - radius;
										y = centerY;
										break;

									case 4:
										x = centerX + Math.floor(Math.cos(start * Math.PI / 180) * radius);
										y = centerY - Math.floor(Math.sin(start * Math.PI / 180) * radius);
										break;

									case 5:
										x = centerX + Math.floor(Math.cos(45 * Math.PI / 180) * radius);
										y = centerY + Math.floor(Math.sin(45 * Math.PI / 180) * radius);
										break;

									case 6:
										x = centerX - Math.floor(Math.cos(45 * Math.PI / 180) * radius);
										y = centerY - Math.floor(Math.sin(45 * Math.PI / 180) * radius);
										break;

									case 7:
										x = centerX - Math.floor(Math.cos(45 * Math.PI / 180) * radius);
										y = centerY + Math.floor(Math.sin(45 * Math.PI / 180) * radius);
										break;
								}*/

								ctx.beginPath();
								ctx.arc(500, 300, radius, 0, 2 * Math.PI, false);
								ctx.lineWidth = 0;
								ctx.strokeStyle = "rgb(50,50,50)";
								ctx.stroke();

								radius = 4;

								ctx.beginPath();
								ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
								ctx.fillStyle = 'blue';
								ctx.fill();
								ctx.lineWidth = 0;
								ctx.strokeStyle = 'blue';
								ctx.stroke();

								ctx.fillStyle = "white";
								ctx.font = "10px Verdana";
								ctx.fillText(output.data[i].name, x + 5, y + 3);


							}


							//console.log('he');
						}, 200);



					//	if (typeof data.error !== 'undefined') {
							// TODO: Handle the error message somehow
					//	} else {
							//$('.signupContainer').replaceWith(data.tpl);
					//	}
					});					
				}
							

			}
		}
	}
}

GAME_ENGINE.init();