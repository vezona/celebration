var audio = new Audio("/assert/index.mp3");
var isPlaying = false;

function typing() {
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100; // 打字出現的速度

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML =
      ".typewrite > .wrap { border-right: 0.08em solid #fff; color: #fff;}";
    document.body.appendChild(css);
  };
}

function showBtn() {
  $(document).ready(function () {
    var elements = document.querySelectorAll(".typewrite");
    elements[elements.length - 1].remove();
  });

  // add btn
  $("h1").append(
    '<button type="button" class="btn btn-warning clickBtn" onclick="showCanvas(carousel)">看決定</button>'
  );
}

// 生日快樂亂飛
function canvasAnimationStart() {
  // remove btn
  $("h1").remove();

  var canvas = document.getElementById("canv");
  var ctx = canvas.getContext("2d");
  // Utilities
  function randomColor() {
    return "#" + Math.random().toString(16).slice(2, 8);
  }

  function randomWord() {
    var word = words[Math.floor(Math.random() * words.length)];
    return word;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Make the canvas occupy the full page
  var W = window.innerWidth,
    H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  var particles = [];
  var mouse = {};
  //Lets create some particles now
  var particle_count = 100;
  for (var i = 0; i < particle_count; i++) {
    particles.push(new particle());
  }
  canvas.addEventListener("mousedown", track_mouse, false);
  canvas.addEventListener("touch", track_mouse, false);

  function track_mouse(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    for (var i = 0; i < particle_count; i++) {
      particles.push(new particle());
    }
  }

  function particle() {
    //speed, life, location, life, colors
    //speed range = -2.5 to 2.5
    this.speed = {
      x: -2.5 + Math.random() * 5,
      y: -2.5 + Math.random() * 5,
    };
    //location = center of the screen
    if (mouse.x && mouse.y) {
      this.location = {
        x: mouse.x,
        y: mouse.y,
      };
    } else {
      this.location = {
        x: W / 2,
        y: H / 2,
      };
    }
    this.color = randomColor();

    this.font = {
      size: randomInt(3, 15),
    };

    this.word = randomWord();
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    //Painting the canvas black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.font = p.font.size + "vh Luckiest Guy";
      ctx.textAlign = "center";
      ctx.transition = "all 2s ease";
      ctx.fillStyle = p.color;
      ctx.fillText(p.word, p.location.x, p.location.y);
      ctx.fill();
      ctx.stroke();

      //lets move the particles
      p.location.x += p.speed.x;
      p.location.y += p.speed.y;

      p.speed.x += randomInt(-0.01, 0.01);
      p.speed.y += randomInt(-0.01, 0.01);

      // Make 'em big and small
      // Warning: Causes extreme lag
      //p.font.size += randomInt(-0.1, 0.1)
    }
  }
  setInterval(draw, 10);
}

// Big Word Array
words = [
  "birthday",
  "生日",
  "happy",
  "you",
  "kuro",
  "樂",
  "k大",
  "生日",
  "快樂",
  "樂",
  "HBD",
  "快",
  "生",
];

