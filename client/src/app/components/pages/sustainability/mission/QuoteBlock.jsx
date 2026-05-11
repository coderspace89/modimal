"use client";

import React, { useState, useEffect } from "react";
import quoteBlockStyles from "./QuoteBlock.module.css";
import qs from "qs";

const QuoteBlock = () => {
  const [quoteBlockData, setQuoteBlockData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        quoteBlock: {
          on: {
            "blocks.sustainability-quote-block": {
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
    const fetchQuoteBlock = async () => {
      const res = await fetch(`/api/sustainability-page?${query}`);
      const data = await res.json();
      console.log(data?.data?.quoteBlock?.[0]);
      setQuoteBlockData(data?.data.quoteBlock?.[0] || null);
    };
    fetchQuoteBlock();
  }, []);

  return (
    <section className={quoteBlockStyles.container}>
      <div>
        <p className={quoteBlockStyles.content}>{quoteBlockData?.quote}</p>
      </div>
    </section>
  );
};

export default QuoteBlock;
