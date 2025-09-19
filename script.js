// ===== Slideshow =====
let slideIndex = 0;
showSlides();
function showSlides() {
  const slides = document.getElementsByClassName('slides');
  for (let i = 0; i < slides.length; i++) slides[i].style.display = 'none';
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  if (slides.length) slides[slideIndex-1].style.display = 'block';
  setTimeout(showSlides, 2500);
}

// ===== Typing Effect =====
const titleText = 'Happy Birthday, Sayang! ❤️';
let idx = 0;
function typing() {
  const el = document.getElementById('typing-title');
  if (!el) return;
  if (idx < titleText.length) {
    el.innerHTML += titleText.charAt(idx);
    idx++;
    setTimeout(typing, 90);
  }
}
typing();

// ===== Love Notes dengan fade =====
const notes = [
  'Loving you is not a crime 🤪',
  'The best thing ever happened to me this year = JD PACAR KM 🙂‍↕️',
  'Walaupun suga lebih dulu dtg ke hidup aku, tetep aku maunya seumur hidup sm km 😚',
  'Thankyou for bringing my smiles back with your presence 🤍',
  'I asked God for the man i always wanted, and God sent you to answered my prayer 🥹🫶🏼'
];
function showLoveNote(){
  const loveNoteEl = document.getElementById('loveNote');
  const random = Math.floor(Math.random() * notes.length);
  loveNoteEl.innerText = notes[random];
  loveNoteEl.classList.remove('fade-note');
  void loveNoteEl.offsetWidth;
  loveNoteEl.classList.add('fade-note');
}

// ===== Secret Message Pop-up =====
function unlockMessage(){
  const input = document.getElementById('secretInput').value.toLowerCase();
  const secretMsg = document.getElementById('secretMsg');
  if(input === 'jenni'){
    alert('💖 Secret Message: Walaupun kamu udh tau, tapi tetep aku ingetin lagi kalo aku sayang banget sama kamu! 🥰');
    secretMsg.innerText = '🎉 Secret unlocked!';
  } else {
    secretMsg.innerText = 'Hmm coba lagi deh 😏';
  }
}

function checkAnswer(inputId, correctAnswer, resultId) {
  const userInput = document.getElementById(inputId).value.toLowerCase().trim();
  const resultEl = document.getElementById(resultId);

  if (userInput.includes(correctAnswer)) {
    resultEl.innerText = "✅ Nais Bener! 💖 (" + correctAnswer + ")";
    resultEl.className = "quiz-result correct";
    launchConfetti();
  } else {
    resultEl.innerText = "❌ Apasih Salah, jawaban yang bener: " + correctAnswer;
    resultEl.className = "quiz-result wrong";
  }
}



// ===== Spin Wheel with sound =====
const wheelOptions = [
  '10x Hug 🤗',
  '5x Kiss 😘',
  'Nonton bareng film yang aku pilih 🎬',
  'Massage gratis dari aku 💆🏻‍♀️',
  'Nikah sama aku💖',
  'Dinner aku yang traktir 🍽️'
];
let wheelSpinning = false;
const spinSound = new Audio('assets/spin.mp3');
function spinWheel(){
  if(wheelSpinning) return;
  wheelSpinning = true;
  try{ spinSound.play(); }catch(e){}
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const slices = wheelOptions.length;
  const arc = 2 * Math.PI / slices;
  let angle = 0;

  function draw(rotation){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    angle = 0;
    for(let i=0;i<slices;i++){
      ctx.beginPath();
      ctx.fillStyle = i%2===0 ? '#f8bbd0' : '#ffe6f0';
      ctx.moveTo(150,150);
      ctx.arc(150,150,150,angle+rotation,angle+rotation+arc);
      ctx.fill();
      ctx.save();
      ctx.translate(150,150);
      ctx.rotate(angle+rotation+arc/2);
      ctx.fillStyle='#4b0000';
      ctx.fillText(wheelOptions[i],60,5);
      ctx.restore();
      angle+=arc;
    }
  }

  // initial draw
  draw(0);

  const spinAngle = Math.random()*360 + 720;
  const spinTimeTotal = 3000;
  const start = performance.now();

  function rotateWheel(timestamp){
    const spinTime = timestamp - start;
    const progress = Math.min(spinTime/spinTimeTotal,1);
    const easeOut = 1 - Math.pow(1-progress,3);
    const rotation = (spinAngle * easeOut) * Math.PI/180;
    draw(rotation);
    if(progress < 1){
      requestAnimationFrame(rotateWheel);
    } else {
      const degrees = (spinAngle % 360);
      const index = Math.floor((slices - (degrees/360*slices)) % slices);
      document.getElementById('wheelResult').innerText = 'Result: ' + wheelOptions[index];
      wheelSpinning = false;
      launchConfetti();
    }
  }
  requestAnimationFrame(rotateWheel);
}

// ===== Emoji Reaction floating =====
function dropEmoji(emoji){
  const span = document.createElement('span');
  span.innerText = emoji;
  span.className = 'flying-emoji';
  span.style.position='fixed';
  span.style.left = Math.random()*window.innerWidth + 'px';
  span.style.top = window.innerHeight + 'px';
  span.style.fontSize = (Math.random()*18+18) + 'px';
  document.body.appendChild(span);
  let pos = window.innerHeight;
  const timer = setInterval(()=>{
    if(pos < -80){ clearInterval(timer); span.remove(); }
    else { pos -= 4; span.style.top = pos + 'px'; }
  }, 25);
}

// ===== Gift Surprise =====
function openGift(){
  document.getElementById('gift-msg').innerText = '💌 selamat! anda telah menyetujui kontrak perayaan ultah seumur hidup bersama jenni💖';
  launchConfetti();
}

// ===== Music Control (button under title) =====
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
if(toggleBtn){
  toggleBtn.addEventListener('click', ()=>{
    if(music.paused){ music.play(); toggleBtn.innerText = '⏸ Pause'; }
    else { music.pause(); toggleBtn.innerText = '▶️ Play'; }
  });
}

// ===== Floating Hearts =====
function createHeart(){
  const heart = document.createElement('div');
  heart.innerText = '💖';
  heart.style.position = 'absolute';
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.fontSize = Math.random()*22 + 12 + 'px';
  heart.style.top = '100vh';
  heart.style.opacity = 0.7;
  heart.style.pointerEvents = 'none';
  document.getElementById('hearts-container').appendChild(heart);
  let pos = 100;
  const timer = setInterval(()=>{
    if(pos < -10){ clearInterval(timer); heart.remove(); }
    else { pos -= 0.35; heart.style.top = pos + 'vh'; }
  }, 30);
}
setInterval(createHeart, 900);

// ===== Confetti (using canvas-confetti) =====
function launchConfetti(){
  if(typeof confetti !== 'function') return;
  const duration = 1500;
  const end = Date.now() + duration;
  (function frame(){
    confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
    if(Date.now() < end) requestAnimationFrame(frame);
  })();
}
// load confetti library
(function(){ const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'; document.head.appendChild(s); })();