const carouselTemplate = `
<div class="swiper py-5">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <div class="swiper-slide bg-white text-black d-flex align-items-center justify-content-center" style="font-size:100px">
      猜猜是誰的祝福
    </div>
    <!-- Jin -->
    <div class="swiper-slide Jin">
      <!-- flip card -->
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex flex-column justify-content-center">
            <div style='font-size:50px;'>&#128175;&#127882; &#128525; &#127874; &#127873; &#129351; &#127881</div>
            <div style='font-size:50px;'>&#129351;&#127839; &#128525; &#127874; &#127880; &#127870; &#127881</div>
            <h2 style='font-size:50px;' class="my-5">大大生日快樂！！！</h2>
            <div style='font-size:50px;'>&#128519; &#128525; &#127874; &#127873; &#127870; &#10024;</div>
            <div style='font-size:50px;'>&#128588;&#128519; &#129512; &#127874; &#127873; &#127882; &#127881</div>
          </div>
          <div class="flip-card-back d-flex">
            <img class="m-auto" src="./img/jin.jpg" alt="Avatar" style="width:500px;height:500px;">
          </div>
        </div>
      </div>
    </div>
    <!-- winnie -->
    <div class="swiper-slide winnie">
      <!-- flip card -->
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex px-4">
            <h2 class="m-auto lh-lg">從前從前，有個女生對他的主管說：從前從前，有個女生對他的主管說：從前從前，有個女生對他的主管說:...</h2>
          </div>
          <div class="flip-card-back d-flex">
            <img class="m-auto" src="./img/winnie.png" alt="Avatar" style="width:700px;height:500px;">
          </div>
        </div>
      </div>
    </div>
    <!-- shawn -->
    <div class="swiper-slide shawn">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex p-5 flex-column justify-content-center">
            <div>
              <img class="m-auto"  src="/img/cat-drumming.gif" style="width:419px;height:204px">
            </div>
            <div>
              <img class="m-auto"  src="/img/rickroll.gif" style="width:340px;height:232px">
            </div>
          </div>
          <div class="flip-card-back d-flex p-5 flex-wrap justify-content-center">
            <img src="./img/image (1).png" style="width:100px;height:100px">
            <img src="./img/image (2).png" style="width:100px;height:100px">
            <img src="./img/image (4).png" style="width:100px;height:100px">
            <img src="./img/image (5).png" style="width:100px;height:100px">
            <img src="./img/image (6).png" style="width:100px;height:100px">
            <img src="./img/image (7).png" style="width:100px;height:100px">
            <img src="./img/image (8).png" style="width:100px;height:100px">
            <img class="m-auto" src="./img/shawn.jpg" alt="Avatar" style="width:300px;height:300px;">
          </div>
        </div>
      </div>
    </div>
    <!-- Jim -->
    <div class="swiper-slide Jim">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex px-4">
            <h2 class="m-auto">生日快樂，以上今天</h2>
          </div>
          <div class="flip-card-back d-flex">
            <img class="m-auto" src="./img/jim.jpg" alt="Avatar" style="width:300px;height:300px;">
          </div>
        </div>
      </div>
    </div>
    <!-- rei -->
    <div class="swiper-slide rei">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex px-4">
            <h2 class="m-auto">小溡也祝你生日快樂~</h2>
          </div>
          <div class="flip-card-back d-flex">
            <img class="m-auto" src="./img/rei.jpg" alt="Avatar" style="width:300px;height:300px;">
          </div>
        </div>
      </div>
    </div>
    <!-- norah -->
    <div class="swiper-slide rei">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex px-4">
            <h2 class="m-auto text-decoration-line-through">好像來要買個蛋糕、加個鞭炮、再來點氣球?</h2>
          </div>
          <div class="flip-card-back d-flex">
            <img class="m-auto w-full" src="./img/norah.jpg" alt="Avatar" style="width:800px;height:500px;">
          </div>
        </div>
      </div>
    </div>
    <!-- mandy -->
    <div class="swiper-slide rei">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front d-flex px-5">
            <h2 class="m-auto">米漿在這祝 Kuro 大大 Happy Birthday!，希望你的願望都能成真喔～～</h2>
          </div>
          <div class="flip-card-back d-flex">
            <img class="m-auto" src="./img/mandy2.jpg" alt="Avatar" style="width:400px;height:400px;">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>
`;

// carousel
function carousel() {
  playSound()
  // 刪除canvas
  $("canvas").remove();
  // 加上 carousel 的html tag
  $("body").append(carouselTemplate);
  // carousel animation
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },

    // autoplay
    autoplay: {
      delay: 4000,
    },
  });
}

// 執行
typing();

// showBtn()
setTimeout(function () {
  showBtn();
}, 15000);

// 點擊按鈕後 showCanvas
function showCanvas(callback) {
  canvasAnimationStart();
  setTimeout(function () {
    if (typeof callback === "function") {
      callback();
    }
  }, 4000);
}

function playSound() {
  if (!isPlaying) {
    audio.loop = true;
    audio.play();
    isPlaying = true;
  }
};