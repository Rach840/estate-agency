import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("user");
    const response = NextResponse.redirect(new URL("/", process.env.APP_URL));
    response.cookies.set("user", query || "", { path: "/" });

    return response;
}
