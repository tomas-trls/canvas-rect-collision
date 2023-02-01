const canvas = document.querySelector("canvas");
const body = document.querySelector("body");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
body.style.overflow = "hidden";

const mouse = {
  x: undefined,
  y: undefined,
};

let colors = [
  "#fbf8cc",
  "#fde4cf",
  "#ffcfd2",
  "#f1c0e8",
  "#cfbaf0",
  "#a3c4f3",
  "#90dbf4",
  "#8eecf5",
  "#98f5e1",
  "#b9fbc0",
];

//Utils

const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const distance = (x1, x2, y1, y2) => {
  let xDist = x2 - x1;
  let yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = color;
      c.fill();
      c.closePath();
    };

    this.update = () => {
      this.draw();
    };
  }
}

let rect1;
let rect2;

const init = () => {
  rect1 = new Rectangle(200, 300, 100, 100, "red");
  rect2 = new Rectangle(450, 200, 100, 300, "blue");
  handleArrows(rect1);
  console.log(rect1.x);
};

const getPosition = () => {
  if (
    rect1.x + 100 >= rect2.x &&
    rect1.x <= rect2.x + 100 &&
    rect1.y + 100 >= rect2.y &&
    rect1.y <= rect2.y + 300
  ) {
    console.log("colliding on line");
  }
};

const handleArrows = (rectangle) => {
  window.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowUp":
        getPosition();
        return (rectangle.y -= 10);

      case "ArrowDown":
        getPosition();
        return (rectangle.y += 10);

      case "ArrowLeft":
        getPosition();
        return (rectangle.x -= 10);

      case "ArrowRight":
        getPosition();
        return (rectangle.x += 10);
    }
  });
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  rect1.update();
  rect2.update();
};

init();
animate();
