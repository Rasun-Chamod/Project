import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().access;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetriableConfig | undefined;

    if (status === 401) {
      const refresh = useAuthStore.getState().refresh;
      if (!refresh || !original || original._retry) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      try {
        original._retry = true;
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh/`,
          { refresh }
        );

        const newAccess = refreshResponse.data?.access;
        if (newAccess) {
          useAuthStore.getState().setTokens({ access: newAccess, refresh });
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${newAccess}`;
          return api(original);
        }
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }

      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  }
);

export default api;
