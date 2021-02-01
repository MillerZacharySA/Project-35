var balloon,database;

var bg,i2,i3,i4;

var pos;

function preload(){
  bg = loadImage("images/Hot Air Ballon-01.png");
  i2 = loadImage("images/Hot Air Ballon-02.png");
  i3 = loadImage("images/Hot Air Ballon-03.png");
  i4 = loadImage("images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  balloon = createSprite(100, 200, 40, 40);
  
  balloon.addAnimation("balloon Animation",i2,i3,i4);
  balloon.scale = 0.25;

}

function draw() {
  background(bg); 
  
  getPosition();

  if(keyDown(UP_ARROW)){
    writePosition(0,-10);
  }

  if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
  }

  if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }

  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }

  changePosition();

  drawSprites();
}

async function getPosition(){
  var position = await database.ref('balloon/position');
   position.on("value",(data)=>{
    pos = data.val();
  })
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': pos.x + x ,
    'y': pos.y + y
  })
}

function changePosition(){
  if(pos){
    balloon.x = pos.x;
    balloon.y = pos.y;
  }
}