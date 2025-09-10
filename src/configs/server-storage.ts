import { CookieName } from "@/enums/auth";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getAccessToken = () => {
    return getCookie(CookieName.ACCESS_TOKEN, { cookies });
};

export const getRefreshToken = () => {
    return getCookie(CookieName.REFRESH_TOKEN, { cookies });
};

export const getUserType = () => {
    return getCookie(CookieName.USER_TYPE, { cookies });
};
