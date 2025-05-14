// services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // If any of your GET routes required an API key, you'd add it here:
    // 'x-api-key': 'YOUR_CLOUDINARY_API_KEY_OR_THE_ONE_YOU_SET_FOR_VERIFYAPIKEY'
  },
});

// --- Category Endpoints ---
export const fetchCategories = () => {
  console.log(`Fetching categories from: ${API_BASE_URL}/categories`);
  return apiClient.get('/categories');
};

export const fetchCategoryById = (id) => {
  return apiClient.get(`/categories/${id}`);
};

// --- Wallpaper Endpoints ---
export const fetchWallpapers = (categoryId = null) => {
  let url = '/wallpapers';
  if (categoryId) {
    url += `?category=${categoryId}`;
  }
  console.log(`Fetching wallpapers from: ${API_BASE_URL}${url}`);
  return apiClient.get(url);
};

export const fetchWallpaperById = (id) => {
  return apiClient.get(`/wallpapers/${id}`);
};

// --- Authentication (Example for later) ---
// export const loginUser = (credentials) => {
//   return apiClient.post('/auth/login', credentials);
// };

// export const registerUser = (userData) => {
//   return apiClient.post('/auth/register', userData);
// };

export default apiClient;