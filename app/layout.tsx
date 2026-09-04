import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flor del ángulo áureo",
  description: "Animación de una flor dibujada con el ángulo áureo (137.5°)",
};

// Sin h-full / min-h-full: el shell del stepper mide h-dvh, y `html{height:100%}`
// resuelve contra el viewport grande en mobile, lo que dejaría un scroll fantasma.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="overscroll-none">{children}</body>
    </html>
  );
}
