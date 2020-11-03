//Create variables here
var dog,dog1,happyDog,database,FoodS,FoodStock;
var MilkBottles = 20;
var feed,addFood,fedTime,lastFed,foodObj;

function preload()
{
  //load images here
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);
  dog = createSprite(800,200,150,150);
  dog.scale = 0.3;
  dog.addImage(dog1);
  FoodStock = database.ref('Food');
  FoodStock.on("value",readStock);
  foodObj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
   lastFed = data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("lastFed"+lastFed%12+"pm",350,30);
  }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
 }else{ 
   text("Last Feed : "+ lastFed + " AM", 350,30);
  }
  
  drawSprites();
}

function readStock(data) {
  FoodS = data.val();
  foodObj.updateFoodStock(FoodS);
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  FoodS++;
  database.ref('/').update({
    Food:FoodS
  })
}