var Cone = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/Cone-Red.png');
		this.setScale(0.3125, 0.3125);
		if (Math.random() > 0.5) {
			console.log('YES');
			this.setScaleX(-this.getScaleX());
		}
	},
	
	update: function(dt) {
		this.setPositionY(this.getPositionY() - gameSpeed);
	}
});