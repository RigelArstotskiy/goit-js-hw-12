import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"

const galleryContainer = document.querySelector('.gallery');
let lightbox = null;

export function initLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    close: true,
    nav: true,
    overlay: true,
    showCounter: true,
  });
}

export function createGallery(images) {
  const galleryHTML = images
  .map(image => 
  `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          class="gallery-image"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </a>
    </li>
  `)
  .join('');

  galleryContainer.insertAdjacentHTML('beforeend', galleryHTML);

  if (lightbox) {
    lightbox.refresh();
  } else {
    initLightbox();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';

  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.classList.add('visible');

  const form = document.querySelector('.form');
  form.querySelector('button').disabled = true;
}

export function hideLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.classList.remove('visible');

  const form = document.querySelector('.form');
  form.querySelector('button').disabled = false;
}