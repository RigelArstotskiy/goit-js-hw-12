import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
hideLoadMoreButton();

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = form.querySelector('input[name="search-text"]').value.trim();
    page = 1;
    clearGallery();
    hideLoadMoreButton();

    if (query === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query',
            position: 'topRight',
        })
        return;
    }

    await fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchAndRenderImages(true);
});

async function fetchAndRenderImages(isLoadMore = false) {
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    totalHits = data.totalHits;

    if (!data.hits || data.hits.length === 0) {
  if (page === 1) {
    iziToast.info({
      title: 'Info',
      message: 'No images match your search query.',
      position: 'topRight',
    });
  } else {
    iziToast.info({
      title: 'Info',
      message: "No more images found.",
      position: 'topRight',
    });
  }

  hideLoadMoreButton();
  return;
}

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (isLoadMore) smoothScroll();

  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
    form.querySelector('button').disabled = false;
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
