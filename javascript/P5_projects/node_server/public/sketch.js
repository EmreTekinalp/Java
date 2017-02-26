var socket;

function setup() {
    createCanvas(600, 400);
    background(0);
    socket = io.connect('http://localhost:4000/');
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    fill(255, 0, 10);
    ellipse(data.x, data.y, 20, 20);
}


function mouseDragged() {
    console.log(mouseX + ', ' + mouseY);
    
    var data = {
        x: mouseX,
        y: mouseY        
    }
    socket.emit('mouse', data);
    fill(255);
    ellipse(mouseX, mouseY, 20, 20);
  
}

function draw() {
}