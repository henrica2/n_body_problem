import { Vector2 } from "./Vector.js"
export { Mover }

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("mousemove", handleMouseMove);

let mouse = {
    xPos: null,
    yPos: null,
    isDown: false
}

function handleMouseMove(event) {
    mouse.xPos = event.clientX;
    mouse.yPos = event.clientY;
}

function handleMouseDown(event) {
    mouse.isDown = true;
}

function handleMouseUp(event) {
    mouse.isDown = false;
}

class Mover {
    constructor(position, mass) {
        this.position = new Vector2(position.x, position.y);
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.mass = mass;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.mass * 10, 0, Math.PI * 2, false);
        c.lineWidth = 4;
        c.stroke();
        c.fillStyle = 'grey';
        c.fill(); 
    }

    applyForce(Vector2) {
        Vector2.divide(this.mass);
        this.acceleration.add(Vector2);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.scale(0);
    }

    edges() {
        if (this.position.y <= 0) {
            this.velocity.y = this.velocity.y * -1;
        }
        if (this.position.y >= window.innerHeight) {
            this.velocity.y = this.velocity.y * -1;
        }
        if (this.position.x <= 0) {
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.position.x >= window.innerWidth) {
            this.velocity.x = this.velocity.x * -1;
        }
    }

    calcForce() {
        if (mouse.isDown) {
            let mPos = new Vector2(mouse.xPos, mouse.yPos);
            let force = Vector2.subVector2(mPos, this.position);
            force.setMag(0.1);
            return force;
        }
        else {
            let force = new Vector2(0, 0);
            return force;
        }
    }
    
}


let initV = new Vector2(0, 0);
let initA = new Vector2(0, 0);


let movers = [];
for (let i = 0; i < 10; i++) {
    let start = new Vector2((canvas.width / 2) + i * 10, (canvas.height / 2) + i * 5);
    let mover = new Mover(start, initV, initA, 1 + (i / 2));
    movers.push(mover);
}

function update() {
    requestAnimationFrame(update);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (const mover of movers) {
        mover.applyForce(mover.calcForce());
        mover.update();
        mover.edges();
        mover.draw();
    }
}

update();