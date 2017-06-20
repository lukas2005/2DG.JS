function GameEngine(w_, h_) {
	
	this.w = w_ || window.innerWidth;
	this.w = h_ || window.innerHeight;
	
	this.keyCodes = {
		
		W:87,
		S:83,
		A:65,
		D:68
		
	};
	
	this.gameLoopListeners = [];
	this.keyListeners = [];
	this.mousePressedListeners = [];
	
	this.PEngine = Matter.Engine;
	//this.PRender = Matter.Render;
	this.PWorld = Matter.World;
	this.PBodies = Matter.Bodies;
	
	this.pengine = this.PEngine.create();
	
	var game = this;
	
	this.sketch = function(p5js) {
		
		p5js.setup = function() {
			p5js.createCanvas(this.w, this.h);
			p5js.rectMode(p5js.CENTER);
			
	
		}
		
		p5js.draw = function() {
			p5js.background(51);
			//console.log(this);
			game.PEngine.update(game.pengine)
			Matter.Composite.allBodies(game.pengine.world).forEach(function(item, index) {
				
				item.wrapper.show(p5js);
				
			});
			game.gameLoopListeners.forEach(function(item, index) {
				
				item(p5js);
				
			});
		}
		
		p5js.mousePressed = function() {
			game.mousePressedListeners.forEach(function(item, index) {
				
				item();
				
			});
		}
		
		p5js.keyPressed = function(key) {
			
			game.keyListeners.forEach(function(item, index) {
				
				if (item.keyCode != null && p5js.keyCode == item.keyCode) {
					
					item.callback(p5js.keyCode);
					
				} else if (item.keyCode == null) {
					
					item();
					
				}
				
			});			
			
		}
		
	}
	
	this.p5js = new p5(this.sketch);
	
	this.addGameLoopListener = function(gameLoop) {
		
		this.gameLoopListeners.push(gameLoop);
		
	}
	
	this.addKeyListener = function(keyListener) {
		
		this.keyListeners.push(keyListener);
		
	}
	
	this.addMousePressedListener = function(mousePressedListener) {
		
		this.mousePressedListeners.push(mousePressedListener);
		
	}	
	
	console.log(this);
	
}