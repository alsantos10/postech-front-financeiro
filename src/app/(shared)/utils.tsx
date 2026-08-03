'use server'

import { SESSION_COOKIE } from "@/infra/cookies/CookieTokenStorage";
import { cookies } from "next/headers";

export async function LoggedIn() {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, "TOKEN", {
        httpOnly: true, // Blocks JavaScript access
        sameSite: 'lax', // Protects against CSRF
        maxAge: 60 * 60 * 24 * 7, // Expires in 1 week (in seconds)
        path: '/', // Available across the entire site
    })
}