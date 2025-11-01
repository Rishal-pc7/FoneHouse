import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { ServiceCarousel } from './ServiceCarousel';
import { ScrollAnimation } from './Template';
const servicesData = [
  {
    image: "/furniture-cleaning.png",
    heading: "Furniture Cleaning Service",
    description:
      "Our Hourly Cleaning Service offers flexible, high-quality cleaning, at Floor, Kitchen & Utensils, and Bathroom Tasks, Including heavier duties.",
  },
  {
    image: "/hourly.png",
    heading: "Hourly Cleaning Service",
    description:
      "Our Hourly Cleaning Service offers flexible, high-quality cleaning, at Floor, Kitchen & Utensils, and Bathroom Tasks, Including heavier duties.",
  },
  {
    image: "/rehabilitation.png",
    heading: "Rehabilitation Cleaning",
    description:
      "Our Rehabilitation Cleaning Service include Floor, Facade, Window, Kitchen, Bathroom, and Tank Cleaning (Upper & Lower).",
  },
  {
    image: "/pest.png",
    heading: "Pest Control",
    description:
      "Professional Pest Control Services Eliminating all types of Pests and Insects—Delivered with Expert Care and Reliability.",
  },
  {
    image: "/home-maintainance.png",
    heading: "Home Maintainance",
    description:
      "Comprehensive Home Maintenance Covering Electrical, Plumbing, AC repair, AC cleaning and Leak Detection for Lasting Comfort and Safety.",
  },
  {
    image: "/ac-cleaning.png",
    heading: "Air Conditioner Cleaning",
    description:
      "Eco-safe air conditioner cleaning that removes dust, sanitizes coils and filters, boosts cooling efficiency, and protects your family’s health.",
  },
  {
    image: "/furniture.png",
    heading: "Furniture Moving",
    description:
      "Safe and efficient furniture moving service—ensuring careful handling and protection of your belongings.",
  },
];
function ServiceSection() {
  const services = useMemo(() => servicesData, []);
  return (
    <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} className="services flex flex-col items-center  text-center min-h-screen gap-10 pt-10 pb-8 relative">
        <div className="heading z-10 flex flex-col gap-4">
          <h1 className="font-extrabold text-xl md:text-2xl text-[#1C4177]">Our Professional Cleaning Services</h1>
          <h4 className="font-semibold text-base md:text-xl text-[#24B3DA]">
            We offer a wide range of expert cleaning solutions tailored to your unique needs with quality and professionalism.
          </h4>
        </div>
        <ServiceCarousel display="md:hidden" services={services} />
    <div className="hidden md:flex cards gap-x-5 flex-wrap gap-y-8  w-full justify-center place-items-center-safe z-10 p-5">
          {services.map((item, index) => (
            <ScrollAnimation  initialOptions={{y:40}} className='basis-[30%]' animatedOptions={{y:0}} key={item.heading + index}>
            <Card className="rounded-md bg-white border-[3px] border-white p-0">
              <CardContent className="p-0 ">
                <Image
                  src={item.image}
                  alt={item.heading}
                  className="rounded-t-md aspect-[5/4] object-center h-1/2 w-full object-cover"
                  width={600}
                  height={480}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="content p-4 grid gap-3">
                  <h1 className="font-extrabold  text-2xl md:text-xl text-[#24B3DA]">{item.heading}</h1>
                  <h2 className="font-semibold text-base  text-[#1C4177]">{item.description}</h2>
                </div>
              </CardContent>
            </Card>
            </ScrollAnimation>
          ))}
        </div>
        </ScrollAnimation>
  )
}

export default ServiceSection
