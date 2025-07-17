import axios from 'axios';

const API_KEY = '51343327-60011f24457f2590865329ea5';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch ( error ) {
    throw new Error('Failed to fetch images from Pixabay');
  }
}