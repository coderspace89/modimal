"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import peopleGalleryStyles from "./PeopleGallery.module.css";
import qs from "qs";

const PeopleGallery = () => {
  const [peopleGalleryData, setPeopleGalleryData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        peopleGallery: {
          on: {
            "blocks.sustainability-people-gallery": {
              populate: {
                images: true,
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchPeopleGallery = async () => {
      const res = await fetch(`/api/sustainability-page?${query}`);
      const data = await res.json();
      console.log(data?.data?.peopleGallery?.[0]);
      setPeopleGalleryData(data?.data.peopleGallery?.[0] || null);
    };
    fetchPeopleGallery();
  }, []);

  return (
    <section className={peopleGalleryStyles.container}>
      {peopleGalleryData?.title && (
        <h4 className={peopleGalleryStyles.title}>
          {peopleGalleryData?.title}
        </h4>
      )}

      <div className={peopleGalleryStyles.grid}>
        {peopleGalleryData?.images?.map((img, idx) => (
          <div key={img.id || idx} className={peopleGalleryStyles.gridItem}>
            <Image
              src={getStrapiMedia(img.url)}
              alt=""
              fill
              className={peopleGalleryStyles.image}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {peopleGalleryData?.buttonText && peopleGalleryData?.buttonUrl && (
        <div className={peopleGalleryStyles.buttonWrap}>
          <a
            href={peopleGalleryData?.buttonUrl}
            className={peopleGalleryStyles.button}
          >
            {peopleGalleryData?.buttonText}
          </a>
        </div>
      )}
      <div>
        <p className={peopleGalleryStyles.content}>
          {peopleGalleryData?.description}
        </p>
      </div>
    </section>
  );
};

export default PeopleGallery;
