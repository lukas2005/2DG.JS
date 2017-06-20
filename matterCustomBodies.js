function rect(_x, _y, _w, _h, game, _options) {

	this.w = _w;
	this.h = _h;
	
	this.options = _options || {};
	
	this.body = Matter.Bodies.rectangle(_x, _y, _w, _h, this.options);
	
	this.body.wrapper = this;
	
	this.pos = this.body.position;
	
	this.show = function(p5js) {
		
		p5js.push();
		p5js.translate(this.pos.x, this.pos.y);
		p5js.rotate(this.body.angle);
		p5js.rectMode(p5js.CENTER);
		p5js.fill(255);
		p5js.noStroke();
		p5js.rect(0, 0, this.w, this.h);
		p5js.pop();
		
	}
	
	//Matter.js Stuff
	
	this.collisionStart = function(otherBody) {
		
		
		
	}
	
	this.collisionActive = function(otherBody) {

	}
	
	this.collisionEnd = function(otherBody) {
		
		
		
	}	
	
	Matter.World.add(game.pengine.world, this.body);
}