import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhoneShop | iPhones disponibles",
  description:
    "Nuevos y usados, revisados y con estado real de batería. Precios en pesos argentinos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
