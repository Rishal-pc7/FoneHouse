import Image from "next/image";
import Link from "next/link";
import heroImg from "./hero-bg.png";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import {Template} from "./Template";
import BrandsSection from "./BrandsSection";
import LocationSection from "./LocationSection";
export default function Home() {
  return (
    <>
    
      <div className="relative md:h-[90vh] h-[80vh] w-full flex px-4 md:px-8 pb-20 md:pb-0 items-end md:items-center text-white">      
        <Image src={heroImg} placeholder="blur"  alt="FoneHouse" className="absolute inset-0 object-cover  object-[63%] w-full h-full z-0"  fill  priority unoptimized  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"/>
        <div className="absolute inset-0 bg-black/30  z-10"></div>
        <Template className="content md:w-1/2 z-20 md:py-5 py-3 text-white/80  flex flex-col gap-3 md:gap-5">
          <h1 className="font-extrabold text-xl md:text-3xl">Your One-Stop Shop for All Things Mobile</h1>
          <h5 className="font-light text-base md:text-xl">Experience the Best in Mobile Sales, Fast Repairs, and Genuine Accessories for Every Need</h5>
          <Link href={"/contact"} className="font-medium backdrop-blur-lg bg-white/5 border border-white/30 px-4 py-2 w-fit text-center">
            Learn More
          </Link>
        </Template>
      </div>
      <AboutSection/>
      <BrandsSection/>
      <LocationSection/>
      <ContactSection/>
    </>
  );
}