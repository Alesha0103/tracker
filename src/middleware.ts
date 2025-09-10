import { NextRequest, NextResponse } from "next/server";
import {
    getAccessToken,
    getRefreshToken,
    getUserType,
} from "./configs/server-storage";
import { AppRoute } from "./enums/auth";
import { UserType } from "./enums/users";

export async function middleware(req: NextRequest) {
    const accessToken = await getAccessToken();
    const refreshRoken = await getRefreshToken();
    const userType = await getUserType();

    const token = accessToken || refreshRoken;
    const currentPath = req.nextUrl.pathname;

    const protectedRoutes: string[] = [
        AppRoute.TRACKING,
        AppRoute.DASHBOARD,
        AppRoute.STATS,
    ];

    if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (currentPath === AppRoute.DASHBOARD && userType === UserType.USER) {
            return NextResponse.redirect(new URL(AppRoute.TRACKING, req.url));
        }
    }

    if (currentPath === "/" && token && userType) {
        return NextResponse.redirect(
            new URL(
                userType === UserType.ADMIN
                    ? AppRoute.DASHBOARD
                    : AppRoute.TRACKING,
                req.url
            )
        );
    }

    return NextResponse.next();
}
