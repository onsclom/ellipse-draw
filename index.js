/// <reference path="node_modules/@types/p5/global.d.ts" />
"use strict";

let holdingClick = false;
let ellipseStart;
let drawing;

let history = [];

function setup() {
    cursor('crosshair');

    createCanvas(600,400);
    ellipseStart = createVector(0,0);
    drawing = createGraphics(width, height);

    ellipseMode(CENTER);
    drawing.ellipseMode(CENTER);

    stroke(0);
    drawing.stroke(0);

    fill(0,0,0,0);
    drawing.fill(0,0,0,0);
}

function draw() {
    const unit = height/75;
    strokeWeight(unit)
    drawing.strokeWeight(unit)

    clear()
    background(255,255,255);
    image(drawing, 0, 0);

    if (holdingClick) {
        ellipse(ellipseStart.x, ellipseStart.y, ellipseStart.x-mouseX, ellipseStart.y-mouseY);        
    }

}

function mousePressed() {
    if (mouseButton === LEFT) {
        holdingClick = true;
        ellipseStart.x = mouseX;
        ellipseStart.y = mouseY;
    }
}

function mouseReleased() {
    if (holdingClick) {
        let newHistory = createGraphics(width, height);
        newHistory.image(drawing, 0, 0);
        history.push(newHistory);
        holdingClick = false;
        drawing.ellipse(ellipseStart.x, ellipseStart.y, ellipseStart.x-mouseX, ellipseStart.y-mouseY);        
    }

}

function keyPressed() {
    if (keyIsDown(CONTROL) && key == 'z') {
        drawing = history.pop();
        drawing.ellipseMode(CENTER);
        drawing.stroke(0);
        drawing.fill(0,0,0,0);
    }
}