var PLAY = 1;
var END = 0;
var gameState = PLAY;

var BackgroundImage, Background;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var score=0;

var gameOver, restart;
var player;
var music;

function preload(){
//  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  //trex_collided = loadAnimation("trex_collided.png");
   playerImage = loadImage("player.png");
  groundImage = loadImage("ground2.png");
  BackgroundImage = loadImage("Background.png")
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("Factory.png");
  obstacle2 = loadImage("people.png");
 obstacle3 = loadImage("bomb.png");
  obstacle4 = loadImage("Plastic.png");
  obstacle5 = loadImage("car.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  music = loadSound("Sound.mp3");
 
}

function setup() {
  createCanvas(700, 600);
  music.play();
  Background = createSprite(400,200);  
  Background.addImage("Background",BackgroundImage);
  player = createSprite(50,180,20,50);
  
  player.addImage("running", playerImage);
 // trex.addAnimation("collided", trex_collided);
  player.scale = 0.3;
  
  
  ground = createSprite(200,350,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  

  
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  
  score = 0;
  
}

function draw() {
  
 // background(255);
    textSize(30);
  stroke("black");
  text("Score: "+ score, 500,50);
  
  
  if (gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && player.y >= 100) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    music.stop();
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,350,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(600,320,10,40);
    obstacle.scale = 0.1;
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
        obstacle1.debug = true;
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
              case 3: obstacle.addImage(obstacle3);
              break;
              case 4: obstacle.addImage(obstacle4);
              break;
              case 5: obstacle.addImage(obstacle5);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
 // obstaclesGroup.debug = true;
}

function reset(){
  music.play();
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  //player.changeAnimation("running",player);
  
 
  
  score = 0;
  
}

function win(){
  if(score===100){
    textSize(30);
  stroke("black");
  text("YOU WIN", 500,60);
  }
  
}