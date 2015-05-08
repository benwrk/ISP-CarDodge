var Cone = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/Cone-Red.png');
		this.setScale(0.3125, 0.3125);
		this._setAnchorY(0);
		if (Math.random() > 0.5) {
			console.log('YES');
			this.setScaleX(-this.getScaleX());
		}
	},
	
	update: function(dt) {
		this.setPositionY(this.getPositionY() - gameSpeed);
	},
	
	isCarHit: function(car) {
		if (car instanceof Car) {
			var yInRange = function(cone) {
				if (cone.getPositionY() - car.getPositionY() > 0 && cone.getPositionY() - car.getPositionY() <= 145) {
					return true;
				}
				if (car.getPositionY() - cone.getPositionY() > 0 && car.getPositionY() - cone.getPositionY() <= 60) {
					return true;
				}
				return false;
			};
			var xInRange = function(cone) {
//				if ((cone.getPositionX() - 35) - (car.getPositionX() + 72) <= 0 && car.getPositionX() < cone.getPositionX()) {
//					return true;
//				}
//				if ((car.getPositionX() + 8) - (cone.getPositionX() + 35) <= 0 && car.getPositionX() > cone.getPositionX()) {
//					return true;
//				}
				if ((cone.getPositionX() - 35) - ((car.nextPositionX + car.getPositionX()) / 2 + 72) <= -10 && (car.nextPositionX + car.getPositionX()) / 2 < cone.getPositionX()) {
					return true;
				}
				if ((car.nextPositionX + car.getPositionX()) / 2 + 8 - (cone.getPositionX() + 35) <= -10 && (car.nextPositionX + car.getPositionX()) / 2 > cone.getPositionX()) {
					return true;
				}
				return false;
			}
			return xInRange(this) && yInRange(this);
		}
		return false;
	}
});