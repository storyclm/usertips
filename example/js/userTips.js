var UTManager = function (options) {
	this.options = options || {};
	if (this instanceof UTManager) {
		this.obj = options.obj || [];
		var ojsLength = this.obj.length;
		if (!ojsLength) return;

		// for text and picture
		this.actionType = options.actionType || ["pic"];// "txt"
		this.tapInterval = options.tapInterval || 100;
		this.flashColor = options.flashColor || ["#fff"];
		this.flashCount = options.flashCount || "infinite";
		this.flashInterval = options.flashInterval || 800;

		// for drag and slider
		this.deltaX = options.deltaX || [0];
		this.deltaY = options.deltaY || [0];
		this.dragInterval = options.dragInterval || 100;
		this.objectOpacity = options.objectOpacity || 0.4;

		// for all tipes
		this.delay = options.delay || 500;
		this.duration = options.duration || 500;
		this.handler = options.handler || null;

		// for switch animation
		this.userTipsEnabled = window.sessionStorage.getItem("userTipsEnabled") === 'true';

		// exceptions
		var typesLength = this.actionType.length;
		if (typesLength != 1 && typesLength != ojsLength) {
			alert("Ошибка объекта User Tips. Заданное количество типов подсветки не соответствует количеству объектов.");
			this.userTipsEnabled = false;
		}

		var colorsLength = this.flashColor.length;
		if (colorsLength != 1 && colorsLength != ojsLength) {
			alert("Ошибка объекта User Tips. Заданное количество цветов подсветки не соответствует количеству объектов.");
			this.userTipsEnabled = false;
		}

		var deltaXLength = this.deltaX.length;
		if (deltaXLength != 1 && deltaXLength != ojsLength) {
			alert("Ошибка объекта User Tips. Заданное количество горизонтальных смещений не соответствует количеству объектов.");
			this.userTipsEnabled = false;
		}

		var deltaYLength = this.deltaY.length;
		if (deltaYLength != 1 && deltaYLength != ojsLength) {
			alert("Ошибка объекта User Tips. Заданное количество вертикальных смещений не соответствует количеству объектов.");
			this.userTipsEnabled = false;
		}
	} else {
		return new UTManager(this.options);
	}
};

UTManager.prototype.flash = function () {
	var self = this;
	if (!self.userTipsEnabled && self.handler != null) {
		self.handler();
		return;
	}

	var count = self.flashCount;
	var start_time = self.delay;
	var len = self.obj.length;
	var del = start_time + len * self.tapInterval + 500;
	self.handlerAction(del);
	if(count == 1) {
		for (var i = 0; i < len; i++) {
			(function (i) {
				setTimeout(function () {
					var effect;
					var color;
					var tapObj = self.obj[i];

					if (self.actionType.length == 1) {
						effect = self.actionType[0];
					} else {
						effect = self.actionType[i];
					}

					var count = 20;
					$(tapObj).css({orphans: count});
					if (effect == "pic") {
						$(tapObj).css("-webkit-filter", "saturate(1) brightness(1) drop-shadow(0px 0px 20px #fff)");
						count = 1;
						setTimeout(function () {
							$(tapObj).animate({orphans: count}, {
								step: function (now, fx) {
									$(this).css("-webkit-filter", "saturate("+ 1/now +") brightness(" + now/2 + ") drop-shadow(0 0 " + now + "px #fff)");
									console.log(1/now + " " + now/2 + " " + now);
								},
								duration: self.duration,
								complete: function () {
									$(tapObj).css("-webkit-filter", "none");
								}
							});
						}, 100);
					} else {
						$(tapObj).css("text-shadow", "0 0 20px " + color);
						count = 0;
						setTimeout(function () {
							$(tapObj).animate({orphans: count}, {
								step: function (now, fx) {
									$(this).css("text-shadow", "0 0 " + now + "px " + color);
								},
								duration: self.duration,
								complete: function () {
									$(tapObj).css("text-shadow", "none");
								}
							});
						}, 100);
					}
				}, start_time += self.tapInterval);
			})(i);
		}
	} else if (count > 1) {
		for (var j = 0; j<count; j++) {
			setTimeout(function() {
				for (var i = 0; i < len; i++) {
					(function (i) {
						setTimeout(function () {
							var effect;
							var color;
							var tapObj = self.obj[i];

							if (self.actionType.length == 1) {
								effect = self.actionType[0];
							} else {
								effect = self.actionType[i];
							}

							var count = 20;
							$(tapObj).css({orphans: count});
							if (effect == "pic") {
								$(tapObj).css("-webkit-filter", "saturate(1) brightness(1) drop-shadow(0px 0px 20px #fff)");
								count = 1;
								setTimeout(function () {
									$(tapObj).animate({orphans: count}, {
										step: function (now, fx) {
											$(this).css("-webkit-filter", "saturate("+ 1/now +") brightness(" + now/2 + ") drop-shadow(0 0 " + now + "px #fff)");
											console.log(1/now + " " + now/2 + " " + now);
										},
										duration: self.duration,
										complete: function () {
											$(tapObj).css("-webkit-filter", "none");
										}
									});
								}, 100);
							} else {
								$(tapObj).css("text-shadow", "0 0 20px " + color);
								count = 0;
								setTimeout(function () {
									$(tapObj).animate({orphans: count}, {
										step: function (now, fx) {
											$(this).css("text-shadow", "0 0 " + now + "px " + color);
										},
										duration: self.duration,
										complete: function () {
											$(tapObj).css("text-shadow", "none");
										}
									});
								}, 100);
							}
						}, start_time += self.tapInterval);
					})(i);
				}
			}, self.flashInterval);
		}
	} else if (count == "infinite") {
		var intervalID = setInterval(function() {
			for (var i = 0; i < len; i++) {
				(function (i) {
					setTimeout(function () {
						var effect;
						var color;
						var tapObj = self.obj[i];

						if (self.actionType.length == 1) {
							effect = self.actionType[0];
						} else {
							effect = self.actionType[i];
						}

						var count = 20;
						$(tapObj).css({orphans: count});
						if (effect == "pic") {
							$(tapObj).css("-webkit-filter", "saturate(1) brightness(1) drop-shadow(0px 0px 20px #fff)");
							count = 1;
							setTimeout(function () {
								$(tapObj).animate({orphans: count}, {
									step: function (now, fx) {
										$(this).css("-webkit-filter", "saturate("+ 1/now +") brightness(" + now/1 + ") drop-shadow(0 0 " + now + "px #fff)");
										console.log(1/now + " " + now/2 + " " + now);
									},
									duration: self.duration,
									complete: function () {
										$(tapObj).css("-webkit-filter", "none");
									}
								});
							}, 100);
						} else {
							$(tapObj).css("text-shadow", "0 0 20px " + color);
							count = 0;
							setTimeout(function () {
								$(tapObj).animate({orphans: count}, {
									step: function (now, fx) {
										$(this).css("text-shadow", "0 0 " + now + "px " + color);
									},
									duration: self.duration,
									complete: function () {
										$(tapObj).css("text-shadow", "none");
									}
								});
							}, 100);
						}
					}, start_time += self.tapInterval);
				})(i);
			}
		}, self.flashInterval);
	}
	
};

