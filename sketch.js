var tower, towerImg;
var climber, climberImg;
var door, doorImg;
var doorGroup;
var climberGroup;
var ghost, ghostImg;
var invisible_blockGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sound;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 2;

  doorGroup = new Group();
  climberGroup = new Group();
  invisible_groundGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;

  sound.loop();

}

function draw() {
  if (gameState === PLAY) {
    if (tower.y > 400) {
      tower.y = 200;
    }

    spawnDoor();

    if (keyDown("space")) {
      ghost.velocityY = -7;
    }

    ghost.velocityY = ghost.velocityY + 0.8;


    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }


    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (ghost.isTouching(climberGroup)) {
      ghost.velocityY = 0;
    }

    if (ghost.isTouching(invisible_groundGroup) || ghost.y > 600) {
      ghost.destroy();
      gameState = END;
    }

    drawSprites();
  }

  if (gameState === END) {
    fill("blue");
    textSize(25);
    text("GAME OVER!", 200, 250);

  }

}

function spawnDoor() {
  if (frameCount % 200 === 0) {
    var door = createSprite(200, -30);
    doorGroup.add(door);
    door.lifetime = 350;
    door.addImage("door", doorImg);
    door.velocityY = 2;
    door.x = Math.round(random(170, 400));

    ghost.depth = door.depth + 1;

    var climber = createSprite(200, 25);
    climber.x = door.x;
    climber.addImage("climber", climberImg);
    climber.velocityY = 2;
    climber.lifetime = 350;
    climberGroup.add(climber);

    var invisible_block = createSprite(200, 33);
    invisible_block.width = climber.width;
    invisible_block.height = 3;
    invisible_block.velocityY = 2;
    invisible_block.x = door.x;
    invisible_block.lifetime = 350;
    invisible_block.visible = false;
    invisible_groundGroup.add(invisible_block);

  }
}