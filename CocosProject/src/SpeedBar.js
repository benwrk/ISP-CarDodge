var SpeedBar = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/WhiteTile.png');
		this.setScale(0.05859375, screenHeight / 256);
		this.setAnchorPoint(0.5, 1);
	}
});