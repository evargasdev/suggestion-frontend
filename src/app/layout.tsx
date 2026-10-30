import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/ThemeProvider";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mujeres y Turismo",
  description: "Test",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Provider>
          <div className="grid min-h-screen place-items-center bg-linear-to-br from-purple-200 via-white to-purple-400">
            <main className="w-full sm:max-w-xs md:max-w-lg">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
