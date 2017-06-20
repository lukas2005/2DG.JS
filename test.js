var game = new GameEngine();

//var box = new matterRect(50,50,10,10,game);

function gameLoop(p5js) {
	p5js.fill(255, 255, 255, 100);
	p5js.rect(p5js.mouseX, p5js.mouseY, 30, 30);
	
}

game.addGameLoopListener(gameLoop);
