const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImage
var canon, angle
var Ball
var myCannonBalls = []
var ground
var boat
var myboats = []


var boatAnimation = []
//boatSpriteData its used to store boat.json
// boatSpriteSheet its used to store boat.png
var boatSpriteData, boatSpriteSheet



function preload() {
  backgroundImage = loadImage("./assets/background.gif")
  boatSpriteData = loadJSON("./assets/boat/boat.json")
  boatSpriteSheet = loadImage("./assets/boat/boat.png")

  // console.log(boatSpriteData)

}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  // create tower
  tower = new Tower(150, 350, 150, 320)


  angle = -PI / 4
  // create canon
  canon = new Canon(180, 100, 110, 50, angle)

  // create Ground
  ground = new Ground(0, height, width * 2, 1)


  // using for loop will loop on the length of boatframes
  var boatframes = boatSpriteData.frames
  // console.log(boatframes)

  for (var i = 0; i < boatframes.length; i += 1) {
    var pos = boatframes[i].position
    var imag = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
    boatAnimation.push(imag)
    // console.log(boatAnimation)
    // console.log(pos)

  }


  // creating singel boat
  // boat= new Boat(width,height-100,200,200,-100,boatAnimation)


}

function draw() {
  background(51);
  Engine.update(engine);

  //displaying background Image
  // image(which image loadded, x,y,w,h)
  image(backgroundImage, 0, 0, width, height)

  tower.show()
  canon.display()

  ground.show()

  //calling displayballs using for loop beacuse balls are inside mycannonBalls array
  for (var i = 0; i < myCannonBalls.length; i++) {
    displayballs(myCannonBalls[i], i)
  }

  //  boat.display()
  //  boat.animate()

  //  Matter.Body.setVelocity(boat.body,{
  //    x:-0.9,
  //    y:0
  //  })
  createBoats()

}

function displayballs(Ball, index) {
  Ball.display()
  if (Ball.body.position.x >= width || Ball.body.position.y >= height - 50) {
    World.remove(world, Ball.body)
    myCannonBalls.splice(index, 1)
    // console.log(Ball)
  }
}


function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    // create canonball
    Ball = new CanonBall(canon.x, canon.y, 40)
    myCannonBalls.push(Ball)
    //  console.log("adding ball "+myCannonBalls)
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    myCannonBalls[myCannonBalls.length - 1].shoot()
    // console.log("releasing ball "+myCannonBalls)
  }
}

function createBoats() {
  if (myboats.length > 0) {
    if(myboats.length<4 && myboats[myboats.length-1].body.position.x <width-300){
      var positions = [-130, -100, -120, -80]
      var boatpos = Math.random(positions)
      // creating singel boat
      boat = new Boat(width, height - 100, 200, 200, boatpos, boatAnimation)
      myboats.push(boat)
     
    }
     


    for (var i = 0; i < myboats.length; i++) {
      Matter.Body.setVelocity(myboats[i].body, {
        x: -0.9,
        y: 0
      })
      myboats[i].display()
      myboats[i].animate()
    
    }


  }
  else {
    boat = new Boat(width, height - 100, 200, 200, -100, boatAnimation)
    myboats.push(boat)
  }
    console.log(myboats)
}

