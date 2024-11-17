import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Conselho Tutelar de Piracicaba",
  description: "Garantindo os direitos de nossas crianças e jovens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} flex items-center justify-center  antialiased w-screen h-screen bg-[#F4F4F5]`}
      >
        {children}
      </body>
    </html>
  );
}
