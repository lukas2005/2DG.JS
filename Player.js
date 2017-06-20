function Player(x, y, game) {
	
	this.w = 15;
	this.h = 30;
	
	this.health = 100;
	this.maxHealth = 100;
	
	this.body = Matter.Bodies.rectangle(x, y, this.w, this.h);
	
	this.body.wrapper = this;
	
	this.playerName = "lukas2005"
	
	this.body.label = "Player: " + this.playerName
	
	this.pos = this.body.position;
	
	this.movementSpeed = 0.0005;
	this.jumpForce = -0.010;
	
	this.lastForce = Matter.Vector.create(0, 0);
	this.force = Matter.Vector.create(0, 0);
	
	this.isGrounded = true;
	
	this.show = function(p5js) {

		p5js.push();
		p5js.translate(this.pos.x, this.pos.y);
		p5js.rotate(this.body.angle);
		p5js.rectMode(p5js.CENTER);
		p5js.noStroke();
		p5js.fill(0, 0, 255)
		p5js.rect(0, 0, this.w, this.h);
		p5js.pop();
		
		p5js.push();
		p5js.translate(this.pos.x, this.pos.y);
		p5js.rectMode(p5js.CENTER);
		p5js.fill(91, 11, 5)
		p5js.rect(0, -this.h, this.maxHealth, 6)
		p5js.rectMode(p5js.CORNER);  
		p5js.fill(242, 22, 7)
		p5js.rect(-(this.maxHealth/2), -this.h-3, this.health, 6)
		p5js.rectMode(p5js.CENTER);  
		p5js.stroke(255)
		p5js.strokeWeight(1)
		p5js.fill(255)
		p5js.text(this.playerName, -4, -this.h-5)		
		p5js.pop();
		
	}
	
	this.update = function() {
	
		if (this.isDead()) {
			
			this.Dead();
			
		}
	
	}
	
	this.Dead = function() {
		
		
		
	}
	
	this.isDead = function()  {
		
		return this.health <= 0;
		
	}
	
	this.setHealth = function(h) {
		
		this.health = h;
		
		if (this.health <= 0) {
			
			this.health = 0;
			
			
		} else if (this.health >= this.maxHealth) {
			
			this.health = this.maxHealth;
			
		}
		
	}	
	
	this.subHealth = function(h) {
		
		var newHealth = this.health -= h;
		
		this.setHealth(newHealth);
		
	}		
	
	this.addHealth = function(h) {
		
		var newHealth = this.health += h;
		
		this.setHealth(newHealth);
		
	}		
	
	this.keyEvent = function(p5js) {
		
		if (p5js.keyIsDown(68) || p5js.keyIsDown(39)) { // Right
			
			this.force = Matter.Vector.create(this.movementSpeed, this.lastForce.y);
			
		} else if (p5js.keyIsDown(65) || p5js.keyIsDown(37)) { // Left
			
			this.force = Matter.Vector.create(-this.movementSpeed, this.lastForce.y);
			
		}
		
		Matter.Body.applyForce(this.body, this.pos, this.force);
	
		this.lastForce = this.force;
	
		this.force = Matter.Vector.create(0, 0);
	
	}
	
	this.jump = function() {

		
		if (this.isGrounded) {
			Matter.Body.setAngle(this.body, 0);
			this.force = Matter.Vector.create(this.lastForce.x, this.jumpForce);
			
			this.keyEvent();
		}
		
	}

	//Matter.js Stuff
	
	this.collisionStart = function(otherBody) {

		this.isGrounded = true;
		
	}
	
	this.collisionActive = function(otherBody) {

		//this.isGrounded = true;
	
	}
	
	this.collisionEnd = function(otherBody) {
		
		this.isGrounded = false;
		
	}
	
	this.body.friction = 0.3;
	
	Matter.World.add(game.pengine.world, this.body);
	
}