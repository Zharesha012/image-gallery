const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

// Open lightbox on image click
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
  });
});

// Show image in lightbox by index
const lightboxCaption = document.getElementById('lightbox-caption');

function showImage(index) {
  lightbox.style.display = 'flex';
  lightboxImg.classList.remove('fade'); // reset animation
  void lightboxImg.offsetWidth; // force reflow for re-triggering animation
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  lightboxCaption.textContent = galleryImages[index].alt || "No caption available";
  lightboxImg.classList.add('fade');
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Next/prev functions
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

let startX = 0;

lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 50) { // minimum swipe distance
    if (diff < 0) nextImage(); // swipe left
    else prevImage();         // swipe right
  }
});