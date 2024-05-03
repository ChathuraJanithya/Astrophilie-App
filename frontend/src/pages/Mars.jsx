import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Hero from "../components/marspage/Hero";
import ItemCard from "../components/common/ItemCard";
import { getMarsRoverPhotosPage } from "../services/mars-api";
import { Skeleton } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { Tabs, Tab } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const selectedOptions = [
  {
    key: "all",
    title: "All",
  },
  {
    key: "CHEMCAM",
    title: "CHEMCAM Camera",
  },
  {
    key: "FHAZ",
    title: "FHAZ Camera",
  },
  {
    key: "RHAZ",
    title: "RHAZ Camera",
  },
  {
    key: "MARDI",
    title: "MARDI Camera",
  },
];
const Mars = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("all");
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["marsRoverPhotos", page, selected],
    queryFn: () => getMarsRoverPhotosPage(page, selected),
    enabled: true,
    staleTime: Infinity,
  });
  const {
    isLoading: allContent,
    data: allData,
    isFetching: allFetching,
  } = useQuery({
    queryKey: ["marsRoverPhotos", page],
    queryFn: () => getMarsRoverPhotosPage(page),
    enabled: true,
    staleTime: Infinity,
  });

  const marsData = selected === "all" ? allData?.photos : data?.photos;
  const dataLength = selected === "all" ? 4 : 1;

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 2, behavior: "smooth" });
    };

    handleScrollToTop();
  }, [page, selected]);

  const [userFirstName, setUserFirstName] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserFirstName(userData.firstName);
    }

    if (!localStorage.getItem("authToken")) {
      window.location = "/";
    }
  }, []);

  return (
    <>
      <Header />
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
        <Hero
          img="/homepage/marsbg.jpeg"
          title="Exploring Mars: A Visual Journey Through the Red Planet"
          breadcrumbs={[
            {
              title: "Home",
              link: "/",
            },
            {
              title: "Mars",
              link: "/mars",
            },
          ]}
        />
      </motion.div>
      <div className=" max-w-[1440px] hidden md:block mx-auto px-4 py-8 md:py-12 overflow-y-auto md:px-0">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          color="primary"
          variant="underlined"
        >
          {selectedOptions.map((option) => (
            <Tab
              key={option?.key}
              title={
                <div className="flex items-center ">
                  <span className=" text-[16px] font-medium">
                    {" "}
                    {option?.title}{" "}
                  </span>
                </div>
              }
            >
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
                className="grid grid-cols-1 gap-2 mt-6 lg:grid-cols-3 lg2:grid-cols-4 md:grid-cols-2"
                id="top"
              >
                {!isFetching
                  ? marsData?.map((item) => <ItemCard item={item} />)
                  : [0, 1, 3, 4, 5, 6, 7, 8].map((_, index) => (
                      <div>
                        <Skeleton className="px-12 rounded-lg ">
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
                      </div>
                    ))}
              </motion.div>
            </Tab>
          ))}
        </Tabs>
      </div>

      <div className=" max-w-[1440px] mx-auto px-2 py-8 md:hidden ">
        <Select
          placeholder="Select Camera"
          label={selected}
          value={selected}
          variant="bordered"
          onChange={(e) => setSelected(e.target.value)}
          className="mb-8 w-[300px] mx-auto flex justify-center"
        >
          <SelectItem key="all" value="all">
            All
          </SelectItem>
          <SelectItem key="CHEMCAM" value="CHEMCAM">
            CHEMCAM Camera
          </SelectItem>
          <SelectItem key="FHAZ" value="FHAZ">
            FHAZ Camera
          </SelectItem>
          <SelectItem key="RHAZ" value="RHAZ">
            RHAZ Camera
          </SelectItem>
          <SelectItem key="MARDI" value="MARDI">
            MARDI Camera
          </SelectItem>
        </Select>
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
          className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2"
          id="top"
        >
          {!isFetching
            ? marsData?.map((item) => <ItemCard item={item} />)
            : [0, 1, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div>
                  <Skeleton className="px-12 rounded-lg ">
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
                </div>
              ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <Pagination total={dataLength} page={page} onChange={setPage} />
      </div>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Mars;
