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

for(let i = 0; i < 40; i++){

  const particle = document.createElement('span');

  particle.style.left = Math.random() * 100 + 'vw';

  particle.style.animationDuration =
    (Math.random() * 5 + 3) + 's';

  particle.style.width =
    particle.style.height =
    (Math.random() * 8 + 4) + 'px';

  particles.appendChild(particle);
}
