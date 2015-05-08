var Lives = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/Lives.png');
		this.setScale(0.140625, 0.140625);
		this.setAnchorPoint(1, 0);
	}
});