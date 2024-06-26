'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { adCarouselImagePublicUrls, adCarouselImageUrls } from "@/constants";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const AdCarousel = () => {
  return (
    <Carousel
      className="w-full rounded-lg min-w-[200px] max-h-fit lg:max-h-[220px]"
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {adCarouselImagePublicUrls.map((url, index) => (
          <CarouselItem key={index} className="rounded-lg">
            <Image
              src={`/images/carousel-${url}.jpeg`}
              alt={`hero-${index}`}
              width={1000}
              height={1000}
              className="rounded-lg object-contain object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AdCarousel;
