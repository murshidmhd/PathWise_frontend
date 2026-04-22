import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
// const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || "http://localhost:8001/api/chat";
const API_BASE_URL = "https://pathwise.duckdns.org/api";
const CHAT_API_URL = "https://pathwise.duckdns.org/api/chat";


// Main API instance (Port 8000)
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Chat API instance (Port 8001)
const chatApi = axios.create({
  baseURL: CHAT_API_URL,
  withCredentials: true,
});

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("access", token);
  } else {
    localStorage.removeItem("access");
  }
};

export const getAccessToken = () => localStorage.getItem("access") || "";

// Apply auth headers to both instances
const authInterceptor = (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(authInterceptor);
chatApi.interceptors.request.use(authInterceptor);

// Response interceptor for main API
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh/`,
          {},
          { withCredentials: true },
        );
        const nextToken = refreshResponse.data.access || refreshResponse.data.access_token;
        setAccessToken(nextToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken("");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { chatApi };
export default api;
