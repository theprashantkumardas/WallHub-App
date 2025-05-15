// src/services/api.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Category {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallpaper {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string | Category; // Can be ObjectId string or populated Category object
  tags: string[];
  isSafeForWork: boolean;
  viewCount: number;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

// --- Category Endpoints ---
export const fetchCategories = async (): Promise<Category[]> => {
  console.log(`Fetching categories from: ${API_BASE_URL}/categories`);
  const response = await apiClient.get<Category[]>('/categories');
  return response.data;
};

// --- Wallpaper Endpoints ---
export const fetchWallpapers = async (categoryId?: string | null): Promise<Wallpaper[]> => {
  let url = '/wallpapers';
  if (categoryId) {
    url += `?category=${categoryId}`;
  }
  console.log(`Fetching wallpapers from: ${API_BASE_URL}${url}`);
  const response = await apiClient.get<Wallpaper[]>(url);
  return response.data;
};

export const fetchWallpaperById = async (id: string): Promise<Wallpaper> => {
  const response = await apiClient.get<Wallpaper>(`/wallpapers/${id}`);
  return response.data;
};

// --- Search Endpoint (Example - Implement backend first) ---
export const searchWallpapersAPI = async (query: string): Promise<Wallpaper[]> => {
  console.log(`Searching wallpapers with query: ${query}`);
  // Assuming your backend search endpoint is /wallpapers/search?q=query
  const response = await apiClient.get<Wallpaper[]>(`/wallpapers/search?q=${encodeURIComponent(query)}`);
  return response.data;
};


export default apiClient;