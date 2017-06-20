var game = new GameEngine(600,400);

//var box = new matterRect(50,50,10,10,game);

function gameSetup(p5js) {
	
	new Player(10, 10, game);
	
}

function gameLoop(p5js) {
	p5js.fill(255, 255, 255, 100);
	p5js.rect(p5js.mouseX, p5js.mouseY, 30, 30);
	//new rect(p5js.int(p5js.random(p5js.width)), 0, 30, 30, game);
}

game.addGameSetupListener(gameSetup);
game.addGameLoopListener(gameLoop);
game.addMousePressedListener(function(p5js) {
	
	new rect(p5js.mouseX, p5js.mouseY, 30, 30, game);
	
});
