import { config } from "dotenv";
import axios from "axios";
config();

let instance = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = process.env.EXTERNAL_API_TOKEN;
    config.headers["authorization"] = `Bearer ${token}`;
    config.headers["cache-control"] = "no-cache";
    config.headers["content-type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
