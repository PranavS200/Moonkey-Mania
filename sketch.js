
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var bg,bgImage;
var survival=0
var score=0
var PLAY=1;
var END=0;
var gameState=PLAY;
var ground,invisibleGround;

function preload(){
  bgImage=loadImage("Background.jpeg");
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800,400)
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
 
  bg=createSprite(600,200,999,900)
  bg.addImage(bgImage);
  bg.scale=1.1 
  
  monkey.depth=bg.depth;
  monkey.depth=monkey.depth+1;
  
  bg.velocityX=-5;
  
  ground=createSprite(400,390,900,10)
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
 background(0);
  
  if (gameState===PLAY){
    ground.velocityX=-5;
    if(ground.x<400){
      ground.x=ground.width/2;
    }
    if(bg.x<200){
      bg.x=bg.width/2;
    }
    if(keyDown("space")&& monkey.y >= 265){
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    monkey.collide(ground);
     rock();
    food();
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+1;
      
     
      
    }
   if (obstacleGroup.isTouching(monkey)){
     gameState=END; ``
   }
   drawSprites(); 
    fill("red")
    textSize(30)
    text("Score:"+score,500,50)
    
      stroke("red")
      fill("yellow")
      textSize(30)
      survival=Math.ceil(frameCount/frameRate())
      text("Survival:"+survival,100,50)
          
  }
  if (gameState===END){
   stroke("red");
   fill("yellow");
   textSize(50);
   text("Game Over", 320,230)
   
  }
  
}


function rock(){
  if(frameCount%80 ===0){
     obstacle=createSprite(400,360 ,10,40)
   obstacle.addImage(obstacleImage);
        obstacle.velocityX=-5
    obstacleGroup.add(obstacle);
    obstacle.lifetime=140  ;
    obstacle.scale=0.19  ;
  }
}
function food(){
  if(frameCount%120===0){
    banana=createSprite(400,random(120,200),20,20)
    banana.addImage(bananaImage)
    banana.velocityX=-(3+survival/4)
    foodGroup.add(banana);
      banana.lifetime=140;
    banana.scale=0.13     ;
}
  }
