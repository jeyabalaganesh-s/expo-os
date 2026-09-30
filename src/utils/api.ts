import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ✅ fallback to proxy
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
