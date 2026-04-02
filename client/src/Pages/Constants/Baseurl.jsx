import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// // Add request interceptor for logging/debugging
// axiosInstance.interceptors.request.use(config => {
//   console.log('Request sent to:', config.baseURL + config.url);
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// // Add response interceptor to handle errors globally
// axiosInstance.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.code === 'ECONNABORTED') {
//     console.error('Request timeout');
//     // You can show user notification here
//   }
//   return Promise.reject(error);
// });

// Export the image base URL separately
export const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

export default axiosInstance;
