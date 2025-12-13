let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  // create particles
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(10, 15, 25); // dark clean background

  for (let p of particles) {
    p.update();
    p.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --------------------

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.2, 1));
    this.baseSize = random(1.5, 3);
    this.color = color(random(120, 255), random(170,255), 255, 180);
  }

  update() {
    this.pos.add(this.vel);

    // wrap around screen
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

    // size oscillation
    this.size = this.baseSize + sin(frameCount * 0.05 + this.pos.x * 0.1);
  }

  show() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
  }
}
function mousePressed() {
  // Draw a circle wherever the mouse is clicked
  fill(random(255), random(255), random(255));
  noStroke();
  ellipse(mouseX, mouseY, 50, 50);
}