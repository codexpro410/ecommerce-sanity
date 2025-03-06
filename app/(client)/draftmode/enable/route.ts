// import { draftMode } from "next/headers";
// import { client } from '@/sanity/lib/client';
// import { validatePreviewUrl } from "@sanity/preview-url-secret";
// import { redirect } from "next/navigation";

// const token = process.env.SANITY_API_READ_TOKEN;
// const secret = process.env.SANITY_PREVIEW_SECRET; // ✅ Get the secret from .env.local

// export async function GET(request: Request) {
//     const url = new URL(request.url);
//     const urlSecret = url.searchParams.get('secret'); // ✅ Read secret from the request URL

//     if (!secret || urlSecret !== secret) {
//         return new Response("Invalid secret", { status: 400 });
//     }

//     const { isValid, redirectTo = '/' } = await validatePreviewUrl(
//         client.withConfig({ token }),
//         request.url
//     );

//     if (!isValid) {
//         return new Response("Invalid preview URL", { status: 400 });
//     }

//     (await draftMode()).enable();
//     redirect(redirectTo);
// }


import { draftMode } from "next/headers";
import { client } from '@/sanity/lib/client';
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { redirect } from "next/navigation";

const token = process.env.SANITY_API_READ_TOKEN;
export async function GET(request: Request) {
    const { isValid , redirectTo = '/' } = await validatePreviewUrl(
        client.withConfig({token}),
        request.url
    );
    if (!isValid) {
        return new Response("Invalid secret", { status:400});
    }
    (await draftMode()).enable();
    redirect(redirectTo);
}