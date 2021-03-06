//Create variables here
var db;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feedButton,addFood;
var LastFedTime;
var x;

function preload(){
  //load images here
  dogImage = loadImage("images/dogImg.png");
  dogImage1 = loadImage("images/dogImg1.png");
  foodImage = loadImage("images/Bone.png");
}

function setup() {
  createCanvas(700, 700);

  feedButton = createButton("FEED");
  feedButton.position(570,530);


  addFood = createButton("ADD FOOD");
  addFood.position(570,50);


  //Sprites
  feedButton.mousePressed(function (){

    //if(foodStock>0){
    foodRef = db.ref("Food");
    foodStock = foodStock - 1;
    foodRef.set(foodStock);
    dog.addImage(dogImage1);
  
    getTime();
    //}
  });
  
  addFood.mousePressed(function (){
    addFoodRef = db.ref("/Food");
    foodStock = foodStock + 20;
    addFoodRef.set(foodStock);
    })


  dog = createSprite(400,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  //Firebase
  db = firebase.database();

  //Reference for food
  foodRef = db.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);
}


function draw() {  
  background(46, 139, 87);
  

  x = 30;

  foodRef = db.ref("Food");
  
   for(var i = 0; i< foodStock; i=i+1){

    x = x + 30;

    if(i<10){
      food = createSprite(x,400,50,50);
      food.addImage(foodImage);
      food.scale = 0.3;
    } else {
      food = createSprite(x,30,50,50);
      food.addImage(foodImage);
      food.scale = 0.3;
    }
   }
  
  drawSprites();
  
  //add styles here
  textSize(32);
  fill("yellow");
  text("Bones AVAILABLE IS/ARE: "+foodStock,50,300);
  textSize(16);

  if(LastFedTime!=undefined){
  text("Last fed "+LastFedTime,200,200);
  }
}

function read(data){
  foodStock = data.val();
}


async function getTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  

  var hour = datetime.slice(11,16);

  var lastFed = db.ref("/lastFed");
  lastFed.on("value",function (data){
    LastFedTime = data.val();
  },console.log("error"));
  lastFed.set(hour);
}