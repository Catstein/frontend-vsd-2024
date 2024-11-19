import { Navbar } from "@/components/Navbar";
import { Toast } from "@/components/Toast";
import { TokenProvider } from "@/contexts/useToken";
import { inter } from "@/lib/fonts/fonts";
import type { Metadata } from "next";
import "./globals.css";

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
        className={`${inter.className} flex flex-col items-center justify-center subpixel-antialiased w-screen h-screen bg-[#F4F4F5]`}
      >
        <TokenProvider>
          <Navbar />
          <Toast>{children}</Toast>
        </TokenProvider>
      </body>
    </html>
  );
}
