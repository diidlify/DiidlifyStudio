anime({
targets: '.title',
translateY: [-100, 0],
opacity: [0, 1],
duration: 2000,
easing: 'easeOutExpo'
});

anime({
targets: '.subtitle',
opacity: [0, 1],
translateX: [-50, 0],
delay: 500,
duration: 1800,
easing: 'easeOutExpo'
});

anime({
targets: '.btn',
opacity: [0, 1],
translateY: [50, 0],
delay: anime.stagger(200, {start: 1000}),
duration: 1500,
easing: 'easeOutExpo'
});

anime({
targets: '.floating',
translateY: [0, -20],
direction: 'alternate',
loop: true,
easing: 'easeInOutSine',
duration: 2000
});

anime({
targets: '.character-card',
opacity: [0, 1],
translateY: [80, 0],
delay: anime.stagger(200),
duration: 1500,
easing: 'easeOutExpo'
});

const particles = document.querySelector('.particles');

for(let i = 0; i < 40; i++){ const particle=document.createElement('span'); particle.style.left=Math.random() * 100
  + 'vw' ; particle.style.animationDuration=(Math.random() * 5 + 3) + 's' ;
  particle.style.width=particle.style.height=(Math.random() * 8 + 4) + 'px' ; particles.appendChild(particle); } 
  //  Image modal: open on click of any gallery/panel image 
  const imageModal=document.getElementById('imageModal'); 
  const  modalImg=document.getElementById('modalImg'); const modalClose=document.getElementById('modalClose');
  document.querySelectorAll('.panel, .gallery-card').forEach(card=> {
  const img = card.querySelector('img');
  if (!img) return;
  card.style.cursor = 'zoom-in';
  card.addEventListener('click', () => {
  modalImg.src = img.src;
  modalImg.alt = img.alt || 'Artwork';
  imageModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  });
  });

  function closeModal() {
  imageModal.classList.remove('active');
  modalImg.removeAttribute('src');
  document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.classList.contains('active')) closeModal();
  });

  /* ---------- Order form: open Gmail compose with prefilled details ---------- */
  (function initOrderForm() {
  const form = document.getElementById('orderForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const TO = 'diidlify141@gmail.com';

  form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const type = (data.get('artwork_type') || '').toString().trim();
  const ref = (data.get('reference') || '').toString().trim();
  const req = (data.get('requirement') || '').toString().trim();

  const subject = `Artwork Request - ${name || 'Diidlify Studio'}`;
  const body =
  `Hi Varsha,\n\n` +
  `I'd like to place an artwork request.\n\n` +
  `Name: ${name}\n` +
  `Email: ${email}\n` +
  `Phone / WhatsApp: ${phone || '-'}\n` +
  `Artwork Type: ${type}\n` +
  `Catalogue Reference: ${ref || '-'}\n\n` +
  `Requirement:\n${req}\n\n` +
  `Thanks!`;

  const gmailUrl =
  'https://mail.google.com/mail/?view=cm&fs=1' +
  '&to=' + encodeURIComponent(TO) +
  '&su=' + encodeURIComponent(subject) +
  '&body=' + encodeURIComponent(body);

  window.open(gmailUrl, '_blank', 'noopener');

  status.textContent =
  'Gmail opened in a new tab with your details. Please review and click Send in Gmail to deliver your request.';
  status.className = 'form-status success';
  });
  })();

  /* ---------- Ninja cursor (shuriken + slash) ---------- */
  (function initNinjaCursor() {
  const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFine) return;

  const cursor = document.getElementById('ninjaCursor');
  const dot = document.getElementById('ninjaDot');
  if (!cursor || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;
  let rotation = 0;
  let lastTrailAt = 0;

  // Continuous shuriken spin
  anime({
  targets: { r: 0 },
  r: 360,
  duration: 1400,
  easing: 'linear',
  loop: true,
  update: (a) => { rotation = a.animations[0].currentValue; }
  });

  function loop() {
  // Smooth follow (lerp)
  curX += (mouseX - curX) * 0.18;
  curY += (mouseY - curY) * 0.18;
  dotX += (mouseX - dotX) * 0.4;
  dotY += (mouseY - dotY) * 0.4;

  cursor.style.transform =
  `translate(${curX}px, ${curY}px) translate(-50%, -50%) rotate(${rotation}deg)`;
  dot.style.transform =
  `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

  requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Track mouse + spawn trail particles
  document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.classList.add('visible');
  dot.classList.add('visible');

  const now = performance.now();
  if (now - lastTrailAt > 30) {
  lastTrailAt = now;
  spawnTrail(e.clientX, e.clientY);
  }
  });

  document.addEventListener('mouseleave', () => {
  cursor.classList.remove('visible');
  dot.classList.remove('visible');
  });
  document.addEventListener('mouseenter', () => {
  cursor.classList.add('visible');
  dot.classList.add('visible');
  });

  // Hover scale on interactive elements
  const hoverSelector = 'a, button, .panel, .gallery-card, input, textarea, .close-btn';
  document.querySelectorAll(hoverSelector).forEach(el => {
  el.addEventListener('mouseenter', () => {
  cursor.classList.add('hovering');
  anime.remove(cursor);
  anime({
  targets: cursor,
  scale: 1.6,
  duration: 350,
  easing: 'easeOutElastic(1, .6)'
  });
  });
  el.addEventListener('mouseleave', () => {
  cursor.classList.remove('hovering');
  anime.remove(cursor);
  anime({
  targets: cursor,
  scale: 1,
  duration: 300,
  easing: 'easeOutQuad'
  });
  });
  });

  // Katana slash on click
  document.addEventListener('mousedown', (e) => {
  // Pulse shuriken
  anime.remove(cursor);
  anime({
  targets: cursor,
  scale: [{ value: 0.6, duration: 90 }, { value: 1, duration: 260 }],
  easing: 'easeOutQuad'
  });
  spawnSlash(e.clientX, e.clientY);
  });

  function spawnTrail(x, y) {
  const t = document.createElement('div');
  t.className = 'ninja-trail';
  t.style.left = x + 'px';
  t.style.top = y + 'px';
  document.body.appendChild(t);

  anime({
  targets: t,
  scale: [1, 0.2],
  opacity: [0.9, 0],
  duration: 600,
  easing: 'easeOutQuad',
  complete: () => t.remove()
  });
  }

  function spawnSlash(x, y) {
  const slash = document.createElement('div');
  slash.className = 'ninja-slash';
  const angle = Math.random() * 90 - 45; // -45° to +45°
  slash.style.left = x + 'px';
  slash.style.top = y + 'px';
  slash.style.transform =
  `translate(-50%, -50%) rotate(${angle}deg) scaleX(0)`;
  document.body.appendChild(slash);

  anime
  .timeline({ complete: () => slash.remove() })
  .add({
  targets: slash,
  scaleX: [0, 1.2],
  opacity: [0, 1],
  duration: 140,
  easing: 'easeOutQuad'
  })
  .add({
  targets: slash,
  opacity: 0,
  scaleX: 1.4,
  duration: 260,
  easing: 'easeInQuad'
  });
  }
  })();