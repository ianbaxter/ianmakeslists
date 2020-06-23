// setup canvas
const canvas = document.querySelector("#title__canvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = innerWidth);
let height = (canvas.height = innerHeight);
let screenSize = Math.sqrt(width * width + height * height);
const background = ctx.createLinearGradient(width, 0, width, height);
background.addColorStop(0, "rgb(34, 34, 34)");
background.addColorStop(1, "rgb(34, 34, 34)");

// Check platform
let isMobile = false;
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

// Variables
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
const numOfBlobs = 100;
let isMouseMoving = true;
let lastPosition = {
  x: 0,
  y: 0,
  mouseSpeed: 0,
  peakMouseAcceleration: 0,
};

// Event listeners for mouse control
window.addEventListener("mousemove", (event) => {
  isMouseMoving = true;

  // Deccelerate animation when mouse stops moving
  setTimeout(() => {
    isMouseMoving = false;
    setInterval(() => {
      if (lastPosition.peakMouseAcceleration > 1) {
        lastPosition.peakMouseAcceleration /= 1.001;
      }
    }, 100);
  }, 1);

  // Determine mouse acceleration
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  let dx = Math.abs(lastPosition.x - event.clientX);
  let dy = Math.abs(lastPosition.y - event.clientY);
  let movement = Math.sqrt(dx * dx + dy * dy);
  let mouseSpeed = 10 * movement;
  let prevMouseSpeed = lastPosition.mouseSpeed;
  let mouseAcceleration = Math.abs(10 * (mouseSpeed - prevMouseSpeed));

  lastPosition.x = event.clientX;
  lastPosition.y = event.clientY;
  lastPosition.mouseSpeed = mouseSpeed;

  if (
    mouseAcceleration > lastPosition.peakMouseAcceleration &&
    mouseAcceleration < 12000
  ) {
    lastPosition.peakMouseAcceleration = mouseAcceleration;
  }
});

// Util functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Objects
function Blob(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0;

  this.update = () => {
    this.velocity = lastPosition.peakMouseAcceleration / 200000;
    this.radians += this.velocity;

    this.x = x + (Math.cos(this.radians) * width) / 6;
    this.y = y + (Math.sin(this.radians) * height) / 6;

    this.draw();
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}

// Define and polulate blobs array
let blobs;
function init() {
  blobs = [];

  for (let i = 0; i < numOfBlobs; i++) {
    let radius = random(screenSize / 20, screenSize / 14);
    let blobColor = random(0, 68);
    let blob = new Blob(
      random(width * 0.3, width * 0.7),
      random(height * 0.25, height * 0.75),
      radius,
      "rgb(" + blobColor + "," + blobColor + "," + blobColor + ")"
    );
    blobs.push(blob);
  }

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  blobs.forEach((blob) => {
    blob.update();
  });

  if (!isMobile) {
    canvas.classList.add("canvas-fade-in");
  } else {
    canvas.classList.add("canvas-fade-in-mobile");
  }
}

// Animation loop
function loop() {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  blobs.forEach((blob) => {
    blob.update();
  });

  requestAnimationFrame(loop);
}

// Resize blobs on window resize
let onResize = function (object, type, callback) {
  if (object == null || typeof object == "undefined") return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
};

init();

if (!isMobile) {
  onResize(window, "resize", function (event) {
    canvas.classList.remove("canvas-fade-in");
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
    screenSize = Math.sqrt(width * width + height * height);
    setTimeout(() => {
      init();
      canvas.classList.add("canvas-fade-in");
    }, 300);
  });

  loop();
}
