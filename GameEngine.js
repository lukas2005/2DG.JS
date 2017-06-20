if (typeof Matter == 'undefined' || typeof p5 == 'undefined') {
	
	alert("You don't have all the dependencies included! look at https://github.com/lukas2005/2DG.JS");
	
}

function GameEngine(w_, h_) {
	
	this.w = (w_ || window.innerWidth);
	this.h = (h_ || window.innerHeight);
	
	var game = this;
	
	var STATIC = 0;
	var FOLLOW_PLAYER = 1;
	
	this.localPlayer = null;
	
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
	
	this.players = [];
	
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
			
			if (game.localPlayer != null) {
				
				game.localPlayer.update();
				game.localPlayer.show(p5js);
				
			}
			
			game.PEngine.update(game.pengine)
			
			Matter.Composite.allBodies(game.pengine.world).forEach(function(item, index) {
				
				if (item.wrapper != null) {
					
					item.wrapper.show(p5js);
				
				} else {
					p5js.fill(255);
					p5js.beginShape();
					
					item.vertices.forEach(function(item, index) {
						
						p5js.vertex(item.x,item.y);
						
					});
					
					p5js.endShape(p5js.CLOSE);
				}
				
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
			
			if (game.localPlayer != null) {
				console.log("player!");
				if (p5js.keyIsDown(87) || p5js.keyIsDown(38) || p5js.keyIsDown(32)) { // Up
					game.localPlayer.jump();
				}
				game.localPlayer.keyEvent(p5js);
			}
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
		var pl = new Player(x, y, this);
		
		if (this.localPlayer == null) this.localPlayer = pl;
		this.players.push(pl);
		
		return pl;
	}
	
	this.setCameraMode = function(mode) {
		
		
		
	}
	
	//console.log(this);
	
	//Matter.js Events
	
	Matter.Events.on(this.pengine, 'collisionActive', function(e) {
		var allBodies = Matter.Composite.allBodies(game.pengine.world);
		for (var i=0; i < allBodies.length; i++) {
			for (var j=0; j < e.pairs.length; j++) {
				if (e.pairs[j].bodyA === allBodies[i]) {
					
					if (allBodies.wrapper != null) allBodies[i].wrapper.collisionActive(e.pairs[j].bodyB);
					
				} else if (e.pairs[j].bodyB === allBodies[i]) {
					
					if (allBodies.wrapper != null) allBodies[i].wrapper.collisionActive(e.pairs[j].bodyA);
					
				}
			}
		}	
		
	});

	Matter.Events.on(this.pengine, 'collisionStart', function(e) {
		var allBodies = Matter.Composite.allBodies(game.pengine.world);
		for (var i=0; i < allBodies.length; i++) {
			for (var j=0; j < e.pairs.length; j++) {
				if (e.pairs[j].bodyA === allBodies[i]) {
					
					if (allBodies.wrapper != null) allBodies[i].wrapper.collisionStart(e.pairs[j].bodyB);
					
				} else if (e.pairs[j].bodyB === allBodies[i]) {
					
					if (allBodies.wrapper != null) allBodies[i].wrapper.collisionStart(e.pairs[j].bodyA);
					
				}
			}
		}	
		
	});

	Matter.Events.on(this.pengine, 'collisionEnd', function(e) {
		var allBodies = Matter.Composite.allBodies(game.pengine.world);
		for (var i=0; i < allBodies.length; i++) {
			for (var j=0; j < e.pairs.length; j++) {
				if (e.pairs[j].bodyA === allBodies[i]) {
					
					if (allBodies.wrapper != null) allBodies[i].wrapper.collisionEnd(e.pairs[j].bodyB);
					
				} else if (e.pairs[j].bodyB === allBodies[i]) {
					
					if (allBodies.wrapper != null) allBodies[i].wrapper.collisionEnd(e.pairs[j].bodyA);
					
				}
			}
		}	
		
	});
	
}