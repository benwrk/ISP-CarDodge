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
		this.car.setPositionX(40);
		this.car.setPositionY(20);
		this.car.scheduleUpdate();
		
		this.addKeyboardHandlers();
		this.scheduleUpdate();
		
		return true;
	},
	
	onKeyDown: function(keyCode, event) {
		console.log('KeyDown: ' + keyCode.toString());
		if (keyCode === cc.KEY.space) {
			this.road.scheduleUpdate();
		}
		if (keyCode === cc.KEY.left) {
			this.car.moveLeft();
		}
		if (keyCode === cc.KEY.right) {
			this.car.moveRight();
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
		console.log('Car at: ' + this.car.getPositionX() + ', ' + this.car.getPositionY());
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