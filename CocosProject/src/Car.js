var Car = cc.Sprite.extend({
	ctor : function() {
		this._super();
		this.initWithFile("res/images/Car-White.png");
		this.setScale(0.6, 0.6);
	}
});