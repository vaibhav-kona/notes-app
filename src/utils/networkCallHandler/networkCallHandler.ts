import axios, { AxiosHeaders, AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  // TODO: Setup env -> baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL: 'http://localhost:8001/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.url?.includes('/authenticated-path')) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to log in on unauthorized errors
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
