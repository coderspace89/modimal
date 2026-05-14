import React from "react";
import ResetPassword from "@/app/components/pages/reset-password/ResetPassword";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default page;
