import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://network-back-test-production.up.railway.app/api';

console.log('[API] Base URL:', BASE_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string }>) => {
    let message = 'Произошла ошибка. Попробуйте позже.';

    if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message;

      if (serverMessage) {
        message = serverMessage;
      } else if (status === 404) {
        message = 'Ресурс не найден.';
      } else if (status === 400) {
        message = 'Некорректный запрос.';
      } else if (status === 500) {
        message = 'Ошибка сервера. Попробуйте позже.';
      }
    } else if (error.request) {
      message = 'Нет соединения с сервером. Проверьте интернет.';
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
