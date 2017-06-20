function GameEngine(w_, h_) {
	
	this.w = (w_ || window.innerWidth);
	this.h = (h_ || window.innerHeight);
	
	var game = this;
	
	var STATIC = 0;
	var FOLLOW_PLAYER = 1;
	
	var localPlayer;
	
	this.keyCodes = {
		
		W:87,
		S:83,
		A:65,
		D:68
		
	};
	
	this.gameLoopListeners = [];
	this.keyListeners = [];
	this.mousePressedListeners = [];
	this.gameSetupListeners = [];
	
	this.PEngine = Matter.Engine;
	//this.PRender = Matter.Render;
	this.PWorld = Matter.World;
	this.PBodies = Matter.Bodies;
	
	this.pengine = this.PEngine.create();
	
	this.players
	
	this.sketch = function(p5js) {
		
		p5js.setup = function() {
			p5js.createCanvas(game.w, game.h);
			p5js.rectMode(p5js.CENTER);
			//p5js.background(51);
			game.loadLevel(new GameLevel());
			
			game.gameSetupListeners.forEach(function(item, index) {
				
				item(p5js);
				
			});			
		}
		
		p5js.draw = function() {
			p5js.background(51);
			
			game.gameLoopListeners.forEach(function(item, index) {
				
				item(p5js);
				
			});
			
			game.PEngine.update(game.pengine)
			
			Matter.Composite.allBodies(game.pengine.world).forEach(function(item, index) {
				
				item.wrapper.show(p5js);
				
			});	
		}
		
		p5js.mousePressed = function() {
			game.mousePressedListeners.forEach(function(item, index) {
				
				item(p5js);
				
			});
		}
		
		p5js.keyPressed = function(key) {
			
			game.keyListeners.forEach(function(item, index) {
				
				if (item.keyCode != null && p5js.keyCode == item.keyCode) {
					
					item.callback(p5js);
					
				} else if (item.keyCode == null) {
					
					item(p5js);
					
				}
				
			});			
			
		}
		
	}
	
	this.p5js = new p5(this.sketch);
	
	this.addGameLoopListener = function(gameLoop) {
		
		this.gameLoopListeners.push(gameLoop);
		
	}
	
		this.addGameSetupListener = function(gameLoop) {
		
		this.gameSetupListeners.push(gameLoop);
		
	}
	
	this.addKeyListener = function(keyListener) {
		
		this.keyListeners.push(keyListener);
		
	}
	
	this.addMousePressedListener = function(mousePressedListener) {
		
		this.mousePressedListeners.push(mousePressedListener);
		
	}	
	
	this.loadLevel = function(level) {
		
		this.PWorld.clear(this.pengine.world, false)
		new rect(this.p5js.width/2, this.p5js.height, this.p5js.width, 30, this, {isStatic:true});		
		level.world.forEach(function(item, index) {
				
			this.PWorld.add(this.pengine.world, item.body)
				
		});	
		
	}	
	
	this.spawnPlayer = function(x , y) {
		var pl = new Player(x, y);
			
		
		
		return pl;
	}
	
	this.setCameraMode = function(mode) {
		
		
		
	}
	
	//console.log(this);
	
}