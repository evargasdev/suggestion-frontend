import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/ThemeProvider";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mujeres y Turismo // Diagnóstico Laboral",
  description:
    "Test anónimo para evaluar las condiciones laborales de las mujeres en el trabajo turístico de Playa del Carmen. Proyecto de investigación UQROO.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body
        className={`${geist.className} min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-300 text-gray-900 antialiased`}
      >
        <Provider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 w-full">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}