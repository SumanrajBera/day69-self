const canvas = document.querySelector("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let colorArr = ["#DC3C22", "#EAC8A6", "#FBF5DE" , "#5EABD6"]

let friction = 0.95

let circArr = []

class Ball {
    constructor(x, y, rad, dx, dy, gravity, color) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.dx = dx;
        this.dy = dy;
        this.gravity = gravity;
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }

    updateDraw() {
        const onGround = this.y + this.rad >= canvas.height
        if (this.x + this.dx >= canvas.width) {
            this.x = canvas.width - this.rad;
        }

        if (onGround) {
            this.y = canvas.height - this.rad;

            if (Math.abs(this.dy) < 1) {
                this.dy = 0;
                this.dx = 0;
            } else {
                this.dy = -this.dy * friction
                this.dx = -this.dx * 0.8
            }
        }

        if (!onGround || this.dy !== 0) {
            this.dy += this.gravity
        }

        this.y += this.dy
        this.x += this.dx

        if(this.x < 0) this.x = this.rad


        this.draw()
    }
}

for (let i = 0; i < 250; i++) {
    let rad = Math.floor(Math.random()*30)+10;
    let x = (Math.floor(Math.random() * (canvas.width - 2 * rad)) + rad);
    let y = (Math.floor(Math.random() * (canvas.height / 2)) + rad);
    let dy = Math.random()*5 - 5;
    let dx = Math.random()*5 - 5;
    let gravity = Math.random() * 0.5 + 0.5;
    let color = colorArr[Math.floor(Math.random()*colorArr.length)]
    let circle = new Ball(x, y, rad, dx, dy, gravity, color);
    circArr.push(circle)
}

// let circle = new Ball(x, y, rad, dy)



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < 100; i++) {
        circArr[i].updateDraw()
    }
}

animate()


window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}