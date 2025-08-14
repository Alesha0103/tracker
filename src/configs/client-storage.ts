import { CookieName } from "@/enums/auth";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const setAccessToken = ({ accessToken }: { accessToken: string }) => {
    return setCookie(CookieName.ACCESS_TOKEN, accessToken);
};

export const readAccessToken = () => {
    return getCookie(CookieName.ACCESS_TOKEN);
};

export const deleteToken = () => {
    return deleteCookie(CookieName.ACCESS_TOKEN);
};
