import React from "react";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <section className="hero-section">
        <div className="flex flex-row justify-between">
          {" "}
          <div className="flex-flex col gap-2 text-white font-sans text-xl  p-36 ">
            <h2 className="font-serif text-2xl text-yellow-300">
              Managing Complaints, Mastering Satisfaction
            </h2>
            <p>
              {/* This is the reponsibility of our college to provide you with the
            best possible food ever.Be feel free to post complaint. Jab khayega
            INDIA tbhi toh badhega INDIA. */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde ut
              ad sed laborum beatae modi. Eos modi totam nemo voluptatem nisi.
              Ut quasi ipsum quia rem inventore accusamus est nemo!
            </p>
            <div className="mt-24 flex flex-row gap-8 ">
              <Link
                to="/login"
                className="join bg-slate-500 px-4 font-semibold py-2  border-spacing-2 stroke-lime-300 rounded-md text-white"
              >
                Raise complaint
              </Link>
              <Link
                to="/aboutUs"
                className="learn bg-red-300  px-4 py-2 font-semibold border-spacing-2 stroke-lime-300 rounded-md text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="img">
            <img
              src="https://www.codingnepalweb.com/demos/create-responsive-website-html-css/hero-bg.png"
              alt="hero image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
