import React from "react";
import HomePageHero from "./components/pages/home/HomePageHero";
import BestSellers from "./components/pages/home/BestSellers";

const page = () => {
  return (
    <div>
      <HomePageHero />
      <BestSellers />
    </div>
  );
};

export default page;
