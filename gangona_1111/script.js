document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const openBtn = $('openEnvelopeBtn');
  const seal = $('sealContainer');
  const pageOverlay = $('pageOverlay');
  const letter = $('letter');
  const closeBtn = $('closeLetterBtn');
  const bgMusic = $('backgroundMusic');
  const envelopeSound = $('envelopeSound');
  const musicBtn = $('musicButton');
  const hearts = $('heartsBackground');
  const imageViewer = $('imageViewer');
  const expandedImage = $('expandedImage');
  let musicPlaying = false;

  function createHeart() {
    if (!hearts) return;
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = Math.random() > .5 ? '♥' : '♡';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.fontSize = `${12 + Math.random() * 15}px`;
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 8500);
  }
  setInterval(createHeart, 450);

  function playBackground() {
    if (!bgMusic) return;
    bgMusic.volume = .16;
    bgMusic.play().then(() => {
      musicPlaying = true;
      if (musicBtn) musicBtn.textContent = '🎶';
    }).catch(() => {
      musicPlaying = false;
      if (musicBtn) musicBtn.textContent = '🎵';
    });
  }

  function openLetter() {
    document.body.classList.add('letter-open');
    letter.setAttribute('aria-hidden', 'false');
    if (bgMusic) bgMusic.pause();
    musicPlaying = false;
    if (envelopeSound) {
      envelopeSound.volume = .45;
      envelopeSound.currentTime = 0;
      envelopeSound.play().catch(() => {});
    }
    setTimeout(() => letter.focus?.(), 350);
  }

  function closeLetter() {
    document.body.classList.remove('letter-open');
    letter.setAttribute('aria-hidden', 'true');
    if (envelopeSound) envelopeSound.pause();
    playBackground();
  }

  openBtn?.addEventListener('click', openLetter);
  seal?.addEventListener('click', openLetter);
  pageOverlay?.addEventListener('click', closeLetter);
  closeBtn?.addEventListener('click', closeLetter);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (imageViewer?.classList.contains('show')) closeImage();
      else if (document.body.classList.contains('letter-open')) closeLetter();
    }
  });

  musicBtn?.addEventListener('click', () => {
    if (!bgMusic) return;
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      musicBtn.textContent = '🎵';
    } else {
      playBackground();
    }
  });

  function closeImage() {
    imageViewer?.classList.remove('show');
    imageViewer?.setAttribute('aria-hidden', 'true');
    if (expandedImage) expandedImage.src = '';
  }
  document.querySelectorAll('.photo-card img').forEach((img) => {
    img.addEventListener('click', () => {
      if (!img.complete || img.naturalWidth === 0) return;
      expandedImage.src = img.src;
      imageViewer.classList.add('show');
      imageViewer.setAttribute('aria-hidden', 'false');
    });
    img.addEventListener('error', () => {
      img.alt = 'ضيف صورتك هنا بنفس اسم الملف المكتوب في الكود';
      img.classList.add('missing-photo');
    });
  });
  $('closeImageViewer')?.addEventListener('click', closeImage);
  imageViewer?.addEventListener('click', (e) => {
    if (e.target === imageViewer) closeImage();
  });
});
