import React from "react";

const AboutUS = () => {
  return (
    <div className="flex flex-col text-white p-5 ">
      <div className="mt-24 flex flex-col p-3 gap-3 font-serif text-green-200 border border-pink-600 rounded-xl lg:p-14 ">
        <h2 className=" p-7  text-3xl font-serif">ABOUT US</h2>
        <p className="font-sans text-white font-semibold text-2xl">
          EatEasy is basically made for our college for easy management hostel
          and mess.
        </p>
        <p className="font-sans text-lime-50 font-xl font-semibold">
          It's hard to put complaint by writing on paper and submitting in
          office for students and also for warden it's hard to manage his/her
          time and view all complaints.
        </p>
        <p className="font-sans text-lime-50 font-xl font-semibold">
          So this website solve this basic problems. It also helps Accountants
          to manage Hostel's Expense. Students are always worried about mess
          menu. So they can see mess menu and have rating over there .{" "}
        </p>
        <p className="font-sans text-pink-200 font-xl font-semibold">
          They can put their comments on complaints and put their words to
          warden, accountants and mess committee. Similarly other roles can also
          performs their task/responsibility well.
        </p>
      </div>
    </div>
  );
};

export default AboutUS;
