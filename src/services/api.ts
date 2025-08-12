import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_URL,
});

// api.interceptors.request.use(
//     function (config) {
//         const token = readToken() || readAuthToken();

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );
