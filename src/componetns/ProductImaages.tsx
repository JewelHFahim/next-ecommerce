"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImaages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  // const images = [
  //   {
  //     id: 1,
  //     url: "https://images.pexels.com/photos/18028832/pexels-photo-18028832/free-photo-of-road-through-forest-in-summer.png?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //   },
  //   {
  //     id: 2,
  //     url: "https://images.pexels.com/photos/20659792/pexels-photo-20659792/free-photo-of-portrait-of-geese.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //   },
  //   {
  //     id: 3,
  //     url: "https://images.pexels.com/photos/27224216/pexels-photo-27224216/free-photo-of-agua-pura.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //   },
  //   {
  //     id: 4,
  //     url: "https://images.pexels.com/photos/20427308/pexels-photo-20427308/free-photo-of-entrance-of-hotel-le-bellevue-in-biarritza.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //   },
  // ];

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i:number) => (
          <div
            key={item._id}
            className="relative w-1/4 h-32 gap-4 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImaages;
