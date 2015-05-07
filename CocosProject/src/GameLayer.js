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
		
		this.cones = [];
		
		this.addKeyboardHandlers();
		
		return true;
	},
	
	onKeyDown: function(keyCode, event) {
		console.log('KeyDown: ' + keyCode.toString());
		if (keyCode === cc.KEY.space) {
			this.road.scheduleUpdate();
			this.car.scheduleUpdate();
			this.scheduleUpdate();
		}
		if (keyCode === cc.KEY.left) {
			this.car.moveLeft();
		}
		if (keyCode === cc.KEY.right) {
			this.car.moveRight();
		}
		if (keyCode === cc.KEY.up) {
			this.car.moveUp();
		}
		if (keyCode === cc.KEY.down) {
			this.car.moveDown();
		}
	},
	
	onKeyUp: function(keyCode, event) {
		console.log('KeyUp: ' + keyCode.toString());
		if (keyCode === cc.KEY.up || keyCode === cc.KEY.down) {
			this.car.stopVerticalMove();
		}
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
		this.spawnConeRandomly();
	},
	
	spawnConeRandomly: function() {
		if (this.cones.length < 5 && Math.random() > 0.99 - (gameSpeed / 200)) {
			var cone = new Cone();
			var randomXPos = Math.round(Math.random() * 6) * 80 + 80;
//			console.log('RXP: ' + randomXPos);
			cone.setPosition(randomXPos, screenHeight);
			cone.scheduleUpdate();
			this.addChild(cone);
			this.cones.push(cone);
//			console.log('FOJ: ' + this.cones[0]);
		}
		while (this.cones[0] != null && this.cones[0].getPositionY() < -20) {
			this.cones[0].unscheduleUpdate();
			this.removeChild(this.cones[0]);
			this.cones.splice(0, 1);
		}
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