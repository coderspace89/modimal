import React from "react";
import ModiweekHero from "@/app/components/pages/modiweek/ModiweekHero";
import ModiweekDays from "@/app/components/pages/modiweek/ModiweekDays";

const page = async ({ params }) => {
  const { day } = await params;
  console.log(day);
  return (
    <div>
      <ModiweekHero day={day} />
      <ModiweekDays />
    </div>
  );
};

export default page;
