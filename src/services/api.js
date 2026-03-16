import axios from "axios";

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

console.log(API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // needed for refresh_token cookie
});

let accessToken = localStorage.getItem("access") || "";

export const setAccessToken = (token) => {
  accessToken = token || "";

  if (token) {
    localStorage.setItem("access", token);
  } else {
    localStorage.removeItem("access");
  }
};

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const r = await axios.post(
          `${API_BASE_URL}/auth/refresh/`,
          {},
          { withCredentials: true },
        );
        const nextToken = r.data.access || r.data.access_token;
        setAccessToken(nextToken);
        original.headers.Authorization = `Bearer ${nextToken}`;
        return api(original);
      } catch {
        setAccessToken("");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
