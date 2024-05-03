import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPictureOfTheDay } from "../../services/mars-api";
import { Typography } from "../common/Typography";
import { Skeleton } from "@nextui-org/react";
const Banner = () => {
  const { isLoading, isSuccess, isError, error, data, refetch, isFetching } =
    useQuery({
      queryKey: ["pictureDate"],
      queryFn: () => getPictureOfTheDay(),
      enabled: true,
      staleTime: Infinity,
    });

  const planetData = data;

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
      id="banner"
    >
      <Typography
        variant="title2"
        displayAs="h2"
        className="text-center md:text-start"
      >
        Picture of the Day
      </Typography>

      <div className="grid grid-cols-1 gap-4 mt-8 lg:gap-2 lg:grid-cols-2">
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
          className="flex justify-center w-full lg:justify-start "
        >
          {isLoading ? (
            <Skeleton className="max-w-[400px] min-w-[300px] rounded-lg">
              <div className="rounded-lg h-36 bg-default-300"></div>
            </Skeleton>
          ) : (
            <div className="relative max-w-lg rounded-md max-h-sm">
              <img
                src={planetData?.url}
                alt="hdurl"
                className="object-cover w-full h-full rounded-md inset-1"
              />
            </div>
          )}
        </motion.div>
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
          {isLoading ? (
            <Skeleton className="rounded-lg">
              <div className="rounded-lg h-[50px] bg-default-300"></div>
            </Skeleton>
          ) : (
            <div className="flex flex-wrap items-center justify-between ">
              <Typography
                variant="title2"
                displayAs="h2"
                className="text-start hover:scale-105 "
              >
                {planetData?.title}
              </Typography>
              <Typography
                variant="body2"
                displayAs="p"
                className="text-end text-[#666362] "
              >
                {planetData?.date}
              </Typography>
            </div>
          )}
          {isLoading ? (
            <Skeleton className="mt-4 rounded-lg">
              <div className="rounded-lg h-36 bg-default-300"></div>
            </Skeleton>
          ) : (
            <Typography variant="body" className="mt-4 break-words text-start">
              {planetData?.explanation}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton className="mt-4 rounded-lg">
              <div className="rounded-lg h-[30px] bg-default-300"></div>
            </Skeleton>
          ) : (
            <Typography variant="body2" className="flex justify-between mt-4 ">
              {planetData?.copyright ? (
                <span>By : {planetData?.copyright}</span>
              ) : (
                <span>By : NASA</span>
              )}
              <span>Service version : {planetData?.service_version}</span>
            </Typography>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;
