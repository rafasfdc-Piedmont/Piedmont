const images = [
  '3-Nacellesfoambulked.jpg',
  '2-Nacelles_rotor.JPG',
  '10-TheToiletposter.jpg',
  '1-Nacelles_base.JPG'
]
  .map(filename => ({
    filename,
    number: Number.parseInt(filename, 10)
  }))
  .sort((first, second) => first.number - second.number);

const imageElement = document.querySelector('.slide img');
const captionElement = document.querySelector('.slide figcaption');
const counterElement = document.querySelector('.carousel-counter');
const dotsElement = document.querySelector('.carousel-dots');
const previousButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  const image = images[currentIndex];
  imageElement.src = `images/${image.filename}`;
  imageElement.alt = `RidgerCrest Build photo ${image.number}`;
  captionElement.textContent = `Photo ${image.number}`;
  counterElement.textContent = `${currentIndex + 1} / ${images.length}`;

  document.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
    dot.setAttribute('aria-selected', String(dotIndex === currentIndex));
  });
}

images.forEach((image, index) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot';
  dot.type = 'button';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Show photo ${image.number}`);
  dot.addEventListener('click', () => showImage(index));
  dotsElement.append(dot);
});

previousButton.addEventListener('click', () => showImage(currentIndex - 1));
nextButton.addEventListener('click', () => showImage(currentIndex + 1));

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});

showImage(0);
