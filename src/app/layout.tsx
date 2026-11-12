import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/ThemeProvider";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mujeres y Turismo // Test Laboral",
  description:
    "Test anónimo para conocer las condiciones laborales de las mujeres en el trabajo turístico de Playa del Carmen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
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
