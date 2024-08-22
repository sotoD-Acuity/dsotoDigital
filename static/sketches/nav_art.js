// Author: Diego A. Soto
// Description: A 24hr analog clock and animated background for dsotodigital.com

let bezierStartX;
let bezierStartY;
let bezierControl1X;
let bezierControl1Y;
let bezierControl2X;
let bezierControl2Y;
let bezierEndX;
let bezierEndY;
//
let vertical_navWave;
let vertical_lagWave;
let vertical_lagWave2;
let horizontal_navWave;

class animated_bezier {
  constructor(xStart, yStart, xControl1, yControl1, xControl2, yControl2, xEnd, yEnd, xDelta1, xDelta2, yDelta1, yDelta2, color, weight) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xControl1 = xControl1;
    this.yControl1 = yControl1;
    this.xControl2 = xControl2;
    this.yControl2 = yControl2;
    this.xEnd = xEnd;
    this.yEnd = yEnd;

    this.xDelta1 = xDelta1;
    this.xDelta2 = xDelta2;
    this.yDelta1 = yDelta1;
    this.yDelta2 = yDelta2;

    this.strokeColor = color;
    this.strokeWeight = weight;
  }

  stepControl1x(amplitude) {
    if (this.xControl1 > this.xStart + amplitude || this.xControl1 < this.xStart - amplitude) {
      this.xDelta1 = -this.xDelta1;
    }
    this.xControl1 += this.xDelta1;
  }

  stepControl2x(amplitude) {
    if (this.xControl2 > this.xEnd + amplitude || this.xControl2 < this.xEnd - amplitude) {
      this.xDelta2 = -this.xDelta2;
    }
    this.xControl2 += this.xDelta2;
  }

  stepControl1y(amplitude) {
    if (this.yControl1 > this.yStart + amplitude || this.yControl1 < this.yStart - amplitude) {
      this.yDelta1 = -this.yDelta1;
    }
    this.yControl1 += this.yDelta1;
  }

  stepControl2y(amplitude) {
    if (this.yControl2 > this.yEnd + amplitude || this.yControl2 < this.yEnd - amplitude) {
      this.yDelta2 = -this.yDelta2;
    }
    this.yControl2 += this.yDelta2;
  }

  updateX() {
    this.stepControl1x(50);
    this.stepControl2x(50);
    //this.stepControl1y(50);
    //this.stepControl2y(50);
  }

  updateY() {
    this.stepControl1y(50);
    this.stepControl2y(50);
  }

  draw() {
    push();
    if (windowWidth < 1024) {
      translate(-width/2, height/8);
    }
    else {
      translate(-windowWidth/8, windowHeight/8);
    }
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);

    if (windowWidth < 1024) {
      noFill();
    } else {
      fill('#0e1a40');
    }
    bezier(this.xStart, this.yStart, this.xControl1, this.yControl1, this.xControl2, this.yControl2, this.xEnd, this.yEnd);
    pop();
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  
  // Set the frame rate to 60 frames per second
  frameRate(60);

  bezierStartX = windowWidth * 0.025;
  bezierStartY = 0;

  bezierControl1X = width * 0.05;
  bezierControl1Y = -height * 0.25;

  bezierControl2X = -width * 0.00;
  bezierControl2Y = -height * 0.75;

  bezierEndX = width * 0.025;
  bezierEndY = -height;
  
  vertical_navWave = new animated_bezier(bezierStartX, bezierStartY, bezierControl1X, bezierControl1Y, bezierControl2X, bezierControl2Y, bezierEndX, bezierEndY, 0.25, -0.25, 0, 0, "#23B5D3", 1);
  vertical_lagWave = new animated_bezier(bezierStartX, bezierStartY, bezierControl1X - 5, bezierControl1Y + 10, bezierControl2X - 5, bezierControl2Y - 10, bezierEndX, bezierEndY, 0.25, -0.25, 0, 0, "#0e1a40", 5);

  r_vertical_navWave = new animated_bezier(width - bezierStartX, 0, width - bezierControl1X, -height * 0.25, width - bezierControl2X, -height * 0.75, width - bezierEndX, -height, -0.25, 0.25, 0, 0, "#23B5D3", 1);
  r_vertical_lagWave = new animated_bezier(width - bezierStartX, 0, width - bezierControl1X + 5, -height * 0.25 + 10, width - bezierControl2X + 5, -height * 0.75 - 10, width - bezierEndX, -height, -0.25, 0.25, 0, 0, "#0e1a40", 5);
  
  horizontal_navWave = new animated_bezier(0, -0.24*height, 0.25*width, -0.24*height + 10, 0.75*width, -0.24*height - 10, width, -0.24*height, 0, 0, -.10, .10, "#23B5D3", 1);
  horizontal_lagWave = new animated_bezier(0, -0.24*height, 0.25*width - 10, -0.24*height + 10, 0.75*width - 10, -0.24*height - 10, width, -0.24*height, 0, 0, .10, -.10, "#ffa0a0", 1);
  //vertical_lagWave2 = new animated_bezier(bezierStartX, bezierStartY, bezierControl1X - 10, bezierControl1Y, bezierControl2X - 10, bezierControl2Y - 20, bezierEndX, bezierEndY, 0.75, -0.75, "#707070",5);
}

