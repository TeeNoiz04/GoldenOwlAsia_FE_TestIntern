import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10s
});

// Response interceptor (chuẩn, rất ghi điểm)
axiosClient.interceptors.response.use(
  (response) => response.data, // chỉ trả data
  (error) => {
    console.error('API Error:', error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosClient;
