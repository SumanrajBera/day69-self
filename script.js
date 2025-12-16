const canvas = document.querySelector("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let x = 100;
let y = 200;
let dy = 3;
let r = 30;
let gravity = 1;
let friction = 0.9

let circArr = []

class Circle {
    constructor(x, y, dy, r) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.r = r;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        c.stroke()
    }

    update() {


        if (this.y + this.r > canvas.height) {
            this.dy = -this.dy * friction
        } else {
            this.dy += 1;
        }

        this.y += this.dy;
        this.draw()
    }
}

let circle = new Circle(x, y, dy, r);


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);

    circle.update()
}

animate()