var Car = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile("res/images/Car-White.png");
		this.setScale(0.6, 0.6);
		this.setAnchorPoint(0.24, 0);
		this.nextPositionX = 40;
		this.changingLane = false;
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
	
	update: function() {
		if (this.getPositionX() !== this.nextPositionX) {
			this.changingLane = true;
			if (this.nextPositionX < this.getPositionX()) {
				this.setRotation(-10);
				this.setPositionX(this.getPositionX() - 5);
			}
			if (this.nextPositionX > this.getPositionX()) {
				this.setRotation(10);
				this.setPositionX(this.getPositionX() + 5);
			}
		} else {
			this.changingLane = false;
			this.setRotation(0);
		}
		console.log('Car (reported) at: ' + this.getPositionX() + ', ' + this.getPositionY());
	}
});