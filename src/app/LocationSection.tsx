import LocationCarousel from "@/components/Carousels/LocationCarousel"
import { ScrollAnimation } from "./Template"
function LocationSection() {
  return (
    <div className="w-full py-10 px-4 md:px-10 " >
    <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} className="w-full flex flex-col gap-4 items-center text-center ">
        <h2 className="font-extrabold text-2xl md:text-4xl text-white/80">Where to Find Us</h2>
    </ScrollAnimation>
    <ScrollAnimation>
     <LocationCarousel/>    
    </ScrollAnimation>
    </div>
  )
}
export default LocationSection