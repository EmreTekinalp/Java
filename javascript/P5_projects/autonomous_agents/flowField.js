function FlowField(resolution) {

    this.cols = floor(width / resolution);
    this.rows = floor(height / resolution);
    this.resolution = resolution;
    this.increment = 0.05;
    this.zoff = 0;
    this.vectors;    

    this.setup = function() {
        this.vectors = new Array(this.cols, this.rows);
    }

    this.display = function() {
        var xoff = 0;
        for (var r=0; r < this.rows; r++) {
            var yoff = 0;
            for (var c=0; c < this.cols; c++) {
                var index = c + r * this.cols;
                var angle = noise(xoff, yoff, this.zoff) * TWO_PI * 7;
                this.vec = p5.Vector.fromAngle(angle);
                this.vec.setMag(0.5);
                this.vectors[index] = this.vec;
                xoff += this.increment;
                
                /*
                push();
                translate(c * this.resolution, r * this.resolution);
                rotate(this.vec.heading());
                stroke(255, 100);
                strokeWeight(1);
                line(0, 0, this.resolution, 0);
                pop();*/
            }
            yoff += this.increment;
        }
        this.zoff += 0.005;
    }
}