var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var ground;
var gameState;
var bedroom,garden,livingroom,washroom;

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  }

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj=new Food();
  
  dog = createSprite(250,250,10,10);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  milkBotltle1 = createSprite(140,435,10,10);
  milkBotltle1.addImage(milkImg);
  milkBotltle1.scale = 0.025;

  milkBotltle2 = createSprite(210,280,10,10);
  milkBotltle2.addImage(milkImg);
  milkBotltle2.scale = 0.025;
  milkBotltle2.visible = false;

}


function draw() {  
  background("lightblue")

  

  foodObj.display();

  writeStock(foodS);
  
  if(foodS == 0){
    dog.addImage(happyDog);
    milkBotltle2.visible=false;
    textSize(20);
    text("You do not have any food remaining . ",100,200);
    text("<---",240,90)
  }else{
    dog.addImage(sadDog);
    milkBotltle2.visible=true;
  }
  var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });

  if(gameState===1){
    dog.addImage(happyDog);
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    milkBotltle2.visible=false;
    dog.y=250;
  
  }

  
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  drawSprites();
  textSize(17);
  fill("red");
  text("Milk Bottles Remaining :  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