function draw() {
  // Set the origin to the top left corner, specifically the center of the hexagon at 1/10th the width and 1/8th the height
  if (windowWidth < 1024) {
    translate(width/2, height/9);
  } else {
    translate(width / 8, height / 8);
  }
  // Set y axis to point upwards
  scale(1, -1);
  
  // Get the current time
  let timeHour = hour();
  let timeMinute = minute();
  let timeSecond = second();
  
  // Set constants for the shapes
  const hexagonRadius = 1/12 * height;
  const centerX = 0;
  const centerY = 0;
  const HrAngle = TWO_PI / 24;
  const hexagonAngle = TWO_PI / 6;

  background(0);
  //qdottedBG();

  if (windowWidth < 1024) {
    vertical_lagWave.draw();
    vertical_lagWave.updateX();
    vertical_navWave.draw();
    vertical_navWave.updateX();
    r_vertical_navWave.draw();
    r_vertical_navWave.updateX();
    r_vertical_lagWave.draw();
    r_vertical_lagWave.updateX();
  } else {
    horizontal_navWave.draw();
    horizontal_navWave.updateY();  
    horizontal_lagWave.draw();
    horizontal_lagWave.updateY();
  }
  

  // Draw the background hexagon
  let c = color('#0e1a40');
  let hexVerticies = drawPolygon(6, centerX, centerY, hexagonRadius, hexagonAngle, c);
  vectorSide1 = createVector(hexVerticies[1][0] - hexVerticies[0][0], hexVerticies[1][1] - hexVerticies[0][1]);
  vectorSide2 = createVector(hexVerticies[2][0] - hexVerticies[1][0], hexVerticies[2][1] - hexVerticies[1][1]);
  vectorSide3 = createVector(hexVerticies[3][0] - hexVerticies[2][0], hexVerticies[3][1] - hexVerticies[2][1]);
  vectorSide4 = createVector(hexVerticies[4][0] - hexVerticies[3][0], hexVerticies[4][1] - hexVerticies[3][1]);
  vectorSide5 = createVector(hexVerticies[5][0] - hexVerticies[4][0], hexVerticies[5][1] - hexVerticies[4][1]);
  vectorSide6 = createVector(hexVerticies[0][0] - hexVerticies[5][0], hexVerticies[0][1] - hexVerticies[5][1]);
  let sideVectors = [vectorSide1, vectorSide2, vectorSide3, vectorSide4, vectorSide5, vectorSide6];

  push();
  stroke('#F29559');
  strokeWeight(0.5);
  line(0, 0, hexVerticies[0][0], hexVerticies[0][1]);
  line(0, 0, hexVerticies[2][0], hexVerticies[2][1]);
  line(0, 0, hexVerticies[4][0], hexVerticies[4][1]);
  pop();

  // Fill in the hexagon for the current hour
  c = color('#0e1a40');
  fillHourTriangle(timeHour, centerX, centerY, hexagonRadius, HrAngle, c);

  c = color("#DDFFDD");
  drawSecondsPerimeter(timeSecond, hexVerticies, sideVectors, c);

  // Draw the hours passed
  c = color("#F29559");
  hoursPassed(timeHour, hexagonRadius, sideVectors, c);

  drawTicks(hexagonRadius);

  c = color("#F29559");
  drawMinutes(timeMinute, hexagonRadius, c);
}

