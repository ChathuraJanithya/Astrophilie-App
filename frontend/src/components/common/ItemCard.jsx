import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "./Typography";

const ItemCard = ({ item, home = false }) => {
  return (
    <div
      key={item.id}
      className={
        home
          ? "mx-auto mb-8 hover:scale-105 w-[300px]  rounded-none bg-white shadow-sm md:w-[300px]"
          : "mx-auto mb-8 hover:scale-105 w-[300px] rounded-none bg-white shadow-sm md:w-[300px]"
      }
    >
      <div>
        <div className="relative ">
          <img
            src={item?.img_src}
            alt="Blog Image"
            className="w-full h-full min-h-[300px]"
            height={200}
            width={300}
          />
        </div>
        <div className="flex ">
          <div className="px-4 pt-6 pb-2">
            <span
              className={`items-center justify-center rounded-none bg-black px-5 py-2 text-sm text-white `}
            >
              {item?.earth_date}
            </span>
          </div>
          <div className="pt-6">
            <Typography
              variant="body"
              displayAs="p"
              className="mb-2 line-clamp-2 text-center !text-sm font-semibold md:text-start "
            >
              {item?.rover?.status === "active" ? (
                <span className="text-blue-500">Active</span>
              ) : (
                <span className="text-red-500">Inactive</span>
              )}
            </Typography>
          </div>
        </div>
        <div className="p-3">
          <Typography
            variant="body"
            displayAs="p"
            className="mb-2 font-semibold truncate line-clamp-2 text-start"
          >
            {item?.camera?.full_name}
          </Typography>
          <div className="flex items-center gap-3 ">
            <Typography
              variant="body"
              displayAs="p"
              className=" text-start text-[#475569] font-semibold"
            >
              Rover Name {""} :
            </Typography>
            <Typography
              variant="body"
              displayAs="p"
              className="line-clamp-3 text-start text-[#475569]"
            >
              {item.rover?.name}
            </Typography>
          </div>

          <div className="flex flex-wrap justify-between gap-2 mt-2">
            <p className=" text-start text-[12px] font-semibold text-[#475569]">
              Landing Date {""} : {item.rover?.landing_date}
            </p>
            <p className=" text-start text-[12px] font-semibold text-[#475569]">
              Launch Date {""} : {item.rover?.launch_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
