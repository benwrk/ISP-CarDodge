var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super(new cc.Color(127, 200, 200, 255));
		this.setPosition(0, 0);
		console.log('Initialized');
		
		this.scoreLabel = cc.LabelTTF.create('0', 'Arial', 40);
		this.scoreLabel.setPosition(screenWidth - 50, screenHeight - 50);
		this.addChild(this.scoreLabel);
		
		this.road = new Road();
		this.road.setPositionX(40);
		this.addChild(this.road);
		
		this.car = new Car();
		this.addChild(this.car);
		this.car.setPosition(screenWidth / 2, 100);
		
		this.addKeyboardHandlers();
		this.scheduleUpdate();
		
		return true;
	},
	
	onKeyDown: function(keyCode, event) {
		console.log('KeyDown: ' + keyCode.toString());
		if (keyCode === cc.KEY.space) {
			this.road.addRoadLines();
			this.road.scheduleUpdate();
		}
	},
	
	onKeyUp: function(keyCode, event) {
		console.log('KeyUp: ' + keyCode.toString());
	},
	
	addKeyboardHandlers: function() {
		var self = this;
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed: function(keyCode, event) {
				self.onKeyDown(keyCode, event);
			},
			onKeyReleased: function(keyCode, event) {
				self.onKeyUp(keyCode, event);
			}
		}, this);
	},
	
	update: function() {
		
	}
});

var StartScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new GameLayer();
		console.log('GameLayer created');
		layer.init();
		this.addChild(layer);
	}
});