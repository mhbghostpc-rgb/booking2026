import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactMenu from "@/components/ContactMenu";
import JsonLd from "@/components/JsonLd";
import Tracking from "@/components/Tracking";
import AudioPlayer from "@/components/AudioPlayer";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "أكاديمية مستر محب موسى | لتعليم اللغة الإنجليزية",
  description: "أكاديمية مستر محب موسى هي منصة تعليمية متخصصة في تعليم اللغة الإنجليزية للطلاب بنظام حجز ومتابعة تفاعلي.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <JsonLd />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        </noscript>
      </head>
      <body className={`${tajawal.variable} font-tajawal antialiased bg-obsidian text-white overflow-x-hidden`}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <AudioPlayer />
        <ContactMenu />
        <Footer />
        <Tracking />
      </body>
    </html>
  );
}
