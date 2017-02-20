function Particle() {
    this.pos = createVector(random(width), random(height));
    this.pre = this.pos;
    this.vel = createVector(0, 0);
    this.acc = createVector(0.01, 0.01);
    this.resolution = 20;
    this.maxspeed = 2;
    
    this.edges = function() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }
    
    this.follow = function(flowField) {
        var x = floor(this.pos.x / flowField.resolution); 
        var y = floor(this.pos.y / flowField.resolution);
        var index = x + y * flowField.cols;
        var force = flowField.vectors[index];
        this.applyForce(force);
    }
    
    this.applyForce = function(force) {
        this.acc.add(force);
    }
    
    this.update = function() {
        this.vel.limit(this.maxspeed);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    this.display = function() {
        stroke(map(this.pos.x, 0, width, 124, 155),
               map(this.pos.x, 0, width, 0, 200),
               map(this.pos.x, 0, width, 150, 255));
        strokeWeight(2);
        this.pre.add(10);
        line(this.pos.x, this.pos.y, this.pre.x * 1.01, this.pre.y * 1.001);
    }
}