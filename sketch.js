var dog , dogImg2 ,dogImg , happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale=0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg2);
  }

  drawSprites();

  textSize(20);
  fill("red");
  stroke(10);
  text("food left :" + foodS,10,400)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(foodS){
  if(foodS<=0){
    foodS=0;
  }
  else{
    foodS=foodS-1
  }
  database.ref('/').update({
    Food : foodS
  })
}