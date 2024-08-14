function setup() {
let canvas = createCanvas(windowWidth, 0.25 * windowHeight);
  canvas.parent('sketch-container');
}

function draw() {
  // Set the center of the canvas as the origin (0,0)
  translate(width / 2, height / 2);
  // Set y axis to point upwards
  scale(1, -1);
  
  // Get the current time
  let timeHour = hour();
  let timeMinute = minute();
  let timeSecond = second();
  
  // Set constants for the shapes
  const hexagonRadius = 1/3 * height;
  const centerX = 0;
  const centerY = 0;
  const HrAngle = TWO_PI / 24;
  const hexagonAngle = TWO_PI / 6;

  background(0);

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


  // Fill in the hexagon for the current hour
  c = color('#1a1a1a');
  fillHourTriangle(timeHour, centerX, centerY, hexagonRadius, HrAngle, c);

  c = color(255, 255, 255);
  drawSecondsPerimeter(timeSecond, hexVerticies, sideVectors, c);

  // Draw the hours passed
  c = color(0, 42, 250);
  hoursPassed(timeHour, hexagonRadius, sideVectors, c);

  drawTicks(hexagonRadius);

  c = color(0, 42, 250);
  drawMinutes(timeMinute, hexagonRadius, c);
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
  strokeWeight(2);
  stroke(c);
  let xDraw;
  let yDraw;
  let seconds;
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
  // push();
  stroke(c);
  strokeWeight(1.5);
  let xDraw;
  let yDraw;;
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

  } 
    else if (currentHour == 13) {
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
  stroke(255);
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
  strokeWeight(2);
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
  ellipse(xDraw, yDraw, 5, 5);
  pop();
}
