import React from "react";
import ProductDetails from "@/app/components/pages/products/ProductDetails";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <ProductDetails slug={slug} />
    </div>
  );
};

export default page;
