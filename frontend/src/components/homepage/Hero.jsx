import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import data from "./data.json";
const Hero = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateSlide = (index) => {
    setActiveIndex(index);
    ref.current?.splide?.go(index);
  };

  const PaginationButton = ({ index }) => (
    <button
      className={`h-3 w-3 rounded-full ${
        activeIndex === index ? "bg-black" : " bg-[#969696A6]"
      }`}
      onClick={() => updateSlide(index)}
    ></button>
  );

  const CarouselItem = ({ item }) => {
    return (
      <div
        className={`relative max-h-[600px] w-full `}
        style={{
          backgroundImage: `url(${item.img_src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" backdrop-blur-md">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[1300px] mx-auto py-12 p-6 ">
            <div className="flex items-center justify-center w-full py-2 text-center md:py-12 md:text-left">
              <div className="flex items-center w-full gap-4 ">
                <div className="hidden md:block"></div>
                <div className="flex flex-col items-center justify-center w-full ">
                  <h1 className="lg:text-[36px] font-bold text-white text-start text-[28px] ">
                    {item.title}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center order-first w-full gap-4 p-4 md:order-last ">
              <img
                src={item.img_src}
                alt="cover-image"
                width={975}
                height={325}
                classNames={cn(`object-contain w-[180px]  rounded-xl`)}
              />
              <div className="hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        transition: {
          duration: 2,
          type: "tween",
          ease: "backOut",
        },
        y: 0,
      }}
      viewport={{ once: true }}
    >
      <div className="relative w-full mb-8  max-h-[600px] ">
        <Splide
          onMoved={(splide) => setActiveIndex(splide?.index)}
          ref={ref}
          hasTrack={false}
          className="!p-0"
          aria-label="My Favorite Images"
          options={{
            autoplay: true,
            perPage: 1,
            perMove: 1,
            rewind: true,
            drag: true,
            arrows: false,
            gap: "1rem",
            snap: true,
            pagination: false,
            type: "loop",
          }}
        >
          <SplideTrack>
            {data &&
              data?.photos?.map((item) => (
                <SplideSlide>
                  <CarouselItem item={item} />
                </SplideSlide>
              ))}
          </SplideTrack>

          <div className="flex items-center justify-center w-full mt-2">
            <div className="flex gap-4 ">
              {data &&
                data?.photos?.map((_, index) => (
                  <PaginationButton key={index} index={index} />
                ))}
            </div>
          </div>
          <div />
        </Splide>
      </div>
    </motion.div>
  );
};

export default Hero;
