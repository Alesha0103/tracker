import { NextRequest, NextResponse } from "next/server";
import { getRefreshToken, getUserType } from "./configs/config";
import { AppRoute, UserType } from "./enums/auth";

export async function middleware(req: NextRequest) {
    const token = await getRefreshToken();
    const userType = await getUserType();
    const currentPath = req.nextUrl.pathname;

    const protectedRoutes: string[] = [AppRoute.TRACKING, AppRoute.DASHBOARD];

    if (protectedRoutes.includes(currentPath)) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (currentPath === AppRoute.TRACKING && userType === UserType.ADMIN) {
            return NextResponse.redirect(new URL(AppRoute.DASHBOARD, req.url));
        }
        if (currentPath === AppRoute.DASHBOARD && userType === UserType.USER) {
            return NextResponse.redirect(new URL(AppRoute.TRACKING, req.url));
        }
    }

    return NextResponse.next();
}
