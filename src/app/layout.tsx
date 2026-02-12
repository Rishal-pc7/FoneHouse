import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Manrope, Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";


const manrope = Manrope({
  variable: "--font-manrope",
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});
const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ['400', '500', '600', '700', "800"],
  subsets: ['latin']
});

export const metadata: Metadata = {
  icons: {
    icon: '/logo.jpg',
  },
  title: "FoneHouse",
  description: "FoneHouse is Saudi Arabia’s leading destination for retail and wholesale mobile sales, expert repairs, and genuine accessories. Trusted by thousands for top brands, quality service, and competitive prices—perfect for both individual customers and business needs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${urbanist.variable} relative font-manrope dark antialiased`}>
        <CartProvider hasSession={(await cookies()).has('session_id')}>
          <Navbar />
          {children}
          {/* <WhatsappButton/> */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
