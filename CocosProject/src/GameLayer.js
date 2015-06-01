var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super(new cc.Color(127, 200, 200, 255));
		this.setPosition(0, 0);
		
		this.score = 0;
		this.lives = 5;
		this.scoreLabel = cc.LabelTTF.create(this.score, 'Arial', 40);
		this.scoreLabel.setAnchorPoint(1, 1);
		this.scoreLabel.setPosition(screenWidth - 20, screenHeight - 20);
		this.addChild(this.scoreLabel);
		
		this.road = new Road();
		this.road.setPositionX(40);
		this.addChild(this.road);
		
		this.car = new Car();
		this.addChild(this.car, 1);
		this.car.setPositionX(40);
		this.car.setPositionY(20);
		
		this.livesLabel = cc.LabelTTF.create(this.lives, 'Arial', 40);
		this.livesLabel.setAnchorPoint(1, 1);
		this.livesLabel.setPosition(screenWidth - 60, 59);
		this.livesLabel.setColor(new cc.Color(250, 11, 11, 255));
		this.addChild(this.livesLabel);
		
		this.live = new Lives();		
		this.live.setPositionX(screenWidth - 20);
		this.live.setPositionY(20);
		this.addChild(this.live);
		
		this.speedBar = new SpeedBar();
		this.speedBar.setPositionX(20);
		this.addChild(this.speedBar);
		
		this.gameOverLabel = cc.LabelTTF.create('Game Over', 'Arial', 60)
		this.gameOverLabel.setPosition(screenWidth / 2, screenHeight / 2);
		this.gameOverLabel.setAnchorPoint(0.5, 0.5);
		this.addChild(this.gameOverLabel);
		this.gameOverLabel.setOpacity(0)
		
//		this.cursor = new TestCursor();
//		this.cursor.setPosition(screenWidth / 2, screenHeight / 2);
//		this.addChild(this.cursor);
		
		this.cones = [];
		
		this.addKeyboardHandlers();
		
		return true;
	},
	
	onKeyDown: function(keyCode, event) {
//		console.log('KeyDown: ' + keyCode.toString());
		if (keyCode === cc.KEY[decelKey]) {
			if (gameSpeed > 1) {
				gameSpeed--;
			}
		}
		if (keyCode === cc.KEY[accelKey]) {
			if (gameSpeed < 25) {
				gameSpeed++;
			}
		}
		if (keyCode === cc.KEY.space) {
			this.restart();
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
		
///////////////////////////////////////	
////////CODE FOR DEBUGGING MODE////////
///////////////////////////////////////
//		
//		if (keyCode === cc.KEY.w) {
//			this.cursor.setPositionY(this.cursor.getPositionY() + 10);
//			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
//		}
//		if (keyCode === cc.KEY.s) {
//			this.cursor.setPositionY(this.cursor.getPositionY() - 10);
//			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
//		}
//		if (keyCode === cc.KEY.a) {
//			this.cursor.setPositionX(this.cursor.getPositionX() - 10);
//			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
//		}
//		if (keyCode === cc.KEY.d) {
//			this.cursor.setPositionX(this.cursor.getPositionX() + 10);
//			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
//		}
//		if (keyCode === cc.KEY.x) {
//			this.road.unscheduleUpdate();
//			this.car.unscheduleUpdate();
//			this.unscheduleUpdate();
//			for (var i in this.cones) {
//				this.cones[i].unscheduleUpdate();
//			}
//		}
//		if (keyCode === cc.KEY.z) {
//			console.log('Cursor at: ' + this.cursor.getPositionX() + ', ' + this.cursor.getPositionY());
//			console.log('Car at: ' + this.car.getPositionX() + ', ' + this.car.getPositionY());
//			for (var i in this.cones) {
//				console.log('Cone[' + i + '] at: ' + this.cones[i].getPositionX() + ', ' + this.cones[i].getPositionY());
//			}
//		}
//		if (keyCode === cc.KEY.n) {
//			this.car.scheduleUpdate();
//		}
///////////////////////////////////////
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
		this.removePassedConeAndAddScore();
		this.checkHit();

		this.livesLabel.setString(Number(this.lives).toFixed(2));
		this.scoreLabel.setString(this.score);
		this.speedBar.setPositionY((gameSpeed / 25) * screenHeight);
	},
	
	checkHit: function() {
		for (var i in this.cones) {
			if (this.cones[i].isCarHit(this.car)) {
//				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!');
				this.lives -= gameSpeed / 300;
				if (this.lives <= 0) {
					this.lives = 0;
					this.gameOver();
				}
			}
		}
	},
	
	spawnConeRandomly: function() {
		if (this.cones.length < 5 && Math.random() > 0.99 - (gameSpeed / 150)) {
			var cone = new Cone();
			var randomXPos = Math.round(Math.random() * 6) * 80 + 80;
//			console.log('RXP: ' + randomXPos);
			cone.setPosition(randomXPos, screenHeight);
			cone.scheduleUpdate();
			this.addChild(cone);
			this.cones.push(cone);
//			console.log('FOJ: ' + this.cones[0]);
		}
	},
	
	removePassedConeAndAddScore: function() {
		while (this.cones[0] != null && this.cones[0].getPositionY() < -60) {
			this.cones[0].unscheduleUpdate();
			this.removeChild(this.cones[0]);
			this.cones.splice(0, 1);
			this.score += gameSpeed * gameSpeed;
		}
	},
	
	gameOver: function() {
		this.road.unscheduleUpdate();
		this.car.unscheduleUpdate();
		this.unscheduleUpdate();
		for (var i in this.cones) {
			this.cones[i].unscheduleUpdate();
		}
		this.gameOverLabel.setOpacity(255);
		this.gameOverLabel.setLocalZOrder(2);
	},
	
	restart: function() {
		gameSpeed = 3;
		this.lives = 5;
		this.score = 0;
		this.road.scheduleUpdate();
		this.car.scheduleUpdate();
		this.scheduleUpdate();
		for (var i in this.cones) {
			this.cones[i].scheduleUpdate();
		}
		this.gameOverLabel.setOpacity(0);
	}
});