function dottedBG() {
  push();
  if (windowWidth < 1024) {
    return;
  } else {
    translate(-width / 8, -height / 8);
  }
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y > -height; y -= 20) {
      fill('#0e1a40');
      triangle(x, y, x + 5, y - 10, x + 10, y);
    }
  }
  pop();
}

function drawPolygon(numSides, polyCenterX, polyCenterY, radius, internalAngle, polyColor) {
  let verticies = [];
  fill(polyColor);
  beginShape();

  for (let i = 0; i < numSides; i++) {
    let x = polyCenterX + radius * cos(i * internalAngle);
    let y = polyCenterY + radius * sin(i * internalAngle);
    vertex(x, y);
    verticies.push([x, y]);
  }
  endShape(CLOSE);
  return verticies;
}

function fillHourTriangle(currentHour, refTipX, refTipY, hexRadius, angle, c) {
  push();
  fill(c);
  stroke('#DDFFDD');
  strokeWeight(0.25);
  beginShape();
  let y1 = refTipY + hexRadius * sin(currentHour * angle);
  let x1 = refTipX + hexRadius * cos(currentHour * angle);
  vertex(x1, y1);
  let y2 = refTipY + hexRadius * sin((currentHour + 1) * angle);
  let x2 = refTipX + hexRadius * cos((currentHour + 1) * angle);
  vertex(x2, y2);
  let y3 = refTipY;
  let x3 = refTipX;
  vertex(x3, y3);
  endShape(CLOSE);
  pop();
}

function drawSecondsPerimeter(currentSecond, hexVerticies, sideVectors, c) {
  push();
  strokeWeight(1.25);
  stroke(c);
  let xDraw;
  let yDraw;
  if (currentSecond < 10) {
    // Get the seconds that we need to draw in this section.
    xDraw = hexVerticies[0][0] + 5;
    yDraw = hexVerticies[0][1];
    for (let i = 0; i < currentSecond; i++) {
      line (xDraw, yDraw, xDraw + sideVectors[0].x / 10, yDraw + sideVectors[0].y / 10);
      xDraw += sideVectors[0].x / 10;
      yDraw += sideVectors[0].y / 10;
    }
  } else if (currentSecond < 20) {
    xDraw = hexVerticies[1][0];
    yDraw = hexVerticies[1][1] + 5;
    for (let i = 0; i < currentSecond - 9; i++) {
      line (xDraw, yDraw, xDraw + sideVectors[1].x / 10, yDraw + sideVectors[1].y / 10);
      xDraw += sideVectors[1].x / 10;
      yDraw += sideVectors[1].y / 10;
    }
  } else if (currentSecond < 30) {
    xDraw = hexVerticies[2][0] - 5;
    yDraw = hexVerticies[2][1];
    for (let i = 0; i < currentSecond - 19; i++) {
      line (xDraw, yDraw, xDraw + sideVectors[2].x / 10, yDraw + sideVectors[2].y / 10);
      xDraw += sideVectors[2].x / 10;
      yDraw += sideVectors[2].y / 10;
    }
  } else if (currentSecond < 40) {
    xDraw = hexVerticies[3][0] - 5;
    yDraw = hexVerticies[3][1];
    for (let i = 0; i < currentSecond - 29; i++) {
      line (xDraw, yDraw, xDraw + sideVectors[3].x / 10, yDraw + sideVectors[3].y / 10);
      xDraw += sideVectors[3].x / 10;
      yDraw += sideVectors[3].y / 10;
    }    
  } else if (currentSecond < 50) {
    xDraw = hexVerticies[4][0];
    yDraw = hexVerticies[4][1] - 5;
    for (let i = 0; i < currentSecond - 39; i++) {
      line (xDraw, yDraw, xDraw + sideVectors[4].x / 10, yDraw + sideVectors[4].y / 10);
      xDraw += sideVectors[4].x / 10;
      yDraw += sideVectors[4].y / 10;
    }
  }
  else if (currentSecond) {
    xDraw = hexVerticies[5][0] + 5;
    yDraw = hexVerticies[5][1];
    for (let i = 0; i < currentSecond - 49; i++) {
      line (xDraw, yDraw, xDraw + sideVectors[5].x / 10, yDraw + sideVectors[5].y / 10);
      xDraw += sideVectors[5].x / 10;
      yDraw += sideVectors[5].y / 10;
    }
  }
  pop();
}

