import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getEarth } from "../../services/mars-api";
import { Typography } from "../common/Typography";
import { Skeleton } from "@nextui-org/react";
import moment from "moment";
const Earth = () => {
  const { isLoading, isSuccess, isError, error, data, refetch, isFetching } =
    useQuery({
      queryKey: ["picEarth"],
      queryFn: () => getEarth(),
      enabled: true,
      staleTime: Infinity,
    });

  const planetData = data;

  const formatDate = (dateString) => {
    // Parse the date string using Moment.js
    const parsedDate = moment(dateString);

    // Format the parsed date into a readable format
    const formattedDate = parsedDate.format("MMMM D, YYYY [at] h:mm:ss A");

    return formattedDate;
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
      className=" max-w-[1440px] mx-auto px-4 py-[48px] md:py-[96px]"
      id="earth"
    >
      <Typography
        variant="title2"
        displayAs="h2"
        className="text-center md:text-start"
      >
        Earth Imagery
      </Typography>

      <div className="grid grid-cols-1 gap-4 mt-8 lg:gap-6 lg:grid-cols-2">
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
            <div className="flex flex-wrap items-center justify-between">
              <Typography
                variant="body2"
                displayAs="p"
                className="uppercase text-start hover:scale-105 "
              >
                Planet{""} : {planetData?.resource?.planet}
              </Typography>
              <Typography
                variant="body2"
                displayAs="p"
                className=" text-start md:text-end text-[#666362] "
              >
                {formatDate(planetData?.date)}
              </Typography>
            </div>
          )}
          {isLoading ? (
            <Skeleton className="mt-4 rounded-lg">
              <div className="rounded-lg h-36 bg-default-300"></div>
            </Skeleton>
          ) : (
            <Typography variant="body" className="mt-4 text-start">
              Landsat imagery is provided to the public as a joint project
              between NASA and USGS. A recent industry report on landsat
              satellite imagery data estimates that total annual value to the
              economy of $2.19 billion, far exceeding the multi-year total cost
              of building, launching, and managing Landsat satellites and
              sensors. The value is derived from consumers use of the data. The
              objective of this endpoint is to give you an easy to use taste of
              what Landsat imagery data can provide. There are more complicated
              APIs available if you want to build models on top of satellite
              imagery, apply machine-learning, or minimize clouds in your image.
              NASA's Earth Science Devision has a variety of Earth imagery APIs
              for developers, which you can find out about in the Earthdata
              Developer Portal. Specifically, the GIBS (Global Imagery Browse
              Services) API may be of interest. The Google Earth Engine API is
              another powerful option. This API is powered by Google Earth
              Engine API, and currently only supports pan-sharpened Landsat 8
              imagery.
            </Typography>
          )}
          {isLoading ? (
            <Skeleton className="mt-4 rounded-lg">
              <div className="rounded-lg h-[30px] bg-default-300"></div>
            </Skeleton>
          ) : (
            <Typography
              variant="body2"
              className="flex flex-wrap justify-between gap-3 mt-4 truncate "
            >
              <span>ID : {planetData?.id}</span>
              <span>Service Version : {planetData?.service_version}</span>
            </Typography>
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
          className="flex justify-center order-first w-full lg:justify-start lg:order-last"
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
      </div>
    </motion.div>
  );
};

export default Earth;
