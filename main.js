import { Vector2 } from "./forces/Vector.js"

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

class Mover {
    constructor(position, mass) {
        this.position = new Vector2(position.x, position.y);
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.mass = mass;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, Math.sqrt(this.mass) * 10, 0, Math.PI * 2, false);
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

    calcGravity(Mover) {
        const g = 0.4;
        let force = Vector2.subVector2(Mover.position, this.position);
        let distance = clamp(Vector2.getMag(force), 5, 25);
        force.normalize();
        let strength = (g * this.mass * Mover.mass) / (distance * distance);
        force.scale(strength);
        return force;
    }
    
}

function clamp(a, b, c) {
    return Math.max(Math.min(a, Math.max(b, c)), Math.min(b, c));
}

const startA = new Vector2(400, canvas.height / 2);
const startB = new Vector2(900, canvas.height / 2);
const startC = new Vector2(650, 100);
const startD = new Vector2(650, canvas.height - 100);
const planets = [];

let planetA = new Mover(startA, 10);
let planetB = new Mover(startB, 10);
let planetC = new Mover(startC, 10);
let planetD = new Mover(startD, 10);

let initialUp = new Vector2(0, 1);
let initialDown = new Vector2(0, -1);
let initialLeft = new Vector2(-1, 0);
let initialRight = new Vector2(1, 0);

let strength = 10
initialUp.scale(strength);
initialDown.scale(strength);
initialLeft.scale(strength);
initialRight.scale(strength);

planetA.applyForce(initialUp);
planetB.applyForce(initialDown);
planetC.applyForce(initialLeft);
planetD.applyForce(initialRight);

planets.push(planetA);
planets.push(planetB);
planets.push(planetC);
planets.push(planetD);

function update() {
    requestAnimationFrame(update);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < planets.length; i++) {
        for (let j = 0; j < planets.length; j++) {
            if (i != j) {
                planets[i].applyForce(planets[i].calcGravity(planets[j]));
            }
        planets[i].update();
        planets[i].draw();
        }
    }
}

update();