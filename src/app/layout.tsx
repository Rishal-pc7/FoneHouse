import type { Metadata } from "next";
import { Manrope,Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsappButton from "@/components/Footer/WhatsappButton";



const manrope = Manrope({
  variable: "--font-manrope",
  weight: ['400', '500', '600','700'],
  subsets:['latin'] 
});
const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ['400', '500', '600','700',"800"],
  subsets:['latin'] 
});

export const metadata: Metadata = {
  title: "Fone House",
  description: "Fone House is Saudi Arabia’s trusted shop for mobile sales, expert repairs, and genuine accessories. Discover top brands, professional service, and fast local support—your one-stop solution for everything mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${urbanist.variable} relative font-manrope dark antialiased`}>
        <Navbar/>
        {children}
        {/* <WhatsappButton/> */}
        <Footer/>
      </body>
    </html>
  );
}
