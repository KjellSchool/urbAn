let bodyPose;
let video;
let ctx;
let poses = [];

let $canvas;
const $container = document.querySelector(".poster");
let $poster;

const preload = async () => {
  bodyPose = await ml5.bodyPose("BlazePose");
  console.log("model ready", bodyPose);

  $poster = document.createElement("img");
  $poster.src = "./src/assets/poster-default.png";
  $container.appendChild($poster);

  setup();
};

const setup = async () => {
  ctx = $canvas.getContext("2d");

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480 },
  });

  video = document.createElement("video");
  video.srcObject = stream;
  video.play();

  requestAnimationFrame(draw);

  $canvas.width = video.width = 640;
  $canvas.height = video.height = 480;

  $canvas.style.display = "none";

  bodyPose.detectStart(video, (result) => {
    poses = result;

    if (result.length > 0) {
      const nose = result[0].keypoints.find((kp) => kp.name === "nose");
      console.log(nose);

      if (nose.x < $canvas.width / 2) {
        // Head on left side
        // document.querySelector("body").style.backgroundColor = "red";
        $poster.src = "./src/assets/poster-default.png";
      } else {
        // ff
        // document.querySelector("body").style.backgroundColor = "blue";
        $poster.src = "./src/assets/poster-pink.png";
      }
    }
  });
};

const draw = () => {
  ctx.drawImage(video, 0, 0, $canvas.width, $canvas.height);
  ctx.fillStyle = "red";

  poses.forEach((pose) => {
    pose.keypoints.forEach((keypoint) => {
      if (keypoint.confidence > 0.1) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 8, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  });

  requestAnimationFrame(draw);
};

const init = () => {
  $canvas = document.querySelector("#video-canvas");
  preload();
};

init();
