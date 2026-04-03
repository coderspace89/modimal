import React from "react";
import HomePageHero from "./components/pages/home/HomePageHero";
import BestSellers from "./components/pages/home/BestSellers";
import CollectionSection from "./components/pages/home/CollectionSection";
import ModiweekSection from "./components/pages/home/ModiweekSection";
import SustainabilitySection from "./components/pages/home/SustainabilitySection";
import FollowSection from "./components/pages/home/FollowSection";

const page = () => {
  return (
    <div>
      <HomePageHero />
      <BestSellers />
      <CollectionSection />
      <ModiweekSection />
      <SustainabilitySection />
      <FollowSection />
    </div>
  );
};

export default page;
