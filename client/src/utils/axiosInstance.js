import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:1000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response.status === 401) {
//             localStorage.removeItem("token");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );
