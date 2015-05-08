var TestCursor = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/Cursor.png');
		this.setAnchorPoint(0, 1);
		this.setScale(0.0390625, 0.0390625);
	}
});