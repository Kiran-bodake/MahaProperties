import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/tailwind.css";
import "@/styles/globals.scss";
import "@/styles/x-admin.scss";

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm",
  display:  "swap",
  style:    ["normal", "italic"],
});

export const metadata: Metadata = {
  title:       "MahaProperties — Nashik's #1 Property Portal",
  description: "Find NA plots, agriculture land, commercial & industrial properties in Nashik.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}>
        {/* Google Analytics placeholder (install actual GA measurement ID in .env.local) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-XXXXXXX"}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-XXXXXXX"}', { page_path: window.location.pathname });
          `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
