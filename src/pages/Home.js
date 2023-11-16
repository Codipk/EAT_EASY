import React from "react";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <div className="hero">
          <h2>Managing Complaints, Mastering Satisfaction</h2>
          <p>
            {/* This is the reponsibility of our college to provide you with the
            best possible food ever.Be feel free to post complaint. Jab khayega
            INDIA tbhi toh badhega INDIA. */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde ut ad
            sed laborum beatae modi. Eos modi totam nemo voluptatem nisi. Ut
            quasi ipsum quia rem inventore accusamus est nemo!
          </p>
          <div className="buttons">
            <Link to="/login" className="join">
              Raise complaint
            </Link>
            <Link to="/aboutUs" className="learn">
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
      </section>
    </div>
  );
};

export default Home;
