import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// const token = process.env.SANITY_API_READ_TOKEN;
export async function GET(request: NextRequest) {
    await (await draftMode()).disable();
    return NextResponse.redirect(new URL('/', request.url))
}