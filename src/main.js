import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchInput = form.querySelector('input[name="search-text"]');
    const searchQuery = searchInput.value.trim();

    if (searchQuery === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query',
            position: 'topRight',
        })
        return;
    }

    clearGallery();

    showLoader();

    try {
        const data = await getImagesByQuery(searchQuery);

        if (!data.hits || data.hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
            return;
        }

        createGallery(data.hits);
    
    } catch (error){
        console.error('Error:', error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    
        searchInput.value = '';
    }
});