import React from "react";
const ContactForm = () => {
  return (
    <div className="   mt-24 border border-pink-600 text-white rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Feel Free To Reach Out Us.
      </h1>
      <p className="">
        Tell us more about yourself and what you're got in mind.
        <p className="bg-blue-100 text-yellow-950 w-fit">
          Contact Us : sundram.smn@gmail.com
        </p>
      </p>

      <div className="mt-7">{/* <ContactUsForm /> */}</div>
    </div>
  );
};

export default ContactForm;
