import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://be-uniscore-2022-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000, // 30s - tăng từ 10s
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
