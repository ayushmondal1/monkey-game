  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  
  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var food,foodGroup,obstacle,obstacleGroup;
  var score;

  function preload(){

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  }
  function setup() {
  createCanvas(600, 300);

  monkey = createSprite(50,260,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);

  ground = createSprite(300,300,700,20);
    
  score = 0;

  obstacleGroup = new Group();
  foodGroup = new Group();
  }
  function draw() {
  background("white");
  
    
    
if(gameState === PLAY){

  if(keyDown("space")&& monkey.y >= 250) {
  monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  stroke("white");
  fill("white");
  textSize(20);
  text("score: "+score,500,50)
  
  var survibleTime=0; 
  stroke("black");
  textSize(20);
  fill("black");
  survibleTime = Math.ceil(frameCount/frameRate());
  text("survible Time: "+survibleTime,200,50);
  
      if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
    spawnFood();
  spawnobstacle();
  }
else if (gameState === END) {
  obstacleGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
  foodGroup.setVelocityXEach(0);
    monkey.collide(ground);
  
  monkey.velocityY = 0;
}
    

  drawSprites();

  }

  function spawnFood(){
  if (frameCount % 100 === 0) {
  var food = createSprite(600,120,40,10);
  food.y = Math.round(random(70,200));
  food.addImage(bananaImage);
  food.scale = 0.1;
  food.velocityX = -5;
  //assign lifetime to the variable
  food.lifetime = 200;
  foodGroup.add(food);
  }}

function spawnobstacle(){
  if (frameCount % 300 === 0) {
   var obstacle = createSprite(600,270,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
  obstacle.setCollider("circle",0,0,230);
    //assign lifetime to the variable
    obstacle.lifetime = 200;
    //add each cloud to the group
    obstacleGroup.add(obstacle);
    }}


