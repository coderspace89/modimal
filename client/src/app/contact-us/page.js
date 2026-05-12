import React from "react";
import ContactIntro from "@/app/components/pages/contact-us/ContactIntro";
import ContactForm from "@/app/components/pages/contact-us/ContactForm";
import ContactMethod from "@/app/components/pages/contact-us/ContactMethod";

const page = () => {
  return (
    <div>
      <ContactIntro />
      <ContactForm />
      <ContactMethod />
    </div>
  );
};

export default page;
