import React from "react";
import ProductDetails from "@/app/components/pages/products/ProductDetails";
import ProductFeatures from "@/app/components/pages/products/ProductFeatures";
import RelatedProducts from "@/app/components/pages/products/RelatedProducts";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <ProductDetails slug={slug} />
      <ProductFeatures slug={slug} />
      <RelatedProducts slug={slug} />
    </div>
  );
};

export default page;