UTManager.prototype.tap = function () {
	var self = this;
	if (!self.userTipsEnabled && self.handler != null) {
		self.handler();
		return;
	}

	var start_time = self.delay;
	var len = self.obj.length;
	var del = start_time + len * self.tapInterval + 500;
	self.handlerAction(del);
	for (var i = 0; i < len; i++) {
		(function (i) {
			setTimeout(function () {
				var effect;
				var color;
				var tapObj = self.obj[i];

				if (self.actionType.length == 1) {
					effect = self.actionType[0];
				} else {
					effect = self.actionType[i];
				}

				if (self.flashColor.length == 1) {
					color = self.flashColor[0];
				} else {
					color = self.flashColor[i];
				}

				var count = 20;
				$(tapObj).css({orphans: count});
				if (effect == "pic") {
					$(tapObj).css("-webkit-filter", "drop-shadow(0px 0px 20px " + color + ")");
					count = 0;
					setTimeout(function () {
						$(tapObj).animate({orphans: count}, {
							step: function (now, fx) {
								$(this).css("-webkit-filter", "drop-shadow(0 0 " + now + "px " + color + ")");
							},
							duration: self.duration,
							complete: function () {
								$(tapObj).css("-webkit-filter", "none");
							}
						});
					}, 100);
				} else {
					$(tapObj).css("text-shadow", "0 0 20px " + color);
					count = 0;
					setTimeout(function () {
						$(tapObj).animate({orphans: count}, {
							step: function (now, fx) {
								$(this).css("text-shadow", "0 0 " + now + "px " + color);
							},
							duration: self.duration,
							complete: function () {
								$(tapObj).css("text-shadow", "none");
							}
						});
					}, 100);
				}
			}, start_time += self.tapInterval);
		})(i);
	}
};

UTManager.prototype.drag = function () {
	var self = this;
	if (!self.userTipsEnabled && self.handler != null) {
		self.handler();
		return;
	}

	var start_time = self.delay;
	var len = self.obj.length;
	var dragDuration = self.duration / 2;
	var del = start_time + len * self.dragInterval + self.duration;
	self.handlerAction(del);
	for (var i = 0; i < len; i++) {
		(function (i) {
			var deltaX;
			var deltaY;
			if (self.deltaX.length == 1) {
				deltaX = self.deltaX[0];
			} else {
				deltaX = self.deltaX[i];
			}

			if (self.deltaY.length == 1) {
				deltaY = self.deltaY[0];
			} else {
				deltaY = self.deltaY[i];
			}
			setTimeout(function () {
				var tapObj = self.obj[i];
				var startPositionTop = $(tapObj).position().top;
				var startPositionLeft = $(tapObj).position().left;
				var dragCopy = $(tapObj).clone().insertBefore($(tapObj)).css("opacity", String(self.objectOpacity));
				dragCopy.animate({left: startPositionLeft + deltaX, top: startPositionTop + deltaY}, dragDuration, function () {
					dragCopy.animate({left: startPositionLeft, top: startPositionTop}, dragDuration, function () {
						dragCopy.remove();
					});
				});
			}, start_time += self.dragInterval);
		})(i);
	}
};

UTManager.prototype.handlerAction = function (delay) {
	var self = this;
	if (self.handler != null) {
		setTimeout(function () {
			self.handler();
		}, delay)
	}
};