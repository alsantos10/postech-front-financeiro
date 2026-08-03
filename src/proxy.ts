import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "./infra/cookies/CookieTokenStorage";

export function proxy(request: NextRequest) {

    const session = request.cookies.get(SESSION_COOKIE)?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/painel") && !session) {
        const login = new URL("/", request.url);
        return NextResponse.redirect(login);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/painel/:path*"],
}