import axios from "axios";

// 1. Use environment variables from Vercel, fall back to localhost for local development
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL; 

const getBaseUrl = (port = 8000) => {
  const { hostname, protocol } = window.location;

  // Hybrid mode: Local frontend -> Remote EC2 Backend
  if (hostname.includes("localhost")) {
    const parts = hostname.split('.');
    // If visiting vimal.localhost, talk to vimal.pathwise.duckdns.org
    if (parts.length > 1 && parts[0] !== 'localhost') {
      return `http://${parts[0]}.pathwise.duckdns.org/api`;
    }
    // Fallback to main production domain
    return `https://pathwise.duckdns.org/api`;
  }

  // Pure production mode
  return `${protocol}//${hostname}/api`;
};

const API_BASE_URL = getBaseUrl(8000);
const CHAT_API_URL = `${getBaseUrl(8001)}/chat`;

// Main API instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Chat API instance
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
