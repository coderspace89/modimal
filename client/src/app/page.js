import React from "react";
import HomePageHero from "./components/pages/home/HomePageHero";
import BestSellers from "./components/pages/home/BestSellers";
import CollectionSection from "./components/pages/home/CollectionSection";

const page = () => {
  return (
    <div>
      <HomePageHero />
      <BestSellers />
      <CollectionSection />
    </div>
  );
};

export default page;
