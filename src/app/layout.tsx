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
    "Test anónimo para evaluar las condiciones laborales de las mujeres en el trabajo turístico de Playa del Carmen. Observatorio de Estudios de Género.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body
        className={`${geist.className} min-h-screen bg-linear-to-br from-primary-50 via-background to-primary-100 text-foreground antialiased`}
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