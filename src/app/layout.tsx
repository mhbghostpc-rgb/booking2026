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
  description: "أكاديمية مستر محب موسى هي منصة تعليمية متخصصة في تعليم اللغة الإنجليزية للطلاب بنظام حجز ومتابعة تفاعلي. احجز دروسك الآن وتفوق في الإنجليزي.",
  keywords: ["مستر محب موسى", "انجليزي", "تعليم اللغة الإنجليزية", "كورسات انجليزي", "ثانوية عامة", "حجز دروس", "Mr Moheb Mousa"],
  authors: [{ name: "Mr. Moheb Mousa" }],
  creator: "Mr. Moheb Mousa",
  openGraph: {
    title: "أكاديمية مستر محب موسى | لتعليم اللغة الإنجليزية",
    description: "أكاديمية مستر محب موسى هي منصة تعليمية متخصصة في تعليم اللغة الإنجليزية للطلاب.",
    url: "https://mrmohebmousabooking2026.vercel.app",
    siteName: "أكاديمية مستر محب موسى",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أكاديمية مستر محب موسى | لتعليم اللغة الإنجليزية",
    description: "أكاديمية مستر محب موسى هي منصة تعليمية متخصصة في تعليم اللغة الإنجليزية للطلاب.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
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
