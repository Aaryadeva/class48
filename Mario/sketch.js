var mario,mario_standingImg,mario_runningImg,ground,groundImg,bg,bgImg,coin,coinImg
var enemy,enemyImg,mushroom,mushroomImg,obstacle,obstacleImg,enemyKill,brickImg
var totalCoins = 0
var enemyGroup,enemyKillGroup
function preload(){
  mario_standingImg=loadAnimation("mario00.png")
  mario_runningImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
  groundImg=loadImage("ground2.png")
  bg=loadImage("bg.png")
  obstacleImg=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  enemyImg=loadImage("enemy.png")
  brickImg=loadImage("brick.png")
  coinImg=loadImage("coin.png")


}

function setup(){
  createCanvas(windowWidth,windowHeight)
  mario=createSprite(10,height-100,20,20)
  mario.addAnimation("standing",mario_standingImg)
  mario.addAnimation("running",mario_runningImg)
  ground=createSprite(0,height-90,width*4,20)
  ground.visible=false
  
   // coin.visible=false
  
  
 // brick1=createSprite()
 
  
  enemyGroup=createGroup()
  enemyKillGroup=createGroup()
  brickGroup=createGroup()
  coinGroup=createGroup()
  obstacleGroup=createGroup()
  
  
}

function draw(){
  background(bg)
  
  camera.position.x=mario.x+350
  ground.x=mario.x
  
  //mario.debug=true
  //enemy.debug=true
  if(keyIsDown(RIGHT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x+20
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }
  if(keyDown(UP_ARROW)&&mario.y>=509){
    mario.velocityY=mario.velocityY-10
  }
  text(mario.x,200,200)

  if(keyIsDown(LEFT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x-5
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }
  if(enemyKillGroup.isTouching(mario)){
    
    enemyGroup.destroyEach()
  }
  if(enemyGroup.isTouching(mario)||obstacleGroup.isTouching(mario)){
    mario.visible=false
  }
  if(brickGroup.isTouching(mario)){
    //brick1.destroy()
   // coin.visible=true
   coin=createSprite(mario.x,mario.y-20,10,10)
    coin.addImage(coinImg)
    coin.scale=0.05
    coin.velocityY=-5
    coin.lifetime=50
    totalCoins=totalCoins+1
  }
  
  mario.velocityY=mario.velocityY+0.5
  mario.collide(ground)
  //mario.collide(brick1)
  mario.setCollider("rectangle",0,3,20,25)
  /*if(mario.isTouching(coinGroup)){
    
    coinGroup.destroyEach()
  }*/
  drawSprites()
  text("Coins: "+totalCoins,camera.position.x-180,10)
  //console.log(mouseY)
  spawnEnemies()
  spawnBricks()
}
function spawnEnemies(){
  if(frameCount%400===0){
  enemy=createSprite(width,height-96,20,20)
  enemy.velocityX=-1
  enemy.addImage(enemyImg)
  enemy.scale=0.2
  enemyKill=createSprite(enemy.x,enemy.y-35,20,5)
  enemyKill.visible=false
  enemy.setCollider("rectangle",-10,-50,100,100)
  enemy.lifetime=width
  enemyKill.lifetime=width
  enemyKill.velocityX=-1
  enemyGroup.add(enemy)
  enemyKillGroup.add(enemyKill)

  }
}
function spawnBricks(){
  if(frameCount%200===0){
    brick1=createSprite(width-200,height-180,20,20)
    brick1.addImage(brickImg)
    brick1.scale=0.8
    brick1.velocityX=-3
    
    brickGroup.add(brick1)
    //coinGroup.add(coin)
  }
}
function spawnObstacles(){
  if(frameCount%700===0){
    obstacle=createSprite(mario.x+250,height-116,20,10)
    obstacle.addAnimation("plant",obstacleImg)
    obstacle.scale=0.75
    obstacleGroup.add(obstacle)
  }
}