import axios from "axios";
import { refresh } from "@/services/auth/endpoints";

export const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            error.response?.data?.message === "TOKEN_EXPIRED"
        ) {
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = "/";
            }
            return Promise.reject(error);
        }
        if (
            error.response?.status === 401 &&
            error.response?.data?.message === "NOT_AUTORIZED"
        ) {
            try {
                await refresh();
                return api(originalRequest);
            } catch {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
