"use client";

import React, { useState, useEffect } from "react";
import textBlockStyles from "./TextBlock.module.css";
import qs from "qs";

const TextBlock = () => {
  const [textBlockData, setTextBlockData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        textBlock: {
          on: {
            "blocks.sustainability-text-block": {
              populate: "*",
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
    const fetchTextBlock = async () => {
      const res = await fetch(`/api/sustainability-page?${query}`);
      const data = await res.json();
      console.log(data?.data?.textBlock?.[0]);
      setTextBlockData(data?.data.textBlock?.[0] || null);
    };
    fetchTextBlock();
  }, []);

  return (
    <section className={textBlockStyles.container}>
      <div>
        <h2 className={textBlockStyles.title}>{textBlockData?.title}</h2>
        <p className={textBlockStyles.content}>{textBlockData?.content}</p>
      </div>
    </section>
  );
};

export default TextBlock;
