var agents = []; 
var particles = [];
var font;
var dots;
var word1 = "Explosion"
var word2 = "Gravity"
var check = false;
var pts;
var up = 0;
var field;
var sample = 0.08;
var fontsize = 128;

function preload() {
    font = loadFont('RawengulkSans-094.otf')
}


function setup() {
    createCanvas(600, 400);
    background(0);
    field = new FlowField(20);
    field.setup();
    pts = new Array();
    // create dots at text contour
    dots = font.textToPoints(word2, 100, height * 0.5, fontsize, {sampleFactor: sample});
    for (var i=0; i<600; i++) {
        particles[i] = new Particle();
    }
    for (var i=0; i<dots.length; i++) {
        var dot = dots[i];
        agents[i] = new Agent(dot.x, dot.y);
    }
}

function mousePressed() {
    if (check == false) {
        word1_dots = font.textToPoints(word1, 60, height * 0.5, fontsize, {sampleFactor: sample});
        var diff = abs(word1_dots.length - agents.length);

        if (diff > 0) {
            var len = agents.length;
            for (var i=0; i < diff; i++) {
                var new_dot = word1_dots[diff + i];
                var creation_dot = agents[(len - 1)];
                if (abs(len - diff) > 0) {
                    creation_dot = agents[(len-1) - i];
                }
                agents[i + len] = new Agent(creation_dot.position.x, creation_dot.position.y);
            }
        }
        for (var i=0; i < agents.length; i++) {
            var dot = word1_dots[i];
            agents[i].setTarget(dot.x, dot.y);
        }
        check = true;    
    }
    else {
        word2_dots = font.textToPoints(word2, 100, height * 0.5, fontsize, {sampleFactor: sample});
        var diff = abs(word2_dots.length - agents.length);

        if (diff > 0) {
            var len = agents.length;
            for (var i=0; i < diff; i++) {
                var current = agents[(len - 1) - i];
                var new_current = new Agent(current.position.x, current.position.y);
                pts[i] = new_current;
                agents.pop(len + i);
            }
        }
        
        for (var i=0; i<agents.length; i++) {
            var dot = word2_dots[i];
            agents[i].setTarget(dot.x, dot.y);
        }
        up = 0;
        check = false;    
    }
}

function draw() {
    // draw the background and the text
    background(0, 99);
    
    // flowField
    field.display();
    
    // particles
    for (var i=0; i<particles.length; i++) {
        particles[i].follow(field);
        particles[i].edges();
        particles[i].update();
        particles[i].display();
    }

    // load the autonomous agents
    var mouse = createVector(mouseX, mouseY);
    for (var j=0; j<pts.length; j++) {
        pts[j].follow(field);
        pts[j].update();
    }
    for (var i=0; i<agents.length; i++) {
        fill(255);
        agents[i].behaviors();
        agents[i].update();
        agents[i].display();
    }
}