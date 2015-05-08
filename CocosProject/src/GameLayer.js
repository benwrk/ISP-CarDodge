var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super(new cc.Color(127, 200, 200, 255));
		this.setPosition(0, 0);
		
		this.score = 0;
		this.scoreLabel = cc.LabelTTF.create(this.score, 'Arial', 40);
		this.scoreLabel.setPosition(screenWidth - 50, screenHeight - 50);
		this.addChild(this.scoreLabel);
		
		this.road = new Road();
		this.road.setPositionX(40);
		this.addChild(this.road);
		
		this.car = new Car();
		this.addChild(this.car);
		this.car.setPositionX(40);
		this.car.setPositionY(20);
		
		this.cursor = new TestCursor();
		this.cursor.setPosition(screenWidth / 2, screenHeight / 2);
		this.addChild(this.cursor);
		
		this.cones = [];
		
		this.addKeyboardHandlers();
		
		return true;
	},
	
	onKeyDown: function(keyCode, event) {
//		console.log('KeyDown: ' + keyCode.toString());
		if (keyCode === cc.KEY.space) {
			this.road.scheduleUpdate();
			this.car.scheduleUpdate();
			this.scheduleUpdate();
			for (var i in this.cones) {
				this.cones[i].scheduleUpdate();
			}
		}
		if (keyCode === cc.KEY.x) {
			this.road.unscheduleUpdate();
			this.car.unscheduleUpdate();
			this.unscheduleUpdate();
			for (var i in this.cones) {
				this.cones[i].unscheduleUpdate();
			}
		}
		if (keyCode === cc.KEY.z) {
			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
			console.log('Car at: ' + this.car.getPositionX() + ', ' + this.car.getPositionY());
			for (var i in this.cones) {
				console.log('Cone[' + i + '] at: ' + this.cones[i].getPositionX() + ', ' + this.cones[i].getPositionY());
			}
		}
		if (keyCode === cc.KEY.n) {
			this.car.scheduleUpdate();
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
		if (keyCode === cc.KEY.w) {
			this.cursor.setPositionY(this.cursor.getPositionY() + 10);
			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
		}
		if (keyCode === cc.KEY.s) {
			this.cursor.setPositionY(this.cursor.getPositionY() - 10);
			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
		}
		if (keyCode === cc.KEY.a) {
			this.cursor.setPositionX(this.cursor.getPositionX() - 10);
			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
		}
		if (keyCode === cc.KEY.d) {
			this.cursor.setPositionX(this.cursor.getPositionX() + 10);
			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
		}
	},
	
	onKeyUp: function(keyCode, event) {
//		console.log('KeyUp: ' + keyCode.toString());
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
		for (var i in this.cones) {
			if (this.cones[i].isCarHit(this.car)) {
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!');
			}
		}
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
		while (this.cones[0] != null && this.cones[0].getPositionY() < -60) {
			this.cones[0].unscheduleUpdate();
			this.removeChild(this.cones[0]);
			this.cones.splice(0, 1);
		}
	},
	
	gameOver: function() {
		this.road.unscheduleUpdate();
		this.car.unscheduleUpdate();
		this.unscheduleUpdate();
		for (var i in this.cones) {
			this.cones[i].unscheduleUpdate();
		}
	},
	
	restart: function() {
		
	}
});

var PrefaceLayer = cc.Layer.extend({
	init: function() {
		
	}
});

var GameOverLayer = cc.Layer.extend({
	init: function() {
		
	}
});

var StartScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		this.layer = new GameLayer();
		this.layer.init();
		this.addChild(this.layer);
	}
});