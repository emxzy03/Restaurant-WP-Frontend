import router from "@/router";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

function delay(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    await delay(200);
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async function (res) {
    await delay(200);
    return res;
  },
  function (error) {
    console.log(error.response.status);
    if (401 === error.response.status) {
      router.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