function hoursPassed(currentHour, radius, sideVectors, c) {
  push();
  stroke(c);
  strokeWeight(1.25);
  let xDraw;
  let yDraw;

  if (currentHour == 1) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
  } else if (currentHour == 2) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
  } else if (currentHour == 3) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
  } else if (currentHour == 4) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
  } else if (currentHour == 5) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
  } else if (currentHour == 6) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
  } else if (currentHour == 7) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
  } else if (currentHour == 8) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);
  } else if (currentHour == 9) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);
    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
  } else if (currentHour == 10) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);
    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
  } else if (currentHour == 11) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);
    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
  } else if (currentHour == 12) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);
    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);
    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

  } else if (currentHour == 13) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
  } else if (currentHour == 14) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
  } else if (currentHour == 15) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
  } else if (currentHour == 16) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
  } else if (currentHour == 17) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
  } else if (currentHour == 18) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
    xDraw = 0 + 0.6 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .6, yDraw + sideVectors[4].y * .6);
  } else if (currentHour == 19) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
    xDraw = 0 + 0.6 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .6, yDraw + sideVectors[4].y * .6);
    xDraw = 0 + 0.4 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .4, yDraw + sideVectors[4].y * .4);
  } else if (currentHour == 20) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
    xDraw = 0 + 0.6 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .6, yDraw + sideVectors[4].y * .6);
    xDraw = 0 + 0.4 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .4, yDraw + sideVectors[4].y * .4);
    xDraw = 0 + 0.2 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .2, yDraw + sideVectors[4].y * .2);
  } else if (currentHour == 21) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
    xDraw = 0 + 0.6 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .6, yDraw + sideVectors[4].y * .6);
    xDraw = 0 + 0.4 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .4, yDraw + sideVectors[4].y * .4);
    xDraw = 0 + 0.2 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .2, yDraw + sideVectors[4].y * .2);
    xDraw = 0 + 0.8 * radius * cos(5 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(5 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[5].x * .8, yDraw + sideVectors[5].y * .8);
  } else if (currentHour == 22) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
    xDraw = 0 + 0.6 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .6, yDraw + sideVectors[4].y * .6);
    xDraw = 0 + 0.4 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .4, yDraw + sideVectors[4].y * .4);
    xDraw = 0 + 0.2 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(4 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .2, yDraw + sideVectors[4].y * .2);
    xDraw = 0 + 0.8 * radius * cos(5 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(5 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[5].x * .8, yDraw + sideVectors[5].y * .8);
    xDraw = 0 + 0.6 * radius * cos(5 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(5 * TWO_PI / 6) - 5;
    line(xDraw, yDraw, xDraw + sideVectors[5].x * .6, yDraw + sideVectors[5].y * .6);
  } else if (currentHour == 23) {
    xDraw = 0 + 0.8 * radius * cos(0);
    yDraw = 0 + 0.8 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .8, yDraw + sideVectors[0].y * .8);
    xDraw = 0 + 0.6 * radius * cos(0);
    yDraw = 0 + 0.6 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .6, yDraw + sideVectors[0].y * .6);
    xDraw = 0 + 0.4 * radius * cos(0);
    yDraw = 0 + 0.4 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .4, yDraw + sideVectors[0].y * .4);
    xDraw = 0 + 0.2 * radius * cos(0);
    yDraw = 0 + 0.2 * radius * sin(0) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[0].x * .2, yDraw + sideVectors[0].y * .2);

    xDraw = 0 + 0.8 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .8, yDraw + sideVectors[1].y * .8);
    xDraw = 0 + 0.6 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .6, yDraw + sideVectors[1].y * .6);
    xDraw = 0 + 0.4 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .4, yDraw + sideVectors[1].y * .4);
    xDraw = 0 + 0.2 * radius * cos(TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[1].x * .2, yDraw + sideVectors[1].y * .2);

    xDraw = 0 + 0.8 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .8, yDraw + sideVectors[2].y * .8);
    xDraw = 0 + 0.6 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .6, yDraw + sideVectors[2].y * .6);
    xDraw = 0 + 0.4 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .4, yDraw + sideVectors[2].y * .4);
    xDraw = 0 + 0.2 * radius * cos(2 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(2 * TWO_PI / 6) + 5;
    line(xDraw, yDraw, xDraw + sideVectors[2].x * .2, yDraw + sideVectors[2].y * .2);

    xDraw = 0 + 0.8 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(3 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .8, yDraw + sideVectors[3].y * .8);
    xDraw = 0 + 0.6 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(3 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .6, yDraw + sideVectors[3].y * .6);
    xDraw = 0 + 0.4 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(3 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .4, yDraw + sideVectors[3].y * .4);
    xDraw = 0 + 0.2 * radius * cos(3 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(3 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[3].x * .2, yDraw + sideVectors[3].y * .2);
    xDraw = 0 + 0.8 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(4 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .8, yDraw + sideVectors[4].y * .8);
    xDraw = 0 + 0.6 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(4 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .6, yDraw + sideVectors[4].y * .6);
    xDraw = 0 + 0.4 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(4 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .4, yDraw + sideVectors[4].y * .4);
    xDraw = 0 + 0.2 * radius * cos(4 * TWO_PI / 6);
    yDraw = 0 + 0.2 * radius * sin(4 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[4].x * .2, yDraw + sideVectors[4].y * .2);
    xDraw = 0 + 0.8 * radius * cos(5 * TWO_PI / 6);
    yDraw = 0 + 0.8 * radius * sin(5 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[5].x * .8, yDraw + sideVectors[5].y * .8);
    xDraw = 0 + 0.6 * radius * cos(5 * TWO_PI / 6);
    yDraw = 0 + 0.6 * radius * sin(5 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[5].x * .6, yDraw + sideVectors[5].y * .6);
    xDraw = 0 + 0.4 * radius * cos(5 * TWO_PI / 6);
    yDraw = 0 + 0.4 * radius * sin(5 * TWO_PI / 6) -5;
    line(xDraw, yDraw, xDraw + sideVectors[5].x * .4, yDraw + sideVectors[5].y * .4);
  }
  pop();
}

