
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a reasonable timeout
  timeout: 10000,
});

// Add a request interceptor to include the auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if error is because server is not running
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      console.error('Backend server connection error:', error);
      
      // You could implement fallback behavior here for demo purposes
      // For example, return mock data for certain endpoints
      
      // Re-throw the error with a more informative message
      const enhancedError = new Error('Network Error: Backend server is not running');
      enhancedError.name = 'BackendConnectionError';
      return Promise.reject(enhancedError);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
