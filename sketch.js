var boy, boyRunning;
var backImg, bkground;
var ground;
var coin, coinImage;
ob1,ob1Img, ob2fly, ob2;

function preload(){
  backImg = loadImage("background.jpg");
  coin1Image = loadImage("goldcoin1.png");
  coin2Image = loadImage("goldcoin2.png");
  boyRunning = loadAnimation("b1.png","b2.png","b3.png","b4.png");
  ob1Img = loadImage("mushroom.png");
  ob2fly = loadAnimation("redbird1.png","redbird2.png","redbird3.png","redbird4.png")
}
function setup() {
  createCanvas(1200,800);

  bkground = createSprite(0,200,1500,1000);
  bkground.addImage(backImg);
  bkground.scale=5.2;
  bkground.x=bkground.width/2;
  bkground.velocityX=-6;

  boy=createSprite(100, 450, 50, 50);
  boy.addAnimation("running",boyRunning);
  boy.scale=0.5;
  boy.debug=true;
  boy.setCollider("rectangle",0,0,120,300)

  ground = createSprite(400,580,800,10);
  ground.x=ground.width/2;
  ground.velocityX = -6;
  ground.visible=false;
 
  coin1Group = new Group();
  coin2Group = new Group();
  ob1Group = new Group();
  ob2Group = new Group();

  score=0;
}

function draw() {
  background(0); 
  drawSprites();
  
  if (bkground.x < 100){
    bkground.x=bkground.width/2;
  }
  if (ground.x < 100) {
    ground.x = ground.width/2;
  }
  if (keyDown("space")  && boy.y>300){
    boy.velocityY = -12;
  }

  boy.velocityY += 0.8;
  boy.collide(ground);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);

  if(coin1Group.isTouching(boy)){
    coin1Group.destroyEach();
    score = score + 10;
  }

  if(coin2Group.isTouching(boy)){
    coin2Group.destroyEach();
    score = score + 5;
  }

  if (ob1Group.isTouching(boy)){
    ob1Group.destroyEach()
    score=score-5;
  }
    
  if(ob2Group.isTouching(boy)){
    ob2Group.setVelocity(0)
    ob1Group.setVelocity(0)
    

  }


  spawnCoin();  
  spawnObstacle();
  spawnEnemy();
}

function spawnCoin() {
  //write code here to spawn the coins
  if (frameCount % 80 === 0) {
    var coin = createSprite(600,250,40,10);
    coin.y = random(250,400);    
    var choice = Math.round(random(1,2));

    if (choice===1) {
      coin.addImage("coin1",coin1Image);
      coin.scale = 0.2;
      coin1Group.add(coin);
    }
    else {
      coin.addImage("coin2",coin2Image);
      coin.scale = 0.1;
      coin2Group.add(coin);
    }
    coin.velocityX= -4; 
    coin.lifetime = 300;
    boy.depth = coin.depth + 1;
  }
}

function spawnObstacle() {
  //write code here to spawn the mushroom
  if (frameCount % 300=== 0) {
    var ob1 = createSprite(600,500,40,10);
    ob1.addImage("mushroom",ob1Img);
    ob1.scale = 0.4;
    ob1Group.add(ob1);
    ob1.velocityX= -4; 
    ob1.lifetime = 300;
    boy.depth = ob1.depth + 1;
    
  }
}
function spawnEnemy() {
  //write code here to spawn the mushroom
  if (frameCount % 400=== 0) {
    ob2 = createSprite(1000,150);
    ob2.addAnimation("flying",ob2fly);
    ob2.scale = 0.5;
    ob2.velocityX = -4;
    ob2.velocityY = 2;
    
    ob2Group.add(ob2);
    ob2.lifetime = 300;
    boy.depth = ob2.depth + 1;

    
  }
}