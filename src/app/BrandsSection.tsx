import { ScrollAnimation } from "./Template"
import BrandCarousel from "@/components/Carousels/BrandCarousel"

function BrandsSection() {
  return (
    <div className="w-full py-10 px-4 md:px-10 " >
    <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} className="w-full flex flex-col gap-4 items-center text-center ">
        <h2 className="font-extrabold text-2xl md:text-4xl text-white/80">Brands We Offer</h2>
          <h4 className="font-semibold text-base md:text-xl text-brandBlue">
            We offer a wide range of leading mobile brands and accessories, ensuring quality products suited to every need.
          </h4>
    </ScrollAnimation>
    <ScrollAnimation>
    <BrandCarousel/>
    </ScrollAnimation>
    </div>
  )
}
export default BrandsSection