import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { draftMode } from "next/headers";
import DisableDraftMode from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { SanityLive } from "@/sanity/lib/live";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  // src:'../fonts/poppins400.woff2',
  variable: '--font-poppins',
  weight:'400',
  preload:false,
})

export const metadata: Metadata = {
  title: "E-commerce website ",
  description: "E-commerce website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      className={`${poppins.variable} antialiased`}
      >
        {/* {(await draftMode()).isEnabled &&
           
        <>
        <DisableDraftMode/>
        <VisualEditing/>
        </>
        } */}
         {isDraftMode ? (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      ) : (
        // <EnableDraftMode />
        <></>
      )}

        <Header/>
        {children}
        <Footer/>
        <Toaster position="bottom-right" toastOptions={{style:{backgroundColor:'#000000', color:'#ffffff'}}}/>
        <SanityLive/>
      </body>
    </html>
    </ClerkProvider>
  );
}

