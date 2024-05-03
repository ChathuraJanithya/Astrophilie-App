import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMarsRoverPhotos } from "../../services/mars-api";
import { Typography } from "../common/Typography";
import { Skeleton, Button, Card } from "@nextui-org/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ItemCard from "../common/ItemCard";

// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";

const MarsSection = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update Splide's active slide
  const updateSlide = (index) => {
    setActiveIndex(index);
    ref.current?.splide?.go(index);
  };

  // Custom Pagination Buttons
  const PaginationButton = ({ index }) => (
    <button
      className={`h-2 w-2 rounded-full ${
        activeIndex === index ? "bg-black" : "bg-zinc-200"
      }`}
      onClick={() => updateSlide(index)}
    ></button>
  );

  const CustomNextArrow = () => (
    <button
      className="flex items-center justify-center w-10 h-10 p-2 text-white bg-black border rounded-full"
      onClick={() => ref?.current?.splide.go(">")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-4 h-4 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </button>
  );
  const CustomPrevArrow = () => (
    <button
      className="flex items-center justify-center w-10 h-10 p-2 text-white bg-black border rounded-full"
      onClick={() => ref?.current?.splide.go("<")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
    </button>
  );

  const { isLoading, isSuccess, isError, error, data, refetch, isFetching } =
    useQuery({
      queryKey: ["marsRoverPhotos"],
      queryFn: () => getMarsRoverPhotos(),
      enabled: true,
      staleTime: Infinity,
    });

  const marsData = data?.photos;
  const topTenData = marsData?.slice(0, 6);

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
      className=" max-w-[1440px] mx-auto px-4 py-[48px] md:py-[96px]"
      id="mars"
    >
      <div className="flex justify-between mb-8 md:mb-12">
        <Typography variant="title2" displayAs="h2" className=" md:text-start">
          Mars Rover
        </Typography>
        <Link to="/mars">
          <Button
            className="font-semibold text-white bg-black rounded-md hover:bg-slate-900 hover:scale-105"
            size="md"
            auto
          >
            View More
          </Button>
        </Link>
      </div>

      <Splide
        onMoved={(splide) => setActiveIndex(splide?.index)}
        ref={ref}
        options={{
          autoWidth: true,
          rewind: true,
          gap: "1rem",
          pagination: false,
          autoplay: true,
          drag: true,
          type: "loop",
          arrows: false,
          snap: true,
          padding: {
            left: "0",
            right: "0",
          },
        }}
      >
        {!isFetching
          ? topTenData?.map((item, index) => (
              <SplideSlide key={index}>
                <ItemCard item={item} home={true} />
              </SplideSlide>
            ))
          : [0, 1].map((_, index) => (
              <SplideSlide key={index}>
                <>
                  <Skeleton className="rounded-lg ">
                    <div className="w-[300px] h-[400px] mx-[16px] mb-4 "></div>
                  </Skeleton>
                  <Skeleton className="w-20 mt-4 rounded-lg">
                    <div className="rounded-lg h-[8px] bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="mt-4 rounded-lg w-28">
                    <div className="rounded-lg h-[8px] bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="mt-4 rounded-lg w-36">
                    <div className="rounded-lg h-[8px] bg-default-300"></div>
                  </Skeleton>
                </>
              </SplideSlide>
            ))}
      </Splide>

      <div className="flex items-center justify-between gap-4 px-2 mb-4 md:gap-0 ">
        <div className="flex gap-2 ">
          {topTenData?.map((item, index) => (
            <PaginationButton key={index} index={index} />
          ))}
        </div>
        <div className="flex gap-4 ">
          <CustomPrevArrow />
          <CustomNextArrow />
        </div>
      </div>
    </motion.div>
  );
};

export default MarsSection;
