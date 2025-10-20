// --- Câu 1 ---
document.getElementById('submit1').addEventListener('click', function() {
  const ans = document.getElementById('answer1').value.trim();
  const feedback1 = document.getElementById('feedback1');
  if (ans === '1') {
    feedback1.textContent = '✅ Chính xác! Câu tiếp theo nào...';
    feedback1.style.color = '#2e7d32';
    setTimeout(() => {
      document.getElementById('quiz1').classList.add('hidden');
      document.getElementById('quiz2').classList.remove('hidden');
    }, 1000);
  } else {
    feedback1.textContent = '❌ Sai rồi, thử lại nha!';
    feedback1.style.color = '#d32f2f';
  }
});

// --- Câu 2 ---
const options = document.querySelectorAll('.option');
options.forEach(btn => {
  btn.addEventListener('click', () => {
    const feedback2 = document.getElementById('feedback2');
    if (btn.textContent.includes('Đẹp Trai')) {
      feedback2.textContent = '😎 Chuẩn không cần chỉnh!';
      feedback2.style.color = '#2e7d32';
      setTimeout(() => {
        document.getElementById('quiz2').classList.add('hidden');
        showWishExplosion();
      }, 1000);
    } else {
      feedback2.textContent = '😅 Ủa, chọn lại thử xem!';
      feedback2.style.color = '#d32f2f';
    }
  });
});

// --- Hiển thị lời chúc bùng nổ ---
function showWishExplosion() {
  const wish = document.getElementById('wish');
  wish.classList.remove('hidden');
  wish.classList.add('explode');

  startConfetti(true);
  playSound();
  typeText(wish.querySelector('p'));

  document.getElementById("musicBtn").classList.remove("hidden");

}

// --- Hiệu ứng gõ chữ ---
function typeText(element) {
  const text = element.textContent;
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i === text.length) clearInterval(interval);
  }, 40);
}

// --- Âm thanh chúc mừng (tùy chọn) ---
function playSound() {
  const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_05a8b92b82.mp3');
  audio.volume = 0.4;
  audio.play();
}

// --- Hiệu ứng confetti ---
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let confetti = [];

function ConfettiPiece(x, y, color, size, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
  this.speedX = speedX;
  this.speedY = speedY;
  this.opacity = 1;

  this.draw = function() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  };

  this.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.002;
    if (this.y > canvas.height || this.opacity <= 0) this.reset();
    this.draw();
  };

  this.reset = function() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.opacity = 1;
  };
}

function startConfetti(big = false) {
  const amount = big ? 300 : 150;
  confetti = [];
  for (let i = 0; i < amount; i++) {
    confetti.push(new ConfettiPiece(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      `hsl(${Math.random() * 360}, 80%, 60%)`,
      5 + Math.random() * 5,
      (Math.random() - 0.5) * 3,
      2 + Math.random() * 5
    ));
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => c.update());
  requestAnimationFrame(animate);
}

const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
  const audio = new Audio("music.mp3");
  audio.volume = 0.6;
  audio.play()
    .then(() => {
      console.log("Đã phát nhạc!");
      
      // 👉 Khi nhạc bắt đầu, hiện ảnh
      const img = document.getElementById("LAImg");
      img.classList.remove("hidden");
      img.classList.add("show");
    })
});






