// sketch.js | Dark Side of the Moon Interactive Art
// AME 230 | Student Name: Diego A. Soto
//
// This is a simple interactive art piece that allows the user to discover an eye by hovering the mouse over the pyramid.


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('sketch-container');
}

function draw() {
  background(0);
  frameRate(60);
  
  //
  // Welcome text near the center,top of the canvas
  //
  stroke(255);
  fill(255);
  let pyramidAxis = 300;
  let pyramidTip = 100;
  //(300,100) at the top of the pyramid

  let pyramidFloor = 450;
  // vertices at (150,450) and (500,450) & (100,400)
  

  // Pyramid Top
  line(pyramidAxis,pyramidTip, 100,400); // left-most line
  line(pyramidAxis,pyramidTip, 150,450); // diagonal from pyramidTip 2 pyramidFloor
  line(pyramidAxis,pyramidTip, 500,450); // right-most line
  
  // Pyramis Bottom
  line(150,pyramidFloor, 500,pyramidFloor); // Bottom Straight Line
  line(150,pyramidFloor, 100,400); // Bottom line to left-most vertex

  // Point Indicator
  // text("X: "+mouseX, 0, height/4);
  // text("Y: "+mouseY, 0, height / 4 +20);
  
  stroke(0);

  let eyePupilX = mouseX;
  let eyePupilY = mouseY;
  let mouseTargetX = 300;
  let mouseTargetY = 50;
  

  if (mouseX < mouseTargetX + 50 && mouseX > mouseTargetX - 50 && mouseY < mouseTargetY + 50 && mouseY > mouseTargetY - 50) {
    beginShape();
    vertex(100,400);
    vertex(150,450);
    vertex(300,100);
    endShape(CLOSE);

    strokeWeight(5);
    stroke(255,255,255);
    line(0,370, 175,330);
    strokeWeight(1);

    ellipse(300,50,100,50);
    stroke(255,252,64);
    fill(20);
    ellipse(eyePupilX,eyePupilY,10,30);
    fill(255,252,64);
    ellipse(eyePupilX,eyePupilY,1,1);

    stroke(255,255,255);

    fill(168,0,0);
    beginShape();
    vertex(340,170);
    vertex(600,170);
    vertex(600,184);
    vertex(348,184);
    endShape(CLOSE);

    fill(168,84,0);
    beginShape();
    vertex(348,184);
    vertex(600,184);
    vertex(600,198);
    vertex(356,198);
    endShape(CLOSE);

    fill(253,252,83);
    beginShape();
    vertex(356,198);
    vertex(600,198);
    vertex(600,212);
    vertex(364,212);
    endShape(CLOSE);

    fill(0,168,0);
    beginShape();
    vertex(364,212);
    vertex(600,212);
    vertex(600,226);
    vertex(372,226);
    endShape(CLOSE);

    fill(0,0,168);
    beginShape();
    vertex(372,226);
    vertex(600,226);
    vertex(600,240);
    vertex(380,240);
    endShape(CLOSE);

    fill(83,84,253);
    beginShape();
    vertex(380,240);
    vertex(600,240);
    vertex(600,254);
    vertex(388,254);
    endShape(CLOSE);

    fill(168,0,168);
    beginShape();
    vertex(388,254);
    vertex(600,254);
    vertex(600,268);
    vertex(396,268);
    endShape(CLOSE);



  }
}
