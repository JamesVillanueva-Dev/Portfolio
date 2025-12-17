let particles = [];
let gravityActive = false; 
let holdTimer = null;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("left", "0");
  canvas.style("z-index", "-1");

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(10, 15, 25);

  for (let p of particles) {
    p.update();
    p.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --------------------

function mousePressed() {
  holdTimer = setTimeout(() => {
    gravityActive = true; 
  }, 1000);

  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

function mouseReleased() {
  clearTimeout(holdTimer);
  gravityActive = false;
}

// --------------------

class Particle {
  constructor(x, y) {
    this.pos = createVector(x ?? random(width), y ?? random(height));
    this.vel = p5.Vector.random2D().mult(random(0.2, 1));
    this.baseSize = random(1.5, 3);
    this.color = color(random(120, 255), random(170,255), 255, 180);
  }

  update() {
    if (gravityActive) {
      let dx = mouseX - this.pos.x;
      let dy = mouseY - this.pos.y;
      let distSq = dx*dx + dy*dy; // square of distance
      let force = 5 / (distSq + 100); // inverse distance scaling
      this.vel.x += dx * force;
      this.vel.y += dy * force;
    }

    this.pos.add(this.vel);

    // wrap around screen
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

    this.size = this.baseSize + sin(frameCount * 0.05 + this.pos.x * 0.1);
  }

  show() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
  }
}