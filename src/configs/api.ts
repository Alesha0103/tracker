import axios from "axios";
import { readAccessToken } from "./client-storage";

export const api = axios.create({
    baseURL: process.env.API_URL,
});

api.interceptors.response.use(
    function (response) {
        return response;
    }
    // async function (error) {
    //     if (
    //         error.response?.status === 401 &&
    //         error.response?.data?.message === "NOT_AUTORIZED"
    //     ) {
    //         localStorage.clear();
    //         await api.post("/logout", {}, { withCredentials: true });
    //         window.location.href = "/";
    //     }
    //     return Promise.reject(error);
    // }
);

api.interceptors.request.use(
    async function (config) {
        const token = await readAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
