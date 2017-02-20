function Agent(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.target = createVector(x, y);
    this.pre = this.position;

    this.maxspeed = random(5, 10);
    this.maxforce = 0.1;
    this.radius = 3;    
    
    this.setPosition = function(x, y) {
        this.position = createVector(x, y);
    }
    
    this.setTarget = function(x, y) {
        this.target = createVector(x, y);
    }
    
    this.arrive = function(target) {
        var desire = p5.Vector.sub(target, this.position);

        var distance = desire.mag()
        var speed = this.maxspeed;

        if (distance < 100){
            speed = map(distance, 0, 100, 0, this.maxspeed);
        }
        desire.setMag(speed);
        var steer = p5.Vector.sub(desire, this.velocity);
        steer.limit(this.maxforce);
        return steer;
    }
    
    this.flee = function(target) {
        // desire = target -position
        // steer = desire - velocity
        var desire = p5.Vector.sub(target, this.position);
        var distance = desire.mag()
        if (distance < 50) {
            var steer = p5.Vector.sub(desire, this.velocity);
            steer.limit(this.maxforce);
            steer.mult(-1);
            return steer;
        }
        return createVector(0, 0);
    }

    this.follow = function(flowField) {
        var x = floor(this.position.x / flowField.resolution); 
        var y = floor(this.position.y / flowField.resolution);
        var index = x + y * flowField.cols;
        var force = flowField.vectors[index];
        this.applyForce(force);
        
        stroke(map(this.position.x, 0, width, 150, 255),
               map(this.position.x, 0, width, 0, 200),
               map(this.position.x, 0, width, 124, 155));
        strokeWeight(2);
        this.pre.add(10);
        line(this.position.x, this.position.y, this.pre.x * 1.01, this.pre.y * 1.001);
    }
    
    
    this.behaviors = function() {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        var flee = this.flee(mouse);
        
        // weight the forces
        arrive.mult(2);
        flee.mult(5);
        
        // apply the forces
        this.applyForce(arrive);
        this.applyForce(flee);
    }    
    
    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.update = function() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }

    this.display = function() {
        strokeWeight(0);
        //ellipse(this.position.x, this.position.y, this.radius, this.radius);
        rect(this.position.x, this.position.y, this.radius, this.radius);
    }
}