function drawTicks(radius) {
  push();
  stroke('#F29559');
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let x1 = 1.15 * radius * cos(i * TWO_PI / 12);
    let y1 = 1.15 * radius * sin(i * TWO_PI / 12);
    let x2 = (radius * 1.25) * cos(i * TWO_PI / 12);
    let y2 = (radius * 1.25) * sin(i * TWO_PI / 12);
    line(x1, y1, x2, y2);
  }
  pop();
}

function drawMinutes(currentMinute, radius, c) {
  push();
  stroke(c);
  strokeWeight(.5);
  fill(c);
  for (let i = 1; i < currentMinute + 1; i++) {
    let x1 = 1.15 * radius * cos(i * TWO_PI / 60);
    let y1 = 1.15 * radius * sin(i * TWO_PI / 60);
    let x2 = (radius * 1.2) * cos(i * TWO_PI / 60);
    let y2 = (radius * 1.2) * sin(i * TWO_PI / 60);
    line(x1, y1, x2, y2);
  }
  let xDraw = 1.15 * radius * cos(currentMinute * TWO_PI / 60);
  let yDraw = 1.15 * radius * sin(currentMinute * TWO_PI / 60);
  fill("#23B5D3");
  ellipse(xDraw, yDraw, 4, 4);
  pop();
}

function drawBezier() {
  push();
  noFill();
  translate(-windowWidth/10, windowHeight/8);
  stroke(255);
  bezier(bezierStartX, bezierStartY, bezierControl1X, bezierControl1Y, bezierControl2X, bezierControl2Y, bezierEndX, bezierEndY);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw();
}