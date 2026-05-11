"use client";

import React, { useState, useEffect } from "react";
import imageGridStyles from "./ImageGrid.module.css";
import qs from "qs";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";

const ImageGrid = () => {
  const [imageGridData, setImageGridData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        imageGrid: {
          on: {
            "blocks.sustainability-image-grid": {
              populate: {
                items: {
                  populate: {
                    image: true,
                  },
                },
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
    const fetchImageGrid = async () => {
      const res = await fetch(`/api/sustainability-page?${query}`);
      const data = await res.json();
      console.log(data?.data?.imageGrid?.[0]);
      setImageGridData(data?.data.imageGrid?.[0] || null);
    };
    fetchImageGrid();
  }, []);

  return (
    <section className={imageGridStyles.container}>
      <div className={imageGridStyles.grid}>
        {imageGridData?.items?.map((item, idx) => {
          const imageUrl = getStrapiMedia(item.image.url);
          const CardContent = (
            <div className={imageGridStyles.card}>
              <div className={imageGridStyles.imageWrap}>
                <Image
                  src={imageUrl}
                  alt={item.label || "Sustainability"}
                  fill
                  className={imageGridStyles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={imageGridStyles.label}>{item.label}</div>
            </div>
          );

          return (
            <div key={item.id || idx} className={imageGridStyles.gridItem}>
              {item.link ? (
                <Link href={item.link} className="text-decoration-none">
                  {CardContent}
                </Link>
              ) : (
                CardContent
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImageGrid;
