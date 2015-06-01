var Car = cc.Sprite.extend({

	ctor: function() {
		this._super();
		
		this.initWithRandomColor();
		
		this.setScale(0.6, 0.6);
		this.setAnchorPoint(0.24, 0);
		this.nextPositionX = 40;
		this.changingLane = false;
		this.directionY = Car.DIRECTION_Y.STILL;
	},
	
	initWithRandomColor: function() {
		var colorRandomizer = Math.random();

		if (colorRandomizer >= 0.8) {
			this.initWithFile("res/images/Car-Blue.png");
		} else if (colorRandomizer >= 0.6) {
			this.initWithFile("res/images/Car-Green.png");
		} else if (colorRandomizer >= 0.4) {
			this.initWithFile("res/images/Car-Red.png");
		} else if (colorRandomizer >= 0.2) {
			this.initWithFile("res/images/Car-Yellow.png");
		} else {
			this.initWithFile("res/images/Car-White.png");
		}
	},
	
	moveUp: function() {
		this.directionY = Car.DIRECTION_Y.UP;
	},
	
	moveDown: function() {
		this.directionY = Car.DIRECTION_Y.DOWN;
	},
	
	moveLeft: function() {
		if (this.getPositionX() >= 120 && !this.changingLane) {
			this.nextPositionX = this.getPositionX() - 80;
		}
	},
	
	moveRight: function() {
		if (this.getPositionX() <= 480 && !this.changingLane) {
			this.nextPositionX = this.getPositionX() + 80;
		}
	},
	
	stopVerticalMove: function() {
		this.directionY = Car.DIRECTION_Y.STILL;
	},
	
	update: function(dt) {
		this.animateLaneChange();
		this.performVerticalMove();
//		console.log('Car (reported) at: ' + this.getPositionX() + ', ' + this.getPositionY());
	},
	
	animateLaneChange: function() {
		if (this.getPositionX() !== this.nextPositionX) {
			this.changingLane = true;
			if (this.nextPositionX < this.getPositionX()) {
				this.setRotation(-10);
				this.setPositionX(this.getPositionX() - 10);
			}
			if (this.nextPositionX > this.getPositionX()) {
				this.setRotation(10);
				this.setPositionX(this.getPositionX() + 10);
			}
		} else {
			this.changingLane = false;
			this.setRotation(0);
		}
	},
	
	performVerticalMove: function() {
		switch (this.directionY) {
		case Car.DIRECTION_Y.UP:
			if (this.getPositionY() < 400) {
				this.setPositionY(this.getPositionY() + gameSpeed);
			}
			break;
		case Car.DIRECTION_Y.DOWN:
			if (this.getPositionY() > 0) {
				this.setPositionY(this.getPositionY() - gameSpeed);
			}
			break;
		case Car.DIRECTION_Y.STILL:
			break;
		}
	}
});

Car.DIRECTION_Y = {
	UP: 1,
	STILL: 0,
	DOWN: -1
}