var PrefaceLayer = cc.Layer.extend({
	init: function() {
		this._super();
		this.setColor(new cc.Color(127, 200, 200, 255));
		this.label = cc.LabelTTF.create('CarDodger', 'Arial', 50);
		this.label.setColor(new cc.Color(255, 255, 255, 255));
		this.label.setAnchorPoint(0.5, 0.5);
		this.label.setPosition(screenWidth / 2, screenHeight - 120);
		this.addChild(this.label);
		
		this.label2 = cc.LabelTTF.create('Use ⬆⬇⬅➡ to control the car,', 'Arial', 45);
		this.label2.setColor(new cc.Color(255, 255, 255, 255));
		this.label2.setAnchorPoint(0.5, 0.5);
		this.label2.setPosition(screenWidth / 2, screenHeight / 2 + 10);
		this.addChild(this.label2);
		
		this.label3 = cc.LabelTTF.create(accelKey.toUpperCase() + ' ' + decelKey.toUpperCase() + ' to adjust speed. Avoid the cones.', 'Arial', 45);
		this.label3.setColor(new cc.Color(255, 255, 255, 255));
		this.label3.setAnchorPoint(0.5, 0.5);
		this.label3.setPosition(screenWidth / 2, screenHeight / 2 - 50);
		this.addChild(this.label3);
		this.addKeyboardHandlers();
		
		this.label4 = cc.LabelTTF.create('Press space to start/restart the game.', 'Arial', 45);
		this.label4.setColor(new cc.Color(255, 255, 255, 255));
		this.label4.setAnchorPoint(0.5, 0.5);
		this.label4.setPosition(screenWidth / 2, 70);
		this.addChild(this.label4);
		this.addKeyboardHandlers();
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
	
	onKeyDown: function(keyCode, event) {
		if (keyCode === cc.KEY.space) {
			scene.removeChild(scene.layer);
			scene.layer = new GameLayer();
			scene.layer.init();
			scene.addChild(scene.layer);
		}
	},
	
	onKeyUp: function(keyCode, event) {
		// Do nothing.
	}
});

var StartScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		this.layer = new PrefaceLayer();
		this.layer.init();
		this.addChild(this.layer);
	}
});