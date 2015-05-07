var Road = cc.Node.extend({
	ctor: function() {
		this._super();
		this.setAnchorPoint(0, 0);
//		this.setColor(new cc.Color(25, 25, 25, 255));
//		this.set
//		this._setWidth(512);
//		this._setHeight(screenHeight);
		this.roadTile = new cc.Sprite();
		this.roadTile.initWithFile('res/images/RoadTile.png');
		this.roadTile.setScale(2.1875, screenHeight / 256);
		this.roadTile.setAnchorPoint(0, 0);
		this.roadTile.setPositionX(0);
		this.addChild(this.roadTile);
		
		this.roadLines = [];
		this.addRoadLines();
		
//		this.roadLine = new cc.Sprite();
//		this.roadLine.initWithFile('res/images/WhiteTile.png');
//		this.roadLine.setScale(0.01953125, 0.5);
//		this.roadLine.setAnchorPoint(0, 0.5);
	},
	
	addRoadLines: function() {
		for (var i = 80; i < this.roadTile._getWidth() * this.roadTile.getScaleX(); i += 80) {
			for (var j = 0; j <= this.roadTile._getHeight() * this.roadTile.getScaleY(); j += 180) {
				console.log(i + ', ' + j);
				var roadLine = new cc.Sprite();
				roadLine.initWithFile('res/images/WhiteTile.png');
				roadLine.setScale(0.01953125, 0.46875);
				roadLine.setAnchorPoint(0.5, 0);
				roadLine.setPosition(i, this.roadTile._getHeight() * this.roadTile.getScaleY() - j);
				this.roadLines.push(roadLine);
				this.addChild(roadLine);
			}
		}
	},
	
	update: function(dt) {
		this.animateRoadLines();
	},
	
	animateRoadLines: function() {
		for (var i in this.roadLines) {
			var line = this.roadLines[i];
			line.setPositionY(line.getPositionY() - gameSpeed);
			if (line.getPositionY() < -120) {
				line.setPositionY(screenHeight);
			}
		}
	}
});