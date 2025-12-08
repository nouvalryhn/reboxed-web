import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReBoxed - Preloved Marketplace Indonesia | Jual Beli Barang Bekas Berkualitas",
  description: "Platform jual beli barang preloved terpercaya di Indonesia. Temukan produk berkualitas dengan harga terbaik, garansi kepuasan, dan pembayaran aman.",
  keywords: ["preloved", "marketplace", "jual beli", "barang bekas", "secondhand", "indonesia"],
  authors: [{ name: "ReBoxed Team" }],
  openGraph: {
    title: "ReBoxed - Preloved Marketplace Indonesia",
    description: "Platform jual beli barang preloved terpercaya di Indonesia",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
