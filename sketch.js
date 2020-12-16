var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex2
var ground2, invisibleground2

//--------------------------------------
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var starGroup, starImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var score1=0;

var gameOver, restart;
var gameOver1, restart1;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

//-------------------STARS------------------
starImage = loadImage("Imported piskel.gif");

}

function setup() {
  createCanvas(1200,800);

  //TOP
  
  trex = createSprite(50,190,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,200,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

//-------------------------------------------

//BOTOM
trex2 = createSprite(50,660,20,50);
  
  trex2.addAnimation("running", trex_running);
  trex2.addAnimation("collided", trex_collided);
  trex2.scale = 0.5;
  
  ground2 = createSprite(200,650,400,20);
  ground2.addImage("ground",groundImage);
  ground2.x = ground.width /2;
  ground2.velocityX = -(6 + 3*score1/100);

//---------------------------------------------

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
//---------------------------------------------
  gameOver1 = createSprite(300,570);
  gameOver1.addImage(gameOverImg);
  
  restart1 = createSprite(300,610);
  restart1.addImage(restartImg);
  
  gameOver1.scale = 0.5;
  restart1.scale = 0.5;

  gameOver1.visible = false;
  restart1.visible = false;

//------------------------------------------------
  invisibleGround = createSprite(200,205,400,10);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(200,660,400,10);
  invisibleGround2.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  starGroup = new Group();

  obstaclesGroup2 = new Group();
  
  score = 0;
  score1 = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Player1 Score: "+ score, 50,520);
  text("Player2 Score: "+ score1, 50,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    score1 = score1 + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    ground2.velocityX = -(6 + 3*score1/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }

    if(keyDown("UP_ARROW") && trex2.y >= 600) {
      trex2.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.8

    trex2.velocityY = trex2.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if (ground2.x < 0){
      ground2.x = ground2.width/2;
    }
    
    trex.collide(invisibleGround);
    trex2.collide(invisibleGround2);
    spawnClouds();
    spawnObstacles();
    //-----STARS------
    spawnStars();

    spawnObstacles2();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }

    if(obstaclesGroup2.isTouching(trex2)){
      gameState = END;
  }
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true

    gameOver1.visible = true;
    restart1.visible = true
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ground2.velocityX = 0;
    trex2.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup2.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    trex2.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);

    obstaclesGroup2.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }

    if(mousePressedOver(restart1)) {
      reset();
    }
  }
  
  
  drawSprites();
  
  if(starGroup.isTouching(trex)){
    
    gameState=END;
    
    textSize(20)
    text("You Won The Super Star", 300, 40)
    
    }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,80,40,10);
    var cloud1 = createSprite(600,500,40,10);

    cloud.y = Math.round(random(80,120));
    cloud1.y = Math.round(random(550,600));

    cloud.addImage(cloudImage);
    cloud1.addImage(cloudImage);

    cloud.scale = 0.5;
    cloud1.scale = 0.5;

    cloud.velocityX = -3;
    cloud1.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    cloud1.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloud1.depth = trex2.depth;
    trex2.depth = trex2.depth + 1;
    //add each cloud to the group
    cloudsGroup.add(cloud);
    cloudsGroup.add(cloud1);
  }
  
}

function spawnStars() {
  //write code here to spawn the clouds
  if (frameCount % 1000 === 0) {
    var star = createSprite(600,100,40,10);
    star.y = Math.round(random(20,140));
    star.addImage(starImage);
    star.scale = 0.5;
    star.velocityX = -10;
    
     //assign lifetime to the variable
    star.lifetime = 500;
    
    //adjust the depth
    star.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    starGroup.add(star);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,185,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

  function spawnObstacles2() {
    if(frameCount % 60 === 0) {
      var obstacle2 = createSprite(600,640,10,40);
      //obstacle.debug = true;
      obstacle2.velocityX = -(6 + 3*score/100);
        
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle22.addImage(obstacle1);
                  break;
        case 2: obstacle2.addImage(obstacle2);
                  break;
          case 3: obstacle2.addImage(obstacle3);
                  break;
          case 4: obstacle2.addImage(obstacle4);
                  break;
          case 5: obstacle2.addImage(obstacle5);
                  break;
          case 6: obstacle2.addImage(obstacle6);
                  break;
          default: break;
        }
    
    //assign scale and lifetime to the obstacle           
    obstacle2.scale = 0.5;
    obstacle2.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle2);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  gameOver1.visible = false;
  restart1.visible = false;

  obstaclesGroup.destroyEach();
  obstaclesGroup2.destroyEach();
  cloudsGroup.destroyEach();
  starGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  trex2.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}